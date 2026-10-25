import { test, expect } from '@playwright/test'

test('visitors can inspect the project before signing in', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'zh'))
  await page.goto('/#/')

  await expect(page).toHaveURL(/#\/overview$/)
  await expect(page.getByRole('heading', { name: 'Pro React Admin', level: 1 })).toBeVisible()
  await expect(page.getByText('pnpm run dev:webpack', { exact: true }).first()).toBeVisible()

  await page.getByRole('button', { name: 'Vite', exact: true }).click()
  await expect(page.getByText('pnpm run dev:vite', { exact: true }).first()).toBeVisible()

  await page.getByRole('link', { name: '使用演示账号体验' }).click()
  await expect(page).toHaveURL(/#\/signin$/)
  await expect(page.getByRole('heading', { name: '登录', level: 2 })).toBeVisible()
})

for (const viewport of [
  { width: 1280, height: 800 },
  { width: 390, height: 844 },
]) {
  test(`visitors can scroll the overview to its footer at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#/overview')

    const overview = page.getByRole('main')
    const footerLink = page.getByRole('link', { name: 'Storybook' })
    await expect(footerLink).toHaveCount(1)
    expect(await overview.evaluate((element) => element.scrollHeight)).toBeGreaterThan(viewport.height)

    await page.mouse.move(viewport.width / 2, viewport.height / 2)
    await page.mouse.wheel(0, 5000)
    await expect.poll(() => overview.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await expect(footerLink).toBeInViewport()
  })
}
