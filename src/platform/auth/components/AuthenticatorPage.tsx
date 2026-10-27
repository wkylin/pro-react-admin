import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Alert, Button, Card, Input, Space, Spin, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import FixTabPanel from '@shared/ui/FixTabPanel'
import {
  beginTotp,
  confirmTotp,
  disableTotp,
  getTotpStatus,
  rotateTotpRecoveryCodes,
  type TotpSetup,
  type TotpStatus,
} from '../api/enterprise'

const errorKeys: Record<string, string> = {
  invalid_credentials: 'authenticator.errors.password',
  invalid_second_factor: 'authenticator.errors.code',
  totp_rate_limited: 'authenticator.errors.rateLimited',
  totp_setup_expired: 'authenticator.errors.expired',
  totp_setup_required: 'authenticator.errors.setupRequired',
  totp_already_enabled: 'authenticator.errors.alreadyEnabled',
  totp_unavailable: 'authenticator.unavailable',
}

export default function AuthenticatorPage() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<TotpStatus>()
  const [setup, setSetup] = useState<TotpSetup>()
  const [qr, setQr] = useState<string>()
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    let active = true
    void getTotpStatus().then(
      (value) => {
        if (active) setStatus(value)
      },
      (reason) => {
        if (active)
          setError(
            reason instanceof Error ? t(errorKeys[reason.message] ?? 'authenticator.failed') : t('authenticator.failed')
          )
      }
    )
    return () => {
      active = false
    }
  }, [t])

  const run = async (work: () => Promise<void>) => {
    setBusy(true)
    setError(undefined)
    setMessage(undefined)
    try {
      await work()
    } catch (reason) {
      setError(
        reason instanceof Error ? t(errorKeys[reason.message] ?? 'authenticator.failed') : t('authenticator.failed')
      )
    } finally {
      setBusy(false)
    }
  }
  const start = () =>
    run(async () => {
      const value = await beginTotp(password)
      setSetup(value)
      setRecoveryCodes([])
      setCode('')
      setQr(await QRCode.toDataURL(value.uri, { width: 240, margin: 2 }))
      setMessage(t('authenticator.setupReady'))
    })
  const confirm = () =>
    run(async () => {
      const codes = await confirmTotp(code.trim())
      setRecoveryCodes(codes)
      setStatus(await getTotpStatus())
      setSetup(undefined)
      setQr(undefined)
      setPassword('')
      setCode('')
      setMessage(t('authenticator.enabledMessage'))
    })
  const factor = () => (/^\d{6}$/.test(code.trim()) ? { totpCode: code.trim() } : { recoveryCode: code.trim() })
  const rotate = () =>
    run(async () => {
      const codes = await rotateTotpRecoveryCodes({ password, ...factor() })
      setRecoveryCodes(codes)
      setStatus(await getTotpStatus())
      setPassword('')
      setCode('')
      setMessage(t('authenticator.rotatedMessage'))
    })
  const disable = () =>
    run(async () => {
      await disableTotp({ password, ...factor() })
      setStatus(await getTotpStatus())
      setRecoveryCodes([])
      setPassword('')
      setCode('')
      setMessage(t('authenticator.disabledMessage'))
    })

  return (
    <FixTabPanel fill={false}>
      <section style={{ padding: 24, maxWidth: 780, margin: '0 auto', display: 'grid', gap: 16 }}>
        <div>
          <Typography.Title level={1}>{t('authenticator.title')}</Typography.Title>
          <Typography.Paragraph type="secondary">{t('authenticator.description')}</Typography.Paragraph>
        </div>
        {!status && !error && <Spin aria-label={t('authenticator.loading')} />}
        {error && <Alert type="error" title={error} showIcon />}
        {message && <Alert type="success" title={message} showIcon />}
        {status && (
          <Card
            title={t('authenticator.status')}
            extra={
              <Tag color={status.enabled ? 'success' : 'default'}>
                {t(status.enabled ? 'authenticator.on' : 'authenticator.off')}
              </Tag>
            }
          >
            {!status.available ? (
              <Alert type="warning" showIcon title={t('authenticator.unavailable')} />
            ) : status.enabled ? (
              <>
                <Typography.Paragraph>{t('authenticator.protected')}</Typography.Paragraph>
                <Typography.Paragraph type="secondary">
                  {t('authenticator.remaining', { count: status.recoveryCodesRemaining })}
                </Typography.Paragraph>
                <Space orientation="vertical" style={{ width: '100%' }}>
                  <Input.Password
                    aria-label={t('identity.password')}
                    placeholder={t('identity.password')}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={busy}
                  />
                  <Input
                    aria-label={t('authenticator.currentFactor')}
                    placeholder={t('authenticator.currentFactor')}
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    disabled={busy}
                  />
                  <Space wrap>
                    <Button loading={busy} disabled={!password || !code.trim()} onClick={rotate}>
                      {t('authenticator.rotate')}
                    </Button>
                    <Button danger loading={busy} disabled={!password || !code.trim()} onClick={disable}>
                      {t('authenticator.disable')}
                    </Button>
                  </Space>
                </Space>
              </>
            ) : (
              <>
                <Typography.Paragraph>{t('authenticator.startHelp')}</Typography.Paragraph>
                <Input.Password
                  aria-label={t('identity.password')}
                  placeholder={t('identity.password')}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={busy}
                  style={{ marginBottom: 12 }}
                />
                <Button type="primary" loading={busy} disabled={!password} onClick={start}>
                  {t(setup ? 'authenticator.restart' : 'authenticator.start')}
                </Button>
              </>
            )}
          </Card>
        )}
        {setup && !status?.enabled && (
          <Card title={t('authenticator.scanTitle')}>
            <Typography.Paragraph>{t('authenticator.scanHelp')}</Typography.Paragraph>
            {qr && <img src={qr} width={240} height={240} alt={t('authenticator.qrAlt')} />}
            <Typography.Paragraph>
              {t('authenticator.manualSecret')}:{' '}
              <Typography.Text code copyable>
                {setup.secret}
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">{t('authenticator.expires')}</Typography.Paragraph>
            <Input
              aria-label={t('identity.totpCode')}
              placeholder={t('identity.totpCode')}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              disabled={busy}
              style={{ marginBottom: 12 }}
            />
            <Button type="primary" loading={busy} disabled={!/^\d{6}$/.test(code)} onClick={confirm}>
              {t('authenticator.confirm')}
            </Button>
          </Card>
        )}
        {!!recoveryCodes.length && (
          <Card title={t('authenticator.recoveryTitle')}>
            <Alert type="warning" showIcon title={t('authenticator.recoveryOnce')} style={{ marginBottom: 12 }} />
            <Typography.Paragraph copyable={{ text: recoveryCodes.join('\n') }}>
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{recoveryCodes.join('\n')}</pre>
            </Typography.Paragraph>
          </Card>
        )}
      </section>
    </FixTabPanel>
  )
}
