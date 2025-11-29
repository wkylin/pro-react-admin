import React from 'react'
import wkylinPng from '@assets/images/wkylin.png'

const Track = ({ isPlaying, isActive, activeSong, textColor, secondaryTextColor }) => {
  const coverArt = activeSong?.coverart ?? wkylinPng
  const title = activeSong?.title ?? 'No active Song'
  const subtitle = activeSong?.subtitle ?? 'No active Song'

  return (
    <div className="flex flex-1 items-center justify-start">
      <div
        className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} mr-2 hidden h-12 w-12 sm:mr-4 sm:block sm:h-16 sm:w-16`}
      >
        <img src={coverArt} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%] sm:w-[60%]">
        <p className="truncate text-sm font-bold sm:text-lg" style={{ color: textColor }}>
          {title}
        </p>
        <p className="truncate text-xs sm:text-sm" style={{ color: secondaryTextColor }}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default Track
