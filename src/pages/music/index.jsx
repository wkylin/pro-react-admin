import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import MusicPlayer from '@stateless/FixMusicPlayer'
import SongCard from '@stateless/FixMusicPlayer/SongCard'
import songData from '@stateless/FixMusicPlayer/songData/song'

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
