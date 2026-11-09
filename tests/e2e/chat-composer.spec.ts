import { expect, test, type Page } from '@playwright/test'
import { chatApi, chatMessage, installChatPlatform } from './fixtures/chatPlatform'

type Platform = Awaited<ReturnType<typeof installChatPlatform>>
const platforms = new WeakMap<Page, Platform>()
const unexpected = new WeakMap<Page, string[]>()
const privateGeneral = 'A private General note that must never leave this browser session.'
const privateDesign = 'A separate private Design note.'

function publicLog(page: Page) {
  return page.getByRole('log', { name: 'Messages', exact: true })
}

function privateLog(page: Page) {
  return page.getByRole('log', { name: 'Private notes', exact: true })
}

function replyInput(page: Page) {
  return page.getByRole('textbox', { name: 'Message', exact: true })
}

function noteInput(page: Page) {
  return page.getByRole('textbox', { name: 'Private note', exact: true })
}

async function connectChat(page: Page) {
  await page.getByRole('button', { name: 'Connect chat', exact: true }).first().click()
  const dialog = page.getByRole('dialog', { name: 'Connection settings', exact: true })
  await dialog.getByRole('textbox', { name: 'API address', exact: true }).fill(chatApi)
  await dialog.getByRole('textbox', { name: 'Username', exact: true }).fill('guest')
  await dialog.getByLabel('Password', { exact: true }).fill('guest123!')
  await dialog.getByRole('button', { name: 'Connect', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Disconnect chat', exact: true })).toBeVisible()
  if ((page.viewportSize()?.width ?? 1440) < 768) {
    await page.getByRole('button', { name: 'Open room: General', exact: true }).click()
  }
  await expect(publicLog(page).getByText('Welcome to General.', { exact: true })).toBeVisible()
  await expect(replyInput(page)).toBeEnabled()
}

async function openChat(page: Page) {
  const platform = await installChatPlatform(page)
  platforms.set(page, platform)
  await page.goto('/#/chat')
  await expect(page.getByRole('heading', { name: 'Chat', exact: true })).toBeVisible()
  return platform
}

async function selectMode(page: Page, name: 'Reply' | 'Internal note') {
  // The note tab appends its current private-note count to its accessible name.
  const tab = page.getByRole('tab', { name: name === 'Internal note' ? /^Internal note\b/ : name, exact: true })
  await tab.click()
  await expect(tab).toHaveAttribute('aria-selected', 'true')
}

async function saveNote(page: Page, value: string) {
  await selectMode(page, 'Internal note')
  await noteInput(page).fill(value)
  await page.getByRole('button', { name: 'Save private note', exact: true }).click()
  await expect(privateLog(page).getByText(value, { exact: true })).toBeVisible()
}

async function expectPrivateNotStored(page: Page, values: string[]) {
  const storage = await page.evaluate(() =>
    JSON.stringify([Object.entries(localStorage), Object.entries(sessionStorage)])
  )
  for (const value of values) expect(storage).not.toContain(value)
}

test.beforeEach(async ({ page }) => {
  const blocked: string[] = []
  unexpected.set(page, blocked)
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          document.documentElement.dataset.copiedChatPrompt = text
        },
      },
    })
  })
  // The specific REST/XMPP fixture is installed later and is the only allowed chat service.
  await page.route(/^https?:\/\/[^/]+\/api\//, (route) => {
    blocked.push(route.request().url())
    return route.abort('blockedbyclient')
  })
  for (const pattern of ['https://api.tavily.com/**', 'https://api.openai.com/**', 'https://api.anthropic.com/**']) {
    await page.route(pattern, (route) => {
      blocked.push(route.request().url())
      return route.abort('blockedbyclient')
    })
  }
  await page.routeWebSocket(/^wss:\/\//, (socket) => {
    blocked.push(socket.url())
    socket.close()
  })
})

test.afterEach(async ({ page }) => {
  const platform = platforms.get(page)
  platform?.release()
  expect(platform?.unexpected ?? []).toEqual([])
  expect(unexpected.get(page)).toEqual([])
})

