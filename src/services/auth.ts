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
  const data = await api.post<LoginResponse>('/auth/login/', { username, password });
  if (data) localStorage.setItem('user', JSON.stringify(data));
  return data;
}

export async function register(username: string, email: string, password: string): Promise<User> {
  const user = await api.post<User>('/auth/register/', { username, email, password });
  return user;
}

export async function logout() {
  const data = await api.post('/auth/logout/');
  localStorage.removeItem('user');
  return data;
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('accessToken');
}
