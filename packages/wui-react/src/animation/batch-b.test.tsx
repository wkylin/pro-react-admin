import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import userEvent from '@testing-library/user-event'
jest.mock('motion/react', () => ({ ...jest.requireActual('motion/react'), useReducedMotion: () => true }))
import FlipWords from './FlipWords'
import GradientTracking from './GradientTracking'
import MemoizedStars from './MemoizedStars'
import Meteors from './Meteors'
import MouseTrail from './MouseTrail'
import ScratchToReveal from './ScratchToReveal'
import PointerMove from './PointerMove'

afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
  jest.useRealTimers()
})

test('word rotation handles empty arrays and cancels interval on unmount', () => {
  jest.useFakeTimers()
  const view = render(<FlipWords words={[]} />)
  expect(jest.getTimerCount()).toBe(0)
  view.rerender(<FlipWords words={['First', 'Second']} duration={50} />)
  expect(jest.getTimerCount()).toBeGreaterThan(0)
  act(() => jest.advanceTimersByTime(50))
  expect(view.container.textContent).toContain('Second')
  view.rerender(<FlipWords words={['Only']} />)
  expect(view.container.textContent).toContain('Only')
  view.unmount()
  act(() => jest.runOnlyPendingTimers())
  expect(jest.getTimerCount()).toBe(0)
})

test('gradient tracking uses the button coordinate frame and preserves caller events', () => {
  const move = jest.fn()
  render(
    <GradientTracking onMouseMove={move}>
      Track <strong>child</strong>
    </GradientTracking>
  )
  const button = screen.getByRole('button')
  jest.spyOn(button, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 20 } as DOMRect)
  fireEvent.mouseMove(screen.getByText('child'), { clientX: 40, clientY: 60 })
  expect(button.style.getPropertyValue('--x')).toBe('30px')
  expect(button.style.getPropertyValue('--y')).toBe('40px')
  expect(move).toHaveBeenCalledTimes(1)
})

test('star geometry is deterministic in SSR and supports caller options', () => {
  const random = jest.spyOn(Math, 'random').mockImplementation(() => {
    throw new Error('render randomness')
  })
  const markup = () =>
    renderToString(
      <>
        <MemoizedStars count={3} color="red" size={4} />
        <Meteors starCount={2} />
      </>
    )
  expect(markup()).toBe(markup())
  expect(markup()).toContain('background-color:red')
  random.mockRestore()
  const view = render(<MemoizedStars count={3} />)
  expect(view.container.querySelectorAll('span')).toHaveLength(3)
})

test('mouse trail ignores empty lists, permits decorative alt and clears fading timers', () => {
  jest.useFakeTimers()
  const view = render(
    <MouseTrail items={[]} fadeAnimation>
      Content
    </MouseTrail>
  )
  fireEvent.mouseMove(view.container.firstChild!, { clientX: 500, clientY: 500 })
  view.rerender(
    <MouseTrail items={['one.png']} fadeAnimation>
      Content
    </MouseTrail>
  )
  fireEvent.mouseMove(view.container.firstChild!, { clientX: 500, clientY: 500 })
  expect(view.container.querySelector('img')).toHaveAttribute('alt', '')
  expect(jest.getTimerCount()).toBe(1)
  view.unmount()
  expect(jest.getTimerCount()).toBe(0)
})

test('scratch reveal supports reduced-motion keyboard activation and completes once without canvas support', async () => {
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  const done = jest.fn()
  const add = jest.spyOn(document, 'addEventListener'),
    remove = jest.spyOn(document, 'removeEventListener')
  const view = render(
    <ScratchToReveal width={200} height={100} onComplete={done} revealLabel="Show prize">
      <a href="/prize">Prize</a>
    </ScratchToReveal>
  )
  expect(screen.getByText('Prize').parentElement).toHaveAttribute('inert')
  const button = screen.getByRole('button', { name: 'Show prize' })
  button.focus()
  expect(button).toHaveFocus()
  await userEvent.setup().keyboard('{Enter}')
  expect(done).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('link', { name: 'Prize' })).toBeVisible()
  fireEvent.mouseUp(document)
  expect(done).toHaveBeenCalledTimes(1)
  view.unmount()
  for (const [event, handler] of add.mock.calls.filter(([event]) =>
    ['mousemove', 'touchmove', 'mouseup', 'touchend', 'touchcancel'].includes(event)
  )) {
    expect(remove).toHaveBeenCalledWith(event, handler)
  }
})

test('pointer effect removes its listener and cancels queued frames', () => {
  const raf = jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(123)
  const cancel = jest.spyOn(window, 'cancelAnimationFrame')
  const remove = jest.spyOn(window, 'removeEventListener')
  const view = render(<PointerMove />)
  fireEvent.pointerMove(window, { clientX: 10, clientY: 20 })
  expect(raf).toHaveBeenCalled()
  view.unmount()
  expect(cancel).toHaveBeenCalledWith(123)
  expect(remove).toHaveBeenCalledWith('pointermove', expect.any(Function))
})

test('star and meteor server markup hydrates without recoverable errors', async () => {
  const content = (
    <>
      <MemoizedStars count={3} />
      <Meteors starCount={2} />
    </>
  )
  const container = document.createElement('div')
  container.innerHTML = renderToString(content)
  document.body.append(container)
  const error = jest.fn()
  let root: ReturnType<typeof hydrateRoot>
  await act(async () => {
    root = hydrateRoot(container, content, { onRecoverableError: error })
  })
  expect(error).not.toHaveBeenCalled()
  act(() => root.unmount())
  container.remove()
})
