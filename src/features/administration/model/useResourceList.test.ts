import { readListQuery, writeListQuery } from './useResourceList'

test('list state round-trips through the URL without losing unrelated parameters', () => {
  const original = new URLSearchParams('tab=details&page=3&size=25&search=alice&sort=name&order=desc')
  expect(readListQuery(original)).toEqual({ page: 3, pageSize: 25, search: 'alice', sort: 'name', order: 'desc' })

  const changed = writeListQuery(original, { page: 1, pageSize: 10, search: 'bob' })
  expect(changed.toString()).toBe('tab=details&search=bob')
  expect(original.get('search')).toBe('alice')
})

test('invalid and excessive query values return safe pagination defaults', () => {
  const query = readListQuery(new URLSearchParams('page=-2&size=99999&search=%20%20&order=desc'))
  expect(query).toEqual({ page: 1, pageSize: 10 })
})
