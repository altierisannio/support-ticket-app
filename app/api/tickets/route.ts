import { sql } from '@/lib/db';
import { z } from 'zod';
import crypto from 'crypto';

const createTicketSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(3),
  description: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createTicketSchema.parse(body);

    const publicToken = crypto.randomBytes(32).toString('hex');

    const inserted = await sql`
      INSERT INTO tickets (customer_email, subject, description, public_token)
      VALUES (${data.email}, ${data.subject}, ${data.description}, ${publicToken})
      RETURNING *
    `;

    await sql`
      INSERT INTO ticket_messages (ticket_id, author_type, author_email, message)
      VALUES (${inserted[0].id}, 'customer', ${data.email}, ${data.description})
    `;

    return Response.json(inserted[0], { status: 201 });
  } catch {
    return Response.json(
      { error: 'Dati non validi' },
      { status: 400 }
    );
  }
}
