import { useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as loginService, register as registerService, logout as logoutService, getStoredUser, isAuthenticated } from '../services/auth';
import type { User } from '../services/auth';
import { AuthContext } from './useAuth';
import { api, getCsrfToken } from '../services/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const login = useCallback(async (username: string, password: string) => {

    setLoading(true);
    try {
      const data = await loginService(username, password);
      if (data.user) setUser(data.user);
      setIsAuth(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const user = await registerService(username, email, password);
      setUser(user);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setUser(null);
    setIsAuth(false);
  }, []);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  useEffect(() => {
    if (getCsrfToken()) {
      return;
    }
    (async () => {
      try {
        await api.instance.get('/auth/csrf');
      } catch (e) {
        console.debug('[CSRF] fallo obteniendo token', e);
      }
    })();
    return;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;
