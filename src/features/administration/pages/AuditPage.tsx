import { Table, Tag, Typography, type TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useResourceList } from '../model/useResourceList'
import type { AuditEntry } from '../model/resources'
import ResourceWorkspace from './ResourceWorkspace'
import styles from './workspace.module.less'

export default function AuditPage() {
  const { t, i18n } = useTranslation()
  const list = useResourceList('audit')
  const columns: TableProps<AuditEntry>['columns'] = [
    {
      title: t('admin.time'),
      dataIndex: 'at',
      render: (at: string) => new Date(at).toLocaleString(i18n.resolvedLanguage),
    },
    { title: t('admin.actor'), dataIndex: 'actor' },
    {
      title: t('admin.action'),
      dataIndex: 'action',
      render: (action: string) => <Tag>{t(`admin.${action}`, { defaultValue: action })}</Tag>,
    },
    { title: t('admin.resource'), dataIndex: 'resource' },
    {
      title: t('admin.record'),
      dataIndex: 'recordId',
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
      onSearch={list.search}
      onReload={list.reload}
      error={list.error}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list.data.items}
        loading={list.loading}
        scroll={{ x: 750 }}
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
