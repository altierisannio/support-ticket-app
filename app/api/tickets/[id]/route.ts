import { sql } from '@/lib/db';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/lib/admin-session';

const updateSchema = z.object({
  status: z.enum(['open', 'in_progress', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) {
    return false;
  }

  const session = await verifyAdminSession(token);
  return !!session && session.role === 'admin';
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    return Response.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const { id } = await params;

  const tickets = await sql`
    SELECT *
    FROM tickets
    WHERE id = ${id}
    LIMIT 1
  `;

  if (tickets.length === 0) {
    return Response.json({ error: 'Ticket non trovato' }, { status: 404 });
  }

  const messages = await sql`
    SELECT *
    FROM ticket_messages
    WHERE ticket_id = ${id}
    ORDER BY created_at ASC
  `;

  return Response.json({
    ticket: tickets[0],
    messages,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    return Response.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const updated = await sql`
      UPDATE tickets
      SET
        status = COALESCE(${data.status ?? null}, status),
        priority = COALESCE(${data.priority ?? null}, priority),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (updated.length === 0) {
      return Response.json({ error: 'Ticket non trovato' }, { status: 404 });
    }

    return Response.json(updated[0]);
  } catch {
    return Response.json({ error: 'Payload non valido' }, { status: 400 });
  }
}
