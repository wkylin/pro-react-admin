import batchBStyles from '../batch-b.module.less'
import { createRef, useRef, useEffect, type ReactNode } from 'react'
import clsx from 'clsx'

// Keep package CSS in runtime builds without leaking a style import into declarations.
void batchBStyles

export type ImageMouseTrailProps = {
  items: string[]
  imageAlt?: (src: string, index: number) => string
  children: ReactNode
  className?: string
  maxNumberOfImages?: number
  imgClass?: string
  distance?: number
  fadeAnimation?: boolean
}

type PointerPosition = Pick<MouseEvent, 'clientX' | 'clientY'>

const ImageMouseTrail = ({
  items,
  imageAlt,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass,
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) => {
  const containerRef = useRef<HTMLElement | null>(null)
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()))
  if (refs.current.length !== items.length) refs.current = items.map(() => createRef<HTMLImageElement>())
  const timers = useRef(new Map<HTMLImageElement, ReturnType<typeof setTimeout>>())
  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach((timer, image) => {
        clearTimeout(timer)
        image.dataset.status = 'inactive'
      })
      pending.clear()
    }
  }, [items])
  const indexRef = useRef(0)
  const lastRef = useRef({ x: 0, y: 0 })
  const currentZIndexRef = useRef(1)

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return

    const relativeX = x - containerRect.left
    const relativeY = y - containerRect.top
    image.style.left = `${relativeX}px`
    image.style.top = `${relativeY}px`
    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1
    }
    image.style.zIndex = String(currentZIndexRef.current)
    currentZIndexRef.current++
    image.dataset.status = 'active'
    if (fadeAnimation) {
      clearTimeout(timers.current.get(image))
      timers.current.set(
        image,
        setTimeout(() => {
          image.dataset.status = 'inactive'
          timers.current.delete(image)
        }, 1500)
      )
    }
    lastRef.current = { x, y }
  }
  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - lastRef.current.x, y - lastRef.current.y)
  }
  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = 'inactive'
  }
  const handleOnMove = (e: PointerPosition) => {
    if (!refs.current.length) return
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / Math.max(1, distance)) {
      const lead = refs.current[indexRef.current % refs.current.length].current
      const tail =
        indexRef.current >= maxNumberOfImages && maxNumberOfImages < refs.current.length
          ? refs.current[(indexRef.current - maxNumberOfImages) % refs.current.length]?.current
          : null
      if (tail) deactivate(tail)
      if (lead) activate(lead, e.clientX, e.clientY)
      indexRef.current++
    }
  }
  return (
    <section
      onMouseMove={handleOnMove}
      onTouchMove={(e) => {
        if (e.touches[0]) handleOnMove(e.touches[0])
      }}
      ref={containerRef}
      className={clsx('wui-mouse-trail', className)}
    >
      {items.map((item, index) => (
        <img
          key={index}
          className={clsx('wui-mouse-trail-image', imgClass)}
          data-index={index}
          data-status="inactive"
          src={item}
          alt={imageAlt?.(item, index) ?? ''}
          ref={refs.current[index]}
        />
      ))}
      <article className="wui-mouse-trail-foreground">{children}</article>
    </section>
  )
}

export default ImageMouseTrail
