import { test, expect } from '@playwright/test'
import fs from 'fs'

test('denies access and shows message for unauthorized user', async ({ page }) => {
  // set token and limited permissions (only home)
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'fake-token' }))
    localStorage.setItem(
      'user_permissions',
      JSON.stringify({ userId: '1', username: 'guest', roles: [], permissions: [], routes: ['/'] })
    )
  })

  await page.goto('/#/permission')
  await page.waitForLoadState('networkidle')
  const bodyText = await page.locator('body').innerText()
  try {
    fs.writeFileSync('test-results/unauthorized-body.txt', bodyText)
  } catch (e) {}
  // Antd message should appear with the access denied text
  await expect(page.locator('text=您没有权限访问该页面')).toHaveCount(1)
  // The permission page title should NOT be visible
  await expect(page.locator('text=权限系统示例')).toHaveCount(0)
})
