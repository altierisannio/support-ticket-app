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
        headers: { 'Content-Type': 'application/json' },
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
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">
            Supporto utenti
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight">
            Invia una richiesta di assistenza
          </h1>

          <p className="mt-4 max-w-lg text-slate-600">
            Compila il modulo con la tua email, l’oggetto e una descrizione chiara del
            problema. Il team di supporto visualizzerà il ticket nella dashboard
            amministrativa.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Come scrivere bene il ticket</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Spiega il problema in modo concreto</li>
                  <li>• Indica cosa stavi facendo quando è successo</li>
                  <li>• Aggiungi eventuali dettagli utili</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Nuovo ticket</h2>
          <p className="mt-2 text-sm text-slate-500">
            Inserisci i dati richiesti per inviare la segnalazione.
          </p>

          {success && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
              Richiesta inviata con successo.
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                placeholder="nome@esempio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Oggetto</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                placeholder="Oggetto della richiesta"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Descrizione</label>
              <textarea
                className="min-h-40 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                placeholder="Descrivi il problema"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Invio...' : 'Invia richiesta'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
