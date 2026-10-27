import { useEffect, useState } from 'react'
import { Alert, Button, Card, Skeleton, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { hasEffectivePermission } from '@platform/auth/model/policy'
import type { PermissionCode } from '@platform/auth/model/permission'
import { usePermission } from '@platform/auth/hooks/usePermission'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useAdministration } from '../model/AdministrationProvider'
import type { AuditEntry } from '../model/resources'
import styles from './workspace.module.less'

type Feed<T> = { loading: boolean; data: T; error?: string }

export default function AdministrationHome() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { current } = usePermission()
  const { provider, access, accessRevision, demo } = useAdministration()
  const can = (permission: PermissionCode) => !!current && hasEffectivePermission(current, permission)
  const canReadUsers = can('user:read')
  const canReadRoles = can('role:read')
  const canReadAccess = can('access:read')
  const canApprove = can('access:approve')
  const canReadAudit = can('audit:read')
  const [revision, setRevision] = useState(0)
  const [pending, setPending] = useState<Feed<number>>({ loading: true, data: 0 })
  const [recent, setRecent] = useState<Feed<AuditEntry[]>>({ loading: true, data: [] })

  useEffect(() => provider.subscribe?.('audit', () => setRevision((value) => value + 1)), [provider])
  useEffect(() => {
    if (!canReadAccess) return
    let active = true
    setPending((previous) => ({ ...previous, loading: true, error: undefined }))
    void access.list({ page: 1, pageSize: 1, status: 'pending' }).then(
      (result) => {
        if (active) setPending({ loading: false, data: result.total })
      },
      (reason) => {
        if (active)
          setPending((previous) => ({
            ...previous,
            loading: false,
            error: reason instanceof Error ? reason.message : t('admin.loadFailed'),
          }))
      }
    )
    return () => {
      active = false
    }
  }, [access, accessRevision, canReadAccess, revision, t])
  useEffect(() => {
    if (!canReadAudit) return
    const controller = new AbortController()
    setRecent((previous) => ({ ...previous, loading: true, error: undefined }))
    void provider
      .list(
        'audit',
        { page: 1, pageSize: 5, sort: 'at', order: 'desc' },
        { signal: controller.signal, showError: false }
      )
      .then(
        (result) => {
          if (!controller.signal.aborted) setRecent({ loading: false, data: result.items })
        },
        (reason) => {
          if (!controller.signal.aborted)
            setRecent((previous) => ({
              ...previous,
              loading: false,
              error: reason instanceof Error ? reason.message : t('admin.loadFailed'),
            }))
        }
      )
    return () => controller.abort()
  }, [provider, canReadAudit, revision, t])

  const steps = [
    { key: 'member', allowed: canReadUsers, path: '/administration/users' },
    { key: 'grant', allowed: canReadRoles, path: '/administration/roles' },
    { key: 'review', allowed: canReadAccess, path: '/administration/access-requests' },
    { key: 'trace', allowed: canReadAudit, path: '/administration/audit' },
  ].filter((step) => step.allowed)

  return (
    <FixTabPanel fill={false}>
      <section className={styles.workspace} aria-labelledby="administration-home-title">
        <header className={styles.header}>
          <div>
            <Typography.Title id="administration-home-title" level={1}>
              {t('admin.workspace')}
            </Typography.Title>
            <Typography.Paragraph type="secondary">{t('admin.workspaceDescription')}</Typography.Paragraph>
          </div>
          {(canReadAccess || canReadAudit) && (
            <Button onClick={() => setRevision((value) => value + 1)}>{t('admin.refresh')}</Button>
          )}
        </header>
        {demo && <Alert type="info" showIcon title={t('admin.demo')} description={t('admin.demoDescription')} />}

        <div className={styles.overviewGrid}>
          {canReadAccess && (
            <Card className={styles.overviewCard} title={t('admin.pendingWork')}>
              {pending.loading ? (
                <Skeleton active title={false} paragraph={{ rows: 2 }} />
              ) : pending.error ? (
                <Alert
                  type="error"
                  showIcon
                  title={pending.error}
                  action={<Button onClick={() => setRevision((value) => value + 1)}>{t('admin.retry')}</Button>}
                />
              ) : (
                <>
                  <Typography.Title level={2} className={styles.overviewCount}>
                    {pending.data}
                  </Typography.Title>
                  <Typography.Paragraph type="secondary">
                    {pending.data ? t('admin.pendingDescription') : t('admin.pendingEmpty')}
                  </Typography.Paragraph>
                  <Button type="primary" onClick={() => navigate('/administration/access-requests')}>
                    {t(canApprove ? 'admin.reviewPending' : 'admin.viewRequests')}
                  </Button>
                </>
              )}
            </Card>
          )}
          {canReadAudit && (
            <Card
              className={styles.overviewCard}
              title={t('admin.recentChanges')}
              extra={
                <Button type="link" onClick={() => navigate('/administration/audit')}>
                  {t('admin.viewAll')}
                </Button>
              }
            >
              {recent.loading ? (
                <Skeleton active title={false} paragraph={{ rows: 3 }} />
              ) : recent.error ? (
                <Alert
                  type="error"
                  showIcon
                  title={recent.error}
                  action={<Button onClick={() => setRevision((value) => value + 1)}>{t('admin.retry')}</Button>}
                />
              ) : recent.data.length ? (
                <ul className={styles.recentList}>
                  {recent.data.map((entry) => (
                    <li key={entry.id}>
                      <span>
                        <Typography.Text strong>{entry.actor}</Typography.Text>{' '}
                        {t(`admin.${entry.action}`, { defaultValue: entry.action })}{' '}
                        <Typography.Text type="secondary">{entry.resource}</Typography.Text>
                      </span>
                      <time dateTime={entry.at}>{new Date(entry.at).toLocaleString(i18n.resolvedLanguage)}</time>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography.Text type="secondary">{t('admin.recentEmpty')}</Typography.Text>
              )}
            </Card>
          )}
        </div>

        <section aria-labelledby="administration-flow-title" className={styles.flowSection}>
          <Typography.Title id="administration-flow-title" level={2}>
            {t('admin.referenceFlow')}
          </Typography.Title>
          <Typography.Paragraph type="secondary">{t('admin.referenceFlowDescription')}</Typography.Paragraph>
          {steps.length ? (
            <div className={styles.flowGrid}>
              {steps.map((step, index) => (
                <Card key={step.key} className={styles.flowCard}>
                  <span className={styles.flowNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <Typography.Title level={3}>{t(`admin.flow.${step.key}.title`)}</Typography.Title>
                  <Typography.Paragraph type="secondary">
                    {t(`admin.flow.${step.key}.description`)}
                  </Typography.Paragraph>
                  <Button type="link" onClick={() => navigate(step.path)}>
                    {t('admin.openStep')}
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Alert type="info" showIcon title={t('admin.noWorkspaceActions')} />
          )}
        </section>
      </section>
    </FixTabPanel>
  )
}
