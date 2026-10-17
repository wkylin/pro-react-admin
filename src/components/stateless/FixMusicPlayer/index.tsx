import React, { useRef } from 'react'
import { useActivate, useUnactivate } from '@platform/keep-alive'

import Controls from './Controls'
import Player from './Player'
import Seekbar from './Seekbar'
import Track from './Track'
import VolumeBar from './VolumeBar'
import Playlist from './Playlist'
import useMusicPlayer from './hooks/useMusicPlayer'
import songData from './data/songs'
import { useProThemeContext } from '@/theme/hooks'
import { X } from 'lucide-react'

const MusicPlayer = () => {
  const { themeSettings, resolvedTheme } = useProThemeContext()
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
    handleClose,
  } = useMusicPlayer(songData)

  // 自动处理 Tab 切换时的播放状态
  const pausedByDeactivate = useRef(false)

  useUnactivate(() => {
    if (isPlaying) {
      handlePlayPause()
      pausedByDeactivate.current = true
    }
  })

  useActivate(() => {
    if (pausedByDeactivate.current && isActive) {
      handlePlayPause()
    }
    pausedByDeactivate.current = false
  })

  const closePlayer = () => {
    pausedByDeactivate.current = false
    handleClose()
  }

  // 根据主题调整背景色和文本色
  const isDark = resolvedTheme === 'dark'
  const bgClass = isDark
    ? 'border-white/10 bg-[#181b23]/95 backdrop-blur-lg'
    : 'border-gray-200 bg-white/95 backdrop-blur-lg'
  const textColor = isDark ? '#ffffff' : '#000000d9'
  const secondaryTextColor = isDark ? '#ffffffa6' : '#00000073'
  const activeColor = themeSettings.colorPrimary || '#1677ff'

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Playlist
          songs={currentSongs}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          isActive={isActive}
          onSongClick={handleSongClick}
          themeMode={resolvedTheme}
          textColor={textColor}
          secondaryTextColor={secondaryTextColor}
          activeColor={activeColor}
        />
      </div>
      {isActive && (
        <div className={`animate-slideup z-10 flex min-h-20 shrink-0 border-t shadow-lg sm:min-h-28 ${bgClass}`}>
          <div className="relative flex w-full flex-wrap items-center gap-2 px-3 py-2 sm:flex-nowrap sm:px-8 md:px-12">
            <Track
              isPlaying={isPlaying}
              isActive={isActive}
              activeSong={activeSong}
              textColor={textColor}
              secondaryTextColor={secondaryTextColor}
            />
            <div className="order-3 flex w-full flex-col items-center justify-center sm:order-none sm:flex-1">
              <Controls
                isPlaying={isPlaying}
                repeat={repeat}
                setRepeat={setRepeat}
                shuffle={shuffle}
                setShuffle={setShuffle}
                currentSongs={currentSongs}
                handlePlayPause={handlePlayPause}
                handlePrevSong={handlePrevSong}
                handleNextSong={handleNextSong}
                textColor={textColor}
                themeMode={resolvedTheme}
              />
              <Seekbar
                value={appTime}
                min="0"
                max={duration}
                onInput={(event) => handleSeek(Number(event.currentTarget.value))}
                setSeekTime={handleSeek}
                appTime={appTime}
                textColor={textColor}
                themeMode={resolvedTheme}
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
            <div className="order-2 sm:order-none">
              <VolumeBar
                value={volume}
                min="0"
                max="1"
                onChange={(event) => handleVolumeChange(event.target.value)}
                setVolume={handleVolumeChange}
                textColor={textColor}
                themeMode={resolvedTheme}
              />
            </div>
            <button
              type="button"
              onClick={closePlayer}
              aria-label="关闭播放器"
              title="关闭播放器"
              className="order-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 sm:order-none dark:hover:bg-white/10"
              style={{ color: textColor }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicPlayer
