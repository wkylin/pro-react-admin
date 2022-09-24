import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import mediaVideo from '@assets/video/wkylin.skyline.mp4'
import styles from './index.module.less'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className={styles.landing}>
        <video autoPlay loop muted src={mediaVideo} />
        <section className={styles.overlay} />
        <Button
          className={styles.rollback}
          icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
          type="text"
          size="large"
          onClick={() => navigate('/')}
        >
          Roll Back
        </Button>
      </section>
    </>
  )
}

export default LandingPage
