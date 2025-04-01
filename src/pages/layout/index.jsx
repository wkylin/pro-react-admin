import React, { useRef } from 'react'
import { Layout } from 'antd'
import { ProTabProvider } from '@hooks/proTabsContext'
import PointerMove from '@stateless/PointerMove'
import MagicTrail from '@stateless/MagicTrail'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'
import styles from './index.module.less'
import { constant } from 'lodash'

const ProLayout = () => {
  const layoutRef = useRef(null)
  return (
    <Layout className={styles.layout} ref={layoutRef}>
      {/* <PointerMove /> */}
      <MagicTrail
        containerRef={layoutRef}
        colors={['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#4ade80']}
        trailLength={35}
        particleCount={75}
        decay={0.03}
        smoothing={0.65}
      />
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
}

export default ProLayout
