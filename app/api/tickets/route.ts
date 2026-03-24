import { sql } from '@/lib/db';
import { z } from 'zod';

const createTicketSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(3),
  description: z.string().min(10),
});

export async function GET() {
  const rows = await sql`
    SELECT *
    FROM tickets
    ORDER BY created_at DESC
  `;

  return Response.json(rows);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createTicketSchema.parse(body);

    const inserted = await sql`
      INSERT INTO tickets (customer_email, subject, description)
      VALUES (${data.email}, ${data.subject}, ${data.description})
      RETURNING *
    `;

    await sql`
      INSERT INTO ticket_messages (ticket_id, author_type, author_email, message)
      VALUES (${inserted[0].id}, 'customer', ${data.email}, ${data.description})
    `;

    return Response.json(inserted[0], { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: 'Dati non validi o errore database' },
      { status: 400 }
    );
  }
}
