import React from 'react'
import styles from './index.module.less'

interface StarProps {
  marked: boolean
  starId: number
}

interface StarRatingProps {
  value?: number | string
}

const Star = ({ marked, starId }: StarProps) => {
  return (
    <span data-star-id={starId} className={styles.star} role="button">
      {marked ? '\u2605' : '\u2606'}
    </span>
  )
}

const StarRating = ({ value }: StarRatingProps) => {
  const [rating, setRating] = React.useState<number>(parseInt(String(value)) || 0)
  const [selection, setSelection] = React.useState<number>(0)

  const hoverOver = (event: React.MouseEvent<HTMLSpanElement> | null) => {
    let val = 0
    if (event?.target instanceof HTMLElement) {
      const starId = event.target.getAttribute('data-star-id')
      if (starId) val = Number(starId)
    }
    setSelection(val)
  }

  return (
    <span
      onMouseOut={() => hoverOver(null)}
      onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
        if (event.target instanceof HTMLElement) {
          setRating(Number(event.target.getAttribute('data-star-id')) || rating)
        }
      }}
      onMouseOver={hoverOver}
      role="button"
      tabIndex={0}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} key={`star_${i + 1}`} marked={selection ? selection >= i + 1 : rating >= i + 1} />
      ))}
      <span>{rating}</span>
    </span>
  )
}

export default StarRating
