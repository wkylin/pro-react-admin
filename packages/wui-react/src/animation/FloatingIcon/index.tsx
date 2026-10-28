import React, { useEffect, useState, useRef } from 'react'
import type { ComponentType, HTMLAttributes, ReactNode, SVGProps } from 'react'
import styles from './index.module.less'
import { motion, useAnimation } from 'framer-motion'
import AnimatedIcon from '../../AnimatedIcon'

export interface FloatingIconProps {
  children?: ReactNode
  initialX?: number
}
const FloatingIcon = ({ children, initialX = 0 }: FloatingIconProps) => {
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()
  const isMounted = useRef(true) // 添加ref来跟踪组件挂载状态

  useEffect(() => {
    isMounted.current = true
    const id = setTimeout(() => setIsClient(true), 0)

    // 添加清理函数，组件卸载时设置isMounted为false
    return () => {
      clearTimeout(id)
      isMounted.current = false
      controls.stop() // 停止所有动画
    }
  }, [controls])

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

export interface SocialIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  color?: string
  label: string
}
export const SocialIcon = ({ icon: Icon, color, label, className = '', style, ...props }: SocialIconProps) => (
  <div
    role="img"
    aria-label={label}
    className={`${styles.social} ${className}`}
    style={{ backgroundColor: color, ...style }}
    {...props}
  >
    <AnimatedIcon variant="spin" mode="hover">
      <Icon width={24} height={24} aria-hidden />
    </AnimatedIcon>
  </div>
)
export default FloatingIcon
