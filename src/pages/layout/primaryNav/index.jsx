import React from 'react'
import { Button, Space } from 'antd'
import { CodeOutlined, TeamOutlined } from '@ant-design/icons'
import useSafeNavigate from '@hooks/useSafeNavigate'
import FlipLink from '@stateless/FlipLink'

const PrimaryNav = () => {
  const { redirectTo } = useSafeNavigate()
  const goToWkylin = () => {
    window.open(`https://skyline.github.com/wkylin/${new Date().getFullYear() - 1}`, '_blank')
  }

  return (
    <>
      <Space>
        <Button type='link' icon={<CodeOutlined />} onClick={() => redirectTo('dashboard')}>
          多路由设置
        </Button>
        {/* <Button type="link" icon={<CodeOutlined />} onClick={() => redirectTo('portfilo')}>
          My Portfilo
        </Button> */}
        <FlipLink href={`https://skyline.github.com/wkylin/${new Date().getFullYear() - 1}`}>SkyLine</FlipLink>
      </Space>
    </>
  )
}

export default PrimaryNav
