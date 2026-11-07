import React from 'react'
import SignIn from '@pages/signin'
import SignUp from '@pages/signup'
import { AuthCallback } from '@platform/auth/components/AuthCallback'
import { lazyComponents } from '../config/lazyLoad.config'
import type { RouteNode } from '../utils'
const Terms = React.lazy(() => import('@pages/terms'))
const Privacy = React.lazy(() => import('@pages/privacy'))
const AccessPreview = React.lazy(() => import('@pages/accessPreview'))

/**
 * 认证相关路由
 * 无需权限验证的公开路由
 */
export const authRoutes: RouteNode[] = [
  {
    path: 'overview',
    name: '项目概览',
    element: <lazyComponents.Home />,
  },
  {
    path: 'preview/access',
    name: '成员访问管理预览',
    auth: false,
    meta: { access: 'public', layout: 'none' },
    element: <AccessPreview />,
  },
  {
    path: 'signin',
    name: '登录',
    element: <SignIn />,
  },
  {
    path: 'signup',
    name: '注册',
    element: <SignUp />,
  },
  {
    path: 'auth/callback',
    name: 'OAuth Callback',
    element: <AuthCallback />,
  },
  {
    path: 'terms',
    name: '用户协议',
    element: <Terms />,
  },
  {
    path: 'privacy',
    name: '隐私政策',
    element: <Privacy />,
  },
]
