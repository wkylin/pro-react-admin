import AnimatedIcon from '@wui/AnimatedIcon'
import { type FormEventHandler } from 'react'
import { FastForward, Rewind } from 'lucide-react'

type SeekbarProps = {
  value: number
  min: number | string
  max: number
  onInput: FormEventHandler<HTMLInputElement>
  setSeekTime: (time: number) => void
  appTime: number
  textColor: string
  themeMode: string
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime, textColor, themeMode }: SeekbarProps) => {
  const activeColor = themeMode === 'dark' ? '#ff4d4f' : '#1890ff'
  const progress = max > 0 ? Math.min(100, (value / max) * 100) : 0

  return (
    <div className="hidden w-full max-w-xl items-center gap-2 px-3 sm:flex">
      <button
        type="button"
        className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-md hover:bg-black/10 focus-visible:outline-2 lg:inline-flex dark:hover:bg-white/10"
        onClick={() => setSeekTime(Math.max(0, appTime - 5))}
        disabled={max <= 0}
        aria-label="快退5秒"
        title="快退5秒"
      >
        <AnimatedIcon variant="spin" mode="hover">
          <Rewind size={16} color={textColor} />
        </AnimatedIcon>
      </button>
      <span className="w-10 shrink-0 text-right text-xs tabular-nums" style={{ color: textColor }}>
        {formatTime(value)}
      </span>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="h-1 min-w-0 flex-1"
        style={{
          background: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${progress}%, #ccc ${progress}%, #ccc 100%)`,
        }}
        aria-label="播放进度"
        title={`进度: ${formatTime(value)} / ${formatTime(max)}`}
      />
      <span className="w-10 shrink-0 text-xs tabular-nums" style={{ color: textColor }}>
        {formatTime(max)}
      </span>
      <button
        type="button"
        className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-md hover:bg-black/10 focus-visible:outline-2 lg:inline-flex dark:hover:bg-white/10"
        onClick={() => setSeekTime(Math.min(max, appTime + 5))}
        disabled={max <= 0}
        aria-label="快进5秒"
        title="快进5秒"
      >
        <AnimatedIcon variant="spin" mode="hover">
          <FastForward size={16} color={textColor} />
        </AnimatedIcon>
      </button>
    </div>
  )
}

export default Seekbar
