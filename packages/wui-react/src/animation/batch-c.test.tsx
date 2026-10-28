import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import TypedText from './TypedText'
import TextReveal from './TextReveal'
import Spotlight from './Spotlight'
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
  expect(screen.getByText('Hello').closest('[aria-hidden]')).toBeNull()
  expect(screen.getByText('Hello')).toHaveClass('wui-animation-complete-text')
  expect(screen.getByText('Hello').firstChild?.nodeType).toBe(Node.TEXT_NODE)
  act(() => jest.advanceTimersByTime(20))
  expect(view.container.textContent).toContain('He')
  view.rerender(<TypedText delay={10}>New</TypedText>)
  expect(view.container.querySelector('[aria-hidden="true"]')?.textContent).toBe('|')
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
  expect(screen.getByText('Complete sentence').closest('[aria-hidden]')).toBeNull()
  expect(screen.getByText('Complete sentence')).toHaveClass('wui-animation-complete-text')
  expect(screen.getByText('Complete sentence').firstChild?.nodeType).toBe(Node.TEXT_NODE)
  act(() => jest.advanceTimersByTime(10))
  view.rerender(<TypeWriter text="Replacement" speed={10} showCursor={false} />)
  expect(screen.getByText('Replacement').closest('[aria-hidden]')).toBeNull()
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
  const view = render(
    <ShiftingCard style={{ backgroundImage: 'url("/caller-card.png")' }}>Custom content</ShiftingCard>
  )
  const card = view.container.firstElementChild as HTMLElement
  const remove = jest.spyOn(card, 'removeEventListener')
  fireEvent.mouseMove(card, { clientX: 120, clientY: 180 })
  expect(card.style.getPropertyValue('--dx')).toBe('0')
  expect(card.textContent).toBe('Custom content')
  expect(card.style.backgroundImage).toBe('url("/caller-card.png")')
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

test('TextReveal exposes one complete ordinary text node before hidden visual words', () => {
  const view = render(<TextReveal text="A complete readable sentence" />)
  const text = screen.getByText('A complete readable sentence')
  expect(text.closest('[aria-hidden]')).toBeNull()
  expect(text).toHaveClass('wui-animation-complete-text')
  expect(text.firstChild?.nodeType).toBe(Node.TEXT_NODE)
  expect(text.parentElement?.firstElementChild).toBe(text)
  expect(view.container.querySelectorAll('[aria-label]')).toHaveLength(0)
  expect(view.container.querySelector('[class*="xl:lg-3"]')).toBeNull()
  expect(view.container.querySelectorAll('p > [aria-hidden="true"]')).toHaveLength(4)
})

test('Spotlight composes all caller mouse and focus handlers with its effect', () => {
  const handlers = {
    onMouseMove: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
  }
  const view = render(
    <Spotlight {...handlers} data-testid="spotlight">
      <button>Child</button>
    </Spotlight>
  )
  const card = screen.getByTestId('spotlight')
  jest.spyOn(card, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 20 } as DOMRect)
  const layer = card.firstElementChild as HTMLElement
  fireEvent.mouseEnter(card)
  expect(layer.style.opacity).toBe('1')
  fireEvent.mouseMove(card, { clientX: 40, clientY: 70 })
  expect(layer.style.background).toContain('30px 50px')
  fireEvent.focus(screen.getByRole('button'))
  expect(layer.style.opacity).toBe('1')
  fireEvent.blur(screen.getByRole('button'))
  expect(layer.style.opacity).toBe('0')
  fireEvent.mouseLeave(card)
  for (const handler of Object.values(handlers)) expect(handler).toHaveBeenCalledTimes(1)
  expect(view.container.textContent).toBe('Child')
})
