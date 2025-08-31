import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Form, Input, Button, Card, Divider, Checkbox, Typography, Row, Col, theme } from 'antd'
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GithubOutlined,
  GoogleOutlined,
  MailOutlined,
} from '@ant-design/icons'
import AlignCenter from '@stateless/AlignCenter'
import { setLocalStorage } from '@utils/publicFn'
// import { useOAuth } from '@hooks/useOAuth'
import { useAuth } from '@src/service/useAuth'
import { authService } from '@src/service/authService'

const { Content } = Layout
const { Title, Text, Link } = Typography

const SignIn = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  // const { loginWithGitHub, loginWithGoogle } = useOAuth()

  const { isAuthenticated, user, isLoading } = useAuth()

  const handleLogin = () => {
    authService.login()
  }

  const [form] = Form.useForm()

  const onFinish = (values) => {
    // 模拟后端登录
    const { email } = values
    setLocalStorage('token', { token: email })
    redirectTo('/')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
                maxWidth: 400,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '40px 32px',
              }}
            >
              {/* 头部标题 */}
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={2} style={{ marginBottom: 8, color: '#1f2937' }}>
                  欢迎回来
                </Title>
                <Text type="secondary">请输入您的账户信息以登录</Text>
              </div>

              {/* 社交登录按钮 */}
              <Row gutter={12} style={{ marginBottom: 24 }}>
                <Col span={12}>
                  {isLoading ? (
                    <Button block icon={<GithubOutlined />} style={{ height: 40 }} loading>
                      正在登录...
                    </Button>
                  ) : (
                    <Button block icon={<GithubOutlined />} style={{ height: 40 }}>
                      GitHub
                    </Button>
                  )}
                </Col>
                <Col span={12}>
                  <Button block icon={<GoogleOutlined />} style={{ height: 40 }}>
                    Google
                  </Button>
                </Col>
              </Row>

              <Divider>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  或者使用邮箱登录
                </Text>
              </Divider>

              {/* 登录表单 */}
              <Form
                form={form}
                name="login"
                initialValues={{
                  remember: true,
                  username: process.env.AUTH_USER,
                  email: process.env.AUTH_EMAIL,
                  password: process.env.AUTH_PASSWORD,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="large"
                layout="vertical"
              >
                <Form.Item
                  label="邮箱地址"
                  name="email"
                  rules={[
                    { required: true, message: '请输入您的邮箱地址!' },
                    { type: 'email', message: '请输入有效的邮箱地址!' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="请输入您的邮箱"
                    style={{ height: 44 }}
                  />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    { required: true, message: '请输入您的密码!' },
                    { min: 6, message: '密码至少需要6个字符!' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="请输入您的密码"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ height: 44 }}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Link href="#/reset-pwd" style={{ fontSize: 14 }}>
                      忘记密码？
                    </Link>
                  </div>
                </Form.Item>

                <Form.Item style={{ marginBottom: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{
                      height: 44,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: 500,
                    }}
                  >
                    登录
                  </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    还没有账户？
                    <Link href="#/signup" style={{ fontWeight: 500 }}>
                      立即注册
                    </Link>
                  </Text>
                </div>
              </Form>
            </Card>
          </div>
        </AlignCenter>
      </Content>
    </Layout>
  )
}

export default SignIn
