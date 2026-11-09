import { createNavigationTree, filterNavigationTree, filterNavigationByRoutes, findNavigationChain } from './menu'
import { canAccessPath, type RoutePolicy } from '@platform/auth/model/policy'
import type { UserPermission } from '@platform/auth/model/permission'
import enterprisePolicies from '../../../config/route-policy.enterprise.json'
import canonicalPolicies from '../../../config/route-policy.json'
import type { NavigationItem } from './menu'

const manifest: Record<string, RoutePolicy> = {
  '/administration': { title: 'Administration', menuGroup: true, menu: { order: 0 } },
  '/administration/users': { title: 'Users', menu: { parent: '/administration', order: 1 } },
  '/administration/roles': { title: 'Roles', menu: { parent: '/administration', order: 0 } },
  '/': { title: 'Home', menu: { order: 1 } },
}
const member: UserPermission = { userId: '1', username: 'viewer', roles: [], permissions: ['user:read'], routes: ['*'] }
test('sidebar and search trees expose only authorized leaves in the selected project', () => {
  const tree = createNavigationTree(manifest)
  expect(tree[0].children?.map((item) => item.path)).toEqual(['/administration/roles', '/administration/users'])
  const filtered = filterNavigationTree(tree, member)
  expect(filtered.map((item) => item.path)).toEqual(['/administration'])
  expect(filtered[0].children?.map((item) => item.path)).toEqual(['/administration/users'])
  expect(filterNavigationByRoutes(filtered, new Set(['/']))).toEqual([])
})
test('a root permission or broad route grant cannot bypass a protected leaf policy', () => {
  expect(canAccessPath(member, '/administration/roles')).toBe(false)
  expect(canAccessPath(member, '/administration/users/u-1')).toBe(true)
  expect(
    canAccessPath({ ...member, permissions: [], routes: ['/administration/users'] }, '/administration/users/u-1')
  ).toBe(false)
})
test('menu selection finds the closest registered parent of a detail page', () => {
  expect(
    findNavigationChain(createNavigationTree(manifest), '/administration/users/u-1').map((item) => item.path)
  ).toEqual(['/administration', '/administration/users'])
  expect(findNavigationChain(createNavigationTree(manifest), '/unknown')).toEqual([])
})
test('rejects missing parents and parent cycles before rendering navigation', () => {
  expect(() => createNavigationTree({ '/a': { menu: { parent: '/missing', order: 0 } } })).toThrow('parent')
  expect(() =>
    createNavigationTree({ '/a': { menu: { parent: '/b', order: 0 } }, '/b': { menu: { parent: '/a', order: 0 } } })
  ).toThrow('cycle')
})
test('Enterprise navigation has valid parents and excludes the shared error menu', () => {
  const tree = createNavigationTree(enterprisePolicies as unknown as Readonly<Record<string, RoutePolicy>>)
  expect(tree.some((item) => item.path === '/error')).toBe(false)
  expect(tree.find((item) => item.path === '/administration')?.children?.length).toBeGreaterThan(0)
})

const canonical = canonicalPolicies as Readonly<Record<string, RoutePolicy>>
const navigationLeaves = (nodes: readonly NavigationItem[]): NavigationItem[] =>
  nodes.flatMap((node) => (node.children?.length ? navigationLeaves(node.children) : node.group ? [] : [node]))

test('keeps daily work first and limits the sidebar to three levels', () => {
  const tree = createNavigationTree(canonical)
  expect(tree.map((item) => item.path)).toEqual([
    '/',
    '/dashboard',
    '/patterns',
    '/administration',
    '/notifications',
    '/profile',
    '/examples/components',
    '/examples/visualization',
    '/examples/ai',
    '/examples/content',
    '/examples/engineering',
    '/account/security',
  ])
  const depth = (items: readonly NavigationItem[]): number =>
    items.length ? Math.max(...items.map((item) => 1 + depth(item.children ?? []))) : 0
  expect(depth(tree)).toBeLessThanOrEqual(3)
})

