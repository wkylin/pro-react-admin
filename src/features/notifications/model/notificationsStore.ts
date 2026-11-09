import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'
import { createContext, createElement, useContext, useState, type ReactNode } from 'react'
import type { Notification, NotificationDraft } from './types'

export interface NotificationsState {
  notifications: Notification[]
  add: (draft: NotificationDraft) => Notification
  update: (id: number, draft: NotificationDraft) => Notification | null
  markRead: (id: number) => void
  markAllRead: () => void
  remove: (id: number) => void
  clear: () => void
}

function validateDraft(draft: NotificationDraft): NotificationDraft {
  const title = draft.title.trim()
  const description = draft.description.trim()
  if (!title || title.length > 100 || !description || description.length > 2000 || typeof draft.read !== 'boolean')
    throw new Error('invalid-notification-draft')
  return { title, description, read: draft.read }
}

export const createNotificationsStore = (now: () => Date = () => new Date()) => {
  const seedTimestamp = now().getTime()
  const initialNotifications: Notification[] = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: index < 5 ? '新功能上线' : `消息标题 ${index + 1}`,
    description: `这是第 ${index + 1} 条消息的内容，支持详情查看。`,
    read: index % 3 === 0,
    time: new Date(seedTimestamp - (index + 1) * 60_000).toISOString(),
  }))
  let nextId = Math.max(0, ...initialNotifications.map((notification) => notification.id)) + 1
  return createStore<NotificationsState>((set, get) => ({
    notifications: initialNotifications.map((notification) => ({ ...notification })),
    add: (draft) => {
      const fields = validateDraft(draft)
      const notification: Notification = { ...fields, id: nextId++, time: now().toISOString() }
      set((state) => ({ notifications: [notification, ...state.notifications] }))
      return notification
    },
    update: (id, draft) => {
      const existing = get().notifications.find((notification) => notification.id === id)
      if (!existing) return null
      const notification = { ...existing, ...validateDraft(draft) }
      set((state) => ({ notifications: state.notifications.map((item) => (item.id === id ? notification : item)) }))
      return notification
    },
    markRead: (id) =>
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
      })),
    markAllRead: () =>
      set((state) => ({
        notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
      })),
    remove: (id) => set((state) => ({ notifications: state.notifications.filter((item) => item.id !== id) })),
    clear: () => set({ notifications: [] }),
  }))
}

const Context = createContext<ReturnType<typeof createNotificationsStore> | null>(null)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createNotificationsStore)
  return createElement(Context.Provider, { value: store }, children)
}

export function useNotificationsStore<T>(selector: (state: NotificationsState) => T): T {
  const store = useContext(Context)
  if (!store) throw new Error('NotificationsProvider required')
  return useStore(store, selector)
}
