/**
 * 公共（无需登录）路由集中配置
 * 维护策略：
 * 1. 纯公开页面：直接在 `publicRoutes` 中添加路径
 * 2. 通过路由对象配置：在对应路由配置里加 `auth: false`（优先级更高）
 * 3. 删除公开页面：从数组中移除路径，或去掉路由的 `auth:false`
 * 4. 支持前缀匹配：如 `/auth/callback`，当存在多层子路径可使用 startsWith 逻辑处理
 */
export const publicRoutes: string[] = ['/signin', '/signup', '/auth/callback', '/404', '/403', '/500']

/**
 * 判断是否为公开路由（路径级别）
 * @param path 当前访问的 pathname
 */
export function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => path === route || path.startsWith(route))
}

/**
 * 辅助函数：根据路由配置对象判断是否公开
 * 约定：`auth === false` 即为公开路由
 */
export function isRouteConfigPublic(routeConfig?: { auth?: boolean }): boolean {
  return !!routeConfig && routeConfig.auth === false
}

/**
 * 运行时动态添加公开路由（避免重复）
 */
export function addPublicRoute(path: string): void {
  if (!path) return
  if (!publicRoutes.includes(path)) {
    publicRoutes.push(path)
  }
}

/**
 * 运行时移除公开路由
 */
export function removePublicRoute(path: string): void {
  const idx = publicRoutes.indexOf(path)
  if (idx >= 0) {
    publicRoutes.splice(idx, 1)
  }
}

/**
 * 获取当前所有公开路由（提供不可变副本）
 */
export function listPublicRoutes(): string[] {
  return [...publicRoutes]
}
