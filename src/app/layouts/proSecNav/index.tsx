import { useMemo, useState } from 'react'
import { Menu, type MenuProps } from 'antd'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isValidElement } from 'react'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { findNavigationChain, type NavigationItem } from '@platform/navigation/menu'
import { permissionService } from '@platform/auth/services/permissionService'
import { showMessage } from '@platform/feedback/message'
import rootRouter from '@routers'
import { flattenRouteNodes } from '@platform/navigation/routes'
import { createMenuIcon } from '@layouts/navigation/menu.config'
import { useNavigation } from '@layouts/navigation/useNavigation'
import { useProThemeContext } from '@src/theme/hooks'
import { getAccessiblePrimaryColor } from '@src/theme/contrast'
import styles from './index.module.less'

interface ProSecNavProps {
  mode?: MenuProps['mode']
  theme?: MenuProps['theme']
  onMenuClick?: () => void
}
type Preloadable = { preload?: () => unknown }

const ProSecNav = ({ mode = 'inline', theme = 'light', onMenuClick }: ProSecNavProps) => {
  const { pathname } = useLocation()
  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { themeSettings } = useProThemeContext()
  const [expanded, setExpanded] = useState<{ pathname: string; keys: string[] } | null>(null)
  const routeComponents = useMemo(
    () =>
      new Map<string, Preloadable>(
        flattenRouteNodes(rootRouter).flatMap((route) => {
          const key = route.key || route.handle?.routePath || route.path
          return key && isValidElement(route.element) ? [[key, route.element.type as unknown as Preloadable]] : []
        })
      ),
    []
  )
  const chain = findNavigationChain(navigation, pathname)
  const selectedKeys = chain.length ? [chain.at(-1)!.key] : []
  const isDarkTheme = theme === 'dark'
  const darkSelectedBackground = getAccessiblePrimaryColor(
    getAccessiblePrimaryColor(themeSettings.colorPrimary, 'dark'),
    'light'
  )
  const openKeys = expanded?.pathname === pathname ? expanded.keys : chain.slice(0, -1).map((item) => item.key)
  const preload = (path: string) => {
    void (async () => routeComponents.get(path)?.preload?.())().catch(() => {
      /* Navigation still retries on click. */
    })
  }
  const toItems = (nodes: NavigationItem[]): MenuProps['items'] =>
    nodes.map((item) => {
      const selected = selectedKeys.includes(item.key)

      return {
        key: item.key,
        icon: createMenuIcon(item.iconName),
        style: selected && isDarkTheme ? { backgroundColor: darkSelectedBackground } : undefined,
        label: (
          <span
            onMouseEnter={() => preload(item.path)}
            style={selected ? { color: isDarkTheme ? '#fff' : '#1f1f1f' } : undefined}
          >
            {item.i18nKey ? t(item.i18nKey, { defaultValue: item.label }) : item.label}
          </span>
        ),
        ...(item.children?.length ? { children: toItems(item.children) } : {}),
      }
    })
  const onSelect: NonNullable<MenuProps['onSelect']> = async ({ key }) => {
    if (!(await permissionService.canAccessRoute(key))) {
      showMessage.error('您没有权限访问该页面')
      return
    }
    redirectTo(key)
    onMenuClick?.()
  }
  return (
    <Menu
      className={mode === 'horizontal' ? styles.topMenu : styles.menu}
      mode={mode}
      forceSubMenuRender
      theme={theme}
      items={toItems(navigation)}
      selectedKeys={selectedKeys}
      openKeys={mode === 'inline' ? openKeys : undefined}
      onOpenChange={(keys) => setExpanded({ pathname, keys })}
      onSelect={onSelect}
    />
  )
}

export default ProSecNav
