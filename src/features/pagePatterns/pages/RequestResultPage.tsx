import { useEffect, useState } from 'react'
import { Button, Card, Result, Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import PatternPage from '../components/PatternPage'
import { useExampleRequests } from '../model/ExampleRequestsProvider'
import type { ExampleRequest } from '../model/requests'
import styles from './patterns.module.less'

export default function RequestResultPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const provider = useExampleRequests()
  const [request, setRequest] = useState<ExampleRequest | null>()

  useEffect(() => {
    const controller = new AbortController()
    void provider.getOne('requests', id, { signal: controller.signal }).then(
      (value) => {
        if (!controller.signal.aborted) setRequest(value)
      },
      () => {
        if (!controller.signal.aborted) setRequest(null)
      }
    )
    return () => controller.abort()
  }, [provider, id])

  return (
    <PatternPage title={t('patterns.resultTitle')} description={t('patterns.resultDescription')}>
      <Card className={styles.result}>
        {request === undefined ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <Result
            status={request ? 'success' : 'error'}
            title={request ? t('patterns.created') : t('patterns.notFound')}
            subTitle={
              request ? t('patterns.createdDescription', { id: request.id }) : t('patterns.notFoundDescription')
            }
            extra={
              <>
                {request && (
                  <Button type="primary" onClick={() => navigate(`/patterns/requests/${request.id}`)}>
                    {t('patterns.viewDetail')}
                  </Button>
                )}
                <Button onClick={() => navigate('/patterns/requests')}>{t('patterns.backToList')}</Button>
              </>
            }
          />
        )}
      </Card>
    </PatternPage>
  )
}
