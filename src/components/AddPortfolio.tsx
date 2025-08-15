
import { useState } from 'react';
import { useCreatePortfolio } from '../hooks/usePortfolio';

interface AddPortfolioProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddPortfolio: React.FC<AddPortfolioProps> = ({
  open,
  setOpen
}) => {

  const [name, setName] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('');
  const [loading, setLoading] = useState(false);

  const { mutate } = useCreatePortfolio();

  if (!open) return null;

  const onCreate = async () => {
    setLoading(true);
    // Lógica para crear el portafolio
    mutate({ name, base_currency: baseCurrency }, {
      onSuccess: () => {
        setName('');
        setBaseCurrency('');
        setLoading(false);
        setOpen(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Crear nuevo portafolio</h3>
        <form onSubmit={e => { e.preventDefault(); onCreate(); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition dark:text-slate-200"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Ej: Portafolio Inversión"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Moneda base</label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition dark:text-slate-200"
              value={baseCurrency}
              onChange={e => setBaseCurrency(e.target.value)}
              required
              placeholder="Ej: USD"
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