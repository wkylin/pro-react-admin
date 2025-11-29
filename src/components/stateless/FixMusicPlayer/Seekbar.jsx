import React from 'react'
import { FastForward, Rewind } from 'lucide-react'

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime, textColor, themeMode }) => {
  const activeColor = themeMode === 'dark' ? '#ff4d4f' : '#1890ff'

  return (
    <div className="hidden flex-row items-center sm:flex">
      <Rewind
        size={16}
        color={textColor}
        onClick={() => setSeekTime(Math.max(0, appTime - 5))}
        className="hidden cursor-pointer lg:mr-1 lg:block"
        title="快退5秒"
      />
      <span className="mr-1 text-xs sm:text-sm" style={{ color: textColor }}>
        {formatTime(value)}
      </span>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="mx-2 h-1 w-20 sm:mx-4 sm:w-24 md:w-56 2xl:mx-6 2xl:w-96"
        style={{
          background: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${(value / max) * 100}%, #ccc ${(value / max) * 100}%, #ccc 100%)`,
        }}
        title={`进度: ${formatTime(value)} / ${formatTime(max)}`}
      />
      <span className="mb-0 text-xs sm:text-sm" style={{ color: textColor }}>
        {formatTime(max)}
      </span>
      <FastForward
        size={16}
        color={textColor}
        onClick={() => setSeekTime(Math.min(max, appTime + 5))}
        className="hidden cursor-pointer lg:ml-1 lg:block"
        title="快进5秒"
      />
    </div>
  )
}

export default Seekbar
