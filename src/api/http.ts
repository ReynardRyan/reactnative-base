import axios, { AxiosError } from 'axios';
import env from '../config/env';
import { getToken, clearToken } from './auth';

// Create a pre-configured axios instance
export const http = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

// Request interceptor: attach Authorization and content-type
http.interceptors.request.use(async (config) => {
  const token = await getToken();

  const headersAny = config.headers as any;
  if (!headersAny) {
    config.headers = {} as any;
  }

  const hasHeader = (key: string): boolean => {
    const h = config.headers as any;
    return h?.has ? h.has(key) : !!h?.[key];
  };

  const setHeader = (key: string, value: string) => {
    const h = config.headers as any;
    if (h?.set) h.set(key, value);
    else (config.headers as any)[key] = value;
  };

  if (token && !hasHeader('Authorization')) {
    setHeader('Authorization', `Bearer ${token}`);
  }

  if (!hasHeader('Content-Type')) {
    setHeader('Content-Type', 'application/json');
  }

  if (env.APP_NAME && !hasHeader('X-Client')) {
    setHeader('X-Client', env.APP_NAME);
  }

  return config;
});

// Response interceptor: normalize errors and handle 401
http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // On unauthorized, clear token (app can navigate to login upon rejection)
    const status = error.response?.status;
    if (status === 401) {
      await clearToken();
    }
    // Build a normalized error
    const normalized = {
      name: 'ApiError',
      message:
        (error.response?.data as any)?.message ||
        error.message ||
        'Unexpected network error',
      status: status ?? 0,
      code: (error.response?.data as any)?.code,
      details: error.response?.data ?? null,
      url: error.config?.url,
      method: error.config?.method,
    } as const;
    return Promise.reject(normalized);
  }
);

export default http;
