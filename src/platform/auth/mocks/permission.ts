import { routePermissionMap } from '../model/policy'
import type { Role, UserPermission, PermissionCode } from '../model/permission'

/**
 * 完整路由列表（包含所有实际存在的路由）
 */
const allRoutes = Object.keys(routePermissionMap).filter(
  (path) => !['/signin', '/signup', '/auth/callback', '/terms', '/privacy'].includes(path)
)

// 超级管理员：所有路由
const adminRoutes = [...allRoutes]

// 管理员：核心业务 + 大部分功能（排除高级功能）
const managerRoutes = [
  '/',
  '/demo',
  '/business',
  '/echarts',
  '/geo',
  '/tech/frontend/vue',
  '/tech/frontend/angular',
  '/build/vite',
  '/tech/backend',
  '/dashboard',
  '/profile',
  '/print',
  '/chatgpt',
  '/ai-workbench',
  '/postmessage',
  '/topology',
  '/svg-viewer',
  '/auto-deploy',
  '/dependencies',
  '/text-editor',
  '/deploy-flow',
  '/tracking',
]

// 业务员：业务相关功能
const businessRoutes = ['/', '/business', '/dashboard', '/demo', '/echarts', '/profile', '/topology', '/svg-viewer']

// 普通用户：基础查看功能
const userRoutes = ['/', '/demo', '/dashboard', '/motion', '/crypto', '/profile', '/svg-viewer']

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
    permissions: [
      'home:read',
      'user:read',
      'user:create',
      'user:update',
      'dashboard:read',
      'topology:read',
      'zustand:read',
      'chatgpt:read',
      'ai-workbench:read',
    ],
    isDefault: false,
  },
  {
    id: '3',
    name: '业务员',
    code: 'business_user',
    description: '拥有业务相关权限',
    permissions: ['home:read', 'business:*', 'tech:read'],
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
export const testAccounts: Record<string, { role: string; name: string }> = {
  'admin@test.com': {
    role: 'super_admin',
    name: '超级管理员',
  },
  'manager@test.com': {
    role: 'admin',
    name: '管理员',
  },
  'business@test.com': {
    role: 'business_user',
    name: '业务员',
  },
  'user@test.com': {
    role: 'user',
    name: '普通用户',
  },
}

/**
 * 路由权限映射
 */
export { routePermissionMap } from '../model/policy'

const resolveRoutePermission = (route: string): PermissionCode | undefined => {
  const direct = routePermissionMap[route]
  if (direct) return direct

  let temp = route
  while (temp && temp !== '/') {
    const paramCandidate = routePermissionMap[`${temp}/:id`]
    if (paramCandidate) return paramCandidate

    const idx = temp.lastIndexOf('/')
    if (idx <= 0) break

    temp = temp.substring(0, idx)
    const parent = routePermissionMap[temp]
    if (parent) return parent
  }

  return routePermissionMap['*']
}

const collectPermissionsFromRoutes = (routes: string[], perms: Set<string>) => {
  routes.forEach((r) => {
    const permission = resolveRoutePermission(r)
    if (permission) perms.add(permission)
  })
}

const makeUserPermission = ({
  userId,
  username,
  role,
  basePermissions,
  routes,
}: {
  userId: string
  username: string
  role: Role
  basePermissions: string[]
  routes: string[]
}): UserPermission => {
  const perms = new Set<string>(basePermissions)
  collectPermissionsFromRoutes(routes, perms)
  return {
    userId,
    username,
    roles: [role],
    permissions: Array.from(perms) as PermissionCode[],
    routes,
  }
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
  admin: makeUserPermission({
    userId: '2',
    username: '管理员',
    role: mockRoles[1],
    basePermissions: ['home:read', 'user:read', 'user:create', 'user:update', 'dashboard:read'],
    routes: managerRoutes,
  }),
  business_user: makeUserPermission({
    userId: '3',
    username: '业务员',
    role: mockRoles[2],
    basePermissions: ['home:read', 'business:*', 'coupons:read', 'coupons:create', 'dashboard:read'],
    routes: businessRoutes,
  }),
  user: makeUserPermission({
    userId: '4',
    username: '普通用户',
    role: mockRoles[3],
    basePermissions: ['home:read', 'dashboard:read'],
    routes: userRoutes,
  }),
}

const safeJsonParse = <T>(text: string | null): T | null => {
  if (!text) return null
  try {
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

const safeGetStorageItem = (key: string): string | null => {
  try {
    return globalThis?.localStorage?.getItem(key) ?? null
  } catch {
    return null
  }
}

const tryGetManualRolePermission = (): UserPermission | null => {
  const storedRoleCode = safeGetStorageItem('user_role')
  if (storedRoleCode && mockUserPermissions[storedRoleCode]) {
    return { ...mockUserPermissions[storedRoleCode] }
  }
  return null
}

const tryGetGithubUserPermission = (): UserPermission | null => {
  const githubUser = safeGetStorageItem('github_user')
  const user = safeJsonParse<{ email?: string }>(githubUser)
  if (!user) return null

  if (user.email) {
    return { ...mockUserPermissions['super_admin'] }
  }
  return null
}

const tryGetTokenRolePermission = (): UserPermission | null => {
  const tokenData = safeGetStorageItem('token')
  if (!tokenData) return null

  const tokenObj = safeJsonParse<{ token?: string }>(tokenData)
  const email = tokenObj?.token ?? tokenData

  const account = testAccounts[email]
  if (!account) {
    return null
  }

  return { ...mockUserPermissions[account.role] }
}

/**
 * 获取用户权限（简化逻辑）
 */
export const mockGetUserPermissions = async (_userId?: string, _roleCode?: string): Promise<UserPermission> => {
  await new Promise((resolve) => setTimeout(resolve, 100))

  // 1. 优先使用手动设置的角色（用于测试切换）
  const manual = tryGetManualRolePermission()
  if (manual) return manual

  // 2. GitHub 登录用户检查（优先级最高，因为 GitHub 用户总是超级管理员）
  const github = tryGetGithubUserPermission()
  if (github) return github

  // 3. 根据测试账号 token 中的邮箱获取角色
  const token = tryGetTokenRolePermission()
  if (token) return token

  // 4. 默认返回普通用户权限
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
