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

function statusBadge(status: string) {
  if (status === 'open') return 'bg-emerald-100 text-emerald-700';
  if (status === 'in_progress') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-200 text-slate-700';
}

function priorityBadge(priority: string) {
  if (priority === 'high') return 'bg-red-100 text-red-700';
  if (priority === 'medium') return 'bg-orange-100 text-orange-700';
  return 'bg-sky-100 text-sky-700';
}

export default async function AdminTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getTicket(id);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <a
          href="/admin"
          className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          ← Torna alla dashboard
        </a>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {data.ticket.subject}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Cliente: {data.ticket.customer_email}
                </p>
              </div>

              <div className="flex gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(data.ticket.status)}`}
                >
                  {data.ticket.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityBadge(data.ticket.priority)}`}
                >
                  {data.ticket.priority}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-slate-700">
              {data.ticket.description}
            </div>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">Conversazione</h2>
            <p className="mt-1 text-sm text-slate-500">
              Cronologia completa dei messaggi del ticket.
            </p>

            <div className="mt-4">
              <Messages messages={data.messages} />
            </div>

            <div className="mt-6">
              <ReplyForm ticketId={data.ticket.id} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Gestione ticket</h2>
            <p className="mt-1 text-sm text-slate-500">
              Aggiorna stato e priorità della richiesta.
            </p>

            <div className="mt-6">
              <UpdateTicketForm
                ticketId={data.ticket.id}
                initialStatus={data.ticket.status}
                initialPriority={data.ticket.priority}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
