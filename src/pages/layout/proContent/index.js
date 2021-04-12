import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import styles from './index.module.less'

const { Content, Header } = Layout
const ProContent = () => {
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
          {/* 此处加载不同的组件 */}
          加载路由---路由设置
        </div>
        <div className={styles.footer}>Copyright &copy; 2015-{new Date().getFullYear()} 上海永辉云创科技有限公司</div>
      </Content>
    </Layout>
  )
}

export default ProContent
