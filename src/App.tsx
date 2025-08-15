import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Index from './pages/Index';
import { Dashboard } from './pages/dashboard/Index';
import { Portfolio } from './pages/dashboard/Portfolio';

export default function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <nav className="flex items-center gap-4 px-6 py-3 border-b border-slate-200/70 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-neutral-900/40 fixed top-0 w-full z-10">
        <Link to="/" className="font-semibold text-slate-800 dark:text-slate-100">Inicio</Link>
        {!isAuth && <Link to="/login" className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Login</Link>}
        {!isAuth && <Link to="/register" className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Registro</Link>}
        {isAuth && <Link to="/dashboard" className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Dashboard</Link>}
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

