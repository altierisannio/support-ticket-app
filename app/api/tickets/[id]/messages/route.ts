import { sql } from '@/lib/db';
import { z } from 'zod';

const messageSchema = z.object({
  message: z.string().min(1),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const data = messageSchema.parse(body);

    // verifica ticket esiste
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
