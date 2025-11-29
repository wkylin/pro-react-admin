import React from 'react'

import Controls from './Controls'
import Player from './Player'
import Seekbar from './Seekbar'
import Track from './Track'
import VolumeBar from './VolumeBar'
import Playlist from './Playlist'
import useMusicPlayer from './hooks/useMusicPlayer'
import songData from './data/songs'

const MusicPlayer = () => {
  const {
    currentIndex,
    isPlaying,
    isActive,
    duration,
    seekTime,
    appTime,
    volume,
    repeat,
    shuffle,
    currentSongs,
    activeSong,
    setRepeat,
    setShuffle,
    handlePlayPause,
    handleNextSong,
    handlePrevSong,
    handleSeek,
    handleVolumeChange,
    handleLoadedData,
    handleTimeUpdate,
    handleEnded,
    handleSongClick,
  } = useMusicPlayer(songData)

  return (
    <>
      <div className="animate-slideup absolute right-0 bottom-0 left-0 z-10 flex h-28 bg-linear-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg">
        <div className="relative flex w-full items-center justify-between px-8 sm:px-12">
          <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
          <div className="flex flex-1 flex-col items-center justify-center">
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
              min="0"
              max={duration}
              onInput={(event) => handleSeek(event.target.value)}
              setSeekTime={handleSeek}
              appTime={appTime}
            />
            <Player
              activeSong={activeSong}
              volume={volume}
              isPlaying={isPlaying}
              seekTime={seekTime}
              repeat={repeat}
              onEnded={handleEnded}
              onTimeUpdate={handleTimeUpdate}
              onLoadedData={handleLoadedData}
            />
          </div>
          <VolumeBar
            value={volume}
            min="0"
            max="1"
            onChange={(event) => handleVolumeChange(event.target.value)}
            setVolume={handleVolumeChange}
          />
        </div>
      </div>
      <Playlist
        songs={currentSongs}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        isActive={isActive}
        onSongClick={handleSongClick}
      />
    </>
  )
}

export default MusicPlayer
