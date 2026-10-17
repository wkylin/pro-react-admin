import type { ApplicationModule } from '@platform/modules'
import { notificationRoutes } from './routes'
import { NotificationsProvider } from './model/notificationsStore'
import { NotificationAction } from './components/NotificationAction'
import { notificationsManifest } from './manifest'

export const notificationsModule: ApplicationModule = {
  ...notificationsManifest,
  routes: notificationRoutes,
  Provider: NotificationsProvider,
  headerAction: { Component: NotificationAction, route: '/notifications' },
}
