import { readFile } from 'node:fs/promises'
import { expect, test, type Page, type Route } from '@playwright/test'

const endpoint = '**/api/ai/tavily-search'
const sessionToken = 'a'.repeat(43)
const firstQuery = 'Find accessible React dashboard patterns'

function responseFor(query: string) {
  return {
    query,
    answer: `A controlled, source-backed answer for: ${query}`,
    results: [
      {
        title: 'Accessible dashboard reference',
        url: 'https://docs.example.test/dashboard',
        content: 'Use clear labels, visible focus, and readable data tables.',
        score: 0.94,
        publishedDate: '2026-11-01',
        rawContent: '# Accessible dashboard\nA controlled full-text source.',
      },
    ],
    images: [{ url: 'https://assets.example.test/evidence.svg', description: 'Dashboard interaction diagram' }],
    responseTime: 1.25,
    requestId: 'controlled-tavily-request',
    usage: { credits: 2 },
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

async function success(route: Route) {
  if (route.request().method() === 'OPTIONS') {
    await route.fulfill({ status: 204, headers: corsHeaders })
    return
  }
  const { query } = route.request().postDataJSON() as { query: string }
  await route.fulfill({ headers: corsHeaders, json: responseFor(query) })
}

async function openPlayground(page: Page) {
  await page.goto('/#/ai-workbench')
  await expect(page.getByRole('heading', { name: 'Tavily Playground', exact: true })).toBeVisible()
}

async function runQuery(page: Page, query: string) {
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(query)
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  await expect(page.getByText(responseFor(query).answer, { exact: true })).toBeVisible()
}

async function choose(page: Page, label: string, value: string) {
  await page.getByRole('combobox', { name: label, exact: true }).click()
  await page.getByText(value, { exact: true }).last().click()
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((token) => {
    // Demo permissions and the search transport deliberately exercise separate credentials.
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    if (!localStorage.getItem('i18nextLng')) localStorage.setItem('i18nextLng', 'en')
    localStorage.setItem(
      'enterprise_session',
      JSON.stringify({
        token,
        tenantId: 'alpha',
        expiresAt: Date.now() + 3_600_000,
        user: { id: 'playground-admin', name: 'Playground Admin', email: 'admin@test.com' },
      })
    )
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          document.documentElement.dataset.copiedTavilyResponse = value
        },
      },
    })
  }, sessionToken)
  await page.route('https://api.tavily.com/**', (route) => route.abort('blockedbyclient'))
  await page.route('**/api/auth/**', (route) => route.abort('blockedbyclient'))
  await page.route('**/api/ai/**', (route) => route.abort('blockedbyclient'))
  // Never let an unhandled test consume a real search request.
  await page.route(endpoint, (route) => route.abort('blockedbyclient'))
  await page.route('https://assets.example.test/**', (route) =>
    route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90"><rect width="160" height="90" fill="#e5e7eb"/></svg>',
    })
  )
})

