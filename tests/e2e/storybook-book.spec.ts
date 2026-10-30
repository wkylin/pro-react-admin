import { expect, test, type CDPSession } from '@playwright/test'
import sharp from 'sharp'

for (const mode of ['double', 'single']) {
  test.describe(`InteractiveBook ${mode}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?id=components-stateless-interactivebook--publisher-cover-layout&viewMode=story&args=mode:${mode};defaultOpen:true`
      )
      // Wait for the real WebGL overlay: mocking it would miss pointer interception.
      await expect(page.locator('[data-book-mesh-ready="true"][data-book-mesh-active="false"]')).toHaveCount(1)
      await expect
        .poll(() => page.locator('.bookFlipStage').evaluate((element) => element.clientWidth))
        .toBeGreaterThan(mode === 'single' ? 300 : 600)
    })

    test('page corners curl and turn, and chapter buttons remain clickable', async ({ page }) => {
      const stage = page.locator('.bookFlipStage')
      const bounds = await stage.boundingBox()
      if (!bounds) throw new Error('The reading surface is missing')
      const corner = { x: bounds.x + bounds.width - 18, y: bounds.y + bounds.height - 18 }

      await page.mouse.move(corner.x, corner.y)
      await expect(stage).toHaveClass(/bookFlipSoftActive/)
      await page.mouse.click(corner.x, corner.y)
      await expect(page.getByRole('button', { name: '上一页', exact: true })).toBeEnabled()
      await expect(stage).not.toHaveClass(/bookFlipSoftActive/)

      await page.keyboard.press('Home')
      await expect(page.getByRole('button', { name: '上一页', exact: true })).toBeDisabled()
      await expect(page.locator('[data-book-mesh-ready="true"]')).toHaveCount(1)
      await page.getByRole('button', { name: '进入目录', exact: true }).click()
      await page.getByRole('button', { name: '跳转至第 3 页：第二章：AI Agent 的工作原理', exact: true }).click()
      await expect(page.getByRole('group', { name: '书籍阅读控制' })).toContainText(/3(?:–4)?\s*\/\s*16/)

      await page.getByRole('button', { name: '合上书籍', exact: true }).click()
      const cover = page.getByRole('button', { name: /拖动旋转封面或点击打开/ })
      await expect(cover).toBeVisible()
      await cover.click()
      await expect(page.getByRole('button', { name: '进入目录', exact: true })).toBeVisible()
    })

    test('last-page actions work before and after reopening the back cover', async ({ page }) => {
      await page.keyboard.press('End')
      const restart = page.getByRole('button', { name: '从头阅读', exact: true })
      await expect(restart).toBeVisible()
      await expect(page.locator('[data-book-mesh-ready="true"][data-book-mesh-active="false"]')).toHaveCount(1)
      await page.getByRole('button', { name: '翻到封底', exact: true }).click()
      await page.getByRole('button', { name: /点击返回.*末页/ }).click()
      await expect(restart).toBeVisible()
      await expect(page.locator('[data-book-mesh-ready="true"][data-book-mesh-active="false"]')).toHaveCount(1)
      await restart.click()
      await expect(page.getByRole('group', { name: '书籍阅读控制' })).toContainText('环衬')
    })

    test('clicking the middle of the outer edges turns both ways without hovering a corner', async ({ page }) => {
      const stage = page.locator('.bookFlipStage')
      const bounds = await stage.boundingBox()
      if (!bounds) throw new Error('The reading surface is missing')
      await page.mouse.click(bounds.x + bounds.width - 18, bounds.y + bounds.height / 2)
      const previous = page.getByRole('button', { name: '上一页', exact: true })
      await expect(previous).toBeEnabled()
      await expect(stage).not.toHaveClass(/bookFlipSoftActive/)
      await page.mouse.click(bounds.x + 18, bounds.y + bounds.height / 2)
      await expect(previous).toBeDisabled()
    })

    test('the reading frame withdraws before the front or back cover closes', async ({ page }) => {
      for (const back of [false, true]) {
        if (back) {
          await page.getByRole('button', { name: /拖动旋转封面或点击打开/ }).click()
          await expect(page.getByRole('button', { name: '上一页', exact: true })).toBeDisabled()
          await page.keyboard.press('End')
          await expect(page.getByRole('button', { name: '从头阅读', exact: true })).toBeVisible()
        }
        const rimOpacity = page.locator('[class*="bookWrapper"]').evaluate(
          (book) =>
            new Promise<number>((resolve) => {
              const observer = new MutationObserver(() => {
                const openness = Number((book as HTMLElement).style.getPropertyValue('--book-openness'))
                if (openness > 0 && openness < 0.25) {
                  observer.disconnect()
                  resolve(Number(getComputedStyle(book.querySelector('[class*="spreadBoards"]')!).opacity))
                }
              })
              observer.observe(book, { attributes: true, attributeFilter: ['style'] })
            })
        )
        await page.getByRole('button', { name: back ? '翻到封底' : '合上书籍', exact: true }).click()
        expect(await rimOpacity).toBe(0)
        await expect(page.locator('[data-book-mesh-active="true"]')).toHaveCount(1)
      }
    })
  })
}

