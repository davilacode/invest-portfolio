import { type FormEvent, useState } from 'react';
import { useAuth } from '../context/useAuth';
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
      navigate('/');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error de login';
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Usuario</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  );
}
