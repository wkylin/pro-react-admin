import { Link, NavLink, useNavigate, type LinkProps, type NavLinkProps } from 'react-router-dom'
import type { MouseEvent, RefAttributes } from 'react'
import { message } from 'antd'
import { permissionService } from '@src/service/permissionService'
import { HashRouterUtils } from '@src/utils/hashRouter'

type SafeLinkProps = LinkProps & RefAttributes<HTMLAnchorElement>
type SafeNavLinkProps = NavLinkProps & RefAttributes<HTMLAnchorElement> & { activeClassName?: string }

const isExternal = (to: unknown): boolean => typeof to === 'string' && /^(https?:)?\/\//.test(to)

export const SafeLink = ({ to, children, onClick, target, replace = false, ...rest }: SafeLinkProps) => {
  const navigate = useNavigate()
  const normalizedTo = HashRouterUtils.toPathString(to)
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    if (onClick) onClick(e)
    // 如果已经 preventDefault，尊重它
    if (e.defaultPrevented) return

    // 外部链接或新标签直接打开
    if (target === '_blank' || isExternal(to)) {
      return
    }

    e.preventDefault()
    try {
      const ok = await permissionService.canAccessRoute(normalizedTo, false)
      if (!ok) {
        try {
          message.error('您没有权限访问该页面')
        } catch (e) {}
        return
      }
      if (replace) navigate(normalizedTo, { replace: true })
      else navigate(normalizedTo)
    } catch (err) {
      console.error('SafeLink navigation failed', err)
      try {
        message.error('您没有权限访问该页面')
      } catch (e) {}
    }
  }

  // render as regular Link but intercept clicks
  return (
    <Link to={normalizedTo} onClick={handleClick} target={target} {...rest}>
      {children}
    </Link>
  )
}

export const SafeNavLink = ({ to, children, className, activeClassName, ...rest }: SafeNavLinkProps) => {
  void activeClassName
  const navigate = useNavigate()
  const normalizedTo = HashRouterUtils.toPathString(to)
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    if (e.defaultPrevented) return
    e.preventDefault()
    try {
      const ok = await permissionService.canAccessRoute(normalizedTo, false)
      if (!ok) {
        try {
          message.error('您没有权限访问该页面')
        } catch (e) {}
        return
      }
      navigate(normalizedTo)
    } catch (err) {
      console.error('SafeNavLink navigation failed', err)
    }
  }

  return (
    <NavLink to={normalizedTo} onClick={handleClick} className={className} {...rest}>
      {children}
    </NavLink>
  )
}

export default SafeLink
