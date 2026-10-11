import { getRoutePolicy, matchesPermission, evaluateAccessRequirements } from './policy'

test('inherits the most specific route policy for parameterized and nested routes', () => {
  expect(getRoutePolicy('/tech/frontend/plugins/vue3')?.permission).toBe('tech:read')
  expect(getRoutePolicy('/dashboard/*')?.permission).toBe('dashboard:read')
  expect(getRoutePolicy('/missing')).toBeUndefined()
})

test('matches exact and resource wildcard grants without broadening unrelated permissions', () => {
  expect(matchesPermission('user:read', ['user:*'])).toBe(true)
  expect(matchesPermission('user:delete', ['user:read'])).toBe(false)
  expect(matchesPermission('business:read', ['*:*'])).toBe(true)
})

test('route permission and role requirements are both enforced', () => {
  const current = { userId: '1', username: 'reader', roles: [], permissions: ['home:read' as const], routes: ['/'] }
  expect(evaluateAccessRequirements(current, { permission: 'home:read' })).toBe(true)
  expect(evaluateAccessRequirements(current, { permission: 'permission:read' })).toBe(false)
  expect(evaluateAccessRequirements(current, { permission: 'home:read', roles: ['admin'] })).toBe(false)
  expect(evaluateAccessRequirements(current, {})).toBeNull()
})
