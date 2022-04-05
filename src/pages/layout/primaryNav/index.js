import React from 'react'
import { Button, Space } from 'antd'
import { CodeOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const PrimaryNav = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  return (
    <>
      <Space>
        <Button type="link" icon={<CodeOutlined />} onClick={() => redirectTo('dashboard')}>
          多路由设置
        </Button>
        <Button type="link" icon={<AppstoreOutlined />} onClick={() => redirectTo('landing')}>
          Landing Page For Media
        </Button>
      </Space>
    </>
  )
}

export default PrimaryNav
