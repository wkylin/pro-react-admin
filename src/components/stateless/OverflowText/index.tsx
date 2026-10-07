import { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import PortalTooltip from '../PortalTooltip'
import styles from './index.module.less'

// SSR-safe useLayoutEffect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type TooltipProps = Omit<ComponentProps<typeof PortalTooltip>, 'children'>

type OverflowTextProps = {
  text?: ReactNode
  minWidth?: CSSProperties['minWidth']
  maxWidth?: CSSProperties['maxWidth']
  className?: string
  style?: CSSProperties
  tooltipProps?: TooltipProps
  alwaysShow?: boolean
  lines?: number
  onOverflowChange?: (isOverflow: boolean) => void
}

const EMPTY_STYLE: CSSProperties = {}
const EMPTY_TOOLTIP_PROPS: TooltipProps = {}

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

  // Stabilize style reference — only re-run effect when style content actually changes
  const stableStyleKey = useMemo(() => JSON.stringify(style), [style])

  const check = () => {
    const el = elRef.current
    if (!el) return

    const isMulti = lines && Number(lines) > 0

    // For single line: use scrollWidth > clientWidth
    // For multi line: use scrollHeight > clientHeight
    let overflow = false

    if (isMulti) {
      overflow = el.scrollHeight > el.clientHeight
    } else {
      // Single line check
      overflow = el.scrollWidth > el.clientWidth
    }

    setIsOverflow((prev) => {
      if (prev !== overflow) {
        if (typeof onOverflowChange === 'function') onOverflowChange(overflow)
        return overflow
      }
      return prev
    })
  }

  // Check on mount and updates
  useIsomorphicLayoutEffect(() => {
    check()
  }, [text, lines, maxWidth, stableStyleKey, className])

  useEffect(() => {
    const el = elRef.current
    if (!el || typeof window === 'undefined') return

    // Re-check when fonts load (crucial for custom fonts delay)
    if (document.fonts) {
      document.fonts.ready.then(check)
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
      if (ro) ro.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [text, lines])

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
    <PortalTooltip title={typeof text === 'string' ? text : undefined} {...tooltipProps}>
      {child}
    </PortalTooltip>
  ) : (
    child
  )
}

export default OverflowText
