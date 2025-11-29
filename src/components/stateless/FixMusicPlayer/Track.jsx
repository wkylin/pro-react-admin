import React from 'react'
import wkylinPng from '@assets/images/wkylin.png'

const Track = ({ isPlaying, isActive, activeSong }) => {
  const coverArt = activeSong?.coverart ?? wkylinPng
  const title = activeSong?.title ?? 'No active Song'
  const subtitle = activeSong?.subtitle ?? 'No active Song'

  return (
    <div className="flex flex-1 items-center justify-start">
      <div
        className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} mr-4 hidden h-16 w-16 sm:block`}
      >
        <img src={coverArt} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-lg font-bold text-white">{title}</p>
        <p className="truncate text-gray-300">{subtitle}</p>
      </div>
    </div>
  )
}

export default Track
