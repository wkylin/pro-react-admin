import type { HTMLAttributes, ReactNode } from 'react'
import styles from '../display.module.less'
export interface NumberViewCardProps extends HTMLAttributes<HTMLDivElement> {
  value?: number | string
  label?: ReactNode
  formatValue?: (value: number | string) => ReactNode
}
export default function NumberViewCard({
  value = '',
  label,
  formatValue,
  className = '',
  ...props
}: NumberViewCardProps) {
  return (
    <div {...props} className={`${styles.numberCard} ${className}`}>
      <i aria-hidden="true" />
      <strong>{formatValue ? formatValue(value) : value}</strong>
      <div>{label}</div>
    </div>
  )
}
