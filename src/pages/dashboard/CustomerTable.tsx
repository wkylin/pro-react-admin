import { App, Avatar, Button, Descriptions, Drawer, Empty, Input, Pagination, Select, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Download, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { customers, customersToCsv, demoAsOf, type BillingStatus, type Customer, type CustomerStatus } from './model'
import type { DashboardQuery } from './query'
import { useCustomerSelection } from './useCustomerSelection'
import styles from './index.module.less'

interface CustomerTableProps {
  records: Customer[]
  query: DashboardQuery
  updateQuery: (patch: Partial<DashboardQuery>, replace?: boolean) => void
  locale: string
}

const statuses: CustomerStatus[] = ['active', 'inactive', 'churned']
const billingStatuses: BillingStatus[] = ['paid', 'pending', 'overdue', 'trial']
const statusColors = { active: 'success', inactive: 'default', churned: 'error' }
const billingColors = { paid: 'success', pending: 'warning', overdue: 'error', trial: 'processing' }

export default function CustomerTable({ records, query, updateQuery, locale }: CustomerTableProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const scope = JSON.stringify([query.search, query.status, query.billing, query.joined, query.sort])
  const selection = useCustomerSelection(scope)
  const selectedKeys = selection.selectedRowKeys
  const selected = records.filter((customer) => selectedKeys.includes(customer.id))
  const current = Math.min(query.page, Math.max(1, Math.ceil(records.length / query.pageSize)))
  const pageRecords = records.slice((current - 1) * query.pageSize, current * query.pageSize)
  const detail = customers.find((customer) => customer.id === query.customer)
  const date = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
  const formatDate = (value: string) => date.format(new Date(value))
  const filter = (patch: Partial<DashboardQuery>, replace = false) => updateQuery({ ...patch, page: 1 }, replace)
  const reset = () => filter({ search: '', status: undefined, billing: undefined, joined: 'all', sort: 'newest' })
  const hasFilters = Boolean(
    query.search || query.status || query.billing || query.joined !== 'all' || query.sort !== 'newest'
  )

  const exportRecords = () => {
    const exported = selected.length ? selected : records
    let url: string | undefined
    try {
      const headers = ['customerId', 'customer', 'email', 'status', 'billing', 'plan', 'joinedAt'].map((key) =>
        t(`dashboard.${key}`)
      )
      const csv = customersToCsv(exported, headers, (customer) => [
        customer.id,
        customer.name,
        customer.email,
        t(`dashboard.statuses.${customer.status}`),
        t(`dashboard.billingStatuses.${customer.billing}`),
        t(`dashboard.plans.${customer.plan}`),
        formatDate(customer.joinedAt),
      ])
      url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
      const link = document.createElement('a')
      link.href = url
      link.download = `demo-customers-${demoAsOf.slice(0, 10)}.csv`
      document.body.append(link)
      link.click()
      link.remove()
      const downloadUrl = url
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
      void message.success(t('dashboard.exportSuccess', { count: exported.length }))
    } catch {
      if (url) URL.revokeObjectURL(url)
      void message.error(t('dashboard.exportFailed'))
    }
  }

  const columns: ColumnsType<Customer> = [
    {
      title: t('dashboard.customer'),
      key: 'customer',
      width: 280,
      render: (_, customer) => (
        <div className={styles.customerCell}>
          <Avatar className={styles.avatar}>
            {customer.name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)}
          </Avatar>
          <div>
            <Button type="link" className={styles.customerName} onClick={() => updateQuery({ customer: customer.id })}>
              {customer.name}
            </Button>
            <span className={styles.email}>{customer.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: t('dashboard.status'),
      dataIndex: 'status',
      width: 130,
      render: (status: CustomerStatus) => <Tag color={statusColors[status]}>{t(`dashboard.statuses.${status}`)}</Tag>,
    },
    {
      title: t('dashboard.billing'),
      dataIndex: 'billing',
      width: 130,
      render: (billing: BillingStatus) => (
        <Tag color={billingColors[billing]}>{t(`dashboard.billingStatuses.${billing}`)}</Tag>
      ),
    },
    {
      title: t('dashboard.plan'),
      dataIndex: 'plan',
      width: 120,
      render: (plan: Customer['plan']) => t(`dashboard.plans.${plan}`),
    },
    { title: t('dashboard.joinedAt'), dataIndex: 'joinedAt', width: 160, render: formatDate },
  ]

  return (
    <section className={styles.panel} aria-labelledby="dashboard-customers-title">
      <div className={styles.sectionHeader}>
        <div>
          <h2 id="dashboard-customers-title">{t('dashboard.customersTitle')}</h2>
          <p>{t('dashboard.customerCount', { count: customers.length })}</p>
        </div>
        <Button
          icon={<Download size={15} aria-hidden="true" />}
          disabled={records.length === 0}
          onClick={exportRecords}
        >
          {selected.length
            ? t('dashboard.exportSelected', { count: selected.length })
            : t('dashboard.exportAll', { count: records.length })}
        </Button>
      </div>
      <div className={styles.filters} role="search" aria-label={t('dashboard.customersTitle')}>
        <Input
          className={styles.search}
          aria-label={t('dashboard.search')}
          placeholder={t('dashboard.search')}
          prefix={<Search size={16} aria-hidden="true" />}
          allowClear
          value={query.search}
          onChange={(event) => filter({ search: event.target.value }, true)}
        />
        <Select<CustomerStatus | 'all'>
          aria-label={t('dashboard.status')}
          value={query.status ?? 'all'}
          onChange={(status) => filter({ status: status === 'all' ? undefined : status })}
          options={[
            { value: 'all', label: t('dashboard.allStatuses') },
            ...statuses.map((value) => ({ value, label: t(`dashboard.statuses.${value}`) })),
          ]}
        />
        <Select<BillingStatus | 'all'>
          aria-label={t('dashboard.billing')}
          value={query.billing ?? 'all'}
          onChange={(billing) => filter({ billing: billing === 'all' ? undefined : billing })}
          options={[
            { value: 'all', label: t('dashboard.allBilling') },
            ...billingStatuses.map((value) => ({ value, label: t(`dashboard.billingStatuses.${value}`) })),
          ]}
        />
        <Select
          aria-label={t('dashboard.joined')}
          value={query.joined}
          onChange={(joined) => filter({ joined })}
          options={[
            { value: 'all', label: t('dashboard.allDates') },
            ...['7', '30', '90'].map((value) => ({ value, label: t(`dashboard.joined${value}`) })),
          ]}
        />
        <Select
          aria-label={t('dashboard.sort')}
          value={query.sort}
          onChange={(sort) => filter({ sort })}
          options={(['newest', 'oldest', 'name'] as const).map((value) => ({
            value,
            label: t(`dashboard.sort${value[0].toUpperCase()}${value.slice(1)}`),
          }))}
        />
        {hasFilters && <Button onClick={reset}>{t('dashboard.reset')}</Button>}
      </div>
      <Table<Customer>
        className={styles.customerTable}
        rowKey="id"
        columns={columns}
        dataSource={pageRecords}
        pagination={false}
        scroll={{ x: 860 }}
        size="middle"
        rowSelection={{
          ...selection,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (customer) => ({ 'aria-label': t('dashboard.selectCustomer', { name: customer.name }) }),
          getTitleCheckboxProps: () => ({ 'aria-label': t('dashboard.selectAll') }),
        }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <>
                  <strong>{t('dashboard.emptyTitle')}</strong>
                  <p>{t('dashboard.emptyDescription')}</p>
                </>
              }
            >
              <Button onClick={reset}>{t('dashboard.reset')}</Button>
            </Empty>
          ),
        }}
      />
      <div className={styles.pagination} data-content-typography-exempt>
        <div className={styles.paginationInfo}>
          <span className={styles.paginationSummary} aria-live="polite" aria-atomic="true">
            {t('dashboard.pageSummary', {
              start: records.length ? (current - 1) * query.pageSize + 1 : 0,
              end: Math.min(current * query.pageSize, records.length),
              total: records.length,
            })}
          </span>
          {selected.length > 0 && (
            <div className={styles.tableSummary} aria-live="polite">
              <span>{t('dashboard.selected', { count: selected.length })}</span>
              <Button
                type="text"
                size="small"
                icon={<X size={14} aria-hidden="true" />}
                onClick={() => selection.onChange([])}
              >
                {t('dashboard.clearSelection')}
              </Button>
            </div>
          )}
        </div>
        <Pagination
          className={styles.paginationControls}
          current={current}
          pageSize={query.pageSize}
          total={records.length}
          responsive
          showLessItems
          showSizeChanger
          pageSizeOptions={[8, 16, 32]}
          onChange={(page, pageSize) => updateQuery({ page: pageSize !== query.pageSize ? 1 : page, pageSize })}
        />
      </div>
      <Drawer
        title={t('dashboard.customerDetails')}
        open={Boolean(detail)}
        onClose={() => updateQuery({ customer: undefined })}
        size={440}
        extra={<Tag>{t('dashboard.demo')}</Tag>}
      >
        {detail && (
          <Descriptions
            column={1}
            items={[
              { key: 'id', label: t('dashboard.customerId'), children: detail.id },
              { key: 'name', label: t('dashboard.customer'), children: detail.name },
              {
                key: 'email',
                label: t('dashboard.email'),
                children: <span className={styles.detailEmail}>{detail.email}</span>,
              },
              { key: 'status', label: t('dashboard.status'), children: t(`dashboard.statuses.${detail.status}`) },
              {
                key: 'billing',
                label: t('dashboard.billing'),
                children: t(`dashboard.billingStatuses.${detail.billing}`),
              },
              { key: 'plan', label: t('dashboard.plan'), children: t(`dashboard.plans.${detail.plan}`) },
              { key: 'joined', label: t('dashboard.joinedAt'), children: formatDate(detail.joinedAt) },
            ]}
          />
        )}
      </Drawer>
    </section>
  )
}
