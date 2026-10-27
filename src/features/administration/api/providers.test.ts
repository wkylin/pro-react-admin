import { createDemoAdministrationProvider } from './demoProvider'
import { createRestDataProvider } from '@platform/data/provider'
import { administrationResources } from '../model/resources'
import type { JsonClient } from '@platform/api/client'
const query = { page: 1, pageSize: 10 }

test('user/role writes validate relations and create read-only audit events', async () => {
  const provider = createDemoAdministrationProvider(() => 'tester')
  const role = await provider.create('roles', { name: 'Operator', code: 'operator', permissions: ['user:read'] })
  const user = await provider.create('users', {
    name: 'New member',
    email: 'new@example.com',
    role: role.code,
    status: 'active',
  })
  await expect(
    provider.create('users', { name: 'Duplicate', email: 'NEW@example.com', role: 'operator', status: 'active' })
  ).rejects.toThrow('邮箱')
  await expect(provider.remove('roles', role.id)).rejects.toThrow('成员')
  await provider.update('users', user.id, { status: 'disabled' })
  expect((await provider.list('users', { ...query, search: 'new@example.com' })).items[0].status).toBe('disabled')
  expect((await provider.list('audit', query)).items.map((row) => row.action)).toEqual(['update', 'create', 'create'])
  expect((await provider.list('audit', query)).items[0].actor).toBe('tester')
  await expect(provider.remove('audit', 'any')).rejects.toThrow('read-only')
  await provider.remove('users', user.id)
  await provider.remove('roles', role.id)
})
test('provider instances isolate demo changes and do not leak mutable references', async () => {
  const first = createDemoAdministrationProvider(),
    second = createDemoAdministrationProvider()
  await first.remove('users', 'u-2')
  expect((await second.list('users', query)).total).toBe(2)
  const result = await second.getOne('roles', 'r-1')
  result.permissions.push('role:delete')
  expect((await second.getOne('roles', 'r-1')).permissions).not.toContain('role:delete')
})
test('invalid pagination and aborted work fail before changing data', async () => {
  const provider = createDemoAdministrationProvider()
  await expect(provider.list('users', { page: 0, pageSize: 10 })).rejects.toThrow('pagination')
  const controller = new AbortController()
  controller.abort()
  await expect(provider.remove('users', 'u-1', { signal: controller.signal })).rejects.toThrow()
  expect((await provider.list('users', query)).total).toBe(2)
})
test('REST rejects malformed data and safely encodes record IDs', async () => {
  const get = jest.fn().mockResolvedValue({
    code: 0,
    data: {
      items: [{ id: 'u-1', name: 'One', email: 'one@example.com', role: 'admin', status: 'active' }],
      total: 1,
    },
  })
  const patch = jest
    .fn()
    .mockResolvedValue({ id: 'u/a', name: 'One', email: 'one@example.com', role: 'admin', status: 'disabled' })
  const transport = { get, patch } as unknown as JsonClient
  const provider = createRestDataProvider(transport, administrationResources)
  const controller = new AbortController()
  expect((await provider.list('users', query, { signal: controller.signal })).total).toBe(1)
  expect(get).toHaveBeenCalledWith(
    '/api/admin/users',
    query,
    expect.objectContaining({ signal: controller.signal, cancelDuplicate: false, addTimestamp: false })
  )
  await provider.update('users', 'u/a', { status: 'disabled' })
  expect(patch).toHaveBeenCalledWith('/api/admin/users/u%2Fa', { status: 'disabled' }, undefined)
  get.mockResolvedValue({ items: [{ id: 'bad' }], total: 1 })
  await expect(provider.list('users', query)).rejects.toThrow('Invalid user')
  get.mockResolvedValue({ items: [], total: -1 })
  await expect(provider.list('users', query)).rejects.toThrow('Invalid list')
})
