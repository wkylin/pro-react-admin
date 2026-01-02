import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'motion/react'

// Preset types: 'fade' | 'slide' | 'scale' | 'blur' | 'blur-slide' | 'zoom' | 'flip' | 'bounce' | 'rotate' | 'swing'

const defaultContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const presetVariants = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
}

const addDefaultVariants = (variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
})

const AnimatedGroup = ({ children, className, variants, preset, asParent = 'div', asChild = 'div' }) => {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  }
  const containerVariants = variants?.container || selectedVariants.container
  const itemVariants = variants?.item || selectedVariants.item

  // Use built-in motion element lookup (e.g. motion.div) instead of motion.create.
  // This avoids creating components during render which breaks some static checks.
  const MotionComponent = motion[asParent] || motion.div
  const MotionChild = motion[asChild] || motion.div

  return (
    <MotionComponent initial="hidden" animate="visible" variants={containerVariants} className={className}>
      {React.Children.map(children, (child) => {
        // Prefer original child key when present; avoid explicitly using array index as key.
        const childKey = child?.key
        return (
          <MotionChild key={childKey} variants={itemVariants}>
            {child}
          </MotionChild>
        )
      })}
    </MotionComponent>
  )
}

AnimatedGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variants: PropTypes.object,
  preset: PropTypes.string,
  asParent: PropTypes.string,
  asChild: PropTypes.string,
}

export default AnimatedGroup
