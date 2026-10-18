import { useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from 'react'
import { createPortal } from 'react-dom'
import { PageFlip } from 'page-flip/src/PageFlip'
import type { FlipCorner } from 'page-flip/src/Flip/Flip'
import type { SizeType } from 'page-flip/src/Settings'
import styles from './index.module.less'

// Use the source entry so the disposal fix in patches/page-flip@2.0.7.patch applies.
const bottomCorner = 'bottom' as FlipCorner

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
  })

  useImperativeHandle(
    ref,
    () => ({
      next() {
        const engine = engineRef.current
        if (!engine) return
        if (reducedMotion) engine.turnToNextPage()
        else engine.flipNext(bottomCorner)
      },
      previous() {
        const engine = engineRef.current
        if (!engine) return
        if (reducedMotion) engine.turnToPrevPage()
        else engine.flipPrev(bottomCorner)
      },
      goTo(page, animate = true) {
        const engine = engineRef.current
        if (!engine) return
        engine.getRender().finishAnimation()
        if (animate && !reducedMotion) engine.flip(page, bottomCorner)
        else engine.turnToPage(page)
      },
      getPage: () => engineRef.current?.getCurrentPageIndex() ?? 0,
    }),
    [reducedMotion]
  )

  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return
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
      showPageCorners: showCorners && !reducedMotion,
      disableFlipByClick: true,
      mobileScrollSupport: true,
      clickEventForward: true,
      swipeDistance: 35,
    })

    let ready = false
    let turning = false
    const reportPage = (page: number) => {
      pageElements.forEach((element, index) => {
        const visible = index === page || (!single && page > 0 && page < pageElements.length - 1 && index === page + 1)
        element.inert = !visible
        element.setAttribute('aria-hidden', String(!visible))
      })
      eventsRef.current.onFlip(page)
    }
    engine.on('flip', ({ data }) => {
      if (ready) reportPage(Number(data))
    })
    engine.on('changeState', ({ data }) => {
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
      engine.getRender().finishAnimation()
      engine.destroy()
      engineRef.current = null
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
