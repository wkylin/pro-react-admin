import React from 'react'
import styles from './index.module.less'
const accessibleGradientPalettes = {
  light: ['#0958d9', '#531dab', '#006d75', '#a8071a', '#003eb3'],
  dark: ['#69b1ff', '#b37feb', '#95de64', '#ffadd2', '#5cdbd3'],
} as const

export type GradientAnimationTextProps = {
  text: string
  surface?: keyof typeof accessibleGradientPalettes
}

const GradientAnimationText = ({ text, surface = 'light' }: GradientAnimationTextProps) => {
  const gradientStops = accessibleGradientPalettes[surface].join(', ')

  return (
    <span
      className={styles['package-name']}
      style={{ '--package-gradient-stops': gradientStops } as React.CSSProperties}
    >
      {text}
    </span>
  )
}

export default GradientAnimationText
