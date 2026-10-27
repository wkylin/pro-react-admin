import { useCallback, useEffect, useState } from 'react'
import { Alert, App, Button, Descriptions, Input, Modal, Select, Space, Table, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCheckPermission } from '@platform/auth/hooks/usePermission'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { permissionService } from '@platform/auth/services/permissionService'
import type { AccessRequest, AccessStatus } from '../api/accessRequests'
import { useAdministration } from '../model/AdministrationProvider'
import type { ManagedRole, ManagedUser } from '../model/resources'
import ResourceWorkspace from './ResourceWorkspace'

export default function AccessRequestsPage() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const { access, provider, demo, accessRevision } = useAdministration()
  const canApprove = useCheckPermission('access:approve').hasPermission
  const { current } = usePermission()
  const [status, setStatus] = useState<AccessStatus | undefined>('pending')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<AccessRequest[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [selected, setSelected] = useState<AccessRequest | null>(null)
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [revision, setRevision] = useState(0)
  const reload = useCallback(() => setRevision((value) => value + 1), [])
  useEffect(() => {
    let active = true
    setLoading(true)
    void access
      .list({ page, pageSize: 20, status })
      .then(
        (result) => {
          if (!active) return
          setItems(result.items)
          setTotal(result.total)
          setError(undefined)
        },
        (cause) => {
          if (active) setError(cause instanceof Error ? cause.message : t('admin.loadFailed'))
        }
      )
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [access, page, status, revision, accessRevision, t])
  const decide = async (decision: 'approve' | 'reject') => {
    if (!selected || !reason.trim()) return
    setBusy(true)
    try {
      const result = await access.decide(selected.id, decision, reason.trim())
      if (result.status === 'approved') {
        provider.invalidate?.(result.kind === 'role' ? 'roles' : 'users')
        if (!demo) await permissionService.getPermissions(true)
      }
      void message.success(t(`admin.accessStatus.${result.status}`))
      setSelected(null)
      setReason('')
      reload()
    } catch (cause) {
      void message.error(cause instanceof Error ? cause.message : t('admin.saveFailed'))
    } finally {
      setBusy(false)
    }
  }
  const role = selected?.kind === 'role'
  const independent =
    !!selected &&
    !!current &&
    selected.actorId !== current.userId &&
    !(selected.kind === 'user' && selected.targetId === current.userId) &&
    !(selected.kind === 'role' && current.roles.some((item) => item.code === (selected.before as ManagedRole).code))
  return (
    <ResourceWorkspace
      title={t('admin.accessRequests')}
      description={t('admin.accessRequestsDescription')}
      onReload={reload}
      error={error}
      actions={
        <Select
          aria-label={t('admin.status')}
          value={status ?? 'all'}
          style={{ minWidth: 150 }}
          onChange={(value) => {
            setStatus(value === 'all' ? undefined : (value as AccessStatus))
            setPage(1)
          }}
          options={['pending', 'approved', 'rejected', 'stale', 'all'].map((value) => ({
            value,
            label: t(`admin.accessStatus.${value}`),
          }))}
        />
      }
    >
      <Table<AccessRequest>
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          {
            title: t('admin.accessTarget'),
            key: 'target',
            render: (_, request) => (
              <Space orientation="vertical" size={0}>
                <Typography.Text strong>
                  {request.kind === 'role'
                    ? (request.before as ManagedRole).name
                    : (request.before as ManagedUser).email}
                </Typography.Text>
                <Typography.Text type="secondary">{t(`admin.accessKind.${request.kind}`)}</Typography.Text>
              </Space>
            ),
          },
          { title: t('admin.actor'), dataIndex: 'actor', responsive: ['md'] },
          { title: t('admin.affectedUsers'), dataIndex: ['affected', 'count'], responsive: ['md'] },
          {
            title: t('admin.status'),
            dataIndex: 'status',
            render: (value: AccessStatus) => (
              <Tag
                color={
                  value === 'pending'
                    ? 'processing'
                    : value === 'approved'
                      ? 'success'
                      : value === 'stale'
                        ? 'warning'
                        : 'default'
                }
              >
                {t(`admin.accessStatus.${value}`)}
              </Tag>
            ),
          },
          {
            title: t('admin.time'),
            dataIndex: 'createdAt',
            responsive: ['lg'],
            render: (value: string) => new Date(value).toLocaleString(),
          },
          {
            title: t('admin.actions'),
            key: 'actions',
            render: (_, request) => (
              <Button
                type="link"
                onClick={() => {
                  setSelected(request)
                  setReason('')
                }}
              >
                {t('admin.accessDetails')}
              </Button>
            ),
          },
        ]}
        pagination={{ current: page, pageSize: 20, total, onChange: setPage, showSizeChanger: false }}
        locale={{ emptyText: t('admin.accessEmpty') }}
        scroll={{ x: 640 }}
      />
      <Modal
        open={!!selected}
        title={t('admin.accessDetails')}
        onCancel={() => {
          if (!busy) setSelected(null)
        }}
        footer={
          selected?.status === 'pending' && canApprove && independent ? (
            <Space>
              <Button onClick={() => setSelected(null)}>{t('admin.cancel')}</Button>
              <Button disabled={!reason.trim()} loading={busy} onClick={() => void decide('reject')}>
                {t('admin.accessReject')}
              </Button>
              <Button type="primary" disabled={!reason.trim()} loading={busy} onClick={() => void decide('approve')}>
                {t('admin.accessApprove')}
              </Button>
            </Space>
          ) : (
            <Button onClick={() => setSelected(null)}>{t('admin.cancel')}</Button>
          )
        }
        destroyOnHidden
      >
        {selected && (
          <Space orientation="vertical" style={{ width: '100%' }} size="middle">
            {selected.status === 'stale' && <Alert type="warning" showIcon title={t('admin.accessStale')} />}
            {selected.status === 'pending' && canApprove && !independent && (
              <Alert type="info" showIcon title={t('admin.accessCannotReview')} />
            )}
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label={t('admin.actor')}>{selected.actor}</Descriptions.Item>
              <Descriptions.Item label={t('admin.accessReason')}>{selected.reason}</Descriptions.Item>
              <Descriptions.Item label={t('admin.accessBefore')}>
                {role
                  ? (selected.before as ManagedRole).permissions.join(', ') || '—'
                  : `${(selected.before as ManagedUser).role} · ${t(`admin.${(selected.before as ManagedUser).status}`)}`}
              </Descriptions.Item>
              <Descriptions.Item label={t('admin.accessAfter')}>
                {role
                  ? (selected.after as ManagedRole).permissions.join(', ') || '—'
                  : `${(selected.after as ManagedUser).role} · ${t(`admin.${(selected.after as ManagedUser).status}`)}`}
              </Descriptions.Item>
              {role && (
                <Descriptions.Item label={t('admin.resourceScope')}>
                  {(['user', 'role'] as const).map((resource) => (
                    <div key={resource}>
                      {t(`admin.scopeResource.${resource}`)}:{' '}
                      {t(`admin.scopeMode.${(selected.before as ManagedRole).scopes?.[resource]?.mode ?? 'global'}`)}
                      {(selected.before as ManagedRole).scopes?.[resource]?.ids.length
                        ? ` (${(selected.before as ManagedRole).scopes?.[resource]?.ids.join(', ')})`
                        : ''}
                      {' → '}
                      {t(`admin.scopeMode.${(selected.after as ManagedRole).scopes?.[resource]?.mode ?? 'global'}`)}
                      {(selected.after as ManagedRole).scopes?.[resource]?.ids.length
                        ? ` (${(selected.after as ManagedRole).scopes?.[resource]?.ids.join(', ')})`
                        : ''}
                    </div>
                  ))}
                </Descriptions.Item>
              )}
              <Descriptions.Item label={t('admin.affectedUsers')}>{selected.affected.count}</Descriptions.Item>
              <Descriptions.Item label={t('admin.status')}>
                {t(`admin.accessStatus.${selected.status}`)}
              </Descriptions.Item>
              {selected.decisionReason && (
                <Descriptions.Item label={t('admin.accessDecisionReason')}>{selected.decisionReason}</Descriptions.Item>
              )}
            </Descriptions>
            {!!selected.affected.sample.length && (
              <Typography.Text type="secondary">
                {selected.affected.sample.map((user) => user.name).join('、')}
              </Typography.Text>
            )}
            {selected.status === 'pending' && canApprove && independent && (
              <Input.TextArea
                aria-label={t('admin.accessDecisionReason')}
                placeholder={t('admin.accessDecisionReason')}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                maxLength={500}
                showCount
                rows={3}
              />
            )}
          </Space>
        )}
      </Modal>
    </ResourceWorkspace>
  )
}