test('retains existing navigation destinations after grouping and exposes notifications', () => {
  const previousDestinations = [
    '/',
    '/ai-workbench',
    '/auto-deploy',
    '/big-screen',
    '/build/webpack',
    '/business',
    '/chatgpt',
    '/contact',
    '/crypto',
    '/dashboard',
    '/demo',
    '/dependencies',
    '/deploy-flow',
    '/deployment-guide',
    '/echarts',
    '/error',
    '/geo',
    '/mermaid',
    '/motion',
    '/music',
    '/movies',
    '/permission',
    '/ph-bar',
    '/postmessage',
    '/print',
    '/prism',
    '/profile',
    '/account/security',
    '/qrcode',
    '/reading',
    '/svg-viewer',
    '/tech/backend/go',
    '/tech/backend/java',
    '/tech/backend/node',
    '/tech/frontend/angular',
    '/tech/frontend/node',
    '/tech/frontend/plugins/perf',
    '/tech/frontend/plugins/vue3',
    '/tech/frontend/react',
    '/text-editor',
    '/tilt',
    '/topology',
    '/tracking',
    '/video',
    '/zustand',
    '/administration/users',
    '/administration/roles',
    '/administration/permissions',
    '/administration/tenants',
    '/administration/audit',
    '/administration/access-requests',
    '/patterns/requests',
    '/patterns/basic-form',
    '/patterns/step-form',
  ]
  const leaves = navigationLeaves(createNavigationTree(canonical)).map((item) => item.path)
  expect(leaves).toEqual(expect.arrayContaining(previousDestinations))
  expect(leaves).toContain('/notifications')
  expect(new Set(leaves).size).toBe(leaves.length)
  expect(
    findNavigationChain(createNavigationTree(canonical), '/tech/frontend/plugins/perf').map((item) => item.path)
  ).toEqual(['/examples/engineering', '/tech/frontend/plugins', '/tech/frontend/plugins/perf'])
})

test('grouped navigation filters unauthorized leaves and pages missing from the selected project', () => {
  const tree = createNavigationTree(canonical)
  const reader: UserPermission = {
    userId: 'reader',
    username: 'reader',
    roles: [],
    permissions: ['home:read', 'dashboard:read'],
    routes: ['*'],
  }
  const authorized = filterNavigationTree(tree, reader)
  const leaves = navigationLeaves(authorized).map((item) => item.path)
  expect(leaves).toContain('/dashboard')
  expect(leaves).not.toContain('/permission')
  expect(leaves).not.toContain('/notifications')
  expect(authorized.some((item) => item.path === '/examples/ai')).toBe(false)
  const projectNavigation = filterNavigationByRoutes(tree, new Set(['/dashboard', '/tech/frontend/plugins/perf']))
  expect(navigationLeaves(projectNavigation).map((item) => item.path)).toEqual([
    '/dashboard',
    '/tech/frontend/plugins/perf',
  ])
  expect(findNavigationChain(projectNavigation, '/tech/frontend/plugins/perf').map((item) => item.path)).toEqual([
    '/examples/engineering',
    '/tech/frontend/plugins',
    '/tech/frontend/plugins/perf',
  ])
})

test('CRM adds one page-pattern entry and keeps its detail and opportunity routes in that menu', () => {
  const tree = createNavigationTree(canonical)
  expect(
    navigationLeaves(tree)
      .filter((item) => item.path.startsWith('/patterns/crm'))
      .map((item) => item.path)
  ).toEqual(['/patterns/crm'])
  expect(tree.find((item) => item.path === '/patterns')?.children?.map((item) => item.path)).toEqual([
    '/patterns/requests',
    '/patterns/basic-form',
    '/patterns/step-form',
    '/patterns/crm',
  ])
  for (const path of ['/patterns/crm/customers/CUS-1001', '/patterns/crm/opportunities']) {
    expect(findNavigationChain(tree, path).map((item) => item.path)).toEqual(['/patterns', '/patterns/crm'])
  }
})

test('CRM is available to demo template readers only when the selected project registers it', () => {
  const reader: UserPermission = {
    userId: 'reader',
    username: 'reader',
    roles: [],
    permissions: ['home:read'],
    routes: [],
  }
  for (const policies of [canonical, enterprisePolicies as Readonly<Record<string, RoutePolicy>>]) {
    const tree = filterNavigationTree(createNavigationTree(policies), reader)
    expect(navigationLeaves(tree).map((item) => item.path)).toContain('/patterns/crm')
    expect(
      navigationLeaves(filterNavigationByRoutes(tree, new Set(['/patterns/requests']))).map((item) => item.path)
    ).not.toContain('/patterns/crm')
    expect(
      navigationLeaves(filterNavigationByRoutes(tree, new Set(['/patterns/crm']))).map((item) => item.path)
    ).toEqual(['/patterns/crm'])
  }
})
