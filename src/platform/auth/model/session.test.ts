import {
  clearSession,
  getSessionIdentity,
  handleAuthenticationFailure,
  readStoredToken,
  saveEnterpriseSession,
  subscribeSession,
  type EnterpriseSession,
} from './session'

const session = (tenantId = 'alpha', token = 'a'.repeat(43)): EnterpriseSession => ({
  tenantId,
  token,
  expiresAt: Date.now() + 60_000,
  user: { id: '1', name: 'Admin', email: 'admin@example.com' },
})
beforeEach(() => {
  localStorage.clear()
  window.location.hash = '#/signin'
})
test('server credentials supersede demo/GitHub credentials and tenant participates in cache identity', () => {
  localStorage.setItem('token', 'admin@test.com')
  saveEnterpriseSession(session())
  expect(localStorage.getItem('token')).toBeNull()
  expect(readStoredToken()).toBe('a'.repeat(43))
  const previous = getSessionIdentity()
  saveEnterpriseSession(session('beta'))
  expect(getSessionIdentity()).not.toBe(previous)
})
test('an old 401 cannot clear a replacement session, while a current 401 does', () => {
  saveEnterpriseSession(session())
  const previous = getSessionIdentity()
  saveEnterpriseSession(session('beta', 'b'.repeat(43)))
  handleAuthenticationFailure(401, undefined, previous)
  expect(readStoredToken()).toBe('b'.repeat(43))
  handleAuthenticationFailure(403)
  expect(readStoredToken()).toBe('b'.repeat(43))
  handleAuthenticationFailure(401, undefined, getSessionIdentity())
  expect(readStoredToken()).toBeNull()
})
test('session deadline clears credentials and notifies consumers without a network request', () => {
  jest.useFakeTimers()
  try {
    saveEnterpriseSession(session())
    const listener = jest.fn(),
      unsubscribe = subscribeSession(listener)
    jest.advanceTimersByTime(60_002)
    expect(localStorage.getItem('enterprise_session')).toBeNull()
    expect(listener.mock.calls.length).toBeGreaterThan(1)
    unsubscribe()
  } finally {
    jest.useRealTimers()
    clearSession()
  }
})
