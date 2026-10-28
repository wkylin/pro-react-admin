import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import styles from './index.module.less'
export interface DynamicBackgroundItem {
  icon: ReactNode
  size?: 'sm' | 'md' | 'lg'
  type?: string
}
export interface DynamicBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  items?: readonly DynamicBackgroundItem[]
}
const emptyItems: readonly DynamicBackgroundItem[] = []
export default function DynamicBackground({
  items = emptyItems,
  children,
  className = '',
  ...props
}: DynamicBackgroundProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([])
  useEffect(() => {
    const element = heroRef.current
    if (!element) return
    let positions: { x: number; y: number }[] = []
    const resize = () => {
      const { width, height } = element.getBoundingClientRect()
      positions = items.map(() => ({
        x: Math.random() * Math.max(0, width - 75),
        y: Math.random() * Math.max(0, height - 75),
      }))
      setPositions(positions)
    }
    let timer: ReturnType<typeof setTimeout> | undefined
    const move = (event: MouseEvent) => {
      if (timer !== undefined) clearTimeout(timer)
      const { left, top } = element.getBoundingClientRect()
      const x = event.clientX - left
      const y = event.clientY - top
      timer = setTimeout(
        () =>
          iconRefs.current.forEach((icon, index) => {
            const point = positions[index]
            if (!icon || !point) return
            const factor = items[index]?.size === 'sm' ? 0.03 : items[index]?.size === 'lg' ? 0.1 : 0.06
            icon.style.transform = `translate(${point.x + x * factor}px, ${point.y + y * factor}px)`
          }),
        10
      )
    }
    const initial = setTimeout(resize, 0)
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    observer?.observe(element)
    window.addEventListener('resize', resize)
    element.addEventListener('mousemove', move)
    return () => {
      clearTimeout(initial)
      clearTimeout(timer)
      observer?.disconnect()
      window.removeEventListener('resize', resize)
      element.removeEventListener('mousemove', move)
    }
  }, [items])
  return (
    <div {...props} className={`${styles.hero} ${className}`} ref={heroRef}>
      <div className={styles.iconLayer} aria-hidden="true">
        {items.map(({ icon, size = 'md', type = '' }, index) => (
          <span
            key={index}
            ref={(node) => {
              iconRefs.current[index] = node
            }}
            className={`${styles.icon} ${styles[type] ?? ''} ${styles[size]}`}
            style={{ transform: `translate(${positions[index]?.x ?? 0}px, ${positions[index]?.y ?? 0}px)` }}
          >
            {icon}
          </span>
        ))}
      </div>
      <div className={styles.heroText}>{children}</div>
    </div>
  )
}
