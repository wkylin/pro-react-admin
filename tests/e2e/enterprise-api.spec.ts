import { expect, test, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('i18nextLng', 'en'))
})
async function signIn(page: Page, tenant = 'alpha') {
  await page.goto('/#/signin')
  await page.getByLabel('Tenant ID', { exact: true }).fill(tenant)
  await page.getByLabel('Email', { exact: true }).fill('admin@example.com')
  await page.getByLabel('Password', { exact: true }).fill('Browser-test-password-42')
  await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  await expect(page).toHaveURL(/#\/$/)
}
async function signOut(page: Page) {
  await page.getByRole('button', { name: /Admin alpha/ }).click()
  await page.getByRole('menuitem', { name: /Sign out|Logout|Log out|退出/ }).click()
  await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible()
}

test('enterprise sign-in exposes a named main landmark, page heading, and labeled fields', async ({ page }) => {
  await page.goto('/#/signin')
  await expect(page.getByRole('main', { name: 'Sign in to your workspace' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Sign in to your workspace', exact: true, level: 1 })).toBeVisible()
  await expect(page.getByLabel('Tenant ID', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible()
})

test('real user creation survives a reload and generates server audit', async ({ page }) => {
  await signIn(page)
  await page.getByRole('button', { name: 'Users', exact: true }).click()
  await page.getByRole('button', { name: 'Add user', exact: true }).click()
  const dialog = page.getByRole('dialog'),
    address = `browser-${test.info().testId}-${test.info().repeatEachIndex}@example.com`
  await dialog.getByLabel('Name', { exact: true }).fill('Persistent browser member')
  await dialog.getByLabel('Email', { exact: true }).fill(address)
  await dialog.getByLabel('Password', { exact: true }).fill('Member-password-42')
  await dialog.getByRole('button', { name: 'Save changes', exact: true }).click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('row').filter({ hasText: address })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()
  // Later repetitions may have more than one page of data; search verifies persistent access.
  const search = page
    .getByRole('searchbox', { name: 'Search records' })
    .or(page.getByRole('textbox', { name: 'Search records' }))
  await search.fill(address)
  await search.press('Enter')
  await expect(page.getByRole('row').filter({ hasText: address })).toBeVisible()
  await page.getByRole('menuitem', { name: 'Audit log', exact: true }).click()
  await expect(page.getByRole('row').filter({ hasText: 'users' }).first()).toContainText('Create')
})
test('logout and another tenant login clear cached data and previously opened tabs', async ({ page }) => {
  await signIn(page)
  await page.getByRole('button', { name: 'Users', exact: true }).click()
  await expect(page.getByRole('row').filter({ hasText: 'Admin alpha' })).toBeVisible()
  const oldSession = await page.evaluate(() => JSON.parse(localStorage.getItem('enterprise_session') || '{}'))
  await signOut(page)
  await signIn(page, 'beta')
  await expect(page.getByRole('tab', { name: 'Users', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Users', exact: true }).click()
  await expect(page.getByRole('row').filter({ hasText: 'Admin beta' })).toBeVisible()
  await expect(page.getByRole('row').filter({ hasText: 'Admin alpha' })).toHaveCount(0)
  const response = await page.request.get('/api/auth/session', {
    headers: { Authorization: `Bearer ${oldSession.token}` },
  })
  expect(response.status()).toBe(401)
})
test('invalid credentials preserve the form and never create a browser session', async ({ page }) => {
  await page.goto('/#/signin')
  await page.getByLabel('Tenant ID', { exact: true }).fill('alpha')
  await page.getByLabel('Email', { exact: true }).fill('admin@example.com')
  await page.getByLabel('Password', { exact: true }).fill('Incorrect-password-42')
  await page.getByRole('button', { name: 'Sign in', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('Check your tenant, email and password.')
  await expect(page.getByLabel('Tenant ID')).toHaveValue('alpha')
  expect(await page.evaluate(() => localStorage.getItem('enterprise_session'))).toBeNull()
})
