import React, { useRef, useState } from 'react'
import { Layout, Grid, Drawer } from 'antd'
import { ProTabProvider } from '@hooks/proTabsContext'
import PointerMove from '@stateless/PointerMove'
import MagicTrail from '@stateless/MagicTrail'
import SettingDrawer from '@stateless/SettingDrawer'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'
import styles from './index.module.less'
import { constant } from 'lodash'
import { useProThemeContext } from '@theme/hooks'
import { useRemoveGlobalLoader } from '@hooks/useRemoveGlobalLoader'

const { useBreakpoint } = Grid

const ProLayout = () => {
  useRemoveGlobalLoader()
  const layoutRef = useRef(null)
  const [settingOpen, setSettingOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const { themeSettings } = useProThemeContext()
  const { layout, themeMode, navTheme } = themeSettings

  // 在暗黑模式下，导航栏强制为暗色，否则跟随 navTheme 设置
  const effectiveNavTheme = themeMode === 'dark' ? 'dark' : navTheme

  return (
    <Layout className={styles.layout} ref={layoutRef}>
      <PointerMove />
      <MagicTrail
        containerRef={layoutRef}
        colors={['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#4ade80']}
        trailLength={35}
        particleCount={75}
        decay={0.03}
        smoothing={0.65}
      />
      <ProTabProvider>
        <ProHeader
          layout={layout}
          onSettingClick={() => setSettingOpen(true)}
          isMobile={isMobile}
          onMobileMenuClick={() => setMobileOpen(true)}
        >
          {layout === 'top' && !isMobile ? <ProSecNav mode="horizontal" theme={effectiveNavTheme} /> : null}
        </ProHeader>
        <Layout className={styles.layout}>
          {isMobile ? (
            <Drawer
              placement="left"
              onClose={() => setMobileOpen(false)}
              open={mobileOpen}
              styles={{ body: { padding: 0 }, wrapper: { width: 208 } }}
              closable={false}
            >
              <ProSider theme={effectiveNavTheme} isMobile collapsed={false}>
                <ProSecNav mode="inline" theme={effectiveNavTheme} onMenuClick={() => setMobileOpen(false)} />
              </ProSider>
            </Drawer>
          ) : (
            layout !== 'top' && (
              <ProSider theme={effectiveNavTheme} collapsed={collapsed} onCollapse={setCollapsed}>
                <ProSecNav mode="inline" theme={effectiveNavTheme} />
              </ProSider>
            )
          )}
          <ProContent />
        </Layout>
      </ProTabProvider>

      <SettingDrawer open={settingOpen} onClose={() => setSettingOpen(false)} />
    </Layout>
  )
}

export default ProLayout
