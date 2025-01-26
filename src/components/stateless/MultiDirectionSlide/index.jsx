import React from 'react'
import clsx from 'clsx'
import { motion } from 'motion/react'

const MultiDirectionSlide = ({ textLeft = '', textRight = '', className = '' }) => {
  const variants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: '0' },
    right: { opacity: 0, x: '100vw' }
  }

  return (
    <div className={clsx('flex justify-center overflow-hidden', className)}>
      <motion.section initial='hidden' animate='visible' variants={variants} transition={{ duration: 2 }}>
        {textLeft}
      </motion.section>

      <motion.section initial='right' animate='visible' variants={variants} transition={{ duration: 1 }}>
        {textRight}
      </motion.section>
    </div>
  )
}

export default MultiDirectionSlide