test('Reply and Internal note keep separate room drafts, and private notes never enter messages, wire history, or storage', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  const platform = await openChat(page)
  await connectChat(page)
  await replyInput(page).fill('A public reply draft for General')
  await selectMode(page, 'Internal note')
  await noteInput(page).fill('An unsaved private General draft')
  await selectMode(page, 'Reply')
  await expect(replyInput(page)).toHaveValue('A public reply draft for General')
  await selectMode(page, 'Internal note')
  await expect(noteInput(page)).toHaveValue('An unsaved private General draft')
  await saveNote(page, privateGeneral)
  await expect(noteInput(page)).toHaveValue('')
  await expect(privateLog(page)).toContainText('Only you')
  await page.screenshot({
    path: testInfo.outputPath('chat-composer-private-notes-desktop.png'),
    animations: 'disabled',
  })
  await noteInput(page).fill('Keep this private General draft')
  await page.getByRole('button', { name: 'Open room: Design', exact: true }).click()
  await selectMode(page, 'Internal note')
  await expect(noteInput(page)).toHaveValue('')
  await expect(privateLog(page)).not.toContainText(privateGeneral)
  await saveNote(page, privateDesign)
  await page.getByRole('button', { name: 'Open room: General', exact: true }).click()
  await selectMode(page, 'Internal note')
  await expect(noteInput(page)).toHaveValue('Keep this private General draft')
  await expect(privateLog(page)).toContainText(privateGeneral)
  await expect(privateLog(page)).not.toContainText(privateDesign)
  await privateLog(page).getByRole('button', { name: 'Delete note', exact: true }).click()
  await expect(privateLog(page)).not.toContainText(privateGeneral)
  await selectMode(page, 'Reply')
  await expect(replyInput(page)).toHaveValue('A public reply draft for General')
  await expect(publicLog(page)).not.toContainText(privateGeneral)
  expect(platform.sent).toEqual([])
  expect([...platform.histories.values()].flat().some((message) => message.body.includes('private'))).toBe(false)
  await expectPrivateNotStored(page, [privateGeneral, privateDesign, 'Keep this private General draft'])
})

test('disconnecting and changing application identity remove session-only notes and note drafts', async ({ page }) => {
  await openChat(page)
  await connectChat(page)
  await saveNote(page, privateGeneral)
  await noteInput(page).fill('An unsaved private note before disconnect')
  await page.getByRole('button', { name: 'Disconnect chat', exact: true }).click()
  await expect(page.getByText(privateGeneral, { exact: true })).toHaveCount(0)
  await connectChat(page)
  await selectMode(page, 'Internal note')
  await expect(privateLog(page)).not.toContainText(privateGeneral)
  await expect(noteInput(page)).toHaveValue('')
  await saveNote(page, privateDesign)
  await noteInput(page).fill('An unsaved private note before account switch')
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
  await expect(page.getByText(privateDesign, { exact: true })).toHaveCount(0)
  await expect(page.getByText('An unsaved private note before account switch', { exact: true })).toHaveCount(0)
  await expectPrivateNotStored(page, [privateGeneral, privateDesign, 'An unsaved private note before account switch'])
  await connectChat(page)
  await selectMode(page, 'Internal note')
  await expect(privateLog(page)).not.toContainText(privateDesign)
  await expect(noteInput(page)).toHaveValue('')
})

test('formatting uses the current text selection and emoji remains ordinary text on the groupchat wire', async ({
  page,
}) => {
  const platform = await openChat(page)
  await connectChat(page)
  await replyInput(page).fill('Launch status')
  await replyInput(page).evaluate((input: HTMLTextAreaElement) => {
    input.focus()
    input.setSelectionRange(0, 6)
  })
  await page.getByRole('button', { name: 'Format text', exact: true }).click()
  await page.getByRole('button', { name: 'Bold', exact: true }).click()
  await expect(replyInput(page)).toHaveValue('**Launch** status')
  await replyInput(page).evaluate((input: HTMLTextAreaElement) => {
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
  })
  await page.getByRole('button', { name: 'Add emoji', exact: true }).click()
  await page.getByRole('button', { name: 'Insert 😊', exact: true }).click()
  await expect(replyInput(page)).toHaveValue('**Launch** status😊')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  const sent = publicLog(page).getByRole('article').filter({ hasText: 'Launch' })
  await expect(sent.getByText('Launch', { exact: true })).toHaveJSProperty('tagName', 'STRONG')
  await expect(sent).toContainText('status😊')
  expect(platform.sent).toEqual([{ roomId: 'general', body: '**Launch** status😊' }])
})

