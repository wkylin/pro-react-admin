export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const statusMessages: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '没有权限访问',
  404: '请求资源不存在',
  405: '请求方法不允许',
  408: '请求超时',
  429: '请求过于频繁',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

export const getHttpErrorMessage = (status: number): string => statusMessages[status] || `请求失败 (${status})`

export class RequestError extends Error {
  requestId?: string

  constructor(
    message: string,
    public status?: number,
    public code?: number | string,
    public response?: unknown
  ) {
    super(message)
    this.name = 'RequestError'
  }
}

/** Keep successful envelopes intact so both adapters expose the same business payload. */
export function assertSuccessfulPayload<T>(payload: T, status?: number): T {
  if (status !== undefined && (status < 200 || status >= 300)) {
    const message = isRecord(payload) ? payload.message || payload.msg : undefined
    throw new RequestError(
      typeof message === 'string' ? message : getHttpErrorMessage(status),
      status,
      undefined,
      payload
    )
  }
  if (isRecord(payload) && 'code' in payload && payload.code !== 0 && payload.code !== 200) {
    const message = payload.message || payload.msg
    throw new RequestError(
      typeof message === 'string' ? message : '请求失败',
      status,
      typeof payload.code === 'number' || typeof payload.code === 'string' ? payload.code : undefined,
      payload
    )
  }
  return payload
}

export function unwrapPayload(payload: unknown): unknown {
  assertSuccessfulPayload(payload)
  return isRecord(payload) && 'code' in payload && 'data' in payload ? payload.data : payload
}
