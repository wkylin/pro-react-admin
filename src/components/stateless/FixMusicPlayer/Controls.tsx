import AnimatedIcon from '@wui/AnimatedIcon'
import type { Dispatch, SetStateAction } from 'react'
import { Pause, Play, SkipBack, SkipForward, Shuffle, RotateCcw } from 'lucide-react'

interface ControlsProps {
  isPlaying: boolean
  repeat: boolean
  setRepeat: Dispatch<SetStateAction<boolean>>
  shuffle: boolean
  setShuffle: Dispatch<SetStateAction<boolean>>
  currentSongs: readonly unknown[] | null | undefined
  handlePlayPause: () => void
  handlePrevSong: () => void
  handleNextSong: () => void
  textColor: string
  themeMode: string
}

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
  textColor,
  themeMode,
}: ControlsProps) => {
  const hasSongs = (currentSongs?.length ?? 0) > 0
  const activeColor = themeMode === 'dark' ? '#ff4d4f' : '#1890ff' // 使用主题相关的激活色

  const buttonClass =
    'h-8 w-8 items-center justify-center rounded-md hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-white/10'

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        className={`${buttonClass} hidden sm:inline-flex`}
        onClick={() => setRepeat((prev) => !prev)}
        aria-label={repeat ? '取消循环播放' : '循环播放'}
        aria-pressed={repeat}
        title={repeat ? '取消循环播放' : '循环播放'}
      >
        <AnimatedIcon variant="spin" mode="hover">
          <RotateCcw size={20} color={repeat ? activeColor : textColor} />
        </AnimatedIcon>
      </button>
      {hasSongs && (
        <button
          type="button"
          className={`${buttonClass} inline-flex`}
          onClick={handlePrevSong}
          aria-label="上一首"
          title="上一首"
        >
          <AnimatedIcon variant="spin" mode="hover">
            <SkipBack size={20} color={textColor} />
          </AnimatedIcon>
        </button>
      )}
      <button
        type="button"
        className={`${buttonClass} inline-flex`}
        onClick={handlePlayPause}
        aria-label={isPlaying ? '暂停' : '播放'}
        title={isPlaying ? '暂停' : '播放'}
      >
        <AnimatedIcon variant="spin" mode="hover">
          {isPlaying ? <Pause size={20} color={textColor} /> : <Play size={20} color={textColor} />}
        </AnimatedIcon>
      </button>
      {hasSongs && (
        <button
          type="button"
          className={`${buttonClass} inline-flex`}
          onClick={handleNextSong}
          aria-label="下一首"
          title="下一首"
        >
          <AnimatedIcon variant="spin" mode="hover">
            <SkipForward size={20} color={textColor} />
          </AnimatedIcon>
        </button>
      )}
      <button
        type="button"
        className={`${buttonClass} hidden sm:inline-flex`}
        onClick={() => setShuffle((prev) => !prev)}
        aria-label={shuffle ? '取消随机播放' : '随机播放'}
        aria-pressed={shuffle}
        title={shuffle ? '取消随机播放' : '随机播放'}
      >
        <AnimatedIcon variant="spin" mode="hover">
          <Shuffle size={20} color={shuffle ? activeColor : textColor} />
        </AnimatedIcon>
      </button>
    </div>
  )
}

export default Controls
