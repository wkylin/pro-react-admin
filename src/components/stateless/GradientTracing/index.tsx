import React from 'react'
import { motion } from 'framer-motion'

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
  width,
  height,
  baseColor = 'black',
  gradientColors = ['#2EB9DF', '#2EB9DF', '#9E00FF'],
  animationDuration = 2,
  strokeWidth = 2,
  path,
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substring(2, 9)}`

  return (
    <div className="relative" style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <path d={path} stroke={baseColor} strokeOpacity="0.2" />
        <path d={path} stroke={`url(#${gradientId})`} strokeLinecap="round" strokeWidth={strokeWidth} />
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default GradientTracing
