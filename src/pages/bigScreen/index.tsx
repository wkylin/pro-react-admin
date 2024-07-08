import React, { useEffect, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import { previewFitScale } from '@utils/previewScale'
import BigHeader from './bigHeader'

import styles from './index.module.less'
import ChinaMap from './chinaMap'

const BigScreen = () => {
  const scaleDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(1440, 900, scaleDom.current)
    calcRate()
    windowResize()
    return () => {
      unWindowResize()
    }
  }, [])
  return (
    <FixTabPanel style={{ background: '#04060D' }}>
      <section ref={scaleDom} className={styles.bigScreen} style={{ background: '#04060D' }}>
        <BigHeader />
        <section className="flex justify-between text-white">
          <div>左侧</div>
          <ChinaMap />
          <div>右侧</div>
        </section>
      </section>
    </FixTabPanel>
  )
}

export default BigScreen
