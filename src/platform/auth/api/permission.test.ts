describe('permission API in service mode', () => {
  const get = jest.fn()
  const previousMode = process.env.REACT_APP_USE_MOCK
  const previousBase = process.env.APP_BASE_URL

  beforeEach(() => {
    jest.resetModules()
    get.mockReset()
    process.env.REACT_APP_USE_MOCK = 'false'
    process.env.APP_BASE_URL = ''
    jest.doMock('@platform/api/request', () => ({ __esModule: true, default: { get } }))
  })

  afterAll(() => {
    if (previousMode === undefined) delete process.env.REACT_APP_USE_MOCK
    else process.env.REACT_APP_USE_MOCK = previousMode
    if (previousBase === undefined) delete process.env.APP_BASE_URL
    else process.env.APP_BASE_URL = previousBase
  })

  test('uses the same-origin service when no base URL is configured', async () => {
    const permissions = { userId: '1', username: 'reader', roles: [], permissions: ['home:read'], routes: ['/'] }
    get.mockResolvedValue({ code: 0, data: permissions })
    const api = require('./permission')
    await expect(api.getUserPermissions()).resolves.toEqual(permissions)
    expect(get).toHaveBeenCalledWith('/api/permissions/current', {}, expect.objectContaining({ showError: false }))
  })

  test('never grants mock permissions after a service failure', async () => {
    get.mockRejectedValue(new Error('service unavailable'))
    const api = require('./permission')
    await expect(api.getUserPermissions()).rejects.toThrow('service unavailable')
    await expect(api.getRoles()).rejects.toThrow('service unavailable')
  })

  test('rejects malformed permission responses', async () => {
    get.mockResolvedValue({ code: 0, data: { permissions: ['*:*'] } })
    await expect(require('./permission').getUserPermissions()).rejects.toThrow('权限响应格式无效')
  })
})
