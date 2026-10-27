import { readAccessRequestQuery, writeAccessRequestQuery } from './accessRequestQuery'

test('approval status and pagination are shareable without replacing unrelated URL state', () => {
  const original = new URLSearchParams('source=home&status=approved&page=3')
  expect(readAccessRequestQuery(original)).toEqual({ page: 3, status: 'approved' })
  const next = writeAccessRequestQuery(original, { nextStatus: 'all', nextPage: 1 })
  expect(next.toString()).toBe('source=home&status=all')
  expect(readAccessRequestQuery(next)).toEqual({ page: 1, status: undefined })
})

test('unknown approval filters return to pending requests', () => {
  expect(readAccessRequestQuery(new URLSearchParams('status=other&page=-1'))).toEqual({
    page: 1,
    status: 'pending',
  })
})
