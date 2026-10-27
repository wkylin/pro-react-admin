import { useMemo } from 'react'
import { Alert, Button, Space, Table, Tag, Typography, type TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getEnv } from '@platform/config/env'
import { useApplicationModules } from '@platform/modules'
import { useCheckPermission } from '@platform/auth/hooks/usePermission'
import { permits } from '@platform/auth/model/accessDecision'
import { useResourceList } from '../model/useResourceList'
import type { ManagedRole } from '../model/resources'
import { permissionMatrixGroupsForProject } from '../model/permissionCatalog'
import ResourceWorkspace from './ResourceWorkspace'
import styles from './workspace.module.less'

export default function PermissionsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const projectId = getEnv('PROJECT')
  const { routes } = useApplicationModules()
  const permissionGroups = useMemo(() => permissionMatrixGroupsForProject(projectId, routes), [projectId, routes])
  const list = useResourceList('roles')
  const canEdit = useCheckPermission('role:update').hasPermission
  const columns: TableProps<ManagedRole>['columns'] = [
    {
      title: t('admin.role'),
      key: 'role',
      fixed: 'left',
      width: 190,
      render: (_, role) => (
        <div className={styles.identity}>
          <Typography.Text strong>{role.name}</Typography.Text>
          <Typography.Text className={styles.code} type="secondary">
            {role.code}
          </Typography.Text>
        </div>
      ),
    },
    ...permissionGroups.map(({ key, permissions }) => ({
      title: t(`admin.permissionResource.${key}`, { defaultValue: key }),
      key,
      width: key === 'user' || key === 'role' || key === 'tenant' ? 180 : 140,
      render: (_: unknown, role: ManagedRole) => {
        const granted = permissions.filter((permission) => permits(role.permissions, permission))
        return granted.length ? (
          <Space wrap size={[0, 4]}>
            {granted.map((permission) => (
              <Tag key={permission} color="success" title={permission}>
                {t(`admin.permissionAction.${permission.split(':')[1]}`, {
                  defaultValue: permission.split(':')[1],
                })}
              </Tag>
            ))}
          </Space>
        ) : (
          <Typography.Text type="secondary">{t('admin.permissionNone')}</Typography.Text>
        )
      },
    })),
    {
      title: t('admin.resourceScope'),
      key: 'scopes',
      width: 190,
      render: (_, role) => (
        <Space orientation="vertical" size={0}>
          {(['user', 'role'] as const).map((resource) => (
            <Typography.Text key={resource} type="secondary">
              {t(`admin.scopeResource.${resource}`)}:{' '}
              {t(`admin.scopeMode.${role.scopes?.[resource]?.mode ?? 'global'}`)}
            </Typography.Text>
          ))}
        </Space>
      ),
    },
  ]

  return (
    <ResourceWorkspace
      title={t('admin.permissionManagement')}
      description={t('admin.permissionManagementDescription')}
      onSearch={list.search}
      searchValue={list.query.search}
      onReload={list.reload}
      error={list.error}
      actions={
        canEdit ? <Button onClick={() => navigate('/administration/roles')}>{t('admin.editRoles')}</Button> : undefined
      }
    >
      <Alert type="info" showIcon title={t('admin.permissionMatrixNote')} />
      <Table
        rowKey="id"
        aria-label={t('admin.permissionManagement')}
        columns={columns}
        dataSource={list.data.items}
        loading={list.loading}
        scroll={{ x: 1150 }}
        locale={{ emptyText: t('admin.noRoles') }}
        pagination={{
          current: list.query.page,
          pageSize: list.query.pageSize,
          total: list.data.total,
          showSizeChanger: true,
          onChange: (page, pageSize) => list.setQuery((current) => ({ ...current, page, pageSize })),
        }}
      />
    </ResourceWorkspace>
  )
}
