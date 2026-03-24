import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">
              Sistema di supporto clienti
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
              Gestisci i ticket in modo semplice e ordinato
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Gli utenti possono inviare richieste di supporto in pochi secondi.
              L’amministratore le visualizza in una dashboard privata, aggiorna lo
              stato e risponde direttamente nel ticket.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/support"
                className="rounded-xl bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:bg-slate-800"
              >
                Apri una richiesta
              </Link>

              <Link
                href="/admin/login"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                Area amministratore
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Nuovo ticket</p>
                <p className="mt-2 text-lg font-semibold">Problema accesso account</p>
                <p className="mt-2 text-sm text-slate-600">
                  L’utente segnala che non riesce a completare il login.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-sm font-medium text-blue-700">Risposta supporto</p>
                <p className="mt-2 text-sm text-slate-700">
                  Abbiamo preso in carico la richiesta e stiamo verificando il problema.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-slate-500">Supporto</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold">Fast</p>
                  <p className="text-sm text-slate-500">Workflow</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold">Neon</p>
                  <p className="text-sm text-slate-500">Database</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
