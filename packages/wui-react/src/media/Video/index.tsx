import React from 'react'
import videojs from 'video.js'

export type VideoSource =
  | string
  | {
      src: string
      type?: string
      media?: string
      label?: string
    }

export interface VideoOptions {
  autoplay?: boolean | 'play' | 'muted' | 'any'
  controls?: boolean
  fluid?: boolean
  poster?: string
  sources?: VideoSource[]
}

export type VideoPlayer = ReturnType<typeof videojs>

export interface VideoJSProps {
  options?: VideoOptions
  onReady?: (player: VideoPlayer) => void
}

const defaultOptions: VideoOptions = {
  autoplay: false,
  sources: [],
}

export const VideoJS = (props: VideoJSProps) => {
  const videoRef = React.useRef<HTMLDivElement>(null)
  const playerRef = React.useRef<VideoPlayer | null>(null)
  const { options = defaultOptions, onReady } = props

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')
      const container = videoRef.current

      if (!container) {
        return
      }

      videoElement.classList.add('vjs-big-play-centered')
      container.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady?.(player)
      }))
    } else {
      const player = playerRef.current

      player.autoplay(options.autoplay)
      player.src(options.sources)
      if (options.controls !== undefined) player.controls(options.controls)
      if (options.fluid !== undefined) player.fluid(options.fluid)
      if (options.poster !== undefined) player.poster(options.poster)
    }
  }, [options, onReady])

  React.useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}

export default VideoJS
