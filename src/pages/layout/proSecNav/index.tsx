import AnimatedIcon from '@stateless/AnimatedIcon'
import { useEffect, useState, useRef, type ReactNode } from 'react'
import PropTypes from 'prop-types'
import { message, Menu, type MenuProps } from 'antd'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { useTranslation } from 'react-i18next'
import { HomeOutlined } from '@ant-design/icons'
import { permissionService } from '@src/service/permissionService'
import { annotatedRootRouter, flattenRoutes } from '@src/routers'

import styles from './index.module.less'

type MenuKey = string

interface MenuItem {
  key: MenuKey
  path?: string
  i18nKey?: string
  label?: ReactNode
  children?: MenuItem[]
  [property: string]: unknown
}

interface LazyComponent {
  preload?: () => unknown
}

interface RouteItem {
  key?: string
  path?: string
  element?: { type?: LazyComponent | null }
}

interface ProSecNavProps {
  mode?: MenuProps['mode']
  theme?: MenuProps['theme']
  onMenuClick?: () => void
}

type LazyComponents = Record<string, LazyComponent>

const PAGE_EXTENSIONS = ['.tsx', '.js', '.ts']
const PAGE_CANDIDATE_TEMPLATES = [
  (path: string, ext: string) => `/src/pages${path}${ext}`,
  (path: string, ext: string) => `/src/pages${path}/index${ext}`,
]

// 兼容 Vite 和 Webpack：import.meta.glob 是 Vite 独有功能
// 在 Webpack 构建中 import.meta 会是 undefined 或抛出错误
const getPageModules = (): Record<string, () => Promise<unknown>> => {
  try {
    // 检查是否在 Vite 环境中
    if (typeof import.meta !== 'undefined' && typeof import.meta.glob === 'function') {
      return import.meta.glob('/src/pages/**/*.{js,ts,tsx}')
    }
  } catch {
    // Webpack 环境下 import.meta 可能会抛出错误
  }
  return {}
}

const pageModules = getPageModules()

const hasOwn = (obj: object | null | undefined, key: PropertyKey): boolean => obj != null && Object.hasOwn(obj, key)

const resolvePageModuleKey = (() => {
  const cache = new Map<string, string | null>()

  const makeCandidates = (pathKey: string): string[] => {
    const candidates: string[] = []
    for (const ext of PAGE_EXTENSIONS) {
      for (const tmpl of PAGE_CANDIDATE_TEMPLATES) {
        candidates.push(tmpl(pathKey, ext))
      }
    }
    return candidates
  }

  const paramify = (path: string): string => path.replace(/:([^/]+)/g, '[$1]')

  return (path: string | null | undefined): string | null => {
    if (!path) return null

    let pathKey = path.trim()
    if (!pathKey.startsWith('/')) pathKey = `/${pathKey}`
    pathKey = pathKey.replace(/\/+$/g, '')

    if (cache.has(pathKey)) return cache.get(pathKey) ?? null

    for (const c of makeCandidates(pathKey)) {
      if (hasOwn(pageModules, c)) {
        cache.set(pathKey, c)
        return c
      }
    }

    if (pathKey.includes(':')) {
      const paramPath = paramify(pathKey)
      for (const c of makeCandidates(paramPath)) {
        if (hasOwn(pageModules, c)) {
          cache.set(pathKey, c)
          return c
        }
      }
    }

    cache.set(pathKey, null)
    return null
  }
})()

import { mainLayoutMenu } from '@src/config/menu.config'

let lazyComponentsCache: LazyComponents | null = null
let lazyComponentsPromise: Promise<LazyComponents> | null = null
const loadLazyComponents = (): Promise<LazyComponents> => {
  if (lazyComponentsCache) return Promise.resolve(lazyComponentsCache)
  if (!lazyComponentsPromise) {
    lazyComponentsPromise = import('@src/routers/config/lazyLoad.config')
      .then((mod) => {
        lazyComponentsCache = (mod as unknown as { lazyComponents?: LazyComponents }).lazyComponents || {}
        return lazyComponentsCache
      })
      .catch(() => {
        lazyComponentsCache = {}
        return lazyComponentsCache
      })
  }
  return lazyComponentsPromise
}

