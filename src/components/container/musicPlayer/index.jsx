import React, { useState } from 'react'

import Controls from './Controls'
import Player from './Player'
import Seekbar from './Seekbar'
import Track from './Track'
import VolumeBar from './VolumeBar'
import songData from './songData/song'

const MusicPlayer = () => {
  const [activeSong] = useState(songData)
  const [currentSongs] = useState([songData])
  const [currentIndex] = useState(1)
  const [isActive] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [appTime, setAppTime] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)

  // useEffect(() => {
  //   if (currentSongs.length) setIsPlaying(true)
  // }, [currentIndex])

  const handlePlayPause = () => {
    if (!isActive) return
    setIsPlaying((prev) => !prev)
  }

  const handleNextSong = () => {
    setIsPlaying(false)
  }

  const handlePrevSong = () => {
    setIsPlaying(false)
  }

  return (
    <div className='animate-slideup absolute right-0 bottom-0 left-0 z-10 flex h-28 bg-linear-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg'>
      <div className='relative flex w-full items-center justify-between px-8 sm:px-12'>
        <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        <div className='flex flex-1 flex-col items-center justify-center'>
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          <Seekbar
            value={appTime}
            min='0'
            max={duration}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
          />
        </div>
        <VolumeBar
          value={volume}
          min='0'
          max='1'
          onChange={(event) => setVolume(event.target.value)}
          setVolume={setVolume}
        />
      </div>
    </div>
  )
}

export default MusicPlayer
