import React, { useRef, useState } from 'react'
import { Button } from 'antd'
import styles from './index.module.less'
import music from '@assets/audio/heart-of-the-sea.mp3'

const SoundBar = ({ iconColor, buttonStyle, ghost = false }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const iconNode = (
    <span className={styles.audio} style={iconColor ? { '--line-color': iconColor } : undefined}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          style={{
            '--i': index,
            '--state': isPlaying ? 'running' : 'paused',
          }}
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
