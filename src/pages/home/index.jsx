import React, { version } from 'react'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@src/components/stateless/TypedText'

const Home = () => {
  const redirectToNgrok = () => {
    window.open('https://ngrok.com/', '_blank')
  }
  return (
    <FixTabPanel>
      <h2>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </h2>
      <h2>React version: {version}</h2>
      <Button type="primary" onClick={redirectToNgrok}>
        Hi, Ngrok!
      </Button>
    </FixTabPanel>
  )
}

export default Home
