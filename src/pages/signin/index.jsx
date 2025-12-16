import React, { useEffect } from 'react'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Form, Input, Button, Typography, Layout, Card, theme, App, Space, Tag, Grid } from 'antd'
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons'
import AlignCenter from '@stateless/AlignCenter'
import { setLocalStorage } from '@utils/publicFn'
import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'
import { permissionService } from '@src/service/permissionService'
import { testAccounts } from '@src/mock/permission'
import styles from './index.module.less'

const { Title, Text, Paragraph } = Typography
const { Content } = Layout
const { useBreakpoint } = Grid

const SignIn = () => {
  const { redirectTo } = useSafeNavigate()
  const { message } = App.useApp()
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken()
  const { isAuthenticated } = useAuth()
  const [form] = Form.useForm()
  const screens = useBreakpoint()
  const isMobile = !screens.md

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      if (!isAuthenticated) return
      try {
        // 获取可访问路由列表
        const routes = await permissionService.getAccessibleRoutes()
        let target = '/'
        if (Array.isArray(routes) && routes.length > 0) {
          // 优先跳转到根路由，其次第一个有权限的路由
          target = routes.includes('/') ? '/' : routes[0]
        }
        redirectTo(target, { replace: true })
      } catch (e) {
        redirectTo('/', { replace: true })
      }
    }
    redirectIfLoggedIn()
  }, [isAuthenticated])

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
        // 如果不是有效邮箱格式，移除 token
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          localStorage.removeItem('token')
        }
      }
    } catch (e) {
      console.warn('清理无效 token 失败:', e)
    }
    // 重置表单，确保输入框为空
    form.resetFields()
  }, [form])

  const handleLogin = () => {
    authService.login()
  }

  const onFinish = async (values) => {
    const { email, password } = values

    // 验证账号密码
    if (!testAccounts[email]) {
      message.error('账号不存在')
      return
    }

    if (testAccounts[email].password !== password) {
      message.error('密码错误')
      return
    }

    // 保存登录信息
    setLocalStorage('token', { token: email })

    // 清除可能的手动设置角色，确保使用正确的账号角色
    try {
      localStorage.removeItem('user_role')
    } catch (e) {
      console.warn('清除手动设置角色失败:', e)
    }

    // 纳入统一登录态（测试账号也算已登录），并同步权限
    try {
      await authService.setTestAccountAuthenticated(email)
      const routes = await permissionService.getAccessibleRoutes(true)

      message.success(`登录成功！欢迎 ${testAccounts[email].name}`)

      if (routes && routes.length > 0) {
        const targetRoute = routes.includes('/') ? '/' : routes[0]
        redirectTo(targetRoute)
      } else {
        redirectTo('/403')
      }
    } catch (error) {
      console.error('权限同步失败:', error)
      redirectTo('/')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('登录失败:', errorInfo)
  }

  // 快速填充测试账号
  const fillAccount = (email) => {
    form.setFieldsValue({
      email,
      password: testAccounts[email].password,
    })
  }

  return (
    <Layout style={{ height: '100%', overflow: 'auto' }}>
      <Content style={{ height: '100%', backgroundColor: colorBgContainer }}>
        <AlignCenter>
          <div className={styles.signinBg} style={{ padding: isMobile ? '16px' : '20px', width: '100%' }}>
            <Card className={styles.signinCard} styles={{ body: { padding: isMobile ? '12px' : '24px' } }}>
              <div className={styles.titleBox}>
                <Title level={2} className={styles.title}>
                  登录系统
                </Title>
                <Text type="secondary">请选择测试账号或输入凭据</Text>
              </div>

              {/* 测试账号快捷选择 */}
              <Card size="small" className={styles.accountCard} style={{ backgroundColor: colorBgLayout }}>
                <Paragraph className={styles.accountTitle}>
                  <Text strong>测试账号（点击快速填充）：</Text>
                </Paragraph>
                <Space orientation="vertical" style={{ width: '100%' }} size="small">
                  {Object.entries(testAccounts).map(([email, account]) => (
                    <Button
                      key={email}
                      block
                      size="middle"
                      onClick={() => fillAccount(email)}
                      className={styles.accountBtn}
                    >
                      <Space>
                        <Tag color="blue">{account.name}</Tag>
                        <Text type="secondary" className={styles.accountText}>
                          {email} / {account.password}
                        </Text>
                      </Space>
                    </Button>
                  ))}
                </Space>
              </Card>

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

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    登录
                  </Button>
                </Form.Item>
              </Form>

              <div className={styles.orBox}>
                <Text type="secondary">或者</Text>
              </div>

              {/* <Button icon={<GithubOutlined />} onClick={handleLogin} block size="large" style={{ marginTop: '16px' }}>
                使用 GitHub 登录
              </Button> */}

              <div className={styles.registerBox}>
                <Text type="secondary">还没有账号？ </Text>
                <Button type="link" className={styles.registerBtn} onClick={() => redirectTo('/signup')}>
                  去注册
                </Button>
              </div>
            </Card>
          </div>
        </AlignCenter>
      </Content>
    </Layout>
  )
}

export default SignIn
