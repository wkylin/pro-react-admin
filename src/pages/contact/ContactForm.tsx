import { useEffect, useRef, useState } from 'react'
import { Alert, App, Button, Form, Input, Select, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'
import { getEnv } from '@platform/config/env'
import { ContactSendError, ContactValidationError, sendContactMessage, type ContactDraft } from './model'
import styles from './index.module.less'

type ResultState = { kind: 'success' } | { kind: 'cancelled' } | { kind: 'error'; code: ContactSendError['code'] }

export default function ContactForm({ initialName, initialEmail }: { initialName: string; initialEmail: string }) {
  const { t } = useTranslation()
  const { modal } = App.useApp()
  const [form] = Form.useForm<ContactDraft>()
  const [sending, setSending] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [result, setResult] = useState<ResultState>()
  const inFlight = useRef<AbortController | null>(null)
  const accessKey = getEnv('REACT_APP_WEB3FORMS_ACCESS_KEY').trim()
  useEffect(() => () => inFlight.current?.abort(), [])
  useEffect(() => {
    if (!dirty) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])
  const clear = () => {
    const reset = () => {
      form.resetFields()
      setDirty(false)
      setResult(undefined)
    }
    if (!dirty) return reset()
    modal.confirm({
      title: t('contactPage.clearTitle'),
      content: t('contactPage.clearDescription'),
      okText: t('contactPage.clearConfirm'),
      cancelText: t('contactPage.keepEditing'),
      onOk: reset,
    })
  }
  const send = async (draft: ContactDraft) => {
    if (inFlight.current) return
    const controller = new AbortController()
    inFlight.current = controller
    setSending(true)
    setResult(undefined)
    try {
      await sendContactMessage(draft, { accessKey, signal: controller.signal })
      if (controller.signal.aborted || inFlight.current !== controller) return
      form.resetFields()
      setDirty(false)
      setResult({ kind: 'success' })
    } catch (reason) {
      if (controller.signal.aborted || inFlight.current !== controller) return
      if (reason instanceof ContactValidationError)
        form.setFields([{ name: reason.field, errors: [t(`contactPage.validation.${reason.field}`)] }])
      else setResult({ kind: 'error', code: reason instanceof ContactSendError ? reason.code : 'network' })
    } finally {
      if (inFlight.current === controller) {
        inFlight.current = null
        if (!controller.signal.aborted) setSending(false)
      }
    }
  }
  const cancel = () => {
    inFlight.current?.abort()
    inFlight.current = null
    setSending(false)
    setResult({ kind: 'cancelled' })
  }
  return (
    <section className={styles.panel} aria-label={t('contactPage.formTitle')} aria-busy={sending}>
      <h2 className={styles.sectionTitle}>{t('contactPage.formTitle')}</h2>
      <p className={styles.description}>{t('contactPage.formDescription')}</p>
      {!accessKey && <Alert type="warning" showIcon title={t('contactPage.unconfigured')} />}
      {result && (
        <Alert
          showIcon
          type={result.kind === 'success' ? 'success' : result.kind === 'error' ? 'error' : 'info'}
          role={result.kind === 'error' ? 'alert' : 'status'}
          title={t(
            result.kind === 'success'
              ? 'contactPage.accepted'
              : result.kind === 'cancelled'
                ? 'contactPage.cancelled'
                : `contactPage.errors.${result.code}`
          )}
          description={result.kind === 'success' ? t('contactPage.acceptedDescription') : undefined}
        />
      )}
      <Form<ContactDraft>
        form={form}
        name="contact-message"
        layout="vertical"
        className={styles.form}
        disabled={sending}
        initialValues={{ name: initialName, email: initialEmail, topic: 'question', subject: '', message: '' }}
        onValuesChange={() => {
          setDirty(true)
          setResult(undefined)
        }}
        onFinish={send}
      >
        <Form.Item
          name="topic"
          label={t('contactPage.topic')}
          rules={[{ required: true, message: t('contactPage.validation.topic') }]}
        >
          <Select
            aria-label={t('contactPage.topic')}
            options={['question', 'bug', 'idea', 'collaboration'].map((value) => ({
              value,
              label: t(`contactPage.topics.${value}`),
            }))}
          />
        </Form.Item>
        <div className={styles.formRow}>
          <Form.Item
            name="name"
            label={t('contactPage.name')}
            rules={[{ required: true, whitespace: true, max: 80, message: t('contactPage.validation.name') }]}
          >
            <Input
              aria-label={t('contactPage.name')}
              autoComplete="name"
              maxLength={80}
              placeholder={t('contactPage.namePlaceholder')}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('contactPage.email')}
            rules={[
              {
                required: true,
                type: 'email',
                max: 254,
                transform: (value: string) => value?.trim(),
                message: t('contactPage.validation.email'),
              },
            ]}
          >
            <Input
              aria-label={t('contactPage.email')}
              autoComplete="email"
              maxLength={254}
              placeholder={t('contactPage.emailPlaceholder')}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="subject"
          label={t('contactPage.subject')}
          rules={[
            {
              required: true,
              min: 2,
              max: 120,
              whitespace: true,
              transform: (value: string) => value?.trim(),
              message: t('contactPage.validation.subject'),
            },
          ]}
        >
          <Input
            aria-label={t('contactPage.subject')}
            maxLength={120}
            placeholder={t('contactPage.subjectPlaceholder')}
          />
        </Form.Item>
        <Form.Item
          name="message"
          label={t('contactPage.message')}
          extra={t('contactPage.messageHelp')}
          rules={[
            {
              required: true,
              min: 10,
              max: 4000,
              whitespace: true,
              transform: (value: string) => value?.trim(),
              message: t('contactPage.validation.message'),
            },
          ]}
        >
          <Input.TextArea
            aria-label={t('contactPage.message')}
            rows={6}
            maxLength={4000}
            showCount
            placeholder={t('contactPage.messagePlaceholder')}
          />
        </Form.Item>
        <p className={styles.deliveryNote}>{t('contactPage.deliveryNote')}</p>
        <Space wrap>
          <Button
            type="primary"
            htmlType="submit"
            aria-label={t(sending ? 'contactPage.sending' : 'contactPage.send')}
            loading={sending}
            disabled={!accessKey || sending}
            icon={<Send size={16} aria-hidden="true" />}
          >
            {t(sending ? 'contactPage.sending' : 'contactPage.send')}
          </Button>
          {!sending && (
            <Button onClick={clear} disabled={!dirty}>
              {t('contactPage.clear')}
            </Button>
          )}
        </Space>
      </Form>
      {sending && (
        <Button className={styles.cancelSend} onClick={cancel}>
          {t('contactPage.cancelSend')}
        </Button>
      )}
    </section>
  )
}
