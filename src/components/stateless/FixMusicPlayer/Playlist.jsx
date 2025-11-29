import React from 'react'
import SongCard from './SongCard'

const Playlist = ({ songs, currentIndex, isPlaying, isActive, onSongClick }) => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {songs.map((song, index) => (
        <SongCard
          key={song.key || `song-${index}`}
          song={song}
          isPlaying={isPlaying && currentIndex === index}
          isActive={isActive && currentIndex === index}
          onClick={() => onSongClick(index)}
        />
      ))}
    </div>
  )
}

export default Playlist
