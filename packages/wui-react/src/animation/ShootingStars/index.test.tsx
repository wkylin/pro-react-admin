import { act, render } from '@testing-library/react'
import ShootingStars from './index'

describe('ShootingStars', () => {
  const originalResizeObserver = globalThis.ResizeObserver
  let frames: Map<number, FrameRequestCallback>
  let nextFrame: number
  let width: number
  let height: number
  let resize: ResizeObserverCallback
  const disconnect = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    frames = new Map()
    nextFrame = 0
    width = 320
    height = 180
    disconnect.mockClear()
    jest.replaceProperty(window, 'innerWidth', 1440)
    jest.replaceProperty(window, 'innerHeight', 900)
    jest.spyOn(SVGElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({ width, height }) as DOMRect)
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.set(++nextFrame, callback)
      return nextFrame
    })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id))
    globalThis.ResizeObserver = jest.fn((callback) => {
      resize = callback
      return { observe: jest.fn(), disconnect }
    }) as unknown as typeof ResizeObserver
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
    globalThis.ResizeObserver = originalResizeObserver
  })

  test.each([0.1, 0.3, 0.6, 0.9])('spawns inside the actual SVG for random side %s', (side) => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(side).mockReturnValue(0.9)
    const { container } = render(<ShootingStars />)
    const star = container.querySelector('rect')!
    expect(star).toBeInTheDocument()
    expect(Number(star.getAttribute('x'))).toBeGreaterThanOrEqual(0)
    expect(Number(star.getAttribute('x'))).toBeLessThanOrEqual(width)
    expect(Number(star.getAttribute('y'))).toBeGreaterThanOrEqual(0)
    expect(Number(star.getAttribute('y'))).toBeLessThanOrEqual(height)
  })

  test('moves a star into the preview and removes it after it exits', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.1).mockReturnValue(0.5)
    const { container } = render(<ShootingStars minSpeed={10} maxSpeed={10} />)
    function tick(count: number) {
      act(() => {
        for (let i = 0; i < count; i++) {
          const pending = [...frames.values()]
          frames.clear()
          pending.forEach((callback) => callback(i * 16))
        }
      })
    }
    tick(1)
    const star = container.querySelector('rect')!
    expect(Number(star.getAttribute('x'))).toBeGreaterThan(160)
    expect(Number(star.getAttribute('y'))).toBeGreaterThan(0)
    tick(60)
    expect(container.querySelector('rect')).not.toBeInTheDocument()
    expect(frames.size).toBe(0)
  })

  test('uses independent gradients when multiple previews are mounted', () => {
    const { container } = render(
      <>
        <ShootingStars starColor="red" />
        <ShootingStars starColor="gold" />
      </>
    )
    const gradients = [...container.querySelectorAll('linearGradient')]
    const stars = [...container.querySelectorAll('rect')]
    expect(gradients[0].id).not.toBe(gradients[1].id)
    stars.forEach((star, index) => expect(star).toHaveAttribute('fill', `url(#${gradients[index].id})`))
  })

  test('waits for a measurable container and uses its current dimensions on resize', () => {
    width = 0
    height = 0
    jest.spyOn(Math, 'random').mockReturnValue(0.3)
    const { container } = render(<ShootingStars minDelay={100} maxDelay={100} />)
    expect(container.querySelector('rect')).not.toBeInTheDocument()
    width = 240
    height = 120
    act(() => resize([], {} as ResizeObserver))
    expect(container.querySelector('rect')).toHaveAttribute('x', '240')
    width = 480
    height = 260
    act(() => {
      resize([], {} as ResizeObserver)
      jest.advanceTimersByTime(100)
    })
    expect(container.querySelector('rect')).toHaveAttribute('x', '480')
  })

  test('keeps one spawn timer across settings changes and releases all animation work on unmount', () => {
    const { unmount, rerender } = render(<ShootingStars minDelay={100} maxDelay={100} />)
    expect(jest.getTimerCount()).toBe(1)
    rerender(<ShootingStars minDelay={200} maxDelay={200} />)
    expect(jest.getTimerCount()).toBe(1)
    unmount()
    expect(jest.getTimerCount()).toBe(0)
    expect(frames.size).toBe(0)
    expect(disconnect).toHaveBeenCalledTimes(2)
  })
})
