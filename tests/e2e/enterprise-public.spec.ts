import { expect, test } from '@playwright/test'

test('anonymous enterprise root returns to its own sign-in page', async ({ page }) => {
  await page.goto('/#/')

  await expect(page).toHaveURL(/#\/signin$/)
  await expect(page.getByRole('heading', { name: /sign in|登录/i })).toBeVisible()
})
