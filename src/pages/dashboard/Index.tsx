import { useAuth } from '../../context/useAuth';
import { usePortfolios } from '../../hooks/usePortfolio';

export function Dashboard() {
  const { user, logout } = useAuth();

  const { data } = usePortfolios();

  console.log('Portfolios:', data);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-neutral-900 dark:to-neutral-950 px-4 pt-28 pb-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">Panel Privado</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Bienvenido <span className="font-medium text-slate-900 dark:text-slate-100">{user?.username}</span></p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium px-4 py-2.5 shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Cerrar sesión
          </button>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            { label: 'Valor Total', value: '—', desc: 'Suma de tus portafolios' },
            { label: 'Rendimiento 24h', value: '—', desc: 'Variación diaria (%)' },
            { label: 'Portafolios', value: '—', desc: 'Número creados' }
          ].map(card => (
            <div key={card.label} className="relative group overflow-hidden rounded-2xl border border-slate-200/60 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-sm px-5 py-6 transition hover:shadow-md">
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{card.label}</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{card.value}</p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-500">{card.desc}</p>
            </div>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-xl p-8">
          <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]">
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Resumen</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-prose mb-4">
              Aquí verás un resumen consolidado de tus portafolios, rendimiento y distribución de assets. Aún no has cargado datos, pero este espacio mostrará gráficos e insights cuando integres la API.
            </p>
            <div className="rounded-lg border border-dashed border-slate-300 dark:border-neutral-700 p-6 text-center text-slate-500 dark:text-slate-500 text-sm">
              (Pendiente) Inserta componentes de gráficos / tablas aquí.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}