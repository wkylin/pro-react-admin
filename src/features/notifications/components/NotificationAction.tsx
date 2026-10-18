import type { ModuleActionProps } from '@platform/modules'
import PermissionGuard from '@platform/auth/components/PermissionGuard'
import NotificationDrawer from './NotificationDrawer'

export function NotificationAction({ placement, buttonStyle }: ModuleActionProps) {
  return (
    <PermissionGuard permission="notification:read">
      <NotificationDrawer variant={placement === 'header' ? 'button' : 'inline'} buttonStyle={buttonStyle} />
    </PermissionGuard>
  )
}
