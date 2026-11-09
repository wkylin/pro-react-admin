import { expect, test, type Locator, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
  await page.route('https://api.tavily.com/**', (route) => route.abort('blockedbyclient'))
  await page.route('**/api/ai/**', (route) => route.abort('blockedbyclient'))
  await page.route('**/api/auth/**', (route) => route.abort('blockedbyclient'))
})

async function wheelOverPanel(page: Page, panel: Locator, deltaY: number) {
  const bounds = await panel.boundingBox()
  expect(bounds).not.toBeNull()
  // The right padding avoids nested editors, lists, and code blocks that own wheel events.
  await page.mouse.move(bounds!.x + bounds!.width - 12, bounds!.y + Math.min(80, bounds!.height / 2))
  await page.mouse.wheel(0, deltaY)
}

async function expectScrollable(page: Page, panel: Locator) {
  const availableHeight = await page.locator('.layout-content').evaluate((element) => element.clientHeight)
  await expect.poll(() => panel.evaluate((element) => element.clientHeight)).toBeGreaterThan(200)
  await expect.poll(() => panel.evaluate((element) => element.clientHeight)).toBeLessThanOrEqual(availableHeight)
  await expect.poll(() => panel.evaluate((element) => element.scrollHeight - element.clientHeight)).toBeGreaterThan(0)
}

async function wheelToBottom(page: Page, panel: Locator) {
  // Collapse and tab layout can still settle after the first wheel event.
  // Keep using actual wheel input so scroll anchoring cannot leave the check short of the edge.
  await expect
    .poll(async () => {
      await wheelOverPanel(page, panel, 10_000)
      return panel.evaluate((element) => element.scrollHeight - element.clientHeight - element.scrollTop)
    })
    .toBeLessThanOrEqual(2)
  await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
}

async function wheelToTop(page: Page, panel: Locator) {
  await expect
    .poll(async () => {
      await wheelOverPanel(page, panel, -10_000)
      return panel.evaluate((element) => element.scrollTop)
    })
    .toBe(0)
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`playground content scrolls with the wheel and after switching tabs at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#/ai-workbench')
    const panel = page.locator('.fix-tab-panel-scroll-container').filter({
      has: page.getByRole('heading', { name: 'Tavily Playground', exact: true }),
    })
    await expectScrollable(page, panel)
    await wheelToBottom(page, panel)
    const bottomContent = panel.getByRole('heading', { name: 'Recent runs', exact: true })
    await expect(bottomContent).toBeInViewport()

    await page.getByRole('tab', { name: 'Chat & prompt tools', exact: true }).click()
    await expect(page.getByRole('tab', { name: 'Chat & prompt tools', exact: true })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    await page.getByRole('tab', { name: 'Tavily Playground', exact: true }).click()
    await expectScrollable(page, panel)
    await wheelToTop(page, panel)
    await wheelToBottom(page, panel)
    await expect(bottomContent).toBeInViewport()
  })

  test(`prompt editor content scrolls with the wheel and remains operable after switching tabs at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await page.goto('/#/ai-workbench?view=workspace')
    await expect(page.getByRole('tab', { name: 'Conversation', exact: true })).toHaveAttribute('aria-selected', 'true')
    await page.getByRole('tab', { name: 'Prompt studio', exact: true }).click()
    await page.getByRole('button', { name: 'Additional details (optional)', exact: true }).click()
    const panel = page.locator('.fix-tab-panel-scroll-container').filter({
      has: page.getByRole('heading', { name: 'Chat & prompt tools', level: 1, exact: true }),
    })
    await expectScrollable(page, panel)
    await wheelToBottom(page, panel)
    const apply = page.getByRole('button', { name: 'Apply to conversation', exact: true })
    await apply.scrollIntoViewIfNeeded()
    await expect(apply).toBeInViewport()
    await page.getByRole('tab', { name: 'Tavily Playground', exact: true }).click()
    await expect(page.getByRole('tab', { name: 'Tavily Playground', exact: true })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    await page.getByRole('tab', { name: 'Chat & prompt tools', exact: true }).click()
    await expect(page.getByRole('tab', { name: 'Chat & prompt tools', exact: true })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    await expect(page.getByRole('tab', { name: 'Prompt studio', exact: true })).toHaveAttribute('aria-selected', 'true')
    await expectScrollable(page, panel)
    await wheelToTop(page, panel)
    await wheelToBottom(page, panel)
    await apply.scrollIntoViewIfNeeded()
    await expect(apply).toBeInViewport()
  })
}

test('the prompt editor and debug drawer do not emit List deprecations', async ({ page }) => {
  const deprecatedLists: string[] = []
  page.on('console', (message) => {
    if (['warning', 'error'].includes(message.type()) && /\[antd: List\].*deprecated/.test(message.text())) {
      deprecatedLists.push(message.text())
    }
  })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/ai-workbench?view=workspace')
  await expect(page.getByRole('heading', { name: 'Chat & prompt tools', level: 1, exact: true })).toBeVisible()
  await page.getByRole('tab', { name: 'Prompt studio', exact: true }).click()
  await page.getByRole('button', { name: 'Debug tools', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Debug tools', exact: true })).toBeVisible()
  expect(deprecatedLists).toEqual([])
})
