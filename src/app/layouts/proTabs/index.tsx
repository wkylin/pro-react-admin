import AnimatedIcon from '@wui/AnimatedIcon'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  Suspense,
  useTransition,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from 'react'
import PropTypes from 'prop-types'
import { useLocation, useRevalidator } from 'react-router-dom'
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
  const tabBarRef = useRef<HTMLDivElement>(null)
  const [actionPosition, setActionPosition] = useState<{ key: string; left: number; top: number } | null>(null)
  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const revalidator = useRevalidator()
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

  useLayoutEffect(() => {
    const tabBar = tabBarRef.current?.parentElement
    if (!tabBar) return

    let frame = 0
    const updatePosition = () => {
      const slot = tabBar.querySelector<HTMLElement>('[data-tab-action-slot]')
      if (!slot) {
        setActionPosition(null)
        return
      }

      const slotRect = slot.getBoundingClientRect()
      const barRect = tabBar.getBoundingClientRect()
      const next = {
        key: visibleActiveKey,
        left: Math.round(slotRect.left - barRect.left),
        top: Math.round(slotRect.top - barRect.top),
      }
      setActionPosition((current) =>
        current?.key === next.key && current.left === next.left && current.top === next.top ? current : next
      )
    }
    const schedulePosition = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updatePosition)
    }

    updatePosition()
    const resizeObserver = new ResizeObserver(schedulePosition)
    resizeObserver.observe(tabBar)
    const tabList = tabBar.querySelector<HTMLElement>('[role="tablist"]')
    if (tabList) resizeObserver.observe(tabList)
    const mutationObserver = new MutationObserver(schedulePosition)
    if (tabList) {
      mutationObserver.observe(tabList, {
        attributes: true,
        attributeFilter: ['class', 'style'],
        childList: true,
        characterData: true,
        subtree: true,
      })
    }
    tabBar.addEventListener('scroll', schedulePosition, true)
    window.addEventListener('resize', schedulePosition)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      tabBar.removeEventListener('scroll', schedulePosition, true)
      window.removeEventListener('resize', schedulePosition)
    }
  }, [visibleActiveKey, visiblePanes.length, t])

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
      {activePane && actionPosition?.key === visibleActiveKey ? (
        <div className={styles.activeTabActions} style={{ left: actionPosition.left, top: actionPosition.top }}>
          {activePane.closable ? (
            <button
              type="button"
              className={styles.tabActionButton}
              aria-label={t('admin.closeCurrentTab')}
              title={t('admin.closeCurrentTab')}
              onClick={() => removeTab(visibleActiveKey)}
            >
              <CloseOutlined aria-hidden />
            </button>
          ) : null}
          <button
            type="button"
            className={styles.tabActionButton}
            aria-label={t('admin.refresh')}
            title={t('admin.refresh')}
            onClick={refreshTab}
          >
            <SyncOutlined
              key={activePane.generation ?? 0}
              className={activePane.generation ? styles.tabRefreshIcon : undefined}
              aria-hidden
            />
          </button>
        </div>
      ) : null}
      <div className={styles.tabBarActions} ref={tabBarRef} role="group" aria-label={t('admin.pageActions')}>
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
    if (!activePane) return
    setPanes((current) => {
      const index = current.findIndex((pane) => pane.key === visibleActiveKey)
      if (index < 0) return [...current, { ...activePane, generation: (activePane.generation ?? 0) + 1 }]

      return current.map((pane) =>
        pane.key === visibleActiveKey
          ? {
              ...pane,
              content: pane.key === panesItem.key ? panesItem.content : pane.content,
              generation: (pane.generation ?? 0) + 1,
            }
          : pane
      )
    })
    void revalidator.revalidate()
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
          <span className={styles.tabLabel}>
            <span>{pane.i18nKey ? t(pane.i18nKey) : pane.title}</span>
            {pane.key === visibleActiveKey ? (
              <span
                className={`${styles.tabActionSlot} ${pane.closable ? '' : styles.tabActionSlotSingle}`}
                data-tab-action-slot=""
                aria-hidden="true"
              />
            ) : null}
          </span>
        ),
        key: pane.key,
        // Action buttons are positioned over the active tab but stay outside the tablist.
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
