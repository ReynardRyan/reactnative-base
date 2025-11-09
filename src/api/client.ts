import { AxiosRequestConfig } from 'axios';
import http from './http';

export type RequestConfig = Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'>;

export async function get<T>(url: string, params?: Record<string, any>, config?: RequestConfig): Promise<T> {
  const res = await http.get<T>(url, { params, ...(config || {}) });
  return res.data as T;
}

export async function post<T, B = unknown>(url: string, body?: B, config?: RequestConfig): Promise<T> {
  const res = await http.post<T>(url, body, config);
  return res.data as T;
}

export async function put<T, B = unknown>(url: string, body?: B, config?: RequestConfig): Promise<T> {
  const res = await http.put<T>(url, body, config);
  return res.data as T;
}

export async function patch<T, B = unknown>(url: string, body?: B, config?: RequestConfig): Promise<T> {
  const res = await http.patch<T>(url, body, config);
  return res.data as T;
}

export async function del<T>(url: string, config?: RequestConfig): Promise<T> {
  const res = await http.delete<T>(url, config);
  return res.data as T;
}

export default {
  get,
  post,
  put,
  patch,
  del,
};
