import AnimatedIcon from '@wui/AnimatedIcon'
import SliderCaptcha from '@wui/SliderCaptcha'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { Form, Input, Button, Typography, Layout, App, Popover, Modal, type FormProps } from 'antd'
import { selectIsMobile, useAppStore, useApplicationScope } from '@app/model'
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons'
import { setLocalStorage } from '@shared/lib/publicFn'
import { useAuth } from '@platform/auth/hooks/useAuth'
import { authService } from '@platform/auth/services/authService'
import { permissionService } from '@platform/auth/services/permissionService'
import { testAccounts } from '@platform/auth/mocks/permission'
import { isDemoPermissionMode } from '@platform/auth/api/permission'
import EnterpriseSignIn from '@platform/auth/components/EnterpriseSignIn'
import AuthShowcase, { AuthBackdrop } from '@platform/auth/components/AuthShowcase'

import styles from './index.module.less'

const { Title, Text } = Typography
const { Content } = Layout

const TEST_ACCOUNT_EMAILS = Object.keys(testAccounts)

interface SignInFormValues {
  email: string
  password: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const generatePassword = () => {
  try {
    const arr = new Uint32Array(1)
    globalThis.crypto?.getRandomValues?.(arr)
    const value = (arr[0] ?? 0) % 1000000
    return String(value).padStart(6, '0')
  } catch {
    return String(Date.now()).slice(-6).padStart(6, '0')
  }
}

const loadOrInitPasswords = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem('test_account_passwords')
    const parsed: unknown = raw ? JSON.parse(raw) : {}
    const next: Record<string, string> = {}
    if (isRecord(parsed)) {
      Object.entries(parsed).forEach(([email, password]) => {
        if (typeof password === 'string') next[email] = password
      })
    }

    let changed = false
    TEST_ACCOUNT_EMAILS.forEach((email) => {
      if (typeof next[email] !== 'string' || next[email].length === 0) {
        next[email] = generatePassword()
        changed = true
      }
    })

    if (changed) {
      localStorage.setItem('test_account_passwords', JSON.stringify(next))
    }

    return next
  } catch {
    const fallback: Record<string, string> = {}
    TEST_ACCOUNT_EMAILS.forEach((email) => {
      fallback[email] = generatePassword()
    })
    return fallback
  }
}

