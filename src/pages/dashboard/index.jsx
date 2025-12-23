import React from 'react'
import { Routes, Route } from 'react-router-dom'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Button, Layout, theme } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import FixLayout from '@src/components/stateless/FixLayout'
import ViteLanding from './ViteLanding'

const { Content } = Layout

const Dashboard = () => {
  const { redirectTo } = useSafeNavigate()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  // 右上角返回首页按钮
  const renderBackHome = () => (
    <div style={{ position: 'fixed', top: 50, left: 26, zIndex: 20 }}>
      <Button type='primary' icon={<ArrowLeftOutlined />} onClick={() => redirectTo('/')} style={{ borderRadius: 20 }}>
        返回首页
      </Button>
    </div>
  )

  return (
    <FixLayout>
      <Layout
        style={{
          minHeight: '100vh',
          backgroundColor: 'transparent',
          position: 'relative'
        }}
      >
        <Content
          style={{
            minHeight: '100vh',
            backgroundColor: colorBgContainer,
            position: 'relative'
          }}
        >
          {renderBackHome()}
          <Routes>
            <Route path='/' element={<ViteLanding />} />
          </Routes>
        </Content>
      </Layout>
    </FixLayout>
  )
}

export default Dashboard
