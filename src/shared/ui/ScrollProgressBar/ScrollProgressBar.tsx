import React, { useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import clsx from 'clsx'
import type { ScrollAreaProps, ScrollProgressBarProps } from './types'

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  container,
  position = 'fixed',
  height = 3,
  color = 'linear-gradient(108deg,#0894ff,#ff2e54 70%,#ff9004)',
  className,
  show = true,
  springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  },
}) => {
  // Omit container to track the document; the progress bar is not a scroll area.
  const scrollContainerRef = useMemo(() => (container ? { current: container } : undefined), [container])

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  })

  const scaleX = useSpring(scrollYProgress, springConfig)

  if (!show) return null

  const positionStyles =
    position === 'fixed'
      ? {
          position: 'fixed' as const,
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
        }
      : position === 'absolute'
        ? {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
          }
        : position === 'sticky'
          ? {
              position: 'sticky' as const,
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 10,
              // Keep the sticky overlay out of the content's scroll height.
              marginBottom: -height,
            }
          : {
              position: 'relative' as const,
              width: '100%',
            }

  return (
    <motion.div
      className={clsx('scroll-progress-bar', className)}
      style={{
        ...positionStyles,
        height: `${height}px`,
        backgroundImage: typeof color === 'string' && color.includes('gradient') ? color : undefined,
        backgroundColor: typeof color === 'string' && !color.includes('gradient') ? color : undefined,
        borderRadius: '3px',
        pointerEvents: 'none',
        transformOrigin: 'left',
        scaleX: scaleX,
      }}
    />
  )
}

export default ScrollProgressBar

// 包装器组件：提供滚动容器和进度条
export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className,
  style,
  position = 'sticky',
  ...progressBarProps
}) => {
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null)

  return (
    <div ref={setContainerNode} className={clsx('relative overflow-auto', className)} style={style}>
      {containerNode && <ScrollProgressBar container={containerNode} position={position} {...progressBarProps} />}
      {children}
    </div>
  )
}
