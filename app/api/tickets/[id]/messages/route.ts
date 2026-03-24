import { sql } from '@/lib/db';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/lib/admin-session';

const messageSchema = z.object({
  message: z.string().min(1),
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

export async function POST(
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
    const data = messageSchema.parse(body);

    const ticket = await sql`
      SELECT id FROM tickets WHERE id = ${id} LIMIT 1
    `;

    if (ticket.length === 0) {
      return Response.json({ error: 'Ticket non trovato' }, { status: 404 });
    }

    const inserted = await sql`
      INSERT INTO ticket_messages (ticket_id, author_type, message)
      VALUES (${id}, 'agent', ${data.message})
      RETURNING *
    `;

    await sql`
      UPDATE tickets
      SET updated_at = NOW()
      WHERE id = ${id}
    `;

    return Response.json(inserted[0], { status: 201 });
  } catch {
    return Response.json({ error: 'Payload non valido' }, { status: 400 });
  }
}
