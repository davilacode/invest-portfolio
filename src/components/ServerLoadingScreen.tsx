
export default function ServerLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-neutral-900 dark:to-neutral-950 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-xl rounded-2xl p-8 border border-slate-200/60 dark:border-neutral-800 flex flex-col items-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-4 text-center">Iniciando servidor...</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-center text-sm">Esto puede tardar unos segundos si el servidor está en modo reposo.</p>
          <div className="w-12 h-12 border-4 border-slate-300 dark:border-neutral-700 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin mb-2" />
        </div>
      </div>
    </div>
  );
}
