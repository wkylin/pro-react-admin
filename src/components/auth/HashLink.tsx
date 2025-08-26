import React, { forwardRef } from 'react'
import { LinkProps, useNavigate } from 'react-router-dom'
import { HashRouterUtils } from '@src/utils/hashRouter'

export const HashLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, replace = false, children, ...props }, ref) => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (replace) {
      navigate(to, { replace: true })
    } else {
      navigate(to)
    }
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
