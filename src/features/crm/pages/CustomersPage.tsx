import { useState } from 'react'
import { App, Button, Empty, Input, Select, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BusinessToolbar } from '@shared/ui/BusinessPage'
import { useCrmStore } from '../model/CrmProvider'
import type { Customer } from '../model/types'
import CrmPage from '../components/CrmPage'
import CustomerDialog from '../components/CustomerDialog'
import { formatDate } from '../components/format'
import styles from './crm.module.less'

export default function CustomersPage() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const customers = useCrmStore((state) => state.customers)
  const opportunities = useCrmStore((state) => state.opportunities)
  const [creating, setCreating] = useState(false)
  const search = params.get('search') ?? ''
  const rawStatus = params.get('status')
  const status = rawStatus === 'lead' || rawStatus === 'customer' ? rawStatus : 'all'
  const filtered = customers.filter(
    (customer) =>
      (status === 'all' || customer.status === status) &&
      [customer.company, customer.contact, customer.email].some((value) =>
        value.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
      )
  )
  const rawPage = Number(params.get('page'))
  const page = Math.min(
    Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    Math.max(1, Math.ceil(filtered.length / 8))
  )
  const updateQuery = (values: Record<string, string>, replace = false) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        for (const [key, value] of Object.entries(values)) {
          if (!value || value === 'all') next.delete(key)
          else next.set(key, value)
        }
        return next
      },
      { replace }
    )
  const clear = () => setParams({})
  const view = (customer: Customer) =>
    navigate(`/patterns/crm/customers/${customer.id}${params.size ? `?${params}` : ''}`)
  const columns: ColumnsType<Customer> = [
    {
      title: t('crm.company'),
      dataIndex: 'company',
      width: 240,
      render: (_, customer) => (
        <div className={styles.cell}>
          <Button className={styles.company} type="link" onClick={() => view(customer)}>
            {customer.company}
          </Button>
          <span className={styles.muted}>{customer.id}</span>
        </div>
      ),
    },
    {
      title: t('crm.contact'),
      dataIndex: 'contact',
      width: 220,
      render: (_, customer) => (
        <div className={styles.cell}>
          <span>{customer.contact}</span>
          <span className={styles.muted}>{customer.email}</span>
        </div>
      ),
    },
    { title: t('crm.owner'), dataIndex: 'owner', width: 140, render: (owner: string) => t(`crm.owners.${owner}`) },
    {
      title: t('crm.status'),
      dataIndex: 'status',
      width: 120,
      render: (value: Customer['status']) => (
        <Tag color={value === 'customer' ? 'success' : 'default'}>{t(`crm.statuses.${value}`)}</Tag>
      ),
    },
    {
      title: t('crm.openCount'),
      key: 'opportunities',
      width: 150,
      render: (_, customer) =>
        opportunities.filter((item) => item.customerId === customer.id && item.stage !== 'won' && item.stage !== 'lost')
          .length,
    },
    {
      title: t('crm.nextFollowUp'),
      dataIndex: 'nextFollowUpOn',
      width: 160,
      render: (date?: string) => (date ? formatDate(date, i18n.resolvedLanguage) : t('crm.notScheduled')),
    },
    {
      title: t('crm.actions'),
      key: 'actions',
      width: 140,
      render: (_, customer) => (
        <Button type="link" onClick={() => view(customer)}>
          {t('crm.viewCustomer')}
        </Button>
      ),
    },
  ]
  return (
    <CrmPage
      title={t('crm.customersTitle')}
      description={t('crm.customersDescription')}
      actions={
        <Button type="primary" onClick={() => setCreating(true)}>
          {t('crm.newCustomer')}
        </Button>
      }
    >
      <section className={styles.panel} aria-label={t('crm.customerRecords')}>
        <BusinessToolbar label={t('crm.searchCustomers')}>
          <Input
            className={styles.search}
            aria-label={t('crm.searchCustomers')}
            placeholder={t('crm.searchCustomers')}
            allowClear
            value={search}
            onChange={(event) => updateQuery({ search: event.target.value, page: '1' }, true)}
          />
          <Select
            className={styles.filter}
            aria-label={t('crm.status')}
            value={status}
            onChange={(value: string) => updateQuery({ status: value, page: '1' })}
            options={['all', 'lead', 'customer'].map((value) => ({
              value,
              label: t(value === 'all' ? 'crm.allStatuses' : `crm.statuses.${value}`),
            }))}
          />
          {(search || status !== 'all') && <Button onClick={clear}>{t('crm.clearFilters')}</Button>}
        </BusinessToolbar>
        <p className={styles.count} aria-live="polite">
          {t('crm.customerCount', { count: filtered.length })}
        </p>
        <div className={styles.table}>
          <Table<Customer>
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            size="middle"
            scroll={{ x: 1150 }}
            pagination={{
              current: page,
              pageSize: 8,
              showSizeChanger: false,
              responsive: true,
              onChange: (value) => updateQuery({ page: String(value) }),
            }}
            locale={{
              emptyText: (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('crm.noCustomers')}>
                  <Space>
                    {search || status !== 'all' ? (
                      <Button onClick={clear}>{t('crm.clearFilters')}</Button>
                    ) : (
                      <Button onClick={() => setCreating(true)}>{t('crm.newCustomer')}</Button>
                    )}
                  </Space>
                </Empty>
              ),
            }}
          />
        </div>
      </section>
      {creating && (
        <CustomerDialog
          onClose={() => setCreating(false)}
          onSaved={(customer) => {
            setCreating(false)
            void message.success(t('crm.customerCreated'))
            navigate(`/patterns/crm/customers/${customer.id}`)
          }}
        />
      )}
    </CrmPage>
  )
}
