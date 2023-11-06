import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'

import VideoJS from '@stateless/Video'

const MyVideo = () => {
  const playerRef = React.useRef(null)

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: 'https://placehold.co/1920x1080.mp4',
        type: 'video/mp4',
      },
    ],
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player

    // You can handle player events here, for example:
    player.on('waiting', () => {})

    player.on('dispose', () => {})
  }

  return (
    <FixTabPanel>
      <div style={{ width: 900 }}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </FixTabPanel>
  )
}

export default MyVideo
