import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import MusicPlayer from '@container/musicPlayer/index'
import SongCard from '@container/musicPlayer/SongCard'
import songData from '@container/musicPlayer/songData/song'

const Music = () => (
  <FixTabPanel>
    <h3>Music Player</h3>
    <SongCard song={songData} />
    <MusicPlayer />
  </FixTabPanel>
)

export default Music
