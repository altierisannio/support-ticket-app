import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="flex flex-col gap-2">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            Tutti i ticket
          </Link>

          <form action="/api/admin/logout" method="POST">
            <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-100">
              Logout
            </button>
          </form>
        </nav>
      </aside>

      {/* CONTENUTO */}
      <main className="flex-1 bg-slate-50 p-8">
        {children}
      </main>
    </div>
  );
}
