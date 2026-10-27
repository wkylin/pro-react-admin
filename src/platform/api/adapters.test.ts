import axios from 'axios'
import request from './request'
import { HttpClient, encryptionConfig } from './http'
import { requestIdForApi } from './core/requestId'

const jsonResponse = (payload: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  statusText: '',
  headers: { get: (name: string) => (name.toLowerCase() === 'content-type' ? 'application/json' : null) },
  json: async () => payload,
})
const originalFetch = globalThis.fetch

test('a 401 from explicit old credentials cannot log out the current identity', async () => {
  localStorage.clear()
  localStorage.setItem('token', 'current-account')
  globalThis.fetch = jest.fn().mockResolvedValue(jsonResponse({}, 401))
  await expect(
    new HttpClient().get(
      '/api/private',
      {},
      {
        headers: { authorization: 'Bearer previous-account' },
        showError: false,
      }
    )
  ).rejects.toHaveProperty('status', 401)
  expect(localStorage.getItem('token')).toBe('current-account')
  localStorage.clear()
})

afterEach(() => {
  encryptionConfig.reset()
  globalThis.fetch = originalFetch
  jest.restoreAllMocks()
})

test('Axios replacement instances retain business response checks', async () => {
  const instance = axios.create({
    adapter: async (config) => ({
      data: { code: 403, message: 'forbidden' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }),
  })
  request.setAxiosInstance(instance)
  localStorage.setItem('token', JSON.stringify({ token: 'reader' }))
  await expect(request.get('/api/private', {}, { showError: false })).rejects.toThrow('forbidden')
  expect(localStorage.getItem('token')).not.toBeNull()
})

test('API adapters attach correlation IDs and expose the server ID on errors', async () => {
  let axiosRequestId: string | undefined
  request.setAxiosInstance(
    axios.create({
      adapter: async (config) => {
        axiosRequestId = config.headers.get('X-Request-ID') as string
        return {
          data: { code: 403, message: 'forbidden' },
          status: 200,
          statusText: 'OK',
          headers: { 'x-request-id': 'server-axios-123' },
          config,
        }
      },
    })
  )
  await expect(request.get('/api/private', {}, { showError: false })).rejects.toHaveProperty(
    'requestId',
    'server-axios-123'
  )
  expect(axiosRequestId).toMatch(/^[A-Za-z0-9._-]{8,}$/)

  const fetchMock = jest.fn().mockResolvedValue({
    ok: false,
    status: 503,
    headers: { get: (name: string) => (name.toLowerCase() === 'x-request-id' ? 'server-fetch-123' : null) },
  })
  globalThis.fetch = fetchMock
  await expect(new HttpClient().get('/api/private', {}, { showError: false })).rejects.toHaveProperty(
    'requestId',
    'server-fetch-123'
  )
  expect(fetchMock.mock.calls[0][1].headers['X-Request-ID']).toMatch(/^[A-Za-z0-9._-]{8,}$/)
})

test('Fetch business errors use the response ID when the server replaces a caller ID', async () => {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    headers: {
      get: (name: string) =>
        name.toLowerCase() === 'content-type'
          ? 'application/json'
          : name.toLowerCase() === 'x-request-id'
            ? 'server-rewritten-123'
            : null,
    },
    json: async () => ({ code: 403, message: 'forbidden' }),
  })
  globalThis.fetch = fetchMock
  await expect(
    new HttpClient().get('/api/private', {}, { requestId: 'bad id!', showError: false })
  ).rejects.toHaveProperty('requestId', 'server-rewritten-123')
})

