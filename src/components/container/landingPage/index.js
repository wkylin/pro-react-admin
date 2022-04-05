import React from 'react'
import styles from './index.module.less'

import mediaVideo from '@assets/video/background.mp4'
const LandingPage = () => {
  return (
    <>
      <section className={styles.landing}>
        <h1>Landing Page</h1>
        <video autoPlay loop muted src={mediaVideo} />
        <section className={styles.overlay} />
      </section>
    </>
  )
}

export default LandingPage
