import React, { version } from 'react'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'
import styles from './index.module.less'

const Home = () => {
  const redirectToNgrok = () => {
    window.open('https://ngrok.com/', '_blank')
  }
  return (
    <FixTabPanel>
      <h2 className={styles.typedText}>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </h2>
      <h3 className={styles.spotLight} data-spotlight={`React version: ${version}`}>
        React version: {version}
      </h3>
      <Button type="primary" onClick={redirectToNgrok}>
        Hi, Ngrok!
      </Button>
    </FixTabPanel>
  )
}

export default Home
