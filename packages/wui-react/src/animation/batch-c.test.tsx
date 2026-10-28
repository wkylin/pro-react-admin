import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import TypedText from './TypedText'
import TypeWriter from './TypeWriter'
import SlideButton from './SlideButton'
import SparklesText from './SparklesText'
import StarBackground from './StarBackground'
import WordRotate from './WordRotate'
import SlideText from './SlideText'
import TextLoader from './TextLoader'
import TextClip from './TextClip'
import ThreeDCard from './ThreeDCard'
import ShiftingCard from './ShiftingCard'
import SquaresGrid from './SquaresGrid'

afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
  jest.useRealTimers()
})

test('TypedText resets on input changes, completes and clears timers', () => {
  jest.useFakeTimers()
  const view = render(<TypedText delay={10}>Hello</TypedText>)
  expect(screen.getByLabelText('Hello')).toBeInTheDocument()
  act(() => jest.advanceTimersByTime(20))
  expect(view.container.textContent).toContain('He')
  view.rerender(<TypedText delay={10}>New</TypedText>)
  expect(view.container.textContent).toBe('|')
  act(() => jest.advanceTimersByTime(30))
  expect(view.container.textContent).toContain('New')
  expect(jest.getTimerCount()).toBe(0)
  view.unmount()
  expect(jest.getTimerCount()).toBe(0)
})

test('empty animation lists do not create timers and changed lists stay valid', () => {
  jest.useFakeTimers()
  const view = render(
    <>
      <WordRotate words={[]} />
      <SlideText text={[]} />
      <TextLoader messages={[]} />
      <TextClip items={[]} />
      <TypeWriter text={[]} showCursor={false} />
    </>
  )
  expect(jest.getTimerCount()).toBe(0)
  view.rerender(
    <WordRotate words={['First', 'Second']} duration={20} motionProps={{ initial: false, animate: { opacity: 1 } }} />
  )
  act(() => jest.advanceTimersByTime(20))
  expect(view.container.textContent).toContain('Second')
  view.rerender(<WordRotate words={['Only']} motionProps={{ initial: false, animate: { opacity: 1 } }} />)
  expect(view.container.textContent).toContain('Only')
  view.unmount()
  act(() => jest.runOnlyPendingTimers())
  expect(jest.getTimerCount()).toBe(0)
})

test('TypeWriter exposes complete text and resets when text changes', () => {
  jest.useFakeTimers()
  const view = render(<TypeWriter text="Complete sentence" speed={10} showCursor={false} />)
  expect(screen.getByLabelText('Complete sentence')).toBeInTheDocument()
  act(() => jest.advanceTimersByTime(10))
  view.rerender(<TypeWriter text="Replacement" speed={10} showCursor={false} />)
  expect(screen.getByLabelText('Replacement')).toBeInTheDocument()
  view.unmount()
  act(() => jest.runOnlyPendingTimers())
  expect(jest.getTimerCount()).toBe(0)
})

test('SlideButton supports Enter and Space and native disabled behavior', async () => {
  const click = jest.fn()
  const user = userEvent.setup()
  const view = render(<SlideButton onClick={click}>Continue</SlideButton>)
  const button = screen.getByRole('button', { name: 'Continue' })
  button.focus()
  await user.keyboard('{Enter} ')
  expect(click).toHaveBeenCalledTimes(2)
  view.rerender(
    <SlideButton disabled onClick={click}>
      Continue
    </SlideButton>
  )
  await user.click(button)
  expect(click).toHaveBeenCalledTimes(2)
})

test('sparkle and star markup have no render randomness and hydrate cleanly', async () => {
  const random = jest.spyOn(Math, 'random').mockImplementation(() => {
    throw new Error('render randomness')
  })
  const content = (
    <>
      <SparklesText text="Shine" sparklesCount={2} />
      <StarBackground count={2} mediumCount={1} bigCount={1} />
    </>
  )
  const html = renderToString(content)
  expect(html).toBe(renderToString(content))
  random.mockRestore()
  const node = document.createElement('div')
  node.innerHTML = html
  document.body.append(node)
  const error = jest.fn()
  let root: ReturnType<typeof hydrateRoot>
  await act(async () => {
    root = hydrateRoot(node, content, { onRecoverableError: error })
  })
  expect(error).not.toHaveBeenCalled()
  await act(async () => root!.unmount())
  node.remove()
})

test('ThreeDCard uses synchronous batched events without queued frames', () => {
  const raf = jest.spyOn(window, 'requestAnimationFrame')
  const view = render(<ThreeDCard title="Card" />)
  const card = view.container.firstElementChild as HTMLElement
  jest.spyOn(card, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 200, height: 280 } as DOMRect)
  fireEvent.mouseMove(card, { clientX: 150, clientY: 100 })
  expect(card.style.transform).toContain('rotateY(12.5deg)')
  fireEvent.mouseLeave(card)
  expect(card.style.transform).toContain('rotateY(0deg)')
  expect(raf).not.toHaveBeenCalled()
})

test('ShiftingCard cleans listeners and uses viewport coordinates', () => {
  const view = render(<ShiftingCard>Custom content</ShiftingCard>)
  const card = view.container.firstElementChild as HTMLElement
  const remove = jest.spyOn(card, 'removeEventListener')
  fireEvent.mouseMove(card, { clientX: 120, clientY: 180 })
  expect(card.style.getPropertyValue('--dx')).toBe('0')
  expect(card.textContent).toBe('Custom content')
  view.unmount()
  expect(remove).toHaveBeenCalledWith('mousemove', expect.any(Function))
  expect(remove).toHaveBeenCalledWith('mouseleave', expect.any(Function))
})

test('SquaresGrid cancels canvas frame and resize observer on unmount', () => {
  const disconnect = jest.fn()
  const original = globalThis.ResizeObserver
  globalThis.ResizeObserver = jest.fn(() => ({ observe: jest.fn(), disconnect })) as unknown as typeof ResizeObserver
  const ctx = {
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    createRadialGradient: () => ({ addColorStop: jest.fn() }),
  }
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D)
  const raf = jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(123)
  const cancel = jest.spyOn(window, 'cancelAnimationFrame')
  const view = render(<SquaresGrid squareSize={0} />)
  expect(raf).toHaveBeenCalledTimes(1)
  expect(view.container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true')
  view.unmount()
  expect(disconnect).toHaveBeenCalledTimes(1)
  expect(cancel).toHaveBeenCalledWith(123)
  globalThis.ResizeObserver = original
})
