import { useLocation } from 'react-router-dom'
import ScrollToTop, { type ScrollToTopProps } from '@wui/layout/ScrollToTop'
export type { ScrollToTopProps } from '@wui/layout/ScrollToTop'

// Preserve pathname wiring for existing application imports.
export default function RouteScrollToTop(props: ScrollToTopProps) {
  const { pathname } = useLocation()
  return <ScrollToTop {...props} resetKey={props.resetKey ?? pathname} />
}
