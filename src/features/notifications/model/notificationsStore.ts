import { create } from 'zustand'
import type { Notification } from './types'

export interface NotificationsState {
  notifications: Notification[]
  markRead: (id: number) => void
  markAllRead: () => void
  remove: (id: number) => void
  clear: () => void
}

const initialNotifications: Notification[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: index < 5 ? '新功能上线' : `消息标题 ${index + 1}`,
  description: `这是第 ${index + 1} 条消息的内容，支持详情查看。`,
  read: index % 3 === 0,
  time: `${index + 1} 分钟前`,
}))

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: initialNotifications,
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
