import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { permissionService } from '@src/service/permissionService'

export default function useSafeNavigate () {
  const navigate = useNavigate()
  const lastDeniedRef = useRef(null)

  const redirectTo = async (path, options = {}) => {
    if (!path) return
    // allow common public pages
    if (path === '/' || path === '/signin' || path === '/signup') {
      if (options.replace) navigate(path, { replace: true })
      else navigate(path)
      return
    }

    try {
      const ok = await permissionService.canAccessRoute(path, false)
      if (!ok) {
        if (lastDeniedRef.current !== path) {
          lastDeniedRef.current = path
          try {
            message.error('您没有权限访问该页面')
          } catch (e) {
            // ignore
          }
        }
        return
      }
      if (options.replace) navigate(path, { replace: true })
      else navigate(path)
    } catch (err) {
      console.error('safe navigate error', err)
      if (lastDeniedRef.current !== path) {
        lastDeniedRef.current = path
        try {
          message.error('您没有权限访问该页面')
        } catch (e) {}
      }
    }
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
