import { expect, test, type Page } from '@playwright/test'

const workspaceRoute = '/#/ai-workbench?view=workspace'
const storagePrefix = 'pro-react-admin:ai-workbench:workspace:v3:'
const appliedRole = 'A careful launch partner for the private workspace'
const appliedObjective = 'Prepare a release checklist for our dashboard update.'
const revisedObjective = 'An editor revision that has not been applied to the conversation.'
const unsentDraft = 'Keep this unsent conversation draft while I prepare a prompt.'
const deniedRequests = new WeakMap<Page, string[]>()

async function openWorkspace(page: Page) {
  await page.goto(workspaceRoute)
  await expect(page.getByRole('heading', { name: 'Chat & prompt tools', level: 1, exact: true })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Chat & prompt tools', exact: true })).toHaveAttribute(
    'aria-selected',
    'true'
  )
}

async function openEditor(page: Page) {
  await page.getByRole('tab', { name: 'Prompt studio', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Role', exact: true })).toBeVisible()
}

async function preparePrompt(page: Page) {
  await openEditor(page)
  await page.getByRole('button', { name: 'Blank prompt', exact: true }).click()
  await page.getByRole('textbox', { name: 'Role', exact: true }).fill(appliedRole)
  await page.getByRole('textbox', { name: 'Objective', exact: true }).fill(appliedObjective)
}

async function applyPrompt(page: Page) {
  await page.getByRole('button', { name: 'Apply to conversation', exact: true }).click()
  await expect(page.getByRole('tab', { name: 'Conversation', exact: true })).toHaveAttribute('aria-selected', 'true')
}

async function openDebug(page: Page) {
  await page.getByRole('button', { name: 'Debug tools', exact: true }).click()
  const drawer = page.getByRole('dialog', { name: 'Debug tools', exact: true })
  await expect(drawer).toBeVisible()
  return drawer
}

async function workspaceStorage(page: Page) {
  return page.evaluate(
    (prefix) => Object.entries(localStorage).filter(([key]) => key.startsWith(prefix)),
    storagePrefix
  )
}

test.beforeEach(async ({ page }) => {
  const blocked: string[] = []
  deniedRequests.set(page, blocked)
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          document.documentElement.dataset.copiedAiPrompt = value
        },
      },
    })
  })
  for (const pattern of [
    '**/api/auth/**',
    '**/api/ai/**',
    'https://api.tavily.com/**',
    'https://api.openai.com/**',
    'https://api.anthropic.com/**',
  ]) {
    await page.route(pattern, (route) => {
      blocked.push(`${route.request().method()} ${route.request().url()}`)
      return route.abort('blockedbyclient')
    })
  }
})

test.afterEach(async ({ page }) => {
  expect(deniedRequests.get(page), 'The local workspace must not call authentication or external AI services.').toEqual(
    []
  )
})

test('daily conversation starts without debug controls and keeps its draft across the playground tab', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openWorkspace(page)
  await expect(page.getByRole('tab', { name: 'Conversation', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tab', { name: 'Prompt studio', exact: true })).toBeVisible()
  await expect(page.getByText('No prompt applied', { exact: true })).toBeVisible()
  await expect(page.getByRole('dialog', { name: 'Debug tools', exact: true })).toHaveCount(0)
  await expect(page.getByRole('switch', { name: 'Save prompts on this device', exact: true })).toHaveCount(0)
  const message = page.getByRole('textbox', { name: 'Message', exact: true })
  await message.fill(unsentDraft)
  await page.screenshot({ path: testInfo.outputPath('ai-tools-desktop-conversation.png'), animations: 'disabled' })
  await page.getByRole('button', { name: 'Open Tavily Playground', exact: true }).click()
  await expect(page.getByRole('tab', { name: 'Tavily Playground', exact: true })).toHaveAttribute(
    'aria-selected',
    'true'
  )
  await page.getByRole('tab', { name: 'Chat & prompt tools', exact: true }).click()
  await expect(message).toHaveValue(unsentDraft)
  expect(await workspaceStorage(page)).toEqual([])
})

test('prompt templates, optional details, copy, and blank prompt are available in their own section', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openWorkspace(page)
  await openEditor(page)
  for (const name of ['Clarify requirements', 'Plan a release', 'Review an incident']) {
    await expect(page.getByRole('button', { name, exact: false })).toBeVisible()
  }
  await page.getByRole('button', { name: 'Plan a release', exact: false }).click()
  await expect(page.getByRole('textbox', { name: 'Role', exact: true })).toHaveValue(
    'A careful release planning partner'
  )
  await page.getByRole('heading', { name: 'Chat & prompt tools', level: 1, exact: true }).scrollIntoViewIfNeeded()
  await page.screenshot({ path: testInfo.outputPath('ai-tools-desktop-prompt.png'), animations: 'disabled' })
  const extra = page.getByRole('button', { name: 'Additional details (optional)', exact: true })
  await expect(extra).toHaveAttribute('aria-expanded', 'false')
  await extra.click()
  for (const name of ['Audience', 'Examples', 'Evaluation']) {
    await expect(page.getByRole('textbox', { name, exact: true })).toBeVisible()
  }
  await page.getByRole('button', { name: 'Copy', exact: true }).click()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.copiedAiPrompt))
    .toContain('A careful release planning partner')
  await page.getByRole('button', { name: 'Blank prompt', exact: true }).click()
  for (const name of [
    'Role',
    'Objective',
    'Audience',
    'Context',
    'Constraints',
    'Output format',
    'Examples',
    'Evaluation',
  ]) {
    await expect(page.getByRole('textbox', { name, exact: true })).toHaveValue('')
  }
  await expect(page.getByRole('button', { name: 'Apply to conversation', exact: true })).toBeDisabled()
  expect(await workspaceStorage(page)).toEqual([])
})

