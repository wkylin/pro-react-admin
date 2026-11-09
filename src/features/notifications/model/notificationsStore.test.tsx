import { render, screen, fireEvent } from '@testing-library/react'
import { createNotificationsStore, NotificationsProvider, useNotificationsStore } from './notificationsStore'
import { filterNotifications } from './notificationList'

function Inbox({ name }: { name: string }) {
  const count = useNotificationsStore((state) => state.notifications.filter((item) => !item.read).length)
  const clear = useNotificationsStore((state) => state.clear)
  return (
    <button onClick={clear}>
      {name}:{count}
    </button>
  )
}

test('clearing notifications in one application leaves the other application inbox intact', () => {
  render(
    <>
      <NotificationsProvider>
        <Inbox name="A" />
      </NotificationsProvider>
      <NotificationsProvider>
        <Inbox name="B" />
      </NotificationsProvider>
    </>
  )
  fireEvent.click(screen.getByRole('button', { name: 'A:8' }))
  expect(screen.getByRole('button', { name: 'A:0' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'B:8' })).toBeVisible()
})

test('creates, edits and removes notifications while preserving identity and creation time', () => {
  const store = createNotificationsStore()
  const added = store
    .getState()
    .add({ title: '  Release review  ', description: '  Check support coverage  ', read: false })
  expect(added).toMatchObject({ id: 13, title: 'Release review', description: 'Check support coverage', read: false })
  expect(Number.isFinite(Date.parse(added.time))).toBe(true)
  expect(store.getState().notifications.filter((item) => !item.read)).toHaveLength(9)
  const updated = store
    .getState()
    .update(added.id, { title: 'Release approved', description: 'Review completed', read: true })
  expect(updated).toMatchObject({ id: added.id, title: 'Release approved', time: added.time, read: true })
  expect(store.getState().notifications.filter((item) => !item.read)).toHaveLength(8)
  store.getState().remove(added.id)
  expect(store.getState().notifications.find((item) => item.id === added.id)).toBeUndefined()
  expect(store.getState().update(added.id, { title: 'Missing', description: 'No recreation', read: false })).toBeNull()
  expect(store.getState().notifications).toHaveLength(12)
})

test('does not reuse deleted notification ids or mutate state for invalid drafts', () => {
  const store = createNotificationsStore()
  const draft = { title: 'Valid title', description: 'Valid content', read: false }
  const first = store.getState().add(draft)
  store.getState().clear()
  const second = store.getState().add(draft)
  expect(second.id).toBeGreaterThan(first.id)
  expect(() => store.getState().add({ ...draft, title: '   ' })).toThrow()
  expect(() => store.getState().update(second.id, { ...draft, description: ' ' })).toThrow()
  expect(() => store.getState().add({ ...draft, title: 'x'.repeat(101) })).toThrow()
  expect(() => store.getState().add({ ...draft, description: 'x'.repeat(2001) })).toThrow()
  expect(store.getState().notifications).toEqual([second])
})

test('seeds earlier messages relative to its clock so newly created notifications sort first', () => {
  const timestamp = '2026-11-09T08:47:00.000Z'
  const store = createNotificationsStore(() => new Date(timestamp))
  const seeded = store.getState().notifications
  expect(seeded.every((notification) => Date.parse(notification.time) < Date.parse(timestamp))).toBe(true)
  const added = store
    .getState()
    .add({ title: 'Current message', description: 'Created in the current session', read: false })
  expect(added.time).toBe(timestamp)
  expect(filterNotifications(store.getState().notifications, { search: '', status: 'all', sort: 'newest' })[0].id).toBe(
    added.id
  )
})
