import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { permissionService } from '@src/service/permissionService'

const isExternal = (to) => typeof to === 'string' && /^(https?:)?\/\//.test(to)

export const SafeLink = ({ to, children, onClick, target, replace = false, ...rest }) => {
  const navigate = useNavigate()
  const handleClick = async (e) => {
    if (onClick) onClick(e)
    // 如果已经 preventDefault，尊重它
    if (e.defaultPrevented) return

    // 外部链接或新标签直接打开
    if (target === '_blank' || isExternal(to)) {
      return
    }

    e.preventDefault()
    try {
      const ok = await permissionService.canAccessRoute(to, false)
      if (!ok) {
        try {
          message.error('您没有权限访问该页面')
        } catch (e) {}
        return
      }
      if (replace) navigate(to, { replace: true })
      else navigate(to)
    } catch (err) {
      console.error('SafeLink navigation failed', err)
      try {
        message.error('您没有权限访问该页面')
      } catch (e) {}
    }
  }

  // render as regular Link but intercept clicks
  return (
    <Link to={to} onClick={handleClick} target={target} {...rest}>
      {children}
    </Link>
  )
}

export const SafeNavLink = ({ to, children, className, activeClassName, ...rest }) => {
  const navigate = useNavigate()
  const handleClick = async (e) => {
    if (e.defaultPrevented) return
    e.preventDefault()
    try {
      const ok = await permissionService.canAccessRoute(to, false)
      if (!ok) {
        try {
          message.error('您没有权限访问该页面')
        } catch (e) {}
        return
      }
      navigate(to)
    } catch (err) {
      console.error('SafeNavLink navigation failed', err)
    }
  }

  return (
    <NavLink to={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </NavLink>
  )
}

export default SafeLink
