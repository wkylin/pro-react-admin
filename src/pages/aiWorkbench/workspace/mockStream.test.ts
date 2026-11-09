/** @jest-environment node */
import { createDemoResponse } from './mockStream'
import { DEFAULT_SETTINGS } from './model'

const settings = { ...DEFAULT_SETTINGS, cadence: 40, chunkSize: 40 }

function readEvents(raw: string) {
  return raw.split('\n\n').flatMap((block) => {
    const data = block.startsWith('data: ') ? block.slice(6) : ''
    return data && data !== '[DONE]' ? [JSON.parse(data) as { content: string; reasoning?: string }] : []
  })
}

beforeEach(() => jest.useFakeTimers())
afterEach(() => {
  jest.useRealTimers()
  jest.restoreAllMocks()
})

it.each(['en', 'zh'] as const)(
  'streams an honest %s demo containing the current question and applied prompt',
  async (language) => {
    const controller = new AbortController()
    const remove = jest.spyOn(controller.signal, 'removeEventListener')
    const response = createDemoResponse({
      input: 'Current question 🧩',
      systemPrompt: 'Use a concise table',
      settings,
      language,
      signal: controller.signal,
    })
    expect(response.headers.get('Content-Type')).toContain('text/event-stream')
    const pending = response.text()
    await jest.runAllTimersAsync()
    const raw = await pending
    const events = readEvents(raw)
    const content = events.map((event) => event.content).join('')
    expect(events.length).toBeGreaterThan(2)
    expect(content).toContain('Current question 🧩')
    expect(content).toContain('Use a concise table')
    expect(content).toContain(language === 'zh' ? '未调用 AI 模型或联网检索' : 'No AI model or web search was called')
    expect(events.every((event) => !event.reasoning)).toBe(true)
    expect(raw).toMatch(/data: \[DONE\]\n\n$/)
    expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
    expect(jest.getTimerCount()).toBe(0)
    expect(() => controller.abort()).not.toThrow()
  }
)

it('labels optional scripted reasoning as a demo rather than actual model reasoning', async () => {
  const response = createDemoResponse({
    input: 'Question',
    systemPrompt: '',
    settings: { ...settings, includeReasoning: true },
    language: 'en',
  })
  const pending = response.text()
  await jest.runAllTimersAsync()
  const events = readEvents(await pending)
  expect(events[0].reasoning).toContain('not reasoning from an AI model')
  expect(events.map((event) => event.content).join('')).toContain('No system prompt applied.')
  expect(jest.getTimerCount()).toBe(0)
})

it('closes on abort without enqueueing another chunk or leaving timers and listeners', async () => {
  const controller = new AbortController()
  const remove = jest.spyOn(controller.signal, 'removeEventListener')
  const response = createDemoResponse({
    input: 'Question',
    systemPrompt: 'Prompt',
    settings,
    language: 'en',
    signal: controller.signal,
  })
  const reader = response.body!.getReader()
  expect((await reader.read()).done).toBe(false)
  expect(jest.getTimerCount()).toBe(1)
  controller.abort()
  expect(jest.getTimerCount()).toBe(0)
  await jest.runAllTimersAsync()
  expect(await reader.read()).toEqual({ value: undefined, done: true })
  expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
  await expect(reader.cancel()).resolves.toBeUndefined()
  reader.releaseLock()
})

it('cleans resources when the consumer cancels, including a later abort', async () => {
  const controller = new AbortController()
  const remove = jest.spyOn(controller.signal, 'removeEventListener')
  const response = createDemoResponse({
    input: 'Question',
    systemPrompt: 'Prompt',
    settings,
    language: 'zh',
    signal: controller.signal,
  })
  const reader = response.body!.getReader()
  await reader.cancel()
  expect(jest.getTimerCount()).toBe(0)
  expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
  expect(() => controller.abort()).not.toThrow()
  await jest.runAllTimersAsync()
  expect(await reader.read()).toEqual({ value: undefined, done: true })
  reader.releaseLock()
})

it('does not start a previously aborted stream', async () => {
  const controller = new AbortController()
  controller.abort()
  const add = jest.spyOn(controller.signal, 'addEventListener')
  const response = createDemoResponse({
    input: 'Question',
    systemPrompt: 'Prompt',
    settings,
    language: 'en',
    signal: controller.signal,
  })
  expect(await response.text()).toBe('')
  expect(add).not.toHaveBeenCalled()
  expect(jest.getTimerCount()).toBe(0)
})
