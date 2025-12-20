import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import useVideo from '@hooks/useVideo'
import styles from './index.module.css'

import videoSource from '@assets/video/trailer.mp4'

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Plus,
  Minus,
  Settings,
  PictureInPicture,
  X,
  Minimize2
} from 'lucide-react'

const IconButton = React.memo(function IconButton ({ Icon, label, onClick, disabled = false }) {
  return (
    <button className={styles.iconButton} type='button' onClick={onClick} aria-label={label} disabled={disabled}>
      <Icon size={18} />
      <span className={styles.tooltip} aria-hidden>
        {label}
      </span>
    </button>
  )
})

const SettingToggle = React.memo(function SettingToggle ({ checked, label, onChange }) {
  return (
    <label className={styles.settingItem}>
      <input
        className={styles.settingCheckbox}
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.settingLabel}>{label}</span>
    </label>
  )
})

const MyVideo = () => {
  const useVideoRef = useRef(null)
  const videoAnchorRef = useRef(null)
  const videoWrapRef = useRef(null)
  const settingsRef = useRef(null)
  const userPausedRef = useRef(false)
  const autoPausedRef = useRef(false)
  const inViewRef = useRef(true)
  const fullyOutRef = useRef(false)
  const miniDismissedRef = useRef(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [inView, setInView] = useState(true)
  const [fullyOut, setFullyOut] = useState(false)
  const [miniDismissed, setMiniDismissed] = useState(false)
  const [isPiP, setIsPiP] = useState(false)
  const [config, setConfig] = useState({
    lazyPlay: true,
    miniPlayer: true,
    autoPlay: true,
    autoMute: true
  })

  const systemDefaultVolumeRef = useRef(30)
  const lastUserVolumeRef = useRef(null)

  const isMini = config.miniPlayer && fullyOut && !isPiP && !miniDismissed
  const {
    isPaused,
    isMuted,
    currentVolume,
    currentTime,
    pause,
    increaseVolume,
    decreaseVolume,
    mute,
    unmute,
    toggleMute,
    forward,
    back,
    toggleFullscreen
  } = useVideo(useVideoRef)

  const [duration, setDuration] = useState(0)

  useEffect(() => {
    miniDismissedRef.current = miniDismissed
  }, [miniDismissed])

  useEffect(() => {
    // 回到视口（哪怕只露出一点）就允许再次弹出小窗
    if (!fullyOut) setMiniDismissed(false)
  }, [fullyOut])

  useEffect(() => {
    const videoEl = useVideoRef.current
    if (!videoEl) return

    // 初始化：如果用户没有手动设置过音量，则把“偏好默认音量”作为系统默认（30%）
    // 注意：不直接采纳浏览器默认 100%，避免默认静音时滑条显示 100% 的违和。

    const handleLoadedMeta = () => {
      const nextDuration = Number.isFinite(videoEl.duration) ? videoEl.duration : 0
      setDuration(nextDuration)
    }

    videoEl.addEventListener('loadedmetadata', handleLoadedMeta)
    videoEl.addEventListener('durationchange', handleLoadedMeta)

    // in case metadata is already available
    handleLoadedMeta()

    return () => {
      videoEl.removeEventListener('loadedmetadata', handleLoadedMeta)
      videoEl.removeEventListener('durationchange', handleLoadedMeta)
    }
  }, [])

  useEffect(() => {
    if (!settingsOpen) return

    const onPointerDown = (e) => {
      if (!settingsRef.current) return
      if (settingsRef.current.contains(e.target)) return
      setSettingsOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [settingsOpen])

  const safePlay = useCallback(() => {
    const videoEl = useVideoRef.current
    if (!videoEl) return

    // 某些情况下资源未就绪会导致 play() 无响应/拒绝，先触发一次 load 兜底
    if (videoEl.readyState === 0) {
      try {
        videoEl.load()
      } catch (_) {
        // ignore
      }
    }

    const playPromise = videoEl.play()
    Promise.resolve(playPromise).catch(() => {
      // Autoplay might be blocked; keep UI stable.
    })
  }, [])

  useEffect(() => {
    const videoEl = useVideoRef.current
    if (!videoEl) return
    if (!('requestPictureInPicture' in videoEl)) return

    const onEnter = () => setIsPiP(true)
    const onLeave = () => setIsPiP(false)

    videoEl.addEventListener('enterpictureinpicture', onEnter)
    videoEl.addEventListener('leavepictureinpicture', onLeave)

    return () => {
      videoEl.removeEventListener('enterpictureinpicture', onEnter)
      videoEl.removeEventListener('leavepictureinpicture', onLeave)
    }
  }, [])

  useEffect(() => {
    if (!config.lazyPlay && !config.miniPlayer) return
    if (!('IntersectionObserver' in window)) return

    const el = videoAnchorRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        const nextFullyOut = !entry.isIntersecting || entry.intersectionRatio <= 0
        if (nextFullyOut !== fullyOutRef.current) {
          fullyOutRef.current = nextFullyOut
          setFullyOut(nextFullyOut)
        }

        // Hysteresis to prevent flicker near threshold
        const ratio = entry.intersectionRatio
        const currentlyInView = inViewRef.current
        let nextInView = currentlyInView

        if (currentlyInView) {
          if (!entry.isIntersecting || ratio < 0.25) nextInView = false
        } else {
          if (entry.isIntersecting && ratio > 0.75) nextInView = true
        }

        if (nextInView !== currentlyInView) {
          inViewRef.current = nextInView
          setInView(nextInView)
        }

        const shouldMini = Boolean(config.miniPlayer && nextFullyOut && !isPiP && !miniDismissedRef.current)

        if (!nextInView) {
          // 滚出视口：如果开启小窗播放器则继续播放；否则按懒播放策略自动暂停
          if (shouldMini) return
          if (!config.lazyPlay) return

          if (!isPaused) {
            autoPausedRef.current = true
            pause()
          }
          return
        }

        if (userPausedRef.current) return

        if (autoPausedRef.current) {
          autoPausedRef.current = false
          safePlay()
          return
        }

        if (config.autoPlay && isPaused) {
          safePlay()
        }
      },
      {
        threshold: [0, 0.25, 0.75, 1]
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [config.autoPlay, config.lazyPlay, config.miniPlayer, isPaused, isPiP, pause, safePlay])

  useEffect(() => {
    // 配置：自动静音/取消静音
    if (config.autoMute) {
      mute()
    }
  }, [config.autoMute, mute])

  useEffect(() => {
    // 配置：自动播放（仅在视口内，且未被用户主动暂停时尝试）
    if (!config.autoPlay) return
    if (!inView) return
    if (userPausedRef.current) return
    if (!isPaused) return
    safePlay()
  }, [config.autoPlay, inView, isPaused, safePlay])

  const handleTogglePause = useCallback(() => {
    const videoEl = useVideoRef.current
    if (!videoEl) return

    // 用户主动暂停：滚动回视口不自动恢复
    userPausedRef.current = !videoEl.paused
    autoPausedRef.current = false

    if (videoEl.paused) {
      safePlay()
    } else {
      videoEl.pause()
    }
  }, [safePlay])

  const handleTogglePiP = useCallback(async () => {
    const videoEl = useVideoRef.current
    if (!videoEl) return
    if (!('requestPictureInPicture' in videoEl)) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await videoEl.requestPictureInPicture()
      }
    } catch (_) {
      // ignore
    }
  }, [])

  const handleCloseMini = useCallback(() => {
    setMiniDismissed(true)
    miniDismissedRef.current = true

    // 如果用户关闭小窗且开启懒播放：直接暂停以减少后台资源占用
    if (fullyOutRef.current && config.lazyPlay) {
      autoPausedRef.current = true
      pause()
    }
  }, [config.lazyPlay, pause])

  const handleRestoreMini = useCallback(() => {
    setMiniDismissed(false)
    miniDismissedRef.current = false
  }, [])

  const setConfigItem = useCallback(
    (key, value) => {
      // 当用户开启自动播放时，认为允许自动恢复
      if (key === 'autoPlay' && value === true) {
        userPausedRef.current = false
      }
      // 关闭自动静音：尝试取消静音
      if (key === 'autoMute' && value === false) {
        unmute()
      }
      setConfig((prev) => ({ ...prev, [key]: value }))
    },
    [unmute]
  )

  const volumePercent = useMemo(() => {
    const v = Number(currentVolume)
    if (!Number.isFinite(v)) return 100
    // useVideo 初始值可能是 0-1，后续会变成 0-100
    return v <= 1 ? Math.round(v * 100) : Math.round(v)
  }, [currentVolume])

  const isEffectivelyMuted = isMuted || volumePercent <= 0

  // UI 显示策略：静音时滑条显示 0（符合常见播放器习惯），但仍保留“记忆音量”用于恢复
  const displayVolumePercent = useMemo(() => {
    if (isEffectivelyMuted) return 0
    return volumePercent
  }, [isEffectivelyMuted, volumePercent])

  const getRestoreVolume = useCallback(() => {
    const userVol = Number(lastUserVolumeRef.current)
    if (Number.isFinite(userVol) && userVol > 0) return Math.max(5, Math.min(100, userVol))

    // 默认静音（如 autoMute 初始开启）时，首次取消静音默认恢复到 5%
    return 5
  }, [])

  const formatTime = (seconds) => {
    const s = Math.max(0, Math.floor(Number(seconds) || 0))
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    const mm = String(m).padStart(2, '0')
    const ss = String(sec).padStart(2, '0')
    return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss.padStart(2, '0')}`
  }

  const seekTo = useCallback(
    (nextTime) => {
      const videoEl = useVideoRef.current
      if (!videoEl) return
      const safe = Math.min(Math.max(0, nextTime), duration || 0)
      videoEl.currentTime = safe
    },
    [duration]
  )

  const setVolume = useCallback((nextVolumePercent) => {
    const videoEl = useVideoRef.current
    if (!videoEl) return
    const safe = Math.min(Math.max(0, nextVolumePercent), 100)
    videoEl.volume = safe / 100
  }, [])

  const handleVolumeChangeSmart = useCallback(
    (nextVolumePercent) => {
      const safe = Math.min(Math.max(0, Number(nextVolumePercent) || 0), 100)

      // 用户把音量拉到 0：等同静音
      if (safe <= 0) {
        mute()
        setVolume(0)
        return
      }

      // 用户主动调大音量：认为想要有声，避免 autoMute 再次把它静音
      if (config.autoMute) {
        setConfigItem('autoMute', false)
      }

      // 只要音量 > 0，就明确表达“要有声”：立刻取消静音（不依赖 config state 是否已刷新）
      unmute()

      // 记录用户手动音量（用于下次取消静音恢复）
      lastUserVolumeRef.current = safe

      setVolume(safe)
    },
    [config.autoMute, mute, setConfigItem, setVolume, unmute]
  )

  const handleToggleMuteSmart = useCallback(() => {
    if (isEffectivelyMuted) {
      // 用户主动取消静音：同时关闭“自动静音”，避免与用户意图冲突
      if (config.autoMute) {
        setConfigItem('autoMute', false)
      }

      // 关键：显式取消静音，避免只改音量导致 muted 状态与 UI 不一致
      unmute()

      setVolume(getRestoreVolume())
      return
    }

    // 静音：如果当前有声，记为用户偏好（便于下次恢复）
    if (volumePercent > 0) lastUserVolumeRef.current = Math.max(1, Math.min(100, volumePercent))
    mute()
  }, [config.autoMute, getRestoreVolume, isEffectivelyMuted, mute, setConfigItem, setVolume, unmute, volumePercent])

  const handleBumpVolume = useCallback(
    (delta) => {
      // 静音/音量为 0 时：
      // - 增加音量：认为用户想要有声，直接恢复到记忆音量或默认 5%
      // - 减少音量：维持 0
      if (isEffectivelyMuted) {
        if (delta > 0) {
          handleVolumeChangeSmart(getRestoreVolume())
        }
        return
      }

      const next = Math.min(100, Math.max(0, volumePercent + delta))
      handleVolumeChangeSmart(next)
    },
    [getRestoreVolume, handleVolumeChangeSmart, isEffectivelyMuted, volumePercent]
  )

  const canDecrease = displayVolumePercent > 0
  const canIncrease = displayVolumePercent < 100

  return (
    <FixTabPanel>
      <section className={styles.page}>
        <div className={styles.card}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <h2 className={styles.title}>视频播放</h2>
              <p className={styles.subTitle}>trailer.mp4</p>
            </div>
          </header>

          {!isMini && config.miniPlayer && fullyOut && !isPiP && miniDismissed
            ? (
              <div className={styles.miniRestore}>
                <IconButton Icon={Minimize2} label='恢复小窗' onClick={handleRestoreMini} />
              </div>
              )
            : null}

          <div ref={videoAnchorRef} className={styles.videoAnchor}>
            {isMini ? <div className={styles.miniPlaceholder} aria-hidden /> : null}

            <div ref={videoWrapRef} className={`${styles.videoWrap} ${isMini ? styles.mini : ''}`}>
              <video
                ref={useVideoRef}
                className={styles.video}
                controls={false}
                preload='metadata'
                controlsList='nodownload'
                playsInline
                onDoubleClick={toggleFullscreen}
              >
                <source src={videoSource} type='video/mp4' />
                <track kind='captions' srcLang='en' src={videoSource.replace(/\.mp4$/, '.vtt')} />
                Your browser does not support the video tag.
              </video>

              <div className={styles.videoControls} aria-label='视频控制条'>
                <div className={styles.controlsTop} role='group' aria-label='播放与工具'>
                  {!isMini ? <IconButton Icon={SkipBack} label='后退 10 秒' onClick={() => back(10)} /> : null}

                  <IconButton
                    Icon={isPaused ? Play : Pause}
                    label={isPaused ? '播放' : '暂停'}
                    onClick={handleTogglePause}
                  />

                  {!isMini ? <IconButton Icon={SkipForward} label='前进 10 秒' onClick={() => forward(10)} /> : null}

                  {isMini ? <IconButton Icon={X} label='关闭小窗' onClick={handleCloseMini} /> : null}

                  <div className={styles.spacer} />

                  <IconButton
                    Icon={isEffectivelyMuted ? VolumeX : Volume2}
                    label={isEffectivelyMuted ? '取消静音' : '静音'}
                    onClick={handleToggleMuteSmart}
                  />

                  {!isMini
                    ? (
                      <input
                        className={`${styles.range} ${styles.volumeRange}`}
                        type='range'
                        min={0}
                        max={100}
                        step={1}
                        value={displayVolumePercent}
                        onChange={(e) => handleVolumeChangeSmart(Number(e.target.value))}
                        aria-label='音量'
                      />
                      )
                    : null}

                  {!isMini
                    ? (
                      <IconButton
                        Icon={Minus}
                        label='音量 -5%'
                        onClick={() => handleBumpVolume(-5)}
                        disabled={!canDecrease}
                      />
                      )
                    : null}

                  {!isMini
                    ? (
                      <IconButton
                        Icon={Plus}
                        label='音量 +5%'
                        onClick={() => handleBumpVolume(5)}
                        disabled={!canIncrease}
                      />
                      )
                    : null}

                  {!isMini ? <div className={styles.sep} /> : null}

                  {!isMini
                    ? (
                      <div ref={settingsRef} className={styles.settingsWrap}>
                        <IconButton Icon={Settings} label='设置' onClick={() => setSettingsOpen((v) => !v)} />

                        {settingsOpen
                          ? (
                            <div className={styles.settingsPanel} role='group' aria-label='播放设置'>
                              <SettingToggle
                                checked={config.lazyPlay}
                                label='懒播放（滚出视口自动暂停）'
                                onChange={(v) => setConfigItem('lazyPlay', v)}
                              />
                              <SettingToggle
                                checked={config.miniPlayer}
                                label='小窗播放器（滚出视口右下角）'
                                onChange={(v) => setConfigItem('miniPlayer', v)}
                              />
                              <SettingToggle
                                checked={config.autoPlay}
                                label='自动播放'
                                onChange={(v) => setConfigItem('autoPlay', v)}
                              />
                              <SettingToggle
                                checked={config.autoMute}
                                label='自动静音（便于自动播放）'
                                onChange={(v) => setConfigItem('autoMute', v)}
                              />
                            </div>
                            )
                          : null}
                      </div>
                      )
                    : null}

                  {!isMini
                    ? (
                      <IconButton
                        Icon={PictureInPicture}
                        label={isPiP ? '退出画中画' : '画中画'}
                        onClick={handleTogglePiP}
                      />
                      )
                    : null}

                  {!isMini ? <IconButton Icon={Maximize2} label='全屏' onClick={toggleFullscreen} /> : null}
                </div>

                <div className={styles.controlsBottom} role='group' aria-label='进度'>
                  <span className={styles.time}>{formatTime(currentTime)}</span>
                  <input
                    className={`${styles.range} ${styles.progressRange}`}
                    type='range'
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={Math.min(Math.max(0, Number(currentTime) || 0), duration || 0)}
                    onChange={(e) => seekTo(Number(e.target.value))}
                    aria-label='播放进度'
                  />
                  <span className={styles.time}>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FixTabPanel>
  )
}

export default React.memo(MyVideo)
