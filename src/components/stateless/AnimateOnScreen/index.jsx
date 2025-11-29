import React, { useState, useEffect, useRef } from 'react'

// import useElementViewportPosition from '@hooks/useElementViewportPosition'

const useElementOnScreen = (ref, rootMargin = '0px', threshold = 0, triggerOnce = false) => {
  const [isIntersecting, setIsIntersecting] = useState(true)
  const observer = useRef(null)

  // const { position } = useElementViewportPosition(ref)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setIsIntersecting(true)
          if (triggerOnce) {
            observer.current.disconnect()
          }
        } else {
          setIsIntersecting(false)
        }
      },
      { rootMargin, threshold }
    )
    if (ref.current) {
      observer.current.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.current.unobserve(ref.current)
      }
    }
  }, [ref, rootMargin, threshold, triggerOnce])
  return isIntersecting
}

const AnimateIn = ({ from, to, rootMargin, threshold, triggerOnce, children }) => {
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

const FadeIn = ({ rootMargin = '0px', threshold = 0, triggerOnce = false, children }) => (
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

const FadeUp = ({ rootMargin = '0px', threshold = 0, triggerOnce = false, children }) => (
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

const ScaleIn = ({ rootMargin = '0px', threshold = 0, triggerOnce = false, children }) => (
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

const DiyAnimation = ({ from, to, rootMargin = '0px', threshold = 0, triggerOnce = false, children }) => (
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
