import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'motion/react'

const FloatingIcon = ({ children, initialX }) => {
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()

  const startFloating = async () => {
    if (isClient) {
      while (true) {
        await controls.start({
          x: initialX + Math.random() * 30 - 15,
          y: Math.random() * 30 - 15,
          transition: {
            duration: 3,
            ease: 'easeInOut'
          }
        })
      }
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    startFloating()
  }, [isClient])

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragConstraints={{
        top: -200,
        left: -200,
        right: 200,
        bottom: 0
      }}
      whileDrag={{ scale: 1.1 }}
      initial={{ x: initialX, y: 0 }}
      animate={controls}
      className='cursor-move'
    >
      {children}
    </motion.div>
  )
}

export const SocialIcon = ({ icon: Icon, color, ...props }) => (
  <div className={`rounded-full p-3 ${color} shadow-lg transition-shadow hover:shadow-xl`}>
    <Icon className='h-6 w-6 text-white' />
  </div>
)

export default FloatingIcon
