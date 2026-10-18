import { test, expect } from '@playwright/test'

test('deploy flow cards animate into view inside the tab scroll container', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
  })
  await page.goto('/#/deploy-flow')
  await expect(page.getByRole('heading', { name: 'Frontend Engineering Deployment' })).toBeVisible()

  const title = page.getByText('可观测性与稳定性保障', { exact: true })
  await title.scrollIntoViewIfNeeded()
  await expect(title).toBeInViewport()
  // Inspect the nearest motion wrapper, independent of generated CSS module names.
  const animatedCard = title.locator('xpath=ancestor::div[contains(@style, "opacity")][1]')
  await expect(animatedCard).toHaveCSS('opacity', '1')
})
