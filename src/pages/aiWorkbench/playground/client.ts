import { parseEnterpriseSession, readEnterpriseSession, type EnterpriseSession } from '@platform/auth/model/session'
import { getEnv } from '@platform/config/env'
import {
  normalizeSearchResponse,
  validateSearchRequest,
  type TavilySearchRequest,
  type TavilySearchResponse,
} from './model'

export type TavilyClientErrorCode =
  | 'sessionRequired'
  | 'network'
  | 'timeout'
  | 'aborted'
  | 'invalidResponse'
  | 'forbidden'
  | 'invalid_query'
  | 'invalid_search_options'
  | 'search_rate_limited'
  | 'session_expired'
  | 'session_revoked'
  | 'tavily_not_configured'
  | 'tavily_rate_limited'
  | 'tavily_quota_exceeded'
  | 'tavily_timeout'
  | 'tavily_unavailable'
  | 'unauthorized'

export class TavilyClientError extends Error {
  constructor(
    public readonly code: TavilyClientErrorCode,
    public readonly retryAfter?: number
  ) {
    super(`Search failed: ${code}`)
    this.name = 'TavilyClientError'
  }
}

const serverErrorCodes = new Set<TavilyClientErrorCode>([
  'forbidden',
  'invalid_query',
  'invalid_search_options',
  'search_rate_limited',
  'session_expired',
  'session_revoked',
  'tavily_not_configured',
  'tavily_rate_limited',
  'tavily_quota_exceeded',
  'tavily_timeout',
  'tavily_unavailable',
  'unauthorized',
])

function retryAfterSeconds(response: Response): number | undefined {
  const header = response.headers.get('Retry-After')
  if (!header) return undefined
  if (/^\d+$/.test(header.trim())) return Math.min(86_400, Number(header.trim()))
  const date = Date.parse(header)
  return Number.isFinite(date) ? Math.min(86_400, Math.max(0, Math.ceil((date - Date.now()) / 1000))) : undefined
}

async function responseError(response: Response): Promise<TavilyClientError> {
  let code: TavilyClientErrorCode =
    response.status === 401
      ? 'unauthorized'
      : response.status === 403
        ? 'forbidden'
        : response.status === 429
          ? 'search_rate_limited'
          : response.status === 504
            ? 'tavily_timeout'
            : response.status === 400
              ? 'invalid_search_options'
              : 'tavily_unavailable'
  try {
    const body: unknown = await response.json()
    if (
      body &&
      typeof body === 'object' &&
      'error' in body &&
      typeof body.error === 'string' &&
      serverErrorCodes.has(body.error as TavilyClientErrorCode)
    )
      code = body.error as TavilyClientErrorCode
  } catch {
    // Provider response text is never propagated into the UI.
  }
  return new TavilyClientError(code, retryAfterSeconds(response))
}

export interface TavilySearchOptions {
  session?: EnterpriseSession
  signal?: AbortSignal
  fetcher?: typeof fetch
  timeoutMs?: number
}

export async function searchTavily(
  request: TavilySearchRequest,
  options: TavilySearchOptions = {}
): Promise<TavilySearchResponse> {
  const validated = validateSearchRequest(request)
  if (options.signal?.aborted) throw new TavilyClientError('aborted')
  let session: EnterpriseSession | null
  try {
    session = options.session ? parseEnterpriseSession(options.session) : readEnterpriseSession()
  } catch {
    throw new TavilyClientError('sessionRequired')
  }
  if (!session || session.expiresAt <= Date.now()) throw new TavilyClientError('sessionRequired')
  const controller = new AbortController()
  let cancellationError: TavilyClientError | undefined
  let cancelRequest: (code: 'aborted' | 'timeout') => void
  const cancelled = new Promise<never>((_resolve, reject) => {
    cancelRequest = (code) => {
      cancellationError ??= new TavilyClientError(code)
      reject(cancellationError)
      controller.abort()
    }
  })
  const onAbort = () => cancelRequest('aborted')
  const timeoutMs =
    typeof options.timeoutMs === 'number' && Number.isFinite(options.timeoutMs) && options.timeoutMs > 0
      ? options.timeoutMs
      : 30_000
  const timer = setTimeout(() => cancelRequest('timeout'), timeoutMs)
  options.signal?.addEventListener('abort', onAbort, { once: true })
  const run = async () => {
    let response: Response
    try {
      response = await (options.fetcher ?? fetch)(
        `${getEnv('APP_BASE_URL').replace(/\/+$/, '')}/api/ai/tavily-search`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`,
            'X-Tenant-ID': session.tenantId,
          },
          credentials: 'omit',
          signal: controller.signal,
          body: JSON.stringify(validated),
        }
      )
    } catch {
      throw new TavilyClientError('network')
    }
    if (!response.ok) throw await responseError(response)
    if (!response.headers.get('Content-Type')?.toLowerCase().includes('application/json'))
      throw new TavilyClientError('invalidResponse')
    try {
      return normalizeSearchResponse(await response.json())
    } catch {
      throw new TavilyClientError('invalidResponse')
    }
  }
  try {
    return await Promise.race([run(), cancelled])
  } catch (error) {
    throw cancellationError ?? error
  } finally {
    clearTimeout(timer)
    options.signal?.removeEventListener('abort', onAbort)
  }
}
