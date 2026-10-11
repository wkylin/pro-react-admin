import { Button, Typography, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PermissionGuard from '@platform/auth/components/PermissionGuard'
import styles from './workspace.module.less'

export default function AdministrationHome() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <section className={styles.workspace}>
      <Typography.Title level={2}>{t('admin.workspace')}</Typography.Title>
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
        <PermissionGuard permission="audit:read">
          <Button onClick={() => navigate('/administration/audit')}>{t('admin.audit')}</Button>
        </PermissionGuard>
      </Space>
    </section>
  )
}
