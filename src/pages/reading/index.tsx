import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, Film, Headphones, X } from 'lucide-react'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useProThemeContext } from '@/theme/hooks'
import InteractiveBook from '@/pages/mediaAdapters/InteractiveBook'
import { createReadingPages, getReadingBookAppearance, readingBooks, type ReadingBook, type ReadingText } from './books'
import styles from './index.module.less'

function getBookSize() {
  if (typeof window === 'undefined') return { width: 380, height: 540 }
  const columns = window.innerWidth > 768 ? 2 : 1
  const width = Math.floor(
    Math.max(120, Math.min(430, (window.innerWidth - 96) / columns, (window.innerHeight - 190) / 1.43))
  )
  return { width, height: Math.round(width * 1.43) }
}

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

const previewPages = [{ pageNumber: 1, content: null }]

function BookPreview({ book, onOpen }: { book: ReadingBook; onOpen: () => void }) {
  const appearance = useMemo(() => getReadingBookAppearance(book), [book])
  return (
    <InteractiveBook
      {...appearance}
      key={book.id}
      className={styles.previewBook}
      pages={previewPages}
      width={300}
      height={426}
      tilt={4}
      rotation={32}
      mode="single"
      onOpenRequest={onOpen}
      frontMatter={false}
      backMatter={false}
      enableKeyboard={false}
      enableSound={false}
      showNavigation={false}
      showViewControls={false}
    />
  )
}

