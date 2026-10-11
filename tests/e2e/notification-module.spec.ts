import { expect, test } from '@playwright/test'

test('notification module supplies its header action and opens its own lazy detail route', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'zh')
  })
  await page.goto('/#/')
  await page.getByRole('button', { name: '通知', exact: true }).click()
  const drawer = page.getByRole('dialog')
  await expect(drawer).toBeVisible()
  await drawer.getByText('消息标题 6', { exact: true }).click()
  await expect(page).toHaveURL(/#\/notification\/6$/)
  const detail = page.getByRole('tabpanel', { name: '通知详情', exact: true })
  await expect(detail.getByText('这是第 6 条消息的内容，支持详情查看。', { exact: true })).toBeVisible()
  await detail.getByRole('button', { name: '返回通知中心', exact: true }).click()
  await expect(page).toHaveURL(/#\/notifications$/)
})
