import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>Panel Privado</h2>
      <p>Bienvenido {user?.username}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default function App() {
  const { isAuth } = useAuth();
  return (
    <>
      <nav style={{ display: 'flex', gap: 16, padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Inicio</Link>
        {!isAuth && <Link to="/login">Login</Link>}
        {!isAuth && <Link to="/register">Registro</Link>}
        {isAuth && <Link to="/dashboard">Dashboard</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<div style={{ padding: 24 }}><h1>Inicio público</h1><p>Contenido público</p></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
      </Routes>
    </>
  );
}

