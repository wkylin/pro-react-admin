import React from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'

export interface BorderBeamProps {
  className?: string
  size?: number
  delay?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
  transition?: import('motion/react').Transition
  style?: import('motion/react').MotionStyle
  reverse?: boolean
  initialOffset?: number
}
const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) => {
  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        border: '1px solid transparent',
        maskImage: 'linear-gradient(transparent,transparent),linear-gradient(#000,#000)',
        maskComposite: 'intersect',
        maskClip: 'padding-box,border-box',
      }}
    >
      <motion.div
        className={clsx(className)}
        style={{
          position: 'absolute',
          aspectRatio: '1',
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}

export default BorderBeam
