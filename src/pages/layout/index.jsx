import React, { Profiler } from 'react'
import { Layout } from 'antd'
import { ProTabProvider } from '@src/components/hooks/proTabsContext'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'

import styles from './index.module.less'

const ProLayout = () => {
  const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log('id', id)
    console.log('phase', phase)
    console.log('actualDuration', actualDuration)
    console.log('baseDuration', baseDuration)
    console.log('startTime', startTime)
    console.log('commitTime', commitTime)
    console.log('interactions', interactions)
  }
  return (
    <Layout className={styles.layout}>
      <ProTabProvider>
        <ProHeader />
        <Layout className={styles.layout}>
          <ProSider>
            <ProSecNav />
          </ProSider>
          <Profiler id="ProContext" onRender={onRenderCallback}>
            <ProContent />
          </Profiler>
        </Layout>
      </ProTabProvider>
    </Layout>
  )
}

export default ProLayout
