import React, { useEffect, useState } from 'react'
import { Result, Spin } from 'antd'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { authService } from '@src/service/authService'
import { permissionService } from '@src/service/permissionService'

export const AuthCallback: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const { redirectTo } = useSafeNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search)
        const code = urlParams.get('code')
        const errorParam = urlParams.get('error')

        if (errorParam) {
          setError(`GitHub OAuth 错误: ${errorParam}`)
          return
        }

        if (!code) {
          setError('未收到授权码')
          return
        }

        await authService.handleCallback(code)

        // 登录成功后立即同步权限
        try {
          await permissionService.syncPermissions()
        } catch (error) {
          console.error('同步权限失败:', error)
          // 即使权限同步失败，也允许登录，使用默认权限
        }

        // 获取用户可访问的第一个路由
        try {
          const routes = await permissionService.getAccessibleRoutes(true)
          const safeRoutes = Array.isArray(routes) ? routes : []
          if (safeRoutes.length > 0) {
            // 跳转到第一个有权限的路由（优先首页）
            const targetRoute = safeRoutes.includes('/') ? '/' : safeRoutes[0]
            redirectTo(targetRoute)
          } else {
            // 如果没有权限，跳转到403
            redirectTo('/403')
          }
        } catch (error) {
          console.error('获取路由失败:', error)
          // 默认跳转到首页，让路由守卫处理权限
          redirectTo('/')
        }
      } catch (err) {
        console.error('Callback handling error:', err)
        setError(err instanceof Error ? err.message : '登录失败')
      }
    }

    handleCallback()
  }, [location])

  if (error) {
    return (
      <Result
        status="error"
        title="登录失败"
        subTitle={error}
        extra={[
          <button key="retry" onClick={() => redirectTo('/signin')}>
            重试
          </button>,
        ]}
      />
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin size="large" fullscreen tip="正在处理登录..." />
    </div>
  )
}
