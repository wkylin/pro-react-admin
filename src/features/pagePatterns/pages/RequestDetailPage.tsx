import { useEffect, useState } from 'react'
import { Alert, Button, Card, Descriptions, Skeleton, Space, Steps, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import PatternPage from '../components/PatternPage'
import { useExampleRequests } from '../model/ExampleRequestsProvider'
import type { ExampleRequest, RequestStatus } from '../model/requests'
import styles from './patterns.module.less'

type DetailState = { loading: boolean; request?: ExampleRequest; error?: string }

export default function RequestDetailPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const provider = useExampleRequests()
  const [revision, setRevision] = useState(0)
  const [busy, setBusy] = useState(false)
  const [state, setState] = useState<DetailState>({ loading: true })

  useEffect(() => provider.subscribe?.('requests', () => setRevision((value) => value + 1)), [provider])
  useEffect(() => {
    const controller = new AbortController()
    setState((previous) => ({ ...previous, loading: true, error: undefined }))
    void provider.getOne('requests', id, { signal: controller.signal }).then(
      (request) => {
        if (!controller.signal.aborted) setState({ loading: false, request })
      },
      (reason) => {
        if (!controller.signal.aborted)
          setState({ loading: false, error: reason instanceof Error ? reason.message : t('patterns.loadFailed') })
      }
    )
    return () => controller.abort()
  }, [provider, id, revision, t])

  const changeStatus = async (status: RequestStatus) => {
    if (!state.request) return
    setBusy(true)
    try {
      await provider.update('requests', state.request.id, { status })
    } catch (reason) {
      setState((previous) => ({
        ...previous,
        error: reason instanceof Error ? reason.message : t('patterns.saveFailed'),
      }))
    } finally {
      setBusy(false)
    }
  }

  const request = state.request
  return (
    <PatternPage
      title={t('patterns.detailTitle')}
      description={t('patterns.detailDescription')}
      actions={<Button onClick={() => navigate('/patterns/requests')}>{t('patterns.backToList')}</Button>}
    >
      <Card className={styles.detailCard}>
        {state.loading ? (
          <Skeleton active paragraph={{ rows: 5 }} />
        ) : state.error && !request ? (
          <Alert
            type="error"
            showIcon
            title={state.error}
            action={<Button onClick={() => navigate('/patterns/requests')}>{t('patterns.backToList')}</Button>}
          />
        ) : request ? (
          <>
            {state.error && <Alert type="error" showIcon title={state.error} />}
            <Steps
              size="small"
              current={['pending', 'active', 'done'].indexOf(request.status)}
              items={(['pending', 'active', 'done'] as const).map((status) => ({
                title: t(`patterns.status.${status}`),
              }))}
            />
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              style={{ marginTop: 24 }}
              items={[
                { key: 'id', label: t('patterns.requestId'), children: request.id },
                { key: 'title', label: t('patterns.title'), children: request.title },
                { key: 'owner', label: t('patterns.owner'), children: request.owner },
                {
                  key: 'category',
                  label: t('patterns.categoryLabel'),
                  children: t(`patterns.category.${request.category}`),
                },
                {
                  key: 'priority',
                  label: t('patterns.priorityLabel'),
                  children: t(`patterns.priority.${request.priority}`),
                },
                {
                  key: 'status',
                  label: t('patterns.statusLabel'),
                  children: (
                    <Tag color={request.status === 'done' ? 'success' : 'processing'}>
                      {t(`patterns.status.${request.status}`)}
                    </Tag>
                  ),
                },
                { key: 'dueDate', label: t('patterns.dueDate'), children: request.dueDate || t('patterns.notSet') },
                {
                  key: 'createdAt',
                  label: t('patterns.createdAt'),
                  children: new Date(request.createdAt).toLocaleString(i18n.resolvedLanguage),
                },
                {
                  key: 'description',
                  label: t('patterns.description'),
                  children: request.description || t('patterns.notSet'),
                  span: 2,
                },
              ]}
            />
            <Space style={{ marginTop: 24 }} wrap>
              {request.status === 'pending' && (
                <Button type="primary" loading={busy} onClick={() => void changeStatus('active')}>
                  {t('patterns.startWork')}
                </Button>
              )}
              {request.status === 'active' && (
                <Button type="primary" loading={busy} onClick={() => void changeStatus('done')}>
                  {t('patterns.completeWork')}
                </Button>
              )}
              <Button onClick={() => navigate('/patterns/requests')}>{t('patterns.backToList')}</Button>
            </Space>
          </>
        ) : null}
      </Card>
    </PatternPage>
  )
}
