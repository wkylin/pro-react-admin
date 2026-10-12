import { act, fireEvent, render, screen } from '@testing-library/react'
import { useRef, type ComponentProps } from 'react'
import MagicTrail from './index'

function Example({ explicit = false, ...props }: ComponentProps<typeof MagicTrail> & { explicit?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} data-testid="event-owner">
      <div data-testid="host" style={{ position: 'relative' }}>
        <MagicTrail {...props} containerRef={explicit ? ref : undefined} />
        <button type="button">Underlying control</button>
      </div>
    </div>
  )
}

describe('MagicTrail', () => {
  const originalResizeObserver = globalThis.ResizeObserver
  let frames: Map<number, FrameRequestCallback>
  let nextFrame: number
  let canvasRect: DOMRect
  let resize: ResizeObserverCallback
  const observe = jest.fn()
  const disconnect = jest.fn()
  const addColorStop = jest.fn()
  const ctx = {
    clearRect: jest.fn(),
    scale: jest.fn(),
    setTransform: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    createLinearGradient: jest.fn(() => ({ addColorStop })),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    frames = new Map()
    nextFrame = 0
    canvasRect = { left: 100, top: 50, width: 400, height: 240 } as DOMRect
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.set(++nextFrame, callback)
      return nextFrame
    })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id))
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D)
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      return this.dataset.testid === 'event-owner'
        ? ({ left: 0, top: 0, width: 800, height: 600 } as DOMRect)
        : canvasRect
    })
    jest.replaceProperty(window, 'devicePixelRatio', 2)
    globalThis.ResizeObserver = jest.fn((callback) => {
      resize = callback
      return { observe, disconnect }
    }) as unknown as typeof ResizeObserver
  })

  afterEach(() => {
    jest.restoreAllMocks()
    globalThis.ResizeObserver = originalResizeObserver
  })

  function tick(count = 1) {
    act(() => {
      for (let i = 0; i < count; i++) {
        const pending = [...frames.values()]
        frames.clear()
        pending.forEach((callback) => callback(i * 16))
      }
    })
  }

  function move(x: number, y: number, target = screen.getByTestId('host')) {
    fireEvent.mouseMove(target, { clientX: canvasRect.left + x, clientY: canvasRect.top + y })
    tick()
  }

  test('stays idle before input and draws a trail and particles from host mouse movement', () => {
    render(<Example smoothing={1} />)
    expect(frames.size).toBe(0)
    expect(ctx.stroke).not.toHaveBeenCalled()
    move(80, 40)
    move(160, 90)
    expect(ctx.moveTo).toHaveBeenCalledWith(80, 40)
    expect(ctx.lineTo).toHaveBeenCalledWith(160, 90)
    expect(ctx.fill).toHaveBeenCalled()
    expect(ctx.arc).toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeEnabled()
  })

  test('uses canvas coordinates with an explicit ancestor ref and ignores positions outside the canvas', () => {
    render(<Example explicit smoothing={1} />)
    move(-10, 20, screen.getByTestId('event-owner'))
    expect(ctx.fill).not.toHaveBeenCalled()
    move(80, 40, screen.getByRole('button'))
    move(160, 90, screen.getByRole('button'))
    expect(ctx.moveTo).toHaveBeenCalledWith(80, 40)
    expect(ctx.lineTo).toHaveBeenCalledWith(160, 90)
  })

  test('accepts CSS color formats and an empty palette without invalid color stops', () => {
    const color = 'rgb(99, 102, 241)'
    const { rerender } = render(<Example explicit colors={[color]} smoothing={1} />)
    move(80, 40)
    move(160, 90)
    expect(addColorStop).toHaveBeenCalledWith(0, color)
    expect(addColorStop).toHaveBeenCalledWith(1, color)
    addColorStop.mockClear()
    rerender(<Example explicit colors={[]} smoothing={1} />)
    move(80, 40)
    move(160, 90)
    expect(addColorStop).toHaveBeenCalled()
    expect(addColorStop.mock.calls.every(([, value]) => typeof value === 'string' && value.length > 0)).toBe(true)
  })

  test('tracks container resizing at device pixel resolution and cleans up on unmount', () => {
    const { container, unmount } = render(<Example />)
    const canvas = container.querySelector('canvas')!
    expect(canvas.width).toBe(800)
    expect(canvas.height).toBe(480)
    expect(observe).toHaveBeenCalled()
    canvasRect = { ...canvasRect, width: 300, height: 180 }
    act(() => resize([], {} as ResizeObserver))
    expect(canvas.width).toBe(600)
    expect(canvas.height).toBe(360)
    move(80, 40)
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(frames.size).toBe(0)
  })

  test('lets a stationary trail fade and stops scheduling frames until the next movement', () => {
    render(<Example smoothing={1} particleCount={0} decay={0.5} />)
    move(80, 40)
    move(160, 90)
    tick(100)
    expect(ctx.stroke).toHaveBeenCalled()
    expect(ctx.fill).not.toHaveBeenCalled()
    expect(frames.size).toBe(0)
    ctx.stroke.mockClear()
    move(200, 100)
    move(250, 120)
    expect(ctx.stroke).toHaveBeenCalled()
    fireEvent.mouseLeave(screen.getByTestId('host'))
    tick(100)
    expect(frames.size).toBe(0)
  })
})
