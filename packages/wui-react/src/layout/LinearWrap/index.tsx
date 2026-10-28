import type { HTMLAttributes } from 'react'
import styles from './index.module.less'
export type LinearWrapProps = HTMLAttributes<HTMLElement>
export default function LinearWrap({ children, className = '', ...props }: LinearWrapProps) {
  return (
    <section className={`${styles.linearWrap} ${className}`} {...props}>
      {[1, 2, 3, 4].map((n) => (
        <span key={n} aria-hidden className={styles.line} />
      ))}
      <section>{children}</section>
    </section>
  )
}
