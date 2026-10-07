import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'

// import useElementViewportPosition from '@hooks/useElementViewportPosition'

interface AnimationProps {
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
  children?: ReactNode
}

interface AnimateInProps extends Required<Omit<AnimationProps, 'children'>> {
  from: CSSProperties
  to: CSSProperties
  children?: ReactNode
}

interface DiyAnimationProps extends AnimationProps {
  from: CSSProperties
  to: CSSProperties
}

const useElementOnScreen = (ref: RefObject<Element | null>, rootMargin = '0px', threshold = 0, triggerOnce = false) => {
  const [isIntersecting, setIsIntersecting] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  // const { position } = useElementViewportPosition(ref)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setIsIntersecting(true)
          if (triggerOnce) {
            intersectionObserver.disconnect()
          }
        } else {
          setIsIntersecting(false)
        }
      },
      { rootMargin, threshold }
    )
    observer.current = intersectionObserver
    if (ref.current) {
      intersectionObserver.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        intersectionObserver.unobserve(ref.current)
      }
    }
  }, [ref, rootMargin, threshold, triggerOnce])
  return isIntersecting
}

const AnimateIn = ({ from, to, rootMargin, threshold, triggerOnce, children }: AnimateInProps) => {
  const ref = useRef(null)
  const onScreen = useElementOnScreen(ref, rootMargin, threshold, triggerOnce)
  const defaultStyles = {
    transition: '1000ms ease-in-out',
  }
  return (
    <div
      ref={ref}
      style={
        onScreen
          ? {
              ...defaultStyles,
              ...to,
            }
          : {
              ...defaultStyles,
              ...from,
            }
      }
    >
      {children}
    </div>
  )
}

const FadeIn = ({ rootMargin = '0px', threshold = 0, triggerOnce = false, children }: AnimationProps) => (
  <AnimateIn
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
    rootMargin={rootMargin}
    threshold={threshold}
    triggerOnce={triggerOnce}
  >
    {children}
  </AnimateIn>
)

const FadeUp = ({ rootMargin = '0px', threshold = 0, triggerOnce = false, children }: AnimationProps) => (
  <AnimateIn
    from={{ opacity: 0, translate: '0 2rem' }}
    to={{ opacity: 1, translate: 'none' }}
    rootMargin={rootMargin}
    threshold={threshold}
    triggerOnce={triggerOnce}
  >
    {children}
  </AnimateIn>
)

const ScaleIn = ({ rootMargin = '0px', threshold = 0, triggerOnce = false, children }: AnimationProps) => (
  <AnimateIn
    from={{ scale: '0' }}
    to={{ scale: '1' }}
    rootMargin={rootMargin}
    threshold={threshold}
    triggerOnce={triggerOnce}
  >
    {children}
  </AnimateIn>
)

const DiyAnimation = ({
  from,
  to,
  rootMargin = '0px',
  threshold = 0,
  triggerOnce = false,
  children,
}: DiyAnimationProps) => (
  <AnimateIn from={from} to={to} rootMargin={rootMargin} threshold={threshold} triggerOnce={triggerOnce}>
    {children}
  </AnimateIn>
)

const AnimateOnScreen = {
  FadeIn,
  FadeUp,
  ScaleIn,
  DiyAnimation,
}

export default AnimateOnScreen
