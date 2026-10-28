import { act, cleanup, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { TextEncoder, TextDecoder } from 'node:util'
import { ReadableStream } from 'node:stream/web'
import type { CheckableTagsHandle } from './CheckableTags'
import { useClipboard } from './useClipboard'

jest.mock('@ant-design/icons', () => ({ TranslationOutlined: () => <svg /> }))

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => <div>{children}</div>,
}))
jest.mock('remark-gfm', () => ({ __esModule: true, default: () => {} }))
jest.mock('remark-breaks', () => ({ __esModule: true, default: () => {} }))
jest.mock('rehype-highlight', () => ({ __esModule: true, default: () => {} }))

const CheckableTags = (require('./CheckableTags') as typeof import('./CheckableTags')).default
const IntervalInput = (require('./IntervalInput') as typeof import('./IntervalInput')).default
const StarRating = (require('./StarRating') as typeof import('./StarRating')).default
const DottedStepper = (require('./DottedStepper') as typeof import('./DottedStepper')).default
const LanguageSwitcher = (require('./LanguageSwitcher') as typeof import('./LanguageSwitcher')).default
const PromptOptimizer = (require('./PromptOptimizer') as typeof import('./PromptOptimizer')).default
const RadioInput = (require('./RadioInput') as typeof import('./RadioInput')).default
const SmartChat = (require('./SmartChat') as typeof import('./SmartChat')).default

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  ResizeObserver: class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
})
// jsdom does not provide Fetch headers; the component uses the browser Headers API.
class TestHeaders {
  private values = new Map<string, string>()
  constructor(init?: Record<string, string>) {
    Object.entries(init ?? {}).forEach(([key, value]) => this.set(key, value))
  }
  has(key: string) {
    return this.values.has(key.toLowerCase())
  }
  set(key: string, value: string) {
    this.values.set(key.toLowerCase(), value)
  }
  get(key: string) {
    return this.values.get(key.toLowerCase())
  }
}
Object.assign(globalThis, { Headers: TestHeaders })

afterEach(() => {
  cleanup()
  jest.useRealTimers()
  jest.restoreAllMocks()
})
const groups = [
  {
    key: 'color',
    title: 'Color',
    data: [
      { key: 'blue', name: 'Blue' },
      { key: 'red', name: 'Red' },
    ],
  },
]

test('tags honor controlled replacements and native keyboard activation', async () => {
  const onChange = jest.fn()
  const ref = createRef<CheckableTagsHandle>()
  const { rerender } = render(
    <CheckableTags ref={ref} dataSource={groups} checkedKeys={{ color: ['blue'] }} onChange={onChange} />
  )
  const red = screen.getByRole('button', { name: 'Red' })
  red.focus()
  await userEvent.keyboard(' ')
  expect(onChange).toHaveBeenLastCalledWith({
    key: 'color',
    checked: true,
    checkedKeys: { color: ['blue', 'red'] },
    tagValue: 'red',
  })
  expect(red).toHaveAttribute('aria-pressed', 'false')
  rerender(<CheckableTags ref={ref} dataSource={groups} checkedKeys={{ color: ['red'] }} onChange={onChange} />)
  expect(red).toHaveAttribute('aria-pressed', 'true')
  act(() => ref.current?.setSelectedTags({ color: ['blue'] }))
  expect(red).toHaveAttribute('aria-pressed', 'true')
})

test('uncontrolled tags toggle and imperative single selection works', () => {
  const ref = createRef<CheckableTagsHandle>()
  render(<CheckableTags ref={ref} dataSource={groups} single />)
  fireEvent.click(screen.getByRole('button', { name: 'Blue' }))
  expect(screen.getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'true')
  act(() => ref.current?.handleChange('red', true, 'color'))
  expect(screen.getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'false')
  expect(screen.getByRole('button', { name: 'Red' })).toHaveAttribute('aria-pressed', 'true')
})

test('interval displays controlled values, null-safe errors and unrestricted bounds', () => {
  const onChange = jest.fn()
  const { rerender } = render(<IntervalInput value={{ minValue: -20, maxValue: 200 }} onChange={onChange} />)
  const min = screen.getByRole('spinbutton', { name: 'Minimum' })
  expect(min).toHaveValue('-20')
  fireEvent.change(min, { target: { value: '-10' } })
  expect(onChange).toHaveBeenCalledWith({ minValue: -10, maxValue: 200 })
  rerender(<IntervalInput value={{ minValue: 10, maxValue: null }} />)
  expect(min).toHaveAttribute('aria-invalid', 'false')
  rerender(<IntervalInput value={{ minValue: 10, maxValue: 2 }} />)
  expect(min).toHaveAttribute('aria-invalid', 'true')
})

