import UpdateTicketForm from './update-ticket-form';
import ReplyForm from './reply-form';

async function getTicket(id: string) {
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Ticket non trovato');
  }

  return res.json();
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

      {/* FORM AGGIORNAMENTO */}
      <div className="mt-8">
        <UpdateTicketForm
          ticketId={data.ticket.id}
          initialStatus={data.ticket.status}
          initialPriority={data.ticket.priority}
        />
      </div>

      {/* MESSAGGI */}
      <h2 className="text-xl font-semibold mt-10 mb-3">Messaggi</h2>

      <div className="grid gap-3">
        {data.messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`rounded-xl p-4 ${
              msg.author_type === 'agent'
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-gray-50 border'
            }`}
          >
            <p>{msg.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {msg.author_type} {msg.author_email ? `· ${msg.author_email}` : ''}
            </p>
          </div>
        ))}
      </div>

      {/* RISPOSTA ADMIN */}
      <ReplyForm ticketId={data.ticket.id} />
    </main>
  );
}
