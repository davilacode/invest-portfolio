import axios, { AxiosError, type AxiosInstance } from 'axios';

export const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');

export interface AuthTokens {
  access: string;
  refresh?: string;
}

const CSRF_STORAGE_KEY = 'csrfToken';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export function setCsrfToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CSRF_STORAGE_KEY, token);
  }
  apiClient.defaults.headers.common['X-CSRFToken'] = token;
}

export function getCsrfToken() {
  const csrfToken = localStorage.getItem(CSRF_STORAGE_KEY);
  return csrfToken;
}

// Response interceptor for error normalization
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // TODO: Refresh tokens
    let message = error.message || 'Request failed';
    const data: unknown = error.response?.data;
    
    // Normalización para respuestas tipo Django REST Framework con errores por campo
    if (data && typeof data === 'object') {
      const obj = data as Record<string, unknown>;
      // Prioridad al campo 'detail'
      if ('detail' in obj && typeof obj.detail === 'string' && obj.detail.trim()) {
        message = obj.detail.trim();
      } else {
        const collected: string[] = [];
        for (const [field, value] of Object.entries(obj)) {
          if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
            // Si solo hay un campo (p.ej. password) no anteponer el nombre del campo para limpieza visual
            const singleField = Object.keys(obj).length === 1;
            for (const v of value) {
              collected.push(singleField ? v : `${field}: ${v}`);
            }
          } else if (typeof value === 'string') {
            collected.push(`${field}: ${value}`);
          }
        }
        if (collected.length) {
          message = collected.join('\n');
        }
      }
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