const ProSecNav = ({ mode = 'inline', theme = 'light', onMenuClick }: ProSecNavProps) => {
  const { pathname } = useLocation()
  const { redirectTo } = useSafeNavigate()

  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const lastDeniedRef = useRef<string | null>(null)
  const [allowedRoutes, setAllowedRoutes] = useState<string[] | null>(null)
  const preloadedRef = useRef(new Set<string>())

  // 当前路由对应的 sub menu key
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const safeOpenKeys = openKeys

  const showDeniedOnce = (denyKey: string) => {
    if (!denyKey) return
    if (lastDeniedRef.current === denyKey) return
    lastDeniedRef.current = denyKey

    Promise.resolve()
      .then(() => messageApi.open({ type: 'error', content: '您没有权限访问该页面' }))
      .catch((e) => {
        console.warn('Menu item permission check error:', e)
        return Promise.resolve(message.error('您没有权限访问该页面'))
      })
      .catch((err) => {
        console.warn('Failed to show error message:', err)
      })
  }

  const findMenuItemByKey = (items: MenuItem[], targetKey: string): MenuItem | null => {
    if (!Array.isArray(items) || !targetKey) return null
    for (const it of items) {
      if (it?.key === targetKey) return it
      if (it?.children) {
        const res = findMenuItemByKey(it.children, targetKey)
        if (res) return res
      }
    }
    return null
  }

  const getLazyNameFromPath = (path: string): string => {
    return path
      .replace(/^\//, '')
      .split('/')
      .map((s) => (s?.[0] ? s[0].toUpperCase() + s.slice(1) : ''))
      .join('')
  }

  const preloadRouteComponent = (path: string) => {
    try {
      const pathKey = path
      if (!pathKey) return
      const preloaded = preloadedRef.current
      if (preloaded.has(pathKey)) return

      const comp = routeComponentMap.get(pathKey)
      if (comp && typeof comp.preload === 'function') {
        comp.preload()
        preloaded.add(pathKey)
        return
      }

      loadLazyComponents()
        .then((lazy) => {
          if (!lazy || preloaded.has(pathKey)) return
          const name = getLazyNameFromPath(pathKey)
          const candidate = lazy[name]
          if (candidate && typeof candidate.preload === 'function') {
            candidate.preload()
            preloaded.add(pathKey)
          }
        })
        .catch((error: unknown) => {
          console.warn('Component preload error:', error)
        })
    } catch (error) {
      console.warn('Component preload error:', error)
    }
  }

  // 提取放在redux中, tab 切换时改成 false
  const [isOpenChange, setIsOpenChange] = useState(false)

  useEffect(() => {
    const initMenus = async () => {
      try {
        const userPermissions = await permissionService.getPermissions()
        const rawRoutes = Array.isArray(userPermissions?.routes) ? userPermissions.routes : []
        const routes = Array.from(new Set(['/'].concat(rawRoutes)))
        console.log('用户可访问路由:', routes)

        setAllowedRoutes(routes)
      } catch (error) {
        console.error('获取用户权限失败:', error)
        setAllowedRoutes(['/'])
      }
    }
    initMenus()
  }, [])

  // 生成动态菜单函数提前声明用于后续使用
  const generateMenuItems = (routes: string[]): MenuItem[] => {
    const createLabel = (path: string, labelText: ReactNode): ReactNode => {
      const onPreload = async () => {
        try {
          preloadRouteComponent(path)

          const key = resolvePageModuleKey(path)
          if (key) {
            const loader = pageModules[key]
            if (typeof loader === 'function') {
              await loader()
            }
          }
        } catch (e) {
          console.warn('菜单预加载失败:', e)
        }
      }

      return (
        <span onMouseEnter={onPreload} role="menuitem" tabIndex={0}>
          {labelText || path}
        </span>
      )
    }

    const translateItem = (item: MenuItem): MenuItem | null => {
      if (!item || typeof item !== 'object') return null

      const { i18nKey, children, ...rest } = item
      const path = item.path || item.key

      if (!path) return null

      const labelText = i18nKey ? t(i18nKey) : item.label
      const Label = createLabel(path, labelText)

      const base = {
        ...rest,
        path,
        label: Label,
      }
      if (children && Array.isArray(children)) {
        const validChildren = children.map(translateItem).filter((child): child is MenuItem => child !== null)
        return validChildren.length > 0 ? { ...base, children: validChildren } : base
      }
      return base
    }

    // 使用配置文件的菜单，并进行翻译；同时规范化每项的 path 字段
    const allMenuItems = (Array.isArray(mainLayoutMenu) ? mainLayoutMenu : [])
      .map((item) => translateItem(item as unknown as MenuItem))
      .filter((item): item is MenuItem => item !== null)

    const hasAccessSafely = (path: string): boolean => {
      try {
        return routes.some((route) => {
          if (route === path) return true
          if (path.startsWith(route + '/')) return true
          if (route.includes('*')) {
            const pattern = route.replace('*', '.*')
            return new RegExp(`^${pattern}$`).test(path)
          }
          return false
        })
      } catch (e) {
        console.warn('菜单访问判断异常', path, e)
        return false
      }
    }

    const matchesDynamicParam = (path: string): boolean => {
      if (!path.includes(':')) return false
      const pattern = path.replace(/:[^/]+/g, '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      return routes.some((r) => regex.test(r))
    }

    const filterItems = (items: MenuItem[]): MenuItem[] => {
      const result: MenuItem[] = []
      const pushWithChildren = (item: MenuItem, children: MenuItem[] | null) => {
        result.push(children?.length ? { ...item, children } : item)
      }

      for (const item of items) {
        if (!item || typeof item !== 'object') continue

        const rawKey = item.path || item.key
        if (!rawKey) continue

        const children = Array.isArray(item.children) ? filterItems(item.children) : null
        if (children?.length) {
          pushWithChildren(item, children)
          continue
        }

        const hasAccess = hasAccessSafely(rawKey) || matchesDynamicParam(rawKey)
        if (hasAccess) {
          pushWithChildren(item, null)
        }
      }

      return result
    }

    return filterItems(allMenuItems)
  }

  const menuItems = (() => {
    if (!Array.isArray(allowedRoutes) || allowedRoutes.length === 0) return []
    try {
      const dynamicMenus = generateMenuItems(allowedRoutes)
      console.log('生成的菜单:', dynamicMenus)
      return dynamicMenus
    } catch (e) {
      console.error('生成菜单失败:', e)
      return [
        {
          label: t('home'),
          key: '/',
          icon: (
            <AnimatedIcon variant="spin" mode="hover">
              <HomeOutlined />
            </AnimatedIcon>
          ),
        },
      ]
    }
  })()

  // 递归查找与当前路径最匹配的菜单项父级链
  const findPathChain = (items: MenuItem[], targetPath: string): string[] | null => {
    let bestChain: string[] | null = null

    const matchesDynamicPath = (patternPath: string, pathToMatch: string): boolean => {
      if (!patternPath.includes(':')) return false
      const pattern = patternPath.replace(/:[^/]+/g, '[^/]+')
      return new RegExp(`^${pattern}$`).test(pathToMatch)
    }

    const dfs = (nodes: MenuItem[], chain: string[]): void => {
      for (const node of nodes) {
        if (!node || typeof node !== 'object' || !node.key) continue
        const nextChain = [...chain, node.key]
        const nodePath = node.path || node.key
        const isExact = targetPath === nodePath
        const isPrefix = targetPath.startsWith(nodePath + '/')
        const dynParamMatch = matchesDynamicPath(nodePath, targetPath)
        if (isExact || isPrefix || dynParamMatch) {
          if (!bestChain || nodePath.length > (bestChain[bestChain.length - 1] || '').length) {
            bestChain = nextChain
          }
        }
        if (node.children && Array.isArray(node.children)) {
          dfs(node.children, nextChain)
        }
      }
    }
    dfs(items, [])
    return bestChain
  }

  // 构建路由 path -> element.type 映射以支持菜单 hover 预加载
  const routeComponentMap = (() => {
    try {
      const flat = flattenRoutes(annotatedRootRouter) as unknown as RouteItem[]
      const map = new Map<string, LazyComponent | null>()
      flat.forEach((r) => {
        const key = r.path || r.key
        if (!key) return
        const comp = r.element?.type ?? null
        map.set(key, comp)
      })
      return map
    } catch (e) {
      console.warn('Failed to build route component map:', e)
      return new Map()
    }
  })()

  const chain = (() => {
    if (!Array.isArray(menuItems) || menuItems.length === 0) return null
    return findPathChain(menuItems, pathname)
  })()

  const derivedSelectedKeys = chain?.length ? [chain[chain.length - 1]] : [pathname]
  const derivedOpenKeys = chain?.length ? chain.slice(0, -1) : []

  const safeSelectedKeys = Array.isArray(derivedSelectedKeys) ? derivedSelectedKeys : []
  const effectiveOpenKeys = isOpenChange ? safeOpenKeys : derivedOpenKeys

  const onOpenChange: NonNullable<MenuProps['onOpenChange']> = (keys) => {
    setIsOpenChange(true)
    const nextKeys = Array.isArray(keys) ? keys : []
    const depthMap: Record<string, number> = {}
    const buildDepth = (items: MenuItem[], depth: number): void => {
      for (const item of items) {
        if (!item || typeof item !== 'object') continue
        if (item.key) {
          depthMap[item.key] = depth
        }
        if (item.children && Array.isArray(item.children)) {
          buildDepth(item.children, depth + 1)
        }
      }
    }
    buildDepth(menuItems, 0)
    const latestKey = nextKeys.find((key) => !safeOpenKeys.includes(String(key))) || nextKeys[nextKeys.length - 1]
    const latestKeyString = latestKey === undefined ? undefined : String(latestKey)
    const layer = latestKeyString === undefined ? undefined : depthMap[latestKeyString]
    const filtered = nextKeys.filter((key) => depthMap[String(key)] !== layer || key === latestKey).map(String)
    setOpenKeys(filtered)
  }

  const onSelect: NonNullable<MenuProps['onSelect']> = async ({ key }) => {
    const selectedKey = String(key)
    const selected = findMenuItemByKey(menuItems, selectedKey)
    let selectedPath = selected?.path || selected?.key || selectedKey

    if (typeof selectedPath !== 'string') {
      messageApi.error('菜单配置错误：路径格式不正确')
      return
    }

    selectedPath = selectedPath.trim()
    if (!selectedPath) {
      return
    }

    try {
      const ok = await permissionService.canAccessRoute(selectedPath, false)
      if (!ok) {
        showDeniedOnce(selectedPath)
        return
      }
      // 使用 try-catch 包裹路由跳转，防止异步组件加载失败导致菜单卡死
      try {
        redirectTo(selectedPath)
        setIsOpenChange(false)
        onMenuClick?.()
      } catch (navError) {
        console.error('路由跳转失败:', navError)
        messageApi.error('页面加载失败，请刷新重试')
      }
    } catch (error) {
      console.error('权限检查失败:', error)
      showDeniedOnce(selectedPath)
    }
  }

  return (
    <>
      {contextHolder}
      <Menu
        inlineIndent={10}
        mode={mode}
        selectedKeys={safeSelectedKeys}
        openKeys={effectiveOpenKeys}
        theme={theme}
        className={mode === 'horizontal' ? styles.topMenu : styles.menu}
        items={menuItems}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
      />
    </>
  )
}

ProSecNav.propTypes = {
  mode: PropTypes.string,
  theme: PropTypes.string,
  onMenuClick: PropTypes.func,
}

export default ProSecNav
