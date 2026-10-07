import { useRef, useState, type CSSProperties, type MouseEventHandler } from 'react'
import { Button } from 'antd'
import styles from './index.module.less'
import music from '@assets/audio/heart-of-the-sea.mp3'

interface SoundBarProps {
  iconColor?: string
  buttonStyle?: CSSProperties
  ghost?: boolean
}

type SoundBarStyle = CSSProperties & {
  '--line-color'?: string
  '--i'?: number
  '--state'?: 'running' | 'paused'
}

const SoundBar = ({ iconColor, buttonStyle, ghost = false }: SoundBarProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const togglePlay: MouseEventHandler<HTMLButtonElement> = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
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
        aria-label={isPlaying ? '暂停播放' : '播放音乐'}
        aria-pressed={isPlaying}
        onClick={togglePlay}
        icon={iconNode}
        style={{ fontSize: 16, ...(buttonStyle || {}) }}
      />
      <audio src={music} ref={audioRef} loop>
        <track kind="captions" default />
      </audio>
    </>
  )
}

export default SoundBar
