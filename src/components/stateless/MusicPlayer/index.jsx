import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, Repeat, ListMusic, Clock, RefreshCw } from 'lucide-react'

// 模拟音乐数据
const TRACKS = [
  {
    id: 1,
    title: 'Cyberpunk City',
    artist: 'MokkaMusic',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&h=200&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Dreamy Vibes',
    artist: 'Panda Beats',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Deep Ocean',
    artist: 'Blue Wave',
    cover: 'https://images.unsplash.com/photo-1459749411177-287ce1465453?w=200&h=200&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
]

const MusicPlayer = () => {
  // --- State ---
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLooping, setIsLooping] = useState(false) // false: 列表循环, true: 单曲循环

  // --- Ref (关键优化：只实例化一次 Audio) ---
  // 这里的 Audio 对象在组件卸载前一直存在，不会被反复销毁重建
  const audioRef = useRef(new Audio(TRACKS[0].src))

  // 用于防止快速切换时的竞态条件
  const isReady = useRef(false)

  // --- 格式化时间 MM:SS ---
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // --- 核心逻辑 ---

  // 使用 useCallback 避免依赖闭包问题
  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev === TRACKS.length - 1 ? 0 : prev + 1))
  }, [])

  // 1. 初始化事件监听 (只运行一次)
  useEffect(() => {
    const audio = audioRef.current
    audio.preload = 'metadata'

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      // 这里不需要手动判断循环，因为我们在 useEffect 中处理了 loop 属性
      // 如果不是单曲循环，audio 不会自动重播，会触发 ended
      if (!audio.loop) {
        handleNext()
      }
    }

    // 绑定事件
    audio.addEventListener('loadedmetadata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', handleEnded)

    // 清理函数
    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [handleNext]) // 空依赖数组，确保只绑定一次

  // 2. 监听 歌曲切换 (currentTrackIndex 变化)
  useEffect(() => {
    const audio = audioRef.current

    // 暂停当前播放
    audio.pause()

    // 切换源
    audio.src = TRACKS[currentTrackIndex].src
    audio.load() // 重新加载资源

    // 延迟设置 currentTime 以避免在 effect 中同步 setState 导致警告
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => setCurrentTime(0))
    } else {
      setTimeout(() => setCurrentTime(0), 0)
    }

    // 如果当前是播放状态，或者是用户刚刚点击了列表切歌（isReady为true表示组件已挂载）
    if (isReady.current) {
      if (isPlaying) {
        const playPromise = audio.play()
        Promise.resolve(playPromise).catch((error) => {
          // 捕获 "The play() request was interrupted" 错误，静默处理
          console.log('Playback prevented/interrupted (harmless):', error)
        })
      }
    } else {
      // 第一次加载组件时不自动播放
      isReady.current = true
    }
  }, [currentTrackIndex, isPlaying])

  // 3. 监听 播放/暂停 状态变化
  useEffect(() => {
    const audio = audioRef.current
    if (isPlaying) {
      const playPromise = audio.play()
      Promise.resolve(playPromise).catch((e) => console.log('Play interaction error:', e))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // 4. 监听 循环模式变化
  useEffect(() => {
    audioRef.current.loop = isLooping
  }, [isLooping])

  // --- 交互函数 ---

  const togglePlay = () => setIsPlaying(!isPlaying)

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? TRACKS.length - 1 : prev - 1))
  }

  const handleSeek = (e) => {
    const newTime = Number(e.target.value)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // 点击列表切歌
  const playTrack = (index) => {
    if (index === currentTrackIndex) {
      togglePlay() // 如果点的是当前这首，就切换播放/暂停
    } else {
      setCurrentTrackIndex(index)
      setIsPlaying(true) // 切歌后默认播放
    }
  }

  const currentTrack = TRACKS[currentTrackIndex]
  const remainingTime = duration - currentTime

  return (
    <div className="mx-auto flex h-[700px] max-w-md flex-col overflow-hidden rounded-2xl bg-gray-900 font-sans text-white shadow-2xl">
      {/* === 上半部分：播放器控制 === */}
      <div className="z-10 flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg">
        {/* 封面 & 旋转动画 */}
        <div
          className={`relative mb-6 h-56 w-56 overflow-hidden rounded-full border-8 border-gray-800 shadow-2xl ${isPlaying ? 'animate-[spin_12s_linear_infinite]' : ''}`}
        >
          <img src={currentTrack.cover} alt="cover" className="h-full w-full object-cover" />
          {/* 中间的小圆点，模拟黑胶唱片 */}
          <div className="absolute top-1/2 left-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-800"></div>
        </div>

        {/* 歌曲信息 */}
        <div className="mb-6 w-full text-center">
          <h2 className="truncate text-xl font-bold text-white">{currentTrack.title}</h2>
          <p className="mt-1 text-sm text-gray-400">{currentTrack.artist}</p>
        </div>

        {/* 进度条 & 时间 */}
        <div className="mb-6 w-full space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-green-500 transition-all hover:h-2"
          />
          <div className="flex justify-between font-mono text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(remainingTime)}</span>
          </div>
        </div>

        {/* 按钮组 */}
        <div className="flex w-full items-center justify-between px-4">
          {/* 循环切换 */}
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`rounded-full p-2 transition ${isLooping ? 'bg-gray-800 text-green-400' : 'text-gray-400 hover:text-white'}`}
            title={isLooping ? '单曲循环' : '列表循环'}
          >
            {isLooping ? <Repeat size={20} /> : <RefreshCw size={20} />}
          </button>

          <button onClick={handlePrev} className="p-2 text-gray-300 transition hover:scale-110 hover:text-white">
            <SkipBack size={28} />
          </button>

          {/* 播放/暂停大按钮 */}
          <button
            onClick={togglePlay}
            className="rounded-full bg-green-500 p-4 text-black shadow-lg shadow-green-500/30 transition hover:scale-105 hover:bg-green-400 active:scale-95"
          >
            {isPlaying ? (
              <Pause size={32} fill="currentColor" />
            ) : (
              <Play size={32} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button onClick={handleNext} className="p-2 text-gray-300 transition hover:scale-110 hover:text-white">
            <SkipForward size={28} />
          </button>

          {/* 占位/菜单按钮 */}
          <button className="p-2 text-gray-400 hover:text-white">
            <Clock size={20} />
          </button>
        </div>
      </div>

      {/* === 下半部分：播放列表 (固定高度，内部滚动) === */}
      <div className="flex flex-1 flex-col overflow-hidden bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 bg-gray-900/50 px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
          <ListMusic size={14} />
          <span>Playlist ({TRACKS.length})</span>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
          {TRACKS.map((track, index) => {
            const isCurrent = index === currentTrackIndex
            return (
              <button
                key={track.id}
                onClick={() => playTrack(index)}
                type="button"
                aria-label={`Play ${track.title} by ${track.artist}`}
                className={`group mb-1 flex w-full items-center rounded-xl p-3 text-left transition-all duration-200 ${isCurrent ? 'bg-gray-800/80' : 'text-gray-400 hover:bg-gray-800/40'} `}
              >
                {/* 序号 / 动态图标 */}
                <div className="mr-2 flex w-10 items-center justify-center">
                  {isCurrent && isPlaying ? (
                    <div className="flex h-3 items-end gap-1">
                      <span className="h-full w-0.5 animate-[bounce_1s_infinite] bg-green-500"></span>
                      <span className="h-2/3 w-0.5 animate-[bounce_1.2s_infinite] bg-green-500"></span>
                      <span className="h-1/2 w-0.5 animate-[bounce_0.8s_infinite] bg-green-500"></span>
                    </div>
                  ) : (
                    <span className={`font-mono text-sm ${isCurrent ? 'text-green-500' : 'text-gray-600'}`}>
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* 标题信息 */}
                <div className="min-w-0 flex-1">
                  <div
                    className={`truncate font-medium ${isCurrent ? 'text-green-400' : 'text-gray-200 group-hover:text-white'}`}
                  >
                    {track.title}
                  </div>
                  <div className="truncate text-xs text-gray-500">{track.artist}</div>
                </div>

                {/* 播放状态文字 */}
                {isCurrent && (
                  <span className="px-2 text-xs font-medium text-green-500/80">{isPlaying ? 'Playing' : 'Paused'}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
