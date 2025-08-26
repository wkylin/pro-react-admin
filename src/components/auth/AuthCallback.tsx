import React, { useEffect, useState } from 'react'
import { Result, Spin } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '@src/service/authService'

export const AuthCallback: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
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
        debugger
        navigate('/')
      } catch (err) {
        console.error('Callback handling error:', err)
        setError(err instanceof Error ? err.message : '登录失败')
      }
    }

    handleCallback()
  }, [location, navigate])

  if (error) {
    return (
      <Result
        status="error"
        title="登录失败"
        subTitle={error}
        extra={[
          <button key="retry" onClick={() => navigate('/signin')}>
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
