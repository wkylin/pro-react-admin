/**
 * 权限控制的菜单组件示例
 *
 * 本组件展示如何使用新的权限系统来动态生成菜单
 * 只显示当前用户有权限访问的路由
 *
 * 使用位置建议：
 * - src/pages/layout/components/SideMenu.jsx
 * - src/components/layout/Sidebar.jsx
 *
 * 集成步骤：
 * 1. 将此组件代码复制到你的菜单组件中
 * 2. 或者导入 useVisibleRoutes Hook 到现有菜单组件
 * 3. 替换硬编码的路由数据为 menuRoutes
 */

import React, { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getVisibleMenuRoutes } from '@src/routers'
import { permissionService } from '@src/service/permissionService'

/**
 * 自定义 Hook: 获取可见路由
 */
export const useVisibleRoutes = () => {
  const [menuRoutes, setMenuRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const loadRoutes = async () => {
      try {
        setLoading(true)
        const routes = await getVisibleMenuRoutes()
        if (mounted) {
          setMenuRoutes(routes[0]?.children || [])
          setError(null)
        }
      } catch (err) {
        console.error('加载菜单路由失败:', err)
        if (mounted) {
          setError(err)
          setMenuRoutes([])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadRoutes()

    return () => {
      mounted = false
    }
  }, [])

  // 提供刷新方法（用于权限变更后重新加载）
  const refresh = async () => {
    await permissionService.syncPermissions()
    const routes = await getVisibleMenuRoutes()
    setMenuRoutes(routes[0]?.children || [])
  }

  return { menuRoutes, loading, error, refresh }
}

/**
 * 基础菜单项组件
 */
const MenuItem = ({ route, level = 0 }) => {
  const location = useLocation()
  const isActive = location.pathname === route.path

  const hasChildren = route.children && route.children.length > 0

  return (
    <div className={`menu-item level-${level}`}>
      <Link
        to={route.path}
        className={isActive ? 'active' : ''}
        style={{
          paddingLeft: `${level * 20 + 16}px`,
          display: 'block',
          padding: '12px 16px',
          textDecoration: 'none',
          color: isActive ? '#1890ff' : '#333',
          backgroundColor: isActive ? '#e6f7ff' : 'transparent'
        }}
      >
        {route.name || route.path}
      </Link>

      {hasChildren && (
        <div className='menu-children'>
          {route.children.map((child) => (
            <MenuItem key={child.key || child.path} route={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 侧边栏菜单组件（基础版）
 */
export const PermissionBasedMenu = () => {
  const { menuRoutes, loading, error } = useVisibleRoutes()

  if (loading) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <div>加载菜单中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '16px', color: 'red' }}>
        <div>菜单加载失败</div>
        <small>{error.message}</small>
      </div>
    )
  }

  if (!menuRoutes || menuRoutes.length === 0) {
    return (
      <div style={{ padding: '16px', color: '#999' }}>
        <div>暂无可访问的菜单</div>
      </div>
    )
  }

  return (
    <nav className='permission-based-menu' style={{ width: '240px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {menuRoutes.map((route) => (
        <MenuItem key={route.key || route.path} route={route} />
      ))}
    </nav>
  )
}

/**
 * 带权限切换的菜单组件（调试版）
 * 包含角色切换功能，方便测试不同权限
 */
export const PermissionBasedMenuWithDebug = () => {
  const { menuRoutes, loading, error, refresh } = useVisibleRoutes()
  const [currentRole, setCurrentRole] = useState('')

  useEffect(() => {
    const role = localStorage.getItem('user_role') || 'user'
    setCurrentRole(role)
  }, [])

  const handleRoleChange = async (role) => {
    localStorage.setItem('user_role', role)
    setCurrentRole(role)
    await refresh()
  }

  return (
    <div>
      {/* 调试工具栏 */}
      <div style={{ padding: '16px', backgroundColor: '#fafafa', borderBottom: '1px solid #d9d9d9' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
          当前角色: <strong>{currentRole}</strong>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleRoleChange('super_admin')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              backgroundColor: currentRole === 'super_admin' ? '#1890ff' : '#fff',
              color: currentRole === 'super_admin' ? '#fff' : '#333',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            超级管理员
          </button>
          <button
            onClick={() => handleRoleChange('admin')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              backgroundColor: currentRole === 'admin' ? '#1890ff' : '#fff',
              color: currentRole === 'admin' ? '#fff' : '#333',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            管理员
          </button>
          <button
            onClick={() => handleRoleChange('business_user')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              backgroundColor: currentRole === 'business_user' ? '#1890ff' : '#fff',
              color: currentRole === 'business_user' ? '#fff' : '#333',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            业务员
          </button>
          <button
            onClick={() => handleRoleChange('user')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              backgroundColor: currentRole === 'user' ? '#1890ff' : '#fff',
              color: currentRole === 'user' ? '#fff' : '#333',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            普通用户
          </button>
        </div>
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#999' }}>可访问菜单数: {menuRoutes.length}</div>
      </div>

      {/* 菜单内容 */}
      {loading
        ? (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div>加载菜单中...</div>
          </div>
          )
        : error
          ? (
            <div style={{ padding: '16px', color: 'red' }}>
              <div>菜单加载失败</div>
              <small>{error.message}</small>
            </div>
            )
          : menuRoutes.length === 0
            ? (
              <div style={{ padding: '16px', color: '#999' }}>
                <div>暂无可访问的菜单</div>
              </div>
              )
            : (
              <nav className='permission-based-menu' style={{ backgroundColor: '#f5f5f5' }}>
                {menuRoutes.map((route) => (
                  <MenuItem key={route.key || route.path} route={route} />
                ))}
              </nav>
              )}
    </div>
  )
}

/**
 * Ant Design Menu 适配版本
 * 适用于使用 antd Menu 组件的项目
 */
export const useAntdMenuItems = () => {
  const { menuRoutes, loading } = useVisibleRoutes()

  const menuItems = useMemo(() => {
    const convertToAntdItems = (routes, parentPath = '') => {
      return routes.map((route) => {
        const fullPath = route.path
        const hasChildren = route.children && route.children.length > 0

        const item = {
          key: route.key || fullPath,
          label: route.name || route.path,
          path: fullPath
        }

        if (hasChildren) {
          item.children = convertToAntdItems(route.children, fullPath)
        }

        return item
      })
    }

    return convertToAntdItems(menuRoutes)
  }, [menuRoutes])

  return { menuItems, loading }
}

/**
 * 使用示例（Ant Design Menu）:
 *
 * import { Menu } from 'antd'
 * import { useNavigate } from 'react-router-dom'
 * import { useAntdMenuItems } from './PermissionMenuExample'
 *
 * export const Sidebar = () => {
 *   const navigate = useNavigate()
 *   const { menuItems, loading } = useAntdMenuItems()
 *
 *   const handleMenuClick = ({ key, item }) => {
 *     if (item.props.path) {
 *       navigate(item.props.path)
 *     }
 *   }
 *
 *   if (loading) return <div>加载中...</div>
 *
 *   return (
 *     <Menu
 *       mode="inline"
 *       items={menuItems}
 *       onClick={handleMenuClick}
 *     />
 *   )
 * }
 */

export default PermissionBasedMenu
