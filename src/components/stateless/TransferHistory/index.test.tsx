import { act, fireEvent, render, screen } from '@testing-library/react'

jest.doMock('@src/theme/hooks', () => ({ useProThemeContext: () => ({ resolvedTheme: 'light' }) }))
jest.doMock('./index.module.less', () => ({
  __esModule: true,
  default: new Proxy({}, { get: (_target, key) => key }),
}))
const TransferHistory = require('./index').default as typeof import('./index').default

describe('TransferHistory connectors', () => {
  const originalResizeObserver = globalThis.ResizeObserver
  let frames: Map<number, FrameRequestCallback>
  let nextFrame: number
  const disconnect = jest.fn()

  beforeEach(() => {
    frames = new Map()
    nextFrame = 0
    disconnect.mockClear()
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.set(++nextFrame, callback)
      return nextFrame
    })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id))
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
      const rows = [...document.querySelectorAll('.subItemContainer')]
      const index = rows.indexOf(this)
      return { top: 100 + index * 137, height: 62 } as DOMRect
    })
    globalThis.ResizeObserver = jest.fn(() => ({ observe: jest.fn(), disconnect })) as unknown as typeof ResizeObserver
  })

  afterEach(() => {
    jest.restoreAllMocks()
    globalThis.ResizeObserver = originalResizeObserver
  })

  function flushFrames() {
    act(() => {
      for (let i = 0; i < 3; i++) {
        const pending = [...frames.values()]
        frames.clear()
        pending.forEach((callback) => callback(0))
      }
    })
  }

  test('shows real expand/collapse icons and toggles the company list', () => {
    render(<TransferHistory />)
    const button = screen.getByRole('button', { name: /展开全部公司/ })
    expect(button.querySelector('svg[data-icon="down"]')).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(button)
    expect(screen.getByText('第四家公司')).toBeInTheDocument()
    expect(screen.getByText('第五家公司')).toBeInTheDocument()
    const collapse = screen.getByRole('button', { name: /收起部分公司/ })
    expect(collapse.querySelector('svg[data-icon="up"]')).toBeInTheDocument()
    expect(collapse).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(collapse)
    expect(screen.queryByText('第四家公司')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /展开全部公司/ }).querySelector('svg[data-icon="down"]')
    ).toBeInTheDocument()
  })

  test('ends the vertical connector at the last company on mount, toggle and count changes', () => {
    const { container, rerender } = render(<TransferHistory />)
    const connector = () => container.querySelector('.verticalConnector')
    flushFrames()
    expect(connector()).toHaveStyle({ height: '274px' })
    fireEvent.click(screen.getByRole('button', { name: /展开全部公司/ }))
    flushFrames()
    expect(connector()).toHaveStyle({ height: '548px' })
    fireEvent.click(screen.getByRole('button', { name: /收起部分公司/ }))
    flushFrames()
    expect(connector()).toHaveStyle({ height: '274px' })
    rerender(<TransferHistory defaultDisplayCount={2} />)
    flushFrames()
    expect(connector()).toHaveStyle({ height: '137px' })
  })

  test('cancels scheduled measurements and disconnects size tracking on unmount', () => {
    const { unmount } = render(<TransferHistory />)
    expect(frames.size).toBeGreaterThan(0)
    unmount()
    expect(frames.size).toBe(0)
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
