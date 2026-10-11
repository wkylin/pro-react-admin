import { useCallback, useEffect, useRef, useState, useLayoutEffect } from 'react'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import PortalTooltip from '../PortalTooltip'
import styles from './index.module.less'

// SSR-safe useLayoutEffect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export type OverflowTextTooltipProps = Omit<ComponentProps<typeof PortalTooltip>, 'children'>

export type OverflowTextProps = {
  text?: ReactNode
  minWidth?: CSSProperties['minWidth']
  maxWidth?: CSSProperties['maxWidth']
  className?: string
  style?: CSSProperties
  tooltipProps?: OverflowTextTooltipProps
  alwaysShow?: boolean
  lines?: number
  onOverflowChange?: (isOverflow: boolean) => void
}

const EMPTY_STYLE: CSSProperties = {}
const EMPTY_TOOLTIP_PROPS: OverflowTextTooltipProps = {}

/**
 * OverflowText
 *
 * Renders text that shows a tooltip when it overflows.
 *
 * Supports:
 * - Single line truncation (default)
 * - Multi-line truncation (via props.lines)
 * - Auto-detection of overflow via ResizeObserver
 * - alwaysShow prop to force display
 * - onOverflowChange callback
 */
const OverflowText = ({
  text = '',
  minWidth = 0,
  maxWidth,
  className = '',
  style = EMPTY_STYLE,
  tooltipProps = EMPTY_TOOLTIP_PROPS,
  alwaysShow = false,
  lines = 0,
  onOverflowChange,
}: OverflowTextProps) => {
  const elRef = useRef<HTMLSpanElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const overflowRef = useRef(false)

  const check = useCallback(() => {
    const el = elRef.current
    if (!el) return

    const isMulti = lines && Number(lines) > 0

    // For single line: use scrollWidth > clientWidth
    // For multi line: use scrollHeight > clientHeight
    const overflow = isMulti ? el.scrollHeight > el.clientHeight : el.scrollWidth > el.clientWidth

    if (overflowRef.current === overflow) return
    overflowRef.current = overflow
    setIsOverflow(overflow)
    onOverflowChange?.(overflow)
  }, [lines, onOverflowChange])

  // Check on mount and updates
  useIsomorphicLayoutEffect(() => {
    check()
  }, [check, text, maxWidth, minWidth, style, className])

  useEffect(() => {
    const el = elRef.current
    if (!el || typeof window === 'undefined') return

    // Re-check when fonts load (crucial for custom fonts delay)
    let cancelled = false
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!cancelled) check()
      })
    }

    // ResizeObserver to detect container/element size changes
    let ro: ResizeObserver | undefined
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(check)
      ro.observe(el)
    }

    // Fallback global resize
    window.addEventListener('resize', check)

    return () => {
      cancelled = true
      if (ro) ro.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [check, text])

  // Construct styles
  const effectiveMaxWidth = maxWidth

  const spanStyle: CSSProperties = {
    // Apply minWidth if provided
    ...(minWidth ? { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : {}),
    // Apply maxWidth if provided (this is the CSS max-width)
    ...(effectiveMaxWidth
      ? { maxWidth: typeof effectiveMaxWidth === 'number' ? `${effectiveMaxWidth}px` : effectiveMaxWidth }
      : {}),
    // Multi-line specific styles
    ...(lines && Number(lines) > 0
      ? { WebkitLineClamp: lines, display: '-webkit-box', WebkitBoxOrient: 'vertical', whiteSpace: 'normal' }
      : {}),
    ...style,
  }

  const classes = `${styles.ellipsis} ${lines && Number(lines) > 0 ? styles.multiLine : ''} ${className}`.trim()

  const child = (
    <span ref={elRef} className={classes} style={spanStyle}>
      {text}
    </span>
  )

  return alwaysShow || isOverflow ? (
    <PortalTooltip title={text} {...tooltipProps}>
      {child}
    </PortalTooltip>
  ) : (
    child
  )
}

export default OverflowText
