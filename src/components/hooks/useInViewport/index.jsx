import { useEffect, useRef, useState } from 'react'

const useInViewport = () => {
  const inViewRef = useRef(null)
  const [inViewport, setInViewport] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInViewport(true)
        } else {
          setInViewport(false)
        }
      })
    })

    if (inViewRef.current) {
      observer.observe(inViewRef.current)
    }

    return () => {
      if (inViewRef.current) {
        observer.unobserve(inViewRef.current)
      }
    }
  }, [])

  return {
    inViewRef,
    inViewport
  }
}

export default useInViewport
