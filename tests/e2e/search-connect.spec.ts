import { expect, test, type Page, type Route } from '@playwright/test'

const loginEndpoint = '**/api/auth/login'
const sessionEndpoint = '**/api/auth/session'
const searchEndpoint = '**/api/ai/tavily-search'
const demoToken = JSON.stringify({ token: 'admin@test.com' })
const demoCredentials = { tenantId: 'demo', email: 'admin@demo.local', password: 'DemoAdmin123!' }
const serviceToken = 's'.repeat(43)
const query = 'Keep my accessible dashboard search parameters'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
}

function session(attempt = 1, expiresAt = Date.now() + 3_600_000) {
  return {
    token: (attempt === 1 ? 's' : 't').repeat(43),
    tenantId: demoCredentials.tenantId,
    expiresAt,
    user: { id: 'search-user', name: 'Search User', email: demoCredentials.email },
  }
}

function responseFor(submittedQuery: string) {
  return {
    query: submittedQuery,
    answer: `Controlled connected answer: ${submittedQuery}`,
    results: [],
    images: [],
    responseTime: 0.5,
    requestId: 'controlled-connected-search',
  }
}

async function preflight(route: Route) {
  if (route.request().method() !== 'OPTIONS') return false
  await route.fulfill({ status: 204, headers: corsHeaders })
  return true
}

async function installService(page: Page, expiresAt?: (attempt: number) => number) {
  const logins: Record<string, unknown>[] = []
  const searches: { body: Record<string, unknown>; headers: Record<string, string> }[] = []
  const revocations: Record<string, string>[] = []
  await page.route(loginEndpoint, async (route) => {
    if (await preflight(route)) return
    logins.push(route.request().postDataJSON() as Record<string, unknown>)
    await route.fulfill({ headers: corsHeaders, json: session(logins.length, expiresAt?.(logins.length)) })
  })
  await page.route(searchEndpoint, async (route) => {
    if (await preflight(route)) return
    const body = route.request().postDataJSON() as Record<string, unknown>
    searches.push({ body, headers: route.request().headers() })
    await route.fulfill({ headers: corsHeaders, json: responseFor(String(body.query)) })
  })
  await page.route(sessionEndpoint, async (route) => {
    if (await preflight(route)) return
    expect(route.request().method()).toBe('DELETE')
    revocations.push(route.request().headers())
    await route.fulfill({ status: 204, headers: corsHeaders })
  })
  return { logins, searches, revocations }
}

async function openPlayground(page: Page) {
  await page.goto('/#/ai-workbench')
  await expect(page.getByRole('heading', { name: 'Tavily Playground', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Connection settings', exact: true })).toHaveCount(0)
}

async function runQuery(page: Page, submittedQuery = query) {
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(submittedQuery)
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  await expect(page.getByText(responseFor(submittedQuery).answer, { exact: true })).toBeVisible()
}

async function expectHostUnaffected(page: Page) {
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBe(demoToken)
  expect(await page.evaluate(() => localStorage.getItem('enterprise_session'))).toBeNull()
  const stored = await page.evaluate(() =>
    JSON.stringify([Object.entries(localStorage), Object.entries(sessionStorage)])
  )
  for (const value of [serviceToken, session(2).token, demoCredentials.email, demoCredentials.password, query]) {
    expect(stored).not.toContain(value)
  }
  await expect(page).toHaveURL(/#\/ai-workbench/)
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  }, demoToken)
  // All authentication and AI traffic is blocked unless a test provides a controlled response.
  await page.route('**/api/auth/**', (route) => route.abort('blockedbyclient'))
  await page.route('**/api/ai/**', (route) => route.abort('blockedbyclient'))
  await page.route('https://api.tavily.com/**', (route) => route.abort('blockedbyclient'))
})

test('Run search automatically signs in with the demo account, keeps parameters, and reuses its memory-only service session', async ({
  page,
}) => {
  const service = await installService(page)
  const dialogs: string[] = []
  page.on('dialog', (dialog) => {
    dialogs.push(dialog.type())
    void dialog.dismiss()
  })
  await openPlayground(page)
  const initialStorageKeys = await page.evaluate(() => Object.keys(localStorage).sort())
  await page.getByRole('spinbutton', { name: 'Maximum results', exact: true }).fill('3')
  await runQuery(page)
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue(query)
  await expect(page.getByRole('spinbutton', { name: 'Maximum results', exact: true })).toHaveValue('3')
  expect(service.logins).toEqual([demoCredentials])
  expect(service.searches[0]?.body).toMatchObject({ query, max_results: 3 })
  expect(service.searches[0]?.headers).toMatchObject({ authorization: `Bearer ${serviceToken}`, 'x-tenant-id': 'demo' })
  await runQuery(page, 'A second query using the same automatic connection')
  expect(service.logins).toEqual([demoCredentials])
  expect(service.searches).toHaveLength(2)
  expect(service.searches[1]?.headers.authorization).toBe(`Bearer ${serviceToken}`)
  expect(dialogs).toEqual([])
  expect(await page.evaluate(() => Object.keys(localStorage).sort())).toEqual(initialStorageKeys)
  await expectHostUnaffected(page)
  await page.reload()
  await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Disconnect search service', exact: true })).toHaveCount(0)
  await expect(page.getByText(responseFor(query).answer, { exact: true })).toHaveCount(0)
  expect(service.logins).toHaveLength(1)
})

test('an invalid query is validated before automatic sign-in or search', async ({ page }) => {
  const service = await installService(page)
  await openPlayground(page)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill('   ')
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  await expect(page.getByRole('alert').filter({ hasText: 'Enter a query between 1 and 400 characters.' })).toBeVisible()
  expect(service.logins).toEqual([])
  expect(service.searches).toEqual([])
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

for (const failure of [
  {
    name: 'disabled service',
    status: 503,
    payload: { error: 'enterprise_not_configured' },
    message: /AI service is not enabled/i,
  },
  {
    name: 'invalid demo credentials',
    status: 401,
    payload: { error: 'invalid_credentials' },
    message: /tenant, email or password is incorrect/i,
  },
  {
    name: 'second-factor challenge',
    status: 200,
    payload: { totpRequired: true },
    message: /This account requires a verification code/i,
  },
]) {
  test(`automatic connection reports a ${failure.name} inline without searching or replacing the host identity`, async ({
    page,
  }) => {
    const service = await installService(page)
    const logins: Record<string, unknown>[] = []
    await page.route(loginEndpoint, async (route) => {
      if (await preflight(route)) return
      logins.push(route.request().postDataJSON() as Record<string, unknown>)
      await route.fulfill({
        status: failure.status,
        headers: corsHeaders,
        json: { ...failure.payload, details: 'PRIVATE_UPSTREAM_DETAILS' },
      })
    })
    await openPlayground(page)
    await page.getByRole('textbox', { name: 'Query', exact: true }).fill(query)
    await page.getByRole('button', { name: 'Run search', exact: true }).click()
    await expect(page.getByRole('alert').filter({ hasText: failure.message })).toBeVisible()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page.getByText('PRIVATE_UPSTREAM_DETAILS')).toHaveCount(0)
    await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue(query)
    await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
    expect(logins).toEqual([demoCredentials])
    expect(service.searches).toEqual([])
    await expectHostUnaffected(page)
  })
}

test('cancelling automatic connection revokes a late successful login and never starts the queued search', async ({
  page,
}) => {
  const service = await installService(page)
  // Exercise late-session cleanup with a controlled transport that completes despite cancellation.
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window)
    window.fetch = (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
      return originalFetch(input, url.endsWith('/api/auth/login') ? { ...init, signal: undefined } : init)
    }
  })
  let release!: () => void
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })
  let loginStarted = false
  await page.route(loginEndpoint, async (route) => {
    if (await preflight(route)) return
    loginStarted = true
    await gate
    await route.fulfill({ headers: corsHeaders, json: session() }).catch(() => {})
  })
  await openPlayground(page)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(query)
  try {
    await page.getByRole('button', { name: 'Run search', exact: true }).click()
    await expect.poll(() => loginStarted).toBe(true)
    await expect(page.getByRole('status').filter({ hasText: 'Connecting search service…' })).toBeVisible()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await page.getByRole('button', { name: 'Cancel search', exact: true }).click()
    release()
    await expect.poll(() => service.revocations.length).toBe(1)
    expect(service.revocations[0]).toMatchObject({ authorization: `Bearer ${serviceToken}`, 'x-tenant-id': 'demo' })
    expect(service.searches).toEqual([])
    await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
    await expect(page.getByRole('textbox', { name: 'Query', exact: true })).toHaveValue(query)
    await expectHostUnaffected(page)
  } finally {
    release()
  }
})

test('disconnecting revokes the automatic session and the next search connects again', async ({ page }) => {
  const service = await installService(page)
  await openPlayground(page)
  await runQuery(page)
  await page.getByRole('button', { name: 'Disconnect search service', exact: true }).click()
  await expect.poll(() => service.revocations.length).toBe(1)
  await expect(page.getByText(responseFor(query).answer, { exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: `Restore search: ${query}`, exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
  await runQuery(page)
  expect(service.logins).toEqual([demoCredentials, demoCredentials])
  expect(service.searches).toHaveLength(2)
  expect(service.searches[1]?.headers.authorization).toBe(`Bearer ${session(2).token}`)
  await expectHostUnaffected(page)
})

test('changing the application account revokes the automatic session and clears private results', async ({ page }) => {
  const service = await installService(page)
  await openPlayground(page)
  await runQuery(page)
  await page.evaluate(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'manager@test.com' }))
    localStorage.setItem('user_role', 'admin')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect.poll(() => service.revocations.length).toBe(1)
  await expect(page.getByText(responseFor(query).answer, { exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: `Restore search: ${query}`, exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Disconnect search service', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
  expect(service.logins).toHaveLength(1)
  expect(service.searches).toHaveLength(1)
  expect(await page.evaluate(() => localStorage.getItem('enterprise_session'))).toBeNull()
})

test('an expired automatic session is cleared and the next click signs in again before searching', async ({ page }) => {
  const now = Date.now()
  await page.clock.install({ time: new Date(now) })
  const service = await installService(page, (attempt) => now + (attempt === 1 ? 60_000 : 3_600_000))
  await openPlayground(page)
  await runQuery(page)
  await page.clock.fastForward(61_000)
  await expect(page.getByText(responseFor(query).answer, { exact: true })).toHaveCount(0)
  await expect.poll(() => service.revocations.length).toBe(1)
  await expect(page.getByRole('button', { name: 'Run search', exact: true })).toBeEnabled()
  await runQuery(page)
  expect(service.logins).toEqual([demoCredentials, demoCredentials])
  expect(service.searches).toHaveLength(2)
  expect(service.searches[1]?.headers.authorization).toBe(`Bearer ${session(2).token}`)
  await expectHostUnaffected(page)
})

test('a valid host enterprise session takes priority and does not trigger automatic demo sign-in', async ({ page }) => {
  const hostSession = { ...session(), token: 'h'.repeat(43), tenantId: 'host-team' }
  await page.addInitScript((storedSession) => {
    localStorage.setItem('enterprise_session', JSON.stringify(storedSession))
  }, hostSession)
  const service = await installService(page)
  await openPlayground(page)
  await runQuery(page)
  expect(service.logins).toEqual([])
  expect(service.searches[0]?.headers).toMatchObject({
    authorization: `Bearer ${hostSession.token}`,
    'x-tenant-id': hostSession.tenantId,
  })
  expect(await page.evaluate(() => localStorage.getItem('enterprise_session'))).toBe(JSON.stringify(hostSession))
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBe(demoToken)
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('a server-revoked host token is preserved in host storage but the next click automatically reconnects for search', async ({
  page,
}) => {
  const hostSession = { ...session(), token: 'h'.repeat(43), tenantId: 'host-team' }
  await page.addInitScript((storedSession) => {
    localStorage.setItem('enterprise_session', JSON.stringify(storedSession))
  }, hostSession)
  const service = await installService(page)
  const searchHeaders: Record<string, string>[] = []
  await page.route(searchEndpoint, async (route) => {
    if (await preflight(route)) return
    searchHeaders.push(route.request().headers())
    if (searchHeaders.length === 1)
      await route.fulfill({ status: 401, headers: corsHeaders, json: { error: 'session_revoked' } })
    else await route.fulfill({ headers: corsHeaders, json: responseFor(query) })
  })
  await openPlayground(page)
  await page.getByRole('textbox', { name: 'Query', exact: true }).fill(query)
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  await expect(
    page.getByRole('alert').filter({ hasText: 'Your enterprise session is no longer valid. Sign in again.' })
  ).toBeVisible()
  await page.getByRole('button', { name: 'Run search', exact: true }).click()
  await expect(page.getByText(responseFor(query).answer, { exact: true })).toBeVisible()
  expect(searchHeaders.map((headers) => [headers.authorization, headers['x-tenant-id']])).toEqual([
    [`Bearer ${hostSession.token}`, hostSession.tenantId],
    [`Bearer ${serviceToken}`, 'demo'],
  ])
  expect(service.logins).toEqual([demoCredentials])
  expect(await page.evaluate(() => localStorage.getItem('enterprise_session'))).toBe(JSON.stringify(hostSession))
  expect(await page.evaluate(() => localStorage.getItem('token'))).toBe(demoToken)
  await expect(page.getByRole('dialog')).toHaveCount(0)
})
