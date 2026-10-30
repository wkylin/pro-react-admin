import { useState, useEffect, type HTMLAttributes } from 'react'
import TextComponent from '../../data-display/TextComponent'
import styles from '../layout.module.less'
export interface FeatureItem {
  title: string
  content: string
  srcImage: string
  alt?: string
}
export interface FeatureAnyProps extends HTMLAttributes<HTMLDivElement> {
  data: FeatureItem[]
  autoPlay?: boolean
  intervalDuration?: number
}
export default function FeatureAny({
  data,
  autoPlay = true,
  intervalDuration = 5000,
  className = '',
  ...props
}: FeatureAnyProps) {
  const [open, setOpen] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [progress, setProgress] = useState(0)
  const active = Math.min(open, Math.max(0, data.length - 1))
  useEffect(() => {
    setProgress(0)
    if (!autoPlay || data.length < 2 || intervalDuration <= 0) return
    const startedAt = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startedAt
      if (elapsed >= intervalDuration) {
        setOpen((value) => (value + 1) % data.length)
      } else {
        setProgress(Math.min(100, Math.round((elapsed / intervalDuration) * 100)))
      }
    }, 50)
    return () => clearInterval(timer)
  }, [autoPlay, intervalDuration, data.length, active, cycle])
  return (
    <div className={`${styles.feature} ${className}`} {...props}>
      <div>
        {data.map((item, index) => (
          <button
            className={styles.featureButton}
            key={item.title}
            type="button"
            aria-pressed={active === index}
            onClick={() => {
              setOpen(index)
              setProgress(0)
              setCycle((value) => value + 1)
            }}
          >
            <TextComponent
              number={index + 1}
              title={item.title}
              content={item.content}
              isOpen={active === index}
              loadingWidthPercent={active === index ? progress : 0}
            />
          </button>
        ))}
      </div>
      <div className={styles.featureImages}>
        {data.map((item, index) => (
          <img key={item.title} src={item.srcImage} alt={item.alt ?? item.title} hidden={active !== index} />
        ))}
      </div>
    </div>
  )
}