test('Axios uses one valid request ID for the header and error fallback', async () => {
  const sentIds: string[] = []
  request.setAxiosInstance(
    axios.create({
      adapter: async (config) => {
        sentIds.push(config.headers.get('X-Request-ID') as string)
        return {
          data: { code: 403, message: 'forbidden' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        }
      },
    })
  )
  await expect(
    request.get(
      '/api/private',
      {},
      {
        headers: { 'x-request-id': 'header-id-456' },
        requestId: 'option-id-123',
        showError: false,
      }
    )
  ).rejects.toHaveProperty('requestId', 'option-id-123')
  expect(sentIds[0]).toBe('option-id-123')

  const badIdError = await request.get('/api/private', {}, { requestId: 'bad id!', showError: false }).catch((e) => e)
  expect(badIdError.requestId).toBe(sentIds[1])
  expect(sentIds[1]).toMatch(/^[A-Za-z0-9._-]{8,128}$/)
})

test('Fetch sends one valid ID when the option and header conflict', async () => {
  const fetchMock = jest.fn().mockResolvedValue(jsonResponse({ code: 403, message: 'forbidden' }))
  globalThis.fetch = fetchMock
  const failure = await new HttpClient()
    .get(
      '/api/private',
      {},
      {
        headers: { 'x-request-id': 'header-id-456', 'X-Request-ID': 'other-id-789' },
        requestId: 'option-id-123',
        showError: false,
      }
    )
    .catch((error: { requestId?: string }) => error)
  expect(fetchMock.mock.calls[0][1].headers['X-Request-ID']).toBe('option-id-123')
  expect(Object.keys(fetchMock.mock.calls[0][1].headers).filter((key) => key.toLowerCase() === 'x-request-id')).toEqual(
    ['X-Request-ID']
  )
  expect(failure.requestId).toBe('option-id-123')
})

test('request ID validation rejects a trailing newline', () => {
  const id = requestIdForApi('/api/private', 'client-id-123\n')
  expect(id).not.toBe('client-id-123\n')
  expect(id).toMatch(/^[A-Za-z0-9._-]{8,128}$/)
})

test('Fetch joins existing query parameters and removes multipart content headers', async () => {
  const fetchMock = jest.fn().mockResolvedValue(jsonResponse({ code: 0, data: [] }))
  globalThis.fetch = fetchMock
  const client = new HttpClient()
  await client.get('/api/items?kind=demo', { page: 2 }, { addTimestamp: false })
  expect(fetchMock.mock.calls[0][0]).toBe('/api/items?kind=demo&page=2')
  await client.upload('/api/upload', new FormData())
  const headers = fetchMock.mock.calls[1][1].headers
  expect(Object.keys(headers).some((key) => key.toLowerCase() === 'content-type')).toBe(false)
})

test('reusing an Axios instance does not install duplicate cancellation interceptors', async () => {
  const instance = axios.create({
    adapter: async (config) => ({ data: { code: 0 }, status: 200, statusText: 'OK', headers: {}, config }),
  })
  request.setAxiosInstance(instance)
  request.setAxiosInstance(instance)
  await expect(request.get('/api/reused', {}, { addTimestamp: false, showError: false })).resolves.toEqual({ code: 0 })
  expect(request.getActiveRequestCount()).toBe(0)
})

test('Fetch does not send plaintext after a configured encryption failure', async () => {
  const fetchMock = jest.fn()
  globalThis.fetch = fetchMock
  encryptionConfig.configureRSA('invalid-key')
  await expect(new HttpClient().post('/api/private', { secret: 'value' })).rejects.toThrow('RSA 加密失败')
  expect(fetchMock).not.toHaveBeenCalled()
})

test('cancelled duplicates do not remove the replacement request from tracking', async () => {
  let complete!: () => void
  request.setAxiosInstance(
    axios.create({
      adapter: (config) =>
        new Promise((resolve, reject) => {
          config.signal?.addEventListener?.('abort', () => reject(new axios.CanceledError('cancelled', config)))
          complete = () => resolve({ data: { code: 0 }, status: 200, statusText: 'OK', headers: {}, config })
        }),
    })
  )
  const first = request.get('/api/repeated', {}, { showError: false })
  const rejection = expect(first).rejects.toHaveProperty('code', 'ERR_CANCELED')
  await new Promise((resolve) => setTimeout(resolve, 0))
  const second = request.get('/api/repeated', {}, { showError: false })
  await rejection
  expect(request.getActiveRequestCount()).toBe(1)
  complete()
  await second
  expect(request.getActiveRequestCount()).toBe(0)
})
