import React, { useRef, useEffect, useState } from 'react'

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const audioRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && !isLoading) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, isLoading])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (audio && seekTime !== undefined) {
      audio.currentTime = seekTime
    }
  }, [seekTime])

  useEffect(() => {
    const audio = audioRef.current
    if (audio && activeSong?.audioUrl) {
      setIsLoading(true)
      audio.load()

      const handleLoadedData = () => {
        setIsLoading(false)
      }

      audio.addEventListener('loadeddata', handleLoadedData)

      return () => {
        audio.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [activeSong?.audioUrl])

  return (
    <audio
      src={activeSong?.audioUrl}
      ref={audioRef}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
      preload="metadata"
    />
  )
}

export default Player
