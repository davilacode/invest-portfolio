import { useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as loginService, register as registerService, logout as logoutService, getStoredUser, isAuthenticated } from '../services/auth';
import type { User } from '../services/auth';
import { AuthContext } from './useAuth';
import { api, setCsrfToken } from '../services/api';
import ServerLoadingScreen from '../components/ServerLoadingScreen';


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [serverReady, setServerReady] = useState(false);

  // Función para obtener y guardar el CSRF token
  const fetchAndStoreCsrfToken = useCallback(async () => {
    try {
      const res = await api.instance.get('/auth/csrf/');
      if (res.data?.csrftoken) {
        setCsrfToken(res.data.csrftoken);
        setServerReady(true);
      }
    } catch (e) {
      console.debug('[CSRF] fallo obteniendo token', e);
      setTimeout(fetchAndStoreCsrfToken, 2000); // Reintenta cada 2s
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginService(username, password);
      if (data.user) setUser(data.user);
      setIsAuth(true);
      await fetchAndStoreCsrfToken(); // Renovar CSRF tras login
    } finally {
      setLoading(false);
    }
  }, [fetchAndStoreCsrfToken]);

  const register = useCallback(async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const user = await registerService(username, email, password);
      setUser(user);
      await fetchAndStoreCsrfToken(); // Renovar CSRF tras registro
    } finally {
      setLoading(false);
    }
  }, [fetchAndStoreCsrfToken]);

  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
    setIsAuth(false);
  }, []);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  useEffect(() => {
    fetchAndStoreCsrfToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!serverReady) {
    return <ServerLoadingScreen />;
  }
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}



export default AuthProvider;
