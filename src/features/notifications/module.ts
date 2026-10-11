import type { ApplicationModule } from '@platform/modules'
import { notificationRoutes } from './routes'
import { NotificationsProvider } from './model/notificationsStore'
import { NotificationAction } from './components/NotificationAction'

export const notificationsModule: ApplicationModule = {
  id: 'notifications',
  contractVersion: 1,
  routes: notificationRoutes,
  Provider: NotificationsProvider,
  headerAction: { Component: NotificationAction, route: '/notifications' },
}
