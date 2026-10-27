import { createNavigationTree, filterNavigationTree, filterNavigationByRoutes, findNavigationChain } from './menu'
import { canAccessPath, type RoutePolicy } from '@platform/auth/model/policy'
import type { UserPermission } from '@platform/auth/model/permission'
import enterprisePolicies from '../../../config/route-policy.enterprise.json'

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
