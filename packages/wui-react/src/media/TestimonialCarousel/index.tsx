import styles from './index.module.less'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface Testimonial {
  text: string
  author: string
}
export interface TestimonialCarouselProps {
  items: Testimonial[]
  interval?: number
  slideLabel?: (index: number) => string
}
const TestimonialCarousel = ({
  items: testimonials,
  interval = 3000,
  slideLabel = (i) => `Show slide ${i + 1}`,
}: TestimonialCarouselProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    if (!testimonials.length || interval <= 0) return
    const intervalId = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length)
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [testimonials.length, interval])

  if (!testimonials.length) return null
  const selected = currentTestimonial % testimonials.length
  const { text, author } = testimonials[selected]

  const variants = {
    initial: { opacity: 0, y: '100%', scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: '100%', scale: 0.1 },
  }
  const dotVariants = {
    active: { scale: 1.2, backgroundColor: 'var(--wui-indicator-active, #2563eb)' },
    inactive: { scale: 1, backgroundColor: 'var(--wui-indicator-inactive, #94a3b8)' },
  }

  return (
    <section className={styles.content}>
      <div className={styles.content}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentTestimonial}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className={styles.content}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
          >
            <p className={styles.content}>&quot;{text}&quot;</p>
            <div className={styles.content}>
              <div className={styles.content}>
                <div className={styles.content}>{author}</div>
              </div>
            </div>
          </motion.div>
          <div className={styles.content}>
            {testimonials.map((_, index) => (
              <motion.button
                type="button"
                aria-label={slideLabel(index)}
                aria-pressed={index === selected}
                key={index}
                className={styles.content}
                variants={dotVariants}
                animate={index === selected ? 'active' : 'inactive'}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TestimonialCarousel
