import { expect, test, type Locator, type Page } from '@playwright/test'
import { getContrastRatio } from '../../src/theme/contrast'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
})

async function switchTheme(page: Page, mode: 'light' | 'dark') {
  await page.getByRole('button', { name: mode === 'dark' ? 'Dark mode' : 'Light mode', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', mode)
}

async function readableColors(locator: Locator) {
  await expect(locator).toBeVisible()
  const colors = await locator.evaluate((element) => {
    const layers: number[][] = []
    let surface: Element | null = element
    while (surface) {
      const color = getComputedStyle(surface)
        .backgroundColor.match(/[\d.]+/g)
        ?.map(Number)
      if (color) {
        const alpha = color[3] ?? 1
        layers.push([...color.slice(0, 3), alpha])
        if (alpha === 1) break
      }
      surface = surface.parentElement
    }
    let background = [255, 255, 255]
    for (const layer of layers.reverse()) {
      background = background.map((channel, index) => Math.round(layer[index] * layer[3] + channel * (1 - layer[3])))
    }
    return {
      foreground: getComputedStyle(element).color,
      background: `rgb(${background.join(', ')})`,
    }
  })
  expect(getContrastRatio(colors.foreground, colors.background), JSON.stringify(colors)).toBeGreaterThanOrEqual(4.5)
  return colors
}

test('theme and system appearance changes preserve the route, cached form and tab actions', async ({ page }) => {
  await page.goto('/#/patterns/basic-form')
  const title = page.getByRole('textbox', { name: /Request title/ })
  await title.fill('Keep this draft while changing appearance')
  await switchTheme(page, 'dark')
  await expect(title).toHaveValue('Keep this draft while changing appearance')
  await page.getByRole('menuitem', { name: 'Step form', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Step form', exact: true })).toBeVisible()
  await switchTheme(page, 'light')
  await page.getByRole('tab', { name: 'Basic form', exact: true }).click()
  await expect(page).toHaveURL(/#\/patterns\/basic-form$/)
  await expect(title).toHaveValue('Keep this draft while changing appearance')

  await page.getByRole('button', { name: 'Preferences', exact: true }).click()
  const preferences = page.getByRole('dialog')
  await preferences.getByText('System', { exact: true }).click()
  await expect(preferences.getByRole('radio', { name: 'System', exact: true })).toBeChecked()
  await preferences.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(preferences).toBeHidden()
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(title).toHaveValue('Keep this draft while changing appearance')
  expect(
    await page.evaluate(() => document.fonts.ready.then(() => document.fonts.check('14px "Geist Variable"')))
  ).toBe(true)

  const activeTab = await page.getByRole('tab', { name: 'Basic form', exact: true }).boundingBox()
  const close = await page.getByRole('button', { name: 'Close current tab', exact: true }).boundingBox()
  expect(activeTab).not.toBeNull()
  expect(close).not.toBeNull()
  expect(close!.x).toBeGreaterThan(activeTab!.x)
  expect(close!.x + close!.width).toBeLessThanOrEqual(activeTab!.x + activeTab!.width + 1)
})

for (const mode of ['dark', 'light'] as const) {
  test(`guide, modal, dropdown and update notification stay readable after switching to ${mode}`, async ({
    page,
  }, info) => {
    await page.goto('/#/deployment-guide')
    await switchTheme(page, 'dark')
    if (mode === 'light') await switchTheme(page, 'light')
    const guide = page.getByRole('main').last()
    const heading = guide.getByRole('heading', { name: 'Deploy to GitHub Pages and Vercel' })
    await expect(heading).toHaveCSS('font-size', '24px')
    await readableColors(heading)
    const homeLink = page.locator('.layout-header').getByRole('button', { name: 'Home', exact: true })
    const normalLinkColor = await homeLink.evaluate((e) => getComputedStyle(e).color)
    await homeLink.hover()
    await expect.poll(() => homeLink.evaluate((e) => getComputedStyle(e).color)).not.toBe(normalLinkColor)
    await readableColors(homeLink)
    await readableColors(guide.locator('code').first())
    await readableColors(guide.getByRole('link', { name: 'View Markdown source' }))
    await page.screenshot({ animations: 'disabled', path: info.outputPath('guide.png') })

    await page.evaluate(() => {
      window.location.hash = '/administration/users'
    })
    await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible()
    await expect(page.getByRole('row').filter({ hasText: 'admin@example.com' })).toBeVisible()
    await page.screenshot({ animations: 'disabled', path: info.outputPath('users.png') })
    await page.getByRole('button', { name: 'Add user', exact: true }).click()
    const modal = page.getByRole('dialog', { name: 'Add user', exact: true })
    const modalColors = await readableColors(modal.getByText('Add user', { exact: true }))
    expect(modalColors.background).toBe(mode === 'dark' ? 'rgb(39, 39, 39)' : 'rgb(255, 255, 255)')
    await modal.getByRole('combobox', { name: /Role/ }).click()
    const option = page.locator('.wui-ant-select-dropdown:visible .wui-ant-select-item-option-content').first()
    await readableColors(option)
    await page.screenshot({ animations: 'disabled', path: info.outputPath('modal-dropdown.png') })
    await page.keyboard.press('Escape')
    await modal.getByRole('button', { name: 'Cancel', exact: true }).click()
    await expect(modal).toBeHidden()

    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('pwa:update-ready', {
          detail: { meta: { version: 'theme-test', buildTime: '2026-11-05T08:00:00Z' }, applyUpdate: async () => {} },
        })
      )
    })
    await readableColors(page.getByText('发现新版本', { exact: true }))
    await page.getByRole('button', { name: /^稍\s*后$/ }).click()
    await expect(page.getByText('发现新版本', { exact: true })).toBeHidden()
    await page.getByRole('button', { name: 'Preferences', exact: true }).click()
    const preferences = page.getByRole('dialog')
    await preferences.getByRole('button', { name: 'Top menu layout', exact: true }).click()
    const widthSwitch = preferences.getByRole('switch', { name: 'Content width', exact: true })
    await expect(widthSwitch).toBeEnabled()
    await readableColors(preferences.getByText('Fluid', { exact: true }))
    await widthSwitch.check()
    await readableColors(preferences.getByText('Fixed', { exact: true }))
    const [thumb, track] = await widthSwitch.evaluate((e) => [
      getComputedStyle(e.querySelector('.wui-ant-switch-handle')!, '::before').backgroundColor,
      getComputedStyle(e).backgroundColor,
    ])
    expect(getContrastRatio(thumb, track)).toBeGreaterThanOrEqual(3)
    await preferences.getByRole('button', { name: 'Close', exact: true }).click()
  })
}

test('dark navigation, custom accents and compact density work independently of a light form', async ({ page }) => {
  await page.goto('/#/patterns/basic-form')
  const title = page.getByRole('textbox', { name: /Request title/ })
  await title.fill('Density and navigation draft')
  await page.getByRole('button', { name: 'Preferences', exact: true }).click()
  const preferences = page.getByRole('dialog')
  await preferences.getByRole('button', { name: 'Dark menu style', exact: true }).click()
  await preferences.getByRole('button', { name: 'Aurora Green', exact: true }).click()
  await preferences.getByRole('switch', { name: 'Compact mode', exact: true }).check()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('.wui-ant-menu-dark').first()).toHaveCSS('background-color', 'rgb(24, 24, 24)')
  await expect.poll(() => title.locator('..').evaluate((e) => e.getBoundingClientRect().height)).toBeLessThan(29)
  await readableColors(preferences.getByRole('radio', { name: 'Light', exact: true }).locator('..'))
  await preferences.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(preferences).toBeHidden()
  await expect(title).toHaveValue('Density and navigation draft')
  await title.focus()
  const input = title.locator('..')
  const accent = await page
    .locator('html')
    .evaluate((e) => getComputedStyle(e).getPropertyValue('--wui-color-primary').trim())
  expect(accent).not.toBe('#1677ff')
  expect(getContrastRatio(accent, '#ffffff')).toBeGreaterThanOrEqual(4.5)
  await expect
    .poll(async () => getContrastRatio(await input.evaluate((e) => getComputedStyle(e).borderColor), accent))
    .toBeCloseTo(1, 2)

  await page.getByRole('button', { name: 'Preferences', exact: true }).click()
  await preferences.getByRole('button', { name: 'Top menu layout', exact: true }).click()
  await preferences.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(preferences).toBeHidden()
  await expect(page.locator('.wui-ant-layout-header')).toHaveCSS('background-color', 'rgb(24, 24, 24)')
  await expect(title).toHaveCSS('color', 'rgb(23, 23, 23)')
  await expect(title).toHaveValue('Density and navigation draft')
})

for (const width of [390, 440]) {
  for (const mode of ['dark', 'light'] as const) {
    test(`${width}px ${mode} layout keeps navigation and settings reachable without horizontal overflow`, async ({
      page,
    }, info) => {
      await page.setViewportSize({ width, height: 956 })
      await page.goto('/#/deployment-guide')
      await switchTheme(page, 'dark')
      if (mode === 'light') await switchTheme(page, 'light')
      const guide = page.getByRole('main').last()
      await readableColors(guide.getByRole('heading', { name: 'Deploy to GitHub Pages and Vercel' }))
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
      expect(await guide.evaluate((e) => e.scrollWidth - e.clientWidth)).toBeLessThanOrEqual(1)
      const header = page.locator('.wui-ant-layout-header')
      await expect(header).toHaveCSS('height', '56px')
      await header.getByRole('button', { name: 'Open navigation menu', exact: true }).click()
      await expect(page.getByRole('dialog')).toBeInViewport({ ratio: 1 })
      await expect(page.getByRole('menuitem', { name: 'Deployment Guide', exact: true })).toBeVisible()
      await page.screenshot({ animations: 'disabled', path: info.outputPath('mobile-navigation.png') })
      await page.getByRole('dialog').getByRole('menuitem', { name: 'Home', exact: true }).click()
      await expect(page.getByRole('dialog')).toBeHidden()
      await expect(page).toHaveURL(/#\/$/)
      await page.evaluate(() => {
        window.location.hash = '/deployment-guide'
      })
      await expect(guide.getByRole('heading', { name: 'Deploy to GitHub Pages and Vercel' })).toBeVisible()
      await header.getByRole('button', { name: 'More actions', exact: true }).click()
      await page.getByRole('menuitem', { name: /Preferences$/ }).click()
      const preferences = page.getByRole('dialog')
      await expect(preferences.getByRole('switch', { name: 'Compact mode', exact: true })).toBeVisible()
      await preferences.getByRole('button', { name: 'Close', exact: true }).click()
      await expect(preferences).toBeHidden()
      await page.screenshot({ animations: 'disabled', path: info.outputPath('mobile-guide.png') })
    })
  }
}
