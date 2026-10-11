import AnimatedIcon from '@wui/AnimatedIcon'
import PropTypes from 'prop-types'
import { Layout, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { selectIsMobile, useAppStore } from '@/store'
import type { ComponentProps, FC, ReactNode } from 'react'
import type { LayoutSlots } from '../types'

import styles from './index.module.less'

interface ProSiderProps {
  children?: ReactNode
  theme?: ComponentProps<typeof Layout.Sider>['theme']
  slots?: LayoutSlots
}

const ProSider: FC<ProSiderProps> = ({ children, theme = 'light', slots }) => {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const isMobile = useAppStore(selectIsMobile)

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
      {slots?.siderStart}
      {children}
      {slots?.siderEnd}
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
  slots: PropTypes.object,
}

export default ProSider