test('applying a prompt preserves the conversation draft and subsequent edits do not change the applied snapshot', async ({
  page,
}) => {
  await openWorkspace(page)
  const message = page.getByRole('textbox', { name: 'Message', exact: true })
  await message.fill(unsentDraft)
  await preparePrompt(page)
  await applyPrompt(page)
  await expect(message).toHaveValue(unsentDraft)
  await page.getByRole('button', { name: 'Edit prompt', exact: true }).click()
  await page.getByRole('textbox', { name: 'Objective', exact: true }).fill(revisedObjective)
  await page.getByRole('tab', { name: 'Conversation', exact: true }).click()
  await expect(message).toHaveValue(unsentDraft)
  await page.getByRole('button', { name: 'View prompt', exact: true }).click()
  const prompt = page.getByRole('dialog', { name: 'Applied prompt', exact: true })
  await expect(prompt).toContainText(appliedRole)
  await expect(prompt).toContainText(appliedObjective)
  await expect(prompt).not.toContainText(revisedObjective)
  await prompt.getByRole('button', { name: 'Close', exact: true }).click()
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByRole('log')).toContainText(appliedObjective)
  await expect(page.getByRole('button', { name: 'Stop', exact: true })).toHaveCount(0)
  await expect(page.getByRole('log')).not.toContainText(revisedObjective)
  await message.fill(unsentDraft)
  await page.getByRole('button', { name: 'Remove prompt', exact: true }).click()
  await expect(page.getByText('No prompt applied', { exact: true })).toBeVisible()
  await openEditor(page)
  await expect(page.getByRole('textbox', { name: 'Objective', exact: true })).toHaveValue(revisedObjective)
  await page.getByRole('tab', { name: 'Conversation', exact: true }).click()
  await expect(page.getByText('No prompt applied', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'View prompt', exact: true })).toHaveCount(0)
  await expect(message).toHaveValue(unsentDraft)
})

test('the conversation streams a local answer, exposes safe events in the debug drawer, and can clear messages', async ({
  page,
}) => {
  await openWorkspace(page)
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill('Describe the local demo workflow.')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  const log = page.getByRole('log')
  await expect(log).toContainText('No AI model or web search was called.')
  await expect(page.getByRole('button', { name: 'Stop', exact: true })).toHaveCount(0)
  const drawer = await openDebug(page)
  await expect(drawer.getByRole('tab', { name: 'Demo settings', exact: true })).toHaveAttribute('aria-selected', 'true')
  await expect(drawer.getByRole('switch', { name: 'Save prompts on this device', exact: true })).not.toBeChecked()
  await drawer.getByRole('tab', { name: 'Stream events', exact: true }).click()
  await expect(drawer.getByText('start', { exact: true })).toBeVisible()
  await expect(drawer.getByText('done', { exact: true })).toBeVisible()
  await drawer.getByRole('button', { name: 'Close', exact: true }).click()
  await page.getByRole('button', { name: 'Clear messages', exact: true }).click()
  await expect(log).not.toContainText('Describe the local demo workflow.')
  expect(await workspaceStorage(page)).toEqual([])
})

