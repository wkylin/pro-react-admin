import { expect, test } from '@playwright/test'

test('Shell loads a Remote after validating its manifest', async ({ page }) => {
  const manifestResponse = page.waitForResponse('**/projectA/remote-manifest.json')
  await page.goto('/#/projectA')

  const response = await manifestResponse
  expect(response.ok()).toBeTruthy()
  const manifest = await response.json()
  expect(manifest).toMatchObject({ name: 'projectA', protocolVersion: 1 })

  await expect(page.locator('body')).toContainText('这是通过')
  await expect(page.locator('body')).toContainText('projectA')
})

test('Shell retries a failed Remote manifest and then shows its fallback', async ({ page }) => {
  let requestCount = 0
  await page.route('**/projectB/remote-manifest.json', async (route) => {
    requestCount += 1
    await route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"unavailable"}' })
  })

  await page.goto('/#/projectB')
  await expect(page.getByText('远程应用暂时不可用')).toBeVisible()
  await expect.poll(() => requestCount).toBe(2)
})
