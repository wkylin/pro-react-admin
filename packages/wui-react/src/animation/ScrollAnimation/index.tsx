import React from 'react'
import { motion } from 'motion/react'

export interface ScrollAnimationProps {
  children?: React.ReactNode
  className?: string
  once?: boolean
  amount?: number | 'some' | 'all'
}
const ScrollAnimation = ({ children, className, once = false, amount = 'some' }: ScrollAnimationProps) => {
  return (
    <motion.div
      className={className}
      viewport={{ once, amount }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      // viewport={{once:true}}
      transition={{
        ease: 'linear',
        duration: 1,
        y: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation
