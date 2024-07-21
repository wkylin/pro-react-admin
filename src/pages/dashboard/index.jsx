import React from 'react'
// import { Routes, Route, useNavigate, useNavigationType } from 'react-router-dom'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Button, Layout, theme, Space } from 'antd'
import FixLayout from '@src/components/stateless/FixLayout'
// import BigScreen from '@pages/bigScreen'

const { Content } = Layout

const Dashboard = () => {
  const navigate = useNavigate()
  // const navigateType = useNavigationType()
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
                  {/* <h2>Look, more routes!</h2> */}
                  {/* <h2>Navigate type: {navigateType}</h2> */}
                  <Space>
                    <Button type="primary" onClick={() => navigate('/')}>
                      Navigate /
                    </Button>
                    <Button type="primary" onClick={() => navigate('invoices')}>
                      navigate to invoices
                    </Button>
                  </Space>
                  {/* <BigScreen /> */}
                </>
              }
            />
            <Route
              path="invoices"
              element={
                <>
                  <Button type="primary" onClick={() => navigate(-1)}>
                    navigate to dashborad
                  </Button>
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
