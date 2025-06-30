import React from 'react'
import { Button, Space } from 'antd'
import { CodeOutlined, TeamOutlined } from '@ant-design/icons'
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
      </Space>
    </>
  )
}

export default PrimaryNav
