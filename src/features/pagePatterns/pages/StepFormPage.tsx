import { useState } from 'react'
import { Alert, Button, Card, Descriptions, Form, Steps, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PatternPage from '../components/PatternPage'
import { RequestAssignmentFields, RequestBasicsFields } from '../components/RequestFields'
import { useExampleRequests } from '../model/ExampleRequestsProvider'
import type { RequestInput } from '../model/requests'
import styles from './patterns.module.less'

export default function StepFormPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const provider = useExampleRequests()
  const [form] = Form.useForm<RequestInput>()
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()

  const next = async () => {
    const names: (keyof RequestInput)[] =
      step === 0 ? ['title', 'category', 'description'] : ['owner', 'priority', 'dueDate']
    try {
      await form.validateFields(names)
      setStep((current) => current + 1)
    } catch {
      // Ant Design displays the field errors in the current step.
    }
  }

  const submit = async () => {
    setBusy(true)
    setError(undefined)
    try {
      const request = await provider.createRequest(form.getFieldsValue(true) as RequestInput)
      navigate(`/patterns/result/${request.id}`)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : t('patterns.saveFailed'))
    } finally {
      setBusy(false)
    }
  }

  const values = form.getFieldsValue(true) as Partial<RequestInput>
  return (
    <PatternPage title={t('patterns.stepForm')} description={t('patterns.stepDescription')}>
      <Card className={styles.formCard}>
        <Steps
          className={styles.steps}
          current={step}
          items={[
            { title: t('patterns.stepBasics') },
            { title: t('patterns.stepAssignment') },
            { title: t('patterns.stepReview') },
          ]}
        />
        {error && <Alert type="error" showIcon title={error} />}
        <Form<RequestInput>
          form={form}
          layout="vertical"
          preserve
          initialValues={{ priority: 'medium', category: 'operations' }}
        >
          {step === 0 && <RequestBasicsFields />}
          {step === 1 && <RequestAssignmentFields />}
          {step === 2 && (
            <>
              <Typography.Title level={3}>{t('patterns.reviewTitle')}</Typography.Title>
              <Typography.Paragraph type="secondary">{t('patterns.reviewDescription')}</Typography.Paragraph>
              <Descriptions
                bordered
                column={{ xs: 1, sm: 2 }}
                items={[
                  { key: 'title', label: t('patterns.title'), children: values.title },
                  {
                    key: 'category',
                    label: t('patterns.categoryLabel'),
                    children: values.category ? t(`patterns.category.${values.category}`) : '',
                  },
                  { key: 'owner', label: t('patterns.owner'), children: values.owner },
                  {
                    key: 'priority',
                    label: t('patterns.priorityLabel'),
                    children: values.priority ? t(`patterns.priority.${values.priority}`) : '',
                  },
                  { key: 'dueDate', label: t('patterns.dueDate'), children: values.dueDate || t('patterns.notSet') },
                  {
                    key: 'description',
                    label: t('patterns.description'),
                    children: values.description || t('patterns.notSet'),
                    span: 2,
                  },
                ]}
              />
            </>
          )}
          <div className={styles.formActions}>
            {step > 0 && <Button onClick={() => setStep((current) => current - 1)}>{t('patterns.previous')}</Button>}
            {step < 2 ? (
              <Button type="primary" onClick={() => void next()}>
                {t('patterns.next')}
              </Button>
            ) : (
              <Button type="primary" loading={busy} onClick={() => void submit()}>
                {t('patterns.submit')}
              </Button>
            )}
            <Button onClick={() => navigate('/patterns/requests')}>{t('patterns.backToList')}</Button>
          </div>
        </Form>
      </Card>
    </PatternPage>
  )
}
