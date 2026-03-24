'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, description }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Errore nell’invio della richiesta');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setEmail('');
      setSubject('');
      setDescription('');
    } catch {
      setError('Errore di connessione');
    }

    setLoading(false);
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Contatta il supporto</h1>
      <p className="text-gray-600 mb-6">
        Inserisci la tua email, l’oggetto e la descrizione del problema.
      </p>

      {success && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-4">
          Richiesta inviata con successo.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border p-3"
            placeholder="nome@esempio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Oggetto</label>
          <input
            type="text"
            className="w-full rounded-lg border p-3"
            placeholder="Oggetto della richiesta"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Descrizione</label>
          <textarea
            className="w-full rounded-lg border p-3 min-h-40"
            placeholder="Descrivi il problema"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {loading ? 'Invio...' : 'Invia richiesta'}
        </button>
      </form>
    </main>
  );
}
