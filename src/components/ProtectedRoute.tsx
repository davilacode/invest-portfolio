import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { type ReactNode } from 'react';

interface Props { children: ReactNode; }

export function ProtectedRoute({ children }: Props) {
  const { isAuth } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
