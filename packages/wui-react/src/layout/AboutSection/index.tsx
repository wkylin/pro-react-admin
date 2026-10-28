import { useRef, type HTMLAttributes, type RefObject } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HorizontalScroll, { type HorizontalScrollCard } from '../HorizontalScroll'
import styles from '../layout.module.less'
export interface AboutSectionProps extends HTMLAttributes<HTMLElement> {
  scrollContainerRef?: RefObject<HTMLElement | null>
  cards?: HorizontalScrollCard[]
}
export default function AboutSection({
  scrollContainerRef,
  cards,
  children,
  className = '',
  ...props
}: AboutSectionProps) {
  const target = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target, container: scrollContainerRef })
  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-50%'])
  return (
    <section ref={target} className={`${styles.about} ${className}`} {...props}>
      <div className={styles.aboutSticky}>
        <motion.div style={{ x }}>
          <HorizontalScroll cards={cards}>{children}</HorizontalScroll>
        </motion.div>
      </div>
    </section>
  )
}
