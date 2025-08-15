
import { useParams } from 'react-router-dom';
import { usePortfolio } from '../../hooks/usePortfolio';
import type { Asset } from '../../services/portfolio';
import { useState } from 'react';
import { AddAssets } from '../../components/AddAssets';

export const Portfolio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ openAddAssets, setOpenAddAssets ] = useState(false);

  const { data: portfolio, isLoading, error } = usePortfolio(id ?? '');

  let totalValue = 0;
  if (portfolio?.assets) {
    totalValue = portfolio.assets.reduce((sum, a: Asset) => sum + (Number(a.quantity) * (Number(a.average_price) || Number(a.value) || 0)), 0);
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
        <span className="text-lg text-slate-600 dark:text-slate-300">Cargando portafolio...</span>
      </main>
    );
  }
  if (error || !portfolio) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
        <span className="text-lg text-rose-600 dark:text-rose-400">No se pudo cargar el portafolio.</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-neutral-900 dark:to-neutral-950 px-4 pt-28 pb-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-xl p-8">
          <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]">
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>
          <div className="relative space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{portfolio.name}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300 mb-4">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold">{portfolio.base_currency}</span>
                  <span>Creado: {new Date(portfolio.created_at).toLocaleDateString()}</span>
                  <span>Assets: <b>{portfolio.assets.length}</b></span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpenAddAssets(true)}
                className="relative inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm px-4 py-2.5 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Agregar activos
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Símbolo</th>
                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Cantidad</th>
                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Precio Promedio</th>
                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.assets.map(asset => (
                    <tr key={asset.symbol} className="bg-white/80 dark:bg-neutral-900/70 rounded-lg shadow-sm">
                      <td className="py-2 px-3 text-indigo-600 dark:text-indigo-300 font-mono">{asset.symbol}</td>
                      <td className="py-2 px-3 text-right dark:text-slate-300">{Number(asset.quantity).toLocaleString()}</td>
                      <td className="py-2 px-3 text-right dark:text-slate-300">${Number(asset.average_price || asset.value || 0).toLocaleString()}</td>
                      <td className="py-2 px-3 text-right dark:text-slate-300 font-semibold">${(Number(asset.quantity) * (Number(asset.average_price) || Number(asset.value) || 0)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-4 text-right font-bold text-slate-700 dark:text-slate-200">Total</td>
                    <td className="pt-4 text-right font-bold text-indigo-700 dark:text-indigo-300">${totalValue.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddAssets open={openAddAssets} setOpen={setOpenAddAssets} />
    </main>
  );
};