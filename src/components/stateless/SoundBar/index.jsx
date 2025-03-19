import React, { useRef, useState } from 'react'
import styles from './index.module.less'
import music from '@assets/audio/heart-of-the-sea.mp3'
const SoundBar = () => {
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

  return (
    <>
      <span className={styles.audio} onClick={togglePlay}>
        {Array.from({ length: 5 }, () => ({ id: Math.random() })).map((item, index) => (
          <span
            key={item.id}
            style={{
              '--i': index,
              '--state': isPlaying ? 'running' : 'paused',
            }}
            className={styles.line}
          />
        ))}
      </span>
      <audio src={music} ref={audioRef} loop>
        <track kind="captions" default />
      </audio>
    </>
  )
}

export default SoundBar
