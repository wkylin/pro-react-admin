import React from 'react'
import styles from './index.module.less'

type RippleCoordinates = {
  x: number
  y: number
}

type AnimateRippleProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const useRippling = () => {
  const [{ x, y }, setCoordinates] = React.useState<RippleCoordinates>({
    x: -1,
    y: -1,
  })

  const isRippling = x !== -1 && y !== -1

  const handleRippleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    setCoordinates({
      x: e.clientX - left,
      y: e.clientY - top,
    })

    setTimeout(() => {
      setCoordinates({ x: -1, y: -1 })
    }, 300)
  }

  return {
    x,
    y,
    handleRippleOnClick,
    isRippling,
  }
}

const AnimateRipple = ({ children, onClick, ...rest }: AnimateRippleProps) => {
  const { x, y, handleRippleOnClick, isRippling } = useRippling()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleRippleOnClick(e)
    onClick && onClick(e)
  }

  return (
    <button type="button" onClick={handleClick} className={styles.btn} {...rest}>
      <span className={styles.content}>{children}</span>
      {isRippling && (
        <div className={styles['btn-ripple-container']}>
          <span
            className={styles['btn-ripple']}
            style={{
              left: x,
              top: y,
            }}
          />
        </div>
      )}
    </button>
  )
}

export default AnimateRipple
