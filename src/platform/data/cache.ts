import type { RequestOptions } from '@platform/api/client'
import type { DataProvider, DataRecord } from './provider'

type Entry = {
  resource: string
  controller: AbortController
  consumers: number
  promise: Promise<unknown>
  value?: unknown
  expires: number
}
const copy = <T>(value: T): T => structuredClone(value)
const aborted = () => new DOMException('Request aborted', 'AbortError')

/** One in-memory cache per authenticated scope. No credentials or records are persisted. */
export function createCachedDataProvider<Schema extends { [K in keyof Schema]: DataRecord }>(
  provider: DataProvider<Schema>,
  {
    scope,
    getScope,
    ttlMs = 15_000,
    maxEntries = 100,
    related,
  }: {
    scope: string
    getScope: () => string
    ttlMs?: number
    maxEntries?: number
    related?: (resource: keyof Schema & string) => (keyof Schema & string)[]
  }
): DataProvider<Schema> & { dispose: () => void } {
  if (!Number.isInteger(maxEntries) || maxEntries < 1 || !Number.isFinite(ttlMs) || ttlMs < 0)
    throw new Error('Invalid cache limits')
  const entries = new Map<string, Entry>()
  const listeners = new Map<string, Set<() => void>>()
  let disposed = false
  const assertScope = () => {
    if (disposed || getScope() !== scope) throw new Error('数据会话已变更，请重新加载')
  }
  const invalidate = (resource?: keyof Schema & string) => {
    for (const [key, entry] of entries)
      if (!resource || entry.resource === resource) {
        entries.delete(key)
        entry.controller.abort()
      }
    for (const [key, subscribers] of listeners)
      if (!resource || resource === key) for (const listener of subscribers) listener()
  }
  async function read<T>(
    resource: string,
    key: string,
    run: (options: RequestOptions) => Promise<T>,
    options?: RequestOptions
  ): Promise<T> {
    assertScope()
    options?.signal?.throwIfAborted()
    let entry = entries.get(key)
    if (entry?.value !== undefined && entry.expires > Date.now()) {
      entries.delete(key)
      entries.set(key, entry)
      return copy(entry.value as T)
    }
    if (entry?.value !== undefined) {
      entries.delete(key)
      entry = undefined
    }
    if (!entry) {
      const controller = new AbortController()
      const current: Entry = { resource, controller, consumers: 0, expires: 0, promise: Promise.resolve() }
      current.promise = Promise.resolve()
        .then(() => {
          assertScope()
          return run({ ...options, signal: controller.signal, showError: false, cancelDuplicate: false })
        })
        .then((value) => {
          assertScope()
          if (entries.get(key) !== current || controller.signal.aborted) throw aborted()
          current.value = copy(value)
          current.expires = Date.now() + ttlMs
          return value
        })
        .catch((error: unknown) => {
          if (entries.get(key) === current) entries.delete(key)
          throw error
        })
      entries.set(key, current)
      entry = current
      while (entries.size > maxEntries) {
        const oldest = entries.keys().next().value!
        entries.get(oldest)?.controller.abort()
        entries.delete(oldest)
      }
    }
    const shared = entry
    shared.consumers += 1
    return new Promise<T>((resolve, reject) => {
      let finished = false
      const finish = (work: () => void) => {
        if (finished) return
        finished = true
        options?.signal?.removeEventListener('abort', onAbort)
        shared.consumers -= 1
        if (shared.consumers === 0 && shared.value === undefined) {
          if (entries.get(key) === shared) entries.delete(key)
          shared.controller.abort()
        }
        work()
      }
      const onAbort = () => finish(() => reject(aborted()))
      options?.signal?.addEventListener('abort', onAbort, { once: true })
      shared.promise.then(
        (value) => finish(() => resolve(copy(value as T))),
        (error: unknown) => finish(() => reject(error))
      )
    })
  }
  const key = (resource: string, operation: string, value: unknown, options?: RequestOptions) =>
    `${resource}|${operation}|${JSON.stringify([
      value,
      {
        headers: options?.headers ? Object.entries(options.headers).sort(([a], [b]) => a.localeCompare(b)) : undefined,
        needToken: options?.needToken,
        encrypt: options?.encrypt,
        decrypt: options?.decrypt,
        encryptFields: options?.encryptFields,
      },
    ])}`
  async function write<T>(resource: keyof Schema & string, work: () => Promise<T>): Promise<T> {
    assertScope()
    const result = await work()
    assertScope()
    for (const affected of new Set([resource, ...(related?.(resource) ?? [])])) invalidate(affected)
    return result
  }
  return {
    list: (resource, query, options) =>
      read(
        resource,
        key(
          resource,
          'list',
          [query.page, query.pageSize, query.search ?? '', query.sort ?? '', query.order ?? ''],
          options
        ),
        (settings) => provider.list(resource, query, settings),
        options
      ),
    getOne: (resource, id, options) =>
      read(resource, key(resource, 'one', id, options), (settings) => provider.getOne(resource, id, settings), options),
    create: (resource, input, options) => write(resource, () => provider.create(resource, input, options)),
    update: (resource, id, input, options) => write(resource, () => provider.update(resource, id, input, options)),
    remove: (resource, id, options) => write(resource, () => provider.remove(resource, id, options)),
    subscribe(resource, listener) {
      const subscribers = listeners.get(resource) ?? new Set<() => void>()
      subscribers.add(listener)
      listeners.set(resource, subscribers)
      return () => {
        subscribers.delete(listener)
        if (!subscribers.size) listeners.delete(resource)
      }
    },
    invalidate,
    dispose() {
      disposed = true
      listeners.clear()
      invalidate()
    },
  }
}
