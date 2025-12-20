import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import styles from './index.module.css'

import SmartVideoPlayer from '@stateless/SmartVideoPlayer'

import videoSource from '@assets/video/trailer.mp4'

const MyVideo = () => {
  return (
    <FixTabPanel>
      <section className={styles.page}>
        <div className={styles.card}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <h2 className={styles.title}>视频播放</h2>
              <p className={styles.subTitle}>trailer.mp4</p>
            </div>
          </header>
          <SmartVideoPlayer src={videoSource} />
        </div>
      </section>
    </FixTabPanel>
  )
}

export default React.memo(MyVideo)
