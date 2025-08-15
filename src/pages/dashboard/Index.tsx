
import { useAuth } from '../../context/useAuth';
import { useDashboard } from '../../hooks/usePortfolio';
import { useNavigate } from 'react-router-dom';
import type { Portfolio } from '../../services/portfolio';
import { useState } from 'react';
import { AddPortfolio } from '../../components/AddPortfolio';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Performance({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-1 text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-rose-600'}`}>
      {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
      {value > 0 ? '+' : ''}{value}%
    </span>
  );
}

export function Values({ current, investment }: { current: number; investment: number }) {
  const isPositive = current >= investment;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        <span className={` inline-flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-rose-600'}`}>{isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}${current.toFixed(2).toLocaleString() ?? 0}</span>
        <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">Valor actual</span>
      </span>
      <span className="text-base font-semibold text-slate-600 dark:text-slate-400">
        ${investment.toFixed(2).toLocaleString()}
        <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-400">Inversión</span>
      </span>
    </div>
  );
}

export function Dashboard() {
  const [ openAddPortfolio, setOpenAddPortfolio ] = useState(false);
  const { user, logout } = useAuth();
  const { data } = useDashboard();
  const navigate = useNavigate();

  const { 
    total_current_value, 
    total_investment_cost, 
    total_performance_pct, 
    total_portfolios 
  } = data || {};

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
          {[{
            label: 'Valor',
            value: <Values current={total_current_value ?? 0} investment={total_investment_cost ?? 0} />,
            desc: 'Suma de tus portafolios'
          },
          { label: 'Rendimiento', value: <Performance value={Number(total_performance_pct?.toFixed(2) ?? 0)} />, desc: 'Variación actual (%)' },
          { label: 'Portafolios', value: total_portfolios ?? 0, desc: 'Número creados' }
          ].map(card => (
            <div key={card.label} className="relative group overflow-hidden rounded-2xl border border-slate-200/60 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-sm px-5 py-6 transition hover:shadow-md">
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{card.label}</p>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{card.value}</div>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Portafolios</h2>
              <button
                type="button"
                onClick={() => setOpenAddPortfolio(true)}
                className="relative inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm px-4 py-2.5 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Agregar portafolio
              </button>
            </div>
            {Array.isArray(data?.portfolios) && data.portfolios.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.portfolios.map((p: Portfolio) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/dashboard/portfolio/${p.id}`)}
                    className="w-full text-left rounded-xl border border-slate-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 shadow-sm hover:shadow-md transition p-5 group focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition">{p.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold">{p.base_currency}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Assets: <b>{p.assets?.length ?? 0}</b></span>
                      <span className="text-xs text-slate-400">ID: {p.id}</span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Creado: {new Date(p.created_at).toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm">No tienes portafolios aún.</p>
            )}
          </div>
        </section>
      </div>
      <AddPortfolio open={openAddPortfolio} setOpen={setOpenAddPortfolio} />
    </main>
  );
}