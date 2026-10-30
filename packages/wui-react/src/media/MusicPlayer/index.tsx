import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  Disc3,
  ListMusic,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
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
  mute: string
  unmute: string
  repeat: string
  shuffle: string
  playlist: string
  showPlaylist: string
  hidePlaylist: string
  nowPlaying: string
  trackCount: string
  empty: string
  error: string
}

export interface MusicPlayerProps {
  tracks: readonly MusicTrack[]
  initialTrack?: number
  /** Start playback when navigating even if currently paused. */
  playOnNavigate?: boolean
  labels?: Partial<MusicPlayerLabels>
  active?: boolean
  theme?: 'light' | 'dark'
  /** Visual direction. Console is intentionally dark; the other styles follow theme. */
  appearance?: 'editorial' | 'console' | 'minimal' | 'playlist'
  /** Increment to request playback from a playlist header outside the player. */
  playRequest?: number
  /** Full player and playlist, or a condensed player with a collapsed playlist. */
  variant?: 'studio' | 'compact'
  dismissible?: boolean
  closeLabel?: string
  onClose?: () => void
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
  mute: 'Mute',
  unmute: 'Unmute',
  repeat: 'Repeat track',
  shuffle: 'Shuffle',
  playlist: 'Playlist',
  showPlaylist: 'Show playlist',
  hidePlaylist: 'Hide playlist',
  nowPlaying: 'Now playing',
  trackCount: 'tracks',
  empty: 'No tracks',
  error: 'This track could not be played.',
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const minutes = Math.floor(total / 60)
  const hours = Math.floor(minutes / 60)
  const paddedSeconds = String(total % 60).padStart(2, '0')
  return hours ? `${hours}:${String(minutes % 60).padStart(2, '0')}:${paddedSeconds}` : `${minutes}:${paddedSeconds}`
}

