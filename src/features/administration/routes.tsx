import { lazy } from 'react'
import type { RouteNode } from '@platform/navigation/routes'

const UsersPage = lazy(() => import('./pages/UsersPage'))
const RolesPage = lazy(() => import('./pages/RolesPage'))
const TenantsPage = lazy(() => import('./pages/TenantsPage'))
const AuditPage = lazy(() => import('./pages/AuditPage'))
const AccessRequestsPage = lazy(() => import('./pages/AccessRequestsPage'))
const AuthenticatorPage = lazy(() => import('@platform/auth/components/AuthenticatorPage'))

export const administrationRoutes: RouteNode[] = [
  { path: 'administration/users', name: '用户管理', auth: true, element: <UsersPage /> },
  { path: 'administration/roles', name: '角色管理', auth: true, element: <RolesPage /> },
  { path: 'administration/permissions', name: '权限管理', auth: true, element: <RolesPage mode="permissions" /> },
  { path: 'administration/tenants', name: '租户管理', auth: true, element: <TenantsPage /> },
  { path: 'administration/audit', name: '审计日志', auth: true, element: <AuditPage /> },
  { path: 'administration/access-requests', name: '访问审批', auth: true, element: <AccessRequestsPage /> },
  {
    path: 'account/security',
    name: '登录验证器',
    auth: true,
    meta: { access: 'authenticated' },
    element: <AuthenticatorPage />,
  },
]
