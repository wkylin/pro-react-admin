import React, { version } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'

const Home = () => (
  <FixTabPanel>
    <h2>
      <TypedText>Cool! Hi, React & Ant Design!</TypedText>
    </h2>
    <h2>React version: {version}</h2>
  </FixTabPanel>
)

export default Home
