import { createDemoAdministrationProvider } from './demoProvider'
import { createDemoAccessClient, enterpriseAccessClient } from './accessRequests'
import { apiClient } from '@platform/api/client'
import { mockUserPermissions } from '@platform/auth/mocks/permission'

test('demo approval keeps a scoped role change pending until another account approves it', async () => {
  const provider = createDemoAdministrationProvider(() => 'test', true)
  let current = mockUserPermissions.super_admin
  const access = createDemoAccessClient(provider, () => current)
  const change = {
    kind: 'role' as const,
    targetId: 'r-2',
    change: {
      permissions: ['home:read', 'user:read'],
      scopes: { user: { mode: 'restricted' as const, ids: ['u-1'] } },
    },
  }
  const preview = await access.preview(change)
  expect(preview.affected.count).toBe(1)
  const request = await access.propose(change, 'Limit viewer access', preview.fingerprint)
  expect(request.status).toBe('pending')
  expect((await provider.getOne('roles', 'r-2')).scopes?.user).toBeUndefined()
  await expect(access.decide(request.id, 'approve', 'Self review')).rejects.toThrow('不能审批')
  current = mockUserPermissions.reviewer
  const approved = await access.decide(request.id, 'approve', 'Reviewed affected member')
  expect(approved.status).toBe('approved')
  expect((await provider.getOne('roles', 'r-2')).scopes?.user).toEqual({ mode: 'restricted', ids: ['u-1'] })
})

test('enterprise access request list sends only supported query fields', async () => {
  const get = jest.spyOn(apiClient, 'get').mockResolvedValue({ items: [], total: 0 })
  const query = { page: 1, pageSize: 20, status: 'pending' as const }
  try {
    await enterpriseAccessClient.list(query)
    expect(get).toHaveBeenCalledWith('/api/admin/access-requests', query, { addTimestamp: false })
  } finally {
    get.mockRestore()
  }
})
