import { test, expect } from '@playwright/test'
import fs from 'fs'

test('allows access for authorized user', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    // also set explicit role for mock API
    localStorage.setItem('user_role', 'super_admin')
  })

  await page.goto('/#/permission')
  await page.waitForLoadState('networkidle')
  const bodyText = await page.locator('body').innerText()
  // dump body text for debugging
  try {
    fs.writeFileSync('test-results/authorized-body.txt', bodyText)
  } catch (e) {}
  await expect(page.locator('text=权限系统示例')).toHaveCount(1)
})
