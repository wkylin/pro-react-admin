import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import AlternatingText from './AlternatingText'
import AnimateRipple from './AnimateRipple'
import AnimateOnScreen from './AnimateOnScreen'
import AnimText from './AnimText'
import AnimatedBackground from './AnimBackground'
import DynamicBackground from './DynamicBackground'
import BackgroundBeams from './BackgroundBeams'
import FlipLink from './FlipLink'
import ColorfulText from './ColorfulText'

afterEach(() => {
  cleanup()
  jest.useRealTimers()
  jest.restoreAllMocks()
})

test('alternating text supports empty content, a custom interval, changing lists and cleanup', () => {
  jest.useFakeTimers()
  const view = render(<AlternatingText alternateText={[]} placeholder="Waiting" interval={40} />)
  expect(screen.getByText('Waiting')).toBeInTheDocument()
  view.rerender(<AlternatingText alternateText={['First', 'Second']} interval={40} />)
  act(() => jest.advanceTimersByTime(40))
  expect(screen.getByText('Second')).toBeInTheDocument()
  view.rerender(<AlternatingText alternateText={['Only']} interval={40} />)
  expect(screen.getByText('Only')).toBeInTheDocument()
  view.unmount()
  expect(jest.getTimerCount()).toBe(0)
})

test('ripple preserves classes and caller events and clears repeated-click work', () => {
  jest.useFakeTimers()
  const onClick = jest.fn()
  const view = render(
    <AnimateRipple className="custom" onClick={onClick}>
      Run
    </AnimateRipple>
  )
  const button = screen.getByRole('button', { name: 'Run' })
  fireEvent.click(button)
  fireEvent.click(button)
  expect(onClick).toHaveBeenCalledTimes(2)
  expect(button).toHaveClass('custom')
  expect(jest.getTimerCount()).toBe(1)
  view.unmount()
  expect(jest.getTimerCount()).toBe(0)
})

test('letter animation cancels its delayed hover switch', () => {
  jest.useFakeTimers()
  const view = render(<AnimText animText="Text" />)
  expect(jest.getTimerCount()).toBe(1)
  view.unmount()
  expect(jest.getTimerCount()).toBe(0)
})

test('screen animation remains visible without IntersectionObserver', () => {
  const previous = globalThis.IntersectionObserver
  // Older browsers must still expose content.
  Reflect.deleteProperty(globalThis, 'IntersectionObserver')
  const view = render(<AnimateOnScreen.FadeIn>Readable</AnimateOnScreen.FadeIn>)
  expect(screen.getByText('Readable')).toHaveStyle({ opacity: 1 })
  view.unmount()
  globalThis.IntersectionObserver = previous
})

test('background selection composes caller handlers and responds to keyboard and focus', () => {
  const onClick = jest.fn()
  const onFocus = jest.fn()
  const onKeyDown = jest.fn()
  const onValueChange = jest.fn()
  render(
    <AnimatedBackground onValueChange={onValueChange}>
      <button data-id="one" onClick={onClick} onFocus={onFocus} onKeyDown={onKeyDown}>
        One
      </button>
    </AnimatedBackground>
  )
  const button = screen.getByRole('button', { name: 'One' })
  fireEvent.focus(button)
  expect(onFocus).toHaveBeenCalledTimes(1)
  fireEvent.keyDown(button, { key: ' ' })
  expect(onKeyDown).toHaveBeenCalledTimes(1)
  fireEvent.click(button)
  expect(onClick).toHaveBeenCalledTimes(1)
  expect(onValueChange).toHaveBeenLastCalledWith('one')
  expect(button).toHaveAttribute('data-checked', 'true')
})

test('dynamic background cancels pending initialization, pointer debounce and listeners', () => {
  jest.useFakeTimers()
  const remove = jest.spyOn(window, 'removeEventListener')
  const view = render(<DynamicBackground items={[{ icon: '★' }]}>Content</DynamicBackground>)
  act(() => jest.runOnlyPendingTimers())
  fireEvent.mouseMove(screen.getByText('Content').parentElement!, { clientX: 10, clientY: 20 })
  view.unmount()
  expect(jest.getTimerCount()).toBe(0)
  expect(remove).toHaveBeenCalledWith('resize', expect.any(Function))
})

test('beam gradient identifiers are instance safe', () => {
  const view = render(
    <>
      <BackgroundBeams />
      <BackgroundBeams />
    </>
  )
  const ids = Array.from(view.container.querySelectorAll('[id]')).map((node) => node.id)
  expect(new Set(ids).size).toBe(ids.length)
})

test('animated text exposes a single accessible name and links keep native attributes', () => {
  render(
    <>
      <ColorfulText text="Colorful words" />
      <FlipLink href="/next" target="_self">
        Next page
      </FlipLink>
    </>
  )
  expect(screen.getByText('Colorful words')).toBeInTheDocument()
  const link = screen.getByRole('link', { name: 'Next page' })
  expect(link).toHaveAttribute('href', '/next')
  expect(link).toHaveAttribute('target', '_self')
  expect(link.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2)
})

test('screen observer disconnects on unmount and trigger-once intersection', () => {
  const previous = globalThis.IntersectionObserver
  const disconnect = jest.fn()
  const observe = jest.fn()
  let callback: IntersectionObserverCallback = () => {}
  globalThis.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      callback = cb
    }
    observe = observe
    disconnect = disconnect
  } as unknown as typeof IntersectionObserver
  const view = render(
    <AnimateOnScreen.FadeUp triggerOnce threshold={0.5}>
      Visible once
    </AnimateOnScreen.FadeUp>
  )
  expect(observe).toHaveBeenCalledTimes(1)
  act(() =>
    callback([{ isIntersecting: true, intersectionRatio: 1 } as IntersectionObserverEntry], {} as IntersectionObserver)
  )
  expect(disconnect).toHaveBeenCalledTimes(1)
  view.unmount()
  expect(disconnect).toHaveBeenCalledTimes(2)
  globalThis.IntersectionObserver = previous
})

test('selection makes generic elements keyboard reachable without cancelling native links', () => {
  const onValueChange = jest.fn()
  render(
    <AnimatedBackground onValueChange={onValueChange}>
      <div data-id="custom">Custom choice</div>
      <a data-id="native" href="/next">
        Native link
      </a>
    </AnimatedBackground>
  )
  const custom = screen.getByRole('button', { name: 'Custom choice' })
  expect(custom).toHaveAttribute('tabindex', '0')
  fireEvent.keyDown(custom, { key: ' ' })
  expect(onValueChange).toHaveBeenLastCalledWith('custom')
  expect(fireEvent.keyDown(screen.getByRole('link'), { key: 'Enter' })).toBe(true)
})
