import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import styles from './index.module.less'

const PointerMove = () => {
  const ref = useRef(null)
  const [coordinates, setCoordinates] = useState({ x: 158, y: 18 })

  const rafIdRef = useRef(0)
  const latestPointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    //  check if DOM element referenced by ref has been mounted
    if (ref.current) {
      const flush = () => {
        rafIdRef.current = 0
        const element = ref.current
        if (!element) return
        const { x: clientX, y: clientY } = latestPointerRef.current
        // calculate x and y coordinates (keep original semantics)
        const x = clientX + (element.offsetLeft + element.offsetWidth)
        const y = clientY + (element.offsetTop + element.offsetHeight)
        setCoordinates({ x, y })
      }

      const handlePointerMove = ({ clientX, clientY }) => {
        latestPointerRef.current = { x: clientX, y: clientY }
        if (rafIdRef.current) return
        rafIdRef.current = requestAnimationFrame(flush)
      }

      window.addEventListener('pointermove', handlePointerMove)
      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = 0
        }
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      className={styles.star}
      animate={{ x: coordinates?.x ?? 0, y: coordinates?.y ?? 0, opacity: 1 }}
      transition={{
        type: 'spring'
      }}
    />
  )
}

export default PointerMove
