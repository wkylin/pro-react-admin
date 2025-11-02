/**
 * 权限系统 Mock 数据
 * 用于模拟后端权限接口返回的数据
 */

import { Role, UserPermission, PermissionCode } from '../types/permission'

/**
 * 预定义角色
 */
export const mockRoles: Role[] = [
  {
    id: '1',
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有所有权限',
    permissions: ['*:*'], // 所有权限
    isDefault: false,
  },
  {
    id: '2',
    name: '管理员',
    code: 'admin',
    description: '拥有大部分管理权限',
    permissions: [
      'user:*',
      'role:read',
      'permission:read',
      'dashboard:*',
      'system:*',
      'business:*',
      'chart:*',
      'ui:*',
      'coupons:*',
      'product:*',
      'home:*',
      'demo:*',
    ],
    isDefault: false,
  },
  {
    id: '3',
    name: '业务员',
    code: 'business_user',
    description: '拥有业务相关权限',
    permissions: [
      'business:read',
      'business:create',
      'business:update',
      'coupons:read',
      'coupons:create',
      'product:read',
      'dashboard:read',
      'home:read',
      'chart:read',
    ],
    isDefault: true,
  },
  {
    id: '4',
    name: '普通用户',
    code: 'user',
    description: '仅拥有查看权限',
    permissions: ['home:read', 'demo:read', 'dashboard:read'],
    isDefault: true,
  },
]

/**
 * 路由权限映射
 * 定义路由对应的权限要求
 */
export const routePermissionMap: Record<string, PermissionCode | PermissionCode[]> = {
  '/': 'home:read',
  '/dashboard': 'dashboard:read',
  '/business': 'business:read',
  '/product': 'product:read',
  '/coupons': 'coupons:read',
  '/coupons/home': 'coupons:read',
  '/coupons/add': 'coupons:create',
  '/coupons/edit/:id': 'coupons:update',
  '/coupons/detail/:id': 'coupons:read',
  '/permission': 'permission:read',
  '/chart': 'chart:read',
  '/ui': 'ui:read',
  '/demo': 'demo:read',
  '/user': 'user:read',
  '/role': 'role:read',
  '/system': 'system:read',
}

/**
 * 用户权限 Mock 数据
 */
export const mockUserPermissions: Record<string, UserPermission> = {
  // 超级管理员
  super_admin: {
    userId: '1',
    username: 'admin',
    roles: [mockRoles[0]],
    permissions: ['*:*'],
    routes: Object.keys(routePermissionMap),
  },
  // 管理员
  admin: {
    userId: '2',
    username: 'manager',
    roles: [mockRoles[1]],
    permissions: [
      'user:*',
      'role:read',
      'permission:read',
      'dashboard:*',
      'system:*',
      'business:*',
      'chart:*',
      'ui:*',
      'coupons:*',
      'product:*',
      'home:*',
      'demo:*',
    ],
    routes: [
      '/',
      '/dashboard',
      '/business',
      '/chart',
      '/ui',
      '/coupons',
      '/coupons/home',
      '/coupons/add',
      '/coupons/edit/:id',
      '/coupons/detail/:id',
      '/product',
      '/demo',
      '/permission',
    ],
  },
  // 业务员
  business_user: {
    userId: '3',
    username: 'business',
    roles: [mockRoles[2]],
    permissions: [
      'business:read',
      'business:create',
      'business:update',
      'coupons:read',
      'coupons:create',
      'product:read',
      'dashboard:read',
      'home:read',
      'chart:read',
    ],
    routes: ['/', '/dashboard', '/business', '/coupons', '/coupons/home', '/product', '/chart'],
  },
  // 普通用户
  user: {
    userId: '4',
    username: 'normal',
    roles: [mockRoles[3]],
    permissions: ['home:read', 'demo:read', 'dashboard:read'],
    routes: ['/', '/dashboard', '/demo'],
  },
}

/**
 * 模拟获取用户权限信息
 * @param userId 用户ID（可选，在真实环境中用于查询用户权限）
 * @param roleCode 角色代码（可选，用于测试不同角色）
 */
export const mockGetUserPermissions = async (userId?: string, roleCode?: string): Promise<UserPermission> => {
  // 模拟网络延迟（减少延迟时间，提高响应速度）
  await new Promise((resolve) => setTimeout(resolve, 100))

  // 如果指定了角色代码，使用对应的权限
  if (roleCode && mockUserPermissions[roleCode]) {
    return { ...mockUserPermissions[roleCode] }
  }

  // 根据用户ID判断角色
  if (userId) {
    // userId "2" 对应 admin 角色（manager）
    if (userId === '2') {
      return { ...mockUserPermissions['admin'] }
    }
    // userId "1" 对应 super_admin 角色
    if (userId === '1') {
      return { ...mockUserPermissions['super_admin'] }
    }
    // userId "3" 对应 business_user 角色
    if (userId === '3') {
      return { ...mockUserPermissions['business_user'] }
    }
    // 可以根据 userId 映射到对应的角色（这里只是示例）
    // 实际项目中可以根据 userId 从后端获取权限
  }

  // 从 localStorage 获取当前用户角色
  const storedRoleCode = localStorage.getItem('user_role')
  if (storedRoleCode && mockUserPermissions[storedRoleCode]) {
    return { ...mockUserPermissions[storedRoleCode] }
  }

  // 检查是否有 token，如果有则根据用户信息设置默认角色
  try {
    // 优先检查 GitHub 用户信息
    const githubUser = localStorage.getItem('github_user')
    if (githubUser) {
      const user = JSON.parse(githubUser)
      // 根据邮箱分配角色
      if (user.email === 'wkylin.w@gmail.com') {
        return { ...mockUserPermissions['admin'] }
      }
    }

    // 检查表单登录的 token（token 中存储的是邮箱）
    const tokenData = localStorage.getItem('token')
    if (tokenData) {
      try {
        const tokenObj = JSON.parse(tokenData)
        const email = tokenObj.token || tokenData
        // 根据邮箱分配角色
        if (email === 'wkylin.w@gmail.com' || email.includes('admin')) {
          return { ...mockUserPermissions['admin'] }
        }
        if (email.includes('business')) {
          return { ...mockUserPermissions['business_user'] }
        }
      } catch (e) {
        // token 可能是字符串格式
        const email = tokenData
        if (email === 'wkylin.w@gmail.com' || email.includes('admin')) {
          return { ...mockUserPermissions['admin'] }
        }
      }
    }
  } catch (error) {
    console.error('解析用户信息失败:', error)
  }

  // 默认返回普通用户权限
  return { ...mockUserPermissions['user'] }
}

/**
 * 模拟获取角色列表
 */
export const mockGetRoles = async (): Promise<Role[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return [...mockRoles]
}

/**
 * 模拟检查权限
 * @param permission 权限代码
 * @param userPermissions 用户权限列表
 */
export const mockCheckPermission = (permission: PermissionCode, userPermissions: PermissionCode[]): boolean => {
  // 如果有超级权限，直接返回 true
  if (userPermissions.includes('*:*')) {
    return true
  }

  // 检查精确匹配
  if (userPermissions.includes(permission)) {
    return true
  }

  // 检查通配符匹配（如 user:* 匹配 user:read, user:create 等）
  const [resource, action] = permission.split(':')
  if (action && userPermissions.includes(`${resource}:*` as PermissionCode)) {
    return true
  }

  // 检查资源级权限（如 user 匹配 user:*）
  if (userPermissions.includes(resource as PermissionCode)) {
    return true
  }

  return false
}
