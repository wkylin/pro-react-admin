import React, { useRef, useState, useMemo } from 'react'
import { Layout, Drawer } from 'antd'
import { selectIsMobile, useAppStore } from '@/store'
import { ProTabProvider } from '@layouts/proTabs/context'
import PointerMove from '@stateless/PointerMove'
import MagicTrail from '@stateless/MagicTrail'
import SettingDrawer from '@stateless/SettingDrawer'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'
import styles from './index.module.less'
import { useProThemeContext } from '@theme/hooks'
import { defaultLayoutRegistry } from './registry'
import type { LayoutRegistry } from './types'

interface ProLayoutProps {
  registry?: LayoutRegistry
}

const ProLayout = ({ registry = defaultLayoutRegistry }: ProLayoutProps) => {
  const layoutRef = useRef(null)
  const [settingOpen, setSettingOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useAppStore(selectIsMobile)

  const { themeSettings, resolvedTheme } = useProThemeContext()
  const { layout, navTheme } = themeSettings
  const preset = registry[layout]

  // 在暗黑模式下，导航栏强制为暗色，否则跟随 navTheme 设置
  const effectiveNavTheme = resolvedTheme === 'dark' ? 'dark' : navTheme

  return (
    <Layout className={styles.layout} ref={layoutRef}>
      {themeSettings.pointerMove ? <PointerMove /> : null}
      {themeSettings.magicTrail ? (
        <MagicTrail
          containerRef={layoutRef}
          colors={['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#4ade80']}
          trailLength={35}
          particleCount={75}
          decay={0.03}
          smoothing={0.65}
        />
      ) : null}
      <ProTabProvider>
        <ProHeader
          layout={layout}
          slots={preset.slots}
          onSettingClick={() => setSettingOpen(true)}
          onMobileMenuClick={() => setMobileOpen(true)}
        >
          {preset.secondaryNavigation === 'header' && !isMobile ? (
            <ProSecNav mode="horizontal" theme={effectiveNavTheme} />
          ) : null}
        </ProHeader>
        <Layout className={styles.layout}>
          {isMobile ? (
            <Drawer
              placement="left"
              onClose={() => setMobileOpen(false)}
              open={mobileOpen}
              size={208}
              styles={{ body: { padding: 0 } }}
              closable={false}
            >
              <ProSider theme={effectiveNavTheme} slots={preset.slots}>
                <ProSecNav mode="inline" theme={effectiveNavTheme} onMenuClick={() => setMobileOpen(false)} />
              </ProSider>
            </Drawer>
          ) : (
            preset.showSider && (
              <ProSider theme={effectiveNavTheme} slots={preset.slots}>
                <ProSecNav mode="inline" theme={effectiveNavTheme} />
              </ProSider>
            )
          )}
          <ProContent showTabs={preset.showTabs} slots={preset.slots} />
        </Layout>
      </ProTabProvider>

      <SettingDrawer open={settingOpen} onClose={() => setSettingOpen(false)} />
    </Layout>
  )
}

export { createLayoutRegistry, defaultLayoutRegistry } from './registry'
export type { LayoutMode, LayoutPresetConfig, LayoutRegistry, LayoutRegistryOverrides, LayoutSlots } from './types'

export default ProLayout
