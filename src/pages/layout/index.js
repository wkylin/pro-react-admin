import React from 'react'
import { Layout } from 'antd'

import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import styles from './index.module.less'

const ProLayout = () => {
  return (
    <Layout className={styles.layout}>
      <ProHeader />
      <Layout className={styles.layout}>
        <ProSider />
        <ProContent />
      </Layout>
    </Layout>
  )
}

export default ProLayout
