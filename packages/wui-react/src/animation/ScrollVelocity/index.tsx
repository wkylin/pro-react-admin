import batchStyles from '../batch-c.module.less'
void batchStyles
import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import clsx from 'clsx'

export const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export interface ScrollVelocityProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  text?: React.ReactNode
  velocity?: number
}

export interface ParallaxSectionProps {
  children: React.ReactNode
  baseVelocity?: number
  className?: string
}

const ScrollVelocity = React.forwardRef<HTMLElement, ScrollVelocityProps>(
  ({ text, velocity = 3, className, ...restProps }, ref) => {
    const containerRef = useRef<HTMLElement | null>(null)
    const setContainerRef = (node: HTMLElement | null) => {
      containerRef.current = node

      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    const ParallaxSection = ({ children, baseVelocity = 100, className }: ParallaxSectionProps) => {
      const [repetitions, setRepetitions] = useState(1)
      const targetRef = useRef<HTMLDivElement | null>(null)
      const textRef = useRef<HTMLSpanElement | null>(null)
      const baseX = useMotionValue(0)
      const { scrollY } = useScroll({
        container: containerRef,
        target: textRef,
      })
      const scrollVelocity = useVelocity(scrollY)
      const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
      })

      const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
      })

      useEffect(() => {
        const calculateRepetitions = () => {
          if (targetRef.current && textRef.current) {
            const containerWidth = targetRef.current.offsetWidth
            const textWidth = textRef.current.offsetWidth
            const newRepetitions = textWidth > 0 ? Math.min(100, Math.ceil(containerWidth / textWidth) + 2) : 1
            setRepetitions(newRepetitions)
          }
        }

        calculateRepetitions()

        window.addEventListener('resize', calculateRepetitions)
        return () => window.removeEventListener('resize', calculateRepetitions)
      }, [children])

      const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`)

      const directionFactor = useRef(1)
      useAnimationFrame((_time, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
        if (velocityFactor.get() < 0) {
          directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
          directionFactor.current = 1
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()

        baseX.set(baseX.get() + moveBy)
      })

      return (
        <div className="wui-c-6da6a3c3 wui-c-2cd02d11 wui-c-e82ae8be" {...restProps} ref={targetRef}>
          <motion.div className={clsx('wui-scroll-strip', className)} style={{ x }}>
            {Array.from({ length: repetitions }).map((_, i) => (
              <span aria-hidden={i > 0 ? true : undefined} key={i} ref={i === 0 ? textRef : null}>
                {children}
              </span>
            ))}
          </motion.div>
        </div>
      )
    }

    return (
      <section ref={setContainerRef} className="wui-c-d89972fe wui-c-6da6a3c3">
        <ParallaxSection baseVelocity={velocity} className={className}>
          {text}
        </ParallaxSection>
        <ParallaxSection baseVelocity={-velocity} className={className}>
          {text}
        </ParallaxSection>
      </section>
    )
  }
)

export default ScrollVelocity
