import { type FormEvent, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error de login';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-neutral-900 dark:to-neutral-950 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur shadow-xl rounded-2xl p-8 border border-slate-200/60 dark:border-neutral-800">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-6 text-center">Iniciar Sesión</h2>
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Usuario</label>
              <input
                id="username"
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Contraseña</label>
              <input
                id="password"
                type="password"
                className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="text-sm font-medium text-red-600 dark:text-rose-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-md px-3 py-2 flex items-center gap-2">
                <span role="img" aria-label="error">⚠️</span>
                <p className="m-0">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm px-4 py-2.5 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              {loading && (
                <span className="absolute left-3 inline-flex h-4 w-4 animate-spin rounded-full border-[2px] border-white/60 border-t-white"></span>
              )}
              <span className={loading ? 'pl-4' : ''}>{loading ? 'Entrando…' : 'Entrar'}</span>
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline decoration-indigo-400/40 hover:decoration-indigo-400">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
