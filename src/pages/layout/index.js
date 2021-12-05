import React from 'react'
import { Layout } from 'antd'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'

import styles from './index.module.less'

const ProLayout = () => {
  return (
    <Layout className={styles.layout}>
      <ProHeader />
      <Layout className={styles.layout}>
        <ProSider>
          <ProSecNav />
        </ProSider>
        <ProContent />
      </Layout>
    </Layout>
  )
}

export default ProLayout
