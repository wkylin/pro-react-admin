import { AnimatePresence, motion, type Transition } from 'motion/react'
import { Children, cloneElement, isValidElement, useState, useId, type ReactElement, type HTMLAttributes } from 'react'
import clsx from 'clsx'
export interface AnimatedBackgroundChildProps extends HTMLAttributes<HTMLElement> {
  'data-id'?: string
  'data-checked'?: string
}
export interface AnimatedBackgroundProps {
  children?: ReactElement<AnimatedBackgroundChildProps> | readonly ReactElement<AnimatedBackgroundChildProps>[] | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  className?: string
  transition?: Transition
  enableHover?: boolean
}
export default function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null)
  const uniqueId = useId()
  const select = (id: string | null) => {
    setActiveId(id)
    onValueChange?.(id)
  }
  return Children.map(children, (node, index) => {
    if (!isValidElement<AnimatedBackgroundChildProps>(node)) return node
    const child: ReactElement<AnimatedBackgroundChildProps> = node
    const id = child.props['data-id'] ?? String(index)
    const nativeInteractive =
      typeof child.type === 'string' && ['button', 'a', 'input', 'select', 'textarea'].includes(child.type)
    return cloneElement(
      child,
      {
        style: { position: 'relative', display: 'inline-flex', ...child.props.style },
        'data-checked': activeId === id ? 'true' : 'false',
        tabIndex: child.props.tabIndex ?? (nativeInteractive ? undefined : 0),
        role: child.props.role ?? (nativeInteractive ? undefined : 'button'),
        onClick: (event) => {
          child.props.onClick?.(event)
          if (!event.defaultPrevented) select(id)
        },
        onFocus: (event) => {
          child.props.onFocus?.(event)
          if (!event.defaultPrevented) select(id)
        },
        onKeyDown: (event) => {
          child.props.onKeyDown?.(event)
          if (!event.defaultPrevented && !nativeInteractive && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            select(id)
          }
        },
        ...(enableHover
          ? {
              onMouseEnter: (event) => {
                child.props.onMouseEnter?.(event)
                if (!event.defaultPrevented) select(id)
              },
              onMouseLeave: (event) => {
                child.props.onMouseLeave?.(event)
                if (!event.defaultPrevented) select(null)
              },
            }
          : {}),
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.span
              aria-hidden="true"
              layoutId={`background-${uniqueId}`}
              className={clsx(className)}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <span style={{ position: 'relative', zIndex: 1 }}>{child.props.children}</span>
      </>
    )
  })
}
