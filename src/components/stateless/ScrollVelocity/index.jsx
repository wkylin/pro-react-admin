import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react'
import clsx from 'clsx'

export const wrap = (min, max, v) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const ScrollVelocity = React.forwardRef(({ text, velocity = 3, className }, ref) => {
  const ParallaxSection = ({ children, baseVelocity = 100, className }) => {
    const [repetitions, setRepetitions] = useState(1)
    const targetRef = useRef(null)
    const textRef = useRef(null)
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll({
      container: ref,
      target: textRef
    })
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    })

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    })

    useEffect(() => {
      const calculateRepetitions = () => {
        if (targetRef.current && textRef.current) {
          const containerWidth = targetRef.current.offsetWidth
          const textWidth = textRef.current.offsetWidth
          const newRepetitions = Math.ceil(containerWidth / textWidth) + 2
          setRepetitions(newRepetitions)
        }
      }

      calculateRepetitions()

      window.addEventListener('resize', calculateRepetitions)
      return () => window.removeEventListener('resize', calculateRepetitions)
    }, [children])

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`)

    const directionFactor = useRef(1)
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

      console.log('velocityFactor.get()', velocityFactor.get())
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get()

      baseX.set(baseX.get() + moveBy)
    })

    return (
      <div className='w-full overflow-hidden whitespace-nowrap' ref={targetRef}>
        <motion.div className={clsx('inline-block', className)} style={{ x }}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <span key={i} ref={i === 0 ? textRef : null}>
              {children}
            </span>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <section className='relative w-full'>
      <ParallaxSection baseVelocity={velocity} className={className}>
        {text}
      </ParallaxSection>
      <ParallaxSection baseVelocity={-velocity} className={className}>
        {text}
      </ParallaxSection>
    </section>
  )
})

export default ScrollVelocity
