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
  const active = Math.min(open, Math.max(0, data.length - 1))
  useEffect(() => {
    if (!autoPlay || data.length < 2 || intervalDuration <= 0) return
    const timer = setInterval(() => setOpen((value) => (value + 1) % data.length), intervalDuration)
    return () => clearInterval(timer)
  }, [autoPlay, intervalDuration, data.length])
  return (
    <div className={`${styles.feature} ${className}`} {...props}>
      <div>
        {data.map((item, index) => (
          <button
            className={styles.featureButton}
            key={item.title}
            type="button"
            aria-pressed={active === index}
            onClick={() => setOpen(index)}
          >
            <TextComponent
              number={index + 1}
              title={item.title}
              content={item.content}
              isOpen={active === index}
              loadingWidthPercent={0}
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
