import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
    localStorage.setItem('pro-react-admin:default:theme', JSON.stringify({ themeMode: 'light' }))
  })
})

test('theme switches never paint old tab or editor colors and retain hover feedback', async ({ page }) => {
  await page.goto('/#/text-editor')
  const editor = page.getByRole('textbox', { name: 'Text Editor', exact: true })
  await editor.fill('Preserve the draft during immediate theme changes')

  for (const target of ['dark', 'light'] as const) {
    const [frames] = await Promise.all([
      page.evaluate(
        (mode) =>
          new Promise<Array<{ tab: string; paper: string }>>((resolve) => {
            const frames: Array<{ tab: string; paper: string }> = []
            const sample = () => {
              if (document.documentElement.dataset.theme === mode) {
                frames.push({
                  tab: getComputedStyle(document.querySelector('.wui-ant-tabs-tab-active')!).backgroundColor,
                  paper: getComputedStyle(document.querySelector('.mdxEditorCol')!).backgroundColor,
                })
              }
              if (frames.length === 24) resolve(frames)
              else requestAnimationFrame(sample)
            }
            requestAnimationFrame(sample)
          }),
        target
      ),
      page.getByRole('button', { name: target === 'dark' ? 'Dark mode' : 'Light mode', exact: true }).click(),
    ])
    const expected = target === 'dark' ? 'rgb(31, 31, 31)' : 'rgb(255, 255, 255)'
    expect(frames.filter((frame) => frame.tab !== expected || frame.paper !== expected)).toEqual([])
    await expect(editor).toContainText('Preserve the draft during immediate theme changes')
    const copy = page.getByRole('button', { name: 'Copy Markdown', exact: true })
    const transition = await copy.evaluate((e) => getComputedStyle(e).transitionDuration)
    expect(transition.split(',').some((duration) => Number.parseFloat(duration) > 0)).toBe(true)
    const background = await copy.evaluate((e) => getComputedStyle(e).backgroundColor)
    await copy.hover()
    await expect.poll(() => copy.evaluate((e) => getComputedStyle(e).backgroundColor)).not.toBe(background)
  }
})

test('big screen fills its content after resize, sidebar collapse and cached tab activation', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/#/big-screen')
  const panel = page.getByRole('tabpanel')
  const canvas = panel.locator('canvas').first()
  await expect(canvas).toBeVisible()
  const gaps = () =>
    canvas.evaluate((e) => {
      const canvas = e.getBoundingClientRect()
      const container = e.closest('[role=tabpanel]')!.getBoundingClientRect()
      return Math.max(Math.abs(canvas.height - container.height), Math.abs(canvas.width - container.width))
    })
  await expect.poll(gaps).toBeLessThanOrEqual(2)
  await page.getByRole('button', { name: 'Collapse sidebar', exact: true }).click()
  await expect.poll(gaps).toBeLessThanOrEqual(2)
  for (const height of [700, 360, 1000]) {
    await page.setViewportSize({ width: 1280, height })
    await expect.poll(gaps).toBeLessThanOrEqual(2)
  }
  await page.getByRole('tab', { name: 'Home', exact: true }).click()
  await expect(page).toHaveURL(/#\/$/)
  await page.getByRole('tab', { name: 'Big Screen', exact: true }).click()
  await expect.poll(gaps).toBeLessThanOrEqual(2)
  await page.screenshot({ animations: 'disabled', path: info.outputPath('big-screen-filled.png') })
})
