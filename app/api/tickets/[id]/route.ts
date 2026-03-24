import { sql } from '@/lib/db';
import { z } from 'zod';

const updateSchema = z.object({
  status: z.enum(['open', 'in_progress', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
