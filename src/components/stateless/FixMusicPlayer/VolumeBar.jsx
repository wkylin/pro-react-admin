import React from 'react'
import { Volume1, Volume2, VolumeX } from 'lucide-react'

const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
  const volumeValue = parseFloat(value)

  const getVolumeIcon = () => {
    if (volumeValue === 0) {
      return (
        <VolumeX size={25} color="#FFF" onClick={() => setVolume(1)} className="cursor-pointer" title="点击恢复音量" />
      )
    }
    if (volumeValue <= 0.5) {
      return <Volume1 size={25} color="#FFF" onClick={() => setVolume(0)} className="cursor-pointer" title="点击静音" />
    }
    return <Volume2 size={25} color="#FFF" onClick={() => setVolume(0)} className="cursor-pointer" title="点击静音" />
  }

  return (
    <div className="flex items-center justify-end">
      {getVolumeIcon()}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="ml-2 h-1 md:w-32 lg:w-32 2xl:w-40"
        title={`音量: ${Math.round(volumeValue * 100)}%`}
      />
    </div>
  )
}

export default VolumeBar
