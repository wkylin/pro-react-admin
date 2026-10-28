import type { HTMLAttributes, Key, ReactNode } from 'react'
import styles from '../layout.module.less'
export interface HorizontalScrollCard {
  id: Key
  url: string
  alt: string
  title?: ReactNode
  href?: string
}
export interface HorizontalScrollProps extends HTMLAttributes<HTMLDivElement> {
  cards?: HorizontalScrollCard[]
}
export default function HorizontalScroll({ cards = [], children, className = '', ...props }: HorizontalScrollProps) {
  return (
    <div className={`${styles.horizontal} ${className}`} {...props}>
      {cards.map((card) => {
        const content = (
          <>
            <img src={card.url} alt={card.alt} />
            <span>{card.title}</span>
          </>
        )
        return card.href ? (
          <a className={styles.card} key={card.id} href={card.href}>
            {content}
          </a>
        ) : (
          <div className={styles.card} key={card.id}>
            {content}
          </div>
        )
      })}
      {children}
    </div>
  )
}
