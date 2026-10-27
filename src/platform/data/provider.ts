import type { JsonClient, RequestOptions } from '@platform/api/client'
import { isRecord, unwrapPayload } from '@platform/api/core/response'

export interface DataRecord {
  id: string
}
export interface ListQuery {
  page: number
  pageSize: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}
export interface ListResult<T> {
  items: T[]
  total: number
}
export interface DataProvider<Schema extends { [K in keyof Schema]: DataRecord }> {
  subscribe?(resource: keyof Schema & string, listener: () => void): () => void
  invalidate?(resource?: keyof Schema & string): void
  list<K extends keyof Schema & string>(
    resource: K,
    query: ListQuery,
    options?: RequestOptions
  ): Promise<ListResult<Schema[K]>>
  getOne<K extends keyof Schema & string>(resource: K, id: string, options?: RequestOptions): Promise<Schema[K]>
  create<K extends keyof Schema & string>(
    resource: K,
    input: Omit<Schema[K], 'id'>,
    options?: RequestOptions
  ): Promise<Schema[K]>
  update<K extends keyof Schema & string>(
    resource: K,
    id: string,
    input: Partial<Omit<Schema[K], 'id'>>,
    options?: RequestOptions
  ): Promise<Schema[K]>
  remove<K extends keyof Schema & string>(resource: K, id: string, options?: RequestOptions): Promise<void>
}
export type ResourceDefinitions<Schema extends { [K in keyof Schema]: DataRecord }> = {
  [K in keyof Schema]: { path: string; parse: (value: unknown) => Schema[K]; readOnly?: boolean }
}
export function assertListQuery(query: ListQuery) {
  if (
    !Number.isInteger(query.page) ||
    query.page < 1 ||
    !Number.isInteger(query.pageSize) ||
    query.pageSize < 1 ||
    query.pageSize > 200
  )
    throw new Error('Invalid pagination')
  if (query.order !== undefined && !['asc', 'desc'].includes(query.order)) throw new Error('Invalid sort order')
}

/** REST uses {items,total} for lists and records for writes, optionally inside {code,data}. */
export function createRestDataProvider<Schema extends { [K in keyof Schema]: DataRecord }>(
  client: JsonClient,
  resources: ResourceDefinitions<Schema>
): DataProvider<Schema> {
  const writable = (resource: keyof Schema) => {
    if (resources[resource].readOnly) throw new Error('Resource is read-only')
  }
  const endpoint = (resource: keyof Schema, id: string) => `${resources[resource].path}/${encodeURIComponent(id)}`
  return {
    async list(resource, query, options) {
      assertListQuery(query)
      const value = unwrapPayload(
        await client.get(
          resources[resource].path,
          { ...query },
          { cancelDuplicate: false, addTimestamp: false, ...options }
        )
      )
      if (!isRecord(value) || !Array.isArray(value.items) || !Number.isInteger(value.total) || Number(value.total) < 0)
        throw new Error(`Invalid list response: ${resource}`)
      return { items: value.items.map(resources[resource].parse), total: Number(value.total) }
    },
    async getOne(resource, id, options) {
      return resources[resource].parse(unwrapPayload(await client.get(endpoint(resource, id), {}, options)))
    },
    async create(resource, input, options) {
      writable(resource)
      return resources[resource].parse(unwrapPayload(await client.post(resources[resource].path, input, options)))
    },
    async update(resource, id, input, options) {
      writable(resource)
      return resources[resource].parse(unwrapPayload(await client.patch(endpoint(resource, id), input, options)))
    },
    async remove(resource, id, options) {
      writable(resource)
      unwrapPayload(await client.delete(endpoint(resource, id), {}, options))
    },
  }
}
