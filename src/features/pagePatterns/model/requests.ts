import { assertListQuery, type DataProvider, type ListQuery, type ListResult } from '@platform/data/provider'
import type { RequestOptions } from '@platform/api/client'

export type RequestCategory = 'operations' | 'support' | 'finance'
export type RequestPriority = 'low' | 'medium' | 'high'
export type RequestStatus = 'pending' | 'active' | 'done'

export interface ExampleRequest {
  id: string
  title: string
  owner: string
  category: RequestCategory
  priority: RequestPriority
  status: RequestStatus
  description: string
  dueDate?: string
  createdAt: string
}

export interface RequestSchema {
  requests: ExampleRequest
}

export type RequestInput = Omit<ExampleRequest, 'id' | 'status' | 'createdAt' | 'description'> & {
  description?: string
}
export interface RequestListQuery extends ListQuery {
  status?: RequestStatus
  category?: RequestCategory
}

export interface ExampleRequestProvider extends DataProvider<RequestSchema> {
  listRequests(query: RequestListQuery, options?: RequestOptions): Promise<ListResult<ExampleRequest>>
  createRequest(input: RequestInput): Promise<ExampleRequest>
}

const categories: RequestCategory[] = ['operations', 'support', 'finance']
const priorities: RequestPriority[] = ['low', 'medium', 'high']
const statuses: RequestStatus[] = ['pending', 'active', 'done']

const seed = (): ExampleRequest[] =>
  Array.from({ length: 12 }, (_, index) => ({
    id: `REQ-${String(1001 + index)}`,
    title: `Example request ${String(index + 1).padStart(2, '0')}`,
    owner: ['Alex', 'Morgan', 'Taylor', 'Sam'][index % 4],
    category: categories[index % categories.length],
    priority: priorities[index % priorities.length],
    status: statuses[index % statuses.length],
    description: `Reference record ${index + 1} for the page pattern workflow.`,
    createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
  }))

function validateInput(input: RequestInput): Omit<ExampleRequest, 'id' | 'status' | 'createdAt'> {
  const title = input.title?.trim()
  const owner = input.owner?.trim()
  const description = input.description?.trim() ?? ''
  if (!title || title.length < 4 || title.length > 100) throw new Error('Title must contain 4–100 characters')
  if (!owner || owner.length > 80) throw new Error('Owner is required and must be at most 80 characters')
  if (!categories.includes(input.category)) throw new Error('Invalid category')
  if (!priorities.includes(input.priority)) throw new Error('Invalid priority')
  if (description.length > 500) throw new Error('Description must be at most 500 characters')
  if (input.dueDate) {
    const dueDate = new Date(`${input.dueDate}T00:00:00Z`)
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(input.dueDate) ||
      !Number.isFinite(dueDate.getTime()) ||
      dueDate.toISOString().slice(0, 10) !== input.dueDate
    )
      throw new Error('Invalid due date')
  }
  return { title, owner, description, category: input.category, priority: input.priority, dueDate: input.dueDate }
}

function checkSignal(options?: RequestOptions) {
  if (options?.signal?.aborted) throw new DOMException('Aborted', 'AbortError')
}

/** Demo data belongs to one mounted module instance; it never touches Enterprise API or localStorage. */
export function createExampleRequestProvider(): ExampleRequestProvider {
  let records = seed()
  let nextId = 1001 + records.length
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((listener) => listener())

  const listRequests = async (query: RequestListQuery, options?: RequestOptions) => {
    checkSignal(options)
    assertListQuery(query)
    if (query.status && !statuses.includes(query.status)) throw new Error('Invalid status filter')
    if (query.category && !categories.includes(query.category)) throw new Error('Invalid category filter')
    if (query.sort && !['createdAt', 'title'].includes(query.sort)) throw new Error('Invalid sort field')
    const search = query.search?.trim().toLocaleLowerCase() ?? ''
    const filtered = records.filter(
      (request) =>
        (!query.status || request.status === query.status) &&
        (!query.category || request.category === query.category) &&
        (!search ||
          [request.id, request.title, request.owner].some((value) => value.toLocaleLowerCase().includes(search)))
    )
    const sort = query.sort === 'title' ? 'title' : 'createdAt'
    const order = query.order === 'asc' ? 1 : -1
    filtered.sort((left, right) => order * String(left[sort]).localeCompare(String(right[sort])))
    const start = (query.page - 1) * query.pageSize
    return {
      items: filtered.slice(start, start + query.pageSize).map((request) => ({ ...request })),
      total: filtered.length,
    }
  }

  const provider: ExampleRequestProvider = {
    subscribe(_resource, listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    list: (_resource, query, options) => listRequests(query, options),
    listRequests,
    async getOne(_resource, id, options) {
      checkSignal(options)
      const request = records.find((item) => item.id === id)
      if (!request) throw new Error('Request not found')
      return { ...request }
    },
    async create(_resource, input, options) {
      checkSignal(options)
      const fields = validateInput(input)
      if (!statuses.includes(input.status)) throw new Error('Invalid status')
      if (!Number.isFinite(Date.parse(input.createdAt))) throw new Error('Invalid creation time')
      const request = { ...fields, id: `REQ-${nextId++}`, status: input.status, createdAt: input.createdAt }
      records = [request, ...records]
      notify()
      return { ...request }
    },
    async createRequest(input) {
      return provider.create('requests', {
        ...input,
        description: input.description ?? '',
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
    },
    async update(_resource, id, input, options) {
      checkSignal(options)
      const existing = records.find((item) => item.id === id)
      if (!existing) throw new Error('Request not found')
      const merged = { ...existing, ...input }
      const fields = validateInput(merged)
      if (!statuses.includes(merged.status)) throw new Error('Invalid status')
      const request = { ...merged, ...fields, id: existing.id, createdAt: existing.createdAt }
      records = records.map((item) => (item.id === id ? request : item))
      notify()
      return { ...request }
    },
    async remove(_resource, id, options) {
      checkSignal(options)
      if (!records.some((item) => item.id === id)) throw new Error('Request not found')
      records = records.filter((item) => item.id !== id)
      notify()
    },
  }
  return provider
}
