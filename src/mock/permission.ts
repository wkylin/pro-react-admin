/**
 * 权限系统 Mock 数据（重构版）
 * 简化权限模型，按角色随机分配路由
 */

import { Role, UserPermission, PermissionCode } from '../types/permission'

/**
 * 完整路由列表（包含所有实际存在的路由）
 */
const allRoutes = [
  '/',
  '/demo',
  '/motion',
  '/business',
  '/big-screen',
  '/ph-bar',
  '/qrcode',
  '/prism',
  '/tilt',
  '/music',
  '/crypto',
  '/video',
  '/echarts',
  '/markmap',
  '/postmessage',
  '/geo',
  '/d3-chart',
  '/print',
  '/coupons/add',
  '/coupons/edit',
  '/product',
  '/coupons/list',
  '/order/list',
  '/error',
  '/dashboard',
  '/permission',
  '/profile',
  '/contact',
  '/portfilo',
]

/**
 * 固定的角色路由分配（按业务逻辑划分）
 */
// 超级管理员：所有路由
const adminRoutes = [...allRoutes]

// 管理员：核心业务 + 大部分功能（排除高级功能）
const managerRoutes = [
  '/',
  '/demo',
  '/business',
  '/echarts',
  '/d3-chart',
  '/geo',
  '/coupons/add',
  '/coupons/edit',
  '/coupons/list',
  '/product',
  '/dashboard',
  '/permission',
  '/profile',
  '/print',
  '/markmap',
  '/postmessage',
]

// 业务员：业务相关功能
const businessRoutes = [
  '/',
  '/business',
  '/coupons/add',
  '/coupons/edit',
  '/coupons/list',
  '/product',
  '/dashboard',
  '/demo',
  '/echarts',
  '/profile',
]

// 普通用户：基础查看功能
const userRoutes = ['/', '/demo', '/dashboard', '/profile', '/echarts', '/motion', '/crypto']

/**
 * 预定义角色
 */
export const mockRoles: Role[] = [
  {
    id: '1',
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有所有权限',
    permissions: ['*:*'],
    isDefault: false,
  },
  {
    id: '2',
    name: '管理员',
    code: 'admin',
    description: '拥有大部分权限',
    permissions: ['home:read', 'user:read', 'user:create', 'user:update', 'dashboard:read'],
    isDefault: false,
  },
  {
    id: '3',
    name: '业务员',
    code: 'business_user',
    description: '拥有业务相关权限',
    permissions: ['home:read', 'business:*', 'coupons:read', 'coupons:create'],
    isDefault: true,
  },
  {
    id: '4',
    name: '普通用户',
    code: 'user',
    description: '仅拥有基本权限',
    permissions: ['home:read', 'dashboard:read'],
    isDefault: true,
  },
]

/**
 * 固定的测试账号（四个角色对应四个账号）
 */
export const testAccounts: Record<string, { password: string; role: string; name: string }> = {
  'admin@test.com': {
    password: '123456',
    role: 'super_admin',
    name: '超级管理员',
  },
  'manager@test.com': {
    password: '123456',
    role: 'admin',
    name: '管理员',
  },
  'business@test.com': {
    password: '123456',
    role: 'business_user',
    name: '业务员',
  },
  'user@test.com': {
    password: '123456',
    role: 'user',
    name: '普通用户',
  },
}

/**
 * 路由权限映射（简化版）
 */
export const routePermissionMap: Record<string, PermissionCode> = {
  '/': 'home:read',
  '/dashboard': 'dashboard:read',
  '/business': 'business:read',
  '/big-screen': 'bigscreen:read',
  '/contact': 'contact:read',
  '/coupons': 'coupons:read',
  '/coupons/home': 'coupons:read',
  '/coupons/list': 'coupons:read',
  '/coupons/add': 'coupons:create',
  '/coupons/add/plugins': 'coupons:read',
  '/coupons/add/plugins/vue3': 'coupons:read',
  '/coupons/add/plugins/perf': 'coupons:read',
  '/coupons/edit': 'coupons:update',
  '/coupons/edit/:id': 'coupons:update',
  '/coupons/detail': 'coupons:read',
  '/coupons/detail/:id': 'coupons:read',
  '/order/list': 'order:read',
  '/product': 'product:read',
  '/profile': 'profile:read',
  '/permission': 'permission:read',
  '/demo': 'demo:read',
  '/echarts': 'echarts:read',
  '/d3-chart': 'd3chart:read',
  '/geo': 'geo:read',
  '/music': 'music:read',
  '/video': 'video:read',
  '/print': 'print:read',
  '/postmessage': 'postmessage:read',
  '/qrcode': 'qrcode:read',
  '/prism': 'prism:read',
  '/ph-bar': 'phbar:read',
  '/portfilo': 'portfilo:read',
  '/markmap': 'markmap:read',
  '/crypto': 'crypto:read',
  '/error': 'error:read',
  '/403': 'error:read',
  '/404': 'error:read',
  '/500': 'error:read',
  '/signin': 'system:read',
  '/signup': 'system:read',
  '/auth/callback': 'system:read',
  '/setting': 'system:read',
  '/faker/shops': 'business:read',
  '/motion': 'motion:read',
  '/my-iframe': 'ui:read',
  '/tilt': 'tilt:read',
  '/sub-act': 'demo:read',
  '/sub-coupons': 'coupons:read',
  '/sub-error': 'error:read',
  '/sub-fe-framework': 'demo:read',
  '/sub-list': 'product:read',
  '*': '*:*',
}

