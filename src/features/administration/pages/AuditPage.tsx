import { Grid, Table, Tag, Typography, type TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useResourceList } from '../model/useResourceList'
import type { AuditEntry } from '../model/resources'
import ResourceWorkspace from './ResourceWorkspace'
import styles from './workspace.module.less'

export default function AuditPage() {
  const { t, i18n } = useTranslation()
  const screens = Grid.useBreakpoint()
  const list = useResourceList('audit')
  const columns: TableProps<AuditEntry>['columns'] = [
    {
      title: screens.md ? t('admin.time') : t('admin.event'),
      dataIndex: 'at',
      render: (at: string, entry) => {
        const time = new Date(at).toLocaleString(i18n.resolvedLanguage)
        return (
          <>
            <span className={styles.desktopTime}>{time}</span>
            <div className={styles.mobileAudit}>
              <div className={styles.auditSummary}>
                <Tag>{t(`admin.${entry.action}`, { defaultValue: entry.action })}</Tag>
                <Typography.Text strong>{entry.actor}</Typography.Text>
              </div>
              <Typography.Text type="secondary">{time}</Typography.Text>
              <div>
                {t('admin.resource')}: {entry.resource}
              </div>
              <div className={styles.auditRecord}>
                <span>{t('admin.record')}:</span>
                <Typography.Text className={styles.code} copyable>
                  {entry.recordId}
                </Typography.Text>
              </div>
            </div>
          </>
        )
      },
    },
    { title: t('admin.actor'), dataIndex: 'actor', responsive: ['md'] },
    {
      title: t('admin.action'),
      dataIndex: 'action',
      responsive: ['md'],
      render: (action: string) => <Tag>{t(`admin.${action}`, { defaultValue: action })}</Tag>,
    },
    { title: t('admin.resource'), dataIndex: 'resource', responsive: ['md'] },
    {
      title: t('admin.record'),
      dataIndex: 'recordId',
      responsive: ['md'],
      render: (id: string) => (
        <Typography.Text className={styles.code} copyable>
          {id}
        </Typography.Text>
      ),
    },
  ]
  return (
    <ResourceWorkspace
      title={t('admin.audit')}
      description={t('admin.auditDescription')}
      searchPlaceholder={t('admin.auditSearchPlaceholder')}
      onSearch={list.search}
      searchValue={list.query.search}
      onReload={list.reload}
      error={list.error}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list.data.items}
        loading={list.loading}
        size={screens.md ? 'middle' : 'small'}
        scroll={screens.md ? { x: 750 } : undefined}
        locale={{ emptyText: t('admin.auditEmpty') }}
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
