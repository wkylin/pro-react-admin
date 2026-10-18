/** @jest-environment node */
import { createCachedDataProvider } from './cache'
import type { DataProvider } from './provider'

interface Schema {
  records: { id: string; name: string }
  audit: { id: string; name: string }
}
const query = { page: 1, pageSize: 10 }
const result = { items: [{ id: '1', name: 'Original' }], total: 1 }

test('request headers and response-affecting options cannot reuse another contract result', async () => {
  const f = fixture()
  await f.cache.list('records', query, { headers: { 'X-View': 'public' } })
  await f.cache.list('records', query, { headers: { 'X-View': 'private' } })
  await f.cache.list('records', query, { headers: { 'X-View': 'public' } })
  expect(f.list).toHaveBeenCalledTimes(2)
})
function fixture() {
  let scope = 'alpha'
  const list = jest.fn().mockResolvedValue(result)
  const update = jest.fn().mockResolvedValue({ id: '1', name: 'Changed' })
  const provider = { list, update } as unknown as DataProvider<Schema>
  const cache = createCachedDataProvider(provider, { scope, getScope: () => scope, related: () => ['audit'] })
  return {
    cache,
    list,
    update,
    switchScope: () => {
      scope = 'beta'
    },
  }
}
test('cache deduplicates equivalent queries and returns isolated values', async () => {
  const f = fixture()
  const [a, b] = await Promise.all([f.cache.list('records', query), f.cache.list('records', { pageSize: 10, page: 1 })])
  a.items[0].name = 'Tampered'
  expect(b.items[0].name).toBe('Original')
  expect((await f.cache.list('records', query)).items[0].name).toBe('Original')
  expect(f.list).toHaveBeenCalledTimes(1)
})
test('successful writes notify all affected resources; failed writes preserve cached data', async () => {
  const f = fixture(),
    records = jest.fn(),
    audit = jest.fn()
  f.cache.subscribe?.('records', records)
  f.cache.subscribe?.('audit', audit)
  await f.cache.list('records', query)
  await f.cache.update('records', '1', { name: 'Changed' })
  expect(records).toHaveBeenCalledTimes(1)
  expect(audit).toHaveBeenCalledTimes(1)
  await f.cache.list('records', query)
  f.update.mockRejectedValueOnce(new Error('conflict'))
  await expect(f.cache.update('records', '1', { name: 'Lost' })).rejects.toThrow('conflict')
  await f.cache.list('records', query)
  expect(f.list).toHaveBeenCalledTimes(2)
  expect(records).toHaveBeenCalledTimes(1)
})
test('aborting one consumer keeps the shared request alive for another', async () => {
  const f = fixture()
  let complete!: (value: typeof result) => void
  f.list.mockImplementation(
    () =>
      new Promise((resolve) => {
        complete = resolve
      })
  )
  const controller = new AbortController()
  const first = f.cache.list('records', query, { signal: controller.signal })
  const second = f.cache.list('records', query)
  await Promise.resolve()
  controller.abort()
  await expect(first).rejects.toHaveProperty('name', 'AbortError')
  expect(f.list.mock.calls[0][2].signal.aborted).toBe(false)
  complete(result)
  await expect(second).resolves.toEqual(result)
})
test('aborting every consumer cancels transport and permits a later retry', async () => {
  const f = fixture()
  f.list.mockImplementationOnce(
    (_resource, _query, options) =>
      new Promise((_resolve, reject) => {
        options.signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')))
      })
  )
  const controller = new AbortController(),
    pending = f.cache.list('records', query, { signal: controller.signal })
  await Promise.resolve()
  controller.abort()
  await expect(pending).rejects.toHaveProperty('name', 'AbortError')
  await expect(f.cache.list('records', query)).resolves.toEqual(result)
  expect(f.list).toHaveBeenCalledTimes(2)
})
test('invalidated responses cannot repopulate the cache even if transport ignores abort', async () => {
  const f = fixture()
  let complete!: (value: typeof result) => void
  f.list.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        complete = resolve
      })
  )
  const pending = f.cache.list('records', query)
  await Promise.resolve()
  f.cache.invalidate?.('records')
  complete(result)
  await expect(pending).rejects.toHaveProperty('name', 'AbortError')
  await expect(f.cache.list('records', query)).resolves.toEqual(result)
  expect(f.list).toHaveBeenCalledTimes(2)
})
test('identity switches reject both cached reads and late in-flight responses', async () => {
  const f = fixture()
  await f.cache.list('records', query)
  let complete!: (value: typeof result) => void
  f.list.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        complete = resolve
      })
  )
  const pending = f.cache.list('records', { ...query, page: 2 })
  await Promise.resolve()
  f.switchScope()
  complete(result)
  await expect(pending).rejects.toThrow('会话已变更')
  await expect(f.cache.list('records', query)).rejects.toThrow('会话已变更')
})
test('TTL refresh and manual invalidation recover after failures; disposal blocks old consumers', async () => {
  const f = fixture(),
    time = jest.spyOn(Date, 'now').mockReturnValue(1_000)
  try {
    await f.cache.list('records', query)
    time.mockReturnValue(17_000)
    f.list.mockRejectedValueOnce(new Error('offline'))
    await expect(f.cache.list('records', query)).rejects.toThrow('offline')
    await expect(f.cache.list('records', query)).resolves.toEqual(result)
    f.cache.invalidate?.('records')
    await f.cache.list('records', query)
    expect(f.list).toHaveBeenCalledTimes(4)
    f.cache.dispose()
    await expect(f.cache.list('records', query)).rejects.toThrow('会话已变更')
  } finally {
    time.mockRestore()
  }
})
