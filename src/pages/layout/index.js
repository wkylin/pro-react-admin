import React from 'react'
// import React, {Profiler} from 'react'
import { Layout } from 'antd'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'

import styles from './index.module.less'

const ProLayout = () => (
  // const onRenderCallback = (id,phase,actualDuration,baseDuration,startTime,commitTime,interactions) => {
  //   console.log('id',id)
  //   console.log('phase',phase)
  //   console.log('actualDuration',actualDuration)
  //   console.log('baseDuration',baseDuration)
  //   console.log('startTime',startTime)
  //   console.log('commitTime',commitTime)
  //   console.log('interactions',interactions)
  // }
  <Layout className={styles.layout}>
    <ProHeader />
    <Layout className={styles.layout}>
      <ProSider>
        <ProSecNav />
      </ProSider>
      {/* <Profiler id="ProContext" onRender={onRenderCallback}> */}
      <ProContent />
      {/* </Profiler> */}
    </Layout>
  </Layout>
)

export default ProLayout
