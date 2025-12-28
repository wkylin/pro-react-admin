import React, { useEffect, useState } from 'react'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Form, Input, Button, Typography, Layout, Card, theme, App, Tag } from 'antd'
import { useStore } from '@/store'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { setLocalStorage } from '@utils/publicFn'
import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'
import { permissionService } from '@src/service/permissionService'
import { testAccounts } from '@src/mock/permission'
import styles from './index.module.less'

const { Title, Text, Paragraph } = Typography
const { Content } = Layout

const TEST_ACCOUNT_EMAILS = Object.keys(testAccounts)

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

const loadOrInitPasswords = () => {
  try {
    const raw = localStorage.getItem('test_account_passwords')
    const parsed = raw ? JSON.parse(raw) : {}
    const next = typeof parsed === 'object' && parsed ? { ...parsed } : {}

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
    const fallback = {}
    TEST_ACCOUNT_EMAILS.forEach((email) => {
      fallback[email] = generatePassword()
    })
    return fallback
  }
}

const SignIn = () => {
  const { redirectTo } = useSafeNavigate()
  const { message } = App.useApp()
  const { token } = theme.useToken()
  const { isAuthenticated } = useAuth()
  const [form] = Form.useForm()
  const isMobile = useStore((s) => s.isMobile)
  const [accountPasswords, setAccountPasswords] = useState({})

  const isLikelyEmail = (value) => {
    if (typeof value !== 'string') return false
    if (value.length > 320) return false
    if (value.includes(' ')) return false

    const at = value.indexOf('@')
    if (at <= 0 || at !== value.lastIndexOf('@')) return false

    const dot = value.indexOf('.', at + 2)
    if (dot === -1 || dot >= value.length - 1) return false

    return true
  }

  const getErrorMessage = (error) => (error instanceof Error && error.message ? error.message : '未知错误')

  const getExpectedPassword = (email) => {
    if (accountPasswords?.[email]) return accountPasswords[email]

    const next = loadOrInitPasswords()
    setAccountPasswords(next)
    return next[email] || ''
  }

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
        // 获取可访问路由列表
        const routes = await permissionService.getAccessibleRoutes()
        let target = '/'
        if (Array.isArray(routes) && routes.length > 0) {
          // 优先跳转到根路由，其次第一个有权限的路由
          target = (routes || []).includes('/') ? '/' : routes[0]
        }
        redirectTo(target, { replace: true })
      } catch {
        redirectTo('/', { replace: true })
      }
    }
    redirectIfLoggedIn()
  }, [isAuthenticated, redirectTo])

  // 挂载时清理可能的无效 token 并重置表单，避免出现 "请输入有效的邮箱格式" 残留提示
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
    } catch {}
    // 重置表单，确保输入框为空
    form.resetFields()
  }, [form])

  const onFinish = async (values) => {
    const { email, password } = values

    // 验证账号密码
    if (!testAccounts[email]) {
      message.error('账号不存在')
      return
    }

    if (getExpectedPassword(email) !== password) {
      message.error('密码错误')
      return
    }

    // 保存登录信息
    setLocalStorage('token', { token: email })

    // 清除可能的手动设置角色，确保使用正确的账号角色
    try {
      localStorage.removeItem('user_role')
    } catch {}

    // 纳入统一登录态（测试账号也算已登录），并同步权限
    try {
      await authService.setTestAccountAuthenticated(email)
      const routes = await permissionService.getAccessibleRoutes(true)

      message.success(`登录成功！欢迎 ${testAccounts[email].name}`)

      if (routes && routes.length > 0) {
        const safeRoutes = Array.isArray(routes) ? routes : []
        const targetRoute = safeRoutes.includes('/') ? '/' : safeRoutes[0]
        redirectTo(targetRoute)
      } else {
        redirectTo('/403')
      }
    } catch (error) {
      message.error(`权限同步失败：${getErrorMessage(error)}`)
      redirectTo('/')
    }
  }

  const onFinishFailed = () => {}

  // 快速填充测试账号
  const fillAccount = (email) => {
    form.setFieldsValue({
      email,
      password: getExpectedPassword(email),
    })
  }

  const cssVars = {
    '--signin-bg': token.colorBgBase,
    '--signin-panel': token.colorBgContainer,
    '--signin-panel-2': token.colorBgLayout,
    '--signin-border': token.colorBorderSecondary,
    '--signin-text': token.colorText,
    '--signin-text-2': token.colorTextSecondary,
    '--signin-primary': token.colorPrimary,
    '--signin-primary-2': token.colorInfo,
    '--signin-shadow': token.boxShadowSecondary,
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className={styles.root} style={cssVars}>
        <div className={styles.bg} aria-hidden="true" />

        <div className={styles.grid} style={{ padding: isMobile ? 16 : 24 }}>
          {/* Left: Brand / Tech hero */}
          {!isMobile && (
            <section className={styles.hero}>
              <div className={styles.heroInner}>
                <div className={styles.badgeRow}>
                  <Tag variant="filled" color="processing">
                    AI-ready Console
                  </Tag>
                  <Tag variant="filled">Pro React Admin</Tag>
                </div>
                <Title level={1} className={styles.heroTitle}>
                  面向 AI 时代的
                  <br />
                  企业级控制台
                </Title>
                <Paragraph className={styles.heroDesc}>大屏沉浸式视觉 · 权限体系 · 可观测的交互反馈</Paragraph>

                <div className={styles.heroPills}>
                  <span className={styles.pill}>Fast Tabs</span>
                  <span className={styles.pill}>Role-based Access</span>
                  <span className={styles.pill}>Vite/Webpack Build</span>
                </div>
              </div>
            </section>
          )}

          {/* Right: Auth card */}
          <section className={styles.panel}>
            <Card className={styles.card} variant="borderless" styles={{ body: { padding: isMobile ? 16 : 24 } }}>
              <div className={styles.titleBox}>
                <Title level={2} className={styles.title}>
                  登录
                </Title>
                <Text type="secondary">选择测试账号快速填充，或输入凭据登录</Text>
              </div>

              {/* 测试账号快捷选择 */}
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
                  <Input prefix={<UserOutlined />} placeholder="邮箱" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                </Form.Item>

                <Form.Item style={{ marginBottom: 8 }}>
                  <Button type="primary" htmlType="submit" block>
                    登录
                  </Button>
                </Form.Item>
              </Form>

              <div className={styles.footerRow}>
                <Text type="secondary">还没有账号？</Text>
                <Button type="link" className={styles.registerBtn} onClick={() => redirectTo('/signup')}>
                  去注册
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </Content>
    </Layout>
  )
}

export default SignIn