export default function MusicPlayer({
  tracks,
  initialTrack = 0,
  playOnNavigate = false,
  labels,
  active = true,
  theme = 'light',
  appearance = 'editorial',
  playRequest = 0,
  variant = 'studio',
  dismissible = false,
  closeLabel = 'Close player',
  onClose,
  onTrackChange,
  onPlaybackChange,
  onError,
}: MusicPlayerProps) {
  const text = { ...defaults, ...labels }
  const [index, setIndex] = useState(Number.isFinite(initialTrack) ? Math.max(0, Math.floor(initialTrack)) : 0)
  const selected = tracks.length ? Math.min(index, tracks.length - 1) : 0
  const track = tracks[selected]
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const lastVolume = useRef(1)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [queueOpen, setQueueOpen] = useState(variant !== 'compact')
  const [closed, setClosed] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)
  const callbacks = useRef({ onPlaybackChange, onError })
  callbacks.current = { onPlaybackChange, onError }
  const generation = useRef(0)
  const playIntent = useRef(false)
  const pausedByDeactivate = useRef(false)
  const lastPlayRequest = useRef(0)

  useEffect(() => setQueueOpen(variant !== 'compact'), [variant])

  const requestPlay = () => {
    const element = audio.current
    if (!element) return
    const token = generation.current
    playIntent.current = true
    Promise.resolve(element.play()).catch((error) => {
      if (token === generation.current) {
        playIntent.current = false
        setPlaybackError(true)
        callbacks.current.onError?.(error)
      }
    })
  }

  useEffect(() => {
    if (playRequest <= lastPlayRequest.current) return
    lastPlayRequest.current = playRequest
    if (active) requestPlay()
  }, [playRequest, active])

  useEffect(() => {
    const element = audio.current
    const token = ++generation.current
    setTime(0)
    setDuration(0)
    setPlaying(false)
    setPlaybackError(false)
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

  const navigate = (direction: number) => {
    const target =
      shuffle && tracks.length > 1
        ? selected + 1 + Math.floor(Math.random() * (tracks.length - 1))
        : selected + direction
    select(target, playOnNavigate || playIntent.current)
  }

  const playback = (value: boolean) => {
    setPlaying(value)
    callbacks.current.onPlaybackChange?.(value)
  }

  const changeVolume = (value: number) => {
    const next = Math.min(1, Math.max(0, value))
    if (next > 0) lastVolume.current = next
    setVolume(next)
    if (audio.current) audio.current.volume = next
  }

  const close = () => {
    const element = audio.current
    if (element) {
      element.pause()
      element.removeAttribute('src')
      element.load()
    }
    playIntent.current = false
    setClosed(true)
    onClose?.()
  }

  if (closed) return null

  const seekProgress = duration > 0 ? (Math.min(time, duration) / duration) * 100 : 0
  const rangeStyle = { '--range-progress': `${seekProgress}%` } as CSSProperties
  const volumeStyle = { '--range-progress': `${volume * 100}%` } as CSSProperties

  return (
    <section
      className={styles.player}
      data-theme={theme}
      data-appearance={appearance}
      data-variant={variant}
      data-playing={playing}
      aria-label={text.nowPlaying}
    >
      <div className={styles.stage}>
        <div className={styles.topline}>
          <span className={styles.eyebrow}>
            <span className={styles.signal} aria-hidden="true" />
            {text.nowPlaying}
          </span>
          <div className={styles.topActions}>
            {track && (
              <span className={styles.position}>
                {String(selected + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
              </span>
            )}
            {dismissible && (
              <button
                className={styles.closeButton}
                type="button"
                aria-label={closeLabel}
                title={closeLabel}
                onClick={close}
              >
                <X size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {track ? (
          <div className={styles.hero}>
            <div className={styles.artwork}>
              {track.cover ? (
                <img src={track.cover} alt="" />
              ) : (
                <Disc3 className={styles.fallbackArt} aria-hidden="true" />
              )}
            </div>
            <div className={styles.main}>
              <div className={styles.metadata}>
                <h3 title={track.title}>{track.title}</h3>
                {track.artist && <p title={track.artist}>{track.artist}</p>}
              </div>
              <audio
                ref={audio}
                src={track.src}
                preload="metadata"
                loop={repeat}
                onPlay={() => {
                  setPlaybackError(false)
                  playback(true)
                }}
                onPause={() => playback(false)}
                onEnded={() => {
                  playback(false)
                  if (!repeat) navigate(1)
                }}
                onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
                onLoadedMetadata={(event) =>
                  setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)
                }
                onError={(event) => {
                  setPlaybackError(true)
                  callbacks.current.onError?.(event.currentTarget.error)
                }}
              />
              <div className={styles.seek}>
                <input
                  className={styles.range}
                  style={rangeStyle}
                  aria-label={text.seek}
                  aria-valuetext={formatTime(time)}
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={Math.min(time, duration)}
                  onChange={(event) => {
                    if (audio.current) audio.current.currentTime = Number(event.target.value)
                    setTime(Number(event.target.value))
                  }}
                />
                <div className={styles.times}>
                  <span>{formatTime(time)}</span>
                  <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
                </div>
              </div>
              <div className={styles.transport}>
                <button
                  className={styles.iconButton}
                  type="button"
                  aria-label={text.shuffle}
                  title={text.shuffle}
                  aria-pressed={shuffle}
                  onClick={() => setShuffle(!shuffle)}
                >
                  <Shuffle size={18} aria-hidden="true" />
                </button>
                <button
                  className={styles.iconButton}
                  type="button"
                  aria-label={text.previous}
                  title={text.previous}
                  onClick={() => navigate(-1)}
                >
                  <SkipBack size={21} fill="currentColor" aria-hidden="true" />
                </button>
                <button
                  className={styles.playButton}
                  type="button"
                  disabled={!active}
                  aria-label={playing ? text.pause : text.play}
                  title={playing ? text.pause : text.play}
                  onClick={play}
                >
                  {playing ? (
                    <Pause size={22} fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Play size={22} fill="currentColor" aria-hidden="true" />
                  )}
                </button>
                <button
                  className={styles.iconButton}
                  type="button"
                  aria-label={text.next}
                  title={text.next}
                  onClick={() => navigate(1)}
                >
                  <SkipForward size={21} fill="currentColor" aria-hidden="true" />
                </button>
                <button
                  className={styles.iconButton}
                  type="button"
                  aria-label={text.repeat}
                  title={text.repeat}
                  aria-pressed={repeat}
                  onClick={() => setRepeat(!repeat)}
                >
                  <Repeat2 size={19} aria-hidden="true" />
                </button>
              </div>
              <div className={styles.volumeRow}>
                <button
                  className={styles.volumeButton}
                  type="button"
                  aria-label={volume === 0 ? text.unmute : text.mute}
                  title={volume === 0 ? text.unmute : text.mute}
                  onClick={() => changeVolume(volume === 0 ? lastVolume.current : 0)}
                >
                  {volume === 0 ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
                </button>
                <input
                  className={styles.range}
                  style={volumeStyle}
                  aria-label={text.volume}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => changeVolume(Number(event.target.value))}
                />
                <span className={styles.volumeValue}>{Math.round(volume * 100)}%</span>
              </div>
              {playbackError && (
                <p className={styles.error} role="alert">
                  {text.error}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <Disc3 size={30} aria-hidden="true" />
            <p>{text.empty}</p>
          </div>
        )}
      </div>
      <section className={styles.queuePanel} aria-label={text.playlist}>
        <div className={styles.queueHeader}>
          <div className={styles.queueLabel}>
            <ListMusic size={17} aria-hidden="true" />
            <strong>{text.playlist}</strong>
            <span>
              {tracks.length} {text.trackCount}
            </span>
          </div>
          {track && (
            <button
              className={styles.queueToggle}
              type="button"
              aria-label={queueOpen ? text.hidePlaylist : text.showPlaylist}
              aria-expanded={queueOpen}
              onClick={() => setQueueOpen(!queueOpen)}
            >
              {queueOpen ? text.hidePlaylist : text.showPlaylist}
            </button>
          )}
        </div>
        {queueOpen && track && (
          <ol aria-label={text.playlist} className={styles.playlist}>
            {tracks.map((item, itemIndex) => (
              <li key={item.id}>
                <button
                  className={styles.trackButton}
                  type="button"
                  aria-label={item.title}
                  aria-current={itemIndex === selected ? 'true' : undefined}
                  onClick={() => (itemIndex === selected ? play() : select(itemIndex, true))}
                >
                  <span className={styles.trackNumber}>{String(itemIndex + 1).padStart(2, '0')}</span>
                  <span className={styles.trackArt}>
                    {item.cover ? (
                      <img src={item.cover} alt="" loading="lazy" />
                    ) : (
                      <Disc3 size={20} aria-hidden="true" />
                    )}
                  </span>
                  <span className={styles.trackDetails}>
                    <strong>{item.title}</strong>
                    {item.artist && <small>{item.artist}</small>}
                  </span>
                  <span className={styles.trackIndicator} aria-hidden="true">
                    {itemIndex === selected ? (
                      <span className={styles.activeBars} data-animating={playing}>
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : (
                      <Play size={13} fill="currentColor" />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>
    </section>
  )
}
