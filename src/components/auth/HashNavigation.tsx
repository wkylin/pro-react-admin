import React from 'react'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { HashRouterUtils } from '@src/utils/hashRouter'

interface HashNavigationProps {
  to: string
  replace?: boolean
  children: React.ReactNode
}

export const HashNavigation: React.FC<HashNavigationProps> = ({ to, replace = false, children }) => {
  const { redirectTo } = useSafeNavigate()
  // const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (replace) {
      redirectTo(to, { replace: true })
    } else {
      redirectTo(to)
    }
  }

  const href = HashRouterUtils.buildHashUrl(to)

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  )
}

// 使用示例：
// <HashNavigation to="/dashboard">Dashboard</HashNavigation>
