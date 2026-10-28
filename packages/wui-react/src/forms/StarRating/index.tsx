import { useState } from 'react'
import styles from './index.module.less'
export interface StarRatingProps {
  value?: number | string
  defaultValue?: number
  max?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  disabled?: boolean
  label?: string
  getStarLabel?: (value: number, max: number) => string
}
export default function StarRating({
  value,
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  disabled = false,
  label = 'Rating',
  getStarLabel = (value, max) => `${value} of ${max}`,
}: StarRatingProps) {
  const count = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5
  const [internal, setInternal] = useState(defaultValue)
  const [hover, setHover] = useState(0)
  const rating = Math.min(count, Math.max(0, Math.floor(Number(value ?? internal)) || 0))
  const select = (next: number) => {
    if (readOnly || disabled) return
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  return (
    <span
      className={styles.rating}
      role="radiogroup"
      aria-label={label}
      aria-readonly={readOnly}
      aria-disabled={disabled}
      onMouseLeave={() => setHover(0)}
    >
      {Array.from({ length: count }, (_, index) => {
        const star = index + 1
        return (
          <button
            type="button"
            role="radio"
            key={star}
            aria-checked={rating === star}
            aria-label={getStarLabel(star, count)}
            disabled={disabled}
            tabIndex={star === (rating || 1) ? 0 : -1}
            className={styles.star}
            onMouseEnter={() => !readOnly && !disabled && setHover(star)}
            onClick={() => select(star)}
            onKeyDown={(event) => {
              const next =
                event.key === 'Home'
                  ? 1
                  : event.key === 'End'
                    ? count
                    : ['ArrowRight', 'ArrowUp'].includes(event.key)
                      ? Math.min(count, star + 1)
                      : ['ArrowLeft', 'ArrowDown'].includes(event.key)
                        ? Math.max(1, star - 1)
                        : null
              if (next !== null && !readOnly && !disabled) {
                event.preventDefault()
                select(next)
                const buttons = event.currentTarget.parentElement?.querySelectorAll('button')
                buttons?.[next - 1]?.focus()
              }
            }}
          >
            {(hover || rating) >= star ? '★' : '☆'}
          </button>
        )
      })}
      <span aria-hidden="true">{rating}</span>
    </span>
  )
}
