import { test, expect } from '@playwright/test'

test('allows access for authorized user', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    // also set explicit role for mock API
    localStorage.setItem('user_role', 'super_admin')
  })

  await page.goto('/#/permission')
  await expect(page.getByText('权限系统示例', { exact: true })).toBeVisible()
})
