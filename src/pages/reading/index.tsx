import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, Film, Headphones, RotateCw, X } from 'lucide-react'
import FixTabPanel from '@shared/ui/FixTabPanel'
import { useProThemeContext } from '@/theme/hooks'
import InteractiveBook from '@/pages/mediaAdapters/InteractiveBook'
import { BookCover3D } from '@wui/media/InteractiveBook/BookVolume'
import { createReadingPages, readingBooks, type ReadingBook, type ReadingText } from './books'
import styles from './index.module.less'

function getBookSize() {
  if (typeof window === 'undefined') return { width: 340, height: 480 }
  return {
    width: Math.min(340, Math.max(240, window.innerWidth - 68)),
    height: Math.min(480, Math.max(350, window.innerHeight - 160)),
  }
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

function RotatableBook({
  book,
  onOpen,
  ariaLabel,
  instruction,
  compact = false,
}: {
  book: ReadingBook
  onOpen: (trigger: HTMLButtonElement) => void
  ariaLabel: string
  instruction: string
  compact?: boolean
}) {
  const [angle, setAngle] = useState({ pitch: 4, yaw: -12 })
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{
    x: number
    y: number
    pitch: number
    yaw: number
    lastX: number
    lastTime: number
    velocity: number
    moved: boolean
  } | null>(null)
  const suppressClick = useRef(false)

  const pointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || !event.isPrimary) return
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      pitch: angle.pitch,
      yaw: angle.yaw,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      moved: false,
    }
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const pointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const start = drag.current
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) + Math.abs(dy) > 7) start.moved = true
    const elapsed = Math.max(1, event.timeStamp - start.lastTime)
    start.velocity = (event.clientX - start.lastX) / elapsed
    start.lastX = event.clientX
    start.lastTime = event.timeStamp
    setAngle({
      pitch: Math.max(-30, Math.min(30, start.pitch - dy * 0.16)),
      yaw: start.yaw + dx * 0.55,
    })
  }
  const pointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const finished = drag.current
    if (!finished) return
    suppressClick.current = finished.moved
    if (finished.moved)
      setAngle({
        pitch: Math.max(-30, Math.min(30, finished.pitch - (event.clientY - finished.y) * 0.16)),
        yaw: finished.yaw + (event.clientX - finished.x) * 0.55 + Math.max(-18, Math.min(18, finished.velocity * 45)),
      })
    drag.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
    window.setTimeout(() => {
      suppressClick.current = false
    }, 120)
  }

  return (
    <button
      className={`${styles.rotatableBook} ${compact ? styles.railRotatable : ''}`}
      type="button"
      aria-label={ariaLabel}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          setAngle((current) => ({ ...current, yaw: current.yaw + (event.key === 'ArrowLeft' ? -20 : 20) }))
        }
      }}
      onClick={(event) => {
        if (suppressClick.current) {
          suppressClick.current = false
          return
        }
        onOpen(event.currentTarget)
      }}
    >
      <span
        className={styles.rotatingBody}
        data-dragging={dragging}
        style={{ '--book-preview-pitch': `${angle.pitch}deg`, '--book-preview-y': `${angle.yaw}deg` } as CSSProperties}
      >
        <BookCover3D
          coverImage={book.cover}
          title={book.title}
          author={book.author}
          coverColor={book.coverColor}
          coverTitleColor={book.titleColor}
          coverTextColor={book.titleColor}
          coverStyle="illustrated"
          textured
          thickness={42}
          backCoverContent={<p>{book.description}</p>}
        />
      </span>
      <span className={styles.rotateInstruction}>
        <RotateCw size={14} aria-hidden="true" /> {instruction}
      </span>
    </button>
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
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const focused = readingBooks[focusIndex]
  const pages = useMemo(() => (readerText ? createReadingPages(readerText, bookSize) : []), [readerText, bookSize])

  useEffect(() => {
    const updateSize = () => setBookSize(getBookSize())
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (!selectedBook) return
    let mounted = true
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
    dialogRef.current?.focus()
    return () => {
      mounted = false
      triggerRef.current?.focus()
    }
  }, [selectedBook])

  useEffect(() => {
    if (!readerText) return
    const timer = window.setTimeout(() => setBookOpen(true), reducedMotion ? 0 : 400)
    return () => window.clearTimeout(timer)
  }, [readerText, reducedMotion])

  const openBook = (book: ReadingBook, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setBookOpen(false)
    setSelectedBook(book)
  }
  const closeBook = () => {
    setSelectedBook(null)
    setBookOpen(false)
  }

  return (
    <FixTabPanel className={styles.scroll} fill={false} showScrollProgress={false}>
      <main className={styles.page} data-theme={resolvedTheme}>
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
                  initial={reducedMotion ? false : { opacity: 0, x: 65, rotateY: -18 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -35 }}
                  transition={{ duration: reducedMotion ? 0 : 0.42 }}
                >
                  <RotatableBook
                    book={focused}
                    onOpen={(trigger) => openBook(focused, trigger)}
                    ariaLabel={t('readingRoom.rotateOrOpen', { title: focused.title })}
                    instruction={t('readingRoom.dragInstruction')}
                  />
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
                  <RotatableBook
                    book={book}
                    compact
                    onOpen={(trigger) => openBook(book, trigger)}
                    ariaLabel={t('readingRoom.rotateOrOpen', { title: book.title })}
                    instruction={t('readingRoom.dragInstruction')}
                  />
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
              onClick={closeBook}
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
                {readerText ? (
                  <InteractiveBook
                    key={`${selectedBook.id}-${bookSize.width}-${bookSize.height}`}
                    className={styles.readerBook}
                    coverImage={selectedBook.cover}
                    coverColor={selectedBook.coverColor}
                    coverTitleColor={selectedBook.titleColor}
                    coverTextColor={selectedBook.titleColor}
                    coverStyle="illustrated"
                    bookTitle={selectedBook.title}
                    bookAuthor={selectedBook.author}
                    backCoverContent={<p>{selectedBook.description}</p>}
                    pages={pages}
                    width={bookSize.width}
                    height={bookSize.height}
                    pagePadding="14px 20px 10px"
                    mode="auto"
                    open={bookOpen}
                    enableSound={false}
                    textured
                    fontFamily="'Songti SC', 'Noto Serif CJK SC', 'Source Han Serif SC', Georgia, serif"
                    paperColor={resolvedTheme === 'dark' ? '#222a31' : '#fbfaf6'}
                    textColor={resolvedTheme === 'dark' ? '#ece8de' : '#24302d'}
                    mutedColor={resolvedTheme === 'dark' ? '#a9b3b5' : '#6e7c76'}
                    ruleColor={resolvedTheme === 'dark' ? '#46545b' : '#d9ded7'}
                    onClose={closeBook}
                  />
                ) : (
                  <div className={styles.loadingBook}>
                    <img src={selectedBook.cover} alt="" />
                    <p>{readerError ? t('readingRoom.loadError') : t('readingRoom.loading')}</p>
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
