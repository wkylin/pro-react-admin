import { expect, test, type Page } from '@playwright/test'
import { chatApi, chatMessage, installChatPlatform } from './fixtures/chatPlatform'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    if (!localStorage.getItem('i18nextLng')) localStorage.setItem('i18nextLng', 'en')
  })
  await page.route('**/api/ai/**', (route) => route.abort('blockedbyclient'))
  await page.route('https://api.tavily.com/**', (route) => route.abort('blockedbyclient'))
  await page.route('https://api.openai.com/**', (route) => route.abort('blockedbyclient'))
  await page.routeWebSocket(/^wss:\/\//, (socket) => socket.close())
})

async function openChat(page: Page) {
  await page.goto('/#/chat')
  await expect(page.getByRole('heading', { name: 'Chat', exact: true })).toBeVisible()
}

function messageLog(page: Page) {
  return page.getByRole('log', { name: 'Messages', exact: true })
}

async function startConnection(page: Page) {
  // The header and disconnected empty states offer the same connection action.
  await page.getByRole('button', { name: 'Connect chat', exact: true }).first().click()
  const dialog = page.getByRole('dialog', { name: 'Connection settings', exact: true })
  await dialog.getByRole('textbox', { name: 'API address', exact: true }).fill(chatApi)
  await dialog.getByRole('textbox', { name: 'Username', exact: true }).fill('guest')
  await dialog.getByLabel('Password', { exact: true }).fill('guest123!')
  await dialog.getByRole('button', { name: 'Connect', exact: true }).click()
}

async function connectChat(page: Page) {
  await startConnection(page)
  await expect(page.getByRole('button', { name: 'Disconnect chat', exact: true })).toBeVisible()
  await expect(messageLog(page).getByText('Welcome to General.', { exact: true })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeEnabled()
}

test('Chat connects through REST and XMPP, loads history, and deduplicates persisted message echoes', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  const platform = await installChatPlatform(page)
  await openChat(page)
  expect(platform.requests).toEqual([])
  await connectChat(page)
  expect(platform.frames.some((frame) => frame.startsWith('<auth'))).toBe(true)
  expect(platform.joins).toContain('general@conference.chat.test/u-guest-user')
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill('A message confirmed by the server.')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(messageLog(page).getByText('A message confirmed by the server.', { exact: true })).toHaveCount(1)
  expect(platform.sent).toEqual([{ roomId: 'general', body: 'A message confirmed by the server.' }])
  await page.getByRole('button', { name: 'Refresh history', exact: true }).click()
  await expect
    .poll(() => platform.requests.filter((item) => item.path === '/api/rooms/general/messages').length)
    .toBe(2)
  await expect(messageLog(page).getByText('A message confirmed by the server.', { exact: true })).toHaveCount(1)
  await page.getByRole('button', { name: 'Room details', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Room details', exact: true })).toBeVisible()
  await expect(page.getByText('General team conversation', { exact: true })).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('chat-desktop-details.png'), animations: 'disabled' })
  await page.getByRole('button', { name: 'Close room details', exact: true }).click()
  await page.screenshot({ path: testInfo.outputPath('chat-desktop.png'), animations: 'disabled' })
  expect(platform.unexpected).toEqual([])
})

