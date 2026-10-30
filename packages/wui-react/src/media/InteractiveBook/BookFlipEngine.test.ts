import { BookFlipEngine, type BookFlipEngineOptions } from './BookFlipEngine'

const PAGE_COUNT = 8
const WIDTH = 400
const HEIGHT = 600

function createBook(overrides: Partial<BookFlipEngineOptions> = {}) {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const pages = Array.from({ length: PAGE_COUNT }, (_, index) => {
    const page = document.createElement('div')
    page.textContent = `Face ${index}`
    page.dataset.density = index === 0 || index === PAGE_COUNT - 1 ? 'hard' : 'soft'
    return page
  })
  const onPage = jest.fn<void, [number]>()
  const onTurning = jest.fn<void, [boolean]>()
  const onFrame = jest.fn()
  const engine = new BookFlipEngine({
    host,
    pages,
    width: WIDTH,
    height: HEIGHT,
    single: false,
    startPage: 0,
    interactive: true,
    showCorners: true,
    reducedMotion: false,
    onPage,
    onTurning,
    onFrame,
    ...overrides,
  })
  const visibleFaces = () =>
    pages.flatMap((page, index) => (page.getAttribute('aria-hidden') === 'false' ? [index] : []))
  return { host, pages, engine, onPage, onTurning, onFrame, visibleFaces }
}

describe('BookFlipEngine', () => {
  let frameId = 0
  let frames: Map<number, FrameRequestCallback>
  let originalRequestAnimationFrame: typeof requestAnimationFrame
  let originalCancelAnimationFrame: typeof cancelAnimationFrame

  beforeEach(() => {
    frameId = 0
    frames = new Map()
    originalRequestAnimationFrame = globalThis.requestAnimationFrame
    originalCancelAnimationFrame = globalThis.cancelAnimationFrame
    globalThis.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
      const id = ++frameId
      frames.set(id, callback)
      return id
    })
    globalThis.cancelAnimationFrame = jest.fn((id: number) => {
      frames.delete(id)
    })
    jest.spyOn(performance, 'now').mockReturnValue(1000)
  })

  afterEach(() => {
    globalThis.requestAnimationFrame = originalRequestAnimationFrame
    globalThis.cancelAnimationFrame = originalCancelAnimationFrame
    jest.restoreAllMocks()
    document.body.replaceChildren()
  })

  function finishAnimation() {
    const pending = [...frames.values()]
    frames.clear()
    expect(pending).toHaveLength(1)
    pending[0](performance.now() + 1000)
    expect(frames.size).toBe(0)
  }

  function finishQueuedTurn() {
    const pending = [...frames.values()]
    frames.clear()
    expect(pending).toHaveLength(1)
    pending[0](performance.now() + 1000)
  }

  test('closing during opening reverses the partial cover and reports the front once', () => {
    const book = createBook()
    book.engine.next()
    const tick = [...frames.values()][0]
    frames.clear()
    tick(1300)
    book.onPage.mockClear()
    const progress = book.onFrame.mock.calls.at(-1)![0].progress
    book.engine.close()
    expect(book.onFrame.mock.calls.at(-1)![0].progress).toBeCloseTo(progress)
    finishAnimation()
    expect(book.onPage.mock.calls).toEqual([[0]])
    expect(book.visibleFaces()).toEqual([0])
    book.engine.destroy()
  })

  test('programmatic closing releases a drag so its remaining pointer events cannot interrupt closure', () => {
    const book = createBook({ startPage: 3 })
    const send = pointerInput(book.host)
    const stage = book.host.firstElementChild as HTMLElement
    send('pointerdown', 790, 590)
    send('pointermove', 600, 560)
    book.engine.close()
    expect(stage.releasePointerCapture).toHaveBeenCalled()
    const frame = book.onFrame.mock.calls.at(-1)![0]
    send('pointermove', 750, 590)
    send('pointercancel', 750, 590)
    expect(book.onFrame.mock.calls.at(-1)![0]).toEqual(frame)
    finishAnimation()
    expect(book.engine.getPage()).toBe(0)
    book.engine.destroy()
  })

  test.each([true, false])('close folds the current spread directly to the cover (single: %s)', (single) => {
    const book = createBook({ single, startPage: 5 })
    book.onPage.mockClear()
    book.engine.close()
    expect(book.engine.getPage()).toBe(5)
    const firstFrame = book.onFrame.mock.calls.at(-1)![0]
    expect(firstFrame).toMatchObject({ from: 5, to: 0, progress: 0 })
    expect(book.pages[5].style.display).toBe('block')
    finishAnimation()
    expect(book.onPage.mock.calls).toEqual([[0]])
    expect(book.visibleFaces()).toEqual([0])
    book.engine.destroy()
  })

  test('close cancels a pending journey and reduced motion closes instantly', () => {
    const book = createBook({ single: true, startPage: 2 })
    book.engine.goTo(6)
    finishQueuedTurn()
    book.onPage.mockClear()
    book.engine.close()
    finishAnimation()
    expect(book.onPage.mock.calls).toEqual([[0]])
    book.engine.destroy()
    const reduced = createBook({ startPage: 5, reducedMotion: true })
    reduced.engine.close()
    expect(reduced.engine.getPage()).toBe(0)
    expect(frames.size).toBe(0)
    reduced.engine.destroy()
  })

  test('sequential navigation reports each actual turn for continuous audio', () => {
    const onTurnStart = jest.fn()
    const book = createBook({ single: true, startPage: 1, onTurnStart })
    book.engine.goTo(4)
    for (let page = 2; page <= 4; page++) finishQueuedTurn()
    expect(onTurnStart).toHaveBeenCalledTimes(3)
    expect(onTurnStart.mock.calls.every(([turn]) => turn.sequence && turn.kind === 'page')).toBe(true)
    onTurnStart.mockClear()
    book.engine.close()
    expect(onTurnStart).toHaveBeenCalledWith({ kind: 'cover', sequence: false, duration: 800 })
    finishAnimation()
    book.engine.destroy()
  })

  test.each([true, false])(
    'goTo visits every intermediate face or spread without releasing the turning lock (single: %s)',
    (single) => {
      const book = createBook({ single, startPage: 1 })
      book.onPage.mockClear()
      book.onTurning.mockClear()
      book.engine.goTo(6)
      expect(book.engine.getPage()).toBe(1)
      const expected = single ? [2, 3, 4, 5, 6] : [3, 5]
      for (const page of expected) {
        finishQueuedTurn()
        expect(book.engine.getPage()).toBe(page)
      }
      expect(book.onPage.mock.calls.map(([page]) => page)).toEqual(expected)
      expect(book.onTurning.mock.calls).toEqual([[true], [false]])
      expect(frames.size).toBe(0)
      book.onPage.mockClear()
      book.engine.goTo(1)
      for (const page of single ? [5, 4, 3, 2, 1] : [3, 1]) {
        finishQueuedTurn()
        expect(book.engine.getPage()).toBe(page)
      }
      expect(frames.size).toBe(0)
      book.engine.destroy()
    }
  )

  test('a new destination replaces a running journey and an immediate jump clears its remaining turns', () => {
    const book = createBook({ single: true, startPage: 1 })
    book.engine.goTo(6)
    finishQueuedTurn()
    expect(book.engine.getPage()).toBe(2)
    book.engine.goTo(0)
    finishQueuedTurn()
    expect(book.engine.getPage()).toBe(1)
    book.engine.goTo(4, false)
    expect(book.engine.getPage()).toBe(4)
    expect(frames.size).toBe(0)
    book.engine.goTo(7)
    book.engine.destroy()
    expect(frames.size).toBe(0)
  })

  function pointerInput(host: HTMLElement, kind = 'mouse') {
    const stage = host.firstElementChild as HTMLElement
    stage.setPointerCapture = jest.fn()
    stage.hasPointerCapture = jest.fn().mockReturnValue(true)
    stage.releasePointerCapture = jest.fn()
    return (type: string, x: number, y: number, target: HTMLElement = stage) => {
      const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0 })
      Object.defineProperties(event, {
        pointerId: { value: 1 },
        pointerType: { value: kind },
        isPrimary: { value: true },
      })
      target.dispatchEvent(event)
      return event
    }
  }

  test.each([true, false])('the full-height outer page regions turn pages (single: %s)', (single) => {
    const book = createBook({ single, startPage: 3 })
    const input = pointerInput(book.host)
    const right = WIDTH * (single ? 1 : 2) - WIDTH * 0.25
    input('pointerdown', right, HEIGHT / 2)
    input('pointerup', right, HEIGHT / 2)
    finishAnimation()
    expect(book.engine.getPage()).toBe(single ? 4 : 5)
    input('pointerdown', WIDTH * 0.25, HEIGHT / 2)
    input('pointerup', WIDTH * 0.25, HEIGHT / 2)
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)
    book.engine.destroy()
  })

  test('expanded click regions leave controls, text-selection drags and the page center alone', () => {
    const book = createBook({ single: true, startPage: 3 })
    const input = pointerInput(book.host)
    const button = document.createElement('button')
    book.pages[3].appendChild(button)
    input('pointerdown', 350, 300, button)
    input('pointerup', 350, 300, button)
    input('pointerdown', 350, 300)
    input('pointermove', 300, 300)
    input('pointerup', 300, 300)
    input('pointerdown', 200, 300)
    input('pointerup', 200, 300)
    expect(book.engine.getPage()).toBe(3)
    expect(frames.size).toBe(0)
    book.engine.destroy()
  })

  test('slow swipes turn in both directions from scrollable text without a position jump', () => {
    const book = createBook({ single: true, startPage: 3 })
    const input = pointerInput(book.host, 'touch')
    const text = document.createElement('div')
    text.dataset.bookScroll = ''
    Object.defineProperties(text, { scrollHeight: { value: 900 }, clientHeight: { value: 300 } })
    book.pages[3].appendChild(text)

    input('pointerdown', 200, 300, text)
    input('pointermove', 182, 301, text)
    expect(book.onFrame).toHaveBeenLastCalledWith(
      expect.objectContaining({ direction: 'forward', preview: false, progress: expect.any(Number) })
    )
    expect(book.onFrame.mock.calls.at(-1)?.[0].progress).toBeLessThan(0.08)
    jest.spyOn(performance, 'now').mockReturnValue(1600)
    input('pointermove', 120, 305)
    input('pointerup', 120, 305)
    finishAnimation()
    expect(book.engine.getPage()).toBe(4)

    input('pointerdown', 200, 300)
    jest.spyOn(performance, 'now').mockReturnValue(2300)
    input('pointermove', 285, 304)
    input('pointerup', 285, 304)
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)
    book.engine.destroy()
  })

  test('vertical scrolling and cancelled or reversed touch swipes do not change the page', () => {
    const book = createBook({ single: true, startPage: 3 })
    const input = pointerInput(book.host, 'touch')
    input('pointerdown', 200, 300)
    input('pointermove', 198, 380)
    input('pointerup', 198, 380)
    expect(book.engine.getPage()).toBe(3)
    expect(frames.size).toBe(0)

    input('pointerdown', 200, 300)
    input('pointermove', 120, 300)
    input('pointercancel', 120, 300)
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)

    input('pointerdown', 200, 300)
    input('pointermove', 120, 300)
    input('pointermove', 205, 300)
    input('pointerup', 205, 300)
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)
    book.engine.destroy()
  })

  test('opens the cover into the first double-page spread, then advances and returns by spread', () => {
    const book = createBook()
    expect(book.engine.getPage()).toBe(0)
    expect(book.visibleFaces()).toEqual([0])
    expect(book.pages[0]).toHaveClass('--right')
    expect(book.onPage).toHaveBeenLastCalledWith(0)

    book.engine.next()
    expect(book.onTurning).toHaveBeenLastCalledWith(true)
    expect(book.engine.getPage()).toBe(0)
    finishAnimation()
    expect(book.engine.getPage()).toBe(1)
    expect(book.visibleFaces()).toEqual([1, 2])
    expect(book.pages[1]).toHaveClass('--left')
    expect(book.pages[2]).toHaveClass('--right')
    expect(book.onTurning).toHaveBeenLastCalledWith(false)

    book.engine.next()
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)
    expect(book.visibleFaces()).toEqual([3, 4])

    book.engine.previous()
    finishAnimation()
    expect(book.engine.getPage()).toBe(1)
    expect(book.visibleFaces()).toEqual([1, 2])
    book.engine.destroy()
  })

  test('single-page mode shows one face at a time, including both covers', () => {
    const book = createBook({ single: true, startPage: 2 })
    expect(book.engine.getPage()).toBe(2)
    expect(book.visibleFaces()).toEqual([2])
    expect(book.host.firstElementChild).toHaveStyle({ width: `${WIDTH}px` })

    book.engine.next()
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)
    expect(book.visibleFaces()).toEqual([3])

    book.engine.goTo(0, false)
    expect(book.engine.getPage()).toBe(0)
    expect(book.visibleFaces()).toEqual([0])
    book.engine.goTo(PAGE_COUNT - 1, false)
    expect(book.engine.getPage()).toBe(PAGE_COUNT - 1)
    expect(book.visibleFaces()).toEqual([PAGE_COUNT - 1])
    book.engine.destroy()
  })

  test('single-page back cover closes over the last inside page and opens back from it', () => {
    const book = createBook({ single: true, startPage: PAGE_COUNT - 2 })

    book.engine.next()
    const closingFrame = [...frames.values()][0]
    frames.clear()
    closingFrame(1200)
    expect(book.pages[PAGE_COUNT - 2].style.transform).toBe('')
    expect(book.pages[PAGE_COUNT - 1].style.transform).toMatch(/^rotateY\(/)
    expect(book.pages[PAGE_COUNT - 1].style.transformOrigin).toBe('100% 50%')
    finishAnimation()
    expect(book.engine.getPage()).toBe(PAGE_COUNT - 1)

    book.engine.previous()
    const openingFrame = [...frames.values()][0]
    frames.clear()
    openingFrame(1200)
    expect(book.pages[PAGE_COUNT - 1].style.transform).toMatch(/^rotateY\(/)
    expect(book.pages[PAGE_COUNT - 2].style.transform).toBe('')
    finishAnimation()
    expect(book.engine.getPage()).toBe(PAGE_COUNT - 2)
    book.engine.destroy()
  })

  test('single-page front cover closes over the stationary first inside page and opens back from it', () => {
    const book = createBook({ single: true, startPage: 1 })

    book.engine.previous()
    const closingFrame = [...frames.values()][0]
    frames.clear()
    closingFrame(1200)
    expect(book.pages[1].style.transform).toBe('')
    expect(book.pages[1].style.zIndex).toBe('2')
    expect(book.pages[0].style.transform).toMatch(/^rotateY\(-/)
    expect(book.pages[0].style.transformOrigin).toBe('0 50%')
    expect(book.pages[0].style.zIndex).toBe('5')
    finishAnimation()
    expect(book.engine.getPage()).toBe(0)

    book.engine.next()
    const openingFrame = [...frames.values()][0]
    frames.clear()
    openingFrame(1200)
    expect(book.pages[0].style.transform).toMatch(/^rotateY\(-/)
    expect(book.pages[1].style.transform).toBe('')
    finishAnimation()
    expect(book.engine.getPage()).toBe(1)
    book.engine.destroy()
  })

  test.each([true, false])('does not curl the first inside page into the hard front cover (single: %s)', (single) => {
    const book = createBook({ single, startPage: 1 })
    const stage = book.host.firstElementChild!
    book.onFrame.mockClear()

    stage.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 5, clientY: 5 }))
    expect(book.onFrame).not.toHaveBeenCalled()
    expect(stage).not.toHaveClass('bookFlipSoftActive')
    expect(stage.querySelector('.bookFlipMirrorContent')).toBeNull()

    book.engine.previous()
    expect(book.onFrame).toHaveBeenLastCalledWith(expect.objectContaining({ preview: false, direction: 'back' }))
    expect(stage).not.toHaveClass('bookFlipSoftActive')
    finishAnimation()
    expect(book.engine.getPage()).toBe(0)
    book.engine.destroy()
  })

  test.each([true, false])('does not preview a curled corner into the hard back cover (single: %s)', (single) => {
    const book = createBook({ single, startPage: PAGE_COUNT - 2 })
    const stage = book.host.firstElementChild!
    book.onFrame.mockClear()

    stage.dispatchEvent(
      new MouseEvent('pointermove', {
        bubbles: true,
        clientX: WIDTH * (single ? 1 : 2) - 5,
        clientY: 5,
      })
    )
    expect(book.onFrame).not.toHaveBeenCalled()
    expect(stage).not.toHaveClass('bookFlipSoftActive')

    book.engine.next()
    expect(book.onFrame).toHaveBeenLastCalledWith(expect.objectContaining({ preview: false }))
    finishAnimation()
    expect(book.engine.getPage()).toBe(PAGE_COUNT - 1)
    book.engine.destroy()
  })

  test('a vertical touch from a corner scrolls without turning, while a corner tap still turns', () => {
    const book = createBook({ single: true, startPage: 2 })
    const stage = book.host.firstElementChild as HTMLDivElement
    stage.setPointerCapture = jest.fn()
    stage.hasPointerCapture = jest.fn().mockReturnValue(true)
    stage.releasePointerCapture = jest.fn()
    const touch = (type: string, x: number, y: number) => {
      const event = new MouseEvent(type, { bubbles: true, clientX: x, clientY: y, button: 0 })
      Object.defineProperties(event, {
        pointerId: { value: 1 },
        pointerType: { value: 'touch' },
        isPrimary: { value: true },
      })
      stage.dispatchEvent(event)
    }

    book.onFrame.mockClear()
    touch('pointerdown', 395, 5)
    touch('pointermove', 394, 70)
    touch('pointerup', 394, 70)
    expect(book.engine.getPage()).toBe(2)
    expect(book.onFrame).not.toHaveBeenCalled()
    expect(frames.size).toBe(0)

    touch('pointerdown', 395, 5)
    touch('pointerup', 395, 6)
    expect(book.onFrame).toHaveBeenLastCalledWith(expect.objectContaining({ preview: false, direction: 'forward' }))
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)

    touch('pointerdown', 395, 5)
    touch('pointermove', 180, 8)
    touch('pointerup', 180, 8)
    finishAnimation()
    expect(book.engine.getPage()).toBe(4)
    book.engine.destroy()
  })

  test('a short touch drag from the middle leaves the page flat, while a quick swipe turns', () => {
    const book = createBook({ single: true, startPage: 2 })
    const stage = book.host.firstElementChild as HTMLDivElement
    stage.setPointerCapture = jest.fn()
    stage.hasPointerCapture = jest.fn().mockReturnValue(true)
    stage.releasePointerCapture = jest.fn()
    const touch = (type: string, x: number, y: number) => {
      const event = new MouseEvent(type, { bubbles: true, clientX: x, clientY: y, button: 0 })
      Object.defineProperties(event, {
        pointerId: { value: 1 },
        pointerType: { value: 'touch' },
        isPrimary: { value: true },
      })
      stage.dispatchEvent(event)
    }

    book.onFrame.mockClear()
    touch('pointerdown', 180, 300)
    touch('pointermove', 169, 300)
    expect(book.onFrame).toHaveBeenCalledTimes(0)
    expect(frames.size).toBe(0)
    touch('pointerup', 169, 300)
    expect(book.engine.getPage()).toBe(2)

    touch('pointerdown', 350, 300)
    touch('pointermove', 310, 300)
    touch('pointerup', 310, 300)
    finishAnimation()
    expect(book.engine.getPage()).toBe(3)
    book.engine.destroy()
  })

  test('reentering a hovered corner stops its rollback and restores the preview', () => {
    const book = createBook({ single: true, startPage: 2 })
    const stage = book.host.firstElementChild as HTMLDivElement
    const move = (x: number, y: number) =>
      stage.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: x, clientY: y }))

    move(395, 5)
    const entryFrame = [...frames.values()][0]
    frames.clear()
    entryFrame(1200)
    expect(stage).toHaveClass('bookFlipSoftActive')
    move(200, 300)
    expect(frames.size).toBe(1)
    const rollbackFrame = [...frames.values()][0]
    frames.clear()
    rollbackFrame(1070)
    expect(frames.size).toBe(1)

    move(395, 5)
    expect(frames.size).toBe(1)
    const restoredFrame = [...frames.values()][0]
    frames.clear()
    restoredFrame(1200)
    expect(frames.size).toBe(0)
    expect(stage).toHaveClass('bookFlipSoftActive')
    expect(book.onFrame).toHaveBeenLastCalledWith(
      expect.objectContaining({ preview: true, progress: expect.any(Number) })
    )
    book.engine.destroy()
  })

  test.each(['top', 'bottom'] as const)('hover preview enters as a small %s corner curl', (corner) => {
    const book = createBook({ single: true, startPage: 2 })
    const stage = book.host.firstElementChild as HTMLDivElement
    stage.dispatchEvent(
      new MouseEvent('pointermove', { bubbles: true, clientX: 395, clientY: corner === 'top' ? 5 : 595 })
    )
    expect(frames.size).toBe(1)
    const entryFrame = [...frames.values()][0]
    frames.clear()
    entryFrame(1080)
    const enteringProgress = book.onFrame.mock.calls.at(-1)?.[0]?.progress as number
    expect(enteringProgress).toBeGreaterThan(0)
    expect(enteringProgress).toBeLessThan(0.1)
    expect(frames.size).toBe(1)
    const settleFrame = [...frames.values()][0]
    frames.clear()
    settleFrame(1200)
    expect(frames.size).toBe(0)

    const flap = stage.querySelector<HTMLElement>('.bookFlipMirrorContent')
    expect(flap).not.toBeNull()
    const yCoordinates = [...flap!.style.clipPath.matchAll(/-?\d+(?:\.\d+)?px (-?\d+(?:\.\d+)?)px/g)].map((match) =>
      Number(match[1])
    )
    expect(yCoordinates.length).toBeGreaterThanOrEqual(3)
    expect(Math.max(...yCoordinates) - Math.min(...yCoordinates)).toBeLessThan(32)

    const settledProgress = book.onFrame.mock.calls.at(-1)?.[0]?.progress as number
    const shadow = stage.querySelector<HTMLElement>('.bookFlipShadow')!
    expect(Number.parseFloat(shadow.style.height)).toBeLessThan(46)
    expect(Number.parseFloat(shadow.style.width)).toBeLessThan(12)

    const firstClip = flap!.style.clipPath
    stage.dispatchEvent(
      new MouseEvent('pointermove', { bubbles: true, clientX: 370, clientY: corner === 'top' ? 22 : 578 })
    )
    expect(frames.size).toBe(1)
    const followFrame = [...frames.values()][0]
    frames.clear()
    followFrame(1200)
    expect(frames.size).toBe(0)
    expect(book.onFrame.mock.calls.at(-1)?.[0]?.progress).toBeGreaterThan(settledProgress)
    expect(flap!.style.clipPath).not.toBe(firstClip)
    book.engine.destroy()
  })

  test('left-page hover preview mirrors a compact corner curl', () => {
    const book = createBook({ single: false, startPage: 3 })
    const stage = book.host.firstElementChild as HTMLDivElement
    stage.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 5, clientY: 5 }))
    expect(frames.size).toBe(1)
    const entryFrame = [...frames.values()][0]
    frames.clear()
    entryFrame(1200)
    expect(frames.size).toBe(0)
    expect(book.onFrame).toHaveBeenLastCalledWith(expect.objectContaining({ direction: 'back', preview: true }))
    const shadow = stage.querySelector<HTMLElement>('.bookFlipShadow')!
    expect(Number.parseFloat(shadow.style.height)).toBeLessThan(HEIGHT / 2)
    book.engine.destroy()
  })

  test('far navigation crosses all intervening spreads, while immediate navigation reports the destination at once', () => {
    const book = createBook()
    book.engine.goTo(6)
    expect(book.onTurning).toHaveBeenLastCalledWith(true)
    expect(book.onPage).toHaveBeenCalledTimes(1)
    expect(frames.size).toBe(1)
    finishQueuedTurn()
    expect(book.engine.getPage()).toBe(1)
    finishQueuedTurn()
    expect(book.engine.getPage()).toBe(3)
    finishAnimation()
    expect(book.engine.getPage()).toBe(5)
    expect(book.visibleFaces()).toEqual([5, 6])
    expect(book.onPage).toHaveBeenLastCalledWith(5)

    book.engine.goTo(0, false)
    expect(book.engine.getPage()).toBe(0)
    expect(book.visibleFaces()).toEqual([0])
    expect(book.onPage).toHaveBeenLastCalledWith(0)
    expect(frames.size).toBe(0)
    book.engine.destroy()
  })

  test('reduced motion makes controls and default goTo immediate', () => {
    const book = createBook({ reducedMotion: true })
    book.engine.next()
    expect(book.engine.getPage()).toBe(1)
    book.engine.goTo(7)
    expect(book.engine.getPage()).toBe(7)
    expect(book.visibleFaces()).toEqual([7])
    book.engine.previous()
    expect(book.engine.getPage()).toBe(5)
    expect(book.visibleFaces()).toEqual([5, 6])
    expect(book.onTurning).toHaveBeenCalledTimes(1)
    expect(book.onTurning).toHaveBeenLastCalledWith(false)
    expect(book.onFrame.mock.calls.every(([frame]) => frame === null)).toBe(true)
    expect(frames.size).toBe(0)
    book.engine.destroy()
  })

  test('destroy removes the stage, pending frames, and pointer reactions', () => {
    const book = createBook({ startPage: 3 })
    const stage = book.host.firstElementChild!
    book.engine.next()
    expect(frames.size).toBe(1)
    book.engine.destroy()
    expect(book.host.childElementCount).toBe(0)
    expect(stage.isConnected).toBe(false)
    expect(frames.size).toBe(0)
    expect(globalThis.cancelAnimationFrame).toHaveBeenCalled()

    book.onFrame.mockClear()
    book.onPage.mockClear()
    stage.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 790, clientY: 10 }))
    expect(book.onFrame).not.toHaveBeenCalled()
    expect(book.onPage).not.toHaveBeenCalled()
    expect(frames.size).toBe(0)
    expect(() => book.engine.destroy()).not.toThrow()
  })
})
