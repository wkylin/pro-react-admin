import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import MusicPlayer from '@container/musicPlayer/index'
import SongCard from '@container/musicPlayer/SongCard'
import songData from '@container/musicPlayer/songData/song'

const Music = () => {
  const audioRef = useRef(null)
  return (
    <FixTabPanel>
      <h3>Music Player</h3>
      {/* <audio ref={audioRef} controls controlsList="nodownload" style={{ width: '100%' }}>
        <track kind="captions" />
        <source src="http://music.163.com/song/media/outer/url?id=447925558.mp3" type="audio/mpeg" />
      </audio> */}
      <SongCard song={songData} />
      <MusicPlayer />
    </FixTabPanel>
  )
}

export default Music
