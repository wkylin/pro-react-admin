import { filterNotifications, notificationsToCsv } from './notificationList'
import type { Notification } from './types'

const records: Notification[] = [
  {
    id: 1,
    title: 'Release review',
    description: 'Confirm support coverage',
    read: false,
    time: '2026-11-09T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'Customer reply',
    description: 'RELEASE feedback received',
    read: true,
    time: '2026-11-08T09:00:00.000Z',
  },
  { id: 3, title: 'Weekly plan', description: 'Prepare next sprint', read: false, time: '2026-11-07T09:00:00.000Z' },
]

test('combines case-insensitive title/content search with read status and sorting', () => {
  expect(
    filterNotifications(records, { search: ' release ', status: 'unread', sort: 'oldest' }).map((item) => item.id)
  ).toEqual([1])
  expect(
    filterNotifications(records, { search: 'release', status: 'all', sort: 'oldest' }).map((item) => item.id)
  ).toEqual([2, 1])
  expect(filterNotifications(records, { search: '', status: 'read', sort: 'newest' }).map((item) => item.id)).toEqual([
    2,
  ])
  expect(records.map((item) => item.id)).toEqual([1, 2, 3])
})

test('serializes only supplied rows and escapes CSV text and formula prefixes', () => {
  const item = { ...records[0], title: '  =SUM(A1)', description: 'Details, "quoted"\nnext line' }
  const csv = notificationsToCsv([item], ['ID', 'Title', 'Content', 'Time', 'Status'], () => 'Unread')
  expect(csv.startsWith('\uFEFF')).toBe(true)
  expect(csv).toContain("'  =SUM(A1)")
  expect(csv).toContain('"Details, ""quoted""\nnext line"')
  expect(csv).not.toContain('Customer reply')
  expect(csv.endsWith('\r\n')).toBe(true)
})
