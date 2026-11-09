import type { Notification } from './types'

export interface NotificationListQuery {
  search: string
  status: 'all' | 'read' | 'unread'
  sort: 'newest' | 'oldest'
}

export function filterNotifications(items: Notification[], query: NotificationListQuery): Notification[] {
  const search = query.search.trim().toLowerCase()
  return items
    .filter(
      (item) =>
        (!search || item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search)) &&
        (query.status === 'all' || item.read === (query.status === 'read'))
    )
    .sort((left, right) => {
      const order = left.time.localeCompare(right.time) || left.id - right.id
      return query.sort === 'oldest' ? order : -order
    })
}

function csvCell(value: string): string {
  const safe = /^\s*[=+\-@]/u.test(value) ? `'${value}` : value
  return /[",\r\n]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe
}

export function notificationsToCsv(
  items: Notification[],
  headers: string[],
  statusLabel: (item: Notification) => string
): string {
  const rows = items.map((item) => [String(item.id), item.title, item.description, item.time, statusLabel(item)])
  return `\uFEFF${[headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`
}

export function formatNotificationTime(value: string, locale: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
}