test('Chat retains room drafts and respects Enter, Shift+Enter, and composition input', async ({ page }) => {
  const platform = await installChatPlatform(page)
  await openChat(page)
  await connectChat(page)
  const composer = page.getByRole('textbox', { name: 'Message', exact: true })
  await composer.fill('General draft')
  await composer.press('Shift+Enter')
  await expect(composer).toHaveValue('General draft\n')
  expect(platform.sent).toEqual([])
  await page.getByRole('button', { name: 'Open room: Design', exact: true }).click()
  await expect(messageLog(page).getByText('The updated design notes are ready.', { exact: true })).toBeVisible()
  await expect(composer).toHaveValue('')
  await composer.fill('Design draft')
  await page.getByRole('button', { name: 'Open room: General', exact: true }).click()
  await expect(composer).toHaveValue('General draft\n')
  await composer.fill('Composition stays in the editor')
  await composer.dispatchEvent('compositionstart')
  await composer.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', isComposing: true, bubbles: true })
  expect(platform.sent).toEqual([])
  await expect(composer).toHaveValue('Composition stays in the editor')
  await composer.dispatchEvent('compositionend')
  await composer.press('Enter')
  await expect(messageLog(page).getByText('Composition stays in the editor', { exact: true })).toHaveCount(1)
  await expect(composer).toHaveValue('')
  await page.getByRole('button', { name: 'Open room: Design', exact: true }).click()
  await expect(composer).toHaveValue('Design draft')
  expect(platform.sent).toEqual([{ roomId: 'general', body: 'Composition stays in the editor' }])
})

test('Chat ignores late history from a room that is no longer selected', async ({ page }) => {
  const platform = await installChatPlatform(page)
  await openChat(page)
  await connectChat(page)
  const release = platform.holdHistory('general')
  try {
    await page.getByRole('button', { name: 'Refresh history', exact: true }).click()
    await expect
      .poll(() => platform.requests.filter((item) => item.path === '/api/rooms/general/messages').length)
      .toBe(2)
    await page.getByRole('button', { name: 'Open room: Design', exact: true }).click()
    await expect(messageLog(page).getByText('The updated design notes are ready.', { exact: true })).toBeVisible()
    release()
    await expect(page.getByRole('heading', { name: 'Design', exact: true })).toBeVisible()
    await expect(messageLog(page).getByText('Welcome to General.', { exact: true })).toBeHidden()
    await expect(messageLog(page).getByText('The updated design notes are ready.', { exact: true })).toBeVisible()
  } finally {
    platform.release()
  }
})

test('Chat opens the latest messages after switching rooms during a delayed history expansion', async ({ page }) => {
  const platform = await installChatPlatform(page)
  platform.histories.set('general', [
    ...Array.from({ length: 119 }, (_, index) =>
      chatMessage(`general-${index}`, 'general', `General historical note ${index}`, index)
    ),
    chatMessage('general-welcome', 'general', 'Welcome to General.', 119),
  ])
  platform.histories.set(
    'design',
    Array.from({ length: 100 }, (_, index) =>
      chatMessage(`design-${index}`, 'design', `Design historical note ${index}`, index)
    )
  )
  await openChat(page)
  await connectChat(page)
  const log = messageLog(page)
  await log.evaluate((element) => {
    if (!element.parentElement) throw new Error('The message log needs a scrolling container')
    element.parentElement.scrollTop = 0
  })
  await expect(page.getByRole('button', { name: 'Jump to latest', exact: true })).toBeVisible()
  const release = platform.holdHistory('general')
  try {
    await page.getByRole('button', { name: 'Load more history', exact: true }).click()
    await expect
      .poll(() => platform.requests.filter((item) => item.path === '/api/rooms/general/messages').length)
      .toBe(2)
    await page.getByRole('button', { name: 'Open room: Design', exact: true }).click()
    await expect(log.getByText('Design historical note 99', { exact: true })).toBeInViewport()
    await expect(page.getByRole('button', { name: 'Jump to latest', exact: true })).toBeHidden()
    release()
    await expect.poll(() => platform.settledHistories.filter((roomId) => roomId === 'general').length).toBe(2)
    await expect(page.getByRole('heading', { name: 'Design', exact: true })).toBeVisible()
    await expect(log.getByText('Design historical note 99', { exact: true })).toBeInViewport()
    await expect(log.getByText('Welcome to General.', { exact: true })).toHaveCount(0)
    await expect
      .poll(() =>
        log.evaluate((element) => {
          const scroller = element.parentElement
          if (!scroller) throw new Error('The message log needs a scrolling container')
          return scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight
        })
      )
      .toBeLessThanOrEqual(1)
  } finally {
    platform.release()
  }
  expect(platform.unexpected).toEqual([])
})