const DemoSignIn = () => {
  const { t } = useTranslation()
  const { projectId } = useApplicationScope()
  const { redirectTo } = useSafeNavigate()
  const { message } = App.useApp()
  const { isAuthenticated } = useAuth()
  const [form] = Form.useForm<SignInFormValues>()
  const isMobile = useAppStore(selectIsMobile)
  const [accountPasswords, setAccountPasswords] = useState<Record<string, string>>({})
  const [captchaOpen, setCaptchaOpen] = useState(false)
  const [captchaKey, setCaptchaKey] = useState(() => Date.now())
  const [submitting, setSubmitting] = useState(false)
  const [githubAvailable, setGithubAvailable] = useState(false)
  const captchaVerifiedRef = useRef(false)

  const isLikelyEmail = (value: unknown): value is string => {
    if (typeof value !== 'string') return false
    if (value.length > 320) return false
    if (value.includes(' ')) return false

    const at = value.indexOf('@')
    if (at <= 0 || at !== value.lastIndexOf('@')) return false

    const dot = value.indexOf('.', at + 2)
    if (dot === -1 || dot >= value.length - 1) return false

    return true
  }

  const getErrorMessage = (error: unknown) => (error instanceof Error && error.message ? error.message : '未知错误')

  const getExpectedPassword = (email: string) => {
    if (accountPasswords?.[email]) return accountPasswords[email]
    // 如果状态中没有，从 localStorage 读取（不触发 setState）
    const stored = loadOrInitPasswords()
    return stored[email] || ''
  }

  useEffect(() => {
    let active = true
    void fetch('/api/demo/github/config', { credentials: 'same-origin', cache: 'no-store' })
      .then(async (response) => (response.ok ? response.json() : null))
      .then((config: unknown) => {
        if (
          active &&
          config &&
          typeof config === 'object' &&
          'enabled' in config &&
          config.enabled === true &&
          'appUrl' in config &&
          typeof config.appUrl === 'string'
        ) {
          const app = new URL(config.appUrl)
          if (app.origin === window.location.origin && window.location.pathname.startsWith(app.pathname))
            setGithubAvailable(true)
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true
    Promise.resolve().then(() => {
      if (!active) return
      setAccountPasswords(loadOrInitPasswords())
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      if (!isAuthenticated) return
      try {
        const routes = await permissionService.getAccessibleRoutes()
        let target = '/'
        if (Array.isArray(routes) && routes.length > 0) {
          target = (routes || []).includes('/') ? '/' : routes[0]
        }
        redirectTo(target, { replace: true })
      } catch {
        redirectTo('/', { replace: true })
      }
    }
    redirectIfLoggedIn()
  }, [isAuthenticated, redirectTo])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('token')
      if (raw) {
        let email = ''
        try {
          const obj = JSON.parse(raw)
          email = obj.token || ''
        } catch {
          email = raw
        }
        if (!isLikelyEmail(email)) {
          localStorage.removeItem('token')
        }
      }
    } catch {
      // 无操作
    }
    form.resetFields()
  }, [form])

  const onFinish = async (values: SignInFormValues) => {
    const { email, password } = values

    if (!captchaVerifiedRef.current) {
      captchaVerifiedRef.current = false
      setCaptchaKey(Date.now())
      setCaptchaOpen(true)
      message.info('请完成滑块验证')
      return
    }

    let hideLoading: (() => void) | undefined
    try {
      setSubmitting(true)
      hideLoading = message.loading('正在登录...', 0)

      if (!testAccounts[email]) {
        message.error('账号不存在')
        return
      }
      if (getExpectedPassword(email) !== password) {
        message.error('密码错误')
        return
      }

      setLocalStorage('token', { token: email })
      try {
        localStorage.removeItem('user_role')
      } catch {
        // Storage access may be unavailable in restricted browser contexts.
      }

      await authService.setTestAccountAuthenticated(email)
      const routes = await permissionService.getAccessibleRoutes(true)

      captchaVerifiedRef.current = false
      setCaptchaKey(Date.now())

      if (routes && routes.length > 0) {
        const safeRoutes = Array.isArray(routes) ? routes : []
        const targetRoute = safeRoutes.includes('/') ? '/' : safeRoutes[0]
        redirectTo(targetRoute)
      } else {
        redirectTo('/403')
      }
    } catch (error) {
      // A successful identity switch remounts AntdApp, invalidating this page's message instance.
      if (!authService.isAuthenticated()) message.error(`权限同步失败：${getErrorMessage(error)}`)
      redirectTo('/')
    } finally {
      setSubmitting(false)
      try {
        if (typeof hideLoading === 'function') hideLoading()
      } catch {
        // The Ant Design message disposer is best effort during navigation.
      }
    }
  }

  const onFinishFailed: NonNullable<FormProps<SignInFormValues>['onFinishFailed']> = () => {}

  const fillAccount = (email: string) => {
    form.setFieldsValue({
      email,
      password: getExpectedPassword(email),
    })
    captchaVerifiedRef.current = false
    setCaptchaKey(Date.now())
  }

  const handleLoginClick = async () => {
    try {
      await form.validateFields()
      captchaVerifiedRef.current = false
      setCaptchaKey(Date.now())
      setCaptchaOpen(true)
    } catch {
      // AntD会显示校验错误
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className={styles.root}>
        <AuthBackdrop variant="demo" />

        <div className={styles.grid}>
          <div className={styles.hero}>
            <AuthShowcase variant="demo" headingLevel={1} />
          </div>

          <section className={styles.panel}>
            <div className={styles.card}>
              <div className={styles.titleBox}>
                <Title level={2} className={styles.title}>
                  登录
                </Title>
                <Text type="secondary">选择测试账号快速填充，或输入凭据登录</Text>
              </div>

              <div className={styles.quickBox}>
                <div className={styles.quickHeader}>
                  <Text strong>测试账号</Text>
                  <Text type="secondary">（点击填充）</Text>
                </div>
                <div className={styles.quickList}>
                  {Object.entries(testAccounts).map(([email, account]) => (
                    <button key={email} type="button" className={styles.quickItem} onClick={() => fillAccount(email)}>
                      <div className={styles.quickLeft}>
                        <span className={styles.quickTag}>{account.name}</span>
                        <span className={styles.quickMeta}>{email}</span>
                      </div>
                      <span className={styles.quickPwd}>{accountPasswords[email] || ''}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Form
                form={form}
                name="signin"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size="large"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱!' },
                    { type: 'email', message: '请输入有效的邮箱格式!' },
                  ]}
                >
                  <Input
                    prefix={
                      <AnimatedIcon variant="spin" mode="hover">
                        <UserOutlined />
                      </AnimatedIcon>
                    }
                    placeholder="邮箱"
                  />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                  <Input.Password
                    prefix={
                      <AnimatedIcon variant="spin" mode="hover">
                        <LockOutlined />
                      </AnimatedIcon>
                    }
                    placeholder="密码"
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 8 }}>
                  {isMobile ? (
                    <>
                      <Button type="primary" block onClick={handleLoginClick} disabled={captchaOpen || submitting}>
                        登录
                      </Button>
                      <Modal
                        centered
                        open={captchaOpen}
                        footer={null}
                        mask={{ closable: false }}
                        onCancel={() => setCaptchaOpen(false)}
                        afterClose={() => {
                          setCaptchaKey(Date.now())
                          captchaVerifiedRef.current = false
                        }}
                        width={'90vw'}
                        style={{ maxWidth: 420 }}
                        styles={{ body: { padding: 8 } }}
                      >
                        <SliderCaptcha
                          key={captchaKey}
                          onSuccess={() => {
                            captchaVerifiedRef.current = true
                            setCaptchaOpen(false)
                            form.submit()
                          }}
                          onFail={() => {
                            captchaVerifiedRef.current = false
                          }}
                          onRefresh={() => {
                            captchaVerifiedRef.current = false
                          }}
                        />
                      </Modal>
                    </>
                  ) : (
                    <Popover
                      open={captchaOpen}
                      placement="top"
                      trigger="click"
                      arrow
                      onOpenChange={(open) => {
                        if (!open) {
                          setCaptchaOpen(false)
                          setCaptchaKey(Date.now())
                          captchaVerifiedRef.current = false
                        }
                      }}
                      content={
                        <div style={{ padding: 4 }}>
                          <SliderCaptcha
                            key={captchaKey}
                            onSuccess={() => {
                              captchaVerifiedRef.current = true
                              setCaptchaOpen(false)
                              form.submit()
                            }}
                            onFail={() => {
                              captchaVerifiedRef.current = false
                            }}
                            onRefresh={() => {
                              captchaVerifiedRef.current = false
                            }}
                          />
                        </div>
                      }
                    >
                      <Button type="primary" block onClick={handleLoginClick} disabled={captchaOpen || submitting}>
                        登录
                      </Button>
                    </Popover>
                  )}
                </Form.Item>
              </Form>

              {githubAvailable && (
                <Button
                  block
                  className={styles.githubButton}
                  icon={<GithubOutlined />}
                  onClick={() => authService.login()}
                >
                  使用 GitHub 登录
                </Button>
              )}

              <div className={styles.footerRow}>
                <Text type="secondary">想体验表单校验？</Text>
                <Button type="link" className={styles.registerBtn} onClick={() => redirectTo('/signup')}>
                  查看注册演示
                </Button>
              </div>
              {(projectId === 'default' || projectId === 'projectA') && (
                <div className={styles.footerRow}>
                  <Text type="secondary">{t('identity.exploreProject')}</Text>
                  <Link to="/overview">{t('identity.viewOverview')}</Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </Content>
    </Layout>
  )
}

export default function SignIn() {
  return isDemoPermissionMode() ? <DemoSignIn /> : <EnterpriseSignIn />
}
