import batchBStyles from '../batch-b.module.less'
import React, { useMemo } from 'react'
import { motion } from 'motion/react'

// Keep package CSS in runtime builds without leaking a style import into declarations.
void batchBStyles

export interface MeteorsProps {
  starCount?: number
  primaryColor?: string
  className?: string
}
const Meteors = ({ starCount = 50, primaryColor = '#ffffff', className = '' }: MeteorsProps) => {
  const stars = useMemo(() => {
    const rand = (seed: number) => Math.abs(Math.sin(seed) * 10000) % 1

    return Array.from({ length: Math.max(0, Math.floor(starCount)) }, (_, i) => {
      const tailLength = rand(i + 1) * 2.5 + 5
      const topOffset = rand(i + 2) * 100
      const fallDuration = rand(i + 3) * 6 + 6
      const fallDelay = rand(i + 4) * 10

      return {
        id: i,
        tailLength,
        topOffset,
        fallDuration,
        fallDelay,
      }
    })
  }, [starCount])

  return (
    <div
      aria-hidden="true"
      className={`wui-meteors ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="wui-meteor"
          style={{
            top: `${star.topOffset}%`,
            width: `${star.tailLength}em`,
            color: primaryColor,
            willChange: 'transform',
          }}
          initial={{ left: '110%' }}
          animate={{ left: '-30%' }}
          transition={{
            duration: star.fallDuration,
            delay: -star.fallDelay,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        >
          <div className="wui-meteor-core">
            <div
              className="wui-meteor-flare"
              style={{
                willChange: 'transform, opacity',
              }}
            />
            <div
              className="wui-meteor-flare"
              style={{
                willChange: 'transform, opacity',
              }}
            />
            <div
              className="wui-meteor-flare"
              style={{
                willChange: 'transform, opacity',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Meteors
