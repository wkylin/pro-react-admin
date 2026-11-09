import {
  getRoutePolicy,
  matchesPermission,
  evaluateAccessRequirements,
  hasEffectivePermission,
  canAccessPath,
} from './policy'
import type { UserPermission } from './permission'

test('inherits the most specific route policy for parameterized and nested routes', () => {
  expect(getRoutePolicy('/tech/frontend/plugins/vue3')?.permission).toBe('tech:read')
  expect(getRoutePolicy('/dashboard/*')?.permission).toBe('dashboard:read')
  expect(getRoutePolicy('/missing')).toBeUndefined()
})

test('checks the pathname of dashboard query and fragment destinations for ordinary accounts', () => {
  const current: UserPermission = {
    userId: 'reader',
    username: 'reader',
    roles: [],
    permissions: ['home:read', 'dashboard:read'],
    routes: ['/', '/dashboard'],
  }

  expect(getRoutePolicy('/dashboard?range=7')?.permission).toBe('dashboard:read')
  expect(canAccessPath(current, '/dashboard?range=7')).toBe(true)
  expect(canAccessPath(current, '/dashboard?page=2')).toBe(true)
  expect(canAccessPath(current, '/dashboard#customers')).toBe(true)
  expect(canAccessPath(current, '/dashboard?page=2#customers')).toBe(true)
  expect(canAccessPath(current, '/administration/users?next=/dashboard')).toBe(false)
  expect(canAccessPath(current, '/dashboard-other?next=/dashboard')).toBe(false)
  expect(canAccessPath(current, '/dashboard%3Fpage=2')).toBe(false)
  expect(canAccessPath(current, '?next=/dashboard')).toBe(false)
  expect(canAccessPath(current, '#/dashboard')).toBe(false)
})

test('uses the same pathname for explicit whitelist fallback without granting other routes', () => {
  const current: UserPermission = {
    userId: 'reader',
    username: 'reader',
    roles: [],
    permissions: [],
    routes: ['/custom-report'],
  }

  expect(canAccessPath(current, '/custom-report?page=2#totals')).toBe(true)
  expect(canAccessPath(current, '/custom-report-other?page=2')).toBe(false)
  expect(canAccessPath(current, '/administration/users?next=/custom-report')).toBe(false)
  expect(canAccessPath(current, '/custom-report%3Fpage=2')).toBe(false)
})

test('matches exact and resource wildcard grants without broadening unrelated permissions', () => {
  expect(matchesPermission('user:read', ['user:*'])).toBe(true)
  expect(matchesPermission('user:delete', ['user:read'])).toBe(false)
  expect(matchesPermission('business:read', ['*:*'])).toBe(true)
  expect(matchesPermission('tenant:read', ['*:*'])).toBe(false)
  expect(matchesPermission('tenant:read', ['tenant:*'])).toBe(true)
})

test('route permission and role requirements are both enforced', () => {
  const current = { userId: '1', username: 'reader', roles: [], permissions: ['home:read' as const], routes: ['/'] }
  expect(evaluateAccessRequirements(current, { permission: 'home:read' })).toBe(true)
  expect(evaluateAccessRequirements(current, { permission: 'permission:read' })).toBe(false)
  expect(evaluateAccessRequirements(current, { permission: 'home:read', roles: ['admin'] })).toBe(false)
  expect(evaluateAccessRequirements(current, {})).toBeNull()
})

test('one role must supply both the grant and the record scope', () => {
  const current: UserPermission = {
    userId: '1',
    username: 'scoped',
    permissions: ['user:read' as const],
    routes: [],
    roles: [
      {
        id: 'a',
        name: 'reader',
        code: 'reader',
        permissions: ['user:read' as const],
        scopes: { user: { mode: 'restricted' as const, ids: ['u-1'] } },
      },
      {
        id: 'b',
        name: 'other',
        code: 'other',
        permissions: ['home:read' as const],
        scopes: { user: { mode: 'global' as const, ids: [] } },
      },
    ],
  }
  expect(hasEffectivePermission(current, 'user:read', 'u-1')).toBe(true)
  expect(hasEffectivePermission(current, 'user:read', 'u-2')).toBe(false)
  expect(canAccessPath(current, '/administration/users')).toBe(true)
  current.roles[0]!.scopes = { user: { mode: 'deny', ids: [] } }
  expect(canAccessPath(current, '/administration/users')).toBe(false)
})

test('the account authenticator is unavailable in the static demo even to wildcard administrators', () => {
  const previous = process.env.REACT_APP_USE_MOCK
  const current: UserPermission = {
    userId: '1',
    username: 'admin',
    roles: [],
    permissions: ['*:*'],
    routes: ['/account/security'],
  }
  try {
    process.env.REACT_APP_USE_MOCK = 'true'
    expect(canAccessPath(current, '/account/security')).toBe(false)
    process.env.REACT_APP_USE_MOCK = 'false'
    expect(canAccessPath(current, '/account/security')).toBe(true)
  } finally {
    if (previous === undefined) delete process.env.REACT_APP_USE_MOCK
    else process.env.REACT_APP_USE_MOCK = previous
  }
})

test('an ordinary enterprise account may open its own authenticator page when the server grants the route', () => {
  const previous = process.env.REACT_APP_USE_MOCK
  try {
    process.env.REACT_APP_USE_MOCK = 'false'
    const current: UserPermission = {
      userId: '1',
      username: 'member',
      roles: [{ id: 'member', name: 'Member', code: 'member', permissions: [] }],
      permissions: [],
      routes: ['/account/security'],
    }
    expect(canAccessPath(current, '/account/security')).toBe(true)
    expect(canAccessPath({ ...current, routes: [] }, '/account/security')).toBe(false)
  } finally {
    if (previous === undefined) delete process.env.REACT_APP_USE_MOCK
    else process.env.REACT_APP_USE_MOCK = previous
  }
})
