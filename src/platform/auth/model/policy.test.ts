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