test('Chat reconnects after a clean socket close, rejoins the room, and retrieves missed history', async ({ page }) => {
  const platform = await installChatPlatform(page)
  await openChat(page)
  await connectChat(page)
  const composer = page.getByRole('textbox', { name: 'Message', exact: true })
  const send = page.getByRole('button', { name: 'Send message', exact: true })
  await composer.fill('Keep this draft through reconnect')
  await expect(send).toBeEnabled()
  platform.histories.set('general', [
    ...(platform.histories.get('general') ?? []),
    chatMessage('missed-message', 'general', 'A message missed while disconnected.', 2),
  ])
  await platform.closeSocket()
  await expect(page.getByRole('status').filter({ hasText: /^Connecting…$/ })).toBeVisible()
  await expect(send).toBeDisabled()
  await expect.poll(() => platform.sockets.length).toBe(2)
  await expect.poll(() => platform.joins.filter((jid) => jid.startsWith('general@')).length).toBe(2)
  await expect(messageLog(page).getByText('A message missed while disconnected.', { exact: true })).toHaveCount(1)
  await expect(messageLog(page).getByText('Welcome to General.', { exact: true })).toHaveCount(1)
  await expect(composer).toHaveValue('Keep this draft through reconnect')
  await expect(send).toBeEnabled()
  expect(platform.requests.filter((item) => item.path === '/api/rooms/general/messages')).toHaveLength(2)
  expect(platform.requests.filter((item) => item.path === '/api/auth/login')).toHaveLength(1)
  expect(platform.sent).toEqual([])
  expect(platform.unexpected).toEqual([])
})

