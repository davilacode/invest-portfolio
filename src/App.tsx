import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Index from './pages/Index';
import { Dashboard } from './pages/dashboard/Index';
import { Portfolio } from './pages/dashboard/Portfolio';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

function getInitialTheme() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

export default function App() {
  const { isAuth } = useAuth();
  
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <nav className="flex items-center gap-4 px-6 py-3 border-b border-slate-200/70 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-neutral-900/40 fixed top-0 w-full z-10">
        <Link to="/" className="font-semibold text-slate-800 dark:text-slate-100">Inicio</Link>
        {!isAuth && <Link to="/login" className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Login</Link>}
        {!isAuth && <Link to="/register" className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Registro</Link>}
        {isAuth && <Link to="/dashboard" className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Dashboard</Link>}
      
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="ml-auto p-2 rounded hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isAuth ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/portfolio/:id" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="*" element={<div className="p-6">404</div>} />
      </Routes>
    </>
  );
}

