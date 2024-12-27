import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'

import VideoJS from '@stateless/Video'
import useVideo from '@hooks/useVideo'

const MyVideo = () => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: 'https://placehold.co/1920x1080.mp4',
        type: 'video/mp4',
      },
    ],
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player

    // You can handle player events here, for example:
    player.on('waiting', () => {})

    player.on('dispose', () => {})
  }

  const useVideoRef = useRef(null)
  const {
    isPaused,
    isMuted,
    currentVolume,
    currentTime,
    play,
    pause,
    togglePause,
    increaseVolume,
    decreaseVolume,
    mute,
    unmute,
    toggleMute,
    forward,
    back,
    toggleFullscreen,
  } = useVideo(videoRef)

  return (
    <FixTabPanel>
      <video ref={videoRef} controls muted controlsList="nodownload" style={{ width: 900 }}>
        <track kind="captions" />
        <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
      </video>
      <div style={{ marginTop: 30, width: 900 }}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>

      {/* <section style={{marginTop: 30}}>
        <div>
          <video ref={useVideoRef} className="w-full mb-4 h-72">
            <source src="https://cuicui.day/video/google-deepmind-demo-video.mp4" type="video/mp4" />
            <track
              kind="captions"
              srcLang="en"
              src="/video/google-deepmind-demo-video.vtt"
            />
            Your browser does not support the
          </video>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 *:w-full">
              <button type="button" onClick={togglePause}>
                {isPaused ? "Play" : "Pause"}
              </button>
              <button type="button" onClick={toggleMute}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
            <p>
              <input
                type="range"
                disabled={true}
                min={0}
                max={100}
                value={currentVolume}
                // onChange={(e) => increaseVolume(Number(e.target.value))}
              />
            </p>
            <div className="flex  *:w-full gap-1">
              <button type="button" onClick={() => increaseVolume(5)}>
                Increase Volume
              </button>
              <button type="button" onClick={() => decreaseVolume(5)}>
                Decrease Volume
              </button>
            </div>
            <input
              type="range"
              min={0}
              max={videoRef.current?.duration ?? 0}
              value={currentTime}
              onChange={(e) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Number(e.target.value);
                }
              }}
            />
            <div className="flex gap-1 *:w-full">
              <button type="button" onClick={() => forward(10)}>
                Forward 10s
              </button>
              <button type="button" onClick={() => back(10)}>
                Back 10s
              </button>
            </div>
            <button type="button" onClick={toggleFullscreen}>
              Fullscreen
            </button>
          </div>
        </div>
      </section> */}
    </FixTabPanel>
  )
}

export default MyVideo
