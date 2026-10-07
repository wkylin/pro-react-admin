import { useRef, useEffect, useState } from 'react'
import { useSprings, animated, type SpringToFn } from '@react-spring/web'

import styles from './index.module.less'

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
}

type BlurTextAnimation = {
  filter: string
  opacity: number
  transform: string
}

type BlurTextNext = Parameters<SpringToFn<BlurTextAnimation>>[0]

const BlurText = ({ text, delay = 200, className = '' }: BlurTextProps) => {
  const words = text.split(' ')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const springs = useSprings(
    words.length,
    words.map((_, i) => ({
      from: {
        filter: 'blur(10px)',
        opacity: 0,
        transform: 'translate3d(0,-50px,0)',
      },
      to: inView
        ? async (next: BlurTextNext) => {
            try {
              await next({
                filter: 'blur(5px)',
                opacity: 0.5,
                transform: 'translate3d(0,5px,0)',
              })
              await next({
                filter: 'blur(0px)',
                opacity: 1,
                transform: 'translate3d(0,0,0)',
              })
            } catch (err) {
              console.log('err', err)
            }
          }
        : { filter: 'blur(10px)', opacity: 0 },
      delay: i * delay,
    }))
  )

  return (
    <p ref={ref} className={className}>
      {springs.map((props, index) => (
        <animated.span key={index} style={props} className={styles.blurText}>
          {words[index]}&nbsp;
        </animated.span>
      ))}
    </p>
  )
}

export default BlurText
