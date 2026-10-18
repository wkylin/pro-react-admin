import type { ReactNode, FC } from 'react'
import { Navigate } from 'react-router-dom'
import { readStoredToken } from '../model/session'
import { usePermission } from '../hooks/usePermission'
import { evaluateAccessRequirements } from '../model/policy'
import type { PermissionCode } from '../model/permission'
import { useTranslation } from 'react-i18next'

interface ProtectedRouteProps {
  children: ReactNode
  // 可选的权限/角色检查
  permission?: PermissionCode | PermissionCode[]
  roles?: string[]
  requireAll?: boolean
  fallback?: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  permission,
  roles,
  requireAll = false,
  fallback,
}) => {
  const { current, loading } = usePermission()
  const { t } = useTranslation()
  if (!readStoredToken()) return <Navigate to="/signin" replace />
  if (!permission && !roles?.length) return <>{children}</>
  if (loading && !current) return <div role="status">{t('identity.checkingPermissions')}</div>
  const allowed = current && evaluateAccessRequirements(current, { permission, roles, requireAll })
  return allowed ? <>{children}</> : fallback !== undefined ? <>{fallback}</> : <Navigate to="/403" replace />
}
