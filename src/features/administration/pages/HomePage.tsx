import { Button, Typography, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PermissionGuard from '@platform/auth/components/PermissionGuard'
import FixTabPanel from '@shared/ui/FixTabPanel'
import styles from './workspace.module.less'

export default function AdministrationHome() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <FixTabPanel fill={false}>
      <section className={styles.workspace} aria-labelledby="administration-home-title">
        <Typography.Title id="administration-home-title" level={1}>
          {t('admin.workspace')}
        </Typography.Title>
        <Typography.Paragraph type="secondary">{t('admin.workspaceDescription')}</Typography.Paragraph>
        <Space wrap>
          <PermissionGuard permission="user:read">
            <Button type="primary" onClick={() => navigate('/administration/users')}>
              {t('admin.users')}
            </Button>
          </PermissionGuard>
          <PermissionGuard permission="role:read">
            <Button onClick={() => navigate('/administration/roles')}>{t('admin.roles')}</Button>
          </PermissionGuard>
          <PermissionGuard permission="role:read">
            <Button onClick={() => navigate('/administration/permissions')}>{t('admin.permissionManagement')}</Button>
          </PermissionGuard>
          <PermissionGuard permission="tenant:read">
            <Button onClick={() => navigate('/administration/tenants')}>{t('admin.tenants')}</Button>
          </PermissionGuard>
          <PermissionGuard permission="audit:read">
            <Button onClick={() => navigate('/administration/audit')}>{t('admin.audit')}</Button>
          </PermissionGuard>
          <PermissionGuard permission="access:read">
            <Button onClick={() => navigate('/administration/access-requests')}>{t('admin.accessRequests')}</Button>
          </PermissionGuard>
        </Space>
      </section>
    </FixTabPanel>
  )
}
