import type { ChatStreamEvent } from '@wui/forms/SmartChat'
import {
  buildPrompt,
  clearWorkspace,
  createEmptyFields,
  createWorkspaceStorageKey,
  DEFAULT_SETTINGS,
  FIELD_KEYS,
  loadWorkspace,
  readLegacyDraft,
  saveWorkspace,
  toSafeStreamEvent,
  type WorkspaceSnapshot,
} from './model'

const snapshot = (): WorkspaceSnapshot => ({
  version: 3,
  fields: { ...createEmptyFields(), role: 'Reviewer', objective: 'Review this change' },
  appliedPrompt: 'Previously applied prompt',
  activePresetId: '',
  settings: { ...DEFAULT_SETTINGS, persistDraft: true },
})
const key = createWorkspaceStorageKey('default', 'account-a', 'tenant-a')

beforeEach(() => localStorage.clear())

it('builds only populated fields in stable order without mutating an independent draft', () => {
  const fields = createEmptyFields()
  fields.context = '  Project context  '
  fields.role = '  Reviewer  '
  const labels = Object.fromEntries(FIELD_KEYS.map((field) => [field, field])) as Record<
    (typeof FIELD_KEYS)[number],
    string
  >
  expect(buildPrompt(fields, labels)).toBe('## role\nReviewer\n\n## context\nProject context')
  expect(fields.context).toBe('  Project context  ')
  expect(createEmptyFields().role).toBe('')
  expect(DEFAULT_SETTINGS.persistDraft).toBe(false)
})

it('restores only the selected public project/account/tenant scope with collision-free keys', () => {
  const saved = snapshot()
  expect(saveWorkspace(localStorage, key, saved)).toBe(true)
  expect(loadWorkspace(localStorage, key)).toEqual(saved)
  for (const otherKey of [
    createWorkspaceStorageKey('other', 'account-a', 'tenant-a'),
    createWorkspaceStorageKey('default', 'other', 'tenant-a'),
    createWorkspaceStorageKey('default', 'account-a', 'other'),
    createWorkspaceStorageKey('default', 'account-a'),
  ])
    expect(loadWorkspace(localStorage, otherKey)).toBeUndefined()
  expect(createWorkspaceStorageKey('a:b', 'c')).not.toBe(createWorkspaceStorageKey('a', 'b:c'))
  expect(createWorkspaceStorageKey('default', 'account-a', undefined)).toBe(
    createWorkspaceStorageKey('default', 'account-a')
  )
})

it.each([
  null,
  {},
  { ...snapshot(), version: 2 },
  { ...snapshot(), messages: ['unexpected'] },
  { ...snapshot(), fields: { ...snapshot().fields, token: 'unexpected' } },
  { ...snapshot(), fields: { ...snapshot().fields, role: 123 } },
  { ...snapshot(), fields: { ...snapshot().fields, role: 'x'.repeat(4001) } },
  { ...snapshot(), appliedPrompt: 'x'.repeat(40_001) },
  { ...snapshot(), activePresetId: 'unknown' },
  { ...snapshot(), settings: { ...snapshot().settings, cadence: 39 } },
  { ...snapshot(), settings: { ...snapshot().settings, cadence: 281 } },
  { ...snapshot(), settings: { ...snapshot().settings, cadence: 80.5 } },
  { ...snapshot(), settings: { ...snapshot().settings, chunkSize: 9 } },
  { ...snapshot(), settings: { ...snapshot().settings, chunkSize: 41 } },
  { ...snapshot(), settings: { ...snapshot().settings, includeReasoning: 'false' } },
  { ...snapshot(), settings: { ...snapshot().settings, persistDraft: 'true' } },
  { ...snapshot(), settings: { ...snapshot().settings, persistDraft: false } },
])('ignores invalid or disabled cached snapshot %# without modifying storage', (value) => {
  const raw = JSON.stringify(value)
  localStorage.setItem(key, raw)
  expect(loadWorkspace(localStorage, key)).toBeUndefined()
  expect(localStorage.getItem(key)).toBe(raw)
})

