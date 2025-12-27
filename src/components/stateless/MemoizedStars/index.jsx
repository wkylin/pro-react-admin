import React, { memo } from 'react'
import { motion } from 'motion/react'

const Stars = () => {
  const rand = (seed) => Math.abs(Math.sin(seed) * 10000) % 1

  return (
    <div className='absolute inset-0'>
      {[...Array(80)].map((_, i) => {
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
              scale: [1, 1.2, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              width: '2px',
              height: '2px',
              backgroundColor: 'white',
              borderRadius: '50%',
              zIndex: 1
            }}
            className='inline-block'
          />
        )
      })}
    </div>
  )
}

const MemoizedStars = memo(Stars)

export default MemoizedStars
