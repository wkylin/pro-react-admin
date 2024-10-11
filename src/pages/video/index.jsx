import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'

import VideoJS from '@stateless/Video'

const MyVideo = () => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)

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
      <video ref={videoRef} controls muted controlsList="nodownload" style={{ width: 900 }}>
        <track kind="captions" />
        <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
      </video>
      <div style={{ width: 900 }}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </FixTabPanel>
  )
}

export default MyVideo