test('Insert link rejects javascript and data URLs and inserts an ordinary safe Markdown link', async ({ page }) => {
  const platform = await openChat(page)
  await connectChat(page)
  await page.getByRole('button', { name: 'Insert link', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Insert link', exact: true })
  await dialog.getByRole('textbox', { name: 'Link text', exact: true }).fill('Project docs')
  for (const unsafe of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>']) {
    await dialog.getByRole('textbox', { name: 'URL', exact: true }).fill(unsafe)
    await dialog.getByRole('button', { name: 'Insert link', exact: true }).click()
    await expect(dialog).toBeVisible()
    await expect(replyInput(page)).toHaveValue('')
  }
  await dialog.getByRole('textbox', { name: 'URL', exact: true }).fill('https://docs.example.test/chat')
  await dialog.getByRole('button', { name: 'Insert link', exact: true }).click()
  await expect(dialog).toBeHidden()
  await expect(replyInput(page)).toHaveValue('[Project docs](https://docs.example.test/chat)')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(publicLog(page).getByRole('link', { name: 'Project docs', exact: true })).toHaveAttribute(
    'href',
    'https://docs.example.test/chat'
  )
  expect(platform.sent).toEqual([{ roomId: 'general', body: '[Project docs](https://docs.example.test/chat)' }])
})

test('received Markdown keeps unsafe URLs inert and renders image references as links without requesting images', async ({
  page,
}) => {
  const platform = await openChat(page)
  const imageRequests: string[] = []
  await page.route('https://assets.example.test/**', (route) => {
    imageRequests.push(route.request().url())
    return route.abort('blockedbyclient')
  })
  platform.histories.set('general', [
    ...(platform.histories.get('general') ?? []),
    chatMessage(
      'unsafe-content',
      'general',
      '[Unsafe script](javascript:alert(1)) [Unsafe data](data:text/html,hello) ![Reference diagram](https://assets.example.test/diagram.png) <script>window.chatInjected=true</script>',
      2
    ),
  ])
  await connectChat(page)
  const log = publicLog(page)
  await expect(log.getByRole('link', { name: 'Reference diagram', exact: true })).toHaveAttribute(
    'href',
    'https://assets.example.test/diagram.png'
  )
  await expect(log.locator('a[href^="javascript:"], a[href^="data:"], script')).toHaveCount(0)
  await expect(log.getByRole('img')).toHaveCount(0)
  expect(imageRequests).toEqual([])
  expect(await page.evaluate(() => 'chatInjected' in window)).toBe(false)
  expect(platform.sent).toEqual([])
})

test('Add attachment link sends an already uploaded file URL as text and displays its file link', async ({ page }) => {
  const platform = await openChat(page)
  await connectChat(page)
  const privateUrl = 'https://private.example.test/internal-draft.pdf'
  await saveNote(page, `Private reference: ${privateUrl}`)
  await selectMode(page, 'Reply')
  await page.getByRole('button', { name: 'Add attachment link', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Add attachment link', exact: true })
  await dialog.getByRole('textbox', { name: 'Attachment name', exact: true }).fill('Release plan')
  await dialog.getByRole('textbox', { name: 'URL', exact: true }).fill('https://files.example.test/release-plan.pdf')
  await dialog.getByRole('button', { name: 'Insert link', exact: true }).click()
  await expect(replyInput(page)).toHaveValue('[Release plan](https://files.example.test/release-plan.pdf)')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(publicLog(page).getByRole('link').filter({ hasText: 'Release plan' })).toHaveAttribute(
    'href',
    'https://files.example.test/release-plan.pdf'
  )
  expect(platform.sent).toEqual([
    { roomId: 'general', body: '[Release plan](https://files.example.test/release-plan.pdf)' },
  ])
  const requestCount = platform.requests.length
  await page.getByRole('button', { name: 'Room details', exact: true }).click()
  const details = page.getByRole('region', { name: 'Room details', exact: true })
  await details.getByRole('tab', { name: 'Shared links', exact: true }).click()
  const links = details.getByRole('tabpanel', { name: 'Shared links', exact: true })
  await expect(
    links.getByRole('link', { name: 'https://files.example.test/release-plan.pdf', exact: true })
  ).toBeVisible()
  await expect(links).not.toContainText(privateUrl)
  await links
    .getByRole('button', { name: 'Copy link: https://files.example.test/release-plan.pdf', exact: true })
    .click()
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.copiedChatPrompt))
    .toBe('https://files.example.test/release-plan.pdf')
  await details.getByRole('tab', { name: 'Activity', exact: true }).click()
  const activity = details.getByRole('tabpanel', { name: 'Activity', exact: true })
  await expect(activity).toContainText('Release plan')
  await expect(activity).not.toContainText(privateUrl)
  await expect(activity).not.toContainText('Private reference')
  expect(platform.requests).toHaveLength(requestCount)
})

test('quoted replies count the final wire text and preserve the draft and quote after a transport failure', async ({
  page,
}) => {
  const platform = await openChat(page)
  await connectChat(page)
  const original = publicLog(page).getByRole('article').filter({ hasText: 'Welcome to General.' })
  await original.getByRole('button', { name: 'Reply to message', exact: true }).click()
  const quote = page.getByRole('region', { name: 'Replying to message', exact: true })
  await expect(quote).toContainText('Welcome to General.')
  await replyInput(page).fill('x'.repeat(3990))
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeDisabled()
  await expect
    .poll(async () => {
      const text = await page.getByLabel('Message length', { exact: true }).innerText()
      return Number(text.split('/')[0].replace(/[^\d]/g, ''))
    })
    .toBeGreaterThan(4000)
  await replyInput(page).fill('Confirmed.')
  await platform.failNextMessageSend()
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(
    page.getByRole('alert').filter({ hasText: /could not be submitted|could not be sent|failed/i })
  ).toBeVisible()
  await expect(replyInput(page)).toHaveValue('Confirmed.')
  await expect(quote).toContainText('Welcome to General.')
  expect(platform.sent).toEqual([])
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(replyInput(page)).toHaveValue('')
  await expect(quote).toHaveCount(0)
  await expect(
    publicLog(page).getByRole('article').filter({ hasText: 'Confirmed.' }).locator('blockquote')
  ).toContainText('Welcome to General.')
  expect(platform.sent).toEqual([{ roomId: 'general', body: '> **Ada Lin**\n> Welcome to General.\n\nConfirmed.' }])
})

test('Writing assistant copies a local writing prompt without generating content or sending a message', async ({
  page,
}) => {
  const platform = await openChat(page)
  await connectChat(page)
  const draft = 'Could you clarify the release review steps?'
  await replyInput(page).fill(draft)
  const requestCount = platform.requests.length
  await page.getByRole('button', { name: 'Writing assistant', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Writing assistant', exact: true })
  const source = dialog.getByRole('textbox', { name: 'Writing draft', exact: true })
  await expect(source).toHaveValue(draft)
  const revised = 'Please make this independently edited release note concise and clear.'
  await source.fill(revised)
  await dialog.getByRole('button', { name: 'Copy prompt', exact: true }).click()
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.copiedChatPrompt)).toContain(revised)
  expect(await page.evaluate(() => document.documentElement.dataset.copiedChatPrompt)).not.toContain(draft)
  await dialog.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(replyInput(page)).toHaveValue(draft)
  expect(platform.sent).toEqual([])
  expect(platform.requests).toHaveLength(requestCount)
})

test('Writing assistant accepts an independent writing draft from an empty composer and derives its copyable prompt', async ({
  page,
}, testInfo) => {
  const platform = await openChat(page)
  await connectChat(page)
  await expect(replyInput(page)).toHaveValue('')
  const requestCount = platform.requests.length
  await page.getByRole('button', { name: 'Writing assistant', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Writing assistant', exact: true })
  const draft = dialog.getByRole('textbox', { name: 'Writing draft', exact: true })
  await expect(draft).toBeEditable()
  await expect(dialog.getByRole('button', { name: 'Copy prompt', exact: true })).toBeDisabled()
  const text = '请帮我把这段发布通知写得更清楚：新版控制台将在周五上线。'
  await draft.fill(text)
  const preview = dialog.getByRole('textbox', { name: 'Prompt preview', exact: true })
  await expect(preview).not.toBeEditable()
  await expect(preview).toHaveValue(new RegExp(text))
  await page.screenshot({ path: testInfo.outputPath('writing-assistant-editable-desktop.png'), animations: 'disabled' })
  const polishPrompt = await preview.inputValue()
  await dialog.getByRole('combobox', { name: 'Writing goal', exact: true }).click()
  // AntD virtualizes the accessibility option nodes; the visible option keeps its exact title.
  await page.getByTitle('Formal tone', { exact: true }).click()
  await expect(preview).not.toHaveValue(polishPrompt)
  await expect(preview).toHaveValue(/professional, formal tone/)
  await expect(preview).toHaveValue(new RegExp(text))
  const expectedPrompt = await preview.inputValue()
  await dialog.getByRole('button', { name: 'Copy prompt', exact: true }).click()
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.copiedChatPrompt)).toBe(expectedPrompt)
  expect(expectedPrompt).not.toBe(text)
  await expect(dialog.getByRole('button', { name: 'Prompt copied', exact: true })).toBeVisible()
  await draft.fill(text + ' 请保留所有事实。')
  await expect(dialog.getByRole('button', { name: 'Copy prompt', exact: true })).toBeEnabled()
  await expect(preview).toHaveValue(/请保留所有事实。/)
  const revisedPrompt = await preview.inputValue()
  await dialog.getByRole('button', { name: 'Copy prompt', exact: true }).click()
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.copiedChatPrompt)).toBe(revisedPrompt)
  await dialog.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(replyInput(page)).toHaveValue('')
  expect(platform.sent).toEqual([])
  expect(platform.requests).toHaveLength(requestCount)
})

