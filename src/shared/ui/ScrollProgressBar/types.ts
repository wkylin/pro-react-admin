import type * as React from 'react'

export interface ScrollProgressBarProps {
  /** 滚动容器元素；未指定时监听页面滚动。 */
  container?: HTMLElement | null
  /** 定位方式。 */
  position?: 'fixed' | 'relative' | 'absolute' | 'sticky'
  /** 进度条高度，默认 3px。 */
  height?: number
  /** 支持 CSS 颜色或渐变。 */
  color?: string
  /** 附加 CSS 类名。 */
  className?: string
  /** 是否显示进度条，默认 true。 */
  show?: boolean
  /** 进度动画配置。 */
  springConfig?: {
    stiffness?: number
    damping?: number
    restDelta?: number
  }
}

export interface ScrollAreaProps extends Omit<ScrollProgressBarProps, 'container'> {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
