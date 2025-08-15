import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AssetQuoteDetailProps {
  quote: {
    symbol: string;
    name: string;
    price: number;
    period: string;
    history: number[];
  };
}

export function AssetQuoteDetail({ quote }: AssetQuoteDetailProps) {
  if (!quote) return null;
  const data = quote.history.map((price, idx) => ({ day: idx + 1, price }));

  return (
    <div className="rounded-xl bg-white/80 dark:bg-neutral-900/70 p-4 shadow mb-4">
      <div className="mb-2 dark:text-slate-300">
        <span className="font-bold ">{quote.symbol}</span> - {quote.name}
        <span className="ml-4 text-indigo-600 font-semibold dark:text-indigo-300">${quote.price.toFixed(2)}</span>
      </div>
      <div className="text-xs text-slate-500 mb-2">Periodo: {quote.period}</div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
