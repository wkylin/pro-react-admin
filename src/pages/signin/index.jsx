import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Typography, Layout, Card, theme, App, Space, Tag } from 'antd'
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons'
import AlignCenter from '@stateless/AlignCenter'
import { setLocalStorage } from '@utils/publicFn'
import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'
import { permissionService } from '@src/service/permissionService'
import { testAccounts } from '@src/mock/permission'

const { Title, Text, Paragraph } = Typography
const { Content } = Layout

const SignIn = () => {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { isAuthenticated } = useAuth()
  const [form] = Form.useForm()

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
        navigate(target, { replace: true })
      } catch (e) {
        navigate('/', { replace: true })
      }
    }
    redirectIfLoggedIn()
  }, [isAuthenticated, navigate])

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

    // 同步权限
    try {
      await permissionService.syncPermissions()
      const routes = await permissionService.getAccessibleRoutes(true)

      message.success(`登录成功！欢迎 ${testAccounts[email].name}`)

      if (routes && routes.length > 0) {
        const targetRoute = routes.includes('/') ? '/' : routes[0]
        navigate(targetRoute)
      } else {
        navigate('/403')
      }
    } catch (error) {
      console.error('权限同步失败:', error)
      navigate('/')
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
      <Content style={{ height: '100%', background: colorBgContainer }}>
        <AlignCenter>
          <div
            style={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              width: '100%',
            }}
          >
            <Card
              style={{
                width: '100%',
                maxWidth: 450,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Title level={2} style={{ marginBottom: '8px' }}>
                  登录系统
                </Title>
                <Text type="secondary">请选择测试账号或输入凭据</Text>
              </div>

              {/* 测试账号快捷选择 */}
              <Card size="small" style={{ marginBottom: '24px', background: '#f5f5f5' }}>
                <Paragraph style={{ margin: 0, marginBottom: '12px' }}>
                  <Text strong>测试账号（点击快速填充）：</Text>
                </Paragraph>
                <Space direction="vertical" style={{ width: '100%' }} size="small">
                  {Object.entries(testAccounts).map(([email, account]) => (
                    <Button
                      key={email}
                      block
                      size="small"
                      onClick={() => fillAccount(email)}
                      style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}
                    >
                      <Space>
                        <Tag color="blue">{account.name}</Tag>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
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

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <Text type="secondary">或者</Text>
              </div>

              <Button icon={<GithubOutlined />} onClick={handleLogin} block size="large" style={{ marginTop: '16px' }}>
                使用 GitHub 登录
              </Button>
            </Card>
          </div>
        </AlignCenter>
      </Content>
    </Layout>
  )
}

export default SignIn
