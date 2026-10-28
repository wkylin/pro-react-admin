import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Button, Card, Input, Space, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ResponsiveTable from '@wui/ResponsiveTable'
import PatternPage from '../components/PatternPage'
import { useExampleRequests } from '../model/ExampleRequestsProvider'
import type { ExampleRequest, RequestCategory, RequestListQuery, RequestStatus } from '../model/requests'
import styles from './patterns.module.less'

type TableSort = { field?: string | null; order?: 'ascend' | 'descend' | null }
type TableApi = {
  fetchPage: (page?: number, pageSize?: number, sort?: TableSort) => Promise<unknown>
  pagination: { current: number; pageSize: number }
}
type RequestFilters = Pick<RequestListQuery, 'search' | 'status' | 'category'>

const emptyRequests: ExampleRequest[] = []
const initialPagination = { current: 1, pageSize: 8 }
const defaultSort = { field: 'createdAt', order: 'descend' }
const responseFieldMap = { listField: 'items', totalField: 'total' }
const statuses: RequestStatus[] = ['pending', 'active', 'done']
const categories: RequestCategory[] = ['operations', 'support', 'finance']

function toFilters(values: Record<string, unknown>): RequestFilters {
  return {
    search: typeof values.search === 'string' ? values.search.trim() : undefined,
    status: statuses.includes(values.status as RequestStatus) ? (values.status as RequestStatus) : undefined,
    category: categories.includes(values.category as RequestCategory)
      ? (values.category as RequestCategory)
      : undefined,
  }
}

export default function RequestsPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const provider = useExampleRequests()
  const filtersRef = useRef<RequestFilters>({})
  const controllerRef = useRef<AbortController | null>(null)
  const tableApiRef = useRef<TableApi | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  const fetchData = useCallback(
    async (page: number, pageSize: number, sort?: TableSort) => {
      controllerRef.current?.abort()
      const controller = new AbortController()
      controllerRef.current = controller
      setLoading(true)
      setError(undefined)
      try {
        const result = await provider.listRequests(
          {
            page,
            pageSize,
            ...filtersRef.current,
            sort: sort?.field === 'title' ? 'title' : 'createdAt',
            order: sort?.order === 'ascend' ? 'asc' : 'desc',
          },
          { signal: controller.signal }
        )
        return controller.signal.aborted ? null : result
      } catch (reason) {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : t('patterns.loadFailed'))
        return null
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null
          setLoading(false)
        }
      }
    },
    [provider, t]
  )

  useEffect(
    () => () => {
      controllerRef.current?.abort()
      controllerRef.current = null
    },
    []
  )
  useEffect(
    () =>
      provider.subscribe?.('requests', () => {
        void tableApiRef.current?.fetchPage().catch(() => {})
      }),
    [provider]
  )

  const columns = useMemo<ColumnsType<ExampleRequest>>(
    () => [
      {
        title: t('patterns.title'),
        dataIndex: 'title',
        sorter: true,
        width: 280,
        render: (_, record) => (
          <Space orientation="vertical" size={0}>
            <Button type="link" onClick={() => navigate(`/patterns/requests/${record.id}`)}>
              {record.title}
            </Button>
            <Typography.Text type="secondary">{record.id}</Typography.Text>
          </Space>
        ),
      },
      { title: t('patterns.owner'), dataIndex: 'owner', width: 140 },
      {
        title: t('patterns.categoryLabel'),
        dataIndex: 'category',
        width: 140,
        render: (value: RequestCategory) => t(`patterns.category.${value}`),
      },
      {
        title: t('patterns.statusLabel'),
        dataIndex: 'status',
        width: 140,
        render: (value: RequestStatus) => (
          <Tag color={value === 'done' ? 'success' : value === 'active' ? 'processing' : 'default'}>
            {t(`patterns.status.${value}`)}
          </Tag>
        ),
      },
      {
        title: t('patterns.createdAt'),
        dataIndex: 'createdAt',
        sorter: true,
        defaultSortOrder: 'descend',
        width: 150,
        render: (value: string) => new Date(value).toLocaleDateString(i18n.resolvedLanguage),
      },
    ],
    [i18n.resolvedLanguage, navigate, t]
  )

  const toolbar = useMemo(
    () => ({
      actions: [
        { key: 'step', label: t('patterns.stepForm'), onClick: () => navigate('/patterns/step-form') },
        {
          key: 'create',
          label: t('patterns.createRequest'),
          type: 'primary',
          icon: <PlusOutlined />,
          onClick: () => navigate('/patterns/basic-form'),
        },
      ],
      search: {
        fields: [
          {
            name: 'search',
            label: t('patterns.search'),
            render: () => <Input aria-label={t('patterns.search')} placeholder={t('patterns.searchPlaceholder')} />,
          },
          {
            name: 'status',
            label: t('patterns.statusLabel'),
            type: 'select',
            placeholder: t('patterns.allStatuses'),
            options: statuses.map((value) => ({ value, label: t(`patterns.status.${value}`) })),
          },
          {
            name: 'category',
            label: t('patterns.categoryLabel'),
            type: 'select',
            placeholder: t('patterns.categoryPlaceholder'),
            options: categories.map((value) => ({ value, label: t(`patterns.category.${value}`) })),
          },
        ],
        advancedThreshold: 3,
        buttons: { searchText: t('patterns.query'), resetText: t('patterns.reset') },
        onSearch: async (values: Record<string, unknown>) => {
          filtersRef.current = toFilters(values)
          const api = tableApiRef.current
          if (api) await api.fetchPage(1, api.pagination.pageSize)
        },
        onReset: async () => {
          filtersRef.current = {}
          const api = tableApiRef.current
          if (api) await api.fetchPage(1, api.pagination.pageSize)
        },
      },
    }),
    [navigate, t]
  )

  const uiLabels = useMemo(
    () => ({
      index: t('patterns.table.index'),
      actions: t('patterns.table.actions'),
      columnSettings: t('patterns.table.columnSettings'),
      allColumns: t('patterns.table.allColumns'),
      firstColumns: t('patterns.table.firstColumns'),
      total: (total: number) => t('patterns.table.total', { total }),
    }),
    [t]
  )

  return (
    <PatternPage title={t('patterns.listTitle')} description={t('patterns.listDescription')}>
      <Card className={styles.detailCard}>
        {error && (
          <Alert
            type="error"
            showIcon
            title={error}
            action={
              <Button onClick={() => void tableApiRef.current?.fetchPage().catch(() => {})}>
                {t('patterns.retry')}
              </Button>
            }
          />
        )}
        <div className={styles.tableShell}>
          <ResponsiveTable<ExampleRequest>
            rowKey="id"
            columns={columns}
            dataSource={emptyRequests}
            fetchData={fetchData}
            responseFieldMap={responseFieldMap}
            autoLoad
            serverSort
            defaultSort={defaultSort}
            initialPagination={initialPagination}
            minWidth={980}
            minBodyHeight={240}
            showIndex
            indexWidth={64}
            actionsWidth={120}
            actions={[
              {
                key: 'view',
                label: t('patterns.viewDetail'),
                onClick: (request) => navigate(`/patterns/requests/${request.id}`),
              },
            ]}
            toolbar={toolbar}
            uiLabels={uiLabels}
            apiRef={tableApiRef}
            loading={loading}
            locale={{ emptyText: t('patterns.empty') }}
          />
        </div>
      </Card>
    </PatternPage>
  )
}
