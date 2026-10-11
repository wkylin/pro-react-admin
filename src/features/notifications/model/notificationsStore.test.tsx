import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationsProvider, useNotificationsStore } from './notificationsStore'

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
