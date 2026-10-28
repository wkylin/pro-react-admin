import { useState, type ReactNode } from 'react'
import styles from './index.module.less'
export interface FixCarouseProps<T> {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  getKey?: (item: T, index: number) => string | number
  itemsPerPage?: number
  emptyLabel?: ReactNode
  previousLabel?: string
  nextLabel?: string
  pageLabel?: (page: number) => string
}
export default function FixCarouse<T>({
  items,
  renderItem,
  getKey,
  itemsPerPage = 6,
  emptyLabel = 'No items',
  previousLabel = 'Previous page',
  nextLabel = 'Next page',
  pageLabel = (p) => `Page ${p}`,
}: FixCarouseProps<T>) {
  const [page, setPage] = useState(0)
  const size = Math.max(1, Math.floor(itemsPerPage) || 1),
    count = Math.ceil(items.length / size),
    current = Math.min(page, Math.max(0, count - 1))
  return (
    <section className={styles.carousel}>
      <button type="button" disabled={!current} onClick={() => setPage(current - 1)}>
        {previousLabel}
      </button>
      <div className={styles.items}>
        {items.length
          ? items
              .slice(current * size, (current + 1) * size)
              .map((item, i) => (
                <div key={getKey?.(item, current * size + i) ?? i}>{renderItem(item, current * size + i)}</div>
              ))
          : emptyLabel}
      </div>
      <button type="button" disabled={current >= count - 1} onClick={() => setPage(current + 1)}>
        {nextLabel}
      </button>
      <nav className={styles.pages}>
        {Array.from({ length: count }, (_, i) => (
          <button
            type="button"
            key={i}
            aria-current={current === i ? 'page' : undefined}
            aria-label={pageLabel(i + 1)}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </section>
  )
}
