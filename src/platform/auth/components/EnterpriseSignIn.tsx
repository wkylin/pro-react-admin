import { useState } from 'react'
import { Alert, Button, Form, Input, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { loginEnterprise } from '../api/enterprise'
import { authService } from '../services/authService'
import { isRecord } from '@platform/api/core/response'
import { getEnv, getEnvBool } from '@platform/config/env'
import demoAccount from '../../../../config/enterprise-demo.json'
import AuthShowcase, { AuthBackdrop } from './AuthShowcase'
import styles from './EnterpriseSignIn.module.less'

type Credentials = { tenantId: string; email: string; password: string; totpCode?: string; recoveryCode?: string }
export default function EnterpriseSignIn() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const [needsTotp, setNeedsTotp] = useState(false)
  const [useRecovery, setUseRecovery] = useState(false)
  const [pendingCredentials, setPendingCredentials] = useState<Pick<Credentials, 'tenantId' | 'email' | 'password'>>()
  const [form] = Form.useForm<Credentials>()
  const showLocalDemo = getEnv('NODE_ENV') === 'development' && getEnvBool('REACT_APP_ENTERPRISE_LOCAL_DEMO')
  const submit = async (credentials: Credentials) => {
    setBusy(true)
    setError(undefined)
    try {
      const base = needsTotp && pendingCredentials ? pendingCredentials : credentials
      const result = await loginEnterprise({
        tenantId: base.tenantId,
        email: base.email,
        password: base.password,
        ...(needsTotp
          ? useRecovery
            ? { recoveryCode: credentials.recoveryCode?.trim() }
            : { totpCode: credentials.totpCode?.trim() }
          : {}),
      })
      if ('totpRequired' in result) {
        setPendingCredentials({ tenantId: base.tenantId, email: base.email, password: base.password })
        setNeedsTotp(true)
        return
      }
      await authService.setEnterpriseAuthenticated(result)
      navigate('/', { replace: true })
    } catch (reason) {
      setError(
        isRecord(reason) && reason.status === 401
          ? t(needsTotp ? 'identity.invalidSecondFactor' : 'identity.invalidCredentials')
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
    <main className={styles.page} aria-labelledby="enterprise-sign-in-title">
      <AuthBackdrop variant="enterprise" />
      <div className={styles.showcaseSide}>
        <AuthShowcase variant="enterprise" />
      </div>
      <section className={styles.formSide}>
        <div className={styles.formWrap}>
          <div className={styles.formHeading}>
            <span className={styles.formKicker}>PRO REACT ADMIN / ENTERPRISE</span>
            <Typography.Title id="enterprise-sign-in-title" level={1} className={styles.title}>
              {t('identity.title')}
            </Typography.Title>
            <Typography.Paragraph type="secondary" className={styles.description}>
              {t('identity.description')}
            </Typography.Paragraph>
          </div>
          {showLocalDemo && (
            <div className={styles.demoPanel}>
              <div className={styles.demoTop}>
                <span className={styles.demoTitle}>{t('identity.localDemoTitle')}</span>
                <Button size="small" onClick={() => form.setFieldsValue(demoAccount)} disabled={busy || needsTotp}>
                  {t('identity.fillLocalDemo')}
                </Button>
              </div>
              <div className={styles.demoCredentials}>
                <span>
                  {t('identity.tenant')} <code>{demoAccount.tenantId}</code>
                </span>
                <span>
                  {t('admin.email')} <code>{demoAccount.email}</code>
                </span>
                <span>
                  {t('identity.password')} <code>{demoAccount.password}</code>
                </span>
              </div>
              <Typography.Text type="secondary" className={styles.demoNote}>
                {t('identity.localDemoNote')}
              </Typography.Text>
            </div>
          )}
          {error && <Alert type="error" title={error} showIcon className={styles.error} />}
          <Form<Credentials>
            form={form}
            layout="vertical"
            size="large"
            noValidate
            onFinish={(values) => void submit(values)}
          >
            <Form.Item
              name="tenantId"
              label={t('identity.tenant')}
              rules={[
                { required: true, message: t('identity.enterTenant') },
                { pattern: /^[a-z][a-z0-9_-]*$/, max: 64, message: t('identity.invalidTenant') },
              ]}
            >
              <Input autoComplete="organization" disabled={busy || needsTotp} />
            </Form.Item>
            <Form.Item
              name="email"
              label={t('admin.email')}
              rules={[
                { required: true, message: t('identity.enterEmail') },
                { type: 'email', message: t('identity.invalidEmail') },
                { max: 254, message: t('identity.emailTooLong') },
              ]}
            >
              <Input autoComplete="username" type="email" disabled={busy || needsTotp} />
            </Form.Item>
            <Form.Item
              name="password"
              label={t('identity.password')}
              rules={[
                { required: true, message: t('identity.enterPassword') },
                { max: 256, message: t('identity.passwordTooLong') },
              ]}
            >
              <Input.Password autoComplete="current-password" disabled={busy || needsTotp} />
            </Form.Item>
            {needsTotp && (
              <>
                <Alert type="info" showIcon title={t('identity.secondFactorRequired')} style={{ marginBottom: 16 }} />
                {useRecovery ? (
                  <Form.Item
                    name="recoveryCode"
                    label={t('identity.recoveryCode')}
                    rules={[{ required: true, message: t('identity.enterRecoveryCode') }]}
                  >
                    <Input autoComplete="one-time-code" maxLength={19} disabled={busy} />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="totpCode"
                    label={t('identity.totpCode')}
                    rules={[{ required: true, pattern: /^\d{6}$/, message: t('identity.enterTotpCode') }]}
                  >
                    <Input autoComplete="one-time-code" inputMode="numeric" maxLength={6} disabled={busy} />
                  </Form.Item>
                )}
                <Space style={{ marginBottom: 16 }}>
                  <Button type="link" onClick={() => setUseRecovery((value) => !value)} disabled={busy}>
                    {t(useRecovery ? 'identity.useAuthenticatorCode' : 'identity.useRecoveryCode')}
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      setNeedsTotp(false)
                      setUseRecovery(false)
                      setPendingCredentials(undefined)
                      setError(undefined)
                    }}
                    disabled={busy}
                  >
                    {t('identity.changeAccount')}
                  </Button>
                </Space>
              </>
            )}
            <Button type="primary" htmlType="submit" loading={busy} block className={styles.submit}>
              {t(needsTotp ? 'identity.verifyAndSignIn' : 'identity.signIn')}
            </Button>
          </Form>
          <p className={styles.accessNote}>{t('identity.accessNote')}</p>
        </div>
      </section>
    </main>
  )
}