/**
 * 用户权限配置（按账号映射）
 */
export const mockUserPermissions: Record<string, UserPermission> = {
  super_admin: {
    userId: '1',
    username: '超级管理员',
    roles: [mockRoles[0]],
    permissions: ['*:*'],
    routes: adminRoutes,
  },
  admin: {
    userId: '2',
    username: '管理员',
    roles: [mockRoles[1]],
    permissions: [
      'home:read',
      'user:read',
      'user:create',
      'user:update',
      'dashboard:read',
      'business:read',
      'coupons:read',
    ],
    routes: managerRoutes,
  },
  business_user: {
    userId: '3',
    username: '业务员',
    roles: [mockRoles[2]],
    permissions: ['home:read', 'business:*', 'coupons:read', 'coupons:create', 'dashboard:read'],
    routes: businessRoutes,
  },
  user: {
    userId: '4',
    username: '普通用户',
    roles: [mockRoles[3]],
    permissions: ['home:read', 'dashboard:read'],
    routes: userRoutes,
  },
}

/**
 * 获取用户权限（简化逻辑）
 */
export const mockGetUserPermissions = async (_userId?: string, _roleCode?: string): Promise<UserPermission> => {
  await new Promise((resolve) => setTimeout(resolve, 100))

  console.log('🔍 开始获取用户权限...')

  // 1. 优先使用手动设置的角色（用于测试切换）
  const storedRoleCode = localStorage.getItem('user_role')
  console.log('📝 手动设置的角色:', storedRoleCode)
  if (storedRoleCode && mockUserPermissions[storedRoleCode]) {
    console.log('✅ 使用手动设置的角色:', storedRoleCode)
    return { ...mockUserPermissions[storedRoleCode] }
  }

  // 2. 根据 token 中的邮箱获取角色
  try {
    const tokenData = localStorage.getItem('token') || localStorage.getItem('github_token')
    console.log('🎫 Token 数据:', tokenData)

    if (tokenData) {
      let email = ''
      try {
        const tokenObj = JSON.parse(tokenData)
        email = tokenObj.token || tokenData
        console.log('📧 解析出的邮箱:', email)
      } catch {
        email = tokenData
        console.log('📧 直接使用的邮箱:', email)
      }

      // 根据邮箱匹配账号
      console.log('🔎 查找账号:', email, '在', Object.keys(testAccounts))
      if (testAccounts[email]) {
        const account = testAccounts[email]
        console.log('✅ 找到账号，角色:', account.role)
        console.log('📋 返回权限数据:', mockUserPermissions[account.role])
        return { ...mockUserPermissions[account.role] }
      } else {
        console.log('❌ 未找到匹配的测试账号')
      }

      // GitHub 登录特殊处理
      if (email === 'wkylin.w@gmail.com') {
        console.log('✅ GitHub 超级管理员登录')
        return { ...mockUserPermissions['super_admin'] }
      }
    }

    // GitHub 用户信息
    const githubUser = localStorage.getItem('github_user')
    if (githubUser) {
      const user = JSON.parse(githubUser)
      if (user.email === 'wkylin.w@gmail.com') {
        console.log('✅ GitHub 用户登录')
        return { ...mockUserPermissions['super_admin'] }
      }
    }
  } catch (error) {
    console.error('❌ 解析用户信息失败:', error)
  }

  // 3. 默认返回普通用户权限
  console.log('⚠️ 使用默认权限（普通用户）')
  return { ...mockUserPermissions['user'] }
}

/**
 * 获取角色列表
 */
export const mockGetRoles = async (): Promise<Role[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...mockRoles]
}

/**
 * 检查权限
 */
export const mockCheckPermission = (permission: PermissionCode, userPermissions: PermissionCode[]): boolean => {
  if (userPermissions.includes('*:*')) {
    return true
  }

  if (userPermissions.includes(permission)) {
    return true
  }

  const [resource, action] = permission.split(':')
  return userPermissions.some((p) => {
    if (p === `${resource}:*`) return true
    if (p === `*:${action}`) return true
    return false
  })
}
