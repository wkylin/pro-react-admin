import React from 'react'
import { Layout, BackTop } from 'antd'
import { Outlet } from 'react-router-dom'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import ProBreadcrumb from './breadcrumb'
import styles from './index.module.less'

const { Content, Header } = Layout
const ProContent = ({ routes = [] }) => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <ProBreadcrumb />
      </Header>
      <Content className={styles.content} id="content">
        <div className={styles.container}>
          <Outlet />
        </div>
        <BackTop target={() => document.querySelector('#content')}>
          <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
        </BackTop>
        <div className={styles.footer}>&copy; 2020-{new Date().getFullYear()} 上海麒麟科技有限公司</div>
      </Content>
    </Layout>
  )
}

export default ProContent
