import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useVideo from '@hooks/useVideo'
import styles from './index.module.css'

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
  ExternalLink,
  X,
  Minimize2,
} from 'lucide-react'

const DEFAULT_INITIAL_CONFIG = {
  lazyPlay: true,
  miniPlayer: true,
  autoPlay: true,
  autoMute: true,
  playbackRate: 1,
  ytControls: true,
}

function isSameConfig(a, b) {
  if (a === b) return true
  if (!a || !b) return false
  return (
    a.lazyPlay === b.lazyPlay &&
    a.miniPlayer === b.miniPlayer &&
    a.autoPlay === b.autoPlay &&
    a.autoMute === b.autoMute &&
    Number(a.playbackRate) === Number(b.playbackRate) &&
    a.ytControls === b.ytControls
  )
}

const IconButton = React.memo(function IconButton({ Icon, label, onClick, disabled = false }) {
  return (
    <button className={styles.iconButton} type="button" onClick={onClick} aria-label={label} disabled={disabled}>
      <Icon size={15} />
      <span className={styles.tooltip} aria-hidden>
        {label}
      </span>
    </button>
  )
})

const SettingToggle = React.memo(function SettingToggle({ checked, label, onChange }) {
  return (
    <label className={styles.settingItem}>
      <input
        className={styles.settingCheckbox}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.settingLabel}>{label}</span>
    </label>
  )
})

function getScrollParent(node) {
  let current = node?.parentElement
  while (current && current !== document.body && current !== document.documentElement) {
    const style = window.getComputedStyle(current)
    const overflow = `${style.overflow}${style.overflowX}${style.overflowY}`
    const scrollable = /(auto|scroll|overlay)/.test(overflow)
    if (scrollable && (current.scrollHeight > current.clientHeight || current.scrollWidth > current.clientWidth)) {
      return current
    }
    current = current.parentElement
  }
  return null
}

