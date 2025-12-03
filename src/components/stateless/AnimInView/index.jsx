import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import clsx from 'clsx'

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const AnimationInView = ({
  children,
  variants = defaultVariants,
  transition,
  viewOptions = {},
  as = 'div',
  className,
  style,
  once = false,
  amount = 0.2,
  margin,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount,
    margin,
    ...viewOptions,
  })

  const MotionComponent = motion[as]

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={clsx(className)}
      style={style}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimationInView
