import React from 'react'
import { Play, Pause } from 'lucide-react'

const SongCard = ({ song, isPlaying, isActive, onClick, themeMode, textColor, secondaryTextColor, activeColor }) => {
  const isCurrentSong = isActive && isPlaying
  const isDark = themeMode === 'dark'
  const bgColor = isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'

  return (
    <div
      className="bg-opacity-80 hover:bg-opacity-60 flex w-full max-w-[250px] cursor-pointer flex-col rounded-lg p-3 transition-all duration-300 hover:shadow-lg sm:p-4"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
      title={`点击播放: ${song.title} - ${song.subtitle}`}
    >
      <div className="group relative h-48 w-full sm:h-56">
        <img
          alt="song_img"
          src={song.coverart}
          className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className="bg-opacity-30 absolute inset-0 flex items-center justify-center rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)' }}
        >
          {isCurrentSong ? (
            <Pause size={48} style={{ color: textColor }} />
          ) : (
            <Play size={48} style={{ color: textColor }} />
          )}
        </div>
        {isCurrentSong && (
          <div className="absolute right-2 bottom-2 rounded-full p-1" style={{ backgroundColor: activeColor }}>
            <div
              className="h-2 w-2 animate-pulse rounded-full sm:h-3 sm:w-3"
              style={{ backgroundColor: textColor }}
            ></div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col sm:mt-4">
        <p className="truncate text-sm font-semibold sm:text-lg" style={{ color: textColor }}>
          {song.title}
        </p>
        <p className="mt-1 truncate text-xs sm:text-sm" style={{ color: secondaryTextColor }}>
          {song.subtitle}
        </p>
      </div>
    </div>
  )
}

export default SongCard
