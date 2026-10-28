import type { HTMLAttributes, ReactNode } from 'react'
import styles from '../layout.module.less'
export interface MarketingHeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  decoration?: ReactNode
}
export default function MarketingHero({
  title,
  description,
  decoration,
  children,
  className = '',
  ...props
}: MarketingHeroProps) {
  return (
    <section className={`${styles.hero} ${className}`} {...props}>
      <div className={styles.heroContent}>
        {title != null && <h1>{title}</h1>}
        {description != null && <p>{description}</p>}
        {children}
      </div>
      {decoration && <div className={styles.heroDecoration}>{decoration}</div>}
    </section>
  )
}
