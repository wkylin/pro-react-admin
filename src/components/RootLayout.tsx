import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AuthRouter from '@/routers/authRouter'

const RootLayout: React.FC = () => {
  const asyncCall = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))

  useEffect(() => {
    // 可在此处初始化非阻塞逻辑（如 Sentry）
    // sentryInit()

    asyncCall()
      .then(() => {})
      .catch(() => {})
  }, [])

  return (
    <AuthRouter>
      <Outlet />
    </AuthRouter>
  )
}

export default RootLayout
