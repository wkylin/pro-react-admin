import { lazy } from 'react'
import type { RouteNode } from '@platform/navigation/routes'

const UsersPage = lazy(() => import('./pages/UsersPage'))
const RolesPage = lazy(() => import('./pages/RolesPage'))
const AuditPage = lazy(() => import('./pages/AuditPage'))

export const administrationRoutes: RouteNode[] = [
  { path: 'administration/users', name: '用户管理', auth: true, element: <UsersPage /> },
  { path: 'administration/roles', name: '角色管理', auth: true, element: <RolesPage /> },
  { path: 'administration/audit', name: '审计日志', auth: true, element: <AuditPage /> },
]
