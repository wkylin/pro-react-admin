import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const AnimationInView = ({ children, variants = defaultVariants, transition, viewOptions, as = 'div' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, viewOptions)

  const MotionComponent = motion[as]

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimationInView
