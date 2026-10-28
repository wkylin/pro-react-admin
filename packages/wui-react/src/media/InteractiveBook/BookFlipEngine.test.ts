import { BookFlipEngine, type BookFlipEngineOptions } from './BookFlipEngine'
import { calculateBookCurl } from './bookCurlGeometry'

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
    pending[0](2000)
    expect(frames.size).toBe(0)
  }

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
    expect(Math.max(...yCoordinates) - Math.min(...yCoordinates)).toBeLessThan(HEIGHT / 2)

    const settledProgress = book.onFrame.mock.calls.at(-1)?.[0]?.progress as number
    const expectedShadow = calculateBookCurl({
      pageWidth: WIDTH,
      pageHeight: HEIGHT,
      corner,
      pointer: { x: WIDTH * (1 - 2 * settledProgress), y: corner === 'top' ? 50 : HEIGHT - 50 },
    }).shadow
    const shadow = stage.querySelector<HTMLElement>('.bookFlipShadow')!
    expect(Number.parseFloat(shadow.style.height)).toBeCloseTo(expectedShadow!.length + 2)
    expect(Number.parseFloat(shadow.style.height)).toBeLessThan(HEIGHT / 2)

    const firstClip = flap!.style.clipPath
    stage.dispatchEvent(
      new MouseEvent('pointermove', { bubbles: true, clientX: 330, clientY: corner === 'top' ? 70 : 530 })
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

  test('far navigation animates its final turn, while immediate navigation reports the destination at once', () => {
    const book = createBook()
    book.engine.goTo(6)
    expect(book.onTurning).toHaveBeenLastCalledWith(true)
    expect(book.onPage).toHaveBeenCalledTimes(1)
    expect(frames.size).toBe(1)
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
