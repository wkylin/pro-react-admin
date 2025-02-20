import React from 'react'

const SongCard = ({ song }) => (
  <div className="bg-opacity-80 flex w-[250px] cursor-pointer flex-col rounded-lg bg-black p-4">
    <div className="group relative h-56 w-full">
      <img alt="song_img" src={song.images?.coverart} className="h-full w-full rounded-lg" />
    </div>

    <div className="mt-4 flex flex-col">
      <p className="truncate text-lg font-semibold text-white">{song.title}</p>
      <p className="mt-1 truncate text-sm text-gray-300">{song.subtitle}</p>
    </div>
  </div>
)

export default SongCard
