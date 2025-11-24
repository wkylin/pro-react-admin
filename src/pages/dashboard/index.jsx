import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { Button, Layout, theme, Space, Skeleton } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import FixLayout from '@src/components/stateless/FixLayout'
import NavigationTabs from '@stateless/NavigationTabs'

const { Content } = Layout

const Dashboard = () => {
  const navigate = useNavigate()
  const { redirectTo } = useSafeNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <FixLayout>
      <Layout style={{ height: '100%' }}>
        <Content style={{ height: '100%', background: colorBgContainer }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Space>
                    <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => redirectTo('/')}>
                      回主站
                    </Button>
                    <Button type="link" icon={<ArrowRightOutlined />} onClick={() => redirectTo('invoices')}>
                      下一站
                    </Button>
                  </Space>
                  <NavigationTabs />
                </>
              }
            />
            <Route
              path="invoices"
              element={
                <>
                  <Space>
                    <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                      上一站
                    </Button>
                  </Space>
                  <Skeleton active />
                </>
              }
            />
          </Routes>
        </Content>
      </Layout>
    </FixLayout>
  )
}

export default Dashboard
