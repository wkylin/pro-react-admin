import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'

export interface MusicTrack {
  id: string | number
  title: string
  artist?: string
  cover?: string
  src: string
}
export interface MusicPlayerLabels {
  play: string
  pause: string
  previous: string
  next: string
  seek: string
  volume: string
  repeat: string
  shuffle: string
  playlist: string
  empty: string
}
export interface MusicPlayerProps {
  tracks: readonly MusicTrack[]
  initialTrack?: number
  labels?: Partial<MusicPlayerLabels>
  active?: boolean
  theme?: 'light' | 'dark'
  onTrackChange?: (track: MusicTrack, index: number) => void
  onPlaybackChange?: (playing: boolean) => void
  onError?: (error: unknown) => void
}
const defaults: MusicPlayerLabels = {
  play: 'Play',
  pause: 'Pause',
  previous: 'Previous track',
  next: 'Next track',
  seek: 'Playback position',
  volume: 'Volume',
  repeat: 'Repeat track',
  shuffle: 'Shuffle',
  playlist: 'Playlist',
  empty: 'No tracks',
}
export default function MusicPlayer({
  tracks,
  initialTrack = 0,
  labels,
  active = true,
  theme = 'light',
  onTrackChange,
  onPlaybackChange,
  onError,
}: MusicPlayerProps) {
  const text = { ...defaults, ...labels }
  const [index, setIndex] = useState(Math.max(0, Math.floor(initialTrack)))
  const selected = tracks.length ? Math.min(index, tracks.length - 1) : 0
  const track = tracks[selected]
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const callbacks = useRef({ onPlaybackChange, onError })
  callbacks.current = { onPlaybackChange, onError }
  const generation = useRef(0)
  const playIntent = useRef(false)
  const pausedByDeactivate = useRef(false)
  const requestPlay = () => {
    const element = audio.current
    if (!element) return
    const token = generation.current
    playIntent.current = true
    Promise.resolve(element.play()).catch((error) => {
      if (token === generation.current) {
        playIntent.current = false
        callbacks.current.onError?.(error)
      }
    })
  }
  useEffect(() => {
    const element = audio.current
    const token = ++generation.current
    setTime(0)
    setDuration(0)
    setPlaying(false)
    if (!element) return
    if (track?.src) element.src = track.src
    element.load()
    if (active && playIntent.current) requestPlay()
    return () => {
      if (generation.current === token) generation.current++
      element.pause()
      element.removeAttribute('src')
      element.load()
    }
  }, [track?.src])
  useEffect(() => {
    if (!active) {
      pausedByDeactivate.current = playIntent.current
      // Keep the user intent separate from the pause event caused by hiding a tab.
      audio.current?.pause()
    } else if (pausedByDeactivate.current) {
      pausedByDeactivate.current = false
      if (playIntent.current) requestPlay()
    }
  }, [active])
  const play = () => {
    const element = audio.current
    if (!element || !active) return
    if (!element.paused) {
      playIntent.current = false
      element.pause()
    } else requestPlay()
  }
  const select = (next: number, start = playIntent.current) => {
    if (!tracks.length) return
    const target = (next + tracks.length) % tracks.length
    playIntent.current = start && active
    if (target === selected && playIntent.current && audio.current) {
      audio.current.currentTime = 0
      requestPlay()
    }
    setIndex(target)
    onTrackChange?.(tracks[target], target)
  }
  const next = () => select(shuffle ? Math.floor(Math.random() * tracks.length) : selected + 1)
  const playback = (value: boolean) => {
    setPlaying(value)
    callbacks.current.onPlaybackChange?.(value)
  }
  return (
    <section className={styles.player} data-theme={theme}>
      {track ? (
        <>
          {track.cover && <img className={styles.cover} src={track.cover} alt={track.title} />}
          <h3>{track.title}</h3>
          <p>{track.artist}</p>
          <audio
            ref={audio}
            src={track.src}
            preload="metadata"
            loop={repeat}
            onPlay={() => playback(true)}
            onPause={() => playback(false)}
            onEnded={() => {
              playback(false)
              if (!repeat) next()
            }}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) =>
              setDuration(Number.isFinite(e.currentTarget.duration) ? e.currentTarget.duration : 0)
            }
            onError={(e) => callbacks.current.onError?.(e.currentTarget.error)}
          />
          <input
            aria-label={text.seek}
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={Math.min(time, duration)}
            onChange={(e) => {
              if (audio.current) audio.current.currentTime = Number(e.target.value)
              setTime(Number(e.target.value))
            }}
          />
          <div className={styles.controls}>
            <button type="button" onClick={() => select(selected - 1)}>
              {text.previous}
            </button>
            <button type="button" disabled={!active} onClick={play}>
              {playing ? text.pause : text.play}
            </button>
            <button type="button" onClick={next}>
              {text.next}
            </button>
            <button type="button" aria-pressed={repeat} onClick={() => setRepeat(!repeat)}>
              {text.repeat}
            </button>
            <button type="button" aria-pressed={shuffle} onClick={() => setShuffle(!shuffle)}>
              {text.shuffle}
            </button>
          </div>
          <input
            type="range"
            aria-label={text.volume}
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            onChange={(e) => {
              if (audio.current) audio.current.volume = Number(e.target.value)
            }}
          />
        </>
      ) : (
        <p>{text.empty}</p>
      )}
      <ol aria-label={text.playlist} className={styles.playlist}>
        {tracks.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              aria-current={i === selected ? 'true' : undefined}
              onClick={() => (i === selected ? play() : select(i, true))}
            >
              {item.title}
              {item.artist ? ` — ${item.artist}` : ''}
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
