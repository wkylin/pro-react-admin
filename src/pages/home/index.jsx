import React, { version } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'
import UserIP from '@stateless/UserIP'
import MultiColorBorder from '@stateless/MultiColorBorder'

const Home = () => (
  <FixTabPanel>
    <h2>
      <TypedText>Cool! Hi, React & Ant Design!</TypedText>
    </h2>
    <h2>React version: {version}</h2>
    <UserIP />
    <section style={{ width: 200, height: 60 }}>
      <MultiColorBorder text="多色彩边框文案" />
    </section>
  </FixTabPanel>
)

export default Home
