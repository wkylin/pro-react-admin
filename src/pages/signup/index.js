import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

const SignUp = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }

  return (
    <div className={styles.container}>
      <Form
        {...layout}
        name='basic'
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          {/* <Button type="primary" htmlType="submit"> */}
          <Button type='primary' onClick={() => redirectTo('/')}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
