import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
})

test('a deep link can open the lazy home tab and return to its cached form', async ({ page }) => {
  await page.goto('/#/contact')
  const name = page.getByPlaceholder('Your Name')
  await expect(name).toBeVisible()
  await name.fill('Preserved contact draft')

  await page.getByRole('tab', { name: /^(Home|首页)$/ }).click()
  await expect(page).toHaveURL(/#\/$/)
  await expect(page.getByPlaceholder('api key')).toBeVisible()

  await page.getByRole('tab', { name: /(Contact|联系)/ }).click()
  await expect(page).toHaveURL(/#\/contact$/)
  await expect(name).toHaveValue('Preserved contact draft')
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
