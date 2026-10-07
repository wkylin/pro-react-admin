import React from 'react'
import { motion, type Variants } from 'motion/react'

export const RevealLinks = () => {
  return (
    <section className="grid place-content-center gap-2">
      <FlipLink href="https://github.com/wkylin/pro-react-admin">Github</FlipLink>
      <FlipLink href="https://medium.com/@wkylin.w"></FlipLink>
    </section>
  )
}

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

interface FlipLinkProps {
  children?: string
  href: string
}

const FlipLink = React.forwardRef<HTMLAnchorElement, FlipLinkProps>(({ children = '', href }, ref) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      ref={ref}
      target="_blank"
      className="relative block overflow-hidden"
      style={{
        lineHeight: 1.5,
      }}
    >
      <div>
        {children.split('').map((l, i) => (
          <motion.span
            variants={outgoingVariants}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split('').map((l, i) => (
          <motion.span
            variants={incomingVariants}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
            }}
            className="inline-block"
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
