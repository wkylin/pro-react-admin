import React from 'react'
import { Play, Pause } from 'lucide-react'

const SongCard = ({ song, isPlaying, isActive, onClick }) => {
  const isCurrentSong = isActive && isPlaying

  return (
    <div
      className="bg-opacity-80 hover:bg-opacity-60 flex w-[250px] cursor-pointer flex-col rounded-lg bg-black p-4 transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
      title={`点击播放: ${song.title} - ${song.subtitle}`}
    >
      <div className="group relative h-56 w-full">
        <img
          alt="song_img"
          src={song.coverart}
          className="h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {isCurrentSong ? <Pause size={48} className="text-white" /> : <Play size={48} className="text-white" />}
        </div>
        {isCurrentSong && (
          <div className="absolute right-2 bottom-2 rounded-full bg-green-500 p-1">
            <div className="h-3 w-3 animate-pulse rounded-full bg-white" />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col">
        <p className="truncate text-lg font-semibold text-white">{song.title}</p>
        <p className="mt-1 truncate text-sm text-gray-300">{song.subtitle}</p>
      </div>
    </div>
  )
}

export default SongCard
