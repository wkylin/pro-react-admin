import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { message, Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { useTranslation } from 'react-i18next'
import { HomeOutlined } from '@ant-design/icons'
import { permissionService } from '@src/service/permissionService'
import { annotatedRootRouter, flattenRoutes } from '@src/routers'

import styles from './index.module.less'

import { mainLayoutMenu } from '@src/config/menu.config'

let lazyComponentsCache = null
let lazyComponentsPromise = null
const loadLazyComponents = () => {
  if (lazyComponentsCache) return Promise.resolve(lazyComponentsCache)
  if (!lazyComponentsPromise) {
    lazyComponentsPromise = import('@src/routers/config/lazyLoad.config')
      .then((mod) => {
        lazyComponentsCache = mod.lazyComponents || {}
        return lazyComponentsCache
      })
      .catch(() => {
        lazyComponentsCache = {}
        return lazyComponentsCache
      })
  }
  return lazyComponentsPromise
}

const ProSecNav = ({ mode = 'inline', theme = 'light', onMenuClick }) => {
  const { pathname } = useLocation()
  const { redirectTo } = useSafeNavigate()

  const { t, i18n } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const lastDeniedRef = useRef(null)
  const [selectedKeys, setSelectedKeys] = useState(['home'])
  const [menuItems, setMenuItems] = useState([])
  const [allowedRoutes, setAllowedRoutes] = useState(null)

  // 当前路由对应的 sub menu key
  const [openKeys, setOpenKeys] = useState([])

  const safeSelectedKeys = Array.isArray(selectedKeys) ? selectedKeys : []
  const safeOpenKeys = Array.isArray(openKeys) ? openKeys : []

  const showDeniedOnce = (denyKey) => {
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

  const findMenuItemByKey = (items, targetKey) => {
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

  const ensurePreloadedSet = () => {
    if (!ProSecNav._preloaded) ProSecNav._preloaded = new Set()
    return ProSecNav._preloaded
  }

  const getLazyNameFromPath = (p) => {
    return String(p || '')
      .replace(/^\//, '')
      .split('/')
      .map((s) => (s?.[0] ? s[0].toUpperCase() + s.slice(1) : ''))
      .join('')
  }

  const preloadRouteComponent = (p) => {
    try {
      const pathKey = String(p || '')
      if (!pathKey) return
      const preloaded = ensurePreloadedSet()
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
        .catch((e) => {
          console.warn('Component preload error:', e)
        })
    } catch (e) {
      console.warn('Component preload error:', e)
    }
  }

  // 提取放在redux中, tab 切换时改成 false
  const [isOpenChange, setIsOpenChange] = useState(false)

  // 初始化：获取用户可访问路由
  useEffect(() => {
    const initMenus = async () => {
      try {
        const userPermissions = await permissionService.getPermissions()
        // 确保根路径 '/' 总是包含（首页对所有账号可见）
        const rawRoutes = Array.isArray(userPermissions?.routes) ? userPermissions.routes : []
        const routes = Array.from(new Set(['/'].concat(rawRoutes)))
        console.log('用户可访问路由:', routes)

        // 仅存储一次“可访问路由”，避免语言切换时重复请求
        setAllowedRoutes(routes)
      } catch (error) {
        console.error('获取用户权限失败:', error)
        // 降级：仅保留首页
        setAllowedRoutes(['/'])
      }
    }
    initMenus()
  }, [])

  // 生成动态菜单函数提前声明用于后续使用
  const generateMenuItems = (routes) => {
    const createLabel = (path, labelText) => {
      const onPreload = async () => {
        try {
          // 预加载页面资源
          await import(`@/pages${path}`)
        } catch (e) {
          // ignore preload errors
        }
      }

      // Ant Design `Menu` expects `label` to be a ReactNode.
      // Return a React element so we don't pass a plain object as a child.
      return (
        <span onMouseEnter={onPreload} role="menuitem">
          {labelText || path}
        </span>
      )
    }

    const translateItem = (i) => {
      // 添加空值检查
      if (!i || typeof i !== 'object') return null

      const { i18nKey, children, ...rest } = i
      const path = i.path || i.key

      // 如果没有 key，返回 null（不合法的菜单项）
      if (!path) return null

      const labelText = i18nKey ? t(i.i18nKey) : i.label
      const Label = createLabel(path, labelText)

      const base = {
        ...rest,
        path,
        label: Label,
      }
      if (children && Array.isArray(children)) {
        // 过滤掉空值的子项
        const validChildren = children.map(translateItem).filter(Boolean)
        return validChildren.length > 0 ? { ...base, children: validChildren } : base
      }
      return base
    }

    // 使用配置文件的菜单，并进行翻译；同时规范化每项的 path 字段
    // 过滤掉可能的空值
    const allMenuItems = (Array.isArray(mainLayoutMenu) ? mainLayoutMenu : []).map(translateItem).filter(Boolean)

    // 递归过滤菜单：仅保留用户可访问的节点或其子节点
    const hasAccessSafely = (p) => {
      try {
        return routes.some((route) => {
          if (route === p) return true
          if (p.startsWith(route + '/')) return true
          if (route.includes('*')) {
            const pattern = route.replace('*', '.*')
            return new RegExp(`^${pattern}$`).test(p)
          }
          return false
        })
      } catch (e) {
        console.warn('菜单访问判断异常', p, e)
        return false
      }
    }

    const matchesDynamicParam = (p) => {
      if (typeof p !== 'string' || !p.includes(':')) return false
      const pattern = p.replace(/:[^/]+/g, '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      return routes.some((r) => regex.test(r))
    }

    const filterItems = (items) => {
      if (!Array.isArray(items)) return []
      const result = []
      for (const item of items) {
        // 添加空值检查，防止处理空值菜单项
        if (!item || typeof item !== 'object') continue

        const rawKey = item.path || item.key
        // 如果菜单项没有 key，跳过（不合法的菜单项）
        if (!rawKey) continue

        if (Array.isArray(item.children) && item.children.length > 0) {
          const children = filterItems(item.children)
          if (children.length > 0) {
            result.push({ ...item, children })
            continue
          }
        }

        if (hasAccessSafely(rawKey)) {
          result.push(item)
          continue
        }

        if (matchesDynamicParam(rawKey)) {
          result.push(item)
        }
      }
      return result
    }

    return filterItems(allMenuItems)
  }

  // 当语言切换时，重新生成菜单（但不重复拉权限）
  useEffect(() => {
    if (!Array.isArray(allowedRoutes) || allowedRoutes.length === 0) return
    try {
      const dynamicMenus = generateMenuItems(allowedRoutes)
      console.log('生成的菜单:', dynamicMenus)
      setMenuItems(dynamicMenus)
    } catch (e) {
      console.error('生成菜单失败:', e)
      setMenuItems([{ label: t('home'), key: '/', icon: <HomeOutlined /> }])
    }
  }, [allowedRoutes, i18n.language])

  // 递归查找与当前路径最匹配的菜单项父级链
  const findPathChain = (items, targetPath) => {
    let bestChain = null

    const matchesDynamicPath = (patternPath, pathToMatch) => {
      if (typeof patternPath !== 'string' || !patternPath.includes(':')) return false
      const pattern = patternPath.replace(/:[^/]+/g, '[^/]+')
      return new RegExp(`^${pattern}$`).test(pathToMatch)
    }

    const dfs = (nodes, chain) => {
      if (!Array.isArray(nodes)) return
      for (const node of nodes) {
        // 添加空值检查
        if (!node || typeof node !== 'object' || !node.key) continue
        const nextChain = [...chain, node.key]
        const nodePath = node.path || node.key
        // 匹配规则：精确匹配 或 前缀匹配（允许 /a/b 命中 /a）
        const isExact = targetPath === nodePath
        const isPrefix = targetPath.startsWith(nodePath + '/')
        // 动态参数匹配（如 /coupons/edit/123 与 /coupons/edit）
        const dynParamMatch = matchesDynamicPath(nodePath, targetPath)
        if (isExact || isPrefix || dynParamMatch) {
          // 选择更长 path 的链作为最佳链（更具体）
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
  const routeComponentMap = React.useMemo(() => {
    try {
      const flat = flattenRoutes(annotatedRootRouter)
      const map = new Map()
      flat.forEach((r) => {
        const key = r.path || r.key
        if (!key) return
        // element 可能是 React element，element.type 为组件函数/对象
        const comp = r.element?.type ?? null
        map.set(key, comp)
      })
      return map
    } catch (e) {
      console.warn('Failed to build route component map:', e)
      return new Map()
    }
  }, [])

  // 路由变化时自动计算选中与展开（除非用户刚手动操作）
  useEffect(() => {
    if (!Array.isArray(menuItems) || menuItems.length === 0) return
    const chain = findPathChain(menuItems, pathname)
    if (chain && chain.length > 0) {
      const leaf = chain[chain.length - 1]
      setSelectedKeys([leaf])
      if (!isOpenChange) {
        // 父级链（不包含当前叶子）作为展开 keys
        setOpenKeys(chain.slice(0, -1))
      }
    } else {
      // 找不到匹配链，仍然设置选中（可能是无菜单对应的裸路由）
      setSelectedKeys([pathname])
      if (!isOpenChange) {
        setOpenKeys([])
      }
    }
  }, [pathname, menuItems, isOpenChange])

  const onOpenChange = (keys) => {
    setIsOpenChange(true)
    const nextKeys = Array.isArray(keys) ? keys : []
    // 简单互斥：同层级仅保留一个展开；通过比较链长度实现
    // 计算所有当前 key 的父链深度（根据 menuItems）
    const depthMap = {}
    const buildDepth = (items, depth) => {
      if (!Array.isArray(items)) return
      for (const item of items) {
        // 添加空值检查，避免 "Cannot convert undefined or null to object" 错误
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
    // 按层分组，取最后一个操作的 key 所在层，仅保留该层的最后一个
    const latestKey = nextKeys.find((k) => !safeOpenKeys.includes(k)) || nextKeys[nextKeys.length - 1]
    const layer = depthMap[latestKey]
    const filtered = nextKeys.filter((k) => depthMap[k] !== layer || k === latestKey)
    setOpenKeys(filtered)
  }

  const onSelect = async ({ key }) => {
    const selected = findMenuItemByKey(menuItems, key)
    const selectedPath = selected?.path || selected?.key || key

    try {
      const ok = await permissionService.canAccessRoute(selectedPath, false)
      if (!ok) {
        showDeniedOnce(selectedPath)
        return
      }
      redirectTo(selectedPath)
      setIsOpenChange(false)
      onMenuClick?.()
    } catch (error) {
      console.error('菜单权限检查失败:', error)
      showDeniedOnce(selectedPath)
    }
  }

  return (
    <>
      {contextHolder}
      <Menu
        inlineIndent={10}
        mode={mode}
        defaultSelectedKeys={safeSelectedKeys}
        defaultOpenKeys={safeOpenKeys}
        selectedKeys={safeSelectedKeys}
        openKeys={safeOpenKeys}
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
