import projectRegistry from '../projects/registry.json'

export type MfeToastType = 'success' | 'info' | 'warning' | 'error'

export type MfeEventMap = {
  'mfe:ping': { from: string; at: number }
  'mfe:pong': { from: string; to: string; at: number }
  'mfe:navigate': { to: string; from?: string }
  'mfe:toast': { type: MfeToastType; content: string; from?: string }
  'mfe:state': { patch: Record<string, unknown>; state: Record<string, unknown>; from?: string }
}

export const MFE_PROTOCOL_VERSION = projectRegistry.mfeProtocolVersion
const BUS_KEY = `__WUI_MFE_EVENT_BUS_V${MFE_PROTOCOL_VERSION}__`
const STATE_KEY = `__WUI_MFE_SHARED_STATE_V${MFE_PROTOCOL_VERSION}__`
const POST_MESSAGE_TYPE = 'WUI_MFE_EVENT'
export const MFE_POST_MESSAGE_TYPE = POST_MESSAGE_TYPE
const TOAST_TYPES = new Set<MfeToastType>(['success', 'info', 'warning', 'error'])
const UNSAFE_STATE_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

function getWindow(): any {
  if (typeof window === 'undefined') return undefined
  return window as any
}

function getBus(): EventTarget {
  const w = getWindow()
  if (!w) return new EventTarget()
  if (!w[BUS_KEY]) w[BUS_KEY] = new EventTarget()
  return w[BUS_KEY] as EventTarget
}

function isRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

function hasControlCharacter(value: string) {
  for (let index = 0; index < value.length; index += 1) {
    if (value.charCodeAt(index) <= 0x1f) return true
  }
  return false
}

function hasSafeKeys(value: Record<string, unknown>) {
  return Object.keys(value).every((key) => !UNSAFE_STATE_KEYS.has(key))
}

function isValidEvent(type: unknown, detail: unknown): type is keyof MfeEventMap {
  if (!isRecord(detail)) return false

  switch (type) {
    case 'mfe:ping':
      return typeof detail.from === 'string' && Number.isFinite(detail.at)
    case 'mfe:pong':
      return typeof detail.from === 'string' && typeof detail.to === 'string' && Number.isFinite(detail.at)
    case 'mfe:navigate':
      return (
        typeof detail.to === 'string' &&
        detail.to.startsWith('/') &&
        !detail.to.startsWith('//') &&
        !hasControlCharacter(detail.to) &&
        (!('from' in detail) || detail.from === undefined || typeof detail.from === 'string')
      )
    case 'mfe:toast':
      return (
        typeof detail.type === 'string' &&
        TOAST_TYPES.has(detail.type as MfeToastType) &&
        typeof detail.content === 'string' &&
        (!('from' in detail) || detail.from === undefined || typeof detail.from === 'string')
      )
    case 'mfe:state':
      return (
        isRecord(detail.patch) &&
        isRecord(detail.state) &&
        hasSafeKeys(detail.patch) &&
        hasSafeKeys(detail.state) &&
        (!('from' in detail) || detail.from === undefined || typeof detail.from === 'string')
      )
    default:
      return false
  }
}

export function emitMfeEvent<K extends keyof MfeEventMap>(type: K, detail: MfeEventMap[K]) {
  if (!isValidEvent(type, detail)) return false
  getBus().dispatchEvent(new CustomEvent(String(type), { detail }))
  return true
}

export function onMfeEvent<K extends keyof MfeEventMap>(
  type: K,
  handler: (detail: MfeEventMap[K]) => void
): () => void {
  const bus = getBus()
  const listener = (evt: Event) => {
    const detail = (evt as CustomEvent).detail
    if (isValidEvent(type, detail)) handler(detail as MfeEventMap[K])
  }
  bus.addEventListener(String(type), listener)
  return () => bus.removeEventListener(String(type), listener)
}

export function getMfeSharedState(): Record<string, unknown> {
  const w = getWindow()
  if (!w) return Object.create(null)
  if (!w[STATE_KEY]) w[STATE_KEY] = Object.create(null)
  return w[STATE_KEY] as Record<string, unknown>
}

export function patchMfeSharedState(patch: Record<string, unknown>, from?: string) {
  if (!isRecord(patch) || !hasSafeKeys(patch)) return false
  const state = getMfeSharedState()
  Object.assign(state, patch)
  return emitMfeEvent('mfe:state', { patch, state: { ...state }, from })
}

/**
 * postMessage is for iframe/cross-origin integration. The default target and
 * accepted origin are same-origin; cross-origin callers must provide exact origins.
 */
export function emitMfePostMessage<K extends keyof MfeEventMap>(
  type: K,
  detail: MfeEventMap[K],
  targetOrigin?: string,
  targetWindow?: Window
) {
  const w = getWindow()
  if (!w || !isValidEvent(type, detail) || targetOrigin === '*') return false
  const receiver = targetWindow || (w.parent !== w ? w.parent : w.opener)
  if (!receiver) return false
  const resolvedTargetOrigin = targetOrigin || w.location.origin
  try {
    if (new URL(resolvedTargetOrigin).origin !== resolvedTargetOrigin) return false
  } catch {
    return false
  }

  receiver.postMessage(
    {
      type: POST_MESSAGE_TYPE,
      version: MFE_PROTOCOL_VERSION,
      event: type,
      detail,
    },
    resolvedTargetOrigin
  )
  return true
}

export function attachMfePostMessageBridge(allowedOrigins: string[] = []) {
  const w = getWindow()
  if (!w) return () => {}
  if (allowedOrigins.includes('*')) {
    throw new Error('MFE postMessage bridge requires exact allowed origins; wildcard is not supported')
  }
  for (const origin of allowedOrigins) {
    try {
      if (new URL(origin).origin !== origin) throw new Error('origin must be an exact URL origin')
    } catch {
      throw new Error('MFE postMessage bridge received an invalid allowed origin: ' + origin)
    }
  }

  const originAllowlist = new Set(allowedOrigins)
  const onMessage = (evt: MessageEvent) => {
    const originAllowed = originAllowlist.size ? originAllowlist.has(evt.origin) : evt.origin === w.location.origin
    if (!originAllowed) return

    const data = evt.data
    if (
      !isRecord(data) ||
      data.type !== POST_MESSAGE_TYPE ||
      data.version !== MFE_PROTOCOL_VERSION ||
      !isValidEvent(data.event, data.detail)
    ) {
      return
    }

    emitMfeEvent(data.event, data.detail as MfeEventMap[typeof data.event])
  }

  w.addEventListener('message', onMessage)
  return () => w.removeEventListener('message', onMessage)
}
