import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { permissionService } from '@src/service/permissionService'

const PUBLIC_PATHS = new Set(['/', '/signin', '/signup'])

const isPublicPath = (path) => PUBLIC_PATHS.has(path)

const safeShowDenied = () => {
  Promise.resolve()
    .then(() => message.error('您没有权限访问该页面'))
    .catch((e) => {
      console.warn('显示权限提示失败:', e)
    })
}

export default function useSafeNavigate () {
  const navigate = useNavigate()
  const lastDeniedRef = useRef(null)

  const navigateTo = (path, replace) => {
    if (replace) navigate(path, { replace: true })
    else navigate(path)
  }

  const denyOnce = (path) => {
    if (lastDeniedRef.current === path) return
    lastDeniedRef.current = path
    safeShowDenied()
  }

  const redirectTo = async (path, options = {}) => {
    if (!path) return

    // allow common public pages
    if (isPublicPath(path)) {
      navigateTo(path, !!options.replace)
      return
    }

    let ok = false
    try {
      ok = await permissionService.canAccessRoute(path, false)
    } catch (err) {
      console.error('permission check failed:', err)
      ok = false
    }

    if (!ok) {
      denyOnce(path)
      return
    }

    navigateTo(path, !!options.replace)
  }

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    redirectTo('/')
  }

  return { redirectTo, goBack }
}
