import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HashRouterUtils } from '@src/utils/hashRouter'

interface HashNavigationProps {
  to: string
  replace?: boolean
  children: React.ReactNode
}

export const HashNavigation: React.FC<HashNavigationProps> = ({ to, replace = false, children }) => {
  const navigate = useNavigate()
  // const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (replace) {
      navigate(to, { replace: true })
    } else {
      navigate(to)
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
