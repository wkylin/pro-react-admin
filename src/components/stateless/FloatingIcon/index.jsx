import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const FloatingIcon = ({ children, initialX }) => {
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()
  const isMounted = useRef(true) // 添加ref来跟踪组件挂载状态

  const startFloating = async () => {
    if (isClient && isMounted.current) {
      // 检查组件是否仍挂载
      await controls.start({
        x: initialX + Math.random() * 30 - 15,
        y: Math.random() * 30 - 15,
        transition: {
          duration: 3,
          ease: 'easeInOut',
        },
      })

      // 递归调用前再次检查组件是否挂载
      if (isMounted.current) {
        startFloating()
      }
    }
  }

  useEffect(() => {
    setIsClient(true)

    // 添加清理函数，组件卸载时设置isMounted为false
    return () => {
      isMounted.current = false
      controls.stop() // 停止所有动画
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      startFloating()
    }
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
        bottom: 0,
      }}
      whileDrag={{ scale: 1.1 }}
      initial={{ x: initialX, y: 0 }}
      animate={controls}
      className="cursor-move"
    >
      {children}
    </motion.div>
  )
}

export const SocialIcon = ({ icon: Icon, color, ...props }) => (
  <div className={`rounded-full p-3 ${color} shadow-lg transition-shadow hover:shadow-xl`}>
    <Icon className="h-6 w-6 text-white" />
  </div>
)

export default FloatingIcon
