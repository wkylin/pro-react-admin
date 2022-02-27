import React, { version } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
const Home = () => {
  return (
    <FixTabPanel>
      <h3>Cool! Hi, React && Ant Design</h3>
      <h4>React version: {version}</h4>
    </FixTabPanel>
  )
}

export default Home
