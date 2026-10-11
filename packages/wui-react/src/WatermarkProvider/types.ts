import type { ReactNode } from 'react'

export interface WatermarkProviderProps {
  content: string
  children: ReactNode
  containerId?: string
  opacity?: number
  rotate?: number
}
