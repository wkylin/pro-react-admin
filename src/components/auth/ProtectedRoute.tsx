import React from 'react'
import { Navigate } from 'react-router-dom'
// import { useAuth } from '@src/service/useAuth'
import { getLocalStorage } from '@utils/publicFn'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const { isAuthenticated, isLoading } = useAuth()
  // console.log('isAuthenticated', isAuthenticated)
  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh',
  //       }}
  //     >
  //       <div>加载中...</div>
  //     </div>
  //   )
  // }

  // if (!isAuthenticated) {
  //   return <Navigate to="/signin" replace />
  // }

  const { token } = getLocalStorage('token') || getLocalStorage('github_token') || { token: null }
  console.log('token', token)
  if (!token) {
    return <Navigate to="/signin" />
  }

  return <>{children}</>
}
