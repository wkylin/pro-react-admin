import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Variant = 'spin' | 'pulse' | 'bounce' | 'draw'

type Props = React.SVGProps<SVGElement> & {
  children: React.ReactElement
  variant?: Variant
  mode?: 'hover' | 'auto' | 'idle'
  className?: string
}

const AnimatedIcon: React.FC<Props> = ({ children, variant = 'spin', mode = 'hover', className = '', ...rest }) => {
  const shouldReduce = useReducedMotion()
  const isActive = !shouldReduce && mode === 'auto'

  const common = {
    style: { originX: '50%', originY: '50%' } as any,
    className,
  }

  const hover = mode === 'hover' && !shouldReduce ? { whileHover: { scale: 1.12 }, transition: { duration: 0.35 } } : {}

  const spin = isActive
    ? { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 2, ease: 'linear' } }
    : {}

  const pulse = isActive ? { animate: { scale: [1, 1.08, 1] }, transition: { repeat: Infinity, duration: 1.4 } } : {}

  const bounce = isActive ? { animate: { y: [0, -6, 0] }, transition: { repeat: Infinity, duration: 0.9 } } : {}

  const draw = isActive
    ? {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 1.6, ease: 'easeInOut' },
      }
    : {}

  const motionProps = {
    ...common,
    ...(variant === 'spin' ? spin : {}),
    ...(variant === 'pulse' ? pulse : {}),
    ...(variant === 'bounce' ? bounce : {}),
    ...(variant === 'draw' ? draw : {}),
    ...hover,
  } as any

  const childType: any = children.type

  if (childType && (childType === 'svg' || childType.render || childType.displayName)) {
    try {
      const MotionIcon = motion(children.type as any)
      return React.createElement(MotionIcon, { ...(children.props as any), ...rest, ...motionProps })
    } catch (_) {
      return (
        <motion.span {...motionProps} {...rest}>
          {children}
        </motion.span>
      )
    }
  }

  return (
    <motion.span {...motionProps} {...rest}>
      {children}
    </motion.span>
  )
}

export default AnimatedIcon
