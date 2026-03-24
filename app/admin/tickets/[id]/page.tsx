import { sql } from '@/lib/db';
import UpdateTicketForm from './update-ticket-form';
import ReplyForm from './reply-form';
import Messages from './messages';

async function getTicket(id: string) {
  const tickets = await sql`
    SELECT *
    FROM tickets
    WHERE id = ${id}
    LIMIT 1
  `;

  if (tickets.length === 0) {
    throw new Error('Ticket non trovato');
  }

  const messages = await sql`
    SELECT *
    FROM ticket_messages
    WHERE ticket_id = ${id}
    ORDER BY created_at ASC
  `;

  return {
    ticket: tickets[0],
    messages,
  };
}

export default async function AdminTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getTicket(id);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <a href="/admin" className="text-sm underline">
        ← Torna alla dashboard
      </a>

      <h1 className="text-3xl font-bold mt-4">{data.ticket.subject}</h1>

      <p className="text-sm text-gray-600 mt-2">
        Cliente: {data.ticket.customer_email}
      </p>

      <p className="mt-4">{data.ticket.description}</p>

      <div className="mt-4 text-sm text-gray-600">
        Stato: {data.ticket.status} · Priorità: {data.ticket.priority}
      </div>

      <div className="mt-8">
        <UpdateTicketForm
          ticketId={data.ticket.id}
          initialStatus={data.ticket.status}
          initialPriority={data.ticket.priority}
        />
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-3">Messaggi</h2>

      <Messages messages={data.messages} />

      <ReplyForm ticketId={data.ticket.id} />
    </main>
  );
}
