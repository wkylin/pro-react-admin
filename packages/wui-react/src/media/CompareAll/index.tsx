import { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
export interface CompareProps {
  firstImage?: string
  secondImage?: string
  firstImageAlt?: string
  secondImageAlt?: string
  label?: string
  className?: string
  firstImageClassName?: string
  secondImageClassname?: string
  initialSliderPercentage?: number
  slideMode?: 'hover' | 'drag'
  showHandlebar?: boolean
  autoplay?: boolean
  autoplayDuration?: number
  onChange?: (percentage: number) => void
}
const clamp = (n: number) => Math.max(0, Math.min(100, Number.isFinite(n) ? n : 50))
export default function CompareAll({
  firstImage,
  secondImage,
  firstImageAlt = '',
  secondImageAlt = '',
  label = 'Image comparison',
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = 'hover',
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  onChange,
}: CompareProps) {
  const [value, setValue] = useState(clamp(initialSliderPercentage)),
    [interacting, setInteracting] = useState(false)
  const dragging = useRef(false)
  useEffect(() => {
    setValue(clamp(initialSliderPercentage))
  }, [initialSliderPercentage])
  useEffect(() => {
    if (!autoplay || interacting || autoplayDuration <= 0) return
    let frame = 0
    const start = performance.now()
    const animate = (now: number) => {
      const progress = ((now - start) % (autoplayDuration * 2)) / autoplayDuration
      setValue((progress <= 1 ? progress : 2 - progress) * 100)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [autoplay, autoplayDuration, interacting])
  const change = (next: number) => {
    setValue(clamp(next))
    onChange?.(clamp(next))
  }
  return (
    <div
      className={`${styles.compare} ${className || ''}`}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => {
        setInteracting(false)
        dragging.current = false
      }}
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture?.(e.pointerId)
      }}
      onPointerUp={() => {
        dragging.current = false
      }}
      onPointerCancel={() => {
        dragging.current = false
      }}
      onPointerMove={(e) => {
        if (slideMode === 'hover' || dragging.current) {
          const r = e.currentTarget.getBoundingClientRect()
          if (r.width) change(((e.clientX - r.left) / r.width) * 100)
        }
      }}
    >
      {secondImage && <img src={secondImage} alt={secondImageAlt} className={secondImageClassname} draggable={false} />}
      {firstImage && (
        <img
          src={firstImage}
          alt={firstImageAlt}
          className={firstImageClassName}
          draggable={false}
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        />
      )}
      {showHandlebar && <span className={styles.handle} style={{ left: `${value}%` }} aria-hidden="true" />}
      <input
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label={label}
        onFocus={() => setInteracting(true)}
        onBlur={() => setInteracting(false)}
        onChange={(e) => change(Number(e.target.value))}
      />
    </div>
  )
}
