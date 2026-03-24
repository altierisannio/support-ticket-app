'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateTicketForm({
  ticketId,
  initialStatus,
  initialPriority,
}: {
  ticketId: string;
  initialStatus: string;
  initialPriority: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState(initialPriority);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, priority }),
    });

    setLoading(false);

    if (!res.ok) {
      alert('Errore aggiornamento ticket');
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Stato</label>
        <select
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Priorità</label>
        <select
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? 'Salvataggio...' : 'Salva modifiche'}
      </button>
    </form>
  );
}
