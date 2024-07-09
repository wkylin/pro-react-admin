import React, { useState, useEffect, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import EChartsCommon from '@stateless/EChartsCommon'
import { previewFitScale } from '@utils/previewScale'
import BigHeader from './bigHeader'

import styles from './index.module.less'
import ChinaMap from './chinaMap'
import { OfflinePortalOptions } from './offlinePortalOptions'

const BigScreen = () => {
  const scaleDom = useRef<HTMLDivElement>(null)

  const [feedbackData] = useState({
    data1: [80, 152, 101, 134, 90, 130],
    data2: [120, 182, 191, 210, 170, 110],
    data3: [110, 132, 201, 154, 150, 80],
    data4: [90, 142, 161, 114, 190, 170],
    xData: ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
    barData: [32.2, 60.0, 32.6, 36.4, 53.3, 35.0],
  })
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
          <div
            style={{
              width: '460px',
              height: '230px',
            }}
          >
            <EChartsCommon option={OfflinePortalOptions(feedbackData)} />
          </div>
          <ChinaMap />
          <div
            style={{
              width: '460px',
              height: '230px',
            }}
          >
            <EChartsCommon option={OfflinePortalOptions(feedbackData)} />
          </div>
        </section>
      </section>
    </FixTabPanel>
  )
}

export default BigScreen
