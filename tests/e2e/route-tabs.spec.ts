import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
})

test('a deep link can open the project overview tab and restore a contact draft', async ({ page }) => {
  await page.goto('/#/contact')
  const name = page.getByPlaceholder('Your Name')
  await expect(name).toBeVisible()
  await name.fill('Preserved contact draft')

  await page.getByRole('tab', { name: /^(Home|首页)$/ }).click()
  await expect(page).toHaveURL(/#\/$/)
  await expect(page.getByRole('heading', { name: 'Pro React Admin', level: 1 })).toBeVisible()

  await page.getByRole('tab', { name: /(Contact|联系)/ }).click()
  await expect(page).toHaveURL(/#\/contact$/)
  await expect(name).toHaveValue('Preserved contact draft')
})

for (const viewport of [
  { width: 1280, height: 800 },
  { width: 390, height: 844 },
]) {
  test(`signed-in home can reach its footer at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#/')

    const home = page.getByRole('main').last()
    const footerLink = home.getByRole('link', { name: 'Storybook', exact: true })
    await expect(page.getByRole('heading', { name: 'Pro React Admin', level: 1 })).toBeVisible()
    expect(await home.evaluate((element) => element.scrollHeight)).toBeGreaterThan(viewport.height)

    await page.mouse.move(viewport.width * 0.7, viewport.height / 2)
    await page.mouse.wheel(0, 5000)
    await expect.poll(() => home.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await expect(footerLink).toBeInViewport()
    expect(await home.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
  })
}

test('home delivery steps follow the selected build tool', async ({ page }) => {
  await page.goto('/#/')
  const delivery = page.locator('section[aria-labelledby="delivery-title"]')

  await expect(delivery.getByText('pnpm run storybook:webpack', { exact: true })).toBeVisible()
  await expect(delivery.getByText('pnpm run build:lib:webpack', { exact: true })).toBeVisible()
  await expect(delivery.getByText('storybook-static/', { exact: true })).toBeVisible()
  await expect(delivery.getByText('wui-react-v*', { exact: true })).toBeVisible()

  await page.getByRole('group', { name: 'Choose a build tool' }).getByRole('button', { name: 'Vite' }).click()
  await expect(delivery.getByText('pnpm run storybook:vite', { exact: true })).toBeVisible()
  await expect(delivery.getByText('pnpm run build-storybook:vite', { exact: true })).toBeVisible()
  await expect(delivery.getByText('pnpm exec serve storybook-static-vite -p 6009', { exact: true })).toBeVisible()
  await expect(delivery.getByText('pnpm run build:lib:vite', { exact: true })).toBeVisible()
  await expect(delivery.getByText('BUILD_TOOL=vite pnpm run prepare:lib:release', { exact: true })).toBeVisible()
  await expect(delivery.getByText('storybook-static-vite/', { exact: true })).toBeVisible()
})

test('the frontend Node menu resolves a page and its tab follows query changes', async ({ page }) => {
  await page.goto('/#/tech/frontend/node?id=first')
  await expect(page.getByText('Node.js Demo', { exact: true })).toBeVisible()
  await expect(page.getByText('Search Id: first', { exact: true })).toBeVisible()

  await page.evaluate(() => {
    window.location.hash = '#/tech/frontend/node?id=second'
  })
  await expect(page.getByText('Search Id: second', { exact: true })).toBeVisible()
  await expect(page.getByRole('tab', { name: /Node/ })).toHaveCount(1)
})
