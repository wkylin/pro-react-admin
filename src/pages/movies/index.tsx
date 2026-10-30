import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowDownRight, ArrowRight, BookOpen, ExternalLink, Headphones, Play, X } from 'lucide-react'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useProThemeContext } from '@/theme/hooks'
import SmartVideoPlayer from '@wui/media/SmartVideoPlayer'
import { cinemaFilms, type CinemaFilm } from './films'
import styles from './index.module.less'

const playerConfig = { autoPlay: true, autoMute: false, miniPlayer: false, lazyPlay: false, ytControls: true }

function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
  if (event.key !== 'Tab') return
  const controls = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]')
  ).filter((control) => control.getClientRects().length > 0)
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (!first || !last) return
  if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

export default function Cinema() {
  const { t, i18n } = useTranslation()
  const { resolvedTheme } = useProThemeContext()
  const [activeFilm, setActiveFilm] = useState<CinemaFilm | null>(null)
  const [playbackQuality, setPlaybackQuality] = useState<'hd' | '4k'>('hd')
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const featured = cinemaFilms[0]

  useEffect(() => {
    if (!activeFilm) return
    dialogRef.current?.focus()
    return () => triggerRef.current?.focus()
  }, [activeFilm])

  const openFilm = (film: CinemaFilm, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setPlaybackQuality('hd')
    setActiveFilm(film)
  }

  return (
    <FixTabPanel className={styles.scroll} fill={false} showScrollProgress={false}>
      <main className={styles.page} data-theme={resolvedTheme}>
        <div className={styles.shell}>
          <header className={styles.masthead}>
            <div className={styles.brand}>
              <span className={styles.brandMark}>◉</span>
              <span>
                {t('leisure.brand')} <small>{t('leisure.tagline')}</small>
              </span>
            </div>
            <nav aria-label={t('leisure.navigation')} className={styles.nav}>
              <Link to="/reading">
                <BookOpen size={16} /> {t('leisure.reading')}
              </Link>
              <Link to="/music">
                <Headphones size={16} /> {t('leisure.music')}
              </Link>
              <span className={styles.current} aria-current="page">
                {t('leisure.cinema')}
              </span>
            </nav>
          </header>

          <section className={styles.hero} aria-labelledby="cinema-title">
            <img src={featured.still} alt="" className={styles.heroImage} />
            <div className={styles.heroShade} />
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>
                <span className={styles.redDot} /> {t('cinemaRoom.eyebrow')}
              </p>
              <h1 id="cinema-title">
                {t('cinemaRoom.titleFirst')}
                <br />
                <em>{t('cinemaRoom.titleSecond')}</em>
              </h1>
              <p className={styles.heroDescription}>{t('cinemaRoom.introduction')}</p>
              <button
                type="button"
                className={styles.watchButton}
                onClick={(event) => openFilm(featured, event.currentTarget)}
              >
                <span className={styles.playDisc}>
                  <Play size={17} fill="currentColor" aria-hidden="true" />
                </span>
                {t('cinemaRoom.playFeatured')} <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
            <div className={styles.featuredCaption}>
              <span>{t('cinemaRoom.nowShowing')} — 01 / 04</span>
              <strong>{featured.originalTitle}</strong>
              <span>
                {featured.duration} · {featured.quality}
              </span>
            </div>
          </section>

          <section className={styles.collection} aria-labelledby="films-title">
            <div className={styles.sectionTopline}>
              <span>{t('cinemaRoom.collection')}</span>
              <span>{t('cinemaRoom.collectionCount')}</span>
            </div>
            <div className={styles.sectionHeading}>
              <div>
                <p>{t('cinemaRoom.selected')}</p>
                <h2 id="films-title">
                  {t('cinemaRoom.collectionTitle')}
                  <em>{t('cinemaRoom.collectionTitleEmphasis')}</em>
                </h2>
              </div>
              <p>
                {t('cinemaRoom.collectionHintFirst')}
                <br />
                {t('cinemaRoom.collectionHintSecond')}
              </p>
            </div>
            <div className={styles.filmGrid}>
              {cinemaFilms.map((film, index) => (
                <button
                  type="button"
                  key={film.id}
                  className={styles.filmCard}
                  aria-label={t('cinemaRoom.filmButton', {
                    title: film.title,
                    originalTitle: film.originalTitle,
                    quality: film.quality,
                  })}
                  onClick={(event) => openFilm(film, event.currentTarget)}
                >
                  <span className={styles.poster}>
                    <img src={film.still} alt="" loading="lazy" />
                    <span className={styles.posterIndex}>0{index + 1}</span>
                    <span className={styles.posterPlay}>
                      <Play size={20} fill="currentColor" aria-hidden="true" />
                    </span>
                    <span className={styles.posterQuality}>{film.quality}</span>
                  </span>
                  <span className={styles.filmMeta}>
                    <span>
                      {film.year} <i /> {film.duration} <i /> {film.genre}
                    </span>
                    <ArrowDownRight size={18} aria-hidden="true" />
                  </span>
                  <span className={styles.filmTitle}>
                    {film.title} <small>{film.originalTitle}</small>
                  </span>
                  <span className={styles.filmSynopsis}>{film.editorial}</span>
                </button>
              ))}
            </div>
          </section>

          <aside className={styles.programNote}>
            <div className={styles.programSymbol}>✳</div>
            <div>
              <span>{t('cinemaRoom.about')}</span>
              <p>{t('cinemaRoom.aboutText')}</p>
            </div>
            <a href="https://studio.blender.org/films/" target="_blank" rel="noopener noreferrer">
              {t('cinemaRoom.blenderStudio')} <ExternalLink size={15} aria-hidden="true" />
            </a>
          </aside>
          <footer className={styles.footer}>
            <span>{t('cinemaRoom.footer')}</span>
            <Link to="/reading">
              {t('cinemaRoom.toReading')} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </footer>
        </div>
      </main>

      {activeFilm &&
        createPortal(
          <div
            ref={dialogRef}
            className={styles.overlay}
            data-theme={resolvedTheme}
            role="dialog"
            aria-modal="true"
            aria-labelledby="screening-title"
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                setActiveFilm(null)
              } else trapFocus(event)
            }}
            onClick={() => setActiveFilm(null)}
          >
            <div className={styles.theater} onClick={(event) => event.stopPropagation()}>
              <div className={styles.theaterHead}>
                <div>
                  <span>{t('cinemaRoom.screening')}</span>
                  <h2 id="screening-title">
                    {activeFilm.title} <small>{activeFilm.originalTitle}</small>
                  </h2>
                </div>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setActiveFilm(null)}
                  aria-label={t('cinemaRoom.close')}
                >
                  <X size={21} />
                </button>
              </div>
              <div className={styles.qualityRow}>
                <span>
                  {t('cinemaRoom.playerTechnology')} · {t('cinemaRoom.playbackQuality')}
                </span>
                <div role="group" aria-label={t('cinemaRoom.playbackQuality')}>
                  <button
                    type="button"
                    aria-pressed={playbackQuality === 'hd'}
                    onClick={() => setPlaybackQuality('hd')}
                  >
                    {activeFilm.stream4k ? t('cinemaRoom.hd') : t('cinemaRoom.hdOriginal')}
                  </button>
                  {activeFilm.stream4k && (
                    <button
                      type="button"
                      aria-pressed={playbackQuality === '4k'}
                      onClick={() => setPlaybackQuality('4k')}
                    >
                      4K UHD
                    </button>
                  )}
                </div>
                <small>{t('cinemaRoom.qualityChange')}</small>
              </div>
              <div className={styles.screen}>
                <SmartVideoPlayer
                  key={`${activeFilm.id}-${playbackQuality}`}
                  provider="html5"
                  src={playbackQuality === '4k' && activeFilm.stream4k ? activeFilm.stream4k : activeFilm.streamHd}
                  poster={activeFilm.still}
                  title={activeFilm.originalTitle}
                  language={i18n.language.startsWith('zh') ? 'zh' : 'en'}
                  initialConfig={playerConfig}
                />
              </div>
              <div className={styles.theaterDetails}>
                <div>
                  <span className={styles.theaterTag}>
                    {activeFilm.year} · {activeFilm.genre} · {activeFilm.quality}
                  </span>
                  <p>{activeFilm.synopsis}</p>
                  <small>{activeFilm.qualityDetail}</small>
                  <small className={styles.credit}>
                    {activeFilm.attribution} · {activeFilm.license} ·{' '}
                    <a href={activeFilm.sourcePage} target="_blank" rel="noopener noreferrer">
                      {t('cinemaRoom.sourceAndLicense')} <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </small>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${activeFilm.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('cinemaRoom.officialChannel')} <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </FixTabPanel>
  )
}