async function swipe(client: CDPSession, from: { x: number; y: number }, to: { x: number; y: number }) {
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...from, id: 1 }] })
  for (let step = 1; step <= 10; step++) {
    // Input pacing is intentional: exercise a slow, real browser touch gesture.
    await new Promise((resolve) => setTimeout(resolve, 55))
    await client.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: from.x + ((to.x - from.x) * step) / 10, y: from.y + ((to.y - from.y) * step) / 10, id: 1 }],
    })
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
}

for (const mode of ['double', 'single']) {
  test(`the back cover keeps identical shading at the renderer handoff in ${mode} mode`, async ({ page }, testInfo) => {
    await page.goto(
      `/iframe.html?id=components-stateless-interactivebook--default&viewMode=story&args=mode:${mode};defaultOpen:true;coverStyle:classic`
    )
    await expect(page.locator('.bookFlipStage')).toBeVisible()
    await page.keyboard.press('End')
    const snapshot = page.locator('.bookFlipStage [data-book-back-snapshot]')
    await expect
      .poll(() => snapshot.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0))
      .toBe(true)
    await page.getByRole('button', { name: '翻到封底', exact: true }).click()
    const mesh = page.locator('[data-book-mesh-active="true"][data-book-mesh-ready="true"]')
    await expect(mesh).toBeVisible()
    const viewport = page.locator('[data-interactive-book-viewport]')
    const closedImage = await viewport.screenshot()
    const closedPixels = await sharp(closedImage).raw().toBuffer()

    // Compare the two surfaces at the identical flat pose, without antialiasing from a moving frame.
    await page.evaluate(() => {
      document.querySelector<HTMLElement>('[data-book-mesh]')!.style.visibility = 'hidden'
      document.querySelector('[data-book-preview-surface]')!.removeAttribute('data-mesh-closed')
    })
    await expect(snapshot).toBeVisible()
    const turningImage = await viewport.screenshot()
    const turningPixels = await sharp(turningImage).raw().toBuffer()
    await testInfo.attach('closed-back', { body: closedImage, contentType: 'image/png' })
    await testInfo.attach('turning-back', { body: turningImage, contentType: 'image/png' })
    expect(turningPixels.length).toBe(closedPixels.length)
    let difference = 0
    let ink = 0
    for (let channel = 0; channel < closedPixels.length; channel++) {
      difference += Math.abs(closedPixels[channel] - turningPixels[channel])
      if (closedPixels[channel] < 160) ink++
    }
    expect(ink / closedPixels.length).toBeGreaterThan(0.05)
    expect(difference / closedPixels.length).toBeLessThan(1)

    await page.evaluate(() => {
      document.querySelector<HTMLElement>('[data-book-mesh]')!.style.visibility = ''
      document.querySelector('[data-book-preview-surface]')!.setAttribute('data-mesh-closed', 'true')
    })
    const oldSnapshot = await snapshot.getAttribute('src')
    await page.getByRole('button', { name: '3/4', exact: true }).click()
    await page.locator('[class*="textureSources"] > div:nth-child(2) h3').evaluate((title) => {
      title.textContent = '更新后的封底'
    })
    await expect(snapshot).not.toHaveAttribute('src', oldSnapshot!)
    await expect(page.getByRole('button', { name: /点击返回.*末页/ })).toBeVisible()
    const updatedSnapshot = await snapshot.getAttribute('src')
    await page.setViewportSize({ width: 390, height: 900 })
    await expect(snapshot).not.toHaveAttribute('src', updatedSnapshot!)
    await page.getByRole('button', { name: /点击返回.*末页/ }).click()
    await expect(page.locator('[data-book-mesh-active="true"]')).toHaveCount(0)
    await expect(page.getByRole('button', { name: '从头阅读', exact: true })).toBeVisible()
    await expect
      .poll(() => snapshot.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0))
      .toBe(true)
  })

  test(`contents and distant chapter links turn every intermediate page in ${mode} mode`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-stateless-interactivebook--publisher-cover-layout&viewMode=story&args=mode:${mode};defaultOpen:true`
    )
    const stage = page.locator('.bookFlipStage')
    await expect(page.locator('[data-book-mesh-ready="true"]')).toHaveCount(1)
    await stage.evaluate((element) => {
      const shells = [...element.querySelectorAll<HTMLElement>(':scope > [data-density]')]
      const visited: number[] = []
      const empty = new Set<number>()
      const record = () => {
        const current = shells.findIndex((shell) => shell.getAttribute('aria-hidden') === 'false')
        if (current !== visited.at(-1)) visited.push(current)
        shells.forEach((shell, index) => {
          if (shell.style.display !== 'none' && !shell.querySelector('.bookFlipContent')?.childElementCount)
            empty.add(index)
        })
        element.setAttribute('data-visited-pages', JSON.stringify(visited))
        element.setAttribute('data-empty-pages', JSON.stringify([...empty]))
      }
      new MutationObserver(record).observe(element, {
        subtree: true,
        attributes: true,
        attributeFilter: ['aria-hidden'],
      })
      record()
    })
    await page.getByRole('button', { name: '进入目录', exact: true }).click()
    await expect(page.getByRole('group', { name: '书籍阅读控制' })).toContainText('目录')
    await expect(page.locator('[data-book-animating]')).toHaveCount(0)
    const step = mode === 'single' ? 1 : 2
    const openingPages = Array.from({ length: 6 / step + 1 }, (_, index) => 1 + index * step)
    await expect(stage).toHaveAttribute('data-visited-pages', JSON.stringify(openingPages))

    // This target is outside the portal window around the original spread.
    await page.getByRole('button', { name: '跳转至第 11 页：第六章：AI Agent 的未来发展', exact: true }).click()
    await expect(page.getByRole('group', { name: '书籍阅读控制' })).toContainText(/11(?:–12)?\s*\/\s*16/)
    await expect(page.locator('[data-book-animating]')).toHaveCount(0)
    const chapterPages = Array.from({ length: 12 / step }, (_, index) => 7 + (index + 1) * step)
    await expect(stage).toHaveAttribute('data-visited-pages', JSON.stringify([...openingPages, ...chapterPages]))
    await expect(stage).toHaveAttribute('data-empty-pages', '[]')
  })

  test(`book preliminaries and closing pages form a complete reading sequence in ${mode} mode`, async ({ page }) => {
    // Several full-book journeys now animate every intervening page; keep individual assertions at 10s.
    test.setTimeout(45_000)
    await page.goto(
      `/iframe.html?id=components-stateless-interactivebook--book-matter-design&viewMode=story&args=mode:${mode}`
    )
    const visibleMatter = page.locator('.bookFlipStage > [aria-hidden="false"] [data-book-matter]')
    const expected =
      mode === 'double'
        ? [
            ['endpaper', 'half-title'],
            ['frontispiece', 'title'],
            ['copyright', 'preface'],
          ]
        : [['endpaper'], ['half-title'], ['frontispiece'], ['title'], ['copyright'], ['preface']]
    for (const kinds of expected) {
      await expect
        .poll(() => visibleMatter.evaluateAll((elements) => elements.map((el) => el.getAttribute('data-book-matter'))))
        .toEqual(kinds)
      if (kinds.includes('title'))
        await expect(visibleMatter.getByText('从感知、决策到行动', { exact: true })).toBeVisible()
      if (kinds.includes('preface')) await expect(visibleMatter.getByText(/愿意追问/)).toBeVisible()
      await page.getByRole('button', { name: '下一页', exact: true }).click()
    }
    await page.getByRole('button', { name: '跳转至第 3 页：第二章：AI Agent 的工作原理', exact: true }).click()
    await expect(page.getByRole('group', { name: '书籍阅读控制' })).toContainText(/3(?:–4)?\s*\/\s*16/)
    await page.keyboard.press('End')
    await expect(page.getByRole('button', { name: '返回目录', exact: true })).toBeVisible()
    await expect(visibleMatter.getByText('阅读示例版')).toBeVisible()
    await page.getByRole('button', { name: '返回目录', exact: true }).click()
    await expect(page.getByRole('button', { name: '跳转至第 1 页：第一章：AI Agent 简介' })).toBeVisible()
    await page.keyboard.press('End')
    await page.getByRole('button', { name: '翻到封底', exact: true }).click()
    await page.getByRole('button', { name: /点击返回.*末页/ }).click()
    await page.getByRole('button', { name: '从头阅读', exact: true }).click()
    await expect(visibleMatter.first()).toHaveAttribute('data-book-matter', 'endpaper')
  })
}

test('reading rims and paper layers meet at the binding on the first, middle and last spreads', async ({ page }) => {
  await page.goto(
    '/iframe.html?id=components-stateless-interactivebook--publisher-cover-layout&viewMode=story&args=mode:double;defaultOpen:true;thickness:64'
  )
  await expect(page.locator('[data-book-mesh-ready="true"]')).toHaveCount(1)
  const checkBinding = async () => {
    await expect(page.locator('[data-book-animating]')).toHaveCount(0)
    const edges = await page.evaluate(() => {
      const boards = [...document.querySelectorAll('[class*="spreadBoards"] > div')]
      const stage = document.querySelector('.bookFlipStage')!.getBoundingClientRect()
      const layers = [...document.querySelectorAll('[class*="readingPageLayers"] span')]
      return {
        rims: boards.map((board) => {
          const outer = getComputedStyle(board, '::before')
          const inner = getComputedStyle(board, '::after')
          return {
            top: Number.parseFloat(outer.top),
            bottom: Number.parseFloat(outer.bottom),
            topWidth: Number.parseFloat(inner.top) - Number.parseFloat(outer.top),
            bottomWidth: Number.parseFloat(inner.bottom) - Number.parseFloat(outer.bottom),
          }
        }),
        paperEdges: layers.map((layer) => {
          const bounds = layer.getBoundingClientRect()
          return { top: bounds.top - stage.top, bottom: bounds.bottom - stage.bottom }
        }),
        contentEdges: [...document.querySelectorAll('.bookFlipStage > [aria-hidden="false"] > .bookFlipContent')].map(
          (content) => {
            const bounds = content.getBoundingClientRect()
            return { top: bounds.top, bottom: bounds.bottom }
          }
        ),
      }
    })
    expect(edges.rims[0]).toEqual(edges.rims[1])
    for (const rim of edges.rims) {
      expect(rim.top).toBe(rim.bottom)
      expect(rim.topWidth).toBe(2)
      expect(rim.bottomWidth).toBe(2)
    }
    for (const edge of edges.paperEdges) {
      expect(Math.abs(edge.top)).toBeLessThan(0.1)
      expect(Math.abs(edge.bottom)).toBeLessThan(0.1)
    }
    expect(edges.contentEdges).toHaveLength(2)
    expect(Math.abs(edges.contentEdges[0].top - edges.contentEdges[1].top)).toBeLessThan(0.1)
    expect(Math.abs(edges.contentEdges[0].bottom - edges.contentEdges[1].bottom)).toBeLessThan(0.1)
  }
  await checkBinding()
  await page.getByRole('button', { name: '进入目录', exact: true }).click()
  await page.getByRole('button', { name: '跳转至第 9 页：第五章：AI Agent 的挑战', exact: true }).click()
  await expect(page.getByRole('group', { name: '书籍阅读控制' })).toContainText(/9–10\s*\/\s*16/)
  await checkBinding()
  await page.keyboard.press('End')
  await expect(page.getByRole('button', { name: '从头阅读', exact: true })).toBeVisible()
  await checkBinding()
})

test.describe('InteractiveBook touch reading', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })

  test('paged text has no internal scroll and slow horizontal gestures turn in both directions', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-stateless-interactivebook--publisher-cover-layout&viewMode=story&args=mode:single;defaultOpen:true'
    )
    await expect(page.locator('[data-book-mesh-ready="true"]')).toHaveCount(1)
    await page.getByRole('button', { name: '进入目录', exact: true }).tap()
    await page.getByRole('button', { name: '跳转至第 1 页：第一章：AI Agent 简介', exact: true }).tap()
    const controls = page.getByRole('group', { name: '书籍阅读控制' })
    await expect(controls).toContainText(/1\s*\/\s*\d+/)
    const text = page.locator('.bookFlipStage > [aria-hidden="false"] [data-book-flow]')
    await expect(text).toHaveCount(1)
    await expect
      .poll(() => text.evaluate((element) => element.scrollHeight - element.clientHeight))
      .toBeLessThanOrEqual(1)
    const bounds = await text.boundingBox()
    if (!bounds) throw new Error('The reading text is missing')
    const client = await page.context().newCDPSession(page)
    const center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 }

    await swipe(client, { ...center, y: bounds.y + bounds.height - 12 }, { ...center, y: bounds.y + 12 })
    await expect.poll(() => text.evaluate((element) => element.scrollTop)).toBe(0)
    await expect(controls).toContainText(/1\s*\/\s*\d+/)

    await swipe(client, { ...center, x: bounds.x + bounds.width - 10 }, { ...center, x: bounds.x + 10 })
    await expect(controls).toContainText(/2\s*\/\s*\d+/)
    await swipe(client, { ...center, x: bounds.x + 10 }, { ...center, x: bounds.x + bounds.width - 10 })
    await expect(controls).toContainText(/1\s*\/\s*\d+/)
    await client.detach()

    const stageBounds = await page.locator('.bookFlipStage').boundingBox()
    expect(stageBounds?.x).toBeGreaterThanOrEqual(12)
    expect((stageBounds?.x ?? 0) + (stageBounds?.width ?? 0)).toBeLessThanOrEqual(378)
  })
})

for (const mode of ['double', 'single']) {
  test(`long matter is complete across pages without scrolling in ${mode} mode`, async ({ page }) => {
    test.setTimeout(60_000)
    if (mode === 'single') await page.setViewportSize({ width: 390, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(
      `/iframe.html?id=components-stateless-interactivebook--long-book-matter&viewMode=story&args=mode:${mode}`
    )
    await expect(page.locator('[data-book-pagination-ready="true"]')).toHaveCount(1)
    const fullPublication = await page
      .locator('[inert] [data-book-matter="colophon"] [data-book-flow-content]')
      .first()
      .textContent()
    await page.keyboard.press('End')
    await expect(page.getByRole('button', { name: '翻到封底', exact: true })).toBeVisible()
    const parts = new Map<number, string>()
    const publicationParts = new Map<number, string>()
    for (let step = 0; step < 60; step++) {
      const visible = page.locator('.bookFlipStage > [aria-hidden="false"]')
      const flows = await visible.locator('[data-book-flow]').evaluateAll((elements) =>
        elements.map((element) => ({
          overflow: element.scrollHeight - element.clientHeight,
          horizontal: element.scrollWidth - element.clientWidth,
          scrolling: getComputedStyle(element).overflowY,
        }))
      )
      for (const flow of flows) {
        expect(flow.overflow).toBeLessThanOrEqual(1)
        expect(flow.horizontal).toBeLessThanOrEqual(1)
        expect(flow.scrolling).not.toMatch(/auto|scroll/)
      }
      const afterwords = await visible.locator('[data-book-matter="afterword"]').evaluateAll((elements) =>
        elements.map((element) => ({
          part: Number(element.getAttribute('data-book-matter-part')),
          text: element.querySelector('[data-book-flow-content]')!.textContent!,
        }))
      )
      afterwords.forEach(({ part, text }) => parts.set(part, text))
      const publication = await visible.locator('[data-book-matter="colophon"]').evaluateAll((elements) =>
        elements.map((element) => ({
          part: Number(element.getAttribute('data-book-matter-part')),
          text: element.querySelector('[data-book-flow-content]')!.textContent!,
          columns: [...element.querySelectorAll('dd')].map((value) => getComputedStyle(value).gridColumnStart),
        }))
      )
      publication.forEach(({ part, text, columns }) => {
        publicationParts.set(part, text)
        expect(columns.every((column) => column === '2')).toBe(true)
      })
      const previous = page.getByRole('button', { name: '上一页', exact: true })
      if (await previous.isDisabled()) break
      await previous.click()
      await expect(page.locator('[data-book-animating]')).toHaveCount(0)
    }
    expect(parts.size).toBeGreaterThan(1)
    const paragraph =
      '阅读之后，可以从一个熟悉的任务开始：记录输入信息、判断依据与行动结果，再检查哪些环节需要人的确认。这些具体的问题，比抽象的答案更能帮助我们理解工具。'
    expect(
      [...parts]
        .sort(([a], [b]) => a - b)
        .map(([, text]) => text)
        .join('')
    ).toBe('把问题带回日常工作' + paragraph.repeat(12))
    expect(
      [...publicationParts]
        .sort(([a], [b]) => a - b)
        .map(([, text]) => text)
        .join('')
    ).toBe(fullPublication)
    await page.getByRole('button', { name: '合上书籍', exact: true }).click()
    await expect(page.getByRole('button', { name: /拖动旋转封面或点击打开/ })).toBeVisible()
    const title = page.locator('[class*="textureSources"] [class*="coverHeading"]').first()
    const subtitle = page.locator('[class*="textureSources"] [class*="coverSubtitle"]').first()
    expect(await title.textContent()).toBe('从感知到行动')
    expect(await subtitle.textContent()).toBe('理解人工智能代理的工作方式与实践路径')
    const headingBox = (await title.boundingBox())!
    const subtitleBox = (await subtitle.boundingBox())!
    expect(subtitleBox.y - headingBox.y - headingBox.height).toBeGreaterThanOrEqual(10)
  })
}

test('reflow preserves the source chapter and updates its contents destination', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(
    '/iframe.html?id=components-stateless-interactivebook--publisher-cover-layout&viewMode=story&args=mode:single;defaultOpen:true'
  )
  await expect(page.locator('[data-book-pagination-ready="true"]')).toHaveCount(1)
  await page.getByRole('button', { name: '进入目录', exact: true }).click()
  await page.getByRole('button', { name: /跳转至第 .*第二章：AI Agent 的工作原理/ }).click()
  const source = page.locator('.bookFlipStage > [aria-hidden="false"] [data-book-source-face]')
  await expect(source).toHaveAttribute('data-book-source-face', '3')
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(source).toHaveAttribute('data-book-source-face', '3')
  await expect(page.locator('[data-book-pagination-ready="true"]')).toHaveCount(1)
  await page.keyboard.press('Home')
  await page.getByRole('button', { name: '进入目录', exact: true }).click()
  await page.getByRole('button', { name: /跳转至第 .*第二章：AI Agent 的工作原理/ }).click()
  await expect(source).toHaveAttribute('data-book-source-face', '3')
})

test('preparing the back cover preserves the upright front preview after closing', async ({ page }) => {
  await page.goto(
    '/iframe.html?id=components-stateless-interactivebook--long-book-matter&viewMode=story&args=mode:single;defaultOpen:false;rotation:0;tilt:0'
  )
  const mesh = page.locator('[data-book-mesh-active="true"][data-book-mesh-ready="true"]')
  await expect(mesh).toBeVisible()
  await page.getByRole('button', { name: '正面', exact: true }).click()
  // Use the matching canonical front pose: closing now deliberately stays here.
  await expect(page.locator('[data-book-front-snapshot]')).toHaveCount(1)
  const viewport = page.locator('[data-interactive-book-viewport]')
  const initial = await sharp(await viewport.screenshot())
    .raw()
    .toBuffer()
  await page.getByRole('button', { name: /拖动旋转封面或点击打开/ }).click()
  await expect(page.getByRole('button', { name: '合上书籍', exact: true })).toBeVisible()
  await page.keyboard.press('End')
  await expect(page.locator('.bookFlipStage [data-book-back-snapshot]')).toHaveCount(1)
  await page.getByRole('button', { name: '合上书籍', exact: true }).click()
  await expect(mesh).toBeVisible()
  await expect
    .poll(
      async () => {
        const restored = await sharp(await viewport.screenshot())
          .raw()
          .toBuffer()
        if (restored.length !== initial.length) return Infinity
        let difference = 0
        for (let index = 0; index < initial.length; index++) difference += Math.abs(initial[index] - restored[index])
        return difference / initial.length
      },
      { timeout: 10_000 }
    )
    .toBeLessThan(2)
})

for (const mode of ['single', 'double']) {
  test(`closing directly preserves the front shading and stays flat in ${mode} mode`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-stateless-interactivebook--default&viewMode=story&args=mode:${mode};defaultOpen:true`
    )
    await expect(page.locator('[data-book-mesh-ready="true"]')).toHaveCount(1)
    await page.keyboard.press('End')
    await expect(page.getByRole('button', { name: '翻到封底', exact: true })).toBeVisible()
    await page.getByRole('button', { name: '合上书籍', exact: true }).click()
    await expect(page.locator('[data-cover-turning]')).toHaveCount(1)
    await page.keyboard.press('Escape')
    await page.keyboard.press('Escape')
    const mesh = page.locator('[data-book-mesh-active="true"][data-book-mesh-ready="true"]')
    await expect(mesh).toBeVisible({ timeout: 4000 })
    await expect(page.getByRole('button', { name: '正面', exact: true })).toHaveAttribute('aria-pressed', 'true')
    const viewport = page.locator('[data-interactive-book-viewport]')
    const closed = await sharp(await viewport.screenshot())
      .raw()
      .toBuffer()
    await page.evaluate(() => {
      document.querySelector<HTMLElement>('[data-book-mesh]')!.style.visibility = 'hidden'
      document.querySelector('[data-book-preview-surface]')!.removeAttribute('data-mesh-closed')
    })
    await expect(page.locator('.bookFlipStage [data-book-front-snapshot]')).toBeVisible()
    const board = await sharp(await viewport.screenshot())
      .raw()
      .toBuffer()
    expect(board.length).toBe(closed.length)
    let difference = 0
    for (let index = 0; index < board.length; index++) difference += Math.abs(board[index] - closed[index])
    expect(difference / board.length).toBeLessThan(1)
    await expect(page.getByRole('button', { name: '正面', exact: true })).toHaveAttribute('aria-pressed', 'true')
  })
}

test('closing during opening reverses the cover without getting stuck', async ({ page }) => {
  await page.goto('/iframe.html?id=components-stateless-interactivebook--default&viewMode=story')
  const cover = page.getByRole('button', { name: /拖动旋转封面或点击打开/ })
  await cover.click()
  await expect(page.locator('[data-cover-turning]')).toHaveCount(1)
  await page.keyboard.press('Escape')
  await page.keyboard.press('Escape')
  await expect(cover).toBeVisible()
  await expect(page.getByRole('button', { name: '正面', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await cover.click()
  await expect(page.getByRole('button', { name: '进入目录', exact: true })).toBeVisible()
})

test('PDF files render real pages with a local worker and no external worker setup', async ({ page }) => {
  const worker = page.waitForResponse((response) => /pdf\.worker.*\.mjs/.test(response.url()) && response.ok())
  const pdf = page.waitForResponse((response) => response.url().endsWith('/assets/pdf/sample.pdf') && response.ok())
  await page.goto(
    '/iframe.html?id=components-stateless-interactivebook--pdf-book&viewMode=story&args=defaultOpen:true;mode:double'
  )
  await Promise.all([worker, pdf])
  await expect(page.getByText('PDF 加载失败', { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: '进入目录', exact: true }).click()
  await page.getByRole('button', { name: '开始阅读', exact: true }).click()
  const image = page.locator('.bookFlipStage img[alt="第 1 页"]')
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true)
  await expect(image).toBeVisible()
  await expect(page.locator('[data-book-animating]')).toHaveCount(0)
  await page.keyboard.press('ArrowRight')
  const nextImage = page.locator('.bookFlipStage img[alt="第 3 页"]')
  await expect(nextImage).toBeVisible()
  await expect
    .poll(() => nextImage.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0))
    .toBe(true)
})

test('an unavailable PDF reports a file error instead of a worker resolution error', async ({ page }) => {
  await page.route('**/assets/pdf/sample.pdf', (route) => route.fulfill({ status: 404, body: 'Missing PDF' }))
  await page.goto('/iframe.html?id=components-stateless-interactivebook--pdf-book&viewMode=story')
  await expect(page.getByText('PDF 加载失败', { exact: true })).toBeVisible()
  await expect(page.locator('body')).not.toContainText('Failed to resolve module specifier')
})

test('a multi-page journey keeps one rustling voice until its last turn', async ({ page }) => {
  await page.addInitScript(() => {
    const stats = { starts: 0, stops: 0, pulses: 0, loops: 0 }
    Object.assign(window, { bookAudioStats: stats })
    const start = AudioBufferSourceNode.prototype.start
    const stop = AudioBufferSourceNode.prototype.stop
    const ramp = AudioParam.prototype.linearRampToValueAtTime
    AudioBufferSourceNode.prototype.start = function (...args) {
      stats.starts++
      if (this.loop) stats.loops++
      return start.apply(this, args)
    }
    AudioBufferSourceNode.prototype.stop = function (...args) {
      stats.stops++
      return stop.apply(this, args)
    }
    AudioParam.prototype.linearRampToValueAtTime = function (...args) {
      if (args[0] > 0) stats.pulses++
      return ramp.apply(this, args)
    }
  })
  await page.goto('/iframe.html?id=components-stateless-interactivebook--default&viewMode=story&args=defaultOpen:true')
  await expect(page.locator('[data-book-mesh-ready="true"]')).toHaveCount(1)
  await page.getByRole('button', { name: '进入目录', exact: true }).click()
  await expect(page.getByRole('button', { name: /跳转至第 1 页/ })).toBeVisible()
  await expect(page.locator('[data-book-animating]')).toHaveCount(0)
  const stats = await page.evaluate(
    () =>
      (window as unknown as { bookAudioStats: { starts: number; stops: number; pulses: number; loops: number } })
        .bookAudioStats
  )
  expect(stats.starts).toBe(1)
  expect(stats.loops).toBe(1)
  expect(stats.pulses).toBeGreaterThan(1)
  expect(stats.stops).toBe(1)
})
