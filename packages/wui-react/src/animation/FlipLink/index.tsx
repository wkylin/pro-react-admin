import React from 'react'
import { motion, type Variants } from 'motion/react'

const DURATION = 0.25
const STAGGER = 0.025

const outgoingVariants: Variants = {
  initial: { y: 0 },
  hovered: { y: '-100%' },
}

const incomingVariants: Variants = {
  initial: { y: '100%' },
  hovered: { y: 0 },
}

export interface FlipLinkProps extends Omit<import('motion/react').HTMLMotionProps<'a'>, 'children'> {
  children?: string
}

const FlipLink = React.forwardRef<HTMLAnchorElement, FlipLinkProps>(({ children = '', href, style, ...props }, ref) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      whileFocus="hovered"
      {...props}
      aria-label={props['aria-label'] ?? children}
      href={href}
      ref={ref}
      style={{
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
        lineHeight: 1.5,
        ...style,
      }}
    >
      <div aria-hidden="true">
        {children.split('').map((l, i) => (
          <motion.span
            variants={outgoingVariants}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {children.split('').map((l, i) => (
          <motion.span
            variants={incomingVariants}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
})

FlipLink.displayName = 'FlipLink'

export default FlipLink
