import React from 'react'
import PropTypes from 'prop-types'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

type VideoSource =
  | string
  | {
      src: string
      type?: string
      media?: string
      label?: string
    }

interface VideoOptions {
  autoplay?: boolean | 'play' | 'muted' | 'any'
  sources?: VideoSource[]
}

type VideoPlayer = ReturnType<typeof videojs>

interface VideoJSProps {
  options?: VideoOptions
  onReady?: (player: VideoPlayer) => void
}

const defaultOptions: VideoOptions = {
  autoplay: false,
  sources: [],
}

export const VideoJS = Object.assign(
  (props: VideoJSProps) => {
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
          videojs.log('player is ready')

          onReady?.(player)
        }))
      } else {
        const player = playerRef.current

        player.autoplay(options.autoplay)
        player.src(options.sources)
      }
    }, [options, videoRef])

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
  },
  {
    propTypes: {
      options: PropTypes.shape({
        autoplay: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['play', 'muted', 'any'])]),
        sources: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
              src: PropTypes.string.isRequired,
              type: PropTypes.string,
              media: PropTypes.string,
              label: PropTypes.string,
            }),
          ])
        ),
      }),
      onReady: PropTypes.func,
    },
    defaultProps: {
      options: defaultOptions,
      onReady: undefined,
    },
  }
)

export default VideoJS
