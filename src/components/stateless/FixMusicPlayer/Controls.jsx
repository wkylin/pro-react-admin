import React from 'react'
import { Pause, Play, SkipBack, SkipForward, Shuffle, RotateCcw } from 'lucide-react'

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
}) => {
  const hasSongs = currentSongs?.length > 0

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <RotateCcw
        size={20}
        color={repeat ? 'red' : 'white'}
        onClick={() => setRepeat((prev) => !prev)}
        className="hidden cursor-pointer sm:block"
        title={repeat ? '取消循环播放' : '循环播放'}
      />
      {hasSongs && (
        <SkipBack size={20} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} title="上一首" />
      )}
      {isPlaying ? (
        <Pause size={20} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" title="暂停" />
      ) : (
        <Play size={20} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" title="播放" />
      )}
      {hasSongs && (
        <SkipForward size={20} color="#FFF" className="cursor-pointer" onClick={handleNextSong} title="下一首" />
      )}
      <Shuffle
        size={20}
        color={shuffle ? 'red' : 'white'}
        onClick={() => setShuffle((prev) => !prev)}
        className="hidden cursor-pointer sm:block"
        title={shuffle ? '取消随机播放' : '随机播放'}
      />
    </div>
  )
}

export default Controls
