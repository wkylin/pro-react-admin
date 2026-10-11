import type * as React from 'react'

export type AnimatedIconVariant = 'spin' | 'pulse' | 'bounce' | 'draw'
export type AnimatedIconMode = 'hover' | 'auto' | 'idle'

export type AnimatedIconProps = React.SVGProps<SVGElement> & {
  children: React.ReactElement
  variant?: AnimatedIconVariant
  mode?: AnimatedIconMode
  className?: string
}
