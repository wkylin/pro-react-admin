import type { ReactNode } from 'react'
import styles from './index.module.less'
export interface TextComponentProps {
  number?: ReactNode
  title: string
  content: ReactNode
  isOpen?: boolean
  loadingWidthPercent?: number
}
export default function TextComponent({
  number,
  title,
  content,
  isOpen = false,
  loadingWidthPercent = 0,
}: TextComponentProps) {
  const progress = Number.isFinite(loadingWidthPercent) ? Math.min(100, Math.max(0, loadingWidthPercent)) : 0
  return (
    <div className={`${styles.text} ${isOpen ? styles.open : ''}`}>
      <div className={styles.heading}>
        <span className={styles.number}>{number}</span>
        <strong>{title}</strong>
      </div>
      <div className={styles.content} hidden={!isOpen}>
        <p>{content}</p>
        <div
          role="progressbar"
          aria-label={`${title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className={styles.progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
