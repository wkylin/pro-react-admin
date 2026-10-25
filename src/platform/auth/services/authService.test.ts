test('an invalid enterprise credential never restores a leftover GitHub identity', () => {
  jest.resetModules()
  localStorage.clear()
  localStorage.setItem('enterprise_session', 'invalid-json')
  localStorage.setItem('github_token', 'previous-github-token')
  localStorage.setItem('github_user', JSON.stringify({ id: 1, login: 'previous-github-user' }))
  jest.doMock('../api/permission', () => ({ isDemoPermissionMode: () => false }))
  jest.doMock('./permissionService', () => ({ permissionService: { syncPermissions: jest.fn() } }))
  const { authService } = require('./authService')
  expect(authService.getState().isAuthenticated).toBe(false)
  expect(authService.getState().user).toBeNull()
  expect(localStorage.getItem('github_token')).toBeNull()
  expect(localStorage.getItem('github_user')).toBeNull()
  localStorage.clear()
})

test('GitHub demo callback stores only public profile data and restores through the API', async () => {
  jest.resetModules()
  localStorage.clear()
  jest.doMock('../api/permission', () => ({ isDemoPermissionMode: () => true }))
  const syncPermissions = jest.fn().mockResolvedValue(undefined)
  jest.doMock('./permissionService', () => ({ permissionService: { syncPermissions } }))
  const user = { id: 42, login: 'octocat', name: 'Octocat', email: '', avatar_url: '', html_url: '' }
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ user }) })
  const originalFetch = globalThis.fetch
  globalThis.fetch = fetchMock as typeof fetch
  try {
    const { authService } = require('./authService') as typeof import('./authService')
    await authService.handleCallback()
    expect(authService.getState().user).toEqual(user)
    expect(localStorage.getItem('github_demo_user')).toContain('octocat')
    expect(localStorage.getItem('github_token')).toBeNull()
    expect(localStorage.getItem('github_user')).toBeNull()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/demo/github/session',
      expect.objectContaining({ credentials: 'same-origin' })
    )

    fetchMock.mockResolvedValueOnce({ ok: false, status: 401 })
    await authService.restoreDemoSession()
    expect(authService.getState().isAuthenticated).toBe(false)
    expect(localStorage.getItem('github_demo_user')).toBeNull()
  } finally {
    globalThis.fetch = originalFetch
    localStorage.clear()
  }
})
