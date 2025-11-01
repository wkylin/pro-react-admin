import React from 'react'
import SignIn from '@pages/signin'
import SignUp from '@pages/signup'
import { AuthCallback } from '@src/components/auth/AuthCallback'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 认证相关路由
 * 无需权限验证的公开路由
 */
export const authRoutes = [
  {
    path: 'signin',
    name: '登录',
    key: '/signin',
    auth: false,
    element: <SignIn />,
  },
  {
    path: 'signup',
    name: '注册',
    key: '/signup',
    auth: false,
    element: <SignUp />,
  },
  {
    path: '/auth/callback',
    name: '认证回调',
    key: '/auth/callback',
    auth: false,
    element: <AuthCallback />,
  },
]
