import type { ComponentPropsWithRef, CSSProperties, MouseEventHandler } from 'react'
import MinimizeHandle from '../MinimizeHandle'
import styles from './index.module.less'

export type HandlePanelStyle = CSSProperties & {
  [variable: `--${string}`]: string | number | undefined
}

export interface HandlePanelProps extends Omit<ComponentPropsWithRef<'div'>, 'style'> {
  /** Accessible name and tooltip of the minimize handle. */
  label?: string
  /** Synchronize the panel and handle red outlines, respecting reduced motion. */
  flashing?: boolean
  /** Standard outer border or the Virtuals inset border and alignment. */
  variant?: 'border' | 'inset'
  /** Notify the caller; visibility is controlled by the caller. */
  onMinimize?: MouseEventHandler<HTMLButtonElement>
  /** Native styles and the original --panel-* / --minimize-tab-* variables. */
  style?: HandlePanelStyle
}

export default function HandlePanel({
  children,
  label = '收起面板',
  flashing = false,
  variant = 'border',
  onMinimize,
  className,
  ...props
}: HandlePanelProps) {
  return (
    <div
      {...props}
      className={[styles.panel, variant === 'inset' && styles.inset, flashing && styles.flashing, className]
        .filter(Boolean)
        .join(' ')}
    >
      <MinimizeHandle label={label} flashing={flashing} onClick={onMinimize} />
      {children}
    </div>
  )
}
