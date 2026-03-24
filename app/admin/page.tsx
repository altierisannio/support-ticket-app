import Link from 'next/link';
import { sql } from '@/lib/db';

async function getTickets() {
  return await sql`
    SELECT *
    FROM tickets
    ORDER BY updated_at DESC NULLS LAST, created_at DESC
  `;
}

function statusBadge(status: string) {
  if (status === 'open') {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (status === 'in_progress') {
    return 'bg-amber-100 text-amber-700';
  }
  return 'bg-slate-200 text-slate-700';
}

function priorityBadge(priority: string) {
  if (priority === 'high') {
    return 'bg-red-100 text-red-700';
  }
  if (priority === 'medium') {
    return 'bg-orange-100 text-orange-700';
  }
  return 'bg-sky-100 text-sky-700';
}

export default async function AdminDashboardPage() {
  const tickets = await getTickets();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Ticket di supporto
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Visualizza, organizza e gestisci tutte le richieste ricevute.
            </p>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              Logout
            </button>
          </form>
        </div>

        <div className="grid gap-4">
          {tickets.map((ticket: any) => (
            <Link
              key={ticket.id}
              href={`/admin/tickets/${ticket.id}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-slate-900">
                    {ticket.subject}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {ticket.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(ticket.status)}`}
                  >
                    {ticket.status}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityBadge(ticket.priority)}`}
                  >
                    {ticket.priority}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                <span>Cliente: {ticket.customer_email}</span>
                <span>
                  Creato: {new Date(ticket.created_at).toLocaleString('it-IT')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
