import { useEffect, useRef, useState } from 'react'

const useInViewport = (triggerOnce = false, threshold = 0, rootMargin = '0px') => {
  const inViewRef = useRef(null)
  const [inViewport, setInViewport] = useState(false)
  const observer = useRef(null)

  useEffect(() => {
    const targetElement = inViewRef.current
    if (!targetElement) return
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setInViewport(true)
            if (triggerOnce && observer.current) {
              observer.current.disconnect()
            }
          } else {
            setInViewport(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.current.observe(targetElement)

    return () => {
      if (observer.current && targetElement) {
        observer.current.unobserve(targetElement)
      }
    }
  }, [threshold, triggerOnce, rootMargin])

  return {
    inViewRef,
    inViewport
  }
}

export default useInViewport
