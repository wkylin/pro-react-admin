import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const FloatingIcon = ({ children, initialX }) => {
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()
  const isMounted = useRef(true) // 添加ref来跟踪组件挂载状态

  useEffect(() => {
    const id = setTimeout(() => setIsClient(true), 0)

    // 添加清理函数，组件卸载时设置isMounted为false
    return () => {
      clearTimeout(id)
      isMounted.current = false
      controls.stop() // 停止所有动画
    }
  }, [])

  useEffect(() => {
    if (!isClient) return

    let cancelled = false

    const run = async () => {
      if (!isMounted.current || cancelled) return
      const x = initialX + Math.random() * 30 - 15
      const y = Math.random() * 30 - 15

      await controls.start({
        x,
        y,
        transition: {
          duration: 3,
          ease: 'easeInOut',
        },
      })

      if (isMounted.current && !cancelled) {
        run()
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [isClient, initialX, controls])

  return (
    <motion.div initial={{ x: initialX, y: 0 }} animate={controls}>
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
