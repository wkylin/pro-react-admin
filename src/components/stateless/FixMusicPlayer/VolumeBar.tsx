import AnimatedIcon from '@wui/AnimatedIcon'
import { type ChangeEventHandler } from 'react'
import { Volume1, Volume2, VolumeX } from 'lucide-react'

type VolumeBarProps = {
  value: number | string
  min: number | string
  max: number | string
  onChange: ChangeEventHandler<HTMLInputElement>
  setVolume: (volume: number | string) => void
  textColor: string
  themeMode: string
}

const VolumeBar = ({ value, min, max, onChange, setVolume, textColor, themeMode }: VolumeBarProps) => {
  const volumeValue = parseFloat(String(value))
  const activeColor = themeMode === 'dark' ? '#ff4d4f' : '#1890ff'

  const muted = volumeValue === 0

  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md hover:bg-black/10 focus-visible:outline-2 dark:hover:bg-white/10"
        onClick={() => setVolume(muted ? 1 : 0)}
        aria-label={muted ? '恢复音量' : '静音'}
        title={muted ? '恢复音量' : '静音'}
      >
        <AnimatedIcon variant="spin" mode="hover">
          {muted ? (
            <VolumeX size={25} color={textColor} />
          ) : volumeValue <= 0.5 ? (
            <Volume1 size={25} color={textColor} />
          ) : (
            <Volume2 size={25} color={textColor} />
          )}
        </AnimatedIcon>
      </button>
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
        aria-label="音量"
        title={`音量: ${Math.round(volumeValue * 100)}%`}
      />
    </div>
  )
}

export default VolumeBar
