import { parseEnterpriseSession, type EnterpriseSession } from '@platform/auth/model/session'
import { getEnv } from '@platform/config/env'

export interface SearchCredentials {
  tenantId: string
  email: string
  password: string
  totpCode?: string
  recoveryCode?: string
}

export type SearchConnectionErrorCode =
  | 'invalidCredentials'
  | 'secondFactorInvalid'
  | 'serviceNotConfigured'
  | 'rateLimited'
  | 'network'
  | 'timeout'
  | 'aborted'
  | 'invalidResponse'
  | 'unavailable'

export class SearchConnectionError extends Error {
  constructor(public readonly code: SearchConnectionErrorCode) {
    super(`Search connection failed: ${code}`)
    this.name = 'SearchConnectionError'
  }
}

export interface SearchConnectionOptions {
  signal?: AbortSignal
  fetcher?: typeof fetch
  timeoutMs?: number
}

type ConnectionResult = EnterpriseSession | { totpRequired: true }
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

function httpError(status: number, payload: unknown, secondFactor: boolean): SearchConnectionError {
  const code = isRecord(payload) ? (payload.error ?? payload.message) : undefined
  return new SearchConnectionError(
    status === 404 || (status === 503 && code === 'enterprise_not_configured')
      ? 'serviceNotConfigured'
      : status === 429
        ? 'rateLimited'
        : code === 'invalid_second_factor' || code === 'multiple_second_factors'
          ? 'secondFactorInvalid'
          : code === 'invalid_credentials'
            ? 'invalidCredentials'
            : status === 401
              ? secondFactor
                ? 'secondFactorInvalid'
                : 'invalidCredentials'
              : status === 400
                ? 'invalidCredentials'
                : 'unavailable'
  )
}

async function request<T>(
  path: string,
  init: RequestInit,
  options: SearchConnectionOptions,
  read: (payload: unknown) => T,
  secondFactor = false,
  onPayload?: (payload: unknown, cancelled: boolean) => void
): Promise<T> {
  if (options.signal?.aborted) throw new SearchConnectionError('aborted')
  const controller = new AbortController()
  let cancellation: SearchConnectionError | undefined
  let cancel: (code: 'aborted' | 'timeout') => void
  const cancelled = new Promise<never>((_resolve, reject) => {
    cancel = (code) => {
      cancellation ??= new SearchConnectionError(code)
      reject(cancellation)
      controller.abort()
    }
  })
  const onAbort = () => cancel('aborted')
  options.signal?.addEventListener('abort', onAbort, { once: true })
  const timeoutMs =
    typeof options.timeoutMs === 'number' && Number.isFinite(options.timeoutMs) && options.timeoutMs > 0
      ? options.timeoutMs
      : 12_000
  const timer = setTimeout(() => cancel('timeout'), timeoutMs)
  const run = async () => {
    let response: Response
    try {
      response = await (options.fetcher ?? fetch)(`${getEnv('APP_BASE_URL').replace(/\/+$/, '')}${path}`, {
        ...init,
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init.headers },
        credentials: 'omit',
        cache: 'no-store',
        redirect: 'error',
        signal: controller.signal,
      })
    } catch {
      throw new SearchConnectionError('network')
    }
    // Revocation is complete when the credential is already invalid or expired.
    if (init.method === 'DELETE' && response.status === 401) return read(undefined)
    if (!response.ok) {
      let payload: unknown
      try {
        payload = await response.json()
      } catch {
        // Only recognized error codes are used; raw server text never reaches the UI.
      }
      throw httpError(response.status, payload, secondFactor)
    }
    if (response.status === 204) return read(undefined)
    if (!response.headers.get('Content-Type')?.toLowerCase().includes('application/json'))
      throw new SearchConnectionError('invalidResponse')
    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      throw new SearchConnectionError('invalidResponse')
    }
    onPayload?.(payload, Boolean(cancellation))
    if (cancellation) throw cancellation
    return read(payload)
  }
  try {
    return await Promise.race([run(), cancelled])
  } catch (error) {
    throw cancellation ?? error
  } finally {
    clearTimeout(timer)
    options.signal?.removeEventListener('abort', onAbort)
  }
}

/** Separate service credentials never replace the application's demo or enterprise identity. */
export async function connectSearchService(
  credentials: SearchCredentials,
  options: SearchConnectionOptions = {}
): Promise<ConnectionResult> {
  if (options.signal?.aborted) throw new SearchConnectionError('aborted')
  if (
    typeof credentials.tenantId !== 'string' ||
    !/^[a-z][a-z0-9_-]{0,63}$/.test(credentials.tenantId.trim()) ||
    typeof credentials.email !== 'string' ||
    !credentials.email.trim() ||
    credentials.email.trim().length > 254 ||
    typeof credentials.password !== 'string' ||
    !credentials.password ||
    credentials.password.length > 256
  )
    throw new SearchConnectionError('invalidCredentials')
  const hasTotp = credentials.totpCode !== undefined
  const hasRecovery = credentials.recoveryCode !== undefined
  if (
    (hasTotp && hasRecovery) ||
    (hasTotp && (typeof credentials.totpCode !== 'string' || !/^\d{6}$/.test(credentials.totpCode.trim()))) ||
    (hasRecovery &&
      (typeof credentials.recoveryCode !== 'string' ||
        !credentials.recoveryCode.trim() ||
        credentials.recoveryCode.length > 128))
  )
    throw new SearchConnectionError('secondFactorInvalid')
  let revoked = false
  const revoke = (payload: unknown) => {
    if (revoked) return
    let session: EnterpriseSession
    try {
      session = parseEnterpriseSession(payload)
    } catch {
      return
    }
    revoked = true
    void disconnectSearchService(session, { fetcher: options.fetcher, timeoutMs: options.timeoutMs }).catch(
      () => undefined
    )
  }
  return request(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({
        tenantId: credentials.tenantId.trim(),
        email: credentials.email.trim(),
        password: credentials.password,
        ...(hasTotp ? { totpCode: credentials.totpCode!.trim() } : {}),
        ...(hasRecovery ? { recoveryCode: credentials.recoveryCode!.trim() } : {}),
      }),
    },
    options,
    (payload): ConnectionResult => {
      if (isRecord(payload) && payload.totpRequired === true) return { totpRequired: true }
      let session: EnterpriseSession
      try {
        session = parseEnterpriseSession(payload)
      } catch {
        throw new SearchConnectionError('invalidResponse')
      }
      if (session.expiresAt <= Date.now()) {
        revoke(session)
        throw new SearchConnectionError('invalidResponse')
      }
      return session
    },
    hasTotp || hasRecovery,
    (payload, cancelled) => {
      // Abort may not stop the server or body decoder; revoke any session arriving afterwards.
      if (cancelled) revoke(payload)
    }
  )
}

/** Revoke only this explicit service credential, without touching application authentication. */
export async function disconnectSearchService(
  session: EnterpriseSession,
  options: SearchConnectionOptions = {}
): Promise<void> {
  let valid: EnterpriseSession
  try {
    valid = parseEnterpriseSession(session)
  } catch {
    throw new SearchConnectionError('invalidResponse')
  }
  return request(
    '/api/auth/session',
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${valid.token}`, 'X-Tenant-ID': valid.tenantId },
      keepalive: true,
    },
    options,
    () => undefined
  )
}
