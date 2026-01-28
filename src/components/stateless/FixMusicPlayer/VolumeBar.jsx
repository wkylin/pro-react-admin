import AnimatedIcon from '@stateless/AnimatedIcon'
import React from 'react'
import { Volume1, Volume2, VolumeX } from 'lucide-react'

const VolumeBar = ({ value, min, max, onChange, setVolume, textColor, themeMode }) => {
  const volumeValue = parseFloat(value)
  const activeColor = themeMode === 'dark' ? '#ff4d4f' : '#1890ff'

  const getVolumeIcon = () => {
    if (volumeValue === 0)
      return (
        <AnimatedIcon variant="spin" mode="hover">
          <VolumeX
            size={25}
            color={textColor}
            onClick={() => setVolume(1)}
            className="cursor-pointer"
            title="点击恢复音量"
          />
        </AnimatedIcon>
      )
    if (volumeValue <= 0.5)
      return (
        <AnimatedIcon variant="spin" mode="hover">
          <Volume1
            size={25}
            color={textColor}
            onClick={() => setVolume(0)}
            className="cursor-pointer"
            title="点击静音"
          />
        </AnimatedIcon>
      )
    return (
      <AnimatedIcon variant="spin" mode="hover">
        <Volume2 size={25} color={textColor} onClick={() => setVolume(0)} className="cursor-pointer" title="点击静音" />
      </AnimatedIcon>
    )
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
        className="ml-2 h-1 w-16 sm:w-20 md:w-32 lg:w-32 2xl:w-40"
        style={{
          background: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${volumeValue * 100}%, #ccc ${volumeValue * 100}%, #ccc 100%)`,
        }}
        title={`音量: ${Math.round(volumeValue * 100)}%`}
      />
    </div>
  )
}

export default VolumeBar
