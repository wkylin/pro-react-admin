import batchBStyles from '../batch-b.module.less'
import React from 'react'
import clsx from 'clsx'
import { motion } from 'motion/react'

// Keep package CSS in runtime builds without leaking a style import into declarations.
void batchBStyles

export interface MultiDirectionSlideProps {
  textLeft?: string
  textRight?: string
  className?: string
}
const MultiDirectionSlide = ({ textLeft = '', textRight = '', className = '' }: MultiDirectionSlideProps) => {
  const variants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: '0' },
    right: { opacity: 0, x: '100vw' },
  }

  return (
    <div className={clsx('wui-multi-direction-slide', className)}>
      <motion.section initial="hidden" animate="visible" variants={variants} transition={{ duration: 2 }}>
        {textLeft}
      </motion.section>

      <motion.section initial="right" animate="visible" variants={variants} transition={{ duration: 1 }}>
        {textRight}
      </motion.section>
    </div>
  )
}

export default MultiDirectionSlide
