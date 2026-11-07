import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Alert, Card, Input, Table, Tabs, Tag, Typography, type TableProps } from 'antd'
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logo from '@assets/images/pro-logo.png'
import styles from './index.module.less'

type PreviewTab = 'overview' | 'members' | 'approvals' | 'audit'

type PreviewMember = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'invited'
  lastActive: string
}

type PreviewApproval = {
  id: string
  member: string
  change: 'billingAdmin' | 'readOnly'
  requester: string
  affected: number
}

type PreviewAuditEvent = {
  id: string
  at: string
  actor: string
  action: 'roleChange' | 'memberAdded' | 'requestSubmitted' | 'requestApproved'
  resource: string
}

const tabs: PreviewTab[] = ['overview', 'members', 'approvals', 'audit']
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString()

const members: PreviewMember[] = [
  {
    id: 'mem-1042',
    name: 'Nadia Farrow',
    email: 'nadia.farrow@example.test',
    role: 'Workspace admin',
    status: 'active',
    lastActive: minutesAgo(9),
  },
  {
    id: 'mem-1038',
    name: 'Omar Haddad',
    email: 'omar.haddad@example.test',
    role: 'Access reviewer',
    status: 'active',
    lastActive: minutesAgo(46),
  },
  {
    id: 'mem-1027',
    name: 'Priya Nair',
    email: 'priya.nair@example.test',
    role: 'Billing analyst',
    status: 'active',
    lastActive: minutesAgo(195),
  },
  {
    id: 'mem-1019',
    name: 'Leo Martin',
    email: 'leo.martin@example.test',
    role: 'Read only',
    status: 'active',
    lastActive: minutesAgo(455),
  },
  {
    id: 'mem-1004',
    name: 'Mina Sato',
    email: 'mina.sato@example.test',
    role: 'Pending invitation',
    status: 'invited',
    lastActive: minutesAgo(830),
  },
]

const approvals: PreviewApproval[] = [
  { id: 'req-204', member: 'Nadia Farrow', change: 'billingAdmin', requester: 'Nadia Farrow', affected: 3 },
  { id: 'req-201', member: 'Mina Sato', change: 'readOnly', requester: 'Priya Nair', affected: 1 },
  { id: 'req-198', member: 'Leo Martin', change: 'billingAdmin', requester: 'Leo Martin', affected: 2 },
]

const auditEvents: PreviewAuditEvent[] = [
  {
    id: 'evt-8821',
    at: minutesAgo(12),
    actor: 'Omar Haddad',
    action: 'requestSubmitted',
    resource: 'req-204',
  },
  {
    id: 'evt-8818',
    at: minutesAgo(61),
    actor: 'Mina Sato',
    action: 'memberAdded',
    resource: 'mem-1004',
  },
  {
    id: 'evt-8814',
    at: minutesAgo(965),
    actor: 'Omar Haddad',
    action: 'requestApproved',
    resource: 'req-196',
  },
  {
    id: 'evt-8809',
    at: minutesAgo(1405),
    actor: 'Nadia Farrow',
    action: 'roleChange',
    resource: 'mem-1027',
  },
]

const signInPath = `/signin?next=${encodeURIComponent('/administration/users')}`

