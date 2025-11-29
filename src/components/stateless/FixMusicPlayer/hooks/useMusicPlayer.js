import { useState, useCallback } from 'react'

const useMusicPlayer = (initialSongs = []) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isActive, setIsActive] = useState(initialSongs.length > 0)
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [appTime, setAppTime] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [currentSongs, setCurrentSongs] = useState(initialSongs)

  const activeSong = currentSongs[currentIndex] || null

  const handlePlayPause = useCallback(() => {
    if (!isActive && currentSongs.length === 0) return
    setIsPlaying((prev) => !prev)
    if (!isActive) setIsActive(true)
  }, [isActive, currentSongs.length])

  const handleNextSong = useCallback(() => {
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * currentSongs.length))
    } else {
      setCurrentIndex((prev) => (prev + 1) % currentSongs.length)
    }
    setIsPlaying(true)
  }, [shuffle, currentSongs.length])

  const handlePrevSong = useCallback(() => {
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * currentSongs.length))
    } else {
      setCurrentIndex((prev) => (prev - 1 + currentSongs.length) % currentSongs.length)
    }
    setIsPlaying(true)
  }, [shuffle, currentSongs.length])

  const handleSeek = useCallback((time) => {
    setSeekTime(time)
  }, [])

  const handleVolumeChange = useCallback((vol) => {
    setVolume(vol)
  }, [])

  const handleLoadedData = useCallback((event) => {
    setDuration(event.target.duration)
    setIsActive(true)
  }, [])

  const handleTimeUpdate = useCallback((event) => {
    setAppTime(event.target.currentTime)
  }, [])

  const handleSongClick = useCallback((index) => {
    setCurrentIndex(index)
    setIsPlaying(true)
    setIsActive(true)
  }, [])

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
  }
}

export default useMusicPlayer
