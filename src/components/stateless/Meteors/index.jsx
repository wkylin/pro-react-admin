import React from 'react'
import { motion } from 'framer-motion'

const Meteors = ({ starCount = 50, primaryColor = '#ffffff', className = '' }) => {
  const stars = Array.from({ length: starCount }, (_, i) => {
    const starTailLength = Math.random() * 2.5 + 5
    const topOffset = Math.random() * 100
    const fallDuration = Math.random() * 6 + 6
    const fallDelay = Math.random() * 10

    return {
      id: i,
      topOffset,
      fallDuration,
      fallDelay
    }
  })

  return (
    <div
      className={`pointer-events-none absolute inset-0 h-full w-full -rotate-45 ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className='absolute h-[2px] rounded-full bg-gradient-to-r from-current to-transparent drop-shadow-[0_0_6px_currentColor]'
          style={{
            top: `${star.topOffset}vh`,
            width: '6em',
            color: primaryColor,
            willChange: 'transform'
          }}
          initial={{ x: '104em' }}
          animate={{ x: '-30em' }}
          transition={{
            duration: star.fallDuration,
            delay: star.fallDelay,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
        >
          <div className='relative h-full w-full'>
            <div
              className='rounded-inherit animate-blink absolute top-0 left-[calc(-1em)] h-full w-[1em] bg-gradient-to-r from-transparent via-current to-transparent'
              style={{
                willChange: 'transform, opacity'
              }}
            />
            <div
              className='rounded-inherit animate-blink absolute top-0 left-[calc(-1em)] h-full w-[1em] rotate-45 bg-gradient-to-r from-transparent via-current to-transparent'
              style={{
                willChange: 'transform, opacity'
              }}
            />
            <div
              className='rounded-inherit animate-blink absolute top-0 left-[calc(-1em)] h-full w-[1em] -rotate-45 bg-gradient-to-r from-transparent via-current to-transparent'
              style={{
                willChange: 'transform, opacity'
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Meteors
