import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
})

test('creates a user, preserves the shared resource session, and records an audit event', async ({ page }) => {
  await page.goto('/#/administration/users')
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Add user', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Name', { exact: true }).fill('Enterprise member')
  await dialog.getByLabel('Email', { exact: true }).fill('member@example.com')
  await dialog.getByRole('button', { name: 'Save changes', exact: true }).click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('row').filter({ hasText: 'member@example.com' })).toBeVisible()
  await page.getByRole('menuitem', { name: 'Audit log', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Audit log', exact: true })).toBeVisible()
  await expect(page.getByRole('row').filter({ hasText: 'users' })).toContainText('Create')
  await page.getByRole('tab', { name: 'Users', exact: true }).click()
  await expect(page.getByRole('row').filter({ hasText: 'member@example.com' })).toBeVisible()
})

test('role creation and filtering work, and an assigned role cannot be deleted', async ({ page }) => {
  await page.goto('/#/administration/roles')
  await page.getByRole('button', { name: 'Add role', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('Name', { exact: true }).fill('Support team')
  await dialog.getByLabel('Role code', { exact: true }).fill('support')
  await dialog.getByRole('button', { name: 'Save changes', exact: true }).click()
  await expect(dialog).toBeHidden()
  const search = page
    .getByRole('searchbox', { name: 'Search records' })
    .or(page.getByRole('textbox', { name: 'Search records' }))
  await search.fill('support')
  await search.press('Enter')
  await expect(page.getByRole('row').filter({ hasText: 'Support team' })).toBeVisible()
  await expect(page.getByRole('row').filter({ hasText: 'viewer' })).toHaveCount(0)
  await search.fill('admin')
  await search.press('Enter')
  await page.getByRole('row').filter({ hasText: 'admin' }).getByRole('button', { name: 'Delete', exact: true }).click()
  await page.getByRole('button', { name: 'Delete', exact: true }).last().click()
  await expect(page.getByText('该角色仍有成员，不能删除', { exact: true })).toBeVisible()
  await expect(page.getByRole('row').filter({ hasText: 'admin' })).toBeVisible()
})

test('live cross-tab revocation removes protected content and navigation without reloading', async ({
  page,
  context,
}) => {
  await page.goto('/#/administration/users')
  await expect(page.getByRole('button', { name: 'Add user', exact: true })).toBeVisible()
  const other = await context.newPage()
  await other.goto('/#/')
  await other.evaluate(() => localStorage.setItem('user_role', 'user'))
  await expect(page).toHaveURL(/#\/403$/)
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toHaveCount(0)
  await other.close()
})

test('lean project navigation omits showcase pages and renders at a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#/administration/users')
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Add user', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.goto('/#/motion')
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toHaveCount(0)
})

test('a project that omits the notifications module exposes neither its header action nor its pages', async ({
  page,
}) => {
  await page.goto('/#/administration/users')
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '通知', exact: true })).toHaveCount(0)
  await page.goto('/#/notifications')
  await expect(page.getByRole('button', { name: '返回通知中心', exact: true })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toHaveCount(0)
})

test('revocation also removes previously cached tabs while an authorized page stays open', async ({
  page,
  context,
}) => {
  await page.goto('/#/administration/roles')
  await expect(page.getByRole('heading', { name: 'Roles', exact: true })).toBeVisible()
  await page.getByRole('menuitem', { name: 'Users', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Roles', exact: true })).toBeVisible()
  const other = await context.newPage()
  await other.goto('/#/')
  await other.evaluate(() => localStorage.setItem('user_role', 'admin'))
  await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Roles', exact: true })).toHaveCount(0)
  await expect(page.getByRole('menuitem', { name: 'Roles', exact: true })).toHaveCount(0)
  await other.close()
})