test('rating supports arrow/home/end focus and controlled/read-only state', () => {
  const change = jest.fn()
  const { rerender } = render(<StarRating value={2} onChange={change} />)
  fireEvent.keyDown(screen.getByRole('radio', { name: '2 of 5' }), { key: 'ArrowRight' })
  expect(change).toHaveBeenCalledWith(3)
  expect(screen.getByRole('radio', { name: '3 of 5' })).toHaveFocus()
  expect(screen.getByRole('radio', { name: '2 of 5' })).toHaveAttribute('aria-checked', 'true')
  rerender(<StarRating defaultValue={2} onChange={change} />)
  fireEvent.keyDown(screen.getByRole('radio', { name: '2 of 5' }), { key: 'End' })
  expect(screen.getByRole('radio', { name: '5 of 5' })).toHaveAttribute('aria-checked', 'true')
  fireEvent.keyDown(screen.getByRole('radio', { name: '5 of 5' }), { key: 'Home' })
  expect(screen.getByRole('radio', { name: '1 of 5' })).toHaveAttribute('aria-checked', 'true')
  rerender(<StarRating value={4} readOnly onChange={change} />)
  change.mockClear()
  fireEvent.click(screen.getByRole('radio', { name: '1 of 5' }))
  expect(change).not.toHaveBeenCalled()
})

test('stepper accepts caller content, retains fields and tolerates shrinking/empty steps', () => {
  const steps = [
    { label: 'First', fields: [{ name: 'name', type: 'text' as const, placeholder: 'Name' }] },
    { label: 'Last', content: 'Caller content' },
  ]
  const { rerender } = render(<DottedStepper steps={steps} />)
  fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Ada' } })
  fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  expect(screen.getByText('Caller content')).toBeVisible()
  fireEvent.click(screen.getByRole('button', { name: 'Previous' }))
  expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Ada')
  rerender(<DottedStepper steps={steps.slice(0, 1)} currentStep={9} />)
  expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  rerender(<DottedStepper steps={[]} />)
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})

test('language switcher is independent of i18n and radio indicator is read-only', async () => {
  const change = jest.fn()
  render(
    <>
      <LanguageSwitcher
        language="en"
        options={[
          { value: 'en', label: 'English' },
          { value: 'de', label: 'Deutsch' },
        ]}
        onLanguageChange={change}
      />
      <RadioInput type="checkbox" text="Approved" checked />
    </>
  )
  await userEvent.click(screen.getByRole('button', { name: 'Deutsch' }))
  expect(change).toHaveBeenCalledWith('de')
  expect(screen.getByRole('checkbox', { name: 'Approved' })).toHaveAttribute('aria-readonly', 'true')
})

test('prompt starts empty, uses caller headings and honors controlled resets', async () => {
  const onChange = jest.fn()
  const { rerender } = render(
    <PromptOptimizer value={{ role: 'Reviewer' }} sectionLabels={{ role: 'Position' }} onChange={onChange} />
  )
  expect(screen.getByText(/## Position\s+Reviewer/)).toBeInTheDocument()
  fireEvent.change(screen.getByRole('textbox', { name: 'Position' }), { target: { value: 'Writer' } })
  expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ role: 'Writer' }))
  expect(screen.getByRole('textbox', { name: 'Position' })).toHaveValue('Reviewer')
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
  expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ role: '' }))
  rerender(<PromptOptimizer value={{ role: undefined }} />)
  expect(screen.getByRole('button', { name: 'Copy prompt' })).toBeDisabled()
})

test('clipboard feedback timers are cleared on unmount', async () => {
  jest.useFakeTimers({ doNotFake: ['queueMicrotask', 'nextTick'] })
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  })
  const { result, unmount } = renderHook(() => useClipboard())
  await act(async () => {
    await result.current.copy('Prompt text')
  })
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Prompt text')
  expect(result.current.copied).toBe(true)
  expect(jest.getTimerCount()).toBe(1)
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})

function response(chunks: string[], cancel = jest.fn()) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      chunks.forEach((chunk) => controller.enqueue(encoder.encode(chunk)))
    },
    cancel,
  })
  return { ok: true, body: stream, statusText: '', text: async () => '' } as unknown as Response
}
function submit() {
  fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), { target: { value: 'Hello' } })
  fireEvent.click(screen.getByRole('button', { name: 'Send' }))
}

test('chat parses split CRLF SSE, excludes empty assistant from request and cancels reader on DONE', async () => {
  const cancel = jest.fn(),
    fetcher = jest.fn(async () => response(['data: {"content":"Hi"}\r', '\n\r\ndata: [DONE]\r\n\r\n'], cancel))
  const onMessagesChange = jest.fn()
  render(<SmartChat apiUrl="/chat" fetcher={fetcher} onMessagesChange={onMessagesChange} />)
  submit()
  await waitFor(() => expect(screen.getByText('Hi')).toBeInTheDocument())
  await waitFor(() => expect(cancel).toHaveBeenCalled())
  const body = fetcher.mock.calls[0] as unknown as [string, RequestInit, { messages: unknown[] }]
  expect(body[2].messages).toEqual([{ role: 'user', content: 'Hello' }])
  expect(onMessagesChange).toHaveBeenLastCalledWith(
    expect.arrayContaining([expect.objectContaining({ role: 'assistant', content: 'Hi', status: 'done' })])
  )
})

