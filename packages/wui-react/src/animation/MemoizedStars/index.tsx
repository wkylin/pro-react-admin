import React, { memo } from 'react'
import { motion } from 'motion/react'

export interface MemoizedStarsProps {
  count?: number
  color?: string
  size?: number
  className?: string
}
const Stars = ({ count = 80, color = 'white', size = 2, className }: MemoizedStarsProps) => {
  const rand = (seed: number) => Math.abs(Math.sin(seed) * 10000) % 1

  return (
    <div aria-hidden="true" className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: Math.max(0, Math.floor(count)) }).map((_, i) => {
        const top = rand(i + 1) * 100
        const left = rand(i + 2) * 100
        const moveX = rand(i + 3) * 4 - 2
        const moveY = rand(i + 4) * 4 - 2
        const opacity = rand(i + 5)
        const duration = rand(i + 6) * 10 + 20

        return (
          <motion.span
            key={`star-${i}`}
            animate={{
              top: `calc(${top}% + ${moveY}px)`,
              left: `calc(${left}% + ${moveX}px)`,
              opacity,
              scale: [1, 1.2, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: '50%',
              zIndex: 1,
            }}
          />
        )
      })}
    </div>
  )
}

const MemoizedStars = memo(Stars)

export default MemoizedStars
