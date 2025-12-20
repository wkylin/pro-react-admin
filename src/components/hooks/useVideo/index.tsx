import { useCallback, useEffect, useState, useRef, type RefObject } from 'react'
import { useActivate, useUnactivate } from '@src/components/KeepAlive'

const useVideo = (ref: RefObject<HTMLVideoElement | null>) => {
  const [videoState, setVideoState] = useState({
    isPaused: true,
    isMuted: false,
    currentVolume: 100,
    currentTime: 0,
  })

  // 首次挂载后，同步一次真实 video 初始值（ref.current 在 effect 阶段已可用）
  useEffect(() => {
    const video = ref.current
    if (!video) return
    setVideoState((prev) => ({
      ...prev,
      isPaused: video.paused,
      isMuted: video.muted,
      currentVolume: video.volume * 100,
      currentTime: video.currentTime,
    }))
  }, [ref])

  const play = useCallback(() => {
    const video = ref.current
    if (!video) return
    const p = video.play()
    Promise.resolve(p).catch(() => {
      // ignore autoplay/policy errors
    })
  }, [ref])

  const pause = useCallback(() => {
    const video = ref.current
    video?.pause()
  }, [ref])

  const handlePlayPauseControl = useCallback((e: Event) => {
    const target = e.target as HTMLVideoElement
    setVideoState((prev) => ({
      ...prev,
      isPaused: target.paused,
    }))
  }, [])

  const togglePause = useCallback(() => {
    const video = ref.current
    if (!video) return
    return video.paused ? play() : pause()
  }, [pause, play, ref])

  const handleVolume = useCallback(
    (delta: number) => {
      const deltaDecimal = delta / 100

      const video = ref.current
      if (video) {
        let newVolume = video.volume + deltaDecimal

        if (newVolume >= 1) {
          newVolume = 1
        } else if (newVolume <= 0) {
          newVolume = 0
        }

        video.volume = newVolume
      }
    },
    [ref]
  )

  const handleVolumeControl = useCallback((e: Event) => {
    const target = e.target as HTMLVideoElement
    setVideoState((prev) => ({
      ...prev,
      currentVolume: target.volume * 100,
      isMuted: target.muted,
    }))
  }, [])

  const handleMute = useCallback(
    (mute: boolean) => {
      const video = ref.current
      if (!video) return
      video.muted = mute
      setVideoState((prev) => ({
        ...prev,
        isMuted: video.muted,
      }))
    },
    [ref]
  )

  const handleTime = useCallback(
    (delta = 5) => {
      const video = ref.current
      if (video) {
        let newTime = video.currentTime + delta

        if (newTime >= video.duration) {
          newTime = video.duration
        } else if (newTime <= 0) {
          newTime = 0
        }

        video.currentTime = newTime
      }
    },
    [ref]
  )

  const handleTimeControl = useCallback((e: Event) => {
    setVideoState((prev) => {
      return {
        ...prev,
        currentTime: (e.target as HTMLVideoElement).currentTime,
      }
    })
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      const video = ref.current
      video?.requestFullscreen().catch((err) => {
        console.log(err)
      })
    }
  }, [ref])

  const pausedByDeactivate = useRef(false)

  useUnactivate(() => {
    const video = ref.current
    if (video && !video.paused) {
      pause()
      pausedByDeactivate.current = true
    }
  })

  useActivate(() => {
    if (pausedByDeactivate.current) {
      play()
      pausedByDeactivate.current = false
    }
  })

  useEffect(() => {
    return () => {
      pause()
    }
  }, [pause])

  useEffect(() => {
    let disposed = false
    let attachedTo: HTMLVideoElement | null = null

    const schedule = (cb: FrameRequestCallback) => {
      if (typeof requestAnimationFrame === 'function') return requestAnimationFrame(cb)
      return setTimeout(() => cb(performance.now()), 0) as unknown as number
    }

    const attach = () => {
      if (disposed) return
      const video = ref.current
      if (!video) {
        // ref.current 理论上在 effect 时已就绪，但 KeepAlive/条件渲染下可能会延后，做一次轻量重试
        schedule(attach)
        return
      }

      attachedTo = video
      video.addEventListener('volumechange', handleVolumeControl)
      video.addEventListener('play', handlePlayPauseControl)
      video.addEventListener('pause', handlePlayPauseControl)
      video.addEventListener('timeupdate', handleTimeControl)
    }

    attach()

    return () => {
      disposed = true
      if (!attachedTo) return
      attachedTo.removeEventListener('volumechange', handleVolumeControl)
      attachedTo.removeEventListener('play', handlePlayPauseControl)
      attachedTo.removeEventListener('pause', handlePlayPauseControl)
      attachedTo.removeEventListener('timeupdate', handleTimeControl)
    }
  }, [handlePlayPauseControl, handleTimeControl, handleVolumeControl, ref])

  return {
    ...videoState,
    play,
    pause,
    togglePause,
    increaseVolume: (increase = 5) => handleVolume(increase),
    decreaseVolume: (decrease = 5) => handleVolume(decrease * -1),
    mute: () => handleMute(true),
    unmute: () => handleMute(false),
    toggleMute: () => handleMute(!ref.current?.muted),
    forward: (increase = 5) => handleTime(increase),
    back: (decrease = 5) => handleTime(decrease * -1),
    toggleFullscreen,
  }
}

export default useVideo
