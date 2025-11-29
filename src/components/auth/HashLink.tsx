import React, { forwardRef } from 'react'
import { LinkProps } from 'react-router-dom'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { HashRouterUtils } from '@src/utils/hashRouter'

export const HashLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, replace = false, children, ...props }, ref) => {
  const { redirectTo } = useSafeNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // delegate to safe navigate
    redirectTo(to as any)
  }

  const href = HashRouterUtils.buildHashUrl(to as any)

  return (
    <a ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
})

HashLink.displayName = 'HashLink'

// 使用示例：
// <HashLink to="/dashboard">Dashboard</HashLink>
