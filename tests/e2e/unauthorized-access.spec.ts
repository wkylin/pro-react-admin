import { test, expect } from '@playwright/test'
import fs from 'fs'

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
  const bodyText = await page.locator('body').innerText()
  try {
    fs.writeFileSync('test-results/unauthorized-body.txt', bodyText)
  } catch (e) {}

  // ProtectedRoute 无权限时会跳转到 /403
  await expect(page.locator('text=权限系统示例')).toHaveCount(0)
  await expect(page.locator('text=Sorry, you are not authorized to access this page.')).toHaveCount(1)
})
