import React from 'react';
import type { Asset } from '../services/portfolio';

interface AssetTransactionsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  asset: Asset | null;
}

export const AssetTransactionsModal: React.FC<AssetTransactionsModalProps> = ({
  open,
  setOpen,
  asset
}) => {

  if (!open || !asset) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 max-w-xl w-full">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          {asset?.symbol ? `Detalle de ${asset.symbol}` : 'Detalle'}
        </h3>
        {asset && (
          <div className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            <div>Cantidad total: <span className="font-semibold">{Number(asset.total_quantity_calc ?? asset.quantity)}</span></div>
            {asset.total_cost !== undefined && <div>Costo total: <span className="font-semibold">${Number(asset.total_cost).toFixed(2)}</span></div>}
            {asset.actual_value !== undefined && <div>Valor actual: <span className="font-semibold">${Number(asset.actual_value).toFixed(2)}</span></div>}
            {asset.total_profit_loss !== undefined && <div>Ganancia/Pérdida total: <span className={Number(asset.total_profit_loss) >= 0 ? 'text-green-600' : 'text-red-600'}>{Number(asset.total_profit_loss) >= 0 ? '+' : ''}${Number(asset.total_profit_loss).toFixed(2)}</span></div>}
            {asset.performance_pct !== undefined && <div>Performance: <span className={Number(asset.performance_pct) >= 0 ? 'text-green-600' : 'text-red-600'}>{Number(asset.performance_pct).toFixed(2)}%</span></div>}
            {asset.transactions && asset.transactions.length > 0 && (
              <div className="mt-3">
                <div className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Detalle de Performance por transacción</div>
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Cantidad</th>
                      <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Precio compra</th>
                      {asset.transactions.some(t => t.actual_price !== undefined) && <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Precio actual</th>}
                      {asset.transactions.some(t => t.profit_loss !== undefined) && <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Ganancia/Pérdida</th>}
                      {asset.transactions.some(t => t.performance_pct !== undefined) && <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase pb-2">Performance %</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {asset.transactions.map((tx, idx) => (
                      <tr key={idx} className="bg-white/80 dark:bg-neutral-900/70 rounded-lg shadow-sm">
                        <td className="py-2 px-3 text-right dark:text-slate-300">{Number(tx.quantity)}</td>
                        <td className="py-2 px-3 text-right dark:text-slate-300">${Number(tx.price).toFixed(2)}</td>
                        {tx.actual_price !== undefined && <td className="py-2 px-3 text-right dark:text-slate-300">${Number(tx.actual_price).toFixed(2)}</td>}
                        {tx.profit_loss !== undefined && (
                          <td className={Number(tx.profit_loss) >= 0 ? 'py-2 px-3 text-right text-green-600' : 'py-2 px-3 text-right text-red-600'}>
                            {Number(tx.profit_loss) >= 0 ? '+' : ''}${Number(tx.profit_loss).toFixed(2)}
                          </td>
                        )}
                        {tx.performance_pct !== undefined && (
                          <td className={Number(tx.performance_pct) >= 0 ? 'py-2 px-3 text-right text-green-600' : 'py-2 px-3 text-right text-red-600'}>
                            {Number(tx.performance_pct).toFixed(2)}%
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-sm px-4 py-2.5 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
