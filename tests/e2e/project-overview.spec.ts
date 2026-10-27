import { test, expect } from '@playwright/test'

test('visitors can inspect the project before signing in', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'zh'))
  await page.goto('/#/')

  await expect(page).toHaveURL(/#\/overview$/)
  await expect(page.getByRole('heading', { name: 'Pro React Admin', level: 1 })).toBeVisible()
  await expect(page.getByText('pnpm run project:create myApp --preset enterprise', { exact: true })).toBeVisible()
  await expect(page.getByText('PROJECT=myApp pnpm start', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Webpack', exact: true }).click()
  await expect(page.getByText('BUILD_TOOL=webpack PROJECT=myApp pnpm start', { exact: true })).toBeVisible()

  await page.getByRole('link', { name: '体验权限管理' }).click()
  await expect(page).toHaveURL(/#\/signin\?next=/)
  expect(new URLSearchParams(new URL(page.url()).hash.split('?')[1]).get('next')).toBe('/administration/users')
  await expect(page.getByRole('heading', { name: '登录', level: 2 })).toBeVisible()
})

test('the overview leads signed-in visitors to the administration reference flow', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'zh')
  })
  await page.goto('/#/overview')
  await page.getByRole('link', { name: '进入权限管理' }).first().click()
  await expect(page).toHaveURL(/#\/administration\/users$/)
  await expect(page.getByRole('heading', { name: '用户管理', level: 1 })).toBeVisible()

  await page.goto('/#/demo')
  await expect(page.getByRole('heading', { name: '成员访问治理' })).toBeVisible()
})

for (const viewport of [
  { width: 1280, height: 800 },
  { width: 390, height: 844 },
]) {
  test(`visitors can scroll the overview to its footer at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#/overview')

    const overview = page.getByRole('main')
    const footerLink = page.getByRole('link', { name: 'Storybook', exact: true })
    await expect(page.locator('#global-loader')).toHaveCount(0)
    await expect(footerLink).toHaveCount(1)
    expect(await overview.evaluate((element) => element.scrollHeight)).toBeGreaterThan(viewport.height)

    await page.mouse.move(viewport.width / 2, viewport.height / 2)
    await page.mouse.wheel(0, 5000)
    await expect.poll(() => overview.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await expect(footerLink).toBeInViewport()
  })
}
