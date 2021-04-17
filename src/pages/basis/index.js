import React from 'react'
import { Layout } from 'antd'

import ProHeader from '../layout/proHeader'
import ProSider from '../layout/proSider'
import ProContent from '../layout/proContent'
import ActSecNav from '../layout/actSecNav'
import styles from './index.module.less'

const BasicComponents = ({ routes = [] }) => {
  return (
    <>
      <Layout className={styles.layout}>
        <ProHeader />
        <Layout className={styles.layout}>
          <ProSider>
            <ActSecNav />
          </ProSider>
          <ProContent routes={routes} />
        </Layout>
      </Layout>
    </>
  )
}

export default BasicComponents
