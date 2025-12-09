import * as React from 'react'

export type FixTabPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
  /**
   * 是否显示滚动进度条
   * @default true
   */
  showScrollProgress?: boolean
  /**
   * 滚动进度条的额外属性
   */
  scrollProgressProps?: Record<string, any>
}

declare const FixTabPanel: React.ForwardRefExoticComponent<FixTabPanelProps & React.RefAttributes<HTMLDivElement>>

export default FixTabPanel
