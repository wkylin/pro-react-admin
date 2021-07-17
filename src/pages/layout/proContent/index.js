import React from 'react'
import { Layout } from 'antd'
// import { Switch } from 'react-router-dom'
import CustomSwitch from '@stateless/CustomSwitch'
import RouteWithSubRoutes from '@stateless/RouteWithSubRoutes'
import ProBreadcrumb from './breadcrumb'
import styles from './index.module.less'

const { Content, Header } = Layout
const ProContent = ({ routes = [] }) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <ProBreadcrumb />
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
