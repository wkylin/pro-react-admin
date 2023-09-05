import React from 'react'
import { Button, Space } from 'antd'
import { CodeOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const PrimaryNav = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }
  const goToWkylin = () => {
    window.open(`https://skyline.github.com/wkylin/${new Date().getFullYear() - 1}`, '_blank')
  }

  return (
    <>
      <Space>
        <Button type="link" icon={<CodeOutlined />} onClick={() => redirectTo('dashboard')}>
          多路由设置
        </Button>
        <Button type="link" icon={<TeamOutlined />} onClick={goToWkylin}>
          Skyline for wkylin.w
        </Button>
      </Space>
    </>
  )
}

export default PrimaryNav
