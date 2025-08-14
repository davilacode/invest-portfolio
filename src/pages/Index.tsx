import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-neutral-900 dark:to-neutral-950 px-4 pt-24 pb-12">
      <div className="w-full max-w-2xl mx-auto">
        <section className="relative overflow-hidden bg-white/70 dark:bg-neutral-900/60 backdrop-blur rounded-3xl shadow-xl border border-slate-200/60 dark:border-neutral-800 p-10">
          <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 text-center mb-4">
              Bienvenido a <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Invest Portfolio</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 text-center max-w-xl mx-auto mb-8">
              Gestiona y visualiza tus inversiones fácilmente: organiza portafolios, sigue el rendimiento y mantén el control de tus assets en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="relative inline-flex items-center justify-center w-full sm:w-auto rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-3 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-indigo-600/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-sm font-medium px-6 py-3 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear cuenta
              </button>
            </div>
            <p className="mt-8 text-[11px] text-center text-slate-500 dark:text-slate-500">
              Al continuar aceptas nuestra política de privacidad y términos de uso.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
