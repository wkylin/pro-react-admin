import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { createRef } from 'react'
import TreeList, { type TreeListRef, type TreeListResponse } from './TreeList'
import UserIP, { type UserIPData } from './UserIP'
import SvgPreview from './SvgPreview'
import { sanitizeSvg } from './SvgPreview/sanitize'
import CopyToClipboard from './CopyToClipboard'
import ContentPlaceholder from './ContentPlaceholder'
import ClockFace from './ClockFace'
import NumberViewCard from './NumberViewCard'
import ApiStateHandler from './ApiStateHandler'

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as typeof ResizeObserver
})
afterEach(() => {
  jest.useRealTimers()
})

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}

test('TreeList aborts stale loaders, reports rejection and tolerates empty results', async () => {
  const first = deferred<TreeListResponse>()
  const second = deferred<TreeListResponse>()
  const signals: AbortSignal[] = []
  const getTreeList = jest.fn((_params, signal: AbortSignal) => {
    signals.push(signal)
    return signals.length === 1 ? first.promise : second.promise
  })
  const onError = jest.fn()
  const select = jest.fn()
  const ref = createRef<TreeListRef>()
  const { unmount } = render(
    <TreeList ref={ref} getTreeList={getTreeList} setSelectedKeys={select} selectable onError={onError} />
  )
  await waitFor(() => expect(getTreeList).toHaveBeenCalledTimes(1))
  act(() => ref.current!.updateTree())
  await waitFor(() => expect(getTreeList).toHaveBeenCalledTimes(2))
  expect(signals[0].aborted).toBe(true)
  await act(async () => {
    second.resolve({ status: 1, data: [] })
  })
  expect(ref.current!.treeData).toEqual([])
  await act(async () => {
    first.resolve({ status: 1, data: [{ id: 'old', pid: null, name: 'Stale' }] })
  })
  expect(screen.queryByText('Stale')).not.toBeInTheDocument()
  unmount()
  expect(signals[1].aborted).toBe(true)
  const fail = jest.fn().mockRejectedValue(new Error('failed'))
  render(<TreeList getTreeList={fail} setSelectedKeys={select} onError={onError} />)
  await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

test('UserIP uses caller data, ignores late responses, retries with an abortable signal', async () => {
  const first = deferred<UserIPData>()
  const onError = jest.fn()
  let firstSignal!: AbortSignal
  const loader = jest.fn((signal: AbortSignal) => {
    firstSignal = signal
    return first.promise
  })
  const { rerender, unmount } = render(<UserIP loadInfo={loader} onError={onError} />)
  await waitFor(() => expect(loader).toHaveBeenCalledTimes(1))
  rerender(<UserIP data={{ ip: '203.0.113.2' }} loadInfo={loader} onError={onError} />)
  expect(firstSignal.aborted).toBe(true)
  await act(async () => first.resolve({ ip: 'old' }))
  expect(screen.getByText('203.0.113.2')).toBeInTheDocument()
  expect(screen.queryByText('old')).toBeNull()
  const retry = jest.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue({ ip: '198.51.100.3' })
  rerender(<UserIP loadInfo={retry} onError={onError} />)
  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
  await screen.findByText('198.51.100.3')
  expect(retry).toHaveBeenCalledTimes(2)
  unmount()
  expect(retry.mock.calls[1][0].aborted).toBe(true)
})

test('SVG sanitizer removes script, HTML, links, event handlers and external resources', () => {
  const safe = sanitizeSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><script>alert(1)</script><foreignObject><iframe src="https://bad.test"></iframe></foreignObject><image href="https://bad.test/image"/><a href="javascript:alert(1)"><text>x</text></a><rect width="20" fill="url(https://bad.test/x)"/><path d="M0 0 L10 10"/></svg>'
  )
  expect(safe).toContain('<path')
  expect(safe).not.toMatch(/script|foreignObject|iframe|onload|href|bad.test|<image/)
})

test('SVG preview aborts remote loads and revokes downloaded blob URLs even when clicking fails', async () => {
  const originalFetch = globalThis.fetch
  const response = deferred<Response>()
  let signal!: AbortSignal
  globalThis.fetch = jest.fn((_url, options) => {
    signal = options.signal
    return response.promise
  })
  const onError = jest.fn()
  const { rerender, unmount, container } = render(<SvgPreview svgUrl="https://example.test/a.svg" onError={onError} />)
  rerender(<SvgPreview svgSource={'<svg xmlns="http://www.w3.org/2000/svg"><circle r="4"/></svg>'} onError={onError} />)
  expect(signal.aborted).toBe(true)
  await act(async () => response.resolve({ ok: true, text: async () => '<svg><text>stale</text></svg>' } as Response))
  expect(container.querySelector('circle')).toBeInTheDocument()
  expect(screen.queryByText('stale')).toBeNull()
  const create = jest.fn().mockReturnValue('blob:preview')
  const revoke = jest.fn()
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: create })
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revoke })
  const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
    throw new Error('blocked')
  })
  fireEvent.click(screen.getByRole('button', { name: 'Download SVG' }))
  await waitFor(() => expect(revoke).toHaveBeenCalledWith('blob:preview'))
  expect(document.querySelector('a[download]')).toBeNull()
  expect(onError).toHaveBeenCalled()
  click.mockRestore()
  unmount()
  globalThis.fetch = originalFetch
})

test('clipboard reports unavailable APIs and clears timers on unmount', async () => {
  const error = jest.fn()
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined })
  const { unmount } = render(<CopyToClipboard code="hello" onError={error} />)
  fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
  await waitFor(() => expect(error).toHaveBeenCalledTimes(1))
  unmount()
  jest.useFakeTimers()
  const schedule = jest.spyOn(globalThis, 'setTimeout')
  const cancel = jest.spyOn(globalThis, 'clearTimeout')
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  })
  const view = render(<CopyToClipboard code="hello" />)
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Copy' })))
  expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
  const index = schedule.mock.calls.findIndex((call) => call[1] === 2000)
  expect(index).toBeGreaterThanOrEqual(0)
  const timer = schedule.mock.results[index].value
  view.unmount()
  expect(cancel).toHaveBeenCalledWith(timer)
  schedule.mockRestore()
  cancel.mockRestore()
  jest.useRealTimers()
})

test('caller content and deterministic placeholders render without application providers', () => {
  expect(renderToString(<ContentPlaceholder />)).toBe(renderToString(<ContentPlaceholder />))
  render(
    <>
      <NumberViewCard value={42} label="Visitors" formatValue={(value) => `${value} total`} />
      <ApiStateHandler loading loadingFallback="Please wait" />
      <ClockFace formatTime={() => 'Caller clock'} />
    </>
  )
  expect(screen.getByText('42 total')).toBeInTheDocument()
  expect(screen.getByText('Visitors')).toBeInTheDocument()
  expect(screen.getByText('Please wait')).toBeInTheDocument()
  expect(screen.getByText('Caller clock')).toBeInTheDocument()
})

test('ClockFace formats midnight and noon in 12-hour mode', () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0))
  const { rerender, unmount } = render(<ClockFace locale="en-US" />)
  expect(screen.getByText(/12:00:00 AM/)).toBeInTheDocument()
  jest.setSystemTime(new Date(2026, 0, 1, 12, 0, 0))
  act(() => jest.advanceTimersByTime(1000))
  expect(screen.getByText(/12:00:01 PM/)).toBeInTheDocument()
  rerender(<ClockFace locale="en-US" hour12={false} />)
  expect(screen.getByText('12:00:01')).toBeInTheDocument()
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})