test('stopping a local stream records an abort event and leaves the conversation ready for another message', async ({
  page,
}) => {
  await openWorkspace(page)
  await page
    .getByRole('textbox', { name: 'Message', exact: true })
    .fill('A local preview that I will stop before completion.')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page.getByRole('button', { name: 'Stop', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible()
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill('A fresh draft after stopping.')
  const drawer = await openDebug(page)
  await drawer.getByRole('tab', { name: 'Stream events', exact: true }).click()
  await expect(drawer.getByText('abort', { exact: true })).toBeVisible()
  await drawer.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue('A fresh draft after stopping.')
})

test('saving prompts is opt-in, restores only the account-scoped prompt workspace, and disabling it deletes the cache', async ({
  page,
}) => {
  await openWorkspace(page)
  await preparePrompt(page)
  await applyPrompt(page)
  expect(await workspaceStorage(page)).toEqual([])
  let drawer = await openDebug(page)
  await drawer.getByRole('switch', { name: 'Save prompts on this device', exact: true }).click()
  await expect.poll(async () => (await workspaceStorage(page)).length).toBe(1)
  const saved = await workspaceStorage(page)
  expect(saved[0]?.[0]).toContain('admin@test.com')
  expect(saved[0]?.[1]).toContain(appliedRole)
  expect(saved[0]?.[1]).not.toContain('streamEvents')
  await drawer.getByRole('button', { name: 'Close', exact: true }).click()
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill('This unsent message is never persisted.')
  await page.reload()
  await expect(page.getByRole('button', { name: 'View prompt', exact: true })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue('')
  await page.getByRole('button', { name: 'Edit prompt', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Role', exact: true })).toHaveValue(appliedRole)
  drawer = await openDebug(page)
  await expect(drawer.getByRole('switch', { name: 'Save prompts on this device', exact: true })).toBeChecked()
  await drawer.getByRole('switch', { name: 'Save prompts on this device', exact: true }).click()
  await expect.poll(() => workspaceStorage(page)).toEqual([])
  await drawer.getByRole('button', { name: 'Close', exact: true }).click()
  await page.reload()
  await expect(page.getByText('No prompt applied', { exact: true })).toBeVisible()
  await openEditor(page)
  await expect(page.getByRole('textbox', { name: 'Role', exact: true })).not.toHaveValue(appliedRole)
})

test('changing the application account clears private prompts and the conversation draft from the active view', async ({
  page,
}) => {
  await openWorkspace(page)
  await preparePrompt(page)
  await applyPrompt(page)
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill(unsentDraft)
  await page.evaluate(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'manager@test.com' }))
    localStorage.setItem('user_role', 'admin')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect(page.getByText('No prompt applied', { exact: true })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue('')
  await openEditor(page)
  await expect(page.getByRole('textbox', { name: 'Role', exact: true })).not.toHaveValue(appliedRole)
  await expect(page.getByRole('textbox', { name: 'Objective', exact: true })).not.toHaveValue(appliedObjective)
})

for (const theme of ['light', 'dark']) {
  test(`the ${theme} mobile conversation and prompt editor remain within the viewport with usable debug tools`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.addInitScript((themeMode) => {
      localStorage.setItem('pro-react-admin:default:theme', JSON.stringify({ themeMode }))
    }, theme)
    await openWorkspace(page)
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    const message = page.getByRole('textbox', { name: 'Message', exact: true })
    await message.scrollIntoViewIfNeeded()
    await expect(message).toBeInViewport()
    await message.fill(unsentDraft)
    if (theme === 'dark')
      await page.screenshot({
        path: testInfo.outputPath('ai-tools-mobile-dark-conversation.png'),
        animations: 'disabled',
      })
    await preparePrompt(page)
    await page.getByRole('button', { name: 'Additional details (optional)', exact: true }).click()
    await page
      .getByRole('textbox', { name: 'Evaluation', exact: true })
      .fill('Readable results with a verifiable next step.')
    const apply = page.getByRole('button', { name: 'Apply to conversation', exact: true })
    await apply.scrollIntoViewIfNeeded()
    await expect(apply).toBeInViewport()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (theme === 'dark')
      await page.screenshot({ path: testInfo.outputPath('ai-tools-mobile-dark-prompt.png'), animations: 'disabled' })
    await applyPrompt(page)
    await expect(message).toHaveValue(unsentDraft)
    const drawer = await openDebug(page)
    await expect(drawer).toBeInViewport()
    await expect(drawer.getByRole('switch', { name: 'Save prompts on this device', exact: true })).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await drawer.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(message).toHaveValue(unsentDraft)
  })
}
