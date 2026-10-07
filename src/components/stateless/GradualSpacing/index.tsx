import React, { useRef } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion, useInView } from 'motion/react'

const GradualSpacing = ({ text = '', className = '' }) => {
  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className={clsx('', className)}>
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default GradualSpacing
