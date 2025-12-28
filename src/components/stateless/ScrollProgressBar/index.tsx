import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import clsx from 'clsx'

interface ScrollProgressBarProps {
  /**
   * 滚动容器元素，如果不指定则监听整个页面滚动
   */
  container?: HTMLElement | null
  /**
   * 定位方式：fixed（固定定位）、relative（相对定位）、absolute（绝对定位）或 sticky（粘性定位）
   * @default 'fixed'
   */
  position?: 'fixed' | 'relative' | 'absolute' | 'sticky'
  /**
   * 进度条高度
   * @default 3
   */
  height?: number
  /**
   * 进度条颜色，支持CSS颜色值或渐变
   * @default 'linear-gradient(108deg,#0894ff,#ff2e54 70%,#ff9004)'
   */
  color?: string
  /**
   * 额外的CSS类名
   */
  className?: string
  /**
   * 是否显示滚动进度条
   * @default true
   */
  show?: boolean
  /**
   * 动画配置
   */
  springConfig?: {
    stiffness?: number
    damping?: number
    restDelta?: number
  }
}

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
  const internalRef = useRef<HTMLDivElement>(null)

  // 使用传入的容器或内部ref
  const scrollContainerRef = container ? { current: container } : internalRef

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
            }
          : {
              position: 'relative' as const,
              width: '100%',
            }

  return (
    <motion.div
      ref={internalRef}
      className={clsx('scroll-progress-bar', className)}
      style={{
        ...positionStyles,
        height: `${height}px`,
        backgroundImage: typeof color === 'string' && color.includes('gradient') ? color : undefined,
        backgroundColor: typeof color === 'string' && !color.includes('gradient') ? color : undefined,
        borderRadius: '3px',
        transformOrigin: 'left',
        scaleX: scaleX,
      }}
    />
  )
}

export default ScrollProgressBar

// 包装器组件：提供滚动容器和进度条
interface ScrollAreaProps extends Omit<ScrollProgressBarProps, 'container'> {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className, style, ...progressBarProps }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [containerNode, setContainerNode] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    setContainerNode(scrollRef.current)
  }, [])

  return (
    <div ref={scrollRef} className={clsx('relative overflow-auto', className)} style={style}>
      {containerNode && <ScrollProgressBar container={containerNode} position="relative" {...progressBarProps} />}
      {children}
    </div>
  )
}
