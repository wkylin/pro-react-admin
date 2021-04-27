import React from 'react'
import { Layout, Breadcrumb } from 'antd'
// import { Switch } from 'react-router-dom'
import CustomSwitch from 'stateless/CustomSwitch'
import RouteWithSubRoutes from 'stateless/RouteWithSubRoutes'

import styles from './index.module.less'

const { Content, Header } = Layout
const ProContent = ({ routes = [] }) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className={styles.content}>
        <div className={styles.container}>
          <CustomSwitch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </CustomSwitch>
        </div>
        <div className={styles.footer}>Copyright &copy; 2020-{new Date().getFullYear()} 上海科技有限公司</div>
      </Content>
    </Layout>
  )
}

export default ProContent
