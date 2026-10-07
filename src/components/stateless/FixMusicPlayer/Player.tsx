import { useRef, useEffect, useState, type ReactEventHandler } from 'react'

type PlayerProps = {
  activeSong: { audioUrl?: string } | null
  isPlaying: boolean
  volume: number
  seekTime: number | undefined
  onEnded: ReactEventHandler<HTMLAudioElement>
  onTimeUpdate: ReactEventHandler<HTMLAudioElement>
  onLoadedData: ReactEventHandler<HTMLAudioElement>
  repeat: boolean
}

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && !isLoading) {
      audio.play().catch((error: unknown) => {
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
      // 延迟设置加载状态，避免在 effect 同步调用 setState
      const id = setTimeout(() => setIsLoading(true), 0)
      audio.load()

      const handleLoadedData = () => {
        setIsLoading(false)
      }

      audio.addEventListener('loadeddata', handleLoadedData)

      return () => {
        clearTimeout(id)
        audio.removeEventListener('loadeddata', handleLoadedData)
      }
    }

    return undefined
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
