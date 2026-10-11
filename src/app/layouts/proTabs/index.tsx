import AnimatedIcon from '@wui/AnimatedIcon'
import { useEffect, Suspense, useTransition, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { Tabs, Dropdown, Space, theme, Button, type TabsProps } from 'antd'
import StickyBox from 'react-sticky-box'
import { SyncOutlined, FireOutlined, DownOutlined } from '@ant-design/icons'
import ErrorBoundary from '@/platform/errors/ErrorBoundary'
import { useTranslation } from 'react-i18next'
import { useProTabContext, type Pane } from '@layouts/proTabs/context'
import Loading from '@src/components/stateless/Loading'
import Fullscreen from '../fullscreen'
import KeepAlive from '@platform/keep-alive'

type ProTabsProps = {
  panesItem: Pane
  tabActiveKey: string
}

type ProTabContextValue = {
  activeKey: string
  setActiveKey: Dispatch<SetStateAction<string>>
  panes: Pane[]
  setPanes: Dispatch<SetStateAction<Pane[]>>
  removeTab: (targetKey: string, callbackFun?: () => void) => void
}

const ProTabs = ({ panesItem, tabActiveKey }: ProTabsProps) => {
  const { activeKey, setActiveKey, panes, setPanes, removeTab } = useProTabContext() as ProTabContextValue
  const [, startTransition] = useTransition()
  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const currentRoutePaneIndex = panes.findIndex((pane) => pane.key === panesItem.key)
  const currentRoutePane = currentRoutePaneIndex < 0 ? undefined : panes[currentRoutePaneIndex]
  const currentRoutePaneNeedsUpdate =
    !currentRoutePane ||
    currentRoutePane.routeId !== panesItem.routeId ||
    currentRoutePane.path !== panesItem.path ||
    currentRoutePane.title !== panesItem.title ||
    currentRoutePane.i18nKey !== panesItem.i18nKey ||
    currentRoutePane.closable !== panesItem.closable
  const visiblePanes =
    currentRoutePaneIndex < 0
      ? [...panes, panesItem]
      : currentRoutePaneNeedsUpdate
        ? panes.map((pane, index) => (index === currentRoutePaneIndex ? { ...pane, ...panesItem } : pane))
        : panes
  const visibleActiveKey = tabActiveKey || activeKey || visiblePanes[0]?.key

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const renderTabBar: NonNullable<TabsProps['renderTabBar']> = (tabBarProps, DefaultTabBar) => (
    <StickyBox offsetTop={0} style={{ zIndex: 10 }}>
      <DefaultTabBar
        {...tabBarProps}
        className="pro-tabs"
        style={{ ...tabBarProps.style, backgroundColor: colorBgContainer }}
      />
    </StickyBox>
  )

  useEffect(() => {
    document.querySelector('#container')?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  useEffect(() => {
    if (!panesItem.path || !panesItem.key) return
    setPanes((currentPanes) => {
      const index = currentPanes.findIndex((item) => item.key === panesItem.key)
      if (index === -1) return [...currentPanes, panesItem]

      const currentPane = currentPanes[index]
      const hasPaneChanged =
        currentPane.routeId !== panesItem.routeId ||
        currentPane.path !== panesItem.path ||
        currentPane.title !== panesItem.title ||
        currentPane.i18nKey !== panesItem.i18nKey ||
        currentPane.closable !== panesItem.closable

      // useOutlet creates a new React element on every render. Keep the cached page
      // instance stable unless its route or visible metadata actually changed.
      if (!hasPaneChanged) return currentPanes

      return currentPanes.map((pane, paneIndex) => (paneIndex === index ? { ...pane, ...panesItem } : pane))
    })
    setActiveKey(tabActiveKey)
  }, [panesItem, setActiveKey, setPanes, tabActiveKey])

  const onChange: NonNullable<TabsProps['onChange']> = (key) => {
    startTransition(() => {
      setActiveKey(key)
    })
  }

  // tab点击
  const onTabClick: NonNullable<TabsProps['onTabClick']> = (targetKey) => {
    const pane = visiblePanes.find((item) => item.key === targetKey)
    const path = (pane && (pane.path || pane.key)) || targetKey
    startTransition(() => {
      redirectTo(path)
    })
  }

  const onTabScroll: NonNullable<TabsProps['onTabScroll']> = () => {}

  const onEdit: NonNullable<TabsProps['onEdit']> = (targetKey, action) => {
    if (action === 'remove' && typeof targetKey === 'string') removeTab(targetKey)
  }

  // 刷新当前 tab
  const refreshTab = () => {
    setPanes((current) =>
      current.map((pane) =>
        pane.key === visibleActiveKey ? { ...pane, generation: (pane.generation ?? 0) + 1 } : pane
      )
    )
  }

  const onTabContextMenu = (rightMenuKey: 'all' | 'other') => {
    if (rightMenuKey === 'all') {
      const filterPanes = visiblePanes.filter((pane) => pane.key === '/')
      setPanes(filterPanes)
      redirectTo('/')
      setActiveKey('/')
    }
    if (rightMenuKey === 'other') {
      const filterPanes = visiblePanes.filter((pane) => pane.key === '/' || pane.key === visibleActiveKey)
      setPanes(filterPanes)
    }
  }

  // tab 右键菜单
  const tabRightMenu = [
    {
      label: '关闭其他',
      key: 'other',
    },
    {
      label: '全部关闭',
      key: 'all',
    },
  ]

  const fixError = () => {
    refreshTab()
  }
  return (
    <Tabs
      hideAdd
      type="editable-card"
      animated={{ inkBar: true, tabPane: false }}
      onChange={onChange}
      onTabClick={onTabClick}
      onTabScroll={onTabScroll}
      onEdit={onEdit}
      renderTabBar={renderTabBar}
      className="layout-container"
      id="container"
      tabBarStyle={{
        zIndex: 2,
        marginBottom: 0,
      }}
      activeKey={visibleActiveKey}
      destroyOnHidden={false}
      tabBarExtraContent={{
        left: (
          <Space align="center" size={30} style={{ margin: '0 10px' }}>
            <AnimatedIcon variant="spin" mode="hover">
              <FireOutlined style={{ color: '#eb2f96', fontSize: 16 }} />
            </AnimatedIcon>
          </Space>
        ),
        right: (
          <>
            <Button
              type="text"
              size="small"
              aria-label={t('admin.refresh')}
              icon={<SyncOutlined aria-hidden />}
              onClick={refreshTab}
            />
            <Space style={{ padding: '0 5px' }}>
              <Fullscreen ele="#fullScreenContent" placement="left" tips="主内容全屏" />
            </Space>
            {visiblePanes.length > 2 ? (
              <Dropdown
                menu={{
                  items: tabRightMenu,
                  onClick: ({ key }) => {
                    if (key === 'all' || key === 'other') onTabContextMenu(key)
                  },
                }}
                trigger={['hover']}
              >
                <Button type="link">
                  More{' '}
                  <AnimatedIcon variant="spin" mode="hover">
                    <DownOutlined />
                  </AnimatedIcon>
                </Button>
              </Dropdown>
            ) : null}
          </>
        ),
      }}
      items={visiblePanes.map((pane) => ({
        label: (
          <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {pane.i18nKey ? t(pane.i18nKey) : pane.title}
          </span>
        ),
        key: pane.key,
        closable: pane.closable,
        forceRender: true,
        children: (
          <ErrorBoundary key={`${pane.key}:${pane.generation ?? 0}`} onReset={fixError} navigate={redirectTo}>
            <div className="layout-tabpanel">
              <KeepAlive id={pane.key} active={pane.key === visibleActiveKey} persistOnUnmount={pane.key === '/'}>
                <Suspense fallback={<Loading />}>{pane.content}</Suspense>
              </KeepAlive>
            </div>
          </ErrorBoundary>
        ),
      }))}
    />
  )
}

ProTabs.propTypes = {
  panesItem: PropTypes.object,
  tabActiveKey: PropTypes.string,
}

export default ProTabs
