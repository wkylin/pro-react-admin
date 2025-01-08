import React from 'react'
import { Layout } from 'antd'
import { ProTabProvider } from '@hooks/proTabsContext'
import PointMove from '@stateless/PointMove'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'
import styles from './index.module.less'

const ProLayout = () => (
  <Layout className={styles.layout}>
    <PointMove />
    <ProTabProvider>
      <ProHeader />
      <Layout className={styles.layout}>
        <ProSider>
          <ProSecNav />
        </ProSider>
        <ProContent />
      </Layout>
    </ProTabProvider>
  </Layout>
)

export default ProLayout
