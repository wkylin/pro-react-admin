import { useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { createPortal } from 'react-dom'
import { PageFlip } from 'page-flip/src/PageFlip'
import { FlipDirection, type FlipCorner } from 'page-flip/src/Flip/Flip'
import { PageDensity } from 'page-flip/src/Page/Page'
import type { SizeType } from 'page-flip/src/Settings'
import styles from './index.module.less'

// Use the source entry so the disposal fix in patches/page-flip@2.0.7.patch applies.
const bottomCorner = 'bottom' as FlipCorner

function updateCornerPreview(engine: PageFlip, enabled: boolean) {
  const page = engine.getCurrentPageIndex()
  const state = engine.getState()
  // The engine listens to window mousemove even when the book is closed. A new
  // hover must also wait for the previous corner's rebound to finish.
  engine.getSettings().showPageCorners =
    enabled &&
    page > 0 &&
    page < engine.getPageCount() - 1 &&
    (state === 'fold_corner' || (state === 'read' && !engine.getFlipController().getCalculation()))
}

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
}

/** StPageFlip owns the page shells; React owns their contents through portals. */
export default function PageFlipRenderer({
  ref,
  pages,
  width,
  height,
  single,
  showCorners,
  reducedMotion,
  ...events
}: PageFlipRendererProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<PageFlip | null>(null)
  const eventsRef = useRef(events)
  const [pageElements] = useState(() =>
    pages.map((page) => {
      const element = document.createElement('div')
      element.className = page.className
      element.dataset.density = page.density ?? 'soft'
      return element
    })
  )

  useLayoutEffect(() => {
    eventsRef.current = events
    const engine = engineRef.current
    if (engine) updateCornerPreview(engine, events.interactive && showCorners && !reducedMotion)
  })

  useImperativeHandle(ref, () => {
    const fromControls = (action: (engine: PageFlip) => void) => {
      const engine = engineRef.current
      if (!engine) return
      // The engine also checks API calls against virtual corners in portrait mode.
      // Restrict pointer clicks to corners while allowing buttons and keyboard navigation.
      const settings = engine.getSettings()
      const cornerOnly = settings.disableFlipByClick
      settings.disableFlipByClick = false
      try {
        action(engine)
      } finally {
        settings.disableFlipByClick = cornerOnly
      }
    }
    return {
      next: () =>
        fromControls((engine) => {
          if (reducedMotion) engine.turnToNextPage()
          else engine.flipNext(bottomCorner)
        }),
      previous: () =>
        fromControls((engine) => {
          if (reducedMotion) engine.turnToPrevPage()
          else engine.flipPrev(bottomCorner)
        }),
      goTo: (page, animate = true) =>
        fromControls((engine) => {
          engine.getRender().finishAnimation()
          if (animate && !reducedMotion) engine.flip(page, bottomCorner)
          else engine.turnToPage(page)
        }),
      getPage: () => engineRef.current?.getCurrentPageIndex() ?? 0,
    }
  }, [reducedMotion])

  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return
    const book = host.parentElement
    // The library removes its root on destroy, so keep that root outside React's tree.
    const root = document.createElement('div')
    root.style.width = `${single ? width : width * 2}px`
    root.style.height = `${height}px`
    host.appendChild(root)

    const engine = new PageFlip(root, {
      width,
      height,
      size: 'fixed' as SizeType,
      autoSize: false,
      usePortrait: single,
      showCover: true,
      startPage: Math.min(eventsRef.current.startPage, pageElements.length - 1),
      flippingTime: reducedMotion ? 1 : 900,
      maxShadowOpacity: 0.24,
      drawShadow: !reducedMotion,
      showPageCorners: false,
      disableFlipByClick: true,
      mobileScrollSupport: true,
      clickEventForward: true,
      swipeDistance: 35,
    })

    let ready = false
    let turning = false
    let coverFrame = 0
    let coverPreview: { back: boolean; spread: number } | null = null
    const lastPage = pageElements.length - 1
    const lastSpread = () => engine.getPageCollection().getSpreadIndexByPage(lastPage)
    const restoreCoverDensity = () => {
      if (!coverPreview) return
      const outerPage = coverPreview.back ? lastPage : 0
      const innerPage = coverPreview.back ? lastPage - 1 : 1
      coverPreview = null
      engine.getPage(outerPage).setDrawingDensity(PageDensity.HARD)
      engine.getPage(innerPage).setDrawingDensity(PageDensity.HARD)
      engine.getRender().clearShadow()
    }
    const positionCover = (openness: number, back = false, moving = false) => {
      // Update decoration geometry without rendering React on every animation frame.
      book?.style.setProperty('--book-openness', String(Math.max(0, Math.min(1, openness))))
      book?.style.setProperty('--book-side', back ? '1' : '0')
      book?.toggleAttribute('data-cover-turning', moving)
    }
    const syncCover = () => {
      coverFrame = 0
      const calculation = engine.getFlipController().getCalculation()
      const spread = engine.getPageCollection().getCurrentSpreadIndex()
      const forward = calculation?.getDirection() === FlipDirection.FORWARD
      book?.toggleAttribute('data-book-animating', !!calculation)
      updateCornerPreview(engine, eventsRef.current.interactive && showCorners && !reducedMotion)
      // Track every turn through its last frame, including ordinary pages and
      // corner rebounds. All decoration and hover state settle together.
      if (calculation) coverFrame = requestAnimationFrame(syncCover)
      if (coverPreview) {
        if (calculation && forward === coverPreview.back && spread === coverPreview.spread) {
          // Both inside covers preview a local curl over a flat, connected spread.
          positionCover(1, coverPreview.back)
          return
        }
        restoreCoverDensity()
      }
      if (calculation && ((forward && spread === 0) || (!forward && spread === 1))) {
        const progress = calculation.getFlippingProgress() / 100
        positionCover(forward ? progress : 1 - progress, false, true)
      } else if (calculation && ((forward && spread === lastSpread() - 1) || (!forward && spread === lastSpread()))) {
        const progress = calculation.getFlippingProgress() / 100
        positionCover(forward ? 1 - progress : progress, true, true)
      } else {
        const page = engine.getCurrentPageIndex()
        positionCover(page > 0 && page < lastPage ? 1 : 0, page === lastPage)
      }
    }
    const reportPage = (page: number) => {
      restoreCoverDensity()
      positionCover(page > 0 && page < lastPage ? 1 : 0, page === lastPage)
      pageElements.forEach((element, index) => {
        const visible = index === page || (!single && page > 0 && page < pageElements.length - 1 && index === page + 1)
        element.inert = !visible
        element.setAttribute('aria-hidden', String(!visible))
      })
      eventsRef.current.onFlip(page)
      updateCornerPreview(engine, eventsRef.current.interactive && showCorners && !reducedMotion)
    }
    engine.on('flip', ({ data }) => {
      if (ready) reportPage(Number(data))
    })
    engine.on('changeState', ({ data }) => {
      if (data === 'user_fold' && (engine.getState() === 'fold_corner' || engine.getState() === 'read')) {
        // fold() keeps hover and rebound animations alive unless they are finished;
        // otherwise their frames overwrite the pointer's position during the drag.
        engine.getRender().finishAnimation()
      }
      // changeState is emitted before the engine stores its new state. Suspend
      // competing hover input immediately, without interrupting an active curl.
      if (data !== 'fold_corner') engine.getSettings().showPageCorners = false
      if (data !== 'read') book?.setAttribute('data-book-animating', '')
      if (data === 'fold_corner' && !single) {
        const spread = engine.getPageCollection().getCurrentSpreadIndex()
        const direction = engine.getFlipController().getCalculation()?.getDirection()
        const back = direction === FlipDirection.FORWARD && spread === lastSpread() - 1
        if (back || (direction === FlipDirection.BACK && spread === 1)) {
          // Contents and end matter are the covers' reverse sides. Curl their corners
          // without moving the whole book, then restore the boards for a committed turn.
          restoreCoverDensity()
          coverPreview = { back, spread }
          engine.getPage(back ? lastPage : 0).setDrawingDensity(PageDensity.SOFT)
          engine.getPage(back ? lastPage - 1 : 1).setDrawingDensity(PageDensity.SOFT)
          positionCover(1, back)
        }
      } else if (data === 'flipping' || data === 'user_fold') {
        restoreCoverDensity()
      }
      // Cover, binding and centering share the engine's angle, including drag rebound.
      // Keep tracking until calculations end: corner previews can rebound in the read state.
      if (!coverFrame) coverFrame = requestAnimationFrame(syncCover)
      const active = data === 'flipping' || data === 'user_fold'
      if (active !== turning) {
        turning = active
        eventsRef.current.onTurning(active)
      }
    })

    // Let long text scroll natively and keep controls usable, including SVGs in buttons.
    const preserveContentInteraction = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const content = target.closest<HTMLElement>('[data-book-scroll]')
      if (
        !eventsRef.current.interactive ||
        target.closest('button, a, input, textarea, select, [contenteditable="true"]') ||
        (content && content.scrollHeight > content.clientHeight + 1)
      ) {
        event.stopPropagation()
      }
    }
    host.addEventListener('mousedown', preserveContentInteraction, true)
    host.addEventListener('touchstart', preserveContentInteraction, true)
    engine.loadFromHTML(pageElements)
    engineRef.current = engine
    ready = true
    eventsRef.current.onTurning(false)
    reportPage(engine.getCurrentPageIndex())

    return () => {
      ready = false
      engine.off('flip')
      engine.off('changeState')
      engine.off('init')
      restoreCoverDensity()
      engine.getRender().finishAnimation()
      cancelAnimationFrame(coverFrame)
      engine.destroy()
      engineRef.current = null
      book?.removeAttribute('data-book-animating')
      host.removeEventListener('mousedown', preserveContentInteraction, true)
      host.removeEventListener('touchstart', preserveContentInteraction, true)
    }
  }, [width, height, single, showCorners, reducedMotion, pageElements])

  return (
    <>
      <div ref={hostRef} className={styles.flipHost} />
      {pages.map((page, index) => createPortal(page.content, pageElements[index], page.key))}
    </>
  )
}
