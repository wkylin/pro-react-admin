import React from 'react'
import { useNavigate } from 'react-router-dom'
import AlignCenter from '@stateless/AlignCenter'
import { Form, Input, Button, Card, Divider, Checkbox, Typography, Row, Col, Select, Layout, theme } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GithubOutlined,
  GoogleOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons'

import { setLocalStorage } from '@utils/publicFn'

const { Title, Text, Link } = Typography
const { Option } = Select
const { Content } = Layout

const SignUp = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [form] = Form.useForm()

  const onFinish = (values) => {
    const { email } = values
    setLocalStorage('token', { token: email })
    redirectTo('/')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('表单验证失败:', errorInfo)
  }

  // 手机号前缀选择器
  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="86">
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="44">+44</Option>
      </Select>
    </Form.Item>
  )

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
                padding: '40px 32px',
              }}
            >
              {/* 头部标题 */}
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={2} style={{ marginBottom: 8, color: '#1f2937' }}>
                  创建账户
                </Title>
                <Text type="secondary">填写信息完成注册</Text>
              </div>

              {/* 社交注册按钮 */}
              <Row gutter={12} style={{ marginBottom: 24 }}>
                <Col span={12}>
                  <Button block icon={<GithubOutlined />} style={{ height: 40 }}>
                    GitHub
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block icon={<GoogleOutlined />} style={{ height: 40 }}>
                    Google
                  </Button>
                </Col>
              </Row>

              <Divider>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  或者使用邮箱注册
                </Text>
              </Divider>

              {/* 注册表单 */}
              <Form
                form={form}
                name="register"
                initialValues={{
                  agreement: true,
                  username: process.env.AUTH_USER,
                  email: process.env.AUTH_EMAIL,
                  phone: process.env.AUTH_PHONE,
                  password: process.env.AUTH_PASSWORD,
                  confirmPassword: process.env.AUTH_PASSWORD,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="large"
                layout="vertical"
                scrollToFirstError
              >
                {/* 用户名 */}
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[
                    { required: true, message: '请输入用户名!' },
                    { min: 3, message: '用户名至少需要3个字符!' },
                    { max: 20, message: '用户名不能超过20个字符!' },
                    {
                      pattern: /^[a-zA-Z0-9._\u4e00-\u9fa5]+$/,
                      message: '用户名只能包含字母、数字、下划线、半角.和中文!',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="请输入用户名"
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 邮箱 */}
                <Form.Item
                  label="邮箱地址"
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱地址!' },
                    { type: 'email', message: '请输入有效的邮箱地址!' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="请输入邮箱地址"
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 手机号 */}
                <Form.Item
                  label="手机号码"
                  name="phone"
                  rules={[
                    { required: true, message: '请输入手机号码!' },
                    {
                      pattern: /^1[3-9]\d{9}$/,
                      message: '请输入有效的手机号码!',
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="请输入手机号码"
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 密码 */}
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    { required: true, message: '请输入密码!' },
                    { min: 8, message: '密码至少需要8个字符!' },
                    {
                      // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
                      // pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&.]{8,}$/,
                      pattern: /^(?=.*[a-zA-Z])[a-zA-Z\d@$!%*?&.]{8,}$/,
                      message: '密码必须包含大或小写字母或数字!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="请输入密码"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 确认密码 */}
                <Form.Item
                  label="确认密码"
                  name="confirmPassword"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: '请确认密码!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('两次输入的密码不一致!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder="请再次输入密码"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 同意条款 */}
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('请同意用户协议和隐私政策')),
                    },
                  ]}
                  style={{ marginBottom: 16 }}
                >
                  <Checkbox>
                    我已阅读并同意
                    <Link>用户协议</Link>和<Link>隐私政策</Link>
                  </Checkbox>
                </Form.Item>

                {/* 注册按钮 */}
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
                    立即注册
                  </Button>
                </Form.Item>

                {/* 登录链接 */}
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    已有账户？
                    <Link href="#/signin" style={{ fontWeight: 500 }}>
                      立即登录
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

export default SignUp
