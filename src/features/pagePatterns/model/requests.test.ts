import { createExampleRequestProvider, type RequestInput } from './requests'

const query = { page: 1, pageSize: 5 }
const input: RequestInput = {
  title: 'Prepare a project workspace',
  owner: 'Morgan',
  category: 'operations',
  priority: 'high',
  description: 'Create access and a shared workspace.',
  dueDate: '2026-12-15',
}

test('search, status filter, sorting and pagination return consistent totals', async () => {
  const provider = createExampleRequestProvider()
  const first = await provider.listRequests(query)
  expect(first).toHaveProperty('total', 12)
  expect(first.items).toHaveLength(5)
  expect((await provider.listRequests({ ...query, page: 3 })).items).toHaveLength(2)

  const searched = await provider.listRequests({ ...query, search: 'Example request 01' })
  expect(searched.items.map((request) => request.id)).toEqual(['REQ-1001'])
  const pending = await provider.listRequests({ ...query, status: 'pending' })
  expect(pending.total).toBe(4)
  expect(pending.items.every((request) => request.status === 'pending')).toBe(true)
  const ascending = await provider.listRequests({ ...query, sort: 'title', order: 'asc' })
  expect(ascending.items[0].title).toBe('Example request 01')
})

test('creation, detail and status changes stay in one provider and notify subscribers', async () => {
  const provider = createExampleRequestProvider()
  const listener = jest.fn()
  const unsubscribe = provider.subscribe?.('requests', listener)
  const created = await provider.createRequest(input)
  expect(created).toMatchObject({ title: input.title, status: 'pending', id: 'REQ-1013' })
  expect((await provider.listRequests({ ...query, search: 'Prepare a project' })).items).toHaveLength(1)
  expect((await provider.getOne('requests', created.id)).title).toBe(input.title)

  const changed = await provider.update('requests', created.id, { status: 'active' })
  expect(changed.status).toBe('active')
  expect((await provider.getOne('requests', created.id)).status).toBe('active')
  expect(listener).toHaveBeenCalledTimes(2)
  unsubscribe?.()
  await provider.remove('requests', created.id)
  expect(listener).toHaveBeenCalledTimes(2)
  await expect(provider.getOne('requests', created.id)).rejects.toThrow('not found')
})

test('a second workspace has independent data and invalid writes leave the first unchanged', async () => {
  const first = createExampleRequestProvider()
  const second = createExampleRequestProvider()
  await expect(first.createRequest({ ...input, dueDate: '2026-02-31' })).rejects.toThrow('due date')
  await expect(first.createRequest({ ...input, title: 'bad' })).rejects.toThrow('Title')
  expect((await first.listRequests(query)).total).toBe(12)

  const created = await first.createRequest(input)
  expect((await first.listRequests(query)).total).toBe(13)
  expect((await second.listRequests(query)).total).toBe(12)
  const returned = await first.getOne('requests', created.id)
  returned.title = 'Mutated outside the provider'
  expect((await first.getOne('requests', created.id)).title).toBe(input.title)

  const controller = new AbortController()
  controller.abort()
  await expect(first.remove('requests', created.id, { signal: controller.signal })).rejects.toThrow()
  expect((await first.getOne('requests', created.id)).id).toBe(created.id)
})

test('the optional form description becomes a stable empty string', async () => {
  const provider = createExampleRequestProvider()
  const created = await provider.createRequest({ ...input, description: undefined })
  expect(created.description).toBe('')
  expect((await provider.getOne('requests', created.id)).description).toBe('')
})
