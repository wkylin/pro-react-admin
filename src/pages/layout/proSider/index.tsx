import AnimatedIcon from '@stateless/AnimatedIcon'
import PropTypes from 'prop-types'
import { Layout, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useStore } from '@/store'
import type { StoreState } from '@/store/types'
import type { ComponentProps, FC, ReactNode } from 'react'

import styles from './index.module.less'

interface ProSiderProps {
  children?: ReactNode
  theme?: ComponentProps<typeof Layout.Sider>['theme']
  isMobile?: boolean
}

/**
 * 安全获取 store 状态
 */
const useSafeStore = <T,>(selector: (state: StoreState) => T, defaultValue: T): T => {
  try {
    return useStore(selector) ?? defaultValue
  } catch (error) {
    console.error('ProSider store access error:', error)
    return defaultValue
  }
}

const ProSider: FC<ProSiderProps> = ({ children, theme = 'light' }) => {
  const isSidebarOpen = useSafeStore((s) => s.isSidebarOpen, true)
  const toggleSidebar = useSafeStore(
    (s) => s.toggleSidebar,
    () => {}
  )
  const isMobile = useSafeStore((s) => s.isMobile, false)

  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme={theme}
      collapsible
      collapsed={!isMobile && !isSidebarOpen}
      trigger={null}
      className={styles.sider}
      style={isMobile ? { height: '100%' } : undefined}
    >
      {children}
      {!isMobile ? (
        <button
          type="button"
          className={styles.proLink}
          aria-label={isSidebarOpen ? '收起侧边栏' : '展开侧边栏'}
          onClick={() => toggleSidebar()}
        >
          {isSidebarOpen ? (
            <AnimatedIcon variant="spin" mode="hover">
              <MenuFoldOutlined style={{ fontSize: '18px', color: '#08c', cursor: 'pointer' }} />
            </AnimatedIcon>
          ) : (
            <AnimatedIcon variant="spin" mode="hover">
              <MenuUnfoldOutlined style={{ fontSize: '16px', color: '#08c', cursor: 'pointer' }} />
            </AnimatedIcon>
          )}
        </button>
      ) : (
        <Button type="link">Pro React Admin</Button>
      )}
    </Layout.Sider>
  )
}

ProSider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOf(['light', 'dark']),
  isMobile: PropTypes.bool,
  // `isMobile` 为兼容属性；响应式状态仍直接从全局 Zustand 读取
  // 侧边栏折叠状态由全局 Zustand `isSidebarOpen` 管理
}

export default ProSider
