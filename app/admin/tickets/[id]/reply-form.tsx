'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReplyForm({ ticketId }: { ticketId: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/tickets/${ticketId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    setLoading(false);

    if (!res.ok) {
      alert('Errore invio risposta');
      return;
    }

    setMessage('');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
      <textarea
        className="w-full rounded-lg border p-3 min-h-24"
        placeholder="Scrivi una risposta..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-3 text-white"
      >
        {loading ? 'Invio...' : 'Invia risposta'}
      </button>
    </form>
  );
}
