import type React from 'react'
import type { ScrollProgressBarProps } from '../ScrollProgressBar'

export interface FixTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  showScrollProgress?: boolean
  scrollProgressProps?: ScrollProgressBarProps
  fill?: boolean
}