test('Chat loads a larger bounded history and keeps removed or encrypted content private', async ({ page }) => {
  const platform = await installChatPlatform(page)
  const encrypted = JSON.stringify({
    version: 1,
    algorithm: 'AES-GCM-256',
    iv: 'AAAAAAAAAAAAAAAA',
    ciphertext: 'AAAAAAAAAAAAAAAAAAAAAA',
  })
  platform.histories.set('general', [
    ...Array.from({ length: 90 }, (_, index) =>
      chatMessage(`old-${index}`, 'general', `Historical note ${index}`, index)
    ),
    { ...chatMessage('removed', 'general', 'Moderated text must never be displayed.', 91), status: 'removed' },
    chatMessage('encrypted', 'general', encrypted, 92),
    chatMessage('welcome', 'general', 'Welcome to General.', 93),
  ])
  await openChat(page)
  await connectChat(page)
  await expect(messageLog(page).getByText('Historical note 0', { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Load more history', exact: true }).click()
  await expect(messageLog(page).getByText('Historical note 0', { exact: true })).toHaveCount(1)
  await expect(messageLog(page).getByText('Moderated text must never be displayed.', { exact: true })).toHaveCount(0)
  await expect(messageLog(page).getByText(encrypted, { exact: true })).toHaveCount(0)
  await expect(messageLog(page).getByText(/message (was )?removed/i)).toBeVisible()
  await expect(messageLog(page).getByText(/encrypted message/i)).toBeVisible()
  const historyLimits = platform.requests
    .filter((item) => item.path === '/api/rooms/general/messages')
    .map((item) => Number(new URLSearchParams(item.query).get('limit')))
  expect(historyLimits[0]).toBe(80)
  expect(historyLimits[1]).toBeGreaterThan(80)
  expect(historyLimits[1]).toBeLessThanOrEqual(200)
})

test('Chat cancels connection attempts and explicitly disconnects the active backend session', async ({ page }) => {
  const platform = await installChatPlatform(page)
  await openChat(page)
  const release = platform.holdSession()
  try {
    await startConnection(page)
    await expect
      .poll(() => platform.requests.filter((item) => item.path === '/api/im/session' && item.method === 'POST').length)
      .toBe(1)
    await page.getByRole('button', { name: 'Cancel connection', exact: true }).click()
    release()
    await expect(page.getByRole('button', { name: 'Connect chat', exact: true }).first()).toBeVisible()
    expect(platform.sockets).toEqual([])
    await connectChat(page)
    await page.getByRole('button', { name: 'Disconnect chat', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Connect chat', exact: true }).first()).toBeVisible()
    await expect
      .poll(
        () => platform.requests.filter((item) => item.path === '/api/im/session' && item.method === 'DELETE').length
      )
      .toBeGreaterThanOrEqual(1)
    await expect(messageLog(page).getByText('Welcome to General.', { exact: true })).toBeHidden()
  } finally {
    platform.release()
  }
  expect(platform.unexpected).toEqual([])
})

test('Chat clears messages and credentials when the application account scope changes', async ({ page }) => {
  const platform = await installChatPlatform(page)
  await openChat(page)
  await connectChat(page)
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill('Private unsent draft')
  await page.evaluate(() => {
    localStorage.setItem(
      'enterprise_session',
      JSON.stringify({
        token: 'b'.repeat(43),
        tenantId: 'new-team',
        expiresAt: Date.now() + 3_600_000,
        user: { id: 'another-admin', name: 'Another admin', email: 'admin@test.com' },
      })
    )
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect(page.getByRole('button', { name: 'Connect chat', exact: true }).first()).toBeVisible()
  await expect(messageLog(page).getByText('Welcome to General.', { exact: true })).toBeHidden()
  await expect(page.getByText('Private unsent draft', { exact: true })).toHaveCount(0)
  await expect
    .poll(() => platform.requests.filter((item) => item.path === '/api/im/session' && item.method === 'DELETE').length)
    .toBe(1)
  expect(
    await page.evaluate(() =>
      Object.entries(localStorage).filter(([key, value]) =>
        /chat-access-token|controlled-xmpp-credential|Private unsent draft/.test(`${key}:${value}`)
      )
    )
  ).toEqual([])
})

test('Chat filters rooms without losing the selected conversation or draft', async ({ page }) => {
  const platform = await installChatPlatform(page)
  await openChat(page)
  await connectChat(page)
  const composer = page.getByRole('textbox', { name: 'Message', exact: true })
  await composer.fill('Keep my draft')
  await page.getByRole('textbox', { name: 'Search rooms', exact: true }).fill('Design')
  await expect(page.getByRole('button', { name: 'Open room: Design', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Open room: General', exact: true })).toBeHidden()
  await expect(composer).toHaveValue('Keep my draft')
  await expect(messageLog(page).getByText('Welcome to General.', { exact: true })).toBeVisible()
  await page.getByRole('textbox', { name: 'Search rooms', exact: true }).fill('')
  await expect(page.getByRole('button', { name: 'Open room: General', exact: true })).toBeVisible()
  expect(platform.sent).toEqual([])
})

test('Chat mobile conversation and room list remain usable in light and dark themes', async ({ page }, testInfo) => {
  const platform = await installChatPlatform(page)
  await openChat(page)
  await connectChat(page)
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('textbox', { name: 'Search rooms', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Open room: General', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Back to rooms', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Search rooms', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Open room: Design', exact: true }).click()
  await expect(messageLog(page).getByText('The updated design notes are ready.', { exact: true })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  await page.screenshot({ path: testInfo.outputPath('chat-mobile-light.png'), animations: 'disabled' })
  await page.getByRole('button', { name: 'Dark mode', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  await page.screenshot({ path: testInfo.outputPath('chat-mobile-dark.png'), animations: 'disabled' })
  await page.getByRole('button', { name: 'Back to rooms', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Open room: General', exact: true })).toBeVisible()
  expect(platform.unexpected).toEqual([])
})
