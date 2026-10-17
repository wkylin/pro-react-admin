import { useState } from 'react'
import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { loginEnterprise } from '../api/enterprise'
import { authService } from '../services/authService'
import { isRecord } from '@platform/api/core/response'

type Credentials = { tenantId: string; email: string; password: string }
export default function EnterpriseSignIn() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const submit = async (credentials: Credentials) => {
    setBusy(true)
    setError(undefined)
    try {
      await authService.setEnterpriseAuthenticated(await loginEnterprise(credentials))
      navigate('/', { replace: true })
    } catch (reason) {
      setError(
        isRecord(reason) && reason.status === 401
          ? t('identity.invalidCredentials')
          : isRecord(reason) && reason.status === 429
            ? t('identity.tryLater')
            : reason instanceof Error
              ? reason.message
              : t('identity.failed')
      )
    } finally {
      setBusy(false)
    }
  }
  return (
    <main
      aria-labelledby="enterprise-sign-in-title"
      style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16 }}
    >
      <Card style={{ width: '100%', maxWidth: 420 }}>
        <Typography.Title id="enterprise-sign-in-title" level={1}>
          {t('identity.title')}
        </Typography.Title>
        <Typography.Paragraph type="secondary">{t('identity.description')}</Typography.Paragraph>
        {error && <Alert type="error" title={error} showIcon style={{ marginBottom: 16 }} />}
        <Form<Credentials> layout="vertical" onFinish={(values) => void submit(values)}>
          <Form.Item
            name="tenantId"
            label={t('identity.tenant')}
            rules={[{ required: true, pattern: /^[a-z][a-z0-9_-]*$/, max: 64 }]}
          >
            <Input autoComplete="organization" disabled={busy} />
          </Form.Item>
          <Form.Item name="email" label={t('admin.email')} rules={[{ required: true, type: 'email', max: 254 }]}>
            <Input autoComplete="username" type="email" disabled={busy} />
          </Form.Item>
          <Form.Item name="password" label={t('identity.password')} rules={[{ required: true, max: 256 }]}>
            <Input.Password autoComplete="current-password" disabled={busy} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={busy} block>
            {t('identity.signIn')}
          </Button>
        </Form>
      </Card>
    </main>
  )
}
