const previousMockMode = process.env.REACT_APP_USE_MOCK
beforeAll(() => {
  process.env.REACT_APP_USE_MOCK = 'true'
})
afterAll(() => {
  if (previousMockMode === undefined) delete process.env.REACT_APP_USE_MOCK
  else process.env.REACT_APP_USE_MOCK = previousMockMode
})

describe('permission cache revocation', () => {
  const getUserPermissions = jest.fn()
  const authorized = { userId: '1', username: 'admin', roles: [], permissions: ['*:*'], routes: ['/permission'] }

  beforeEach(() => {
    jest.resetModules()
    localStorage.clear()
    localStorage.setItem('token', JSON.stringify({ token: 'account-a' }))
    getUserPermissions.mockReset()
    jest.doMock('../api/permission', () => ({ getUserPermissions }))
  })

  test('revokes cached permissions when a forced refresh fails', async () => {
    getUserPermissions.mockResolvedValueOnce(authorized).mockRejectedValueOnce(new Error('offline'))
    const { permissionService } = require('./permissionService')
    await expect(permissionService.getPermissions()).resolves.toEqual(authorized)
    const denied = await permissionService.getPermissions(true)
    expect(denied.permissions).toEqual([])
    expect(localStorage.getItem('user_permissions')).toBeNull()
  })

  test('does not publish an in-flight response after the identity changes', async () => {
    let resolve!: (value: typeof authorized) => void
    getUserPermissions.mockReturnValueOnce(
      new Promise((done) => {
        resolve = done
      })
    )
    const { permissionService } = require('./permissionService')
    const pending = permissionService.getPermissions()
    localStorage.setItem('token', JSON.stringify({ token: 'account-b' }))
    resolve(authorized)
    expect((await pending).permissions).toEqual([])
    expect(localStorage.getItem('user_permissions')).toBeNull()
  })

  test('clearing persisted session state also invalidates the cached identity in memory', async () => {
    getUserPermissions.mockResolvedValueOnce(authorized).mockRejectedValueOnce(new Error('signed out'))
    const { permissionService } = require('./permissionService')
    await permissionService.getPermissions()
    localStorage.clear()
    expect((await permissionService.getPermissions()).permissions).toEqual([])
    expect(getUserPermissions).toHaveBeenCalledTimes(1)
  })

  test('uses the active Bearer token when a previous GitHub profile remains in storage', async () => {
    localStorage.setItem('github_user', JSON.stringify({ id: 1, login: 'previous-user' }))
    const limited = { ...authorized, userId: '2', permissions: [], routes: [] }
    getUserPermissions.mockResolvedValueOnce(authorized).mockResolvedValueOnce(limited)
    const { permissionService } = require('./permissionService')
    await permissionService.getPermissions()

    localStorage.setItem('token', JSON.stringify({ token: 'account-b' }))
    expect(permissionService.peekPermissions()).toBeNull()
    await expect(permissionService.getPermissions()).resolves.toEqual(limited)
    expect(getUserPermissions).toHaveBeenCalledTimes(2)
  })

  test('invalidates permissions when the GitHub demo identity changes', async () => {
    localStorage.removeItem('token')
    localStorage.setItem('github_demo_user', JSON.stringify({ id: 1, login: 'first-user' }))
    const limited = { ...authorized, permissions: [], routes: [] }
    getUserPermissions.mockResolvedValueOnce(authorized).mockResolvedValueOnce(limited)
    const { permissionService } = require('./permissionService')
    await permissionService.getPermissions()

    localStorage.setItem('github_demo_user', JSON.stringify({ id: 2, login: 'second-user' }))
    expect(permissionService.peekPermissions()).toBeNull()
    await expect(permissionService.getPermissions()).resolves.toEqual(limited)
    expect(getUserPermissions).toHaveBeenCalledTimes(2)
  })
})

describe('permission cache validity', () => {
  test('malformed persisted fetch timestamps never restore grants', () => {
    jest.resetModules()
    localStorage.clear()
    localStorage.setItem('token', JSON.stringify({ token: 'account' }))
    localStorage.setItem('permissions_auth_key', 'token:account')
    localStorage.setItem(
      'user_permissions',
      JSON.stringify({ userId: '1', username: 'admin', roles: [], permissions: ['*:*'], routes: ['*'] })
    )
    localStorage.setItem('permissions_fetch_time', 'not-a-time')
    const { permissionService } = require('./permissionService')
    expect(permissionService.peekPermissions()).toBeNull()
  })
})
