import React from 'react'
import SongCard from './SongCard'

const Playlist = ({
  songs,
  currentIndex,
  isPlaying,
  isActive,
  onSongClick,
  themeMode,
  textColor,
  secondaryTextColor,
  activeColor,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-2 sm:justify-start sm:gap-4 sm:p-4">
      {songs.map((song, index) => (
        <SongCard
          key={song.key || `song-${index}`}
          song={song}
          isPlaying={isPlaying && currentIndex === index}
          isActive={isActive && currentIndex === index}
          onClick={() => onSongClick(index)}
          themeMode={themeMode}
          textColor={textColor}
          secondaryTextColor={secondaryTextColor}
          activeColor={activeColor}
        />
      ))}
    </div>
  )
}

export default Playlist
