import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Layout, theme } from 'antd'
import AlignCenter from '@stateless/AlignCenter'

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

const SignUp = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onFinish = (values) => {
    console.log('Success:', values)
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
              {/* <Button type="primary" htmlType="submit"> */}
              <Button type="primary" onClick={() => redirectTo('/')}>
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </AlignCenter>
      </Content>
    </Layout>
  )
}

export default SignUp
