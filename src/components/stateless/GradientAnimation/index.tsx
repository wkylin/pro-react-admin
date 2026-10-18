import React from 'react'
import styles from './index.module.less'
import { accessibleGradientPalettes } from '@theme/contrast'

type GradientAnimationTextProps = {
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
