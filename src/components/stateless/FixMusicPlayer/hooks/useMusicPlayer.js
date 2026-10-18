import { useState, useCallback } from 'react'

const useMusicPlayer = (initialSongs = []) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [appTime, setAppTime] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [currentSongs, setCurrentSongs] = useState(initialSongs)

  const activeSong = isActive ? currentSongs[currentIndex] || null : null

  const resetProgress = useCallback(() => {
    setDuration(0)
    setSeekTime(0)
    setAppTime(0)
  }, [])

  const handlePlayPause = useCallback(() => {
    if (currentSongs.length === 0) return
    setIsPlaying((prev) => !prev)
    if (!isActive) setIsActive(true)
  }, [isActive, currentSongs.length])

  const handleNextSong = useCallback(() => {
    if (currentSongs.length === 0) return
    if (shuffle) {
      setCurrentIndex((prev) =>
        currentSongs.length > 1
          ? (prev + 1 + Math.floor(Math.random() * (currentSongs.length - 1))) % currentSongs.length
          : prev
      )
    } else {
      setCurrentIndex((prev) => (prev + 1) % currentSongs.length)
    }
    resetProgress()
    setIsPlaying(true)
  }, [shuffle, currentSongs.length, resetProgress])

  const handlePrevSong = useCallback(() => {
    if (currentSongs.length === 0) return
    if (shuffle) {
      setCurrentIndex((prev) =>
        currentSongs.length > 1
          ? (prev + 1 + Math.floor(Math.random() * (currentSongs.length - 1))) % currentSongs.length
          : prev
      )
    } else {
      setCurrentIndex((prev) => (prev - 1 + currentSongs.length) % currentSongs.length)
    }
    resetProgress()
    setIsPlaying(true)
  }, [shuffle, currentSongs.length, resetProgress])

  const handleSeek = useCallback((time) => {
    setSeekTime(time)
  }, [])

  const handleVolumeChange = useCallback((vol) => {
    setVolume(vol)
  }, [])

  const handleLoadedData = useCallback((event) => {
    setDuration(event.target.duration)
  }, [])

  const handleTimeUpdate = useCallback((event) => {
    setAppTime(event.target.currentTime)
  }, [])

  const handleSongClick = useCallback(
    (index) => {
      if (isActive && index === currentIndex) {
        setIsPlaying((prev) => !prev)
        return
      }
      setCurrentIndex(index)
      resetProgress()
      setIsPlaying(true)
      setIsActive(true)
    },
    [currentIndex, isActive, resetProgress]
  )

  const handleClose = useCallback(() => {
    setIsPlaying(false)
    setIsActive(false)
    resetProgress()
  }, [resetProgress])

  const handleEnded = useCallback(() => {
    if (repeat) {
      // Repeat current song
      setSeekTime(0)
      setAppTime(0)
    } else {
      handleNextSong()
    }
  }, [repeat, handleNextSong])

  return {
    currentIndex,
    isPlaying,
    isActive,
    duration,
    seekTime,
    appTime,
    volume,
    repeat,
    shuffle,
    currentSongs,
    activeSong,
    setRepeat,
    setShuffle,
    setCurrentSongs,
    handlePlayPause,
    handleNextSong,
    handlePrevSong,
    handleSeek,
    handleVolumeChange,
    handleLoadedData,
    handleTimeUpdate,
    handleEnded,
    handleSongClick,
    handleClose,
  }
}

export default useMusicPlayer
