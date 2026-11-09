import { lazy } from 'react'
import type { RouteNode } from '@platform/navigation/routes'

const Notifications = lazy(() => import('./pages/NotificationsPage'))
const NotificationDetail = lazy(() => import('./pages/NotificationDetail'))

export const notificationRoutes: RouteNode[] = [
  { path: 'notifications', name: '通知中心', i18nKey: 'notificationCenter.title', element: <Notifications /> },
  {
    path: 'notification/:id',
    name: '通知详情',
    i18nKey: 'notificationCenter.detailTitle',
    element: <NotificationDetail />,
  },
]
