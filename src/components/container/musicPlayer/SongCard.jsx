import React from 'react'

const SongCard = ({ song }) => (
  <div className="flex flex-col w-[250px] p-4 bg-black bg-opacity-80 rounded-lg cursor-pointer">
    <div className="relative w-full h-56 group">
      <img alt="song_img" src={song.images?.coverart} className="w-full h-full rounded-lg" />
    </div>

    <div className="mt-4 flex flex-col">
      <p className="font-semibold text-lg text-white truncate">{song.title}</p>
      <p className="text-sm truncate text-gray-300 mt-1">{song.subtitle}</p>
    </div>
  </div>
)

export default SongCard
