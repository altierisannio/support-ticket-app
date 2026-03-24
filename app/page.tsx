import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm">
              Piattaforma di supporto
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
              Gestisci le richieste di assistenza in modo semplice
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Gli utenti possono inviare una richiesta di supporto tramite un modulo
              pubblico. L’amministratore visualizza tutti i ticket in una dashboard
              privata e li gestisce in modo ordinato.
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
                <p className="text-sm font-medium text-slate-500">
                  Invio ticket
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  Modulo pubblico
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Gli utenti inseriscono email, oggetto e descrizione della richiesta.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-sm font-medium text-blue-700">
                  Gestione interna
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  L’amministratore accede alla dashboard privata, aggiorna lo stato
                  dei ticket e risponde direttamente nella conversazione.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">1</p>
                  <p className="text-sm text-slate-500">Form pubblico</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">2</p>
                  <p className="text-sm text-slate-500">Dashboard admin</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-slate-900">3</p>
                  <p className="text-sm text-slate-500">Risposta supporto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
