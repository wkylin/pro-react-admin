import React, { forwardRef } from 'react'
import { LinkProps } from 'react-router-dom'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { HashRouterUtils } from '@platform/navigation/hashRouter'

export const HashLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, children, ...props }, ref) => {
  const { redirectTo } = useSafeNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // delegate to safe navigate
    redirectTo(HashRouterUtils.toPathString(to))
  }

  const href = HashRouterUtils.buildHashUrl(to)

  return (
    <a ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
})

HashLink.displayName = 'HashLink'

// 使用示例：
// <HashLink to="/dashboard">Dashboard</HashLink>
