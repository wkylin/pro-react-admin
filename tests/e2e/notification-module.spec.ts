import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

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

test('notification editing validates fields and updates the shared list, detail, and filtered export', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'zh')
  })
  await page.goto('/#/notifications?status=read&search=unmatched-release&page=2')
  await expect(page.getByRole('heading', { name: '通知中心', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '新建通知', exact: true }).click()
  const editor = page.getByRole('dialog', { name: '新建通知', exact: true })
  await editor.getByRole('button', { name: '保存通知', exact: true }).click()
  await expect(editor.getByText('请输入标题。', { exact: true })).toBeVisible()
  await expect(editor.getByText('请输入通知内容。', { exact: true })).toBeVisible()
  await editor.getByRole('textbox', { name: '标题', exact: true }).fill('发布审批提醒')
  await editor.getByRole('textbox', { name: '内容', exact: true }).fill('请在周五前确认发布清单。')
  await editor.getByRole('button', { name: '保存通知', exact: true }).click()
  await expect(editor).toBeHidden()
  await expect(page).not.toHaveURL(/[?&](?:search|status)=/)
  await expect(page).toHaveURL(/[?&]page=1(?:&|$)/)

  const created = page.getByRole('row').filter({ has: page.getByRole('button', { name: '发布审批提醒', exact: true }) })
  await expect(created).toBeVisible()
  await created.getByRole('button', { name: '编辑', exact: true }).click()
  const edit = page.getByRole('dialog', { name: '编辑通知', exact: true })
  await edit.getByRole('textbox', { name: '标题', exact: true }).fill('发布审批已完成')
  await edit.getByRole('textbox', { name: '内容', exact: true }).fill('审核通过，可以按计划发布。')
  await edit.getByRole('switch', { name: '已读', exact: true }).check()
  await edit.getByRole('button', { name: '保存通知', exact: true }).click()
  await expect(edit).toBeHidden()

  await page.getByRole('textbox', { name: '搜索标题或内容…', exact: true }).fill('发布审批已完成')
  const updated = page
    .getByRole('row')
    .filter({ has: page.getByRole('button', { name: '发布审批已完成', exact: true }) })
  await expect(updated.getByText('已读', { exact: true })).toBeVisible()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: '导出筛选结果', exact: true }).click()
  const download = await downloadPromise
  const path = await download.path()
  expect(path).not.toBeNull()
  const csv = await readFile(path!, 'utf8')
  expect(csv).toContain('发布审批已完成')
  expect(csv).not.toContain('新功能上线')

  await updated.getByRole('button', { name: '发布审批已完成', exact: true }).click()
  await expect(page).toHaveURL(/#\/notification\/13\?/)
  expect(new URLSearchParams(new URL(page.url()).hash.split('?')[1]).get('search')).toBe('发布审批已完成')
  const detail = page.getByRole('tabpanel', { name: '通知详情', exact: true })
  await expect(detail.getByText('审核通过，可以按计划发布。', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: '返回通知中心', exact: true }).click()
  await expect(page.getByRole('textbox', { name: '搜索标题或内容…', exact: true })).toHaveValue('发布审批已完成')
  await updated.getByRole('button', { name: '编辑', exact: true }).click()
  await edit.getByRole('switch', { name: '已读', exact: true }).uncheck()
  await edit.getByRole('button', { name: '保存通知', exact: true }).click()
  await expect(edit).toBeHidden()
  await expect(updated.getByText('未读', { exact: true })).toBeVisible()
  await updated.getByRole('button', { name: '发布审批已完成', exact: true }).click()
  await expect(page).toHaveURL(/#\/notification\/13\?/)
  await page.getByRole('button', { name: '返回通知中心', exact: true }).click()
  await expect(updated.getByText('已读', { exact: true })).toBeVisible()
  await updated.getByRole('button', { name: '删除', exact: true }).click()
  await page
    .getByRole('tooltip')
    .getByRole('button', { name: /删\s*除/ })
    .click()
  await expect(updated).toHaveCount(0)
  await expect(page.getByText('没有符合当前筛选条件的通知。', { exact: true })).toBeVisible()
})

test('read-only notification access hides content mutations and exports', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'notification-reader@example.test' }))
    localStorage.setItem('permissions_auth_key', 'token:notification-reader@example.test')
    localStorage.setItem('permissions_fetch_time', String(Date.now()))
    localStorage.setItem('i18nextLng', 'en')
    localStorage.setItem(
      'user_permissions',
      JSON.stringify({
        userId: 'notification-reader',
        username: 'Notification reader',
        roles: [],
        permissions: ['home:read', 'notification:read'],
        routes: ['/', '/notifications', '/notification/:id'],
      })
    )
  })
  await page.goto('/#/notifications')
  await expect(page.getByRole('heading', { name: 'Notification center', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'New notification', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Export matching results', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Edit', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Delete', exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: '消息标题 6', exact: true }).click()
  await expect(page).toHaveURL(/#\/notification\/6$/)
  await expect(page.getByRole('button', { name: 'Back to notification center', exact: true })).toBeVisible()
})

test('mobile notification editor cancels safely and confirms discarded drafts', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('i18nextLng', 'zh')
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#/notifications')
  await page.getByRole('button', { name: '新建通知', exact: true }).click()
  const editor = page.getByRole('dialog', { name: '新建通知', exact: true })
  await editor.getByRole('button', { name: /取\s*消/ }).click()
  await expect(editor).toBeHidden()
  await page.getByRole('button', { name: '新建通知', exact: true }).click()
  await editor.getByRole('textbox', { name: '标题', exact: true }).fill('未保存的通知草稿')
  await editor.getByRole('button', { name: /取\s*消/ }).click()
  const confirmation = page.getByRole('dialog', { name: '放弃本次修改？', exact: true })
  await confirmation.getByRole('button', { name: '继续编辑', exact: true }).click()
  await expect(editor.getByRole('textbox', { name: '标题', exact: true })).toHaveValue('未保存的通知草稿')
  await editor.getByRole('button', { name: /取\s*消/ }).click()
  await confirmation.getByRole('button', { name: '放弃修改', exact: true }).click()
  await expect(editor).toBeHidden()
  await expect(page.getByRole('button', { name: '未保存的通知草稿', exact: true })).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
})
