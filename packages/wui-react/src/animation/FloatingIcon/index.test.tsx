import { act, render, screen } from '@testing-library/react'

const start = jest.fn((..._args: unknown[]) => new Promise<void>(() => {}))
const stop = jest.fn()
jest.mock('framer-motion', () => {
  const React = require('react')
  const controls = { start: (...args: unknown[]) => start(...args), stop: () => stop() }
  return {
    useAnimation: () => controls,
    motion: { div: ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children) },
  }
})

jest.mock('../../AnimatedIcon', () => ({
  __esModule: true,
  default: ({ children }: { children: import('react').ReactNode }) => children,
}))

const { default: FloatingIcon, SocialIcon } = require('./index') as typeof import('./index')

afterEach(() => {
  jest.useRealTimers()
  jest.clearAllMocks()
})

test('floating animation cancels startup and stops controls on unmount', () => {
  jest.useFakeTimers()
  const first = render(<FloatingIcon>First</FloatingIcon>)
  first.unmount()
  act(() => jest.runOnlyPendingTimers())
  expect(start).not.toHaveBeenCalled()
  expect(stop).toHaveBeenCalledTimes(1)
  const second = render(<FloatingIcon initialX={20}>Second</FloatingIcon>)
  act(() => jest.runOnlyPendingTimers())
  expect(start).toHaveBeenCalledTimes(1)
  second.unmount()
  expect(stop).toHaveBeenCalledTimes(2)
})

test('social icon publishes a caller-provided accessible name and CSS color', () => {
  render(<SocialIcon icon={() => <svg />} label="Mail" color="red" />)
  expect(screen.getByRole('img', { name: 'Mail' }).style.backgroundColor).toBe('red')
})
