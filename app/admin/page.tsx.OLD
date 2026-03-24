import Link from 'next/link';

async function getTickets() {
  const res = await fetch('http://localhost:3000/api/tickets', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Errore caricamento ticket');
  }

  return res.json();
}

export default async function AdminDashboardPage() {
  const tickets = await getTickets();

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Dashboard amministratore</h1>

        <form action="/api/admin/logout" method="POST">
          <button className="rounded-lg border px-4 py-2">
            Logout
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket: any) => (
          <Link
            key={ticket.id}
            href={`/admin/tickets/${ticket.id}`}
            className="border rounded-xl p-4 hover:bg-gray-50"
          >
            <div className="flex justify-between gap-4">
              <h2 className="font-semibold">{ticket.subject}</h2>
              <span className="text-sm">{ticket.status}</span>
            </div>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {ticket.description}
            </p>

            <div className="text-xs text-gray-500 mt-3">
              Cliente: {ticket.customer_email} · Priorità: {ticket.priority}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
