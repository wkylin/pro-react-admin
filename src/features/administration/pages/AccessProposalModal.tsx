import { useState } from 'react'
import { Alert, App, Descriptions, Input, Modal, Space, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import type { AccessChange, AccessPreview } from '../api/accessRequests'
import { useAdministration } from '../model/AdministrationProvider'
import type { ManagedRole, ManagedUser } from '../model/resources'

export interface PendingProposal {
  change: AccessChange
  preview: AccessPreview
}

export default function AccessProposalModal({
  pending,
  onClose,
}: {
  pending: PendingProposal | null
  onClose: () => void
}) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const { access } = useAdministration()
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const close = () => {
    setReason('')
    setError(undefined)
    onClose()
  }
  const submit = async () => {
    if (!pending || !reason.trim()) return
    setBusy(true)
    try {
      await access.propose(pending.change, reason.trim(), pending.preview.fingerprint)
      close()
      void message.success(t('admin.accessSubmitted'))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t('admin.saveFailed'))
    } finally {
      setBusy(false)
    }
  }
  const role = pending?.preview.kind === 'role'
  const before = pending?.preview.before
  const after = pending?.preview.after
  return (
    <Modal
      open={!!pending}
      title={t('admin.accessPreview')}
      okText={t('admin.accessSubmit')}
      okButtonProps={{ disabled: !reason.trim() }}
      onOk={() => void submit()}
      onCancel={close}
      confirmLoading={busy}
      destroyOnHidden
      style={{ top: 24 }}
      styles={{ body: { maxHeight: 'min(65vh, calc(100dvh - 168px))', overflowY: 'auto', paddingBottom: 32 } }}
    >
      <Space orientation="vertical" style={{ width: '100%' }} size="middle">
        <Alert type="info" showIcon title={t('admin.accessApprovalNotice')} />
        {error && <Alert type="error" showIcon title={error} />}
        <Descriptions column={1} size="small" bordered>
          <Descriptions.Item label={t('admin.accessTarget')}>
            {role ? (before as ManagedRole)?.name : (before as ManagedUser)?.email}
          </Descriptions.Item>
          <Descriptions.Item label={t('admin.accessBefore')}>
            {role ? (
              <Space wrap>
                {(before as ManagedRole)?.permissions.map((code) => (
                  <Tag key={code}>{code}</Tag>
                ))}
              </Space>
            ) : (
              `${(before as ManagedUser)?.role} · ${t(`admin.${(before as ManagedUser)?.status}`)}`
            )}
          </Descriptions.Item>
          <Descriptions.Item label={t('admin.accessAfter')}>
            {role ? (
              <Space wrap>
                {(after as ManagedRole)?.permissions.map((code) => (
                  <Tag color="blue" key={code}>
                    {code}
                  </Tag>
                ))}
              </Space>
            ) : (
              `${(after as ManagedUser)?.role} · ${t(`admin.${(after as ManagedUser)?.status}`)}`
            )}
          </Descriptions.Item>
          {role && (
            <Descriptions.Item label={t('admin.resourceScope')}>
              {(['user', 'role'] as const).map((resource) => (
                <div key={resource}>
                  {t(`admin.scopeResource.${resource}`)}:{' '}
                  {t(`admin.scopeMode.${(before as ManagedRole)?.scopes?.[resource]?.mode ?? 'global'}`)}
                  {(before as ManagedRole)?.scopes?.[resource]?.ids.length
                    ? ` (${(before as ManagedRole).scopes?.[resource]?.ids.join(', ')})`
                    : ''}
                  {' → '}
                  {t(`admin.scopeMode.${(after as ManagedRole)?.scopes?.[resource]?.mode ?? 'global'}`)}
                  {(after as ManagedRole)?.scopes?.[resource]?.ids.length
                    ? ` (${(after as ManagedRole).scopes?.[resource]?.ids.join(', ')})`
                    : ''}
                </div>
              ))}
            </Descriptions.Item>
          )}
          <Descriptions.Item label={t('admin.affectedUsers')}>{pending?.preview.affected.count ?? 0}</Descriptions.Item>
        </Descriptions>
        {!!pending?.preview.affected.sample.length && (
          <Typography.Text type="secondary">
            {pending.preview.affected.sample.map((user) => user.name).join('、')}
          </Typography.Text>
        )}
        <Input.TextArea
          aria-label={t('admin.accessReason')}
          placeholder={t('admin.accessReason')}
          value={reason}
          maxLength={500}
          showCount
          rows={3}
          onChange={(event) => setReason(event.target.value)}
        />
      </Space>
    </Modal>
  )
}
