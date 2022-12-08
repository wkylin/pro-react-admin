import { useState, useEffect } from 'react'

export default function useMousePosition() {
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)

  useEffect(() => {
    const updateMouse = () => {
      window.addEventListener('mousemove', (e) => {
        setX(e.clientX)
        setY(e.clientY)
      })
    }

    window.addEventListener('mousemove', updateMouse)

    return () => {
      window.removeEventListener('mousemove', updateMouse)
    }
  }, [])

  return { x, y }
}
