import { test, expect } from '@playwright/test'

/**
 * 验证“权限缓存按身份隔离”是否生效：
 * - 先写入 A 账号的权限缓存 + authKey
 * - 再切换成 B 账号的 token（不清除旧 user_permissions）
 * - 页面应识别 authKey 不匹配并丢弃旧缓存，从而拒绝访问
 */
test('permission cache is isolated by authKey across account changes', async ({ page }) => {
  // 先进入站点获取 origin，然后手动写入 localStorage（避免 addInitScript 在 reload 时反复重置数据）
  await page.goto('/#/')
  await page.evaluate(() => {
    // 1) 预置“管理员”账号与其权限缓存（模拟旧缓存存在）
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))

    localStorage.setItem(
      'user_permissions',
      JSON.stringify({
        userId: '1',
        username: '超级管理员',
        roles: [
          {
            id: '1',
            name: '超级管理员',
            code: 'super_admin',
            description: '拥有所有权限',
            permissions: ['*:*'],
            isDefault: false,
          },
        ],
        permissions: ['*:*'],
        routes: ['/', '/permission'],
      })
    )
    localStorage.setItem('permissions_fetch_time', Date.now().toString())
    // permissionService.getCurrentAuthKey() -> token:${email}
    localStorage.setItem('permissions_auth_key', 'token:admin@test.com')
  })

  // 触发应用按 localStorage 恢复权限
  await page.reload()
  await page.goto('/#/permission')
  await expect(page.locator('text=权限系统示例')).toHaveCount(1)

  // 2) 切换账号：只改 token，不清旧 user_permissions（模拟“登出清理不彻底/切号残留”）
  await page.evaluate(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'user@test.com' }))
  })

  // 3) 通过 reload 模拟真实“切号/重新进入”的场景，确保单例服务重新从 localStorage 恢复并触发 authKey 校验
  await page.reload()
  await page.goto('/#/permission')

  // 等待权限重新同步：authKey 应切换为新账号
  await page.waitForFunction(() => localStorage.getItem('permissions_auth_key') === 'token:user@test.com')

  // 读取最新权限，确保不再沿用旧账号的权限缓存
  const perms = await page.evaluate(() => {
    const raw = localStorage.getItem('user_permissions')
    return raw ? JSON.parse(raw) : null
  })
  expect(perms?.roles?.[0]?.code).toBe('user')
  expect(Array.isArray(perms?.routes) ? perms.routes.includes('/permission') : false).toBe(false)

  // UI 层面不应再显示权限示例页内容（无权限会被路由守卫拦截）
  await expect(page.locator('text=权限系统示例')).toHaveCount(0)
})
