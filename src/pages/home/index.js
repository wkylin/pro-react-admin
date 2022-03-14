import React, { version } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'

const Home = () => {
  return (
    <FixTabPanel>
      <h2>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </h2>
      <h3>React version: {version}</h3>
    </FixTabPanel>
  )
}

export default Home
