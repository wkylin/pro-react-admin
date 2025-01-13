import React, { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import clsx from 'clsx'

const FloatAny = ({
  children,
  speed = 0.5,
  amplitude = [10, 30, 30],
  rotationRange = [15, 15, 7.5],
  timeOffset = 0,
  className,
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rotateZ = useMotionValue(0)

  const time = useRef(0)

  useAnimationFrame(() => {
    time.current += speed * 0.02

    const newX = Math.sin(time.current * 0.7 + timeOffset) * amplitude[0]
    const newY = Math.sin(time.current * 0.6 + timeOffset) * amplitude[1]
    const newZ = Math.sin(time.current * 0.5 + timeOffset) * amplitude[2]

    const newRotateX = Math.sin(time.current * 0.5 + timeOffset) * rotationRange[0]
    const newRotateY = Math.sin(time.current * 0.4 + timeOffset) * rotationRange[1]
    const newRotateZ = Math.sin(time.current * 0.3 + timeOffset) * rotationRange[2]

    x.set(newX > 0 ? newX : 0)
    y.set(newY > 0 ? newY : 0)
    z.set(newZ > 0 ? newZ : 0)
    rotateX.set(newRotateX > 0 ? newRotateX : 0)
    rotateY.set(newRotateY > 0 ? newRotateY : 0)
    rotateZ.set(newRotateZ > 0 ? newRotateZ : 0)
  })

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        transformStyle: 'preserve-3d',
      }}
      className={clsx('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}

export default FloatAny
