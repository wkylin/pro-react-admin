import React, { useState, useEffect, useRef } from 'react'

const useElementOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIsIntersecting] = useState(true)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { rootMargin }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])
  return isIntersecting
}

const AnimateIn = ({ from, to, children }) => {
  const ref = useRef(null)
  const onScreen = useElementOnScreen(ref)
  const defaultStyles = {
    transition: '1000ms ease-in-out'
  }
  return (
    <div
      ref={ref}
      style={
        onScreen
          ? {
              ...defaultStyles,
              ...to
            }
          : {
              ...defaultStyles,
              ...from
            }
      }
    >
      {children}
    </div>
  )
}

const FadeIn = ({ children }) => (
  <AnimateIn from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {children}
  </AnimateIn>
)

const FadeUp = ({ children }) => (
  <AnimateIn from={{ opacity: 0, translate: '0 2rem' }} to={{ opacity: 1, translate: 'none' }}>
    {children}
  </AnimateIn>
)

const ScaleIn = ({ children }) => (
  <AnimateIn from={{ scale: '0' }} to={{ scale: '1' }}>
    {children}
  </AnimateIn>
)

const AnimateOnScreen = {
  FadeIn,
  FadeUp,
  ScaleIn
}

export default AnimateOnScreen
