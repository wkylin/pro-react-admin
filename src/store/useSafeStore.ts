// src/store/useSafeStore.ts
import { useStore } from './index'
import { StoreState } from './types'

/**
 * 安全获取 store 状态的 hook
 * 当 store 初始化失败时返回默认值，避免整个组件树崩溃
 *
 * @param selector - 状态选择器函数
 * @param defaultValue - 当 store 访问失败时的默认值
 * @returns 选中的状态值或默认值
 *
 * @example
 * // 基本用法
 * const isMobile = useSafeStore((s) => s.isMobile, false)
 *
 * // 获取函数
 * const toggleSidebar = useSafeStore((s) => s.toggleSidebar, () => {})
 */
export function useSafeStore<T>(selector: (state: StoreState) => T, defaultValue: T): T {
  try {
    const result = useStore(selector)
    return result ?? defaultValue
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[useSafeStore] Store access error:', error)
    }
    return defaultValue
  }
}

export default useSafeStore
