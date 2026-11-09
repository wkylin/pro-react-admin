import { searchTavily, TavilyClientError } from './client'
import { createDefaultRequest } from './model'

const request = () => ({ ...createDefaultRequest(), query: 'React accessibility' })
const payload = () => ({ query: 'React accessibility', answer: 'An answer', results: [], images: [] })

function response(body: unknown = payload(), status = 200, headers: Record<string, string> = {}): Response {
  const values = { 'content-type': 'application/json', ...headers }
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (key: string) => values[key.toLowerCase()] ?? null },
    json: jest.fn(async () => body),
  } as unknown as Response
}

function signIn() {
  localStorage.setItem(
    'enterprise_session',
    JSON.stringify({
      token: 'a'.repeat(43),
      tenantId: 'acme',
      expiresAt: Date.now() + 60_000,
      user: { id: 'user-1', name: 'Avery', email: 'avery@example.test' },
    })
  )
}

beforeEach(() => {
  localStorage.clear()
  signIn()
})

afterEach(() => jest.useRealTimers())

it('sends normalized search parameters through the authenticated JSON endpoint', async () => {
  const fetcher = jest.fn(async (_url: RequestInfo | URL, _init?: RequestInit) => response())
  await expect(searchTavily({ ...request(), query: '  React accessibility  ' }, { fetcher })).resolves.toEqual(
    payload()
  )
  expect(fetcher).toHaveBeenCalledTimes(1)
  const [url, init] = fetcher.mock.calls[0]
  expect(String(url)).toMatch(/\/api\/ai\/tavily-search$/)
  expect(init).toMatchObject({
    method: 'POST',
    credentials: 'omit',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${'a'.repeat(43)}`,
      'X-Tenant-ID': 'acme',
    },
  })
  expect(JSON.parse(init!.body as string)).toEqual(request())
  expect(init?.body).not.toContain('a'.repeat(43))
  expect(init?.body).not.toContain('api_key')
})

it('validates the draft before contacting any service', async () => {
  const fetcher = jest.fn()
  await expect(searchTavily({ ...request(), query: '' }, { fetcher })).rejects.toMatchObject({
    name: 'TavilyValidationError',
    field: 'query',
  })
  expect(fetcher).not.toHaveBeenCalled()
})

it('uses a page-local search session without changing the dashboard identity', async () => {
  const hostSession = localStorage.getItem('enterprise_session')
  const session = {
    token: 'b'.repeat(43),
    tenantId: 'beta',
    expiresAt: Date.now() + 60_000,
    user: { id: 'search-user', name: 'Search user', email: 'search@example.test' },
  }
  const fetcher = jest.fn(async (_url: RequestInfo | URL, _init?: RequestInit) => response())
  await searchTavily(request(), { fetcher, session })
  expect(fetcher.mock.calls[0][1]?.headers).toMatchObject({
    Authorization: `Bearer ${session.token}`,
    'X-Tenant-ID': 'beta',
  })
  expect(localStorage.getItem('enterprise_session')).toBe(hostSession)
  expect(localStorage.length).toBe(1)
})

it.each(['expired', 'malformed'])(
  'rejects an invalid explicit session without falling back to the host session: %s',
  async (kind) => {
    const session = {
      token: kind === 'malformed' ? 'invalid' : 'b'.repeat(43),
      tenantId: 'beta',
      expiresAt: kind === 'expired' ? Date.now() - 1 : Date.now() + 60_000,
      user: { id: 'search-user', name: 'Search user', email: 'search@example.test' },
    }
    const fetcher = jest.fn()
    await expect(searchTavily(request(), { fetcher, session })).rejects.toMatchObject({ code: 'sessionRequired' })
    expect(fetcher).not.toHaveBeenCalled()
  }
)

it.each(['missing', 'expired', 'malformed'])('requires a valid enterprise session: %s', async (kind) => {
  if (kind === 'missing') localStorage.removeItem('enterprise_session')
  else if (kind === 'malformed') localStorage.setItem('enterprise_session', 'invalid')
  else {
    const session = JSON.parse(localStorage.getItem('enterprise_session')!)
    localStorage.setItem('enterprise_session', JSON.stringify({ ...session, expiresAt: Date.now() - 1 }))
  }
  const fetcher = jest.fn()
  await expect(searchTavily(request(), { fetcher })).rejects.toMatchObject({ code: 'sessionRequired' })
  expect(fetcher).not.toHaveBeenCalled()
})

it.each([
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
])('propagates only recognized server code %s, including bounded retry timing', async (code) => {
  const fetcher = jest.fn(async () =>
    response({ error: code, details: 'private-provider-key' }, 429, { 'retry-after': '600' })
  )
  const pending = searchTavily(request(), { fetcher })
  await expect(pending).rejects.toMatchObject({ code, retryAfter: 600 })
  await expect(pending).rejects.not.toHaveProperty('message', expect.stringContaining('private-provider-key'))
  expect(fetcher).toHaveBeenCalledTimes(1)
})

it.each([
  [400, 'invalid_search_options'],
  [401, 'unauthorized'],
  [403, 'forbidden'],
  [429, 'search_rate_limited'],
  [504, 'tavily_timeout'],
  [502, 'tavily_unavailable'],
])('maps unknown HTTP %s error bodies without leaking provider details', async (status, code) => {
  const fetcher = jest.fn(async () => response({ error: 'private-provider-key' }, Number(status)))
  await expect(searchTavily(request(), { fetcher })).rejects.toMatchObject({ code })
})

it('maps network failures without exposing raw exception text', async () => {
  const fetcher = jest.fn(async () => {
    throw new Error('private-provider-key')
  })
  await expect(searchTavily(request(), { fetcher })).rejects.toEqual(new TavilyClientError('network'))
})

it('rejects a successful response with an unexpected content type', async () => {
  const fetcher = jest.fn(async () => response(payload(), 200, { 'content-type': 'text/event-stream' }))
  await expect(searchTavily(request(), { fetcher })).rejects.toHaveProperty('code', 'invalidResponse')
})

it.each([{}, null, { ...payload(), results: null }])('rejects malformed response envelopes: %j', async (body) => {
  const fetcher = jest.fn(async () => response(body))
  await expect(searchTavily(request(), { fetcher })).rejects.toHaveProperty('code', 'invalidResponse')
})

it('rejects malformed JSON', async () => {
  const fetcher = jest.fn(
    async () =>
      ({
        ...response(),
        json: async () => {
          throw new SyntaxError('private-provider-key')
        },
      }) as Response
  )
  await expect(searchTavily(request(), { fetcher })).rejects.toHaveProperty('code', 'invalidResponse')
})

it('does not start a request after an external cancellation', async () => {
  const controller = new AbortController()
  controller.abort()
  const fetcher = jest.fn()
  await expect(searchTavily(request(), { signal: controller.signal, fetcher })).rejects.toHaveProperty(
    'code',
    'aborted'
  )
  expect(fetcher).not.toHaveBeenCalled()
})

it('cancels a fetch that ignores AbortSignal and cleans up timeout and listener', async () => {
  jest.useFakeTimers()
  const controller = new AbortController()
  const removed = jest.spyOn(controller.signal, 'removeEventListener')
  const fetcher = jest.fn((_url: RequestInfo | URL, _init?: RequestInit) => new Promise<Response>(() => {}))
  const pending = searchTavily(request(), { signal: controller.signal, fetcher })
  const rejected = expect(pending).rejects.toHaveProperty('code', 'aborted')
  controller.abort()
  await rejected
  expect(fetcher.mock.calls[0][1]?.signal?.aborted).toBe(true)
  expect(removed).toHaveBeenCalledWith('abort', expect.any(Function))
  expect(jest.getTimerCount()).toBe(0)
})

it.each(['fetch', 'body', 'errorBody'])(
  'times out during %s even when the underlying promise never settles',
  async (phase) => {
    jest.useFakeTimers()
    const body = {
      ...response(payload(), phase === 'errorBody' ? 429 : 200),
      json: () => new Promise<unknown>(() => {}),
    } as Response
    const fetcher = jest.fn((_url: RequestInfo | URL, _init?: RequestInit) =>
      phase === 'fetch' ? new Promise<Response>(() => {}) : Promise.resolve(body)
    )
    const pending = searchTavily(request(), { fetcher, timeoutMs: 50 })
    const rejected = expect(pending).rejects.toHaveProperty('code', 'timeout')
    await jest.advanceTimersByTimeAsync(50)
    await rejected
    expect(fetcher.mock.calls[0][1]?.signal?.aborted).toBe(true)
    expect(jest.getTimerCount()).toBe(0)
  }
)

it('also supports external cancellation while decoding the response body', async () => {
  const controller = new AbortController()
  const json = jest.fn(() => new Promise<unknown>(() => {}))
  const fetcher = jest.fn(async () => ({ ...response(), json }) as Response)
  const pending = searchTavily(request(), { fetcher, signal: controller.signal })
  const rejected = expect(pending).rejects.toHaveProperty('code', 'aborted')
  await Promise.resolve()
  expect(json).toHaveBeenCalledTimes(1)
  controller.abort()
  await rejected
})
