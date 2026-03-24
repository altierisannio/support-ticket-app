'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', {
      method: 'POST',
    });

    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-60 border-r border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold mb-6">Admin</h2>

        <nav className="flex flex-col gap-2 text-sm">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="mt-4 text-left rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* CONTENUTO */}
      <main className="flex-1 bg-slate-50 p-8">
        {children}
      </main>
    </div>
  );
}
