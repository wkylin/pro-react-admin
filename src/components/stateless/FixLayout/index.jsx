import React from 'react'
import { Layout, theme } from 'antd'
import FlipLink from '@stateless/FlipLink'
import PrimaryNav from '@pages/layout/primaryNav'

const { Header, Content } = Layout

const FixLayout = ({ children }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: colorBgContainer,
          padding: '0 20px',
          height: 48,
          lineHeight: '48px',
          borderBottom: '1px solid #f0f0f0',
          zIndex: 100
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: 16, padding: '0 10px' }}>Pro React Admin</div>
        <div style={{ padding: '0 10px' }}>
          <FlipLink href={`https://skyline.github.com/wkylin/${new Date().getFullYear() - 1}`}>SkyLine</FlipLink>
        </div>
      </Header>
      <Content style={{ overflow: 'auto', position: 'relative' }}>{children}</Content>
    </Layout>
  )
}

export default FixLayout
