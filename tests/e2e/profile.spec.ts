import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    if (!localStorage.getItem('i18nextLng')) localStorage.setItem('i18nextLng', 'en')
  })
})

test('profile shows the current account and restores saved browser-local display details', async ({ page }) => {
  await page.goto('/#/profile')
  await expect(page.getByRole('heading', { name: 'Profile', exact: true })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Account', exact: true })).toContainText('admin@test.com')
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  const editor = page.getByRole('dialog', { name: 'Edit profile', exact: true })
  await editor.getByRole('textbox', { name: 'Display name', exact: true }).fill('Avery Lin')
  await editor.getByRole('textbox', { name: 'Job title', exact: true }).fill('Workspace maintainer')
  await editor.getByRole('textbox', { name: 'Department', exact: true }).fill('Internal tools')
  await editor.getByRole('textbox', { name: 'Location', exact: true }).fill('Shanghai')
  await editor
    .getByRole('textbox', { name: 'About me', exact: true })
    .fill('I maintain our internal team workspace and review common workflows.')
  await editor.getByRole('button', { name: 'Save changes', exact: true }).click()
  await expect(page.getByText('Display details saved on this browser', { exact: true })).toBeVisible()
  const details = page.getByRole('region', { name: 'Personal details', exact: true })
  await expect(details).toContainText('Avery Lin')
  await expect(details).toContainText('Workspace maintainer')
  await expect(page.getByRole('region', { name: 'Account', exact: true })).toContainText('admin@test.com')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('token') ?? '{}').token)).toBe('admin@test.com')
  await page.reload()
  await expect(details).toContainText('Avery Lin')
  await expect(details).toContainText('Internal tools')
  await expect(details).toContainText('Shanghai')
  await expect(details).toContainText('I maintain our internal team workspace')
})

test('cancelling profile edits can retain the draft or discard it without changing saved details', async ({ page }) => {
  await page.goto('/#/profile')
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  const editor = page.getByRole('dialog', { name: 'Edit profile', exact: true })
  await editor.getByRole('textbox', { name: 'Job title', exact: true }).fill('An unsaved role')
  await editor.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Discard unsaved changes?', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Keep editing', exact: true }).click()
  await expect(editor.getByRole('textbox', { name: 'Job title', exact: true })).toHaveValue('An unsaved role')
  await editor.getByRole('button', { name: 'Cancel', exact: true }).click()
  await page.getByRole('button', { name: 'Discard changes', exact: true }).click()
  await expect(editor).toBeHidden()
  await expect(page.getByRole('region', { name: 'Personal details', exact: true })).not.toContainText('An unsaved role')
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  await expect(editor.getByRole('textbox', { name: 'Job title', exact: true })).toHaveValue('')
})

test('switching accounts in the same tab isolates display details without a reload', async ({ page }) => {
  await page.goto('/#/profile')
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  const editor = page.getByRole('dialog', { name: 'Edit profile', exact: true })
  await editor.getByRole('textbox', { name: 'Display name', exact: true }).fill('Admin local display')
  await editor.getByRole('button', { name: 'Save changes', exact: true }).click()
  const details = page.getByRole('region', { name: 'Personal details', exact: true })
  await expect(details).toContainText('Admin local display')

  await page.evaluate(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'manager@test.com' }))
    localStorage.setItem('user_role', 'admin')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect(page.getByRole('region', { name: 'Account', exact: true })).toContainText('manager@test.com')
  await expect(details).not.toContainText('Admin local display')
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  await editor.getByRole('textbox', { name: 'Display name', exact: true }).fill('Manager local display')
  await editor.getByRole('button', { name: 'Save changes', exact: true }).click()
  await expect(details).toContainText('Manager local display')

  await page.evaluate(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect(page.getByRole('region', { name: 'Account', exact: true })).toContainText('admin@test.com')
  await expect(details).toContainText('Admin local display')
  await expect(details).not.toContainText('Manager local display')
})

test('profile preferences synchronize theme, language and density on a narrow screen', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#/profile')
  await expect(page.getByRole('heading', { name: 'Profile', exact: true })).toBeVisible()
  await page.getByRole('combobox', { name: 'Theme', exact: true }).click()
  await page.getByText('Dark', { exact: true }).last().click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('switch', { name: 'Compact layout', exact: true }).click()
  await expect(page.getByRole('switch', { name: 'Compact layout', exact: true })).toBeChecked()
  await page.getByRole('combobox', { name: 'Language', exact: true }).click()
  await page.getByText('简体中文', { exact: true }).last().click()
  await expect(page.getByRole('heading', { name: '个人资料', exact: true })).toBeVisible()
  await expect(page.getByRole('switch', { name: '紧凑布局', exact: true })).toBeChecked()
  await page.reload()
  await expect(page.getByRole('heading', { name: '个人资料', exact: true })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('switch', { name: '紧凑布局', exact: true })).toBeChecked()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.getByRole('heading', { name: '个人资料', exact: true }).scrollIntoViewIfNeeded()
  await page.mouse.move(385, 820)
  await page.screenshot({ path: testInfo.outputPath('profile-mobile-dark.png') })
})

test('a rejected browser storage write keeps the editable draft and does not report success', async ({ page }) => {
  await page.goto('/#/profile')
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  const editor = page.getByRole('dialog', { name: 'Edit profile', exact: true })
  await editor.getByRole('textbox', { name: 'Display name', exact: true }).fill('Retained local draft')
  await page.evaluate(() => {
    const original = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith('pro-react-admin:profile:'))
        throw new DOMException('Storage quota exceeded', 'QuotaExceededError')
      return original.call(this, key, value)
    }
  })
  await editor.getByRole('button', { name: 'Save changes', exact: true }).click()
  await expect(editor.getByRole('alert')).toContainText('Could not save to this browser')
  await expect(editor.getByRole('textbox', { name: 'Display name', exact: true })).toHaveValue('Retained local draft')
  await expect(page.getByText('Display details saved on this browser', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('region', { name: 'Personal details', exact: true })).not.toContainText(
    'Retained local draft'
  )
})

test('GitHub demo keeps the login separate from the display name', async ({ page }) => {
  const user = {
    id: 9813,
    login: 'profile-demo-login',
    name: 'Taylor Example',
    email: 'taylor@example.test',
    avatar_url: '',
    html_url: '',
  }
  await page.route('**/api/demo/github/session', (route) => route.fulfill({ json: { user } }))
  await page.addInitScript((identity) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_role')
    localStorage.setItem('github_demo_user', JSON.stringify(identity))
  }, user)
  await page.goto('/#/profile')
  const account = page.getByRole('region', { name: 'Account', exact: true })
  await expect(account).toContainText('Taylor Example')
  await expect(account).toContainText('profile-demo-login')
  await expect(account).toContainText('taylor@example.test')
})

test('long role names wrap inside the account panel on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#/profile')
  await page.waitForFunction(() => {
    const record = JSON.parse(localStorage.getItem('user_permissions') ?? 'null')
    return record?.roles?.length > 0
  })
  const roleName = '团队协作与业务管理'.repeat(10)
  await page.evaluate((name) => {
    const record = JSON.parse(localStorage.getItem('user_permissions') ?? '{}')
    record.roles[0].name = name
    localStorage.setItem('user_permissions', JSON.stringify(record))
  }, roleName)
  await page.reload()
  await expect(
    page.getByRole('region', { name: 'Account', exact: true }).getByText(roleName, { exact: true })
  ).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
