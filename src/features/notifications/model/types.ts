export interface Notification {
  id: number
  title: string
  description: string
  read: boolean
  time: string
}

export interface NotificationSearchValues {
  title?: string
  read?: boolean | ''
  createdAt?: Array<NotificationDateValue>
  minId?: number | ''
  start?: string
  end?: string
}

export type NotificationDateValue = { toISOString?: () => string } | string