it('accepts exact field, prompt and runtime boundaries and known preset ids', () => {
  for (const id of ['', 'product-spec', 'release-copilot', 'incident-analyst']) {
    const saved = snapshot()
    saved.activePresetId = id
    saved.fields.context = 'x'.repeat(4000)
    saved.appliedPrompt = 'x'.repeat(40_000)
    saved.settings.cadence = 40
    saved.settings.chunkSize = 40
    expect(saveWorkspace(localStorage, key, saved)).toBe(true)
    expect(loadWorkspace(localStorage, key)).toEqual(saved)
  }
})

it('handles corrupt JSON, unavailable storage and failed writes/removals without throwing', () => {
  localStorage.setItem(key, '{broken-json')
  expect(loadWorkspace(localStorage, key)).toBeUndefined()
  const fail = () => {
    throw new Error('storage unavailable')
  }
  expect(loadWorkspace({ getItem: fail }, key)).toBeUndefined()
  expect(saveWorkspace({ setItem: fail }, key, snapshot())).toBe(false)
  expect(clearWorkspace({ removeItem: fail }, key)).toBe(false)
})

it('never saves a disabled draft and clears a previously saved draft on explicit opt-out', () => {
  expect(saveWorkspace(localStorage, key, snapshot())).toBe(true)
  const write = jest.fn()
  const disabled = { ...snapshot(), settings: { ...DEFAULT_SETTINGS, persistDraft: false } }
  expect(saveWorkspace({ setItem: write }, key, disabled)).toBe(false)
  expect(write).not.toHaveBeenCalled()
  expect(clearWorkspace(localStorage, key)).toBe(true)
  expect(loadWorkspace(localStorage, key)).toBeUndefined()
})

it('reads only sanitized legacy editor fields after an explicit call and never modifies the source', () => {
  const legacyKey = 'ai-workbench:workspace:v2'
  const raw = JSON.stringify({
    optimizerValue: { role: 'Imported role', context: 'x'.repeat(4100), audience: 123, token: 'secret-token' },
    promptText: 'must not be applied',
    streamEvents: [{ input: 'private input', raw: 'private raw', message: 'private error' }],
  })
  localStorage.setItem(legacyKey, raw)
  expect(loadWorkspace(localStorage, key)).toBeUndefined()
  const fields = readLegacyDraft(localStorage)
  expect(fields).toEqual({ ...createEmptyFields(), role: 'Imported role', context: 'x'.repeat(4000) })
  expect(JSON.stringify(fields)).not.toMatch(/secret-token|private|must not be applied/)
  expect(localStorage.getItem(legacyKey)).toBe(raw)
  expect(localStorage.getItem(key)).toBeNull()
  localStorage.setItem(legacyKey, JSON.stringify({ optimizerValue: { unknown: 'ignored' } }))
  expect(readLegacyDraft(localStorage)).toBeUndefined()
  expect(readLegacyDraft({ getItem: () => '{broken' })).toBeUndefined()
})

it('keeps bounded stream metadata and finite metrics while dropping input, error text and raw payloads', () => {
  const event: ChatStreamEvent = {
    type: 'error',
    timestamp: '2026-11-09T00:00:00.000Z',
    requestId: 'r'.repeat(200),
    assistantMessageId: 'a',
    durationMs: 120,
    contentSize: Infinity,
    reasoningSize: -1,
    done: false,
    input: 'private input',
    message: 'private error',
    raw: { prompt: 'private raw' },
  }
  expect(toSafeStreamEvent(event)).toEqual({
    type: 'error',
    timestamp: event.timestamp,
    requestId: 'r'.repeat(160),
    assistantMessageId: 'a',
    durationMs: 120,
    done: false,
  })
  expect(toSafeStreamEvent({ ...event, durationMs: NaN, contentSize: 0, reasoningSize: 24 })).toEqual({
    type: 'error',
    timestamp: event.timestamp,
    requestId: 'r'.repeat(160),
    assistantMessageId: 'a',
    contentSize: 0,
    reasoningSize: 24,
    done: false,
  })
  expect(toSafeStreamEvent({ ...event, type: 'unknown' } as unknown as ChatStreamEvent)).toBeUndefined()
})
