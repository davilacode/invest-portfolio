
import { useState } from 'react';
import { useAddAssets, useMarketQuote } from '../hooks/usePortfolio';
import { AssetQuoteDetail } from './AssetQuoteDetail';
import { useParams } from 'react-router-dom';

interface AddAssetsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddAssets: React.FC<AddAssetsProps> = ({
  open,
  setOpen
}) => {

  const { id } = useParams()

  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data: quote, isLoading: quoteLoading } = useMarketQuote({ symbol: selectedSymbol, period: '15d' });
  const { mutate } = useAddAssets(id ?? '');

  if (!open) return null;

  const onCreate = async () => {
    setLoading(true);

    const query = {
      symbol: selectedSymbol,
      quantity,
      average_price: quote?.price,
    }

    mutate(query, {
      onSuccess: () => {
        setSelectedSymbol('');
        setQuantity(1);
        setLoading(false);
        setOpen(false);
      },
    });

  };
  const assetsLists = [
    { id: 1, symbol: 'AAPL' }, // Apple
    { id: 2, symbol: 'MSFT' }, // Microsoft
    { id: 3, symbol: 'GOOGL' }, // Alphabet (Google)
    { id: 4, symbol: 'AMZN' }, // Amazon
    { id: 5, symbol: 'NVDA' }, // Nvidia
    { id: 6, symbol: 'META' }, // Meta Platforms (Facebook)
    { id: 7, symbol: 'TSLA' }, // Tesla
    { id: 8, symbol: 'BRK.B' }, // Berkshire Hathaway
    { id: 9, symbol: 'LLY' }, // Eli Lilly
    { id: 10, symbol: 'JPM' }, // JPMorgan Chase
    { id: 11, symbol: 'V' }, // Visa
    { id: 12, symbol: 'UNH' }, // UnitedHealth Group
    { id: 13, symbol: 'XOM' }, // Exxon Mobil
    { id: 14, symbol: 'AVGO' }, // Broadcom
    { id: 15, symbol: 'JNJ' }, // Johnson & Johnson
    { id: 16, symbol: 'WMT' }, // Walmart
    { id: 17, symbol: 'MA' }, // Mastercard
    { id: 18, symbol: 'PG' }, // Procter & Gamble
    { id: 19, symbol: 'HD' }, // Home Depot
    { id: 20, symbol: 'MRK' }, // Merck
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Agregar activos</h3>
        <form onSubmit={e => { e.preventDefault(); onCreate(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Símbolo</label>
            <select
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition dark:text-slate-200"
              value={selectedSymbol}
              onChange={e => setSelectedSymbol(e.target.value)}
              required
            >
              <option value="" disabled>Seleccione un activo</option>
              {assetsLists.map(asset => (
                <option key={asset.id} value={asset.symbol}>
                  {asset.symbol}
                </option>
              ))}
            </select>
          </div>
          {/* Mostrar cotización y gráfica si hay símbolo seleccionado */}
          {selectedSymbol && (
            <div className="mb-4">
              {quoteLoading ? (
                <div className="flex items-center justify-center h-32 text-slate-500">Cargando cotización...</div>
              ) : quote ? (
                <AssetQuoteDetail quote={quote} />
              ) : (
                <div className="flex items-center justify-center h-32 text-rose-500">No se pudo cargar la cotización.</div>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cantidad</label>
            <input
              type="number"
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition dark:text-slate-200"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              required
              placeholder="Ej: 1"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-sm px-4 py-2.5 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-60"
            >
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};