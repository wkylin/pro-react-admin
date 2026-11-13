import { useId, type ComponentPropsWithRef, type CSSProperties } from 'react'
import styles from './index.module.less'

export type MinimizeHandleStyle = CSSProperties & {
  [variable: `--${string}`]: string | number | undefined
}

export interface MinimizeHandleProps extends Omit<ComponentPropsWithRef<'button'>, 'children' | 'style' | 'type'> {
  /** Accessible name and default tooltip for the handle. */
  label: string
  /** Show the red outline when the user has not requested reduced motion. */
  flashing?: boolean
  /** Native styles and the original --panel-* / --minimize-tab-* variables. */
  style?: MinimizeHandleStyle
}

// Original compact geometry: 64 × 22, mirrored about x = 36.
// Both feet have zero curvature; shoulder joins retain tangent and curvature.
const capCurve =
  'M4 22.5 C8 22.5 10.25 22.5 14 17 C17.75 11.5 23 .5 36 .5 C49 .5 54.25 11.5 58 17 C61.75 22.5 64 22.5 68 22.5'

export default function MinimizeHandle({ label, flashing = false, className, style, ...props }: MinimizeHandleProps) {
  const capId = `handle-${useId()}`

  return (
    <button
      {...props}
      type="button"
      className={[styles.handle, flashing && styles.flashing, className].filter(Boolean).join(' ')}
      style={style}
      aria-label={props['aria-label'] ?? label}
      title={props.title ?? label}
    >
      <svg className={styles.cap} viewBox="0 0 72 26" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${capId}-fill`} gradientUnits="userSpaceOnUse" x1="0" y1=".5" x2="0" y2="22.5">
            <stop className={styles.tint} offset="0" />
            <stop className={styles.base} offset=".7" />
            <stop className={styles.base} offset="1" />
          </linearGradient>
          <linearGradient id={`${capId}-rim`} gradientUnits="userSpaceOnUse" x1="0" y1=".5" x2="0" y2="22.5">
            <stop className={styles.rim} offset="0" stopOpacity=".65" />
            <stop className={styles.rim} offset=".7" stopOpacity=".85" />
            <stop className={styles.rim} offset="1" />
          </linearGradient>
        </defs>
        {/* Opaque fill and 1px rim cover the inner half of the 5px alert stroke. */}
        <path className={styles.alert} d={capCurve} fill="none" strokeWidth="5" vectorEffect="non-scaling-stroke" />
        {/* The 3px extension masks the panel's top edge only beneath the handle. */}
        <path
          fill={`url(#${capId}-fill)`}
          stroke={`url(#${capId}-fill)`}
          strokeWidth="1"
          d={`${capCurve} V25.5 H4 Z`}
        />
        <path
          stroke={`url(#${capId}-rim)`}
          d={capCurve}
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        className={styles.icon}
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}
