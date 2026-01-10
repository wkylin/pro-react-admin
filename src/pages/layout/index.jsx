import React, { useRef, useState, useMemo } from 'react'
import { Layout, Drawer } from 'antd'
import { useStore } from '@/store'
import { ProTabProvider } from '@app-hooks/proTabsContext'
import PointerMove from '@stateless/PointerMove'
import MagicTrail from '@stateless/MagicTrail'
import SettingDrawer from '@stateless/SettingDrawer'
import ProHeader from './proHeader'
import ProSider from './proSider'
import ProContent from './proContent'
import ProSecNav from './proSecNav'
import styles from './index.module.less'
import { useProThemeContext } from '@theme/hooks'

/**
 * 安全获取 store 状态的 hook
 * 当 store 初始化失败时返回默认值
 */
const useSafeStore = (selector, defaultValue) => {
  try {
    return useStore(selector) ?? defaultValue
  } catch (error) {
    console.error('Store access error:', error)
    return defaultValue
  }
}

const ProLayout = () => {
  const layoutRef = useRef(null)
  const [settingOpen, setSettingOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // 使用安全的 store 访问，当 middleware 加载失败时提供默认值
  const isMobile = useSafeStore((s) => s.isMobile, false)

  const { themeSettings } = useProThemeContext()
  const { layout, themeMode, navTheme } = themeSettings

  // 在暗黑模式下，导航栏强制为暗色，否则跟随 navTheme 设置
  const effectiveNavTheme = themeMode === 'dark' ? 'dark' : navTheme

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
              size={208}
              styles={{ body: { padding: 0 } }}
              closable={false}
            >
              <ProSider theme={effectiveNavTheme} isMobile={true}>
                <ProSecNav mode="inline" theme={effectiveNavTheme} onMenuClick={() => setMobileOpen(false)} />
              </ProSider>
            </Drawer>
          ) : (
            layout !== 'top' && (
              <ProSider theme={effectiveNavTheme}>
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
