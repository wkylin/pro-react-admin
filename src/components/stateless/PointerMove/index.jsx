import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import styles from './index.module.less'

const PointerMove = () => {
  const ref = useRef(null)
  const [coordinates, setCoordinates] = useState({ x: 158, y: 18 })

  useEffect(() => {
    //  check if DOM element referenced by ref has been mounted
    if (ref.current) {
      const handlePointerMove = ({ clientX, clientY }) => {
        const element = ref.current
        // calculate x and y coordinates
        const x = clientX + (element.offsetLeft + element.offsetWidth)
        const y = clientY + (element.offsetTop + element.offsetHeight)
        // update state
        setCoordinates({ x, y })
      }

      window.addEventListener('pointermove', handlePointerMove)
      return () => window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      className={styles.star}
      animate={{ x: coordinates.x, y: coordinates.y, opacity: 1 }}
      transition={{
        type: 'spring',
      }}
    />
  )
}

export default PointerMove
