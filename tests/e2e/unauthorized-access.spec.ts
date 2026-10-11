import { test, expect } from '@playwright/test'

test('denies access and shows message for unauthorized user', async ({ page }) => {
  // set token and limited permissions (only home)
  const now = Date.now().toString()
  await page.addInitScript((t) => {
    localStorage.setItem('token', JSON.stringify({ token: 'fake-token' }))
    localStorage.setItem(
      'user_permissions',
      JSON.stringify({ userId: '1', username: 'guest', roles: [], permissions: [], routes: ['/'] })
    )
    localStorage.setItem('permissions_fetch_time', t)
    localStorage.setItem('permissions_auth_key', 'token:fake-token')
  }, now)

  await page.goto('/#/permission')
  // ProtectedRoute 无权限时会跳转到 /403
  await expect(page).toHaveURL(/#\/403$/)
  await expect(page.getByText('权限系统示例', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Sorry, you are not authorized to access this page.')).toBeVisible()
})
