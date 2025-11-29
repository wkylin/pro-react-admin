import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import FixMusicPlayer from '@stateless/FixMusicPlayer'

const Music = () => {
  const audioRef = useRef(null)
  return (
    <FixTabPanel>
      <FixMusicPlayer />
    </FixTabPanel>
  )
}

export default Music
