import { type FormEvent, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const { register, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error de registro';
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>Registro</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Usuario</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Crear cuenta'}</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}
