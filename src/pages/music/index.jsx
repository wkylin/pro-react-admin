import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import MusicPlayer from '@stateless/FixMusicPlayer'

const Music = () => {
  const audioRef = useRef(null)
  return (
    <FixTabPanel>
      <MusicPlayer />
    </FixTabPanel>
  )
}

export default Music