export default function ReadingRoom() {
  const { t } = useTranslation()
  const { resolvedTheme } = useProThemeContext()
  const reducedMotion = useReducedMotion()
  const [focusIndex, setFocusIndex] = useState(0)
  const [selectedBook, setSelectedBook] = useState<ReadingBook | null>(null)
  const [readerText, setReaderText] = useState<ReadingText | null>(null)
  const [readerError, setReaderError] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [bookSize, setBookSize] = useState(getBookSize)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const focused = readingBooks[focusIndex]
  const pages = useMemo(() => (readerText ? createReadingPages(readerText) : []), [readerText])
  const readerAppearance = useMemo(() => (selectedBook ? getReadingBookAppearance(selectedBook) : null), [selectedBook])

  const readerMatter = useMemo(
    () =>
      selectedBook
        ? {
            publication: {
              publisher: t('readingRoom.sourceBrand'),
              details: [
                {
                  label: t('readingRoom.sourceLink'),
                  value: (
                    <a href={selectedBook.source} target="_blank" rel="noopener noreferrer">
                      {t('readingRoom.sourceBrand')}
                    </a>
                  ),
                },
              ],
            },
            frontMatter: { dedication: selectedBook.quote, preface: selectedBook.description },
            backMatter: { content: <p>{t('readingRoom.closingNote', { title: selectedBook.title })}</p> },
          }
        : {},
    [selectedBook, t]
  )

  useEffect(() => {
    const updateSize = () => setBookSize(getBookSize())
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (!selectedBook) return
    let mounted = true
    const preview = previewRef.current
    setReaderText(null)
    setReaderError(false)
    selectedBook
      .load()
      .then((book) => {
        if (mounted) setReaderText(book)
      })
      .catch(() => {
        if (mounted) setReaderError(true)
      })
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      mounted = false
      document.body.style.overflow = previousOverflow
      const trigger = triggerRef.current
      // Resizing can replace the preview's cover button while its mesh is recaptured.
      if (trigger?.isConnected) trigger.focus()
      else preview?.querySelector<HTMLButtonElement>('[data-book-cover-trigger]')?.focus()
    }
  }, [selectedBook])

  const openBook = (book: ReadingBook, trigger = document.activeElement) => {
    triggerRef.current = trigger instanceof HTMLElement ? trigger : null
    setReaderText(null)
    setReaderError(false)
    setBookOpen(true)
    setSelectedBook(book)
  }
  const dismissReader = () => {
    setSelectedBook(null)
    setBookOpen(false)
  }
  const closeBook = () => {
    if (!readerText) dismissReader()
    else setBookOpen(false)
  }

  return (
    <FixTabPanel className={styles.scroll} fill={false} showScrollProgress={false}>
      <main className={styles.page} data-theme={resolvedTheme} inert={!!selectedBook}>
        <div className={styles.shell}>
          <header className={styles.masthead}>
            <span className={styles.brand}>
              <BookOpen size={19} strokeWidth={1.5} aria-hidden="true" /> {t('leisure.brand')}{' '}
              <small>{t('readingRoom.brandRoom')}</small>
            </span>
            <nav aria-label={t('leisure.navigation')} className={styles.nav}>
              <span className={styles.current} aria-current="page">
                {t('leisure.reading')}
              </span>
              <Link to="/music">
                <Headphones size={16} /> {t('leisure.music')}
              </Link>
              <Link to="/movies">
                <Film size={16} /> {t('leisure.cinema')}
              </Link>
            </nav>
          </header>

          <section className={styles.intro} aria-labelledby="reading-title">
            <p className={styles.eyebrow}>
              {t('readingRoom.newEyebrow')} <span>— 04 / 04</span>
            </p>
            <h1 id="reading-title">
              {t('readingRoom.newTitleFirst')}
              <br />
              <em>{t('readingRoom.newTitleSecond')}</em>
            </h1>
            <p>{t('readingRoom.newIntroduction')}</p>
          </section>

          <section className={styles.spotlight} aria-label={t('readingRoom.featuredLabel')}>
            <div className={styles.spotlightStage}>
              <span className={styles.stageCaption}>
                {t('readingRoom.inFocus')} / 0{focusIndex + 1}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={focused.id}
                  className={styles.focusBookWrap}
                  ref={previewRef}
                  initial={reducedMotion ? false : { opacity: 0, x: 65, rotateY: -18 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -35 }}
                  transition={{ duration: reducedMotion ? 0 : 0.42 }}
                >
                  <BookPreview book={focused} onOpen={() => openBook(focused)} />
                </motion.div>
              </AnimatePresence>
              <span className={styles.stageBottom}>
                {t('readingRoom.completeText')} · {t('readingRoom.sourceBrand')}
              </span>
            </div>
            <div className={styles.spotlightCopy}>
              <div className={styles.copyTop}>
                <span>{focused.category}</span>
                <span>
                  {String(focused.sectionCount).padStart(3, '0')} {t('readingRoom.sections')}
                </span>
              </div>
              <div className={styles.copyMiddle}>
                <p className={styles.bookNumber}>
                  {t('readingRoom.volumeLabel', { current: focusIndex + 1, total: readingBooks.length })}
                </p>
                <h2>{focused.title}</h2>
                <p className={styles.bookAuthor}>
                  {focused.author} <span>·</span> {t('readingRoom.originalText')}
                </p>
                <p className={styles.bookSummary}>{focused.description}</p>
                <blockquote>“{focused.quote}”</blockquote>
              </div>
              <div className={styles.copyActions}>
                <button
                  type="button"
                  className={styles.openButton}
                  onClick={(event) => openBook(focused, event.currentTarget)}
                >
                  {t('readingRoom.openBook')} <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <a href={focused.source} target="_blank" rel="noopener noreferrer">
                  {t('readingRoom.sourceLink')} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section className={styles.collection} aria-labelledby="collection-title">
            <div className={styles.collectionHead}>
              <span>{t('readingRoom.collection')}</span>
              <h2 id="collection-title">{t('readingRoom.collectionTitle')}</h2>
              <p>{t('readingRoom.collectionHintFirst')}</p>
            </div>
            <div className={styles.bookRail}>
              {readingBooks.map((book, index) => (
                <div key={book.id} className={styles.railItem} data-active={index === focusIndex}>
                  <button
                    type="button"
                    className={styles.railCover}
                    onClick={(event) => openBook(book, event.currentTarget)}
                    aria-label={t('readingRoom.dialogTitle', { title: book.title })}
                  >
                    <img src={book.cover} alt="" loading="lazy" />
                  </button>
                  <button
                    type="button"
                    className={styles.railSelect}
                    aria-pressed={index === focusIndex}
                    aria-label={t('readingRoom.selectBook', { title: book.title })}
                    onClick={() => setFocusIndex(index)}
                  >
                    <span className={styles.railMeta}>
                      <small>
                        0{index + 1} / {book.category}
                      </small>
                      <strong>{book.title}</strong>
                      <span>
                        {book.author} · {book.sectionCount} {t('readingRoom.sections')}
                      </span>
                    </span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </section>
          <footer className={styles.footer}>
            <span>
              {t('readingRoom.footer')} ·{' '}
              <a href="https://www.gutenberg.org/browse/languages/zh" target="_blank" rel="noopener noreferrer">
                {t('readingRoom.sourceBrand')}
              </a>
            </span>
            <Link to="/movies">
              {t('readingRoom.toCinema')} <ArrowRight size={16} />
            </Link>
          </footer>
        </div>
      </main>

      {createPortal(
        <AnimatePresence>
          {selectedBook && (
            <motion.div
              ref={dialogRef}
              className={styles.overlay}
              data-theme={resolvedTheme}
              role="dialog"
              aria-modal="true"
              aria-label={t('readingRoom.dialogTitle', { title: selectedBook.title })}
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.28 }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault()
                  event.stopPropagation()
                  closeBook()
                } else trapFocus(event)
              }}
              onClick={(event) => {
                if (event.target === event.currentTarget) closeBook()
              }}
            >
              <div className={styles.readerTopbar}>
                <span>
                  <BookOpen size={17} /> {selectedBook.title} <small>· {selectedBook.author}</small>
                </span>
                <button type="button" onClick={closeBook} aria-label={t('readingRoom.close')}>
                  <X size={19} />
                </button>
              </div>
              <motion.div
                className={styles.readerStage}
                onClick={(event) => event.stopPropagation()}
                initial={reducedMotion ? false : { y: 64, scale: 0.78, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 0.7, 0.25, 1] }}
              >
                {readerText && readerAppearance ? (
                  <InteractiveBook
                    {...readerAppearance}
                    key={selectedBook.id}
                    className={styles.readerBook}
                    {...readerMatter}
                    pages={pages}
                    width={bookSize.width}
                    height={bookSize.height}
                    mode="auto"
                    open={bookOpen}
                    textured
                    fontFamily="'Songti SC', 'Noto Serif CJK SC', 'Source Han Serif SC', Georgia, serif"
                    paperColor={resolvedTheme === 'dark' ? '#222a31' : '#fbfaf6'}
                    textColor={resolvedTheme === 'dark' ? '#ece8de' : '#24302d'}
                    mutedColor={resolvedTheme === 'dark' ? '#a9b3b5' : '#6e7c76'}
                    ruleColor={resolvedTheme === 'dark' ? '#46545b' : '#d9ded7'}
                    onClose={dismissReader}
                  />
                ) : (
                  <div className={styles.loadingBook}>
                    <img src={selectedBook.cover} alt="" />
                    <p role={readerError ? 'alert' : 'status'}>
                      {readerError ? t('readingRoom.loadError') : t('readingRoom.loading')}
                    </p>
                  </div>
                )}
              </motion.div>
              <p className={styles.readerHint}>{t('readingRoom.hint')}</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </FixTabPanel>
  )
}
