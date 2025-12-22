import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useVideo from '@hooks/useVideo'
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

import styles from './index.module.css'

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

const IconButton = React.memo(function IconButton({
  Icon,
  label,
  onClick,
  disabled = false,
  buttonRef,
  tooltipPlacement = 'top',
}) {
  const tooltipPlacementClass =
    tooltipPlacement === 'topLeft'
      ? styles.tooltipTopLeft
      : tooltipPlacement === 'topRight'
        ? styles.tooltipTopRight
        : tooltipPlacement === 'right'
          ? styles.tooltipRight
          : tooltipPlacement === 'left'
            ? styles.tooltipLeft
            : tooltipPlacement === 'bottom'
              ? styles.tooltipBottom
              : tooltipPlacement === 'bottomLeft'
                ? styles.tooltipBottomLeft
                : tooltipPlacement === 'bottomRight'
                  ? styles.tooltipBottomRight
                  : ''

  return (
    <button
      ref={buttonRef}
      className={styles.iconButton}
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
    >
      <Icon size={15} />
      <span className={`${styles.tooltip} ${tooltipPlacementClass}`} aria-hidden>
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
    onError,
    onEvent,
  },
  ref
) {
  const useVideoRef = useRef(null)
  const videoAnchorRef = useRef(null)
  const playerWrapRef = useRef(null)
  const settingsRef = useRef(null)
  const settingsPanelRef = useRef(null)
  const settingsButtonRef = useRef(null)
  const prevSettingsOpenRef = useRef(false)
  const userPausedRef = useRef(false)
  const autoPausedRef = useRef(false)
  const isPiPRef = useRef(false)
  const inViewRef = useRef(true)
  const fullyOutRef = useRef(false)
  const userPlayOverrideUntilRef = useRef(0)
  const miniDismissedRef = useRef(false)
  const autoPlayAttemptedRef = useRef(false)
  const configRef = useRef(null)
  const autoStartFeedbackRef = useRef(false)

  const onErrorRef = useRef(onError)
  const onEventRef = useRef(onEvent)
  const ctxRef = useRef({ provider, src, youtubeId, embedUrl })
  const embedTimerRef = useRef(0)

  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  useEffect(() => {
    onEventRef.current = onEvent
  }, [onEvent])

  useEffect(() => {
    ctxRef.current = { provider, src, youtubeId, embedUrl }
  }, [provider, src, youtubeId, embedUrl])

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [speedOpen, setSpeedOpen] = useState(false)
  const [captionsOpen, setCaptionsOpen] = useState(false)

  const emitEvent = useCallback((name, detail) => {
    const fn = onEventRef.current
    if (typeof fn !== 'function') return
    try {
      fn(name, detail)
    } catch (_) {
      // ignore
    }
  }, [])

  const handleSettingsPanelPointerDownCapture = useCallback(
    (e) => {
      if (!speedOpen && !captionsOpen) return
      const target = e.target
      if (!(target instanceof Element)) return

      if (target.closest('[data-speed-dropdown="true"]')) return
      if (target.closest('[data-captions-dropdown="true"]')) return
      setSpeedOpen(false)
      setCaptionsOpen(false)
    },
    [captionsOpen, speedOpen]
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

  const reportError = useCallback(
    (message, extra) => {
      const safeMessage = typeof message === 'string' ? message : '未知错误'
      setPlayError(safeMessage)

      const fn = onErrorRef.current
      const ctx = ctxRef.current
      if (typeof fn === 'function') {
        try {
          fn({
            message: safeMessage,
            provider: ctx.provider,
            src: ctx.src,
            youtubeId: ctx.youtubeId,
            embedUrl: ctx.embedUrl,
            ...extra,
          })
        } catch (_) {
          // ignore
        }
      }

      emitEvent('error', { message: safeMessage, ...extra })
    },
    [emitEvent]
  )

  const [bufferedEnd, setBufferedEnd] = useState(0)
  const [hoverPreview, setHoverPreview] = useState(null)

  const [embedLoaded, setEmbedLoaded] = useState(true)
  const [embedTimeout, setEmbedTimeout] = useState(false)

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

  const isHlsSrc = useMemo(() => {
    if (isEmbed) return false
    if (typeof src !== 'string') return false
    return /\.m3u8($|\?)/i.test(src)
  }, [isEmbed, src])

  const hlsRef = useRef(null)

  const [mediaLoading, setMediaLoading] = useState(false)
  const [mediaLoadingText, setMediaLoadingText] = useState('加载中…')

  const [captionsEnabled, setCaptionsEnabled] = useState(false)
  const [captionTracks, setCaptionTracks] = useState([])
  const [captionTrackIndex, setCaptionTrackIndex] = useState(0)

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

  const safePlay = useCallback(
    (withFeedback = false) => {
      const videoEl = useVideoRef.current
      if (!videoEl) return

      // Autoplay: 大多数浏览器要求 muted 才允许自动播放；这里做同步兜底，避免 effect 时序导致首次 play 被拦
      if (configRef.current?.autoMute && !videoEl.muted) {
        videoEl.muted = true
      }

      if (!isHlsSrc && videoEl.readyState === 0) {
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
          emitEvent('play', { provider: ctxRef.current?.provider })
        })
        .catch((err) => {
          const isAutoStartAttempt = autoStartFeedbackRef.current
          if (isAutoStartAttempt) autoStartFeedbackRef.current = false

          if (!withFeedback) return

          const name = typeof err?.name === 'string' ? err.name : 'PlayError'
          const message = typeof err?.message === 'string' ? err.message : ''

          // Autoplay may be blocked by browser policy/user settings.
          // For auto-start attempts, don't surface this as a sticky UI error.
          if (isAutoStartAttempt && name === 'NotAllowedError') {
            emitEvent('autoplayBlocked', { name, message })
            return
          }

          // Common & harmless: play() interrupted by pause() (e.g. IO lazy-play or rapid user toggles)
          if (
            name === 'AbortError' ||
            /interrupted by a call to pause\(\)/i.test(message) ||
            /The play\(\) request was interrupted/i.test(message)
          ) {
            return
          }

          reportError(message ? `无法播放：${name} - ${message}` : `无法播放：${name}`, { name })
        })
    },
    [emitEvent, isHlsSrc, reportError]
  )

  const kickAutoPlayNow = useCallback(() => {
    const cfg = configRef.current
    if (!cfg?.autoPlay) return
    if (!inViewRef.current) return
    if (userPausedRef.current) return
    if (autoPlayAttemptedRef.current) return

    const videoEl = useVideoRef.current
    if (!videoEl) return
    if (!videoEl.paused) return

    autoPlayAttemptedRef.current = true
    autoStartFeedbackRef.current = true
    safePlay(true)
  }, [safePlay])

  const safePlayFromUserGesture = useCallback(
    (withFeedback = true) => {
      // Treat as explicit user intent: clear pause flags and briefly ignore IO-driven auto pause.
      userPausedRef.current = false
      autoPausedRef.current = false
      userPlayOverrideUntilRef.current = Date.now() + 1200

      // When using <source>, changing src doesn't automatically reload media.
      // Ensure the new source is actually loaded before play() within the click gesture.
      const videoEl = useVideoRef.current
      if (videoEl && !isHlsSrc) {
        try {
          videoEl.load()
        } catch (_) {
          // ignore
        }
      }
      safePlay(withFeedback)
    },
    [isHlsSrc, safePlay]
  )

  useEffect(() => {
    if (isEmbed || isHlsSrc) return
    // <source src> updates require an explicit load() to take effect.
    const videoEl = useVideoRef.current
    if (!videoEl) return
    try {
      videoEl.load()
    } catch (_) {
      // ignore
    }
  }, [isEmbed, isHlsSrc, src, trackSrc, trackLang])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return

    let cancelled = false

    const destroyHls = () => {
      const hls = hlsRef.current
      if (!hls) return
      try {
        hls.destroy()
      } catch (_) {
        // ignore
      }
      hlsRef.current = null
    }

    if (!isHlsSrc) {
      // Leaving HLS mode: HLS paths set videoEl.src (native) or attach a blob URL (hls.js).
      // If we don't clear it, <source src=...> updates won't take effect and switching back to mp4 can fail.
      destroyHls()
      try {
        if (videoEl.getAttribute('src')) videoEl.removeAttribute('src')
        // Also clear the property for good measure.
        if (videoEl.src) videoEl.src = ''
      } catch (_) {
        // ignore
      }
      try {
        videoEl.load()
      } catch (_) {
        // ignore
      }
      return
    }

    // Ensure we start from a clean slate.
    destroyHls()

    const canPlayNative = Boolean(
      videoEl.canPlayType?.('application/vnd.apple.mpegurl') || videoEl.canPlayType?.('application/x-mpegURL')
    )

    if (canPlayNative) {
      try {
        videoEl.src = src
        videoEl.load()
        emitEvent('hlsNative', {})
        kickAutoPlayNow()
      } catch (err) {
        reportError('HLS（原生）加载失败', { type: 'hls', name: err?.name, reason: err?.message })
      }
      return
    }

    ;(async () => {
      try {
        const mod = await import('hls.js')
        const Hls = mod?.default
        if (!Hls || typeof Hls.isSupported !== 'function' || !Hls.isSupported()) {
          reportError('浏览器不支持 HLS 播放', { type: 'hls', reason: 'not_supported' })
          return
        }

        if (cancelled) return

        const hls = new Hls({
          // keep defaults; avoid aggressive low-latency tuning here
          enableWorker: true,
        })
        hlsRef.current = hls

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (!data) return
          emitEvent('hlsError', { details: data })

          if (!data.fatal) return

          reportError('HLS 播放错误', {
            type: 'hls',
            fatal: true,
            details: {
              type: data.type,
              details: data.details,
              reason: data.reason,
              response: data.response,
            },
          })

          // Best-effort: destroy to stop retry loops
          try {
            hls.destroy()
          } catch (_) {
            // ignore
          }
          if (hlsRef.current === hls) hlsRef.current = null
        })

        hls.attachMedia(videoEl)
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          if (cancelled) return
          try {
            hls.loadSource(src)
            emitEvent('hlsAttach', {})
            kickAutoPlayNow()
          } catch (err) {
            reportError('HLS 加载失败', { type: 'hls', name: err?.name, reason: err?.message })
          }
        })
      } catch (err) {
        reportError('HLS 初始化失败', { type: 'hls', name: err?.name, reason: err?.message })
      }
    })()

    return () => {
      cancelled = true
      destroyHls()
    }
  }, [emitEvent, isEmbed, isHlsSrc, kickAutoPlayNow, reportError, src])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return

    // When switching sources, show a simple overlay to avoid a "blank" feel.
    // We rely on media events to clear it as soon as playback is ready.
    const onLoadStart = () => {
      setMediaLoadingText(isHlsSrc ? '加载 HLS…' : '加载中…')
      setMediaLoading(true)
    }
    const onCanPlay = () => setMediaLoading(false)
    const onPlaying = () => setMediaLoading(false)
    const onError = () => setMediaLoading(false)

    videoEl.addEventListener('loadstart', onLoadStart)
    videoEl.addEventListener('canplay', onCanPlay)
    videoEl.addEventListener('playing', onPlaying)
    videoEl.addEventListener('error', onError)

    return () => {
      videoEl.removeEventListener('loadstart', onLoadStart)
      videoEl.removeEventListener('canplay', onCanPlay)
      videoEl.removeEventListener('playing', onPlaying)
      videoEl.removeEventListener('error', onError)
    }
  }, [isEmbed, isHlsSrc, src])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return

    const syncTracks = () => {
      const list = videoEl.textTracks
      const next = []
      if (list && typeof list.length === 'number') {
        for (let i = 0; i < list.length; i += 1) {
          const t = list[i]
          if (!t) continue
          next.push({
            index: i,
            label: t.label || t.language || `字幕 ${i + 1}`,
            language: t.language || '',
          })
        }
      }

      setCaptionTracks(next)
      if (next.length <= 0) {
        setCaptionsEnabled(false)
        setCaptionTrackIndex(0)
      } else if (captionTrackIndex >= next.length) {
        setCaptionTrackIndex(0)
      }
    }

    const onMeta = () => {
      // textTracks sometimes populate after metadata; defer a tick
      window.setTimeout(syncTracks, 0)
    }

    videoEl.addEventListener('loadedmetadata', onMeta)
    onMeta()
    return () => {
      videoEl.removeEventListener('loadedmetadata', onMeta)
    }
  }, [captionTrackIndex, isEmbed, src, trackLang, trackSrc])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return
    const list = videoEl.textTracks
    if (!list || typeof list.length !== 'number') return

    for (let i = 0; i < list.length; i += 1) {
      const t = list[i]
      if (!t) continue
      t.mode = 'disabled'
    }

    if (!captionsEnabled) return
    const active = list[captionTrackIndex]
    if (active) active.mode = 'showing'
  }, [captionsEnabled, captionTrackIndex, isEmbed])

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
      reportError(msg, { code })
    }

    videoEl.addEventListener('playing', onPlaying)
    videoEl.addEventListener('error', onError)
    return () => {
      videoEl.removeEventListener('playing', onPlaying)
      videoEl.removeEventListener('error', onError)
    }
  }, [isEmbed, reportError, src])

  useEffect(() => {
    if (isEmbed) return
    const videoEl = useVideoRef.current
    if (!videoEl) return

    let rafId = 0
    const updateBuffered = () => {
      rafId = 0
      const d = Number.isFinite(videoEl.duration) ? videoEl.duration : 0
      if (!d || !videoEl.buffered || videoEl.buffered.length <= 0) {
        setBufferedEnd(0)
        return
      }

      let end = 0
      for (let i = 0; i < videoEl.buffered.length; i += 1) {
        const nextEnd = Number(videoEl.buffered.end(i))
        if (Number.isFinite(nextEnd)) end = Math.max(end, nextEnd)
      }
      setBufferedEnd(Math.min(end, d))
    }

    const onProgress = () => {
      if (rafId) return
      rafId = requestAnimationFrame(updateBuffered)
    }

    videoEl.addEventListener('progress', onProgress)
    videoEl.addEventListener('loadedmetadata', onProgress)
    videoEl.addEventListener('durationchange', onProgress)
    onProgress()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      videoEl.removeEventListener('progress', onProgress)
      videoEl.removeEventListener('loadedmetadata', onProgress)
      videoEl.removeEventListener('durationchange', onProgress)
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
    // For HLS, wait until native src / hls.js is attached.
    if (isHlsSrc) return

    // Non-HLS: try to start loading/play ASAP after the new <source> is committed.
    const id = window.requestAnimationFrame(() => {
      kickAutoPlayNow()
    })
    return () => window.cancelAnimationFrame(id)
  }, [isEmbed, isHlsSrc, kickAutoPlayNow, src])

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

    const focusTimer = window.setTimeout(() => {
      const panelEl = settingsPanelRef.current
      if (!panelEl) return
      const first = panelEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (first instanceof HTMLElement) first.focus()
    }, 0)

    window.addEventListener('resize', updateSettingsPanelPosition)
    window.addEventListener('scroll', updateSettingsPanelPosition, true)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.clearTimeout(focusTimer)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateSettingsPanelPosition)
      window.removeEventListener('scroll', updateSettingsPanelPosition, true)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [settingsOpen, updateSettingsPanelPosition])

  useEffect(() => {
    const wasOpen = prevSettingsOpenRef.current
    prevSettingsOpenRef.current = settingsOpen

    // Only restore focus when the panel is closed (open -> closed).
    if (!wasOpen || settingsOpen) return

    const btn = settingsButtonRef.current
    if (btn && btn instanceof HTMLElement) {
      try {
        btn.focus()
      } catch (_) {
        // ignore
      }
    }
  }, [settingsOpen])

  useEffect(() => {
    if (settingsOpen) return
    setSpeedOpen(false)
    setCaptionsOpen(false)
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
      emitEvent('pipEnter', {})
    }
    const onLeave = () => {
      isPiPRef.current = false
      setIsPiP(false)
      emitEvent('pipLeave', {})
    }

    videoEl.addEventListener('enterpictureinpicture', onEnter)
    videoEl.addEventListener('leavepictureinpicture', onLeave)

    return () => {
      videoEl.removeEventListener('enterpictureinpicture', onEnter)
      videoEl.removeEventListener('leavepictureinpicture', onLeave)
    }
  }, [emitEvent])

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
    emitEvent('pause', { provider: ctxRef.current?.provider })
  }, [emitEvent, safePlay])

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
      emitEvent('openExternal', { url: externalOpenUrl })
    } catch (_) {
      // ignore
    }
  }, [emitEvent, externalOpenUrl])

  useEffect(() => {
    if (!isEmbed) return
    if (!computedEmbedSrc) return

    setEmbedLoaded(false)
    setEmbedTimeout(false)

    const t = window.setTimeout(() => {
      setEmbedTimeout(true)
      emitEvent('embedTimeout', { src: computedEmbedSrc })
    }, 2200)

    embedTimerRef.current = t

    return () => {
      window.clearTimeout(t)
      if (embedTimerRef.current === t) embedTimerRef.current = 0
    }
  }, [computedEmbedSrc, emitEvent, isEmbed])

  const handleEmbedLoad = useCallback(() => {
    const t = embedTimerRef.current
    if (t) window.clearTimeout(t)
    embedTimerRef.current = 0
    setEmbedLoaded(true)
    setEmbedTimeout(false)
    emitEvent('embedLoad', {})
  }, [emitEvent])

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
      emitEvent('pipToggle', {})
    } catch (_) {
      // ignore
    }
  }, [emitEvent])

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
      emitEvent('seek', { time: safe })
    },
    [duration, emitEvent]
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
        emitEvent('volume', { volume: 0 })
        return
      }

      if (config.autoMute) {
        setConfigItem('autoMute', false)
      }

      unmute()

      lastUserVolumeRef.current = safe
      setVolume(safe)
      emitEvent('volume', { volume: safe })
    },
    [config.autoMute, emitEvent, mute, setConfigItem, setVolume, unmute]
  )

  const handleToggleMuteSmart = useCallback(() => {
    if (isEffectivelyMuted) {
      if (config.autoMute) {
        setConfigItem('autoMute', false)
      }

      unmute()
      setVolume(getRestoreVolume())
      emitEvent('mute', { muted: false })
      return
    }

    if (volumePercent > 0) lastUserVolumeRef.current = Math.max(1, Math.min(100, volumePercent))
    mute()
    emitEvent('mute', { muted: true })
  }, [
    config.autoMute,
    emitEvent,
    getRestoreVolume,
    isEffectivelyMuted,
    mute,
    setConfigItem,
    setVolume,
    unmute,
    volumePercent,
  ])

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

  const bufferedPercent = useMemo(() => {
    const d = Number(duration) || 0
    if (!d) return 0
    const end = Number(bufferedEnd) || 0
    return Math.max(0, Math.min(100, (end / d) * 100))
  }, [bufferedEnd, duration])

  const updateHoverPreviewFromClientX = useCallback(
    (clientX, el) => {
      const rect = el.getBoundingClientRect()
      const x = Math.min(Math.max(0, clientX - rect.left), rect.width)
      const ratio = rect.width > 0 ? x / rect.width : 0
      const t = ratio * (duration || 0)
      setHoverPreview({ ratio, time: t })
    },
    [duration]
  )

  const handleProgressPointerMove = useCallback(
    (e) => {
      updateHoverPreviewFromClientX(e.clientX, e.currentTarget)
    },
    [updateHoverPreviewFromClientX]
  )

  const handleProgressPointerLeave = useCallback(() => {
    setHoverPreview(null)
  }, [])

  const handlePlayerKeyDown = useCallback(
    (e) => {
      const target = e.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
        if (target.isContentEditable) return
      }

      if (e.key === 'Escape' && settingsOpen) {
        e.preventDefault()
        setSettingsOpen(false)
        return
      }

      if (isEmbed) {
        if ((e.key === 'o' || e.key === 'O') && externalOpenUrl) {
          e.preventDefault()
          handleOpenExternal()
        }
        if ((e.key === 's' || e.key === 'S') && !isMini) {
          e.preventDefault()
          setSettingsOpen((v) => !v)
        }
        return
      }

      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault()
        handleTogglePause()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        back(5)
        emitEvent('seekRelative', { delta: -5 })
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        forward(5)
        emitEvent('seekRelative', { delta: 5 })
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleBumpVolume(5)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleBumpVolume(-5)
        return
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        handleToggleMuteSmart()
        return
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
        emitEvent('fullscreen', {})
        return
      }
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        handleTogglePiP()
        return
      }
      if (e.key === 's' || e.key === 'S') {
        if (isMini) return
        e.preventDefault()
        setSettingsOpen((v) => !v)
      }
    },
    [
      back,
      emitEvent,
      externalOpenUrl,
      forward,
      handleBumpVolume,
      handleOpenExternal,
      handleToggleMuteSmart,
      handleTogglePause,
      handleTogglePiP,
      isEmbed,
      isMini,
      settingsOpen,
      toggleFullscreen,
    ]
  )

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

            {!isEmbed && captionTracks.length > 0 ? (
              <div className={`${styles.settingItem} ${styles.settingItemSplit}`} aria-label="字幕">
                <span className={styles.settingLabel}>字幕</span>
                <div className={styles.speedDropdown} data-captions-dropdown="true">
                  <button
                    type="button"
                    className={styles.speedTrigger}
                    aria-haspopup="listbox"
                    aria-expanded={captionsOpen}
                    onClick={() => {
                      setCaptionsOpen((v) => !v)
                      setSpeedOpen(false)
                    }}
                  >
                    {captionsEnabled ? captionTracks[captionTrackIndex]?.label || '字幕' : '关闭'}
                  </button>

                  {captionsOpen ? (
                    <div className={styles.speedMenu} role="listbox" aria-label="字幕选项">
                      <button
                        type="button"
                        className={`${styles.speedItem} ${!captionsEnabled ? styles.speedItemActive : ''}`}
                        role="option"
                        aria-selected={!captionsEnabled}
                        onClick={() => {
                          setCaptionsEnabled(false)
                          setCaptionsOpen(false)
                          emitEvent('captions', { enabled: false })
                        }}
                      >
                        关闭
                      </button>

                      {captionTracks.map((t) => {
                        const active = captionsEnabled && captionTrackIndex === t.index
                        return (
                          <button
                            key={`${t.index}-${t.language || ''}-${t.label || ''}`}
                            type="button"
                            className={`${styles.speedItem} ${active ? styles.speedItemActive : ''}`}
                            role="option"
                            aria-selected={active}
                            onClick={() => {
                              setCaptionTrackIndex(t.index)
                              setCaptionsEnabled(true)
                              setCaptionsOpen(false)
                              emitEvent('captions', { enabled: true, trackIndex: t.index })
                            }}
                          >
                            {t.label}
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
          ref={playerWrapRef}
          className={`${styles.videoWrap} ${isMini ? styles.mini : ''} ${settingsOpen ? styles.controlsPinnedWrap : ''}`}
          tabIndex={0}
          onKeyDown={handlePlayerKeyDown}
          role="region"
          aria-label="播放器"
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
                  onLoad={handleEmbedLoad}
                />

                {embedTimeout && !embedLoaded ? (
                  <div className={styles.embedHint} role="status" aria-live="polite">
                    <div className={styles.embedHintTitle}>嵌入可能被网站禁止</div>
                    {externalOpenUrl ? (
                      <button type="button" className={styles.embedHintAction} onClick={handleOpenExternal}>
                        新窗口打开
                      </button>
                    ) : null}
                  </div>
                ) : null}
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
              {!isHlsSrc ? <source src={src} type="video/mp4" /> : null}
              {computedTrackSrc ? (
                <track
                  kind="captions"
                  srcLang={trackLang}
                  label={trackLang?.toUpperCase?.() || 'CC'}
                  src={computedTrackSrc}
                />
              ) : null}
              Your browser does not support the video tag.
            </video>
          )}

          {!isEmbed && mediaLoading ? (
            <div className={styles.loadingOverlay} role="status" aria-live="polite">
              <div className={styles.loadingOverlayText}>{mediaLoadingText}</div>
            </div>
          ) : null}

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
                <IconButton
                  Icon={Settings}
                  label="设置"
                  onClick={() => setSettingsOpen((v) => !v)}
                  buttonRef={settingsButtonRef}
                />
              </div>
            </div>
          ) : null}

          {!isEmbed ? (
            <div className={styles.videoControls} aria-label="视频控制条">
              <div className={styles.controlsTop} role="group" aria-label="播放与工具">
                {!isEmbed && !isMini ? (
                  <IconButton Icon={SkipBack} label="后退 10 秒" onClick={() => back(10)} tooltipPlacement="topLeft" />
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
                    <IconButton
                      Icon={Settings}
                      label="设置"
                      onClick={() => setSettingsOpen((v) => !v)}
                      buttonRef={settingsButtonRef}
                    />
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
                  <div
                    className={styles.progressWrap}
                    onPointerMove={handleProgressPointerMove}
                    onPointerLeave={handleProgressPointerLeave}
                    aria-label="播放进度条"
                  >
                    <div className={styles.bufferBar} style={{ width: `${bufferedPercent}%` }} aria-hidden />

                    {hoverPreview ? (
                      <div
                        className={styles.previewTooltip}
                        style={{ left: `${Math.round((hoverPreview.ratio || 0) * 100)}%` }}
                        aria-hidden
                      >
                        {formatTime(hoverPreview.time)}
                      </div>
                    ) : null}

                    <input
                      className={`${styles.range} ${styles.progressRange} ${styles.progressRangeOverlay}`}
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={0.1}
                      value={Math.min(Math.max(0, Number(currentTime) || 0), duration || 0)}
                      onChange={(e) => seekTo(Number(e.target.value))}
                      aria-label="播放进度"
                    />
                  </div>
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
