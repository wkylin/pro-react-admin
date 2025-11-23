/**
 * 权限系统类型定义
 * RBAC (Role-Based Access Control) 权限模型
 */

/**
 * 权限操作类型
 */
export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'export' | 'import' | 'approve' | 'reject'

/**
 * 资源类型
 */
export type Resource =
  | 'user'
  | 'role'
  | 'permission'
  | 'dashboard'
  | 'system'
  | 'business'
  | 'chart'
  | 'ui'
  | 'coupons'
  | 'product'
  | 'home'
  | 'demo'
  | 'bigscreen'
  | 'phbar'
  | 'qrcode'
  | 'prism'
  | 'tilt'
  | 'music'
  | 'crypto'
  | 'video'
  | 'order'
  | 'error'
  | 'profile'
  | 'contact'
  | 'portfilo'
  | 'motion'
  | 'echarts'
  | 'markmap'
  | 'postmessage'
  | 'geo'
  | 'd3chart'
  | 'print'

/**
 * 权限点定义
 * 格式：resource:action 或 resource:* 或 *
 * "*:*" 表示超级权限（所有权限）
 */
export type PermissionCode =
  | `${Resource}:${PermissionAction | '*'}` // 资源:操作 或 资源:*
  | `${Resource}` // 单独的资源
  | '*:*' // 超级权限

/**
 * 角色信息
 */
export interface Role {
  id: string
  name: string
  code: string
  description?: string
  permissions: PermissionCode[]
  isDefault?: boolean
}

/**
 * 用户权限信息
 */
export interface UserPermission {
  userId: string
  username: string
  roles: Role[]
  permissions: PermissionCode[]
  routes: string[]
}

/**
 * 路由权限配置
 */
export interface RoutePermission {
  path: string
  permission?: PermissionCode | PermissionCode[]
  roles?: string[]
  requireAll?: boolean // 是否要求拥有所有权限（默认是或关系）
}

/**
 * 权限检查结果
 */
export interface PermissionCheckResult {
  hasPermission: boolean
  missingPermissions?: PermissionCode[]
  missingRoles?: string[]
}

/**
 * 权限服务配置
 */
export interface PermissionConfig {
  enableCache?: boolean
  cacheExpireTime?: number
}