test('chat aborts pending fetch on unmount and ignores its late response', async () => {
  let resolve!: (response: Response) => void
  const fetcher = jest.fn(
    (_url: string, _request?: RequestInit) =>
      new Promise<Response>((done) => {
        resolve = done
      })
  )
  const changed = jest.fn(),
    cancel = jest.fn()
  const { unmount } = render(<SmartChat apiUrl="/chat" fetcher={fetcher} onMessagesChange={changed} />)
  submit()
  const signal = fetcher.mock.calls[0][1]?.signal
  unmount()
  const count = changed.mock.calls.length
  expect(signal?.aborted).toBe(true)
  await act(async () => resolve(response([], cancel)))
  expect(cancel).toHaveBeenCalled()
  expect(changed).toHaveBeenCalledTimes(count)
})

test('stopped old requests cannot clear a newer request or emit stale content', async () => {
  const resolvers: ((response: Response) => void)[] = []
  const fetcher = jest.fn(() => new Promise<Response>((resolve) => resolvers.push(resolve)))
  render(<SmartChat apiUrl="/chat" fetcher={fetcher} />)
  submit()
  fireEvent.click(screen.getByRole('button', { name: 'Stop' }))
  submit()
  await act(async () => resolvers[0](response(['data: {"content":"Old"}\n\n'])))
  expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument()
  expect(screen.queryByText('Old')).not.toBeInTheDocument()
  await act(async () => resolvers[1](response(['data: {"content":"New"}\n\ndata: [DONE]\n\n'])))
  expect(screen.getByText('New')).toBeInTheDocument()
})

test('chat cancels a pending reader on stop and honors external abort signals', async () => {
  const cancelled = jest.fn(),
    external = new AbortController()
  const fetcher = jest.fn(async () => response([], cancelled))
  render(<SmartChat apiUrl="/chat" fetcher={fetcher} requestOptions={{ signal: external.signal }} />)
  submit()
  await act(async () => {})
  act(() => external.abort())
  await waitFor(() => expect(cancelled).toHaveBeenCalled())
  expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument()
})

test('signature exposes a typed ref, validation/copy controls and releases pending image resources', async () => {
  const { ReactSignature } = require('./ReactSignature') as typeof import('./ReactSignature')
  const ref = createRef<import('./ReactSignature').ReactSignatureHandle>()
  const onValidate = jest.fn(),
    onClear = jest.fn(),
    writeText = jest.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
  const images: HTMLImageElement[] = []
  jest.spyOn(window, 'Image').mockImplementation(() => {
    const img = document.createElement('img')
    images.push(img)
    return img
  })
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: jest.fn(() => 'blob:signature-test') })
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: jest.fn() })
  const { unmount } = render(<ReactSignature ref={ref} onValidate={onValidate} onClear={onClear} />)
  expect(ref.current?.svg).toBeInstanceOf(SVGSVGElement)
  fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
  expect(onClear).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByRole('button', { name: 'Validate' }))
  expect(onValidate).toHaveBeenCalledWith(expect.stringContaining('<svg'))
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Copy SVG' }))
  })
  expect(writeText).toHaveBeenCalledWith(expect.stringContaining('<svg'))
  expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Download' }))
  expect(images[0].onload).not.toBeNull()
  unmount()
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:signature-test')
  expect(images[0].onload).toBeNull()
  expect(images[0].onerror).toBeNull()
})

test('chat handles errors, unmount during read and initial-message replacement', async () => {
  const onError = jest.fn(),
    cancelled = jest.fn()
  const initial = [{ role: 'assistant' as const, content: 'Initial' }]
  const fetcher = jest.fn(async () => response([], cancelled))
  const { rerender, unmount } = render(<SmartChat apiUrl="/chat" fetcher={fetcher} onError={onError} />)
  submit()
  await act(async () => {})
  rerender(<SmartChat apiUrl="/chat" initialMessages={initial} fetcher={fetcher} />)
  await waitFor(() => expect(cancelled).toHaveBeenCalled())
  expect(screen.getByText('Initial')).toBeInTheDocument()
  submit()
  await act(async () => {})
  unmount()
  expect(cancelled).toHaveBeenCalledTimes(2)
  render(
    <SmartChat
      apiUrl="/chat"
      onError={onError}
      fetcher={async () => {
        throw new Error('Network unavailable')
      }}
    />
  )
  submit()
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Network unavailable'))
  expect(onError).toHaveBeenCalledTimes(1)
})
