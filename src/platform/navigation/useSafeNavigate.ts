import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from '@platform/feedback/message'
import { permissionService } from '@platform/auth/services/permissionService'
import { HashRouterUtils } from './hashRouter'

const PUBLIC_PATHS = new Set(['/', '/signin', '/signup'])

type NavigationTarget = string | { pathname?: string; search?: string }
type SafeNavigateOptions = { replace?: boolean }

const isPublicPath = (path: string) => PUBLIC_PATHS.has(path)

const safeShowDenied = () => {
  Promise.resolve()
    .then(() => message.error('您没有权限访问该页面'))
    .catch((e) => {
      console.warn('显示权限提示失败:', e)
    })
}

export default function useSafeNavigate() {
  const navigate = useNavigate()
  const lastDeniedRef = useRef<string | null>(null)

  const navigateTo = useCallback(
    (path: string, replace: boolean) => {
      navigate(path, replace ? { replace: true } : undefined)
    },
    [navigate]
  )

  const denyOnce = useCallback((path: string) => {
    if (lastDeniedRef.current === path) return
    lastDeniedRef.current = path
    safeShowDenied()
  }, [])

  const redirectTo = useCallback(
    async (path: NavigationTarget | null | undefined, options: SafeNavigateOptions = {}) => {
      if (!path) return

      // 支持 react-router 的 To 对象（{ pathname, search }），统一转成字符串
      const normalizedPath = HashRouterUtils.toPathString(path).trim()
      if (!normalizedPath) return

      // allow common public pages
      if (isPublicPath(normalizedPath)) {
        navigateTo(normalizedPath, !!options.replace)
        return
      }

      let allowed = false
      try {
        allowed = await permissionService.canAccessRoute(normalizedPath, false)
      } catch {
        allowed = false
      }

      if (!allowed) {
        denyOnce(normalizedPath)
        return
      }

      navigateTo(normalizedPath, !!options.replace)
    },
    [denyOnce, navigateTo]
  )

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    void redirectTo('/')
  }, [navigate, redirectTo])

  return { redirectTo, goBack }
}
