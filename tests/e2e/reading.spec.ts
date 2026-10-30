import { test, expect, type Page } from '@playwright/test'

async function openShelf(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('i18nextLng', 'zh')
  })
  await page.goto('/#/reading')
  await expect(page.getByRole('heading', { name: '把故事， 握在手里。' })).toBeVisible()
}

const visiblePage = (page: Page) => page.locator('[role="dialog"] .bookFlipStage > [aria-hidden="false"]')

for (const width of [1440, 390]) {
  test(`the shelf fits the complete rotatable book without angle buttons at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await openShelf(page)
    const stage = page.getByRole('region', { name: '焦点书籍' })
    const preview = stage.locator('[data-interactive-book]')
    await expect(preview.locator('[data-book-mesh-ready="true"]')).toBeVisible()
    await expect(preview.getByRole('navigation', { name: '书本 3D 视角' })).toHaveCount(0)
    const pose = preview.locator('[data-book-preview-surface]')
    const yaw = () => pose.evaluate((node: HTMLElement) => node.style.getPropertyValue('--book-preview-yaw'))
    await expect.poll(yaw).toBe('-32deg')
    const viewport = await preview.locator('[data-interactive-book-viewport]').boundingBox()
    const canvas = await preview.locator('canvas').boundingBox()
    expect(canvas!.x).toBeLessThan(viewport!.x - 40)
    expect(canvas!.x + canvas!.width).toBeGreaterThan(viewport!.x + viewport!.width + 40)
    const space = await preview.boundingBox()
    expect(space!.height - viewport!.height).toBeGreaterThan(100)

    const cover = preview.getByRole('button', { name: /拖动旋转封面/ })
    await cover.scrollIntoViewIfNeeded()
    const box = await cover.boundingBox()
    const x = box!.x + box!.width / 2
    const y = box!.y + box!.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 50, y + 15, { steps: 6 })
    await page.mouse.up()
    await expect.poll(yaw).not.toBe('-32deg')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await page.getByRole('button', { name: '选中《三國志演義》', exact: true }).click()
    await expect.poll(yaw).toBe('-32deg')
  })
}

test('reading shares the 3D preview, paginates chapters and closes before leaving', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openShelf(page)
  await page.getByRole('button', { name: '选中《孫子兵法》', exact: true }).click()
  const cover = page.getByRole('button', { name: '拖动旋转封面或点击打开《孫子兵法》', exact: true })
  await cover.click()
  const dialog = page.getByRole('dialog', { name: '阅读《孫子兵法》', exact: true })
  await expect(dialog.locator('[data-book-pagination-ready]')).toHaveAttribute('data-book-pagination-ready', 'true')
  await expect(visiblePage(page).locator('[data-book-matter="endpaper"]')).toBeVisible()
  await expect(visiblePage(page).locator('[data-book-matter="half-title"]')).toBeVisible()
  await dialog.getByRole('button', { name: '进入目录', exact: true }).click()
  const chapter = dialog.getByRole('button', { name: /跳转至第 1 页/ })
  await expect(chapter).toBeVisible()
  await chapter.click()
  await expect(visiblePage(page).locator('[data-book-source-face]').first()).toBeVisible()
  const text = await visiblePage(page).locator('[data-book-source-face]').first().getAttribute('data-book-source-face')
  await page.setViewportSize({ width: 720, height: 1000 })
  await expect(visiblePage(page).locator('[data-book-source-face]').first()).toHaveAttribute(
    'data-book-source-face',
    text!
  )
  await expect(visiblePage(page).locator('[data-book-source-face]')).toHaveCount(1)
  await expect(dialog).toHaveJSProperty('scrollHeight', await dialog.evaluate((el) => el.clientHeight))
  await dialog.getByRole('button', { name: '关闭阅读器', exact: true }).click()
  await expect(dialog.locator('[data-interactive-book]')).toHaveAttribute('aria-busy', 'true')
  await expect(dialog).toBeHidden()
  await expect(cover).toBeFocused()
})

test('a complete long novel reaches the reader without dropping chapters', async ({ page }) => {
  test.setTimeout(90_000)
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openShelf(page)
  await page.getByRole('button', { name: '翻开阅读', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: '阅读《西遊記》', exact: true })
  await expect(dialog.locator('[data-book-pagination-ready]')).toHaveAttribute('data-book-pagination-ready', 'true', {
    timeout: 60_000,
  })
  await expect(visiblePage(page).locator('[data-book-matter="endpaper"]')).toBeVisible()
  expect(await dialog.locator('[data-density]').count()).toBeGreaterThan(1000)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: '翻开阅读', exact: true })).toBeFocused()
})

test('a reader returned from the back cover to the front can still be dismissed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openShelf(page)
  await page.getByRole('button', { name: '阅读《孫子兵法》', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(visiblePage(page).locator('[data-book-matter="endpaper"]')).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.keyboard.press('End')
  await expect(dialog.getByTitle('翻到封底')).toBeEnabled()
  await dialog.getByTitle('翻到封底').click()
  await expect(dialog.locator('[data-book-view]')).toHaveAttribute('data-book-view', 'back')
  await dialog.getByRole('button', { name: '翻到封面', exact: true }).click()
  await expect(dialog.locator('[data-book-view]')).toHaveAttribute('data-book-view', 'front')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})

test('large-book pagination yields to closing and does not replace the next selected book', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openShelf(page)
  await page.getByRole('button', { name: '翻开阅读', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByText('正在整理书页…', { exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden({ timeout: 2000 })
  await page.getByRole('button', { name: '阅读《孫子兵法》', exact: true }).click()
  await expect(page.getByRole('dialog', { name: '阅读《孫子兵法》', exact: true })).toBeVisible()
  await expect(visiblePage(page).locator('[data-book-matter="half-title"]')).toContainText('孫子兵法')
  await expect(page.getByRole('dialog', { name: '阅读《西遊記》', exact: true })).toHaveCount(0)
})

test.describe('touch reader', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  test('a swipe turns the single page without clipping the reader', async ({ page }) => {
    await openShelf(page)
    await page.getByRole('button', { name: '阅读《孫子兵法》', exact: true }).tap()
    const dialog = page.getByRole('dialog')
    const surface = dialog.locator('[data-interactive-book-viewport]')
    await expect(visiblePage(page).locator('[data-book-matter="endpaper"]')).toBeVisible()
    const bounds = await surface.boundingBox()
    expect(bounds!.x).toBeGreaterThan(0)
    expect(bounds!.x + bounds!.width).toBeLessThan(390)
    const cdp = await page.context().newCDPSession(page)
    const y = bounds!.y + bounds!.height * 0.5
    const x = bounds!.x + bounds!.width * 0.85
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
    for (let step = 1; step <= 8; step++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x - (bounds!.width * 0.65 * step) / 8, y }],
      })
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await expect(visiblePage(page).locator('[data-book-matter="half-title"]')).toBeVisible()
    await expect(dialog).toHaveJSProperty('scrollWidth', 390)
    await dialog.getByRole('button', { name: '关闭阅读器', exact: true }).tap()
    await expect(dialog).toBeHidden()
  })
})
