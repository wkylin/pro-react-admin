import { useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { createPortal } from 'react-dom'
import { flushSync } from 'react-dom'
import { BookFlipEngine, type TurnFrame, type BookTurnSoundEvent } from './BookFlipEngine'
import styles from './index.module.less'

export interface FlipPage {
  key: string
  content: ReactNode
  className: string
  density?: 'soft' | 'hard'
}

export interface PageFlipHandle {
  next: () => void
  previous: () => void
  goTo: (page: number, animate?: boolean) => void
  getPage: () => number
  close: () => void
  stop: () => void
}

interface PageFlipRendererProps {
  ref: Ref<PageFlipHandle>
  pages: FlipPage[]
  width: number
  height: number
  single: boolean
  startPage: number
  interactive: boolean
  showCorners: boolean
  reducedMotion: boolean
  onFlip: (page: number) => void
  onTurning: (turning: boolean) => void
  onTurnStart?: (event: BookTurnSoundEvent) => void
}

/** Keeps React page content mounted while the local engine moves its page shells. */
export default function PageFlipRenderer({
  ref,
  pages,
  width,
  height,
  single,
  startPage,
  interactive,
  showCorners,
  reducedMotion,
  onFlip,
  onTurning,
  onTurnStart,
}: PageFlipRendererProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<BookFlipEngine | null>(null)
  const eventsRef = useRef({ onFlip, onTurning, onTurnStart })
  const startPageRef = useRef(startPage)
  const interactionRef = useRef({ interactive, showCorners })
  const [activePage, setActivePage] = useState(startPage)
  startPageRef.current = startPage
  interactionRef.current = { interactive, showCorners }
  const [pageElements] = useState(() =>
    pages.map((page) => {
      const element = document.createElement('div')
      element.className = page.className
      element.dataset.density = page.density ?? 'soft'
      const content = document.createElement('div')
      content.className = 'bookFlipContent'
      element.appendChild(content)
      return element
    })
  )

  useLayoutEffect(() => {
    eventsRef.current = { onFlip, onTurning, onTurnStart }
    engineRef.current?.setInteraction(interactive, showCorners && !reducedMotion)
  })

  useImperativeHandle(
    ref,
    () => ({
      next: () => engineRef.current?.next(),
      previous: () => engineRef.current?.previous(),
      close: () => engineRef.current?.close(),
      stop: () => engineRef.current?.stop(),
      goTo: (page, animate = true) => {
        // Animated routes render around each committed page; only instant jumps prepare the destination here.
        if ((!animate || reducedMotion) && Math.abs(page - (engineRef.current?.getPage() ?? 0)) > 8) {
          flushSync(() => setActivePage(page))
        }
        engineRef.current?.goTo(page, animate)
      },
      getPage: () => engineRef.current?.getPage() ?? 0,
    }),
    [reducedMotion]
  )

  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return
    const book = host.parentElement
    const lastPage = pageElements.length - 1
    let engine: BookFlipEngine | null = null

    const positionCover = (openness: number, back = false, moving = false) => {
      book?.style.setProperty('--book-openness', String(Math.max(0, Math.min(1, openness))))
      book?.style.setProperty('--book-side', back ? '1' : '0')
      book?.toggleAttribute('data-cover-turning', moving)
    }
    const positionPages = (page: number) => {
      book?.style.setProperty('--book-read-progress', String(Math.max(0, Math.min(1, page / Math.max(1, lastPage)))))
    }
    const syncFrame = (frame: TurnFrame | null) => {
      book?.toggleAttribute('data-book-animating', !!frame)
      if (!frame) {
        const page = engine?.getPage() ?? startPageRef.current
        positionPages(page)
        positionCover(page > 0 && page < lastPage ? 1 : 0, page === lastPage)
        return
      }
      const { from, to, progress, preview } = frame
      positionPages(from + (to - from) * progress)
      if (preview) {
        positionCover(1, to === lastPage || from === lastPage)
      } else if (from === 0 && to > 0) {
        positionCover(progress, false, true)
      } else if (to === 0) {
        positionCover(1 - progress, false, true)
      } else if (to === lastPage) {
        positionCover(1 - progress, true, true)
      } else if (from === lastPage) {
        positionCover(progress, true, true)
      } else {
        positionCover(1)
      }
    }

    engine = new BookFlipEngine({
      host,
      pages: pageElements,
      width,
      height,
      single,
      startPage: startPageRef.current,
      interactive: interactionRef.current.interactive,
      showCorners: interactionRef.current.showCorners && !reducedMotion,
      reducedMotion,
      onPage: (page) => {
        setActivePage(page)
        eventsRef.current.onFlip(page)
      },
      onTurning: (turning) => eventsRef.current.onTurning(turning),
      onFrame: syncFrame,
      onTurnStart: (event) => eventsRef.current.onTurnStart?.(event),
    })
    engineRef.current = engine
    syncFrame(null)

    return () => {
      engine?.destroy()
      engineRef.current = null
      book?.removeAttribute('data-book-animating')
      book?.removeAttribute('data-cover-turning')
    }
  }, [width, height, single, reducedMotion, pageElements])

  return (
    <>
      <div ref={hostRef} className={styles.flipHost} />
      {pages.map((page, index) =>
        index < 2 || index >= pages.length - 2 || Math.abs(index - activePage) <= 8
          ? createPortal(page.content, pageElements[index].firstElementChild!, page.key)
          : null
      )}
    </>
  )
}
