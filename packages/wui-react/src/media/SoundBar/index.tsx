import { useEffect, useRef, useState, type CSSProperties, type MouseEventHandler } from 'react'
import { Button } from 'antd'
import styles from './index.module.less'

export interface SoundBarProps {
  src: string
  playLabel?: string
  pauseLabel?: string
  onPlaybackChange?: (playing: boolean) => void
  onError?: (error: unknown) => void
  iconColor?: string
  buttonStyle?: CSSProperties
  ghost?: boolean
}

type SoundBarStyle = CSSProperties & {
  '--line-color'?: string
  '--i'?: number
  '--state'?: 'running' | 'paused'
}

const SoundBar = ({
  src,
  playLabel = 'Play music',
  pauseLabel = 'Pause music',
  onPlaybackChange,
  onError,
  iconColor,
  buttonStyle,
  ghost = false,
}: SoundBarProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const generation = useRef(0)
  useEffect(() => {
    generation.current++
    const audio = audioRef.current
    if (audio) {
      audio.src = src
      audio.load()
    }
    setIsPlaying(false)
    return () => {
      generation.current++
      audio?.pause()
      audio?.removeAttribute('src')
      audio?.load()
    }
  }, [src])
  const togglePlay: MouseEventHandler<HTMLButtonElement> = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      const token = generation.current
      void audio.play().catch((error) => {
        if (token === generation.current) onError?.(error)
      })
    }
  }

  const iconNode = (
    <span
      className={styles.audio}
      style={iconColor ? ({ '--line-color': iconColor } satisfies SoundBarStyle) : undefined}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          style={
            {
              '--i': index,
              '--state': isPlaying ? 'running' : 'paused',
            } satisfies SoundBarStyle
          }
          className={styles.line}
        />
      ))}
    </span>
  )

  return (
    <>
      <Button
        type="default"
        size="small"
        shape="default"
        ghost={ghost}
        aria-label={isPlaying ? pauseLabel : playLabel}
        aria-pressed={isPlaying}
        onClick={togglePlay}
        icon={iconNode}
        style={{ fontSize: 16, ...(buttonStyle || {}) }}
      />
      <audio
        src={src}
        onPlay={() => {
          setIsPlaying(true)
          onPlaybackChange?.(true)
        }}
        onPause={() => {
          setIsPlaying(false)
          onPlaybackChange?.(false)
        }}
        ref={audioRef}
        preload="none"
        loop
      >
        <track kind="captions" default />
      </audio>
    </>
  )
}

export default SoundBar
