import { test, expect } from '@playwright/test'

test('deploy flow nodes become visible when in view', async ({ page }) => {
  await page.goto('/#/deploy-flow')
  await page.evaluate(() => {
    // enable debug logs in page
    // @ts-ignore
    window.__DEBUG_USE_INTERSECTION = true
    // @ts-ignore
    window.__DEBUG_DEPLOY_FLOW = true
  })

  await page.reload()

  await page.waitForSelector('.fix-tab-panel-scroll-container')
  await page.waitForSelector('.node')

  const containerInfo = await page.evaluate(() => {
    const c = document.querySelector('.fix-tab-panel-scroll-container')
    return c
      ? {
          clientHeight: c.clientHeight,
          scrollHeight: c.scrollHeight,
        }
      : null
  })

  expect(containerInfo).not.toBeNull()

  // try scrolling container to bottom to trigger in-view
  await page.evaluate(() => {
    const c = document.querySelector('.fix-tab-panel-scroll-container') as HTMLElement | null
    if (c && c.scrollHeight > c.clientHeight) {
      c.scrollTop = c.scrollHeight
    } else {
      window.scrollTo(0, document.body.scrollHeight)
    }
  })

  // wait for animation/observer
  await page.waitForTimeout(500)

  const opacities = await page.$$eval('.node', (els) => els.map((el) => getComputedStyle(el).opacity))
  console.log('opacities', opacities)

  const anyVisible = opacities.some((o) => parseFloat(o) >= 0.9)
  expect(anyVisible).toBeTruthy()
})