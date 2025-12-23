import React from 'react'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import {
  Form,
  Input,
  Button,
  Card,
  Divider,
  Checkbox,
  Typography,
  Row,
  Col,
  Select,
  Layout,
  theme,
  Space,
  Grid
} from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GithubOutlined,
  GoogleOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'

import { setLocalStorage } from '@utils/publicFn'
import styles from './index.module.less'

const { Title, Text, Link } = Typography
const { Option } = Select
const { Content } = Layout
const { useBreakpoint } = Grid

const passwordIconRender = (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)

const SignUp = () => {
  const { redirectTo } = useSafeNavigate()
  const { token } = theme.useToken()
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const [form] = Form.useForm()

  const onFinish = (values) => {
    const { email } = values
    setLocalStorage('token', { token: email })
    redirectTo('/')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('表单验证失败:', errorInfo)
  }

  const cssVars = {
    '--signup-bg': token.colorBgBase,
    '--signup-panel': token.colorBgContainer,
    '--signup-panel-2': token.colorBgLayout,
    '--signup-border': token.colorBorderSecondary,
    '--signup-text': token.colorText,
    '--signup-text-2': token.colorTextSecondary,
    '--signup-primary': token.colorPrimary,
    '--signup-primary-2': token.colorInfo,
    '--signup-shadow': token.boxShadowSecondary,
    '--signup-icon': token.colorTextTertiary
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className={styles.root} style={cssVars}>
        <div className={styles.bg} aria-hidden='true' />
        <div className={styles.grid} style={{ padding: isMobile ? 16 : 24 }}>
          {!isMobile && (
            <section className={styles.hero}>
              <div className={styles.heroInner}>
                <div className={styles.heroKicker}>PRO REACT ADMIN • SIGN UP</div>
                <Title level={1} className={styles.heroTitle}>
                  加入权限驱动的
                  <br />
                  大屏控制台
                </Title>
                <Text type='secondary' className={styles.heroDesc}>
                  内置权限隔离与登出清理，切号不残留；KeepAlive Tabs 低卡顿；Vite/Webpack 构建与产物压缩自动化。
                </Text>

                <div className={styles.heroOrbit} aria-hidden='true'>
                  <div className={styles.orbitRing} />
                  <div className={styles.orbitRing2} />
                  <div className={styles.orbitDot} />
                </div>
              </div>
            </section>
          )}

          <section className={styles.panel}>
            <Card className={styles.card} variant='borderless' styles={{ body: { padding: isMobile ? 16 : 28 } }}>
              <div className={styles.titleBox}>
                <Title level={2} className={styles.title}>
                  创建账户
                </Title>
                <Text type='secondary'>完成注册后进入 Pro React Admin 工作台</Text>
              </div>

              <Row gutter={12} className={styles.socialRow}>
                <Col span={12}>
                  <Button block icon={<GithubOutlined />} className={styles.socialBtn}>
                    GitHub
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block icon={<GoogleOutlined />} className={styles.socialBtn}>
                    Google
                  </Button>
                </Col>
              </Row>

              <Divider className={styles.divider}>
                <Text type='secondary' style={{ fontSize: 12 }}>
                  或者使用邮箱注册
                </Text>
              </Divider>

              <Form
                form={form}
                name='register'
                initialValues={{
                  agreement: true,
                  username: process.env.AUTH_USER,
                  email: process.env.AUTH_EMAIL,
                  phone: process.env.AUTH_PHONE,
                  password: process.env.AUTH_PASSWORD,
                  confirmPassword: process.env.AUTH_PASSWORD
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                size='large'
                layout={isMobile ? 'vertical' : 'horizontal'}
                labelCol={isMobile ? null : { span: 6 }}
                wrapperCol={isMobile ? null : { span: 18 }}
                scrollToFirstError
              >
                {/* 用户名 */}
                <Form.Item
                  label='用户名'
                  name='username'
                  rules={[
                    { required: true, message: '请输入用户名!' },
                    { min: 3, message: '用户名至少需要3个字符!' },
                    { max: 20, message: '用户名不能超过20个字符!' },
                    {
                      pattern: /^[a-zA-Z0-9._\u4e00-\u9fa5]+$/,
                      message: '用户名只能包含字母、数字、下划线、半角.和中文!'
                    }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: token.colorTextTertiary }} />}
                    placeholder='请输入用户名'
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 邮箱 */}
                <Form.Item
                  label='邮箱地址'
                  name='email'
                  rules={[
                    { required: true, message: '请输入邮箱地址!' },
                    { type: 'email', message: '请输入有效的邮箱地址!' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: token.colorTextTertiary }} />}
                    placeholder='请输入邮箱地址'
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 手机号 */}
                <Form.Item label='手机号码' required>
                  <Space.Compact style={{ width: '100%' }}>
                    <Form.Item name='prefix' noStyle initialValue='86'>
                      <Select style={{ width: 90, height: 44 }} size='large'>
                        <Option value='86'>+86</Option>
                        <Option value='44'>+44</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name='phone'
                      noStyle
                      rules={[
                        { required: true, message: '请输入手机号码!' },
                        {
                          pattern: /^1[3-9]\d{9}$/,
                          message: '请输入有效的手机号码!'
                        }
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined style={{ color: token.colorTextTertiary }} />}
                        placeholder='请输入手机号码'
                        style={{ height: 44, width: 'calc(100% - 90px)' }}
                      />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>

                {/* 密码 */}
                <Form.Item
                  label='密码'
                  name='password'
                  rules={[
                    { required: true, message: '请输入密码!' },
                    { min: 8, message: '密码至少需要8个字符!' },
                    {
                      // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
                      // pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&.]{8,}$/,
                      pattern: /^(?=.*[a-zA-Z])[a-zA-Z\d@$!%*?&.]{8,}$/,
                      message: '密码必须包含大或小写字母或数字!'
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: token.colorTextTertiary }} />}
                    placeholder='请输入密码'
                    iconRender={passwordIconRender}
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 确认密码 */}
                <Form.Item
                  label='确认密码'
                  name='confirmPassword'
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: '请确认密码!' },
                    ({ getFieldValue }) => ({
                      validator (_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('两次输入的密码不一致!'))
                      }
                    })
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: token.colorTextTertiary }} />}
                    placeholder='请再次输入密码'
                    iconRender={passwordIconRender}
                    style={{ height: 44 }}
                  />
                </Form.Item>

                {/* 同意条款 */}
                <Form.Item
                  name='agreement'
                  valuePropName='checked'
                  wrapperCol={isMobile ? null : { offset: 6, span: 18 }}
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('请同意用户协议和隐私政策'))
                    }
                  ]}
                  style={{ marginBottom: 16 }}
                >
                  <Checkbox style={{ fontSize: isMobile ? '13px' : '14px' }}>
                    我已阅读并同意
                    <Link href='#/terms' style={{ fontSize: isMobile ? '13px' : '14px' }}>
                      用户协议
                    </Link>
                    和
                    <Link href='#/privacy' style={{ fontSize: isMobile ? '13px' : '14px' }}>
                      隐私政策
                    </Link>
                  </Checkbox>
                </Form.Item>

                {/* 注册按钮 */}
                <Form.Item style={{ marginBottom: 16 }} wrapperCol={isMobile ? null : { offset: 6, span: 18 }}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    block
                    className={styles.submitBtn}
                    style={{
                      height: 44,
                      border: 'none',
                      borderRadius: 12,
                      fontSize: 16,
                      fontWeight: 600
                    }}
                  >
                    立即注册
                  </Button>
                </Form.Item>

                {/* 登录链接 */}
                <div style={{ textAlign: 'center' }}>
                  <Text type='secondary' style={{ fontSize: 14 }}>
                    已有账户？
                    <Link href='#/signin' style={{ fontWeight: 500 }}>
                      立即登录
                    </Link>
                  </Text>
                </div>
              </Form>
            </Card>
          </section>
        </div>
      </Content>
    </Layout>
  )
}

export default SignUp
