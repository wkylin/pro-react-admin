import request from './request'
import { http } from './http'

export interface RequestOptions {
  signal?: AbortSignal
  timeout?: number
  headers?: Record<string, string>
  showError?: boolean
  isShowError?: boolean
  needToken?: boolean
  addTimestamp?: boolean
  cancelDuplicate?: boolean
  encrypt?: boolean
  decrypt?: boolean
  encryptFields?: string[]
}

export interface JsonClient {
  get<T = unknown>(url: string, params?: Record<string, unknown>, options?: RequestOptions): Promise<T>
  post<T = unknown>(url: string, body?: unknown, options?: RequestOptions): Promise<T>
  put<T = unknown>(url: string, body?: unknown, options?: RequestOptions): Promise<T>
  patch<T = unknown>(url: string, body?: unknown, options?: RequestOptions): Promise<T>
  delete<T = unknown>(url: string, params?: Record<string, unknown>, options?: RequestOptions): Promise<T>
}

type Transport = {
  get(url: string, params?: Record<string, unknown>, options?: RequestOptions): Promise<unknown>
  delete(url: string, params?: Record<string, unknown>, options?: RequestOptions): Promise<unknown>
  post(url: string, body?: unknown, options?: RequestOptions): Promise<unknown>
  put(url: string, body?: unknown, options?: RequestOptions): Promise<unknown>
  patch(url: string, body?: unknown, options?: RequestOptions): Promise<unknown>
}

/** Generic result types describe the endpoint contract; domain APIs validate unknown input. */
function createJsonClient(transport: Transport): JsonClient {
  return {
    get: <T>(url: string, params = {}, options = {}) => transport.get(url, params, options) as Promise<T>,
    post: <T>(url: string, body: unknown = {}, options = {}) => transport.post(url, body, options) as Promise<T>,
    put: <T>(url: string, body: unknown = {}, options = {}) => transport.put(url, body, options) as Promise<T>,
    patch: <T>(url: string, body: unknown = {}, options = {}) => transport.patch(url, body, options) as Promise<T>,
    delete: <T>(url: string, params = {}, options = {}) => transport.delete(url, params, options) as Promise<T>,
  }
}

export const apiClient = createJsonClient(request)
export const fetchClient = createJsonClient(http)
