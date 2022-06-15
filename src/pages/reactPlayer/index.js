import React from 'react'
import ReactPlayer from 'react-player'
import FixTabPanel from '@stateless/FixTabPanel'
// Render a YouTube video player
const ReactPlayerDemo = () => (
  <FixTabPanel>
    <ReactPlayer controls url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
  </FixTabPanel>
)

export default ReactPlayerDemo
