import React from 'react'

interface AnimationInViewProps {
  children: React.ReactNode
  variants?: {
    hidden: { opacity: number; y: number }
    visible: { opacity: number; y: number }
  }
  transition?: Record<string, unknown>
  viewOptions?: Record<string, unknown>
  as?: string
  className?: string
  style?: React.CSSProperties
  once?: boolean
  amount?: number
  margin?: string
  scrollContainerRef?: React.RefObject<HTMLElement>
}

declare const AnimationInView: React.FC<AnimationInViewProps>

export default AnimationInView
