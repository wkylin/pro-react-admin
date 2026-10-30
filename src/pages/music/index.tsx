import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BookOpen, Film, Headphones, Play } from 'lucide-react'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useProThemeContext } from '@/theme/hooks'
import MusicPlayer from '@/pages/mediaAdapters/MusicPlayer'
import { TRACKS } from '@/pages/mediaAdapters/MusicPlayerData'
import playlistCover from '@assets/images/music/music02.png'
import styles from './index.module.less'

export default function Music() {
  const { t } = useTranslation()
  const { resolvedTheme } = useProThemeContext()
  const [playRequest, setPlayRequest] = useState(0)

  return (
    <FixTabPanel className={styles.scroll} fill={false} showScrollProgress={false}>
      <main className={styles.page} data-theme={resolvedTheme}>
        <div className={styles.shell}>
          <header className={styles.masthead}>
            <span className={styles.brand}>
              <Headphones size={18} strokeWidth={1.5} aria-hidden="true" /> {t('leisure.brand')}{' '}
              <small>{t('musicRoom.brandRoom')}</small>
            </span>
            <nav aria-label={t('leisure.navigation')} className={styles.nav}>
              <Link to="/reading">
                <BookOpen size={16} /> {t('leisure.reading')}
              </Link>
              <span className={styles.current} aria-current="page">
                {t('leisure.music')}
              </span>
              <Link to="/movies">
                <Film size={16} /> {t('leisure.cinema')}
              </Link>
            </nav>
          </header>

          <section className={styles.playlistHero} aria-labelledby="music-title">
            <div className={styles.playlistArtwork}>
              <img src={playlistCover} alt="" />
              <span>
                {t('musicRoom.artworkFirst')}
                <br />
                {t('musicRoom.artworkSecond')}
              </span>
            </div>
            <div className={styles.playlistCopy}>
              <p className={styles.eyebrow}>{t('musicRoom.eyebrow')}</p>
              <h1 id="music-title">{t('musicRoom.title')}</h1>
              <p className={styles.curator}>
                {t('musicRoom.curator')} <span>·</span> {TRACKS.length} {t('musicRoom.tracks')}
              </p>
              <p className={styles.description}>{t('musicRoom.description')}</p>
              <button type="button" className={styles.playAll} onClick={() => setPlayRequest((count) => count + 1)}>
                <Play size={16} fill="currentColor" aria-hidden="true" /> {t('musicRoom.playAll')}
              </button>
            </div>
          </section>

          <section className={styles.library} aria-label={t('musicRoom.trackList')}>
            <div className={styles.libraryHeading}>
              <span>{t('musicRoom.trackList')}</span>
              <span>{t('musicRoom.localAudio')}</span>
            </div>
            <MusicPlayer appearance="playlist" playRequest={playRequest} />
          </section>
          <footer className={styles.footer}>
            <span>{t('musicRoom.footer')}</span>
            <div>
              <Link to="/reading">
                {t('leisure.reading')} <ArrowRight size={14} />
              </Link>
              <Link to="/movies">
                {t('leisure.cinema')} <ArrowRight size={14} />
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </FixTabPanel>
  )
}
