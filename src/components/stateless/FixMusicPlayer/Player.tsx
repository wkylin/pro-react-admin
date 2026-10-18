import { useRef, useEffect, type ReactEventHandler } from 'react'

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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && activeSong?.audioUrl) {
      audio.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Error playing audio:', error)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, activeSong?.audioUrl])

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
