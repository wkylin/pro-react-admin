import React from 'react'

import Controls from './Controls'
import Player from './Player'
import Seekbar from './Seekbar'
import Track from './Track'
import VolumeBar from './VolumeBar'
import Playlist from './Playlist'
import useMusicPlayer from './hooks/useMusicPlayer'
import songData from './data/songs'
import { useProThemeContext } from '@/theme/hooks'
import { theme } from 'antd'

const MusicPlayer = () => {
  const { themeSettings } = useProThemeContext()
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

  // 根据主题调整背景色和文本色
  const isDark = themeSettings.themeMode === 'dark'
  const bgClass = isDark
    ? 'bg-linear-to-br from-black/20 to-[#1a1a4a] backdrop-blur-lg'
    : 'bg-linear-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg'
  const textColor = isDark ? '#ffffff' : '#000000d9'
  const secondaryTextColor = isDark ? '#ffffffa6' : '#00000073'
  const activeColor = themeSettings.colorPrimary || '#1677ff'

  return (
    <>
      <div className={`animate-slideup absolute right-0 bottom-0 left-0 z-10 flex h-20 sm:h-28 ${bgClass}`}>
        <div className="relative flex w-full items-center justify-between px-4 sm:px-8 md:px-12">
          <Track
            isPlaying={isPlaying}
            isActive={isActive}
            activeSong={activeSong}
            textColor={textColor}
            secondaryTextColor={secondaryTextColor}
          />
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
              textColor={textColor}
              themeMode={themeSettings.themeMode}
            />
            <Seekbar
              value={appTime}
              min="0"
              max={duration}
              onInput={(event) => handleSeek(event.target.value)}
              setSeekTime={handleSeek}
              appTime={appTime}
              textColor={textColor}
              themeMode={themeSettings.themeMode}
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
            textColor={textColor}
            themeMode={themeSettings.themeMode}
          />
        </div>
      </div>
      <Playlist
        songs={currentSongs}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        isActive={isActive}
        onSongClick={handleSongClick}
        themeMode={themeSettings.themeMode}
        textColor={textColor}
        secondaryTextColor={secondaryTextColor}
        activeColor={activeColor}
      />
    </>
  )
}

export default MusicPlayer
