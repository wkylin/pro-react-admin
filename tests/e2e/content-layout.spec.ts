import { expect, test } from '@playwright/test'
import { getContrastRatio } from '../../src/theme/contrast'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
})

for (const width of [1440, 390]) {
  test(`QR generation and download stay usable inside the page at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 956 })
    await page.goto('/#/qrcode')
    const heading = page.getByRole('heading', { name: 'QR Generator', exact: true })
    const panel = page.getByRole('tabpanel')
    await expect(heading).toBeVisible()
    const panelBox = await panel.boundingBox()
    const headingBox = await heading.boundingBox()
    const inset = width < 768 ? 16 : 24
    expect(headingBox!.x - panelBox!.x).toBeGreaterThanOrEqual(inset)
    expect(headingBox!.y - panelBox!.y).toBeGreaterThanOrEqual(inset)
    const input = page.getByRole('textbox', { name: 'QR code URL', exact: true })
    await input.fill('https://example.com/project')
    await page.getByRole('button', { name: 'Generate', exact: true }).click()
    await expect(page.getByRole('img', { name: 'QRcode', exact: true })).toHaveAttribute('src', /^data:image\/png/)
    const download = page.getByRole('link', { name: 'Download', exact: true })
    await expect(download).toHaveAttribute('download', 'qrcode.png')
    await expect(download).toHaveAttribute('href', /^data:image\/png/)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
    const inputBox = await input.boundingBox()
    expect(inputBox!.x + inputBox!.width).toBeLessThan(panelBox!.x + panelBox!.width - inset)
    if (width === 1440) {
      const sider = page.locator('.wui-ant-layout-sider')
      await expect(sider).toHaveCSS('border-inline-end-width', '1px')
      await expect(sider).toHaveCSS('border-inline-end-style', 'solid')
      const colors = await sider.evaluate((e) => [
        getComputedStyle(e).borderInlineEndColor,
        getComputedStyle(e).backgroundColor,
      ])
      expect(colors[0]).not.toBe(colors[1])
    }
    await page.screenshot({ animations: 'disabled', path: info.outputPath('qr-tool.png') })
  })

  test(`editor themes, view modes and cached draft stay in sync at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 956 })
    await page.goto('/#/text-editor')
    const editor = page.getByRole('textbox', { name: 'Text Editor', exact: true })
    await editor.fill('Draft preserved across themes')
    await page.getByRole('button', { name: 'Dark mode', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(editor).toContainText('Draft preserved across themes')
    await expect(editor).toHaveCSS('color', 'rgb(245, 245, 245)')
    const frame = page.locator('.wui-mdx-editor')
    await expect(frame).toHaveCSS('background-color', 'rgb(24, 24, 24)')
    const frameBox = await frame.boundingBox()
    const panelBox = await page.getByRole('tabpanel').boundingBox()
    expect(frameBox!.y + frameBox!.height).toBeLessThanOrEqual(panelBox!.y + panelBox!.height + 1)
    await expect(frame.locator('footer')).toBeInViewport()

    await frame.getByRole('button', { name: '分屏', exact: true }).click()
    const source = page.getByRole('textbox', { name: 'Markdown source', exact: true })
    await expect(source).toHaveValue(/Draft preserved across themes/)
    await source.fill('# Theme draft\n\nDraft preserved across themes\n\n```js\nconst mode = "graphite"\n```')
    await expect(frame.getByRole('heading', { name: 'Theme draft', exact: true })).toBeVisible()
    const sourceColors = await source.evaluate((e) => [
      getComputedStyle(e).color,
      getComputedStyle(e.parentElement!).backgroundColor,
    ])
    expect(getContrastRatio(sourceColors[0], sourceColors[1])).toBeGreaterThanOrEqual(4.5)
    await frame.getByRole('button', { name: '插入链接', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: '插入链接', exact: true })
    await expect(dialog).toHaveCSS('background-color', 'rgb(31, 31, 31)')
    await dialog.getByRole('button', { name: '取消', exact: true }).click()
    await expect(dialog).toBeHidden()
    await page.screenshot({ animations: 'disabled', path: info.outputPath('editor-dark-split.png') })

    await frame.getByRole('button', { name: 'Toggle theme', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect(editor).toHaveCSS('color', 'rgb(23, 23, 23)')
    await expect(source).toHaveValue(/Theme draft[\s\S]*graphite/)
    await frame.getByRole('button', { name: '源码', exact: true }).click()
    await expect(editor).toBeHidden()
    await expect(source).toBeVisible()
    await frame.getByRole('button', { name: '编辑', exact: true }).click()
    await expect(editor).toBeVisible()
    await expect(editor).toContainText('Theme draft')
    await expect(frame.locator('footer')).toBeInViewport()
    await page.getByRole('button', { name: 'Go to home page', exact: true }).click()
    await expect(page).toHaveURL(/#\/$/)
    await page.getByRole('tab', { name: 'Text Editor', exact: true }).click()
    await expect(editor).toContainText('Draft preserved across themes')
    if (width === 1440) {
      const downloadReady = page.waitForEvent('download')
      await frame.getByRole('button', { name: 'Download', exact: true }).click()
      expect((await downloadReady).suggestedFilename()).toBe('document.md')
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
    await page.screenshot({ animations: 'disabled', path: info.outputPath('editor-light.png') })
  })
}
