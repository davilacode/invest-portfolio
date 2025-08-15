import axios, { AxiosError, type AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

export const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');

const cookie = new Cookies();

export interface AuthTokens {
  access: string;
  refresh?: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const getCsrfToken = () => {
  return cookie.get('csrftoken');
};

// Request interceptor to inject CSRF token from cookies
apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  console.log(cookie.get('csrftoken'))
  if (csrfToken && config.headers) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

// Response interceptor for error normalization
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // TODO: Refresh tokens
    let message = error.message || 'Request failed';
    const data: unknown = error.response?.data;
    if (data && typeof data === 'object' && 'detail' in data) {
      const detail = (data as { detail?: unknown }).detail;
      if (typeof detail === 'string' && detail.trim()) message = detail;
    }
    return Promise.reject(new Error(message));
  }
);

export const api = {
  get: async <T>(path: string, params?: Record<string, unknown>) => {
    const res = await apiClient.get<T>(path, { params });
    return res.data;
  },
  post: async <T>(path: string, body?: unknown) => {
    const res = await apiClient.post<T>(path, body);
    return res.data;
  },
  put: async <T>(path: string, body?: unknown) => {
    const res = await apiClient.put<T>(path, body);
    return res.data;
  },
  patch: async <T>(path: string, body?: unknown) => {
    const res = await apiClient.patch<T>(path, body);
    return res.data;
  },
  delete: async <T>(path: string) => {
    const res = await apiClient.delete<T>(path);
    return res.data;
  },

  instance: apiClient,
};

export type ApiType = typeof api;
