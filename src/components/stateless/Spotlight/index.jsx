import React, { useRef, useState } from 'react'
import styles from './index.module.less'

const SpotlightCard = ({className, style, children}) => {
  const divRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <section
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.cardEffect} ${className}`}
      style={{
        ...style,
      }}
    >
      <section
        className={styles.spotlight}
        style={{
          opacity,
          background: `radial-gradient(1000px circle at ${position.x}px ${position.y}px, rgba(190,255,255,.2), transparent 40%)`,
        }}
      />
      <section
        className={styles.spotlight}
        style={{
          opacity,
          border: "2px solid rgb(255, 255, 255)",
          borderRadius: '8px',
          WebkitMaskImage: `radial-gradient(40% 40% at ${position.x}px ${position.y}px, black 45%, transparent)`
        }}
      />
      {children}
    </section>
  )
}

export default SpotlightCard
