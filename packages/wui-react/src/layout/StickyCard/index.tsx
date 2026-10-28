import type { HTMLAttributes, Key, ReactNode } from 'react'
import styles from '../layout.module.less'
export interface StickyCardItem {
  id?: Key | null
  content?: ReactNode
}
export interface StickyCardProps extends HTMLAttributes<HTMLElement> {
  cards: StickyCardItem[]
  renderCard?: (card: StickyCardItem, index: number) => ReactNode
  topOffset?: number
  step?: number
}
export default function StickyCard({
  cards,
  renderCard,
  topOffset = 50,
  step = 30,
  children,
  className = '',
  ...props
}: StickyCardProps) {
  return (
    <section className={`${styles.stickyCards} ${className}`} {...props}>
      {cards.map((card, index) => (
        <div className={styles.stickyCard} key={card.id ?? index} style={{ top: topOffset + (index + 1) * step }}>
          {renderCard ? renderCard(card, index) : (card.content ?? children)}
        </div>
      ))}
    </section>
  )
}
