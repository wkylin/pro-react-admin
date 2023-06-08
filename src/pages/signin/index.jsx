import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Layout, theme } from 'antd'
import AlignCenter from '@stateless/AlignCenter'
import { setLocalStorage } from '@utils/publicFn'

const { Content } = Layout

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

const SignIn = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onFinish = (values) => {
    // 模拟后端登录
    const { username } = values
    setLocalStorage('token', { token: username })
    redirectTo('/')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Content style={{ height: '100%', background: colorBgContainer }}>
        <AlignCenter>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
              username: process.env.AUTH_USER,
              password: process.env.AUTH_PASSWORD,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {' '}
                Sign in
              </Button>
              {/* <Button type="primary" onClick={() => redirectTo('/')}>
                Sign in
              </Button> */}
            </Form.Item>
          </Form>
        </AlignCenter>
      </Content>
    </Layout>
  )
}

export default SignIn