const SmartVideoPlayer = React.forwardRef(function SmartVideoPlayer(
  {
    src,
    provider = 'html5',
    youtubeId,
    embedUrl,
    getEmbedUrl,
    externalUrl,
    sourceUrl,
    title,
    trackSrc,
    trackLang = 'en',
    config: controlledConfig,
    onConfigChange,
    initialConfig,
  },
  ref
) {
  const useVideoRef = useRef(null)
  const videoAnchorRef = useRef(null)
  const settingsRef = useRef(null)
  const settingsPanelRef = useRef(null)
  const userPausedRef = useRef(false)
  const autoPausedRef = useRef(false)
  const isPiPRef = useRef(false)
  const inViewRef = useRef(true)
  const fullyOutRef = useRef(false)
  const userPlayOverrideUntilRef = useRef(0)
  const miniDismissedRef = useRef(false)
  const autoPlayAttemptedRef = useRef(false)
  const configRef = useRef(null)

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [speedOpen, setSpeedOpen] = useState(false)

  const handleSettingsPanelPointerDownCapture = useCallback(
    (e) => {
      if (!speedOpen) return
      const target = e.target
      if (!(target instanceof Element)) return

      if (target.closest('[data-speed-dropdown="true"]')) return
      setSpeedOpen(false)
    },
    [speedOpen]
  )
  const [inView, setInView] = useState(true)
  const [fullyOut, setFullyOut] = useState(false)
  const [miniDismissed, setMiniDismissed] = useState(false)
  const [isPiP, setIsPiP] = useState(false)
  const mergedInitialConfig = useMemo(() => {
    return {
      ...DEFAULT_INITIAL_CONFIG,
      ...(initialConfig || {}),
    }
  }, [initialConfig])

  const [uncontrolledConfig, setUncontrolledConfig] = useState(mergedInitialConfig)
  const config = controlledConfig ?? uncontrolledConfig

  // Keep refs in sync immediately (before effects), so event handlers read the latest config.
  configRef.current = config
  const [playError, setPlayError] = useState('')

  const setConfigState = useCallback(
    (updater) => {
      if (controlledConfig != null) {
        if (typeof onConfigChange !== 'function') return
        const next = typeof updater === 'function' ? updater(controlledConfig) : updater
        onConfigChange(next)
        return
      }
      setUncontrolledConfig(updater)
    },
    [controlledConfig, onConfigChange]
  )

  const [observerRoot, setObserverRoot] = useState(null)

  const systemDefaultVolumeRef = useRef(30)
  const lastUserVolumeRef = useRef(null)

  const isYouTube = provider === 'youtube'
  const isEmbed = provider === 'embed' || isYouTube
  const isMini = !isEmbed && config.miniPlayer && fullyOut && !isPiP && !miniDismissed

  const { isPaused, isMuted, currentVolume, currentTime, pause, mute, unmute, forward, back, toggleFullscreen } =
    useVideo(useVideoRef, { enabled: !isEmbed })

  const setConfigItem = useCallback(
    (key, value) => {
      if (key === 'autoPlay' && value === true) {
        userPausedRef.current = false
      }
      if (key === 'autoMute' && value === false) {
        unmute()
      }
      setConfigState((prev) => ({ ...prev, [key]: value }))
    },
    [setConfigState, unmute]
  )

  const [duration, setDuration] = useState(0)

  const safePlay = useCallback((withFeedback = false) => {
    const videoEl = useVideoRef.current
    if (!videoEl) return

    // Autoplay: 大多数浏览器要求 muted 才允许自动播放；这里做同步兜底，避免 effect 时序导致首次 play 被拦
    if (configRef.current?.autoMute && !videoEl.muted) {
      videoEl.muted = true
    }

    if (videoEl.readyState === 0) {
      try {
        videoEl.load()
      } catch (_) {
        // ignore
      }
    }

    const playPromise = videoEl.play()
    Promise.resolve(playPromise)
      .then(() => {
        if (withFeedback) setPlayError('')
      })
      .catch((err) => {
        if (!withFeedback) return

        const name = typeof err?.name === 'string' ? err.name : 'PlayError'
        const message = typeof err?.message === 'string' ? err.message : ''

        // Common & harmless: play() interrupted by pause() (e.g. IO lazy-play or rapid user toggles)
        if (
          name === 'AbortError' ||
          /interrupted by a call to pause\(\)/i.test(message) ||
          /The play\(\) request was interrupted/i.test(message)
        ) {
          return
        }

        setPlayError(message ? `无法播放：${name} - ${message}` : `无法播放：${name}`)
      })
  }, [])

  const safePlayFromUserGesture = useCallback(
    (withFeedback = true) => {
      // Treat as explicit user intent: clear pause flags and briefly ignore IO-driven auto pause.
      userPausedRef.current = false
      autoPausedRef.current = false
      userPlayOverrideUntilRef.current = Date.now() + 1200

      // When using <source>, changing src doesn't automatically reload media.
      // Ensure the new source is actually loaded before play() within the click gesture.
      const videoEl = useVideoRef.current
      if (videoEl) {
        try {
          videoEl.load()
        } catch (_) {
          // ignore
        }
      }
      safePlay(withFeedback)
    },
    [safePlay]
  )

  useEffect(() => {
    if (isEmbed) return
    // <source src> updates require an explicit load() to take effect.
    const videoEl = useVideoRef.current
    if (!videoEl) return
    try {
      videoEl.load()
    } catch (_) {
      // ignore
    }
  }, [isEmbed, src, trackSrc, trackLang])

  useImperativeHandle(
    ref,
    () => ({
      play: (withFeedback = false) => safePlay(withFeedback),
      playFromUserGesture: (withFeedback = true) => safePlayFromUserGesture(withFeedback),
    }),
    [safePlay, safePlayFromUserGesture]
  )

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return

    const onPlaying = () => setPlayError('')
    const onError = () => {
      const code = videoEl.error?.code
      const msg =
        code === 1
          ? '视频加载被中止'
          : code === 2
            ? '网络错误导致视频加载失败'
            : code === 3
              ? '视频解码失败（格式/编码不兼容）'
              : code === 4
                ? '视频源不可用（404/跨域/类型不支持）'
                : '视频加载失败'
      setPlayError(msg)
    }

    videoEl.addEventListener('playing', onPlaying)
    videoEl.addEventListener('error', onError)
    return () => {
      videoEl.removeEventListener('playing', onPlaying)
      videoEl.removeEventListener('error', onError)
    }
  }, [isEmbed, src])

  useEffect(() => {
    configRef.current = config
  }, [config])

  useEffect(() => {
    // When uncontrolled, allow parent to update defaults by changing initialConfig.
    if (controlledConfig != null) return
    setUncontrolledConfig((prev) => {
      if (isSameConfig(prev, mergedInitialConfig)) return prev
      return mergedInitialConfig
    })
  }, [controlledConfig, mergedInitialConfig])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return

    const onPause = () => {
      // Ignore pauses we triggered for lazy-play
      if (autoPausedRef.current) return
      // Ignore natural end
      if (videoEl.ended) return
      // Treat any other pause (e.g. PiP native controls / media keys) as user intent
      userPausedRef.current = true
    }

    const onPlay = () => {
      // When playback resumes (including PiP native controls), clear both flags.
      userPausedRef.current = false
      autoPausedRef.current = false
    }

    videoEl.addEventListener('pause', onPause)
    videoEl.addEventListener('play', onPlay)
    return () => {
      videoEl.removeEventListener('pause', onPause)
      videoEl.removeEventListener('play', onPlay)
    }
  }, [isEmbed, src])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return
    const rate = Number(config.playbackRate)
    videoEl.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1
  }, [config.playbackRate])

  useEffect(() => {
    if (isEmbed) return
    autoPlayAttemptedRef.current = false
  }, [src])

  useEffect(() => {
    if (isEmbed) return
    // Video reload should restore default speed
    setConfigState((prev) => ({ ...prev, playbackRate: 1 }))
    const videoEl = useVideoRef.current
    if (videoEl) videoEl.playbackRate = 1
  }, [isEmbed, setConfigState, src])

  useEffect(() => {
    const el = videoAnchorRef.current
    if (!el) return
    if (!('getComputedStyle' in window)) return
    setObserverRoot(getScrollParent(el))
  }, [])

  useEffect(() => {
    miniDismissedRef.current = miniDismissed
  }, [miniDismissed])

  useEffect(() => {
    // 回到视口（哪怕只露出一点）就允许再次弹出小窗
    if (!fullyOut) setMiniDismissed(false)
  }, [fullyOut])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return

    const maybeAutoPlayOnReady = () => {
      const cfg = configRef.current
      if (!cfg?.autoPlay) return
      if (!inViewRef.current) return
      if (userPausedRef.current) return
      if (autoPlayAttemptedRef.current) return
      if (!videoEl.paused) return

      autoPlayAttemptedRef.current = true
      safePlay()
    }

    const handleLoadedMeta = () => {
      const nextDuration = Number.isFinite(videoEl.duration) ? videoEl.duration : 0
      setDuration(nextDuration)
      maybeAutoPlayOnReady()
    }

    videoEl.addEventListener('loadedmetadata', handleLoadedMeta)
    videoEl.addEventListener('durationchange', handleLoadedMeta)
    videoEl.addEventListener('canplay', maybeAutoPlayOnReady)
    handleLoadedMeta()

    return () => {
      videoEl.removeEventListener('loadedmetadata', handleLoadedMeta)
      videoEl.removeEventListener('durationchange', handleLoadedMeta)
      videoEl.removeEventListener('canplay', maybeAutoPlayOnReady)
    }
  }, [safePlay])

  const updateSettingsPanelPosition = useCallback(() => {
    const buttonWrapEl = settingsRef.current
    if (!buttonWrapEl) return

    const rect = buttonWrapEl.getBoundingClientRect()
    const panelEl = settingsPanelRef.current

    const panelWidth = panelEl?.offsetWidth || 240
    const margin = 8
    const gap = 10

    const naturalPanelHeight = panelEl ? Math.max(panelEl.scrollHeight || 0, panelEl.offsetHeight || 0) : 160
    const spaceBelow = Math.max(0, window.innerHeight - margin - (rect.bottom + gap))
    const spaceAbove = Math.max(0, rect.top - gap - margin)

    // Prefer below (like YouTube), but flip above if below can't fit and above is better.
    const placeBelow = spaceBelow >= naturalPanelHeight || spaceBelow >= spaceAbove
    const chosenSpace = placeBelow ? spaceBelow : spaceAbove

    if (panelEl) {
      panelEl.style.maxHeight = `${Math.max(120, Math.floor(chosenSpace))}px`
    }

    const left = Math.min(Math.max(margin, rect.right - panelWidth), window.innerWidth - panelWidth - margin)

    const renderedHeight = panelEl ? panelEl.offsetHeight || 0 : 0
    let top = placeBelow ? rect.bottom + gap : rect.top - gap - renderedHeight
    top = Math.min(Math.max(margin, top), window.innerHeight - renderedHeight - margin)

    if (panelEl) {
      const x = `${Math.round(left)}px`
      const y = `${Math.round(top)}px`
      panelEl.style.setProperty('--svp-settings-left', x)
      panelEl.style.setProperty('--svp-settings-top', y)
      panelEl.style.left = x
      panelEl.style.top = y
    }
  }, [])

  useEffect(() => {
    if (!settingsOpen) return

    const onPointerDown = (e) => {
      const buttonWrapEl = settingsRef.current
      const panelEl = settingsPanelRef.current
      const target = e.target

      if (buttonWrapEl && buttonWrapEl.contains(target)) return
      if (panelEl && panelEl.contains(target)) return
      setSettingsOpen(false)
    }

    const raf = requestAnimationFrame(updateSettingsPanelPosition)

    window.addEventListener('resize', updateSettingsPanelPosition)
    window.addEventListener('scroll', updateSettingsPanelPosition, true)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateSettingsPanelPosition)
      window.removeEventListener('scroll', updateSettingsPanelPosition, true)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [settingsOpen, updateSettingsPanelPosition])

  useEffect(() => {
    if (settingsOpen) return
    setSpeedOpen(false)
  }, [settingsOpen])

  useEffect(() => {
    if (!settingsOpen) return
    const raf = requestAnimationFrame(updateSettingsPanelPosition)
    return () => cancelAnimationFrame(raf)
  }, [settingsOpen, config, updateSettingsPanelPosition])

  useEffect(() => {
    const videoEl = useVideoRef.current
    if (!videoEl) return
    if (!('requestPictureInPicture' in videoEl)) return

    const onEnter = () => {
      isPiPRef.current = true
      setIsPiP(true)
    }
    const onLeave = () => {
      isPiPRef.current = false
      setIsPiP(false)
    }

    videoEl.addEventListener('enterpictureinpicture', onEnter)
    videoEl.addEventListener('leavepictureinpicture', onLeave)

    return () => {
      videoEl.removeEventListener('enterpictureinpicture', onEnter)
      videoEl.removeEventListener('leavepictureinpicture', onLeave)
    }
  }, [])

  useEffect(() => {
    if (isEmbed) return
    if (!config.lazyPlay && !config.miniPlayer) return
    if (!('IntersectionObserver' in window)) return

    const el = videoAnchorRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        // Fallback: some layouts/scroll roots can cause IO to report non-intersection incorrectly.
        // If the element is actually visible by rect overlap, treat it as in-view.
        let isIntersecting = entry.isIntersecting
        let intersectionRatio = entry.intersectionRatio
        if (!isIntersecting || intersectionRatio <= 0) {
          const rect = el.getBoundingClientRect()
          const rootRect = observerRoot ? observerRoot.getBoundingClientRect() : null
          const viewLeft = rootRect ? rootRect.left : 0
          const viewTop = rootRect ? rootRect.top : 0
          const viewRight = rootRect ? rootRect.right : window.innerWidth
          const viewBottom = rootRect ? rootRect.bottom : window.innerHeight
          const overlaps =
            rect.right > viewLeft && rect.left < viewRight && rect.bottom > viewTop && rect.top < viewBottom
          if (overlaps) {
            isIntersecting = true
            intersectionRatio = 1
          }
        }

        const nextFullyOut = !isIntersecting || intersectionRatio <= 0
        if (nextFullyOut !== fullyOutRef.current) {
          fullyOutRef.current = nextFullyOut
          setFullyOut(nextFullyOut)
        }

        // Hysteresis to prevent flicker near threshold
        const ratio = intersectionRatio
        const currentlyInView = inViewRef.current
        let nextInView = currentlyInView

        if (currentlyInView) {
          if (!isIntersecting || ratio < 0.25) nextInView = false
        } else {
          if (isIntersecting && ratio > 0.75) nextInView = true
        }

        if (nextInView !== currentlyInView) {
          inViewRef.current = nextInView
          setInView(nextInView)
        }

        // In PiP, user expects playback to be independent from viewport visibility.
        // Avoid IO-driven pause/play fighting with PiP native controls.
        if (isPiPRef.current) return

        const shouldMini = Boolean(config.miniPlayer && nextFullyOut && !isPiP && !miniDismissedRef.current)

        if (!nextInView) {
          if (shouldMini) return
          if (!config.lazyPlay) return

          // If user explicitly started playback (e.g. via playlist click), don't instantly pause due to IO hysteresis.
          if (Date.now() < userPlayOverrideUntilRef.current) return

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
        threshold: [0, 0.25, 0.75, 1],
        root: observerRoot,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isEmbed, config.autoPlay, config.lazyPlay, config.miniPlayer, observerRoot, isPaused, isPiP, pause, safePlay])

  useEffect(() => {
    if (isEmbed) return
    if (config.autoMute) {
      mute()
    }
  }, [isEmbed, config.autoMute, mute])

  useEffect(() => {
    if (isEmbed) return
    if (!config.autoPlay) return
    // Keep current playback state when entering PiP; avoid any autoPlay race.
    if (isPiPRef.current) return
    if (!inView) return
    if (userPausedRef.current) return
    if (!isPaused) return
    const videoEl = useVideoRef.current
    if (videoEl?.ended) return
    safePlay()
  }, [isEmbed, config.autoPlay, inView, isPaused, isPiP, safePlay])

  const handleTogglePause = useCallback(() => {
    const videoEl = useVideoRef.current
    if (!videoEl) return

    autoPausedRef.current = false

    if (videoEl.paused) {
      userPausedRef.current = false
      safePlay(true)
      return
    }

    userPausedRef.current = true
    videoEl.pause()
  }, [safePlay])

  const computedEmbedSrc = useMemo(() => {
    if (!isEmbed) return ''

    if (typeof getEmbedUrl === 'function') {
      const next = getEmbedUrl(config)
      return typeof next === 'string' ? next : ''
    }

    if (provider === 'embed') {
      return typeof embedUrl === 'string' ? embedUrl : ''
    }

    // provider === 'youtube'
    if (!youtubeId) return ''
    const params = new URLSearchParams({
      autoplay: config.autoPlay ? '1' : '0',
      mute: config.autoMute ? '1' : '0',
      controls: config.ytControls ? '1' : '0',
      playsinline: '1',
      rel: '0',
    })
    return `https://www.youtube.com/embed/${encodeURIComponent(youtubeId)}?${params.toString()}`
  }, [isEmbed, getEmbedUrl, config, provider, embedUrl, youtubeId])

  const externalOpenUrl = useMemo(() => {
    if (!isEmbed) return ''

    const explicit =
      typeof externalUrl === 'string' && externalUrl ? externalUrl : typeof sourceUrl === 'string' ? sourceUrl : ''
    if (explicit) return explicit

    if (provider === 'youtube') {
      return youtubeId ? `https://www.youtube.com/watch?v=${encodeURIComponent(youtubeId)}` : ''
    }
    // Generic embed: best-effort open the embed url itself.
    return computedEmbedSrc || ''
  }, [isEmbed, externalUrl, sourceUrl, provider, youtubeId, computedEmbedSrc])

  const handleOpenExternal = useCallback(() => {
    if (!externalOpenUrl) return
    try {
      window.open(externalOpenUrl, '_blank', 'noopener,noreferrer')
    } catch (_) {
      // ignore
    }
  }, [externalOpenUrl])

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

    if (fullyOutRef.current && config.lazyPlay) {
      autoPausedRef.current = true
      pause()
    }
  }, [config.lazyPlay, pause])

  const handleRestoreMini = useCallback(() => {
    setMiniDismissed(false)
    miniDismissedRef.current = false
  }, [])

  const volumePercent = useMemo(() => {
    const v = Number(currentVolume)
    if (!Number.isFinite(v)) return 100
    return v <= 1 ? Math.round(v * 100) : Math.round(v)
  }, [currentVolume])

  const isEffectivelyMuted = isMuted || volumePercent <= 0

  const displayVolumePercent = useMemo(() => {
    if (isEffectivelyMuted) return 0
    return volumePercent
  }, [isEffectivelyMuted, volumePercent])

  const getRestoreVolume = useCallback(() => {
    const userVol = Number(lastUserVolumeRef.current)
    if (Number.isFinite(userVol) && userVol > 0) return Math.max(5, Math.min(100, userVol))
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

      if (safe <= 0) {
        mute()
        setVolume(0)
        return
      }

      if (config.autoMute) {
        setConfigItem('autoMute', false)
      }

      unmute()

      lastUserVolumeRef.current = safe
      setVolume(safe)
    },
    [config.autoMute, mute, setConfigItem, setVolume, unmute]
  )

  const handleToggleMuteSmart = useCallback(() => {
    if (isEffectivelyMuted) {
      if (config.autoMute) {
        setConfigItem('autoMute', false)
      }

      unmute()
      setVolume(getRestoreVolume())
      return
    }

    if (volumePercent > 0) lastUserVolumeRef.current = Math.max(1, Math.min(100, volumePercent))
    mute()
  }, [config.autoMute, getRestoreVolume, isEffectivelyMuted, mute, setConfigItem, setVolume, unmute, volumePercent])

  const handleBumpVolume = useCallback(
    (delta) => {
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

  const computedTrackSrc = trackSrc || (typeof src === 'string' ? src.replace(/\.mp4$/, '.vtt') : undefined)

  const settingsPortal =
    !isMini && settingsOpen
      ? createPortal(
          <div
            ref={settingsPanelRef}
            className={`${styles.settingsPanel} ${styles.settingsPanelPortal}`}
            role="group"
            aria-label="播放设置"
            onPointerDownCapture={handleSettingsPanelPointerDownCapture}
          >
            {!isEmbed ? (
              <div className={`${styles.settingItem} ${styles.settingItemSplit}`} aria-label="播放速度">
                <span className={styles.settingLabel}>播放速度</span>
                <div className={styles.speedDropdown} data-speed-dropdown="true">
                  <button
                    type="button"
                    className={styles.speedTrigger}
                    aria-haspopup="listbox"
                    aria-expanded={speedOpen}
                    onClick={() => setSpeedOpen((v) => !v)}
                  >
                    {`${Number(config.playbackRate ?? 1)}x`}
                  </button>

                  {speedOpen ? (
                    <div className={styles.speedMenu} role="listbox" aria-label="播放速度选项">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => {
                        const active = Number(config.playbackRate ?? 1) === rate
                        return (
                          <button
                            key={rate}
                            type="button"
                            className={`${styles.speedItem} ${active ? styles.speedItemActive : ''}`}
                            role="option"
                            aria-selected={active}
                            onClick={() => {
                              setConfigItem('playbackRate', rate)
                              setSpeedOpen(false)
                            }}
                          >
                            {rate === 1 ? '1x（默认）' : `${rate}x`}
                          </button>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className={styles.settingsScroll} aria-label="其它设置">
              {!isEmbed ? (
                <>
                  <SettingToggle
                    checked={config.lazyPlay}
                    label="懒播放（滚出视口自动暂停）"
                    onChange={(v) => setConfigItem('lazyPlay', v)}
                  />
                  <SettingToggle
                    checked={config.miniPlayer}
                    label="小窗播放器（滚出视口右下角）"
                    onChange={(v) => setConfigItem('miniPlayer', v)}
                  />
                </>
              ) : isYouTube ? (
                <SettingToggle
                  checked={Boolean(config.ytControls)}
                  label="YouTube 控制条"
                  onChange={(v) => setConfigItem('ytControls', v)}
                />
              ) : null}
              <SettingToggle
                checked={config.autoPlay}
                label="自动播放"
                onChange={(v) => setConfigItem('autoPlay', v)}
              />
              <SettingToggle
                checked={config.autoMute}
                label="自动静音（便于自动播放）"
                onChange={(v) => setConfigItem('autoMute', v)}
              />
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <>
      {!isMini && config.miniPlayer && fullyOut && !isPiP && miniDismissed ? (
        <div className={styles.miniRestore}>
          <IconButton Icon={Minimize2} label="恢复小窗" onClick={handleRestoreMini} />
        </div>
      ) : null}

      <div ref={videoAnchorRef} className={styles.videoAnchor}>
        {isMini ? <div className={styles.miniPlaceholder} aria-hidden /> : null}

        <div
          className={`${styles.videoWrap} ${isMini ? styles.mini : ''} ${settingsOpen ? styles.controlsPinnedWrap : ''}`}
        >
          {isEmbed ? (
            computedEmbedSrc ? (
              <div className={styles.embedRatio}>
                <iframe
                  key={computedEmbedSrc}
                  className={styles.embedFrame}
                  src={computedEmbedSrc}
                  title={title || 'Embed'}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className={styles.embedFallback}>
                <div className={styles.embedFallbackTitle}>{title || '嵌入地址未配置'}</div>
                <div className={styles.embedFallbackMeta}>
                  请传入 embedUrl 或 getEmbedUrl(config) 来生成 iframe 地址。
                </div>
              </div>
            )
          ) : (
            <video
              ref={useVideoRef}
              className={styles.video}
              muted={config.autoMute}
              controls={false}
              preload="metadata"
              controlsList="nodownload"
              playsInline
              onClick={handleTogglePause}
              onDoubleClick={toggleFullscreen}
            >
              <source src={src} type="video/mp4" />
              {computedTrackSrc ? <track kind="captions" srcLang={trackLang} src={computedTrackSrc} /> : null}
              Your browser does not support the video tag.
            </video>
          )}

          {!isEmbed ? (
            <div className={`${styles.centerToggle} ${isPaused ? styles.centerToggleVisible : ''}`} aria-hidden={false}>
              <button
                type="button"
                className={styles.centerToggleButton}
                aria-label={isPaused ? '播放' : '暂停'}
                onClick={(e) => {
                  e.stopPropagation()
                  handleTogglePause()
                }}
              >
                {isPaused ? <Play size={34} /> : <Pause size={34} />}
              </button>
            </div>
          ) : null}

          {isEmbed ? (
            <div className={styles.embedToolbar} aria-label="嵌入工具条">
              {externalOpenUrl ? (
                <IconButton Icon={ExternalLink} label="新窗口打开" onClick={handleOpenExternal} />
              ) : null}

              <div ref={settingsRef} className={styles.settingsWrap}>
                <IconButton Icon={Settings} label="设置" onClick={() => setSettingsOpen((v) => !v)} />
              </div>
            </div>
          ) : null}

          {!isEmbed ? (
            <div className={styles.videoControls} aria-label="视频控制条">
              <div className={styles.controlsTop} role="group" aria-label="播放与工具">
                {!isEmbed && !isMini ? (
                  <IconButton Icon={SkipBack} label="后退 10 秒" onClick={() => back(10)} />
                ) : null}

                {!isEmbed ? (
                  <IconButton
                    Icon={isPaused ? Play : Pause}
                    label={isPaused ? '播放' : '暂停'}
                    onClick={handleTogglePause}
                  />
                ) : null}

                {!isEmbed && !isMini ? (
                  <IconButton Icon={SkipForward} label="前进 10 秒" onClick={() => forward(10)} />
                ) : null}

                {isMini ? <IconButton Icon={X} label="关闭小窗" onClick={handleCloseMini} /> : null}

                <div className={styles.spacer} />

                {!isEmbed ? (
                  <IconButton
                    Icon={isEffectivelyMuted ? VolumeX : Volume2}
                    label={isEffectivelyMuted ? '取消静音' : '静音'}
                    onClick={handleToggleMuteSmart}
                  />
                ) : null}

                {!isEmbed && !isMini ? (
                  <input
                    className={`${styles.range} ${styles.volumeRange}`}
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={displayVolumePercent}
                    onChange={(e) => handleVolumeChangeSmart(Number(e.target.value))}
                    aria-label="音量"
                  />
                ) : null}

                {!isEmbed && !isMini ? (
                  <IconButton
                    Icon={Minus}
                    label="音量 -5%"
                    onClick={() => handleBumpVolume(-5)}
                    disabled={!canDecrease}
                  />
                ) : null}

                {!isEmbed && !isMini ? (
                  <IconButton
                    Icon={Plus}
                    label="音量 +5%"
                    onClick={() => handleBumpVolume(5)}
                    disabled={!canIncrease}
                  />
                ) : null}

                {!isEmbed && !isMini ? <div className={styles.sep} /> : null}

                {!isMini ? (
                  <div ref={settingsRef} className={styles.settingsWrap}>
                    <IconButton Icon={Settings} label="设置" onClick={() => setSettingsOpen((v) => !v)} />
                  </div>
                ) : null}

                {!isEmbed && !isMini ? (
                  <IconButton
                    Icon={PictureInPicture}
                    label={isPiP ? '退出画中画' : '画中画'}
                    onClick={handleTogglePiP}
                  />
                ) : null}

                {!isEmbed && !isMini ? <IconButton Icon={Maximize2} label="全屏" onClick={toggleFullscreen} /> : null}
              </div>

              {!isEmbed ? (
                <div className={styles.controlsBottom} role="group" aria-label="进度">
                  <span className={styles.time}>{formatTime(currentTime)}</span>
                  <input
                    className={`${styles.range} ${styles.progressRange}`}
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={Math.min(Math.max(0, Number(currentTime) || 0), duration || 0)}
                    onChange={(e) => seekTo(Number(e.target.value))}
                    aria-label="播放进度"
                  />
                  <span className={styles.time}>{formatTime(duration)}</span>
                </div>
              ) : null}

              {playError ? (
                <div className={styles.playError} role="status">
                  {playError}
                </div>
              ) : null}
            </div>
          ) : null}

          {settingsPortal}
        </div>
      </div>
    </>
  )
})

export default React.memo(SmartVideoPlayer)