export default function AccessPreview() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [memberSearch, setMemberSearch] = useState('')
  const requestedTab = searchParams.get('view') as PreviewTab | null
  const activeTab = requestedTab && tabs.includes(requestedTab) ? requestedTab : 'overview'
  const dateTimeFormat = useMemo(
    () => new Intl.DateTimeFormat(i18n.resolvedLanguage, { dateStyle: 'medium', timeStyle: 'short' }),
    [i18n.resolvedLanguage]
  )

  const visibleMembers = members.filter((member) => {
    const query = memberSearch.trim().toLocaleLowerCase(i18n.resolvedLanguage)
    return (
      !query || `${member.name} ${member.email} ${member.role}`.toLocaleLowerCase(i18n.resolvedLanguage).includes(query)
    )
  })

  const memberColumns: TableProps<PreviewMember>['columns'] = [
    {
      title: t('accessPreview.member'),
      dataIndex: 'name',
      key: 'member',
      render: (_, member) => (
        <div className={styles.memberCell}>
          <Typography.Text strong>{member.name}</Typography.Text>
          <Typography.Text type="secondary">{member.email}</Typography.Text>
        </div>
      ),
    },
    { title: t('accessPreview.role'), dataIndex: 'role', key: 'role' },
    {
      title: t('accessPreview.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: PreviewMember['status']) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>{t(`accessPreview.statuses.${status}`)}</Tag>
      ),
    },
    {
      title: t('accessPreview.lastActive'),
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (value: string) => dateTimeFormat.format(new Date(value)),
    },
  ]

  const approvalColumns: TableProps<PreviewApproval>['columns'] = [
    {
      title: t('accessPreview.request'),
      key: 'request',
      render: (_, approval) => (
        <div className={styles.memberCell}>
          <Typography.Text strong>{approval.member}</Typography.Text>
          <Typography.Text type="secondary">{t(`accessPreview.changes.${approval.change}`)}</Typography.Text>
        </div>
      ),
    },
    { title: t('accessPreview.requester'), dataIndex: 'requester', key: 'requester' },
    { title: t('accessPreview.affectedMembers'), dataIndex: 'affected', key: 'affected', align: 'right' },
    {
      title: t('accessPreview.status'),
      key: 'status',
      render: () => <Tag color="processing">{t('accessPreview.pending')}</Tag>,
    },
  ]

  const auditColumns: TableProps<PreviewAuditEvent>['columns'] = [
    {
      title: t('accessPreview.time'),
      dataIndex: 'at',
      key: 'at',
      render: (value: string) => dateTimeFormat.format(new Date(value)),
    },
    { title: t('accessPreview.actor'), dataIndex: 'actor', key: 'actor' },
    {
      title: t('accessPreview.event'),
      dataIndex: 'action',
      key: 'action',
      render: (action: PreviewAuditEvent['action']) => t(`accessPreview.actions.${action}`),
    },
    {
      title: t('accessPreview.record'),
      dataIndex: 'resource',
      key: 'resource',
      render: (value: string) => <Typography.Text className={styles.code}>{value}</Typography.Text>,
    },
  ]

  const formatAuditDate = (value: string) => dateTimeFormat.format(new Date(value))
  const setTab = (value: string) => {
    if (tabs.includes(value as PreviewTab)) {
      setSearchParams(value === 'overview' ? {} : { view: value }, { replace: true })
    }
  }

  const memberTable = (
    <Table
      rowKey="id"
      columns={memberColumns}
      dataSource={visibleMembers}
      pagination={false}
      size="middle"
      scroll={{ x: 720 }}
      locale={{ emptyText: t('accessPreview.noMembers') }}
    />
  )

  const approvalTable = (
    <Table
      rowKey="id"
      columns={approvalColumns}
      dataSource={approvals}
      pagination={false}
      size="middle"
      scroll={{ x: 680 }}
    />
  )

  const auditTable = (
    <Table
      rowKey="id"
      columns={auditColumns}
      dataSource={auditEvents}
      pagination={false}
      size="middle"
      scroll={{ x: 720 }}
    />
  )

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link className={styles.brand} to="/overview" aria-label={t('projectGuide.nav.overviewLabel')}>
            <img src={logo} width="28" height="22" alt="" />
            <span>{t('projectGuide.brand')}</span>
          </Link>
          <div className={styles.topbarMeta}>
            <Tag color="processing">{t('accessPreview.readOnly')}</Tag>
            <Typography.Text className={styles.workspaceCode}>{t('accessPreview.workspaceCode')}</Typography.Text>
          </div>
        </header>

        <section className={styles.hero} aria-labelledby="access-preview-title">
          <div>
            <p className={styles.eyebrow}>
              <ShieldCheck size={15} aria-hidden="true" /> {t('accessPreview.eyebrow')}
            </p>
            <h1 id="access-preview-title">{t('accessPreview.heading')}</h1>
            <p className={styles.description}>{t('accessPreview.description')}</p>
          </div>
          <div className={styles.heroActions}>
            <Link className={`${styles.primaryAction} wui-action-link wui-action-link--primary`} to={signInPath}>
              {t('accessPreview.signIn')} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              className={`${styles.secondaryAction} wui-action-link wui-action-link--secondary`}
              href="https://github.com/wkylin/pro-react-admin"
              target="_blank"
              rel="noreferrer"
            >
              {t('accessPreview.getStarter')} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className={styles.lifecycle} aria-labelledby="lifecycle-title">
          <div className={styles.lifecycleHeading}>
            <span className={styles.lifecycleMark} aria-hidden="true" />
            <h2 id="lifecycle-title">{t('accessPreview.lifecycle')}</h2>
          </div>
          <div className={styles.lifecycleSteps}>
            {(['requested', 'review', 'apply', 'audit'] as const).map((step, index) => {
              const stepClass = [
                styles.stepNumber,
                ...(index === 0 ? [styles.stepComplete] : []),
                ...(index === 1 ? [styles.stepCurrent] : []),
              ].join(' ')
              return (
                <div className={styles.lifecycleStep} key={step}>
                  <span className={stepClass}>{index + 1}</span>
                  <div>
                    <strong>{t(`accessPreview.steps.${step}`)}</strong>
                    <span>{t(`accessPreview.stepDetails.${step}`)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <Alert
          className={styles.disclosure}
          type="info"
          showIcon
          title={t('accessPreview.disclosureTitle')}
          description={t('accessPreview.disclosure')}
        />

        <section className={styles.metrics} aria-label={t('accessPreview.summary')}>
          {[
            { label: 'activeMembers', value: '4', marker: 'blue' },
            { label: 'pendingRequests', value: String(approvals.length), marker: 'amber' },
            { label: 'roles', value: '6', marker: 'violet' },
            { label: 'auditEvents', value: String(auditEvents.length), marker: 'green' },
          ].map((item) => (
            <Card className={styles.metricCard} key={item.label}>
              <div className={styles.metricLabel}>
                <span className={`${styles.metricMarker} ${styles[item.marker]}`} aria-hidden="true" />
                <Typography.Text type="secondary">{t(`accessPreview.metrics.${item.label}`)}</Typography.Text>
              </div>
              <strong className={styles.metricValue}>{item.value}</strong>
            </Card>
          ))}
        </section>

        <section className={styles.workspace} aria-label={t('accessPreview.workspace')}>
          <div className={styles.workspaceHeading}>
            <div>
              <p className={styles.eyebrow}>{t('accessPreview.workspaceLabel')}</p>
              <h2>{t('accessPreview.workspace')}</h2>
            </div>
            {activeTab === 'members' && (
              <Input.Search
                className={styles.memberSearch}
                aria-label={t('accessPreview.searchMembers')}
                placeholder={t('accessPreview.searchMembers')}
                allowClear
                value={memberSearch}
                onChange={(event) => setMemberSearch(event.target.value)}
              />
            )}
          </div>

          <Card className={styles.workspaceCard}>
            <Tabs
              activeKey={activeTab}
              onChange={setTab}
              items={tabs.map((tab) => ({ key: tab, label: t(`accessPreview.tabs.${tab}`) }))}
            />

            {activeTab === 'overview' && (
              <div className={styles.overviewGrid}>
                <Card
                  className={styles.panelCard}
                  title={t('accessPreview.pendingReview')}
                  extra={<Tag color="processing">{t('accessPreview.pendingCount', { count: approvals.length })}</Tag>}
                >
                  <div className={styles.compactTable}>{approvalTable}</div>
                </Card>
                <Card className={styles.panelCard} title={t('accessPreview.recentAudit')}>
                  <ul className={styles.auditList}>
                    {auditEvents.slice(0, 3).map((event) => (
                      <li key={event.id}>
                        <span className={styles.auditDot} aria-hidden="true" />
                        <div>
                          <Typography.Text strong>{event.actor}</Typography.Text>
                          <Typography.Text type="secondary">
                            {t(`accessPreview.actions.${event.action}`)} · {event.resource}
                          </Typography.Text>
                        </div>
                        <time dateTime={event.at}>{formatAuditDate(event.at)}</time>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {activeTab === 'members' && memberTable}
            {activeTab === 'approvals' && approvalTable}
            {activeTab === 'audit' && auditTable}
          </Card>
        </section>

        <footer className={styles.footer}>
          <span>{t('accessPreview.footerNote')}</span>
          <Link to="/overview">{t('projectGuide.nav.overviewLabel')}</Link>
        </footer>
      </div>
    </main>
  )
}
