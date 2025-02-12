import React from 'react'
import { Pause, CirclePlay, SkipBack, SkipForward, Shuffle, RefreshCw } from 'lucide-react'

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
}) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <RefreshCw
      size={20}
      color={repeat ? 'red' : 'white'}
      onClick={() => setRepeat((prev) => !prev)}
      className="hidden sm:block cursor-pointer"
    />
    {currentSongs?.length > 0 && (
      <SkipBack size={20} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />
    )}
    {isPlaying ? (
      <Pause size={20} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <CirclePlay size={20} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {currentSongs?.length > 0 && (
      <SkipForward size={20} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />
    )}
    <Shuffle
      size={20}
      color={shuffle ? 'red' : 'white'}
      onClick={() => setShuffle((prev) => !prev)}
      className="hidden sm:block cursor-pointer"
    />
  </div>
)

export default Controls
