import { useMemo, useState } from 'react'
import { Alert, Card, Descriptions, Input, Select, Space, Table, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { canAccessPath, hasEffectivePermission, routePolicies } from '@platform/auth/model/policy'
import { scopedDecision, scopeFor } from '@platform/auth/model/accessDecision'
import type { PermissionCode } from '@platform/auth/model/permission'

const permissions = [
  'user:read',
  'user:create',
  'user:update',
  'user:delete',
  'role:read',
  'role:create',
  'role:update',
  'role:delete',
  'audit:read',
  'access:read',
  'access:approve',
] as const

export default function PermissionExample() {
  const { t } = useTranslation()
  const { current, loading } = usePermission()
  const [permission, setPermission] = useState<PermissionCode>('user:read')
  const [recordId, setRecordId] = useState('')
  const menuRoutes = useMemo(
    () => Object.entries(routePolicies).filter(([, policy]) => policy.menu && !policy.menuGroup),
    []
  )
  if (loading)
    return (
      <FixTabPanel>
        <div style={{ padding: 24 }}>{t('identity.checkingPermissions')}</div>
      </FixTabPanel>
    )
  if (!current)
    return (
      <FixTabPanel>
        <div style={{ padding: 24 }}>
          <Alert type="warning" showIcon title={t('permissionInspector.unavailable')} />
        </div>
      </FixTabPanel>
    )
  const resource = permission.split(':', 1)[0]
  const recordScoped = resource === 'user' || resource === 'role'
  const allowed =
    recordScoped && !recordId.trim()
      ? false
      : hasEffectivePermission(current, permission, recordScoped ? recordId.trim() : undefined)
  const routeAllowed = hasEffectivePermission(current, permission)
  const roleDecisions = current.roles.map((role) => ({
    code: role.code,
    grant: role.permissions.join(', '),
    userScope: scopeFor(role.scopes, 'user'),
    roleScope: scopeFor(role.scopes, 'role'),
    result: scopedDecision(role.permissions, role.scopes, permission, recordId.trim() || undefined),
  }))
  return (
    <FixTabPanel>
      <div style={{ padding: 24, display: 'grid', gap: 16 }}>
        <div>
          <Typography.Title level={2}>{t('permissionInspector.title')}</Typography.Title>
          <Typography.Paragraph type="secondary">{t('permissionInspector.description')}</Typography.Paragraph>
        </div>
        <Alert type="info" showIcon title={t('permissionInspector.source')} />
        <Card title={t('permissionInspector.currentIdentity')}>
          <Descriptions column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label={t('admin.member')}>{current.username}</Descriptions.Item>
            <Descriptions.Item label={t('admin.role')}>
              {current.roles.map((role) => role.name).join(', ') || '—'}
            </Descriptions.Item>
          </Descriptions>
          <Space wrap>
            {current.roles.map((role) => (
              <Tag key={role.code}>{role.code}</Tag>
            ))}
          </Space>
        </Card>
        <Card title={t('permissionInspector.check')}>
          <Space wrap style={{ marginBottom: 16 }}>
            <Select
              aria-label={t('admin.permissions')}
              value={permission}
              style={{ minWidth: 190 }}
              onChange={setPermission}
              options={permissions.map((value) => ({ value, label: value }))}
            />
            {recordScoped && (
              <Input
                aria-label={t('permissionInspector.recordId')}
                placeholder={t('permissionInspector.recordId')}
                value={recordId}
                onChange={(event) => setRecordId(event.target.value)}
                style={{ width: 280 }}
              />
            )}
            <Tag color={allowed ? 'success' : 'error'}>
              {t(allowed ? 'permissionInspector.allowed' : 'permissionInspector.denied')}
            </Tag>
          </Space>
          {recordScoped && !recordId.trim() && (
            <Alert type="warning" showIcon title={t('permissionInspector.enterRecord')} />
          )}
          {recordScoped && (
            <Typography.Paragraph type="secondary" style={{ marginTop: 12 }}>
              {t('permissionInspector.routeResult')}:{' '}
              {t(routeAllowed ? 'permissionInspector.allowed' : 'permissionInspector.denied')}
            </Typography.Paragraph>
          )}
          <Table
            rowKey="code"
            pagination={false}
            size="small"
            dataSource={roleDecisions}
            columns={[
              { title: t('admin.role'), dataIndex: 'code' },
              { title: t('admin.permissions'), dataIndex: 'grant', ellipsis: true },
              {
                title: t('admin.resourceScope'),
                key: 'scope',
                render: (_, row) =>
                  recordScoped ? (
                    <span>{t(`admin.scopeMode.${resource === 'user' ? row.userScope.mode : row.roleScope.mode}`)}</span>
                  ) : (
                    '—'
                  ),
              },
              {
                title: t('permissionInspector.reason'),
                dataIndex: ['result', 'reason'],
                render: (reason: string) => t(`permissionInspector.decision.${reason}`),
              },
            ]}
            scroll={{ x: 620 }}
          />
        </Card>
        <Card title={t('permissionInspector.routes')}>
          <Table
            rowKey="path"
            size="small"
            pagination={{ pageSize: 10 }}
            dataSource={menuRoutes.map(([path, policy]) => ({
              path,
              permission: policy.permission,
              allowed: canAccessPath(current, path),
            }))}
            columns={[
              { title: t('permissionInspector.path'), dataIndex: 'path' },
              { title: t('admin.permissions'), dataIndex: 'permission' },
              {
                title: t('permissionInspector.result'),
                dataIndex: 'allowed',
                render: (value: boolean) => (
                  <Tag color={value ? 'success' : 'default'}>
                    {t(value ? 'permissionInspector.allowed' : 'permissionInspector.denied')}
                  </Tag>
                ),
              },
            ]}
            scroll={{ x: 520 }}
          />
        </Card>
      </div>
    </FixTabPanel>
  )
}
