import React from 'react'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import mediaVideo from '@assets/video/trailer.mp4'
import styles from './index.module.less'

const LandingPage = () => {
  const { redirectTo } = useSafeNavigate()
  return (
    <section className={styles.landing}>
      <video autoPlay loop muted src={mediaVideo} />
      <section className={styles.overlay} />
      <Button
        className={styles.rollback}
        icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
        type='text'
        size='large'
        onClick={() => redirectTo('/')}
      >
        Roll Back
      </Button>
    </section>
  )
}

export default LandingPage
