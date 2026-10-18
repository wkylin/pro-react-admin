import { expect, test } from '@playwright/test'
import { getContrastRatio } from '../../src/theme/contrast'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
})

test('workspace accessibility keeps landmarks, tab controls, and contrast within WCAG AA', async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem('pro-react-admin:enterprise:theme'))
  await page.goto('/#/administration/users')
  await expect(page.getByRole('heading', { name: 'Users', exact: true, level: 1 })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.locator('[role="tablist"] > button')).toHaveCount(0)
  await expect(page.getByRole('group', { name: 'Page actions' })).toBeVisible()

  const collectWorkspaceContrast = async () =>
    page.evaluate(() => {
      const selectors = [
        'aside .wui-ant-menu-item-selected .wui-ant-menu-title-content > span',
        '.layout-header .wui-ant-btn-link',
        '.wui-ant-tabs-tab-active .wui-ant-tabs-tab-btn',
        '.wui-ant-typography-secondary',
        '.wui-ant-btn-primary',
      ]

      return selectors.flatMap((selector) => {
        const element = document.querySelector<HTMLElement>(selector)
        if (!element) return []

        let background = 'rgb(255, 255, 255)'
        let backgroundSource = 'default'
        for (let parent: HTMLElement | null = element; parent; parent = parent.parentElement) {
          const candidate = getComputedStyle(parent).backgroundColor
          const channels = candidate.match(/[\d.]+/g)?.map(Number)
          if (channels && (channels[3] === undefined || channels[3] >= 0.99)) {
            background = candidate
            backgroundSource = `${parent.tagName.toLowerCase()}.${parent.className}`
            break
          }
        }
        const selectedItem = element.closest('.wui-ant-menu-item-selected') as HTMLElement | null

        return [
          {
            selector,
            foreground: getComputedStyle(element).color,
            background,
            backgroundSource,
            theme: document.documentElement.dataset.theme,
            selectedInlineStyle: selectedItem?.getAttribute('style'),
          },
        ]
      })
    })

  const waitForWorkspaceContrast = async () => {
    await expect
      .poll(
        async () => {
          const samples = await collectWorkspaceContrast()
          if (samples.length !== 5) return 0
          return Math.min(...samples.map((sample) => getContrastRatio(sample.foreground, sample.background)))
        },
        { message: 'workspace contrast settles above WCAG AA', timeout: 10_000 }
      )
      .toBeGreaterThanOrEqual(4.5)
  }

  const checkWorkspaceContrast = async () => {
    const samples = await collectWorkspaceContrast()
    expect(samples).toHaveLength(5)
    for (const sample of samples) {
      const ratio = getContrastRatio(sample.foreground, sample.background)
      expect(
        ratio,
        `${sample.selector}: ${sample.foreground} on ${sample.background}; ${JSON.stringify(sample)}`
      ).toBeGreaterThanOrEqual(4.5)
    }
  }

  await waitForWorkspaceContrast()
  await checkWorkspaceContrast()
  await page.getByRole('button', { name: 'Dark mode' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await waitForWorkspaceContrast()
  await checkWorkspaceContrast()
})

test('keyboard skip link focuses main content without changing the hash route', async ({ page }) => {
  await page.goto('/#/administration/users')
  const skipLink = page.getByRole('link', { name: 'Skip to main content', exact: true })
  await expect(skipLink).toBeAttached()
  await expect(page).toHaveURL(/#\/administration\/users$/)
  await page.keyboard.press('Tab')
  if (!(await skipLink.evaluate((element) => document.activeElement === element))) await page.keyboard.press('Tab')
  await expect(skipLink).toBeFocused()
  const routeBeforeActivation = page.url()
  await page.keyboard.press('Enter')

  await expect(page.locator('#fullScreenContent')).toBeFocused()
  await expect(page).toHaveURL(routeBeforeActivation)
})

test('brand motion respects reduced-motion and forced-colors preferences', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#/administration/users')

  const brandName = page.locator('[style*="--package-gradient-stops"]').first()
  await expect(brandName).toBeVisible()
  await expect.poll(() => brandName.evaluate((element) => getComputedStyle(element).animationName)).toBe('none')

  await page.emulateMedia({ forcedColors: 'active' })
  const forcedColors = await brandName.evaluate((element) => {
    const styles = getComputedStyle(element)
    return { backgroundImage: styles.backgroundImage, color: styles.getPropertyValue('-webkit-text-fill-color') }
  })
  expect(forcedColors.backgroundImage).toBe('none')
  expect(forcedColors.color).not.toBe('rgba(0, 0, 0, 0)')
})

test('visible aria-controls references resolve to existing DOM targets', async ({ page }) => {
  await page.goto('/#/administration/users')
  const danglingControls = await page.locator('[aria-controls]:visible').evaluateAll((elements) =>
    elements.flatMap((element) => {
      const controls = element.getAttribute('aria-controls') || ''
      return controls
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .filter((id) => !document.getElementById(id))
        .map((id) => ({ element: element.outerHTML.slice(0, 240), missingTarget: id }))
    })
  )

  expect(danglingControls, JSON.stringify(danglingControls, null, 2)).toEqual([])
})

test('the active closable tab has an accessible close action outside the tablist', async ({ page }) => {
  await page.goto('/#/administration/users')
  await expect(page.getByRole('tab', { name: 'Users', exact: true })).toBeVisible()
  const closeCurrentTab = page.getByRole('button', { name: 'Close current tab', exact: true })
  await expect(closeCurrentTab).toBeVisible()
  await expect(page.locator('[role="tablist"] .wui-ant-tabs-tab-remove')).toHaveCount(0)
  await expect(page.locator('[role="tablist"] button[aria-label]')).toHaveCount(0)
  await closeCurrentTab.click()
  await expect(page).toHaveURL(/#\/$/)
  await expect(page.getByRole('tab', { name: 'Users', exact: true })).toHaveCount(0)
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
