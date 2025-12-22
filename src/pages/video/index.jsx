import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import FixTabPanel from '@stateless/FixTabPanel'
import styles from './index.module.css'

import SmartVideoPlayer from '@stateless/SmartVideoPlayer'

import trailerSource from '@assets/video/trailer.mp4'

const MyVideo = () => {
  const playerRef = useRef(null)
  const activeMovieElRef = useRef(null)

  const movies = useMemo(
    () => [
      {
        id: 'm0',
        title: '预告片',
        year: '2025',
        duration: '本地资源',
        desc: '本地播放器（SmartVideoPlayer）',
        provider: 'html5',
        src: trailerSource
      },
      {
        id: 'm0-hls',
        title: 'HLS 演示（.m3u8）',
        year: 'HLS',
        duration: '公开测试流',
        desc: '用于验证 HTML5 模式下的 HLS（优先原生 HLS，否则走 hls.js）；若源未配置 CORS，浏览器会拦截',
        provider: 'html5',
        src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
      },
      {
        id: 'm1',
        title: '科幻预告片 1（YouTube）',
        year: 'YouTube',
        duration: 'Trailer',
        desc: '把官方预告片的 YouTube 视频 ID 填到 youtubeId',
        provider: 'youtube',
        youtubeId: 'xJyWbjATtIE'
      },
      {
        id: 'm2',
        title: '科幻预告片 2（YouTube）',
        year: 'YouTube',
        duration: 'Trailer',
        desc: '把官方预告片的 YouTube 视频 ID 填到 youtubeId',
        provider: 'youtube',
        youtubeId: 'SAcVNQYY8v4'
      },
      {
        id: 'm3',
        title: '科幻预告片 3（YouTube）',
        year: 'YouTube',
        duration: 'Trailer',
        desc: '把官方预告片的 YouTube 视频 ID 填到 youtubeId',
        provider: 'youtube',
        youtubeId: 'afJIa41CiKY'
      },
      {
        id: 'm4',
        title: '科幻预告片 4（YouTube）',
        year: 'YouTube',
        duration: 'Trailer',
        desc: '把官方预告片的 YouTube 视频 ID 填到 youtubeId',
        provider: 'youtube',
        youtubeId: 'Gz4ze8oTYEw'
      },
      {
        id: 'm5',
        title: 'Embed 示例（sourceUrl 打开源站）',
        year: 'Embed',
        duration: 'iframe',
        desc: '演示 sourceUrl：embed 模式下“新窗口打开”会优先打开 sourceUrl（未传 externalUrl 时）',
        provider: 'embed',
        embedUrl: 'https://player.vimeo.com/video/76979800?autoplay=1&muted=1',
        sourceUrl: 'https://vimeo.com/76979800'
      }
    ],
    []
  )

  const [currentMovieId, setCurrentMovieId] = useState(() => movies[0]?.id || '')

  const currentMovie = useMemo(() => {
    return movies.find((m) => m.id === currentMovieId) || movies[0]
  }, [currentMovieId, movies])

  useEffect(() => {
    if (!activeMovieElRef.current) return
    try {
      activeMovieElRef.current.scrollIntoView({ block: 'nearest' })
    } catch (_) {
      // ignore
    }
  }, [currentMovieId])

  const handleSelectMovie = useCallback((id) => {
    // Ensure DOM commits the new src within this click gesture.
    flushSync(() => setCurrentMovieId(id))

    const next = movies.find((m) => m.id === id)
    if (next?.provider === 'html5') {
      playerRef.current?.playFromUserGesture?.(true)
    }
  }, [])

  const reviews = [
    {
      id: 'r1',
      user: '影迷A',
      date: '2025-12-20',
      title: '节奏很舒服，氛围拉满',
      content: '摄影和配乐非常加分，几段长镜头很有沉浸感。剧情不复杂但情绪很到位。'
    },
    {
      id: 'r2',
      user: '影迷B',
      date: '2025-12-19',
      title: '中段略拖，但结尾不错',
      content: '人物动机交代得更细会更好，不过最后的收束很干净，整体观感在线。'
    },
    {
      id: 'r3',
      user: '影迷C',
      date: '2025-12-18',
      title: '适合周末放松看',
      content: '不靠大起大落取胜，细节挺耐看。推荐开小音量慢慢看。'
    }
  ]

  return (
    <FixTabPanel fill={false}>
      <section className={styles.page}>
        <div className={styles.layout}>
          <div className={`${styles.card} ${styles.mainCard}`}>
            <div className={styles.playerSection}>
              <SmartVideoPlayer
                ref={playerRef}
                provider={currentMovie?.provider}
                src={currentMovie?.src}
                youtubeId={currentMovie?.youtubeId}
                embedUrl={currentMovie?.embedUrl}
                externalUrl={currentMovie?.externalUrl}
                sourceUrl={currentMovie?.sourceUrl}
                title={currentMovie?.title}
              />
            </div>

            <section className={styles.comments} aria-label='电影评论讨论区'>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>评论 · 讨论</h3>
                <span className={styles.sectionMeta}>{reviews.length} 条</span>
              </div>

              <div className={styles.reviewList}>
                {reviews.map((r) => (
                  <article key={r.id} className={styles.reviewItem}>
                    <div className={styles.reviewTop}>
                      <span className={styles.reviewUser}>{r.user}</span>
                      <span className={styles.reviewDate}>{r.date}</span>
                    </div>
                    <div className={styles.reviewTitle}>{r.title}</div>
                    <div className={styles.reviewContent}>{r.content}</div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className={`${styles.card} ${styles.sidebarCard}`} aria-label='电影列表'>
            <header className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>电影列表</h3>
              <span className={styles.sidebarMeta}>{movies.length} 部</span>
            </header>

            <div className={styles.movieList}>
              {movies.map((m) => (
                <div
                  key={m.id}
                  ref={(node) => {
                    if (m.id === currentMovieId) activeMovieElRef.current = node
                  }}
                  className={`${styles.movieItem} ${m.id === currentMovieId ? styles.movieItemActive : ''}`}
                  role='button'
                  tabIndex={0}
                  aria-current={m.id === currentMovieId ? 'true' : undefined}
                  onClick={() => handleSelectMovie(m.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelectMovie(m.id)
                    }
                  }}
                >
                  <div className={styles.movieTitleRow}>
                    <span className={styles.movieTitle}>{m.title}</span>
                    <span className={styles.movieYear}>{m.year}</span>
                  </div>
                  <div className={styles.movieMeta}>{m.duration}</div>
                  <div className={styles.movieDesc}>{m.desc}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </FixTabPanel>
  )
}

export default React.memo(MyVideo)
