import type { PromptFormValue } from '@wui/forms/PromptOptimizer'
import type { ChatStreamEvent } from '@wui/forms/SmartChat'

export type PromptFields = PromptFormValue
export const FIELD_KEYS = [
  'role',
  'objective',
  'audience',
  'context',
  'constraints',
  'outputFormat',
  'examples',
  'evaluation',
] as const
export const CORE_FIELDS = ['role', 'objective', 'context', 'constraints', 'outputFormat'] as const
export const EXTRA_FIELDS = ['audience', 'examples', 'evaluation'] as const
export const PRESET_IDS = ['product-spec', 'release-copilot', 'incident-analyst'] as const
export type PresetId = (typeof PRESET_IDS)[number]

export interface RuntimeSettings {
  cadence: number
  chunkSize: number
  includeReasoning: boolean
  persistDraft: boolean
}

export const DEFAULT_SETTINGS: RuntimeSettings = {
  cadence: 80,
  chunkSize: 24,
  includeReasoning: false,
  persistDraft: false,
}

export interface WorkspaceSnapshot {
  version: 3
  fields: PromptFields
  appliedPrompt: string
  activePresetId: string
  settings: RuntimeSettings
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
const hasKeys = (value: Record<string, unknown>, keys: readonly string[]) =>
  Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key))
const boundedInteger = (value: unknown, min: number, max: number): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max

export function createEmptyFields(): PromptFields {
  return {
    role: '',
    objective: '',
    audience: '',
    context: '',
    constraints: '',
    outputFormat: '',
    examples: '',
    evaluation: '',
  }
}

export function buildPrompt(fields: PromptFields, labels: Record<keyof PromptFields, string>): string {
  return FIELD_KEYS.filter((key) => fields[key].trim())
    .map((key) => `## ${labels[key]}\n${fields[key].trim()}`)
    .join('\n\n')
}

/** Pass public project/account/tenant identifiers only; credentials never belong in a storage key. */
export function createWorkspaceStorageKey(projectId: string, accountId: string, tenantId?: string): string {
  return `pro-react-admin:ai-workbench:workspace:v3:${JSON.stringify([projectId, accountId, tenantId ?? null])}`
}

function parseSnapshot(value: unknown): WorkspaceSnapshot | undefined {
  if (!isRecord(value) || !hasKeys(value, ['version', 'fields', 'appliedPrompt', 'activePresetId', 'settings'])) return
  if (
    value.version !== 3 ||
    !isRecord(value.fields) ||
    !hasKeys(value.fields, FIELD_KEYS) ||
    typeof value.appliedPrompt !== 'string' ||
    value.appliedPrompt.length > 40_000 ||
    typeof value.activePresetId !== 'string' ||
    (value.activePresetId !== '' && !PRESET_IDS.some((id) => id === value.activePresetId)) ||
    !isRecord(value.settings) ||
    !hasKeys(value.settings, ['cadence', 'chunkSize', 'includeReasoning', 'persistDraft'])
  )
    return
  const fields = createEmptyFields()
  for (const key of FIELD_KEYS) {
    const field = value.fields[key]
    if (typeof field !== 'string' || field.length > 4000) return
    fields[key] = field
  }
  const { cadence, chunkSize, includeReasoning, persistDraft } = value.settings
  if (
    !boundedInteger(cadence, 40, 280) ||
    !boundedInteger(chunkSize, 10, 40) ||
    typeof includeReasoning !== 'boolean' ||
    typeof persistDraft !== 'boolean'
  )
    return
  return {
    version: 3,
    fields,
    appliedPrompt: value.appliedPrompt,
    activePresetId: value.activePresetId,
    settings: { cadence, chunkSize, includeReasoning, persistDraft },
  }
}

export function loadWorkspace(storage: Pick<Storage, 'getItem'>, key: string): WorkspaceSnapshot | undefined {
  try {
    const raw = storage.getItem(key)
    if (!raw || raw.length > 1_000_000) return
    const snapshot = parseSnapshot(JSON.parse(raw))
    return snapshot?.settings.persistDraft ? snapshot : undefined
  } catch {
    return undefined
  }
}

export function saveWorkspace(storage: Pick<Storage, 'setItem'>, key: string, snapshot: WorkspaceSnapshot): boolean {
  try {
    const safe = parseSnapshot(snapshot)
    if (!safe?.settings.persistDraft) return false
    storage.setItem(key, JSON.stringify(safe))
    return true
  } catch {
    return false
  }
}

export function clearWorkspace(storage: Pick<Storage, 'removeItem'>, key: string): boolean {
  try {
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}

/** Read only for an explicit import action. Never apply or migrate legacy content automatically. */
export function readLegacyDraft(storage: Pick<Storage, 'getItem'>): PromptFields | undefined {
  try {
    const raw = storage.getItem('ai-workbench:workspace:v2')
    if (!raw || raw.length > 1_000_000) return
    const legacy: unknown = JSON.parse(raw)
    if (!isRecord(legacy) || !isRecord(legacy.optimizerValue)) return
    const fields = createEmptyFields()
    let found = false
    for (const key of FIELD_KEYS) {
      const value = legacy.optimizerValue[key]
      if (typeof value === 'string') {
        fields[key] = value.slice(0, 4000)
        found = true
      }
    }
    return found ? fields : undefined
  } catch {
    return undefined
  }
}

export interface SafeStreamEvent {
  type: ChatStreamEvent['type']
  timestamp: string
  requestId: string
  assistantMessageId: string
  durationMs?: number
  contentSize?: number
  reasoningSize?: number
  done?: boolean
}

export function toSafeStreamEvent(event: ChatStreamEvent): SafeStreamEvent | undefined {
  if (
    !event ||
    !['start', 'chunk', 'done', 'abort', 'error'].includes(event.type) ||
    typeof event.timestamp !== 'string' ||
    typeof event.requestId !== 'string' ||
    typeof event.assistantMessageId !== 'string'
  )
    return
  const safe: SafeStreamEvent = {
    type: event.type,
    timestamp: event.timestamp.slice(0, 80),
    requestId: event.requestId.slice(0, 160),
    assistantMessageId: event.assistantMessageId.slice(0, 160),
  }
  for (const key of ['durationMs', 'contentSize', 'reasoningSize'] as const) {
    const value = event[key]
    if (typeof value === 'number' && Number.isFinite(value) && value >= 0) safe[key] = value
  }
  if (typeof event.done === 'boolean') safe.done = event.done
  return safe
}
