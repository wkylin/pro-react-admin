import AnimatedIcon from '@wui/AnimatedIcon'
import { useEffect, Suspense, useTransition, type CSSProperties, type Dispatch, type SetStateAction } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { Tabs, Dropdown, theme, Button, type TabsProps } from 'antd'
import StickyBox from 'react-sticky-box'
import { SyncOutlined, FireOutlined, EllipsisOutlined, CloseOutlined } from '@ant-design/icons'
import ErrorBoundary from '@/platform/errors/ErrorBoundary'
import { useTranslation } from 'react-i18next'
import { useProTabContext, type Pane } from '@layouts/proTabs/context'
import Loading from '@src/components/stateless/Loading'
import Fullscreen from '../fullscreen'
import KeepAlive from '@platform/keep-alive'
import styles from './index.module.less'

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
  const activePane = visiblePanes.find((pane) => pane.key === visibleActiveKey)

  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken()

  const renderTabBar: NonNullable<TabsProps['renderTabBar']> = (tabBarProps, DefaultTabBar) => (
    <StickyBox
      className={`${styles.tabBarRow} layout-tabbar-shell`}
      offsetTop={0}
      style={
        {
          zIndex: 10,
          backgroundColor: colorBgContainer,
          '--pro-tabs-border-color': colorBorderSecondary,
        } as CSSProperties
      }
    >
      <span className={styles.tabBarDecoration} aria-hidden="true">
        <AnimatedIcon variant="spin" mode="hover">
          <FireOutlined style={{ color: '#eb2f96', fontSize: 16 }} aria-hidden="true" />
        </AnimatedIcon>
      </span>
      <DefaultTabBar
        {...tabBarProps}
        extra={undefined}
        className={`pro-tabs ${styles.tabList}`}
        style={{ ...tabBarProps.style, backgroundColor: colorBgContainer, flex: '1 1 auto', minWidth: 0 }}
      />
      <div className={styles.tabBarActions} role="group" aria-label={t('admin.pageActions')}>
        {activePane?.closable ? (
          <Button
            type="text"
            size="small"
            aria-label={t('admin.closeCurrentTab')}
            title={t('admin.closeCurrentTab')}
            icon={<CloseOutlined aria-hidden />}
            onClick={() => removeTab(visibleActiveKey)}
          />
        ) : null}
        <Button
          type="text"
          size="small"
          aria-label={t('admin.refresh')}
          icon={<SyncOutlined aria-hidden />}
          onClick={refreshTab}
        />
        <Fullscreen ele="#fullScreenContent" placement="left" tips={t('admin.contentFullscreen')} />
        {visiblePanes.length > 2 ? (
          <Dropdown
            menu={{
              items: tabRightMenu,
              onClick: ({ key }) => {
                if (key === 'all' || key === 'other') onTabContextMenu(key)
              },
            }}
            trigger={['click']}
          >
            <Button
              type="text"
              size="small"
              aria-label={t('header.moreActions')}
              title={t('header.moreActions')}
              icon={<EllipsisOutlined aria-hidden />}
            />
          </Dropdown>
        ) : null}
      </div>
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
      label: t('admin.closeOtherTabs'),
      key: 'other',
    },
    {
      label: t('admin.closeAllTabs'),
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
      renderTabBar={renderTabBar}
      className="layout-container"
      id="container"
      tabBarStyle={{
        zIndex: 2,
        marginBottom: 0,
      }}
      activeKey={visibleActiveKey}
      destroyOnHidden={false}
      items={visiblePanes.map((pane) => ({
        label: (
          <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {pane.i18nKey ? t(pane.i18nKey) : pane.title}
          </span>
        ),
        key: pane.key,
        // Keep non-tab controls (including close actions) outside the tablist.
        closable: false,
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
