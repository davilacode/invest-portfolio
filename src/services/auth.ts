import { api } from './api';

export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface LoginResponse {
  access: string;
  refresh?: string;
  user?: User;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const user = await api.post<LoginResponse>('/auth/login/', { username, password });
  if (user) localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export async function register(username: string, email: string, password: string): Promise<User> {
  const user = await api.post<User>('/auth/register/', { username, email, password });
  return user;
}

export async function logout() {
  const data = await api.post('/auth/logout/');
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return data;
}

export function getStoredUser(): User | null {
  const user = localStorage.getItem('user');
  if (!user) return null;

  const parsed = JSON.parse(user);
  if (parsed) return parsed;
  return null;
}

export function isAuthenticated(): boolean {
  return !!(localStorage.getItem('accessToken') || localStorage.getItem('user'));
}
