import { expect, test, type Page } from '@playwright/test'

const endpoint = 'https://api.web3forms.com/submit'
const draft = {
  name: 'Avery Example',
  email: 'avery@example.test',
  subject: 'Improve the contact workflow',
  message: 'Please make it easier to report a reproducible issue in the workspace.',
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    localStorage.setItem('i18nextLng', 'en')
  })
  // Every test blocks this endpoint unless it installs a more specific simulated response.
  await page.route(endpoint, (route) => route.abort('blockedbyclient'))
})

async function fillDraft(page: Page) {
  const form = page.getByRole('region', { name: 'Send a message', exact: true })
  await form.getByRole('textbox', { name: 'Name', exact: true }).fill(draft.name)
  await form.getByRole('textbox', { name: 'Reply email', exact: true }).fill(draft.email)
  await form.getByRole('textbox', { name: 'Subject', exact: true }).fill(draft.subject)
  await form.getByRole('textbox', { name: 'Message', exact: true }).fill(draft.message)
  return form
}

test('contact channels and field validation work without sending an invalid message', async ({ page }) => {
  let count = 0
  page.on('request', (request) => {
    if (request.url() === endpoint) count += 1
  })
  await page.goto('/#/contact')
  await expect(page.getByRole('heading', { name: 'Contact', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'wkylin.w@gmail.com', exact: true })).toHaveAttribute(
    'href',
    'mailto:wkylin.w@gmail.com'
  )
  await expect(page.getByRole('link', { name: 'View project issues', exact: true })).toHaveAttribute(
    'href',
    'https://github.com/wkylin/pro-react-admin/issues'
  )
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByText('Enter a name with 1–80 characters.', { exact: true })).toBeVisible()
  const form = await fillDraft(page)
  await form.getByRole('textbox', { name: 'Reply email', exact: true }).fill('invalid-email')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByText('Enter a valid reply email, up to 254 characters.', { exact: true })).toBeVisible()
  expect(count).toBe(0)
})

test('business rejection keeps the draft and a successful retry alone clears it', async ({ page }) => {
  let attempts = 0
  await page.route(endpoint, (route) => {
    attempts += 1
    expect(route.request().method()).toBe('POST')
    expect(route.request().postData()).toContain(draft.email)
    return route.fulfill({ status: 200, json: { success: attempts > 1 } })
  })
  await page.goto('/#/contact')
  const form = await fillDraft(page)
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(form.getByRole('alert')).toContainText('The service did not accept this message')
  await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue(draft.message)
  await expect(form.getByText('Message accepted by the sending service', { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(form.getByText('Message accepted by the sending service', { exact: true })).toBeVisible()
  await expect(form.getByRole('textbox', { name: 'Name', exact: true })).toHaveValue('')
  await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue('')
  expect(attempts).toBe(2)
})

test('an in-flight request is locked and stopping it preserves the draft and ignores a late result', async ({
  page,
}) => {
  let attempts = 0
  let release!: () => void
  let finished!: () => void
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })
  const handled = new Promise<void>((resolve) => {
    finished = resolve
  })
  await page.route(endpoint, async (route) => {
    attempts += 1
    await gate
    await route.fulfill({ json: { success: true } }).catch(() => {})
    finished()
  })
  await page.goto('/#/contact')
  const form = await fillDraft(page)
  await page.getByRole('button', { name: 'Send message', exact: true }).dblclick()
  await expect(page.getByRole('button', { name: 'Sending message…', exact: true })).toBeDisabled()
  await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toBeDisabled()
  await expect.poll(() => attempts).toBe(1)
  await page.getByRole('button', { name: 'Stop waiting', exact: true }).click()
  await expect(
    form.getByText('Stopped waiting for the sending result. Your draft is still here.', { exact: true })
  ).toBeVisible()
  await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue(draft.message)
  release()
  await handled
  await expect(form.getByText('Message accepted by the sending service', { exact: true })).toHaveCount(0)
})

test('clearing requires confirmation and changing accounts clears the previous draft', async ({ page }) => {
  await page.goto('/#/contact')
  const form = await fillDraft(page)
  await page.getByRole('button', { name: 'Clear form', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Clear this draft?', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Keep editing', exact: true }).click()
  await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue(draft.message)
  await page.getByRole('button', { name: 'Clear form', exact: true }).click()
  await page.getByRole('button', { name: 'Clear draft', exact: true }).click()
  await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue('')
  await fillDraft(page)
  await page.evaluate(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'manager@test.com' }))
    localStorage.setItem('user_role', 'admin')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
  })
  await expect(form).toHaveCount(0)
  await expect(page.getByText('Sorry, you are not authorized to access this page.', { exact: true })).toBeVisible()
  await page.evaluate(() => {
    localStorage.setItem('token', JSON.stringify({ token: 'admin@test.com' }))
    localStorage.setItem('user_role', 'super_admin')
    window.dispatchEvent(new Event('pro-react-admin:session-changed'))
    location.hash = '/contact'
  })
  await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue('')
  await expect(form.getByRole('textbox', { name: 'Reply email', exact: true })).toHaveValue('')
})

for (const failure of ['network', 'rateLimited', 'invalidResponse'] as const) {
  test(`${failure} keeps contact fields available for a deliberate retry`, async ({ page }) => {
    await page.route(endpoint, (route) =>
      failure === 'network'
        ? route.abort('failed')
        : failure === 'rateLimited'
          ? route.fulfill({ status: 429, json: { success: false } })
          : route.fulfill({ status: 200, contentType: 'text/plain', body: 'not-json' })
    )
    await page.goto('/#/contact')
    const form = await fillDraft(page)
    await page.getByRole('button', { name: 'Send message', exact: true }).click()
    await expect(form.getByRole('alert')).toBeVisible()
    await expect(form.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue(draft.message)
    await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeEnabled()
  })
}

test('mobile dark contact supports Chinese, copying email and reaching the full form', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.addInitScript(() => {
    localStorage.setItem('i18nextLng', 'zh')
    localStorage.setItem('pro-react-admin:default:theme', JSON.stringify({ themeMode: 'dark' }))
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          document.documentElement.dataset.copiedContactEmail = value
        },
      },
    })
  })
  await page.goto('/#/contact')
  await expect(page.getByRole('heading', { name: '联系与反馈', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '复制邮箱', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-copied-contact-email', 'wkylin.w@gmail.com')
  await expect(page.getByRole('textbox', { name: '留言内容', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '发送留言', exact: true }).scrollIntoViewIfNeeded()
  await expect(page.getByRole('button', { name: '发送留言', exact: true })).toBeInViewport()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.getByRole('heading', { name: '联系与反馈', exact: true }).scrollIntoViewIfNeeded()
  await page.mouse.move(385, 820)
  await page.screenshot({ path: testInfo.outputPath('contact-mobile-dark.png') })
})
