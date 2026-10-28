import { useState } from 'react'
import { Alert, Button, Card, Form, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PatternPage from '../components/PatternPage'
import { RequestAssignmentFields, RequestBasicsFields } from '../components/RequestFields'
import { useExampleRequests } from '../model/ExampleRequestsProvider'
import type { RequestInput } from '../model/requests'
import styles from './patterns.module.less'

export default function BasicFormPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const provider = useExampleRequests()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const [form] = Form.useForm<RequestInput>()

  const submit = async (values: RequestInput) => {
    setBusy(true)
    setError(undefined)
    try {
      const request = await provider.createRequest(values)
      navigate(`/patterns/result/${request.id}`)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : t('patterns.saveFailed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <PatternPage title={t('patterns.basicForm')} description={t('patterns.basicDescription')}>
      <div className={styles.formGrid}>
        <Card className={styles.formCard}>
          {error && <Alert type="error" showIcon title={error} />}
          <Form<RequestInput>
            form={form}
            layout="vertical"
            initialValues={{ priority: 'medium', category: 'operations' }}
            onFinish={(values) => void submit(values)}
          >
            <RequestBasicsFields />
            <RequestAssignmentFields />
            <div className={styles.formActions}>
              <Button type="primary" htmlType="submit" loading={busy}>
                {t('patterns.submit')}
              </Button>
              <Button onClick={() => navigate('/patterns/requests')}>{t('patterns.backToList')}</Button>
            </div>
          </Form>
        </Card>
        <Card title={t('patterns.aboutBasic')}>
          <Typography.Paragraph type="secondary">{t('patterns.aboutBasicDescription')}</Typography.Paragraph>
          <ul className={styles.helpList}>
            <li>{t('patterns.basicTipValidation')}</li>
            <li>{t('patterns.basicTipProvider')}</li>
            <li>{t('patterns.basicTipResult')}</li>
          </ul>
        </Card>
      </div>
    </PatternPage>
  )
}
