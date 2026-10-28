import type { CSSProperties, HTMLAttributes } from 'react'
import styles from './index.module.less'
export interface WordProps {
  width: CSSProperties['width']
}
export interface ContentPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  lines?: readonly (readonly number[])[]
  headingWidths?: readonly number[]
  label?: string
}
export const Word = ({ width }: WordProps) => <div className={styles.word} style={{ width }} />
const defaultLines = [
  [62, 84, 36, 100, 54],
  [40, 72, 92, 60],
  [82, 30, 65, 100, 44],
]
export default function ContentPlaceholder({
  lines = defaultLines,
  headingWidths = [75, 245, 120],
  label = 'Loading',
  className = '',
  ...props
}: ContentPlaceholderProps) {
  return (
    <div {...props} role="status" aria-label={label} className={`${styles.contentPlaceholder} ${className}`}>
      <section aria-hidden="true">
        {headingWidths.map((width, i) => (
          <Word key={i} width={width} />
        ))}
      </section>
      <div aria-hidden="true">
        {lines.map((words, i) => (
          <div className={styles.paragraph} key={i}>
            {words.map((width, j) => (
              <Word key={j} width={width} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
