import { mockGetUserPermissions } from './permission'

beforeEach(() => localStorage.clear())

test('a stored GitHub profile cannot grant administrator permissions', async () => {
  localStorage.setItem('github_user', JSON.stringify({ id: 42, login: 'octocat', email: 'admin@example.com' }))
  const permissions = await mockGetUserPermissions()
  expect(permissions.roles[0].code).toBe('user')
  expect(permissions.permissions).not.toContain('*:*')
})

test('a GitHub demo session ignores a local administrator role override', async () => {
  localStorage.setItem('github_demo_user', JSON.stringify({ id: 42, login: 'octocat' }))
  localStorage.setItem('user_role', 'admin')
  const permissions = await mockGetUserPermissions()
  expect(permissions.roles[0].code).toBe('user')
  expect(permissions.permissions).not.toContain('*:*')
})
