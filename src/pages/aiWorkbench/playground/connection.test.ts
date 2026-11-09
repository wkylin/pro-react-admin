import {
  connectSearchService,
  disconnectSearchService,
  SearchConnectionError,
  type SearchCredentials,
} from './connection'
import { SESSION_CHANGED_EVENT, type EnterpriseSession } from '@platform/auth/model/session'

const credentials: SearchCredentials = {
  tenantId: 'acme',
  email: 'avery@example.test',
  password: 'service-account-password',
}
const session = (): EnterpriseSession => ({
  token: 's'.repeat(43),
  tenantId: 'acme',
  expiresAt: Date.now() + 60_000,
  user: { id: 'user-1', name: 'Avery', email: 'avery@example.test' },
})

function response(body: unknown = session(), status = 200, contentType = 'application/json'): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (name: string) => (name.toLowerCase() === 'content-type' ? contentType : null) },
    json: jest.fn(async () => body),
  } as unknown as Response
}

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((complete) => {
    resolve = complete
  })
  return { promise, resolve }
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  jest.useRealTimers()
  jest.restoreAllMocks()
})

it('uses the configured API and sends only service credentials without changing the host identity', async () => {
  const originalBase = process.env.APP_BASE_URL
  process.env.APP_BASE_URL = 'https://api.example.test/'
  localStorage.setItem('token', JSON.stringify({ token: 'demo@example.test' }))
  localStorage.setItem('user_permissions', 'demo-permissions')
  const stored = { ...localStorage }
  const changed = jest.fn()
  window.addEventListener(SESSION_CHANGED_EVENT, changed)
  const connected = session()
  const fetcher = jest.fn(async (_url: RequestInfo | URL, _init?: RequestInit) => response(connected))
  try {
    await expect(
      connectSearchService({ ...credentials, tenantId: ' acme ', email: ' avery@example.test ' }, { fetcher })
    ).resolves.toEqual(connected)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(fetcher.mock.calls[0][0]).toBe('https://api.example.test/api/auth/login')
    const init = fetcher.mock.calls[0][1]!
    expect(init).toMatchObject({
      method: 'POST',
      credentials: 'omit',
      cache: 'no-store',
      redirect: 'error',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    expect(init.headers).not.toHaveProperty('Authorization')
    expect(JSON.parse(init.body as string)).toEqual(credentials)
    expect({ ...localStorage }).toEqual(stored)
    expect(changed).not.toHaveBeenCalled()
  } finally {
    if (originalBase === undefined) delete process.env.APP_BASE_URL
    else process.env.APP_BASE_URL = originalBase
    window.removeEventListener(SESSION_CHANGED_EVENT, changed)
  }
})

it('returns a TOTP challenge and sends either the authenticator code or recovery code', async () => {
  const fetcher = jest.fn(async () => response({ totpRequired: true }))
  await expect(connectSearchService(credentials, { fetcher })).resolves.toEqual({ totpRequired: true })
  fetcher.mockResolvedValue(response(session()))
  for (const factor of [{ totpCode: ' 123456 ' }, { recoveryCode: ' recovery-code ' }]) {
    await connectSearchService({ ...credentials, ...factor }, { fetcher })
  }
  const requests = fetcher.mock.calls as unknown as Array<[string, RequestInit]>
  expect(JSON.parse(requests[1][1].body as string)).toEqual({ ...credentials, totpCode: '123456' })
  expect(JSON.parse(requests[2][1].body as string)).toEqual({ ...credentials, recoveryCode: 'recovery-code' })
  expect(localStorage.length).toBe(0)
})

it.each([
  [401, { error: 'invalid_credentials' }, 'invalidCredentials'],
  [401, { error: 'invalid_second_factor' }, 'secondFactorInvalid'],
  [400, { error: 'multiple_second_factors' }, 'secondFactorInvalid'],
  [404, {}, 'serviceNotConfigured'],
  [503, { error: 'enterprise_not_configured' }, 'serviceNotConfigured'],
  [429, { error: 'totp_rate_limited' }, 'rateLimited'],
  [502, {}, 'unavailable'],
  [503, { error: 'totp_unavailable' }, 'unavailable'],
])('maps HTTP %s to a fixed safe code %s', async (status, body, code) => {
  const fetcher = jest.fn(async () => response({ ...body, details: 'private-server-details' }, Number(status)))
  const pending = connectSearchService(credentials, { fetcher })
  await expect(pending).rejects.toEqual(new SearchConnectionError(String(code) as SearchConnectionError['code']))
  await expect(pending).rejects.not.toHaveProperty('message', expect.stringContaining('private-server-details'))
})

it('classifies an unknown 401 during the second factor step without invalidating host authentication', async () => {
  localStorage.setItem('token', 'host-demo-token')
  const fetcher = jest.fn(async () => response({}, 401))
  await expect(connectSearchService({ ...credentials, totpCode: '123456' }, { fetcher })).rejects.toHaveProperty(
    'code',
    'secondFactorInvalid'
  )
  expect(localStorage.getItem('token')).toBe('host-demo-token')
})

it.each([null, {}, { totpRequired: false }, { ...session(), token: 'malformed' }])(
  'rejects malformed successful session payload %j',
  async (payload) => {
    const fetcher = jest.fn(async () => response(payload))
    await expect(connectSearchService(credentials, { fetcher })).rejects.toHaveProperty('code', 'invalidResponse')
  }
)

it('rejects an expired session and revokes that newly returned credential', async () => {
  const fetcher = jest
    .fn(async (_url: RequestInfo | URL, _init?: RequestInit) => response(undefined, 204))
    .mockResolvedValueOnce(response({ ...session(), expiresAt: Date.now() - 1 }))
  await expect(connectSearchService(credentials, { fetcher })).rejects.toHaveProperty('code', 'invalidResponse')
  expect(fetcher).toHaveBeenCalledTimes(2)
  expect(fetcher.mock.calls[1][1]?.method).toBe('DELETE')
})

it.each(['html', 'json'])('rejects an invalid %s response without exposing its body', async (kind) => {
  const invalid =
    kind === 'html'
      ? response('private-server-details', 200, 'text/html')
      : ({ ...response(), json: async () => Promise.reject(new Error('private-server-details')) } as Response)
  await expect(connectSearchService(credentials, { fetcher: jest.fn(async () => invalid) })).rejects.toEqual(
    new SearchConnectionError('invalidResponse')
  )
})

it('maps network exceptions to a safe error', async () => {
  const fetcher = jest.fn(async () => {
    throw new Error('private-server-details')
  })
  await expect(connectSearchService(credentials, { fetcher })).rejects.toEqual(new SearchConnectionError('network'))
})

it.each([
  { ...credentials, tenantId: '../invalid' },
  { ...credentials, password: '' },
  { ...credentials, email: '' },
  { ...credentials, totpCode: '123456', recoveryCode: 'recovery-code' },
  { ...credentials, totpCode: '123' },
])('does not send invalid credentials or conflicting second factors', async (input) => {
  const fetcher = jest.fn()
  await expect(connectSearchService(input, { fetcher })).rejects.toBeInstanceOf(SearchConnectionError)
  expect(fetcher).not.toHaveBeenCalled()
})

it('does not start a previously cancelled request', async () => {
  const controller = new AbortController()
  controller.abort()
  const fetcher = jest.fn()
  await expect(connectSearchService(credentials, { fetcher, signal: controller.signal })).rejects.toHaveProperty(
    'code',
    'aborted'
  )
  expect(fetcher).not.toHaveBeenCalled()
})

it.each(['fetch', 'body', 'errorBody'])(
  'bounds the whole %s phase even when its implementation ignores cancellation',
  async (phase) => {
    jest.useFakeTimers()
    const json = () => new Promise<unknown>(() => {})
    const fetcher = jest.fn((_url: RequestInfo | URL, _init?: RequestInit) =>
      phase === 'fetch'
        ? new Promise<Response>(() => {})
        : Promise.resolve({ ...response({}, phase === 'errorBody' ? 429 : 200), json } as Response)
    )
    const pending = connectSearchService(credentials, { fetcher, timeoutMs: 50 })
    const rejected = expect(pending).rejects.toHaveProperty('code', 'timeout')
    await jest.advanceTimersByTimeAsync(50)
    await rejected
    expect(fetcher.mock.calls[0][1]?.signal?.aborted).toBe(true)
    expect(jest.getTimerCount()).toBe(0)
  }
)

it.each([
  ['fetch', 'aborted'],
  ['body', 'aborted'],
  ['fetch', 'timeout'],
  ['body', 'timeout'],
])('revokes a session arriving late from %s after %s', async (phase, cancellation) => {
  jest.useFakeTimers()
  const late = deferred<unknown>()
  const controller = new AbortController()
  const removed = jest.spyOn(controller.signal, 'removeEventListener')
  const created = session()
  const lateResponse = { ...response(), json: () => late.promise } as Response
  const fetcher = jest
    .fn(async (_url: RequestInfo | URL, _init?: RequestInit) => response(undefined, 204))
    .mockImplementationOnce(() =>
      phase === 'fetch' ? (late.promise as Promise<Response>) : Promise.resolve(lateResponse)
    )
  const pending = connectSearchService(credentials, { fetcher, signal: controller.signal, timeoutMs: 50 })
  const rejected = expect(pending).rejects.toHaveProperty('code', cancellation)
  await Promise.resolve()
  if (cancellation === 'timeout') await jest.advanceTimersByTimeAsync(50)
  else controller.abort()
  await rejected
  expect(removed).toHaveBeenCalledWith('abort', expect.any(Function))
  expect(jest.getTimerCount()).toBe(0)
  late.resolve(phase === 'fetch' ? response(created) : created)
  await jest.advanceTimersByTimeAsync(0)
  expect(fetcher).toHaveBeenCalledTimes(2)
  const [url, init] = fetcher.mock.calls[1]
  expect(String(url)).toMatch(/\/api\/auth\/session$/)
  expect(init).toMatchObject({
    method: 'DELETE',
    credentials: 'omit',
    headers: { Authorization: `Bearer ${created.token}`, 'X-Tenant-ID': created.tenantId },
  })
  expect(init?.signal?.aborted).toBe(false)
  expect(jest.getTimerCount()).toBe(0)
  expect(localStorage.length).toBe(0)
})

it.each([204, 401])('revokes an explicit session safely, including already expired HTTP %s', async (status) => {
  localStorage.setItem('token', 'host-demo-token')
  const closed = response(undefined, status)
  const fetcher = jest.fn(async (_url: RequestInfo | URL, _init?: RequestInit) => closed)
  const current = session()
  await expect(disconnectSearchService(current, { fetcher })).resolves.toBeUndefined()
  expect(closed.json).not.toHaveBeenCalled()
  expect(fetcher.mock.calls[0][1]).toMatchObject({
    method: 'DELETE',
    keepalive: true,
    headers: { Authorization: `Bearer ${current.token}`, 'X-Tenant-ID': current.tenantId },
  })
  expect(localStorage.getItem('token')).toBe('host-demo-token')
})