test('configured search exposes answers, sources, images, JSON, request code, and a downloadable response', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  const requests: Record<string, unknown>[] = []
  await page.route(endpoint, async (route) => {
    if (route.request().method() === 'POST') {
      requests.push(route.request().postDataJSON() as Record<string, unknown>)
      expect(route.request().headers()).toMatchObject({
        accept: 'application/json',
        authorization: `Bearer ${sessionToken}`,
        'x-tenant-id': 'alpha',
      })
    }
    await success(route)
  })
  await openPlayground(page)
  await choose(page, 'Search depth', 'Advanced')
  await choose(page, 'Topic', 'News')
  await choose(page, 'Time range', 'Past week')
  await choose(page, 'Answer', 'Advanced answer')
  await page.getByRole('button', { name: 'Advanced parameters', exact: true }).click()
  await choose(page, 'Raw content', 'Markdown')
  await page.getByRole('spinbutton', { name: 'Maximum results', exact: true }).fill('3')
  await page.getByRole('combobox', { name: 'Include domains', exact: true }).fill('docs.example.test')
  await page.getByRole('combobox', { name: 'Include domains', exact: true }).press('Enter')
  await page.getByRole('combobox', { name: 'Exclude domains', exact: true }).fill('spam.example.test')
  await page.getByRole('combobox', { name: 'Exclude domains', exact: true }).press('Enter')
  await page.getByRole('switch', { name: 'Include images', exact: true }).click()
  await runQuery(page, firstQuery)
  await page.getByRole('heading', { name: 'Search results', exact: true }).scrollIntoViewIfNeeded()
  await page.screenshot({ path: testInfo.outputPath('tavily-desktop-answer.png'), animations: 'disabled' })
  expect(requests).toEqual([
    {
      query: firstQuery,
      search_depth: 'advanced',
      topic: 'news',
      max_results: 3,
      time_range: 'week',
      include_answer: 'advanced',
      include_raw_content: 'markdown',
      include_images: true,
      include_domains: ['docs.example.test'],
      exclude_domains: ['spam.example.test'],
      include_usage: true,
    },
  ])
  await page.getByRole('tab', { name: 'Sources', exact: true }).click()
  await expect(page.getByRole('link', { name: 'Accessible dashboard reference', exact: true })).toHaveAttribute(
    'href',
    'https://docs.example.test/dashboard'
  )
  await page.getByRole('heading', { name: 'Search results', exact: true }).scrollIntoViewIfNeeded()
  await page.screenshot({ path: testInfo.outputPath('tavily-desktop-sources.png'), animations: 'disabled' })
  await page.getByRole('tab', { name: 'Images', exact: true }).click()
  await expect(page.getByRole('img', { name: 'Dashboard interaction diagram', exact: true })).toBeVisible()
  await page.getByRole('tab', { name: 'Response JSON', exact: true }).click()
  const jsonPanel = page.getByRole('tabpanel', { name: 'Response JSON', exact: true })
  await expect(jsonPanel).toContainText('controlled-tavily-request')
  await expect(jsonPanel).toContainText('0.94')
  await page.getByRole('button', { name: 'Copy JSON', exact: true }).click()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.copiedTavilyResponse))
    .toBe(JSON.stringify(responseFor(firstQuery), null, 2))
  const downloaded = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download JSON', exact: true }).click()
  const download = await downloaded
  expect(download.suggestedFilename()).toMatch(/\.json$/)
  const downloadedPath = testInfo.outputPath('tavily-response.json')
  await download.saveAs(downloadedPath)
  expect(JSON.parse(await readFile(downloadedPath, 'utf8'))).toEqual(responseFor(firstQuery))
  await page.getByRole('tab', { name: 'Request code', exact: true }).click()
  const codePanel = page.getByRole('tabpanel', { name: 'Request code', exact: true })
  await expect(codePanel).toContainText('TAVILY_API_KEY')
  await expect(codePanel).toContainText(firstQuery)
  await expect(codePanel).not.toContainText(sessionToken)
  await choose(page, 'Code language', 'JavaScript')
  await expect(codePanel).toContainText('fetch(')
  await choose(page, 'Code language', 'Python')
  await expect(codePanel).toContainText('requests.post')
  expect(requests).toHaveLength(1)
})