test('moderating the quoted target cancels its preview and prevents removed text from entering the outgoing reply', async ({
  page,
}) => {
  const platform = await openChat(page)
  await connectChat(page)
  const original = publicLog(page).getByRole('article').filter({ hasText: 'Welcome to General.' })
  await original.getByRole('button', { name: 'Reply to message', exact: true }).click()
  const quote = page.getByRole('region', { name: 'Replying to message', exact: true })
  await expect(quote).toContainText('Welcome to General.')
  await replyInput(page).fill('A fresh response after moderation.')
  platform.histories.set(
    'general',
    (platform.histories.get('general') ?? []).map((message) =>
      message.id === 'general-first' ? { ...message, status: 'removed' } : message
    )
  )
  await page.getByRole('button', { name: 'Refresh history', exact: true }).click()
  await expect(publicLog(page).getByText('Message removed', { exact: true })).toBeVisible()
  await expect(quote).toHaveCount(0)
  await expect(publicLog(page)).not.toContainText('Welcome to General.')
  await expect(replyInput(page)).toHaveValue('A fresh response after moderation.')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(replyInput(page)).toHaveValue('')
  expect(platform.sent).toEqual([{ roomId: 'general', body: 'A fresh response after moderation.' }])
})

test('room pinning and the unread filter update only the current local room view', async ({ page }) => {
  const platform = await openChat(page)
  await connectChat(page)
  await page.getByRole('button', { name: 'Room options: General', exact: true }).click()
  await page.getByRole('menuitem', { name: 'Pin room', exact: true }).click()
  await page.getByRole('button', { name: 'Room options: General', exact: true }).click()
  await expect(page.getByRole('menuitem', { name: 'Unpin room', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Open room: Design', exact: true }).click()
  await expect(publicLog(page)).toContainText('The updated design notes are ready.')
  await page.getByRole('button', { name: 'Open room: General', exact: true }).click()
  platform.emit(chatMessage('design-unread', 'design', 'A new design update for this session.', 3))
  await page.getByRole('button', { name: 'Unread only', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Open room: Design', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Open room: General', exact: true })).toHaveCount(0)
  const requestCount = platform.requests.length
  await page.getByRole('button', { name: 'Room options: Design', exact: true }).click()
  await page.getByRole('menuitem', { name: 'Mark as read', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Open room: Design', exact: true })).toHaveCount(0)
  expect(platform.requests).toHaveLength(requestCount)
  expect(platform.sent).toEqual([])
})

for (const theme of ['light', 'dark']) {
  test(`the ${theme} mobile composer keeps tools operable while only messages scroll`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.addInitScript((themeMode) => {
      localStorage.setItem('pro-react-admin:default:theme', JSON.stringify({ themeMode }))
    }, theme)
    const platform = await openChat(page)
    platform.histories.set('general', [
      ...Array.from({ length: 90 }, (_, index) =>
        chatMessage(`history-${index}`, 'general', `Controlled history ${index}`, index)
      ),
      chatMessage('latest-welcome', 'general', 'Welcome to General.', 91),
    ])
    await connectChat(page)
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    await replyInput(page).fill('A mobile draft that stays in place.')
    const before = await replyInput(page).boundingBox()
    expect(before).not.toBeNull()
    const scroller = publicLog(page).locator('..')
    const bounds = await scroller.boundingBox()
    expect(bounds).not.toBeNull()
    const previousTop = await scroller.evaluate((element) => element.scrollTop)
    await page.mouse.move(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2)
    await page.mouse.wheel(0, -2000)
    await expect.poll(() => scroller.evaluate((element) => element.scrollTop)).toBeLessThan(previousTop)
    const after = await replyInput(page).boundingBox()
    expect(Math.abs(after!.y - before!.y)).toBeLessThanOrEqual(2)
    await expect(replyInput(page)).toBeInViewport()
    await page.getByRole('button', { name: 'Format text', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Bold', exact: true })).toBeInViewport()
    await page.keyboard.press('Escape')
    for (const name of ['Insert link', 'Add attachment link', 'Writing assistant']) {
      await page.getByRole('button', { name, exact: true }).click()
      const dialog = page.getByRole('dialog', { name, exact: true })
      await expect(dialog).toBeInViewport()
      if (name === 'Writing assistant') {
        const writingDraft = dialog.getByRole('textbox', { name: 'Writing draft', exact: true })
        await expect(writingDraft).toHaveValue('A mobile draft that stays in place.')
        await writingDraft.fill('这是弹窗内可以独立编辑的手机写作草稿。')
        await expect(dialog.getByRole('textbox', { name: 'Prompt preview', exact: true })).toHaveValue(/手机写作草稿/)
        await expect(dialog.getByRole('button', { name: 'Copy prompt', exact: true })).toBeInViewport()
        await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeInViewport()
        if (theme === 'dark')
          await page.screenshot({
            path: testInfo.outputPath('writing-assistant-editable-mobile.png'),
            animations: 'disabled',
          })
      }
      await dialog.getByRole('button', { name: 'Close', exact: true }).click()
    }
    await page.getByRole('button', { name: 'Add emoji', exact: true }).click()
    await page.getByRole('button', { name: 'Insert 😊', exact: true }).click()
    await selectMode(page, 'Internal note')
    await noteInput(page).fill('Private mobile note draft')
    await expect(page.getByRole('button', { name: 'Save private note', exact: true })).toBeInViewport()
    await selectMode(page, 'Reply')
    await expect(replyInput(page)).toHaveValue('A mobile draft that stays in place.😊')
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: testInfo.outputPath(`chat-composer-mobile-${theme}.png`), animations: 'disabled' })
    expect(platform.sent).toEqual([])
  })
}
