import React from 'react'
import { motion, easeInOut } from 'framer-motion'

interface GradientTracingProps {
  width: number
  height: number
  baseColor?: string
  gradientColors?: [string, string, string]
  animationDuration?: number
  strokeWidth?: number
  path: string
}

const GradientTracing: React.FC<GradientTracingProps> = ({
  width = 200,
  height = 200,
  baseColor = 'black',
  gradientColors = ['#2EB9DF', '#2EB9DF', '#9E00FF'],
  animationDuration = 2,
  strokeWidth = 2,
  path,
}) => {
  const gradientId = `pulse-gradient-${Date.now()}`
  const gradientVariants = {
    initial: {
      x1: '0%',
      x2: '0%',
    },
    animate: {
      x1: `${width * 2}px`,
      x2: `${width}px`,
      transition: {
        duration: animationDuration,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  }

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <path d={path} stroke={baseColor} strokeOpacity="0.2" strokeWidth={strokeWidth} fill="none" />

        <path d={path} stroke={`url(#${gradientId})`} strokeLinecap="round" strokeWidth={strokeWidth} fill="none" />

        <defs>
          <motion.linearGradient
            variants={gradientVariants}
            initial="initial"
            animate="animate"
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor={gradientColors[0]} stopOpacity="0" />
            <stop offset="50%" stopColor={gradientColors[1]} stopOpacity="1" />
            <stop offset="100%" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default GradientTracing
