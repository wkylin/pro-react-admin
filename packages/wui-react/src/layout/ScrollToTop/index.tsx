import { useEffect, type ReactNode, type RefObject } from 'react'
export interface ScrollToTopProps {
  resetKey?: unknown
  behavior?: ScrollBehavior
  target?: RefObject<HTMLElement | null>
  children?: ReactNode
}
export default function ScrollToTop({ resetKey, behavior = 'smooth', target, children }: ScrollToTopProps) {
  useEffect(() => {
    const element = target ? target.current : window
    element?.scrollTo({ top: 0, left: 0, behavior })
  }, [resetKey, behavior, target])
  return children
}
