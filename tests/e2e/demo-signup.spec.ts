import { test, expect } from '@playwright/test'

test('registration form demo enters the workspace with ordinary user permissions', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('user_role', 'super_admin'))
  await page.goto('/#/signup')

  await page.getByPlaceholder('请输入用户名').fill('DemoUser')
  await page.getByPlaceholder('请输入邮箱地址').fill('preview-only@example.com')
  await page.getByPlaceholder('请输入手机号码').fill('13800138000')
  await page.getByPlaceholder('请输入密码', { exact: true }).fill('DemoPass123')
  await page.getByPlaceholder('请再次输入密码').fill('DemoPass123')
  await page.getByRole('button', { name: '提交并体验' }).click()

  await expect(page).toHaveURL(/#\/$/)
  await expect
    .poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('user_permissions') || 'null')?.roles?.[0]?.code))
    .toBe('user')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('token') || 'null')?.token)).toBe('user@test.com')
})