test('history restores the submitted snapshot without rerunning and is not persisted across reloads', async ({
  page,
}) => {
  const requests: string[] = []
  await page.route(endpoint, async (route) => {
    if (route.request().method() === 'POST') requests.push((route.request().postDataJSON() as { query: string }).query)
    await success(route)
  })
  await openPlayground(page)
  await runQuery(page, firstQuery)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill('A draft that has not run')
  await expect(page.getByText(responseFor(firstQuery).answer, { exact: true })).toBeVisible()
  const nextQuery = 'Compare accessible dashboard navigation'
  await runQuery(page, nextQuery)
  await page.getByRole('button', { name: `Restore search: ${firstQuery}`, exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue(firstQuery)
  await expect(page.getByText(responseFor(firstQuery).answer, { exact: true })).toBeVisible()
  expect(requests).toEqual([firstQuery, nextQuery])
  expect(await page.evaluate(() => JSON.stringify(Object.entries(localStorage)))).not.toContain(firstQuery)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Tavily Playground', exact: true })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue('')
  await expect(page.getByRole('button', { name: `Restore search: ${firstQuery}`, exact: true })).toHaveCount(0)
  expect(requests).toHaveLength(2)
})

test('a provider failure preserves parameters and supports an explicit retry', async ({ page }) => {
  let attempts = 0
  await page.route(endpoint, async (route) => {
    if (route.request().method() === 'OPTIONS') return success(route)
    attempts += 1
    if (attempts === 1)
      await route.fulfill({ status: 429, headers: corsHeaders, json: { error: 'tavily_rate_limited' } })
    else await success(route)
  })
  await openPlayground(page)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(firstQuery)
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Retry search', exact: true })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue(firstQuery)
  await expect(page.getByText(responseFor(firstQuery).answer, { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Retry search', exact: true }).click()
  await expect(page.getByText(responseFor(firstQuery).answer, { exact: true })).toBeVisible()
  expect(attempts).toBe(2)
})

test('cancelling an in-flight search retains the draft and discards a late response', async ({ page }) => {
  let release!: () => void
  let finished!: () => void
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })
  const handled = new Promise<void>((resolve) => {
    finished = resolve
  })
  let attempts = 0
  await page.route(endpoint, async (route) => {
    if (route.request().method() === 'OPTIONS') return success(route)
    attempts += 1
    await gate
    await success(route).catch(() => {})
    finished()
  })
  await openPlayground(page)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(firstQuery)
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  try {
    await expect.poll(() => attempts).toBe(1)
    await page.getByRole('button', { name: 'Cancel search', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
    await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue(firstQuery)
  } finally {
    release()
  }
  await handled
  await expect(page.getByText(responseFor(firstQuery).answer, { exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: `Restore search: ${firstQuery}`, exact: true })).toHaveCount(0)
})

test('changing tenant clears the prior result and history and cancels an outstanding search', async ({ page }) => {
  let release!: () => void
  let finished!: () => void
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })
  const handled = new Promise<void>((resolve) => {
    finished = resolve
  })
  const pendingQuery = 'An outstanding query from the previous tenant'
  let pending = false
  await page.route(endpoint, async (route) => {
    if (route.request().method() === 'OPTIONS') return success(route)
    const { query } = route.request().postDataJSON() as { query: string }
    if (query !== pendingQuery) return success(route)
    pending = true
    await gate
    await success(route).catch(() => {})
    finished()
  })
  await openPlayground(page)
  await runQuery(page, firstQuery)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(pendingQuery)
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  try {
    await expect.poll(() => pending).toBe(true)
    await page.evaluate(() => {
      localStorage.setItem(
        'enterprise_session',
        JSON.stringify({
          token: 'b'.repeat(43),
          tenantId: 'beta',
          expiresAt: Date.now() + 3_600_000,
          user: { id: 'another-admin', name: 'Another Admin', email: 'another@example.test' },
        })
      )
      window.dispatchEvent(new Event('pro-react-admin:session-changed'))
    })
    await expect(page.getByRole('heading', { name: 'Tavily Playground', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: `Restore search: ${firstQuery}`, exact: true })).toHaveCount(0)
    await expect(page.getByText(responseFor(firstQuery).answer, { exact: true })).toHaveCount(0)
  } finally {
    release()
  }
  await handled
  await expect(page.getByText(responseFor(pendingQuery).answer, { exact: true })).toHaveCount(0)
  await page.evaluate(() => {
    localStorage.removeItem('enterprise_session')
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect(page).toHaveURL(/#\/signin/)
})

test('demo visitors can edit parameters and inspect code without sending a real search', async ({ page }) => {
  let attempts = 0
  await page.route(endpoint, (route) => {
    attempts += 1
    return route.abort('blockedbyclient')
  })
  await openPlayground(page)
  await page.evaluate(() => {
    localStorage.removeItem('enterprise_session')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect(page.getByRole('heading', { name: 'Tavily Playground', exact: true })).toBeVisible()
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(firstQuery)
  await page.getByRole('tab', { name: 'Request code', exact: true }).click()
  await expect(page.getByRole('tabpanel', { name: 'Request code', exact: true })).toContainText(firstQuery)
  expect(attempts).toBe(0)
})

test('an invalid collapsed advanced field is revealed and focused without sending a search', async ({ page }) => {
  let attempts = 0
  await page.route(endpoint, (route) => {
    attempts += 1
    return route.abort('blockedbyclient')
  })
  await openPlayground(page)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(firstQuery)
  const advanced = page.getByRole('button', { name: 'Advanced parameters', exact: true })
  await advanced.click()
  const domains = page.getByRole('combobox', { name: 'Include domains', exact: true })
  await domains.fill('https://invalid.example.test/path')
  await domains.press('Enter')
  await advanced.click()
  await expect(advanced).toHaveAttribute('aria-expanded', 'false')
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  await expect(
    page.getByRole('alert').filter({
      hasText: 'Use up to 20 valid domains. The same domain cannot appear in both lists.',
    })
  ).toBeVisible()
  await expect(advanced).toHaveAttribute('aria-expanded', 'true')
  await expect(domains).toBeFocused()
  expect(attempts).toBe(0)
})

test('mobile dark playground stays within the viewport and preserves the chat workspace', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    localStorage.setItem('pro-react-admin:default:theme', JSON.stringify({ themeMode: 'dark' }))
  })
  await page.route(endpoint, success)
  await openPlayground(page)
  await runQuery(page, firstQuery)
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.getByRole('tab', { name: 'Request code', exact: true }).click()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.getByRole('heading', { name: 'Tavily Playground', exact: true }).scrollIntoViewIfNeeded()
  await page.mouse.move(385, 820)
  await page.screenshot({ path: testInfo.outputPath('tavily-mobile-dark.png') })
  await page.getByRole('tab', { name: 'Chat & prompt tools', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Chat & prompt tools', level: 1, exact: true })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Conversation', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeVisible()
  await page.getByRole('tab', { name: 'Tavily Playground', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue(firstQuery)
  const selectedTab = page.getByRole('tab', { name: 'Request code', exact: true })
  await expect(selectedTab).toHaveAttribute('aria-selected', 'true')
  await selectedTab.press('Home')
  // rc-tabs adds its live position announcement to the focused tab's accessible name.
  const answerTab = page.getByRole('tab', { name: /\bAnswer$/ })
  await expect(answerTab).toBeFocused()
  await answerTab.press('Enter')
  await expect(page.getByText(responseFor(firstQuery).answer, { exact: true })).toBeVisible()
})
