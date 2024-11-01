import React from 'react'
import { motion } from 'framer-motion'

const ScrollAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      // viewport={{once:true}}
      transition={{
        ease: 'linear',
        duration: 1,
        y: { duration: 0.5 }
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation
