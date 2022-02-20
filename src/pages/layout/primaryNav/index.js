import React from 'react'
import { Menu } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const PrimaryNav = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  return (
    <Menu mode="horizontal" width={300}>
      <Menu.Item key="mail" icon={<CodeOutlined />} onClick={() => redirectTo('dashboard')}>
        基础组件库
      </Menu.Item>
    </Menu>
  )
}

export default PrimaryNav
