import {
  assignablePermissionCodes,
  enterprisePermissionCodes,
  groupPermissionCodes,
  permissionMatrixGroups,
  permissionMatrixGroupsForProject,
  showcasePermissionCodes,
} from './permissionCatalog'

test('secure project role choices contain management grants without showcase permissions', () => {
  expect(enterprisePermissionCodes).toContain('access:approve')
  expect(enterprisePermissionCodes).toContain('user:update')
  expect(enterprisePermissionCodes).not.toContain('crypto:read')
  expect(enterprisePermissionCodes).not.toContain('tenant:delete')
  expect(enterprisePermissionCodes).not.toContain('*:*')
  expect(showcasePermissionCodes).toContain('crypto:read')
  expect(showcasePermissionCodes).toContain('*:*')
  expect(permissionMatrixGroups.find((group) => group.key === 'access')?.permissions).toContain('access:approve')
})

test('existing custom role grants remain available while editing', () => {
  const groups = groupPermissionCodes(assignablePermissionCodes('customer', ['orders:read']))
  expect(groups.find((group) => group.resource === 'orders')?.permissions).toEqual(['orders:read'])
  expect(assignablePermissionCodes('customer')).not.toContain('crypto:read')
  expect(assignablePermissionCodes('customer', ['*:*'])).toContain('*:*')
  expect(assignablePermissionCodes('default')).toContain('crypto:read')
})

test('secure role choices and matrix include registered business routes only', () => {
  const routes = [
    { path: 'orders', meta: { routePath: '/orders', permission: 'orders:read' } },
    { path: 'administration/tenants', meta: { routePath: '/administration/tenants', permission: 'tenant:read' } },
  ]

  const choices = assignablePermissionCodes('customer', [], routes)
  expect(choices).toContain('orders:read')
  expect(choices).not.toContain('tenant:read')
  expect(choices).not.toContain('crypto:read')
  expect(choices).not.toContain('music:read')
  expect(
    permissionMatrixGroupsForProject('customer', routes).find((group) => group.key === 'orders')?.permissions
  ).toEqual(['orders:read'])
})
