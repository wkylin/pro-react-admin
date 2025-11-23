import React, { useEffect, useState, useRef } from 'react'
import { message } from 'antd'
import { Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@hooks/useSafeNavigate'
import { useTranslation } from 'react-i18next'
import {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
  FireOutlined,
  GlobalOutlined,
  QrcodeOutlined,
} from '@ant-design/icons'
import { permissionService } from '@src/service/permissionService'

import styles from './index.module.less'

// 已弃用 pathSubmenu 静态映射，改为自动推导父级链

const ProSecNav = () => {
  const { pathname } = useLocation()
  const { redirectTo } = useSafeNavigate()

  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const lastDeniedRef = useRef(null)
  const [selectedKeys, setSelectedKeys] = useState(['home'])
  const [menuItems, setMenuItems] = useState([])
  const [accessibleRoutes, setAccessibleRoutes] = useState([])

  // 当前路由对应的 sub menu key
  const [openKeys, setOpenKeys] = useState([])

  // 提取放在redux中, tab 切换时改成 false
  const [isOpenChange, setIsOpenChange] = useState(false)

  // 支持多层（最多五层示例），不再限制根层 key 列表

  // 初始化：获取用户可访问路由
  useEffect(() => {
    const initMenus = async () => {
      try {
        const userPermissions = await permissionService.getPermissions()
        // 确保根路径 '/' 总是包含（首页对所有账号可见）
        const rawRoutes = Array.isArray(userPermissions?.routes) ? userPermissions.routes : []
        const routes = Array.from(new Set(['/'].concat(rawRoutes)))
        console.log('用户可访问路由:', routes)
        setAccessibleRoutes(routes)

        // 生成动态菜单
        const dynamicMenus = generateMenuItems(routes)
        console.log('生成的菜单:', dynamicMenus)
        setMenuItems(dynamicMenus)
      } catch (error) {
        console.error('获取用户权限失败:', error)
        // 降级：显示基础菜单
        setMenuItems([{ label: t('home'), key: '/', icon: <HomeOutlined /> }])
      }
    }
    initMenus()
  }, [])

  // 递归查找与当前路径最匹配的菜单项父级链
  const findPathChain = (items, targetPath) => {
    let bestChain = null
    const dfs = (nodes, chain) => {
      for (const node of nodes) {
        const nextChain = [...chain, node.key]
        // 匹配规则：精确匹配 或 前缀匹配（允许 /a/b 命中 /a）
        const isExact = targetPath === node.key
        const isPrefix = targetPath.startsWith(node.key + '/')
        // 动态参数匹配（如 /coupons/edit/123 与 /coupons/edit）
        const dynParamMatch =
          node.key.includes(':') &&
          (() => {
            const pattern = node.key.replace(/:[^/]+/g, '[^/]+')
            return new RegExp(`^${pattern}$`).test(targetPath)
          })()
        if (isExact || isPrefix || dynParamMatch) {
          // 选择更长 key 的链作为最佳链（更具体）
          if (!bestChain || node.key.length > bestChain[bestChain.length - 1].length) {
            bestChain = nextChain
          }
        }
        if (node.children) dfs(node.children, nextChain)
      }
    }
    dfs(items, [])
    return bestChain
  }

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
    // 简单互斥：同层级仅保留一个展开；通过比较链长度实现
    // 计算所有当前 key 的父链深度（根据 menuItems）
    const depthMap = {}
    const buildDepth = (items, depth) => {
      for (const item of items) {
        depthMap[item.key] = depth
        if (item.children) buildDepth(item.children, depth + 1)
      }
    }
    buildDepth(menuItems, 0)
    // 按层分组，取最后一个操作的 key 所在层，仅保留该层的最后一个
    const latestKey = keys.find((k) => !openKeys.includes(k)) || keys[keys.length - 1]
    const layer = depthMap[latestKey]
    const filtered = keys.filter((k) => depthMap[k] !== layer || k === latestKey)
    setOpenKeys(filtered)
  }

  const onSelect = async ({ key }) => {
    try {
      // 先做权限检查，阻止无权限导航
      const ok = await permissionService.canAccessRoute(key, false)
      if (!ok) {
        // 避免短时间内重复提示同一个 key
        if (lastDeniedRef.current !== key) {
          lastDeniedRef.current = key
          try {
            messageApi.open({ type: 'error', content: '您没有权限访问该页面' })
          } catch (e) {
            try {
              message.error('您没有权限访问该页面')
            } catch (err) {}
          }
        }
        return
      }
      // 有权限再导航
      redirectTo(key)
      setIsOpenChange(false)
    } catch (error) {
      console.error('菜单权限检查失败:', error)
      // 失败时保守不导航，并显示提示
      if (lastDeniedRef.current !== key) {
        lastDeniedRef.current = key
        try {
          messageApi.open({ type: 'error', content: '您没有权限访问该页面' })
        } catch (e) {
          try {
            message.error('您没有权限访问该页面')
          } catch (err) {}
        }
      }
    }
  }

  /**
   * 生成动态菜单项（根据用户可访问路由过滤）
   */
  const generateMenuItems = (routes) => {
    // 保留兼容函数（用于当没有 meta.permission 时的回退）
    const hasAccess = (path) => {
      return routes.some((route) => {
        if (route === path) return true
        if (path.startsWith(route + '/')) return true
        if (route.includes('*')) {
          const pattern = route.replace('*', '.*')
          return new RegExp(`^${pattern}$`).test(path)
        }
        return false
      })
    }

    // 定义所有可能的菜单项
    const allMenuItems = [
      { label: t('home'), key: '/', icon: <HomeOutlined /> },
      { label: t('demo'), key: '/demo', icon: <GlobalOutlined /> },
      { label: 'Motion', key: '/motion', icon: <QrcodeOutlined /> },
      { label: 'Business', key: '/business', icon: <FireOutlined /> },
      { label: 'Big Screen', key: '/big-screen', icon: <FireOutlined /> },
      { label: 'PH Bar', key: '/ph-bar', icon: <QrcodeOutlined /> },
      { label: 'Qr Generate', key: '/qrcode', icon: <QrcodeOutlined /> },
      { label: 'Prism Render', key: '/prism', icon: <FireOutlined /> },
      { label: 'React Tilt', key: '/tilt', icon: <QrcodeOutlined /> },
      { label: 'Music', key: '/music', icon: <FireOutlined /> },
      { label: 'Crypto', key: '/crypto', icon: <QrcodeOutlined /> },
      { label: 'Video', key: '/video', icon: <FireOutlined /> },
      { label: 'Echarts', key: '/echarts', icon: <FireOutlined /> },
      { label: 'ChatGPT', key: '/markmap', icon: <QrcodeOutlined /> },
      { label: 'Post Message', key: '/postmessage', icon: <FireOutlined /> },
      { label: 'Geo Chart', key: '/geo', icon: <QrcodeOutlined /> },
      { label: 'D3 Chart', key: '/d3-chart', icon: <QrcodeOutlined /> },
      { label: 'Print', key: '/print', icon: <QrcodeOutlined /> },
      { label: 'Dashboard', key: '/dashboard', icon: <FireOutlined /> },
      { label: 'Permission', key: '/permission', icon: <QrcodeOutlined /> },
      { label: 'Profile', key: '/profile', icon: <FireOutlined /> },
      { label: 'Contact', key: '/contact', icon: <QrcodeOutlined /> },
      { label: 'Portfilo', key: '/portfilo', icon: <FireOutlined /> },
      {
        label: '技术栈',
        key: '/sub-act',
        icon: <HeatMapOutlined />,
        children: [
          {
            label: '前端技术栈',
            key: '/sub-coupons',
            icon: <FireOutlined />,
            children: [
              {
                label: '框架生态',
                key: '/sub-fe-framework',
                icon: <FireOutlined />,
                children: [
                  {
                    label: 'Vue',
                    key: '/coupons/add',
                    icon: <FireOutlined />,
                    children: [
                      {
                        label: 'Vue 插件',
                        key: '/coupons/add/plugins',
                        icon: <FireOutlined />,
                        children: [
                          { label: 'Vue3 API', key: '/coupons/add/plugins/vue3' },
                          { label: '性能优化', key: '/coupons/add/plugins/perf' },
                        ],
                      },
                    ],
                  },
                  { label: 'Angular', key: '/coupons/edit' },
                ],
              },
            ],
          },
          {
            label: '后端技术栈',
            key: '/product',
            icon: <DeploymentUnitOutlined />,
          },
        ],
      },
      {
        label: '构建工具',
        key: '/sub-list',
        icon: <ApartmentOutlined />,
        children: [
          { label: 'Webpack', key: '/coupons/list' },
          { label: 'Vite', key: '/order/list' },
        ],
      },
      {
        label: 'Error',
        key: '/sub-error',
        icon: <QuestionCircleOutlined />,
        children: [{ label: 'ErrorBoundary', key: '/error' }],
      },
    ]

    // 递归过滤菜单：仅保留用户可访问的节点或其子节点
    const filterItems = (items) => {
      const result = []
      for (const item of items) {
        // 处理 children
        if (item.children && Array.isArray(item.children)) {
          const children = filterItems(item.children)
          if (children.length > 0) {
            result.push({ ...item, children })
            continue
          }
        }

        // 直接路径可访问则保留
        try {
          if (hasAccess(item.key)) {
            result.push(item)
            continue
          }
        } catch (e) {
          // 忽略匹配错误，继续后续逻辑
          console.warn('菜单访问判断异常', item.key, e)
        }

        // 处理动态参数形式的 menu key（如 /coupons/edit/:id）
        if (typeof item.key === 'string' && item.key.includes(':')) {
          const pattern = item.key.replace(/:[^/]+/g, '[^/]+')
          const regex = new RegExp(`^${pattern}$`)
          // 如果用户的 routes 中有任一路由能匹配该 pattern，则保留
          if (routes.some((r) => regex.test(r))) {
            result.push(item)
            continue
          }
        }
      }
      return result
    }

    return filterItems(allMenuItems)
  }

  // 异步版生成菜单：基于 permissionMap 做逐项权限检查
  const generateMenuItemsAsync = async (routes, permissionMap) => {
    const hasAccessFallback = (path) => {
      return routes.some((route) => {
        if (route === path) return true
        if (path.startsWith(route + '/')) return true
        if (route.includes('*')) {
          const pattern = route.replace('*', '.*')
          return new RegExp(`^${pattern}$`).test(path)
        }
        return false
      })
    }

    // 递归异步过滤
    const filterAsync = async (items) => {
      const results = await Promise.all(
        items.map(async (item) => {
          if (item.children) {
            const children = await filterAsync(item.children)
            if (children.length > 0) return { ...item, children }
            return null
          }

          // 先看是否有 meta.permission
          const perm = permissionMap.get(item.key) || permissionMap.get(item.path)
          if (perm) {
            try {
              // 支持数组或单个 permission
              if (Array.isArray(perm)) {
                // 使用任一权限通过即可
                const any = await permissionService.hasAnyPermission(perm)
                if (any.hasPermission) return item
                return null
              }
              const ok = await permissionService.hasPermission(perm)
              if (ok) return item
              return null
            } catch (e) {
              console.warn('permission check failed for', item.key, e)
              return null
            }
          }

          // 回退到原来的 path 列表判断
          return hasAccessFallback(item.key) ? item : null
        })
      )

      return results.filter(Boolean)
    }

    // 重新生成所有菜单项（与同步版本保持一致）
    const allMenuItems = generateMenuItems(routes)
    return filterAsync(allMenuItems)
  }

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        theme="light"
        className={styles.menu}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        items={menuItems}
      />
      {contextHolder}
    </>
  )
}

export default ProSecNav
