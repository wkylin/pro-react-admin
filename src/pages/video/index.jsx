import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import FixTabPanel from '@stateless/FixTabPanel'
import styles from './index.module.css'

import SmartVideoPlayer from '@stateless/SmartVideoPlayer'

import trailerSource from '@assets/video/trailer.mp4'
import flowerSource from '@assets/video/mdn-flower.mp4'
import joyridesSource from '@assets/video/for-bigger-joyrides.mp4'
import escapesSource from '@assets/video/for-bigger-escapes.mp4'
import meltdownsSource from '@assets/video/for-bigger-meltdowns.mp4'

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
        desc: '当前 trailer.mp4',
        src: trailerSource,
      },
      {
        id: 'm1',
        title: 'Flower (CC0)',
        year: 'MDN',
        duration: '≈1.1MB',
        desc: '来源：interactive-examples.mdn.mozilla.net',
        src: flowerSource,
      },
      {
        id: 'm2',
        title: 'For Bigger Joyrides',
        year: 'Google Sample',
        duration: '≈2.3MB',
        desc: '来源：gtv-videos-bucket/sample',
        src: joyridesSource,
      },
      {
        id: 'm3',
        title: 'For Bigger Escapes',
        year: 'Google Sample',
        duration: '≈2.2MB',
        desc: '来源：gtv-videos-bucket/sample',
        src: escapesSource,
      },
      {
        id: 'm4',
        title: 'For Bigger Meltdowns',
        year: 'Google Sample',
        duration: '≈2.2MB',
        desc: '来源：gtv-videos-bucket/sample',
        src: meltdownsSource,
      },
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
    playerRef.current?.playFromUserGesture?.(true)
  }, [])

  const reviews = [
    {
      id: 'r1',
      user: '影迷A',
      date: '2025-12-20',
      title: '节奏很舒服，氛围拉满',
      content: '摄影和配乐非常加分，几段长镜头很有沉浸感。剧情不复杂但情绪很到位。',
    },
    {
      id: 'r2',
      user: '影迷B',
      date: '2025-12-19',
      title: '中段略拖，但结尾不错',
      content: '人物动机交代得更细会更好，不过最后的收束很干净，整体观感在线。',
    },
    {
      id: 'r3',
      user: '影迷C',
      date: '2025-12-18',
      title: '适合周末放松看',
      content: '不靠大起大落取胜，细节挺耐看。推荐开小音量慢慢看。',
    },
  ]

  return (
    <FixTabPanel fill={false}>
      <section className={styles.page}>
        <div className={styles.layout}>
          <div className={`${styles.card} ${styles.mainCard}`}>
            <div className={styles.playerSection}>
              <SmartVideoPlayer ref={playerRef} src={currentMovie?.src} />
            </div>

            <section className={styles.comments} aria-label="电影评论讨论区">
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

          <aside className={`${styles.card} ${styles.sidebarCard}`} aria-label="电影列表">
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
                  role="button"
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
