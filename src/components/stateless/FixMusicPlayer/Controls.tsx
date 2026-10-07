import AnimatedIcon from '@stateless/AnimatedIcon'
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

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <AnimatedIcon variant="spin" mode="hover">
        <RotateCcw
          size={20}
          color={repeat ? activeColor : textColor}
          onClick={() => setRepeat((prev) => !prev)}
          className="hidden cursor-pointer sm:block"
        >
          <title>{repeat ? '取消循环播放' : '循环播放'}</title>
        </RotateCcw>
      </AnimatedIcon>
      {hasSongs && (
        <AnimatedIcon variant="spin" mode="hover">
          <SkipBack size={20} color={textColor} className="cursor-pointer" onClick={handlePrevSong}>
            <title>上一首</title>
          </SkipBack>
        </AnimatedIcon>
      )}
      {isPlaying ? (
        <AnimatedIcon variant="spin" mode="hover">
          <Pause size={20} color={textColor} onClick={handlePlayPause} className="cursor-pointer">
            <title>暂停</title>
          </Pause>
        </AnimatedIcon>
      ) : (
        <AnimatedIcon variant="spin" mode="hover">
          <Play size={20} color={textColor} onClick={handlePlayPause} className="cursor-pointer">
            <title>播放</title>
          </Play>
        </AnimatedIcon>
      )}
      {hasSongs && (
        <AnimatedIcon variant="spin" mode="hover">
          <SkipForward size={20} color={textColor} className="cursor-pointer" onClick={handleNextSong}>
            <title>下一首</title>
          </SkipForward>
        </AnimatedIcon>
      )}
      <AnimatedIcon variant="spin" mode="hover">
        <Shuffle
          size={20}
          color={shuffle ? activeColor : textColor}
          onClick={() => setShuffle((prev) => !prev)}
          className="hidden cursor-pointer sm:block"
        >
          <title>{shuffle ? '取消随机播放' : '随机播放'}</title>
        </Shuffle>
      </AnimatedIcon>
    </div>
  )
}

export default Controls
