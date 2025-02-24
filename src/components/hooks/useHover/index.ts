import { useEffect, useRef, useState } from 'react'

export default function useHover<U extends HTMLElement>() {
  const [isHovering, setIsHovering] = useState(false)
  const ref = useRef<U>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => {
      setIsHovering(true)
    }
    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [ref])

  return { isHovering, ref }
}

// const { ref: hoverRef, isHovering } = useHover<HTMLDivElement>();
