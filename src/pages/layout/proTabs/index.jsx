import React, { useState, useEffect, useRef, Suspense, useTransition } from 'react'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Tabs, Dropdown, Space, theme, Button } from 'antd'
import StickyBox from 'react-sticky-box'
import { SyncOutlined, FireOutlined, DownOutlined } from '@ant-design/icons'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useTranslation } from 'react-i18next'
import { useProTabContext } from '@app-hooks/proTabsContext'
import Loading from '@src/components/stateless/Loading'
import Fullscreen from '../fullscreen'
import KeepAlive from '@src/components/KeepAlive'

const ProTabs = (props) => {
  const { activeKey, setActiveKey, panes, setPanes, removeTab } = useProTabContext()
  const [isReload, setIsReload] = useState(false)
  const [isPending, startTransition] = useTransition()
  const pathRef = useRef('')

  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const { panesItem, tabActiveKey } = props
  const { pathname, search } = useLocation()
  const fullPath = pathname + search

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} style={{ zIndex: 10 }}>
      <DefaultTabBar {...props} className="pro-tabs" style={{ ...props.style, backgroundColor: colorBgContainer }} />
    </StickyBox>
  )

  useEffect(() => {
    document.querySelector('#container').scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  useEffect(() => {
    const newPath = pathname + search

    if (!panesItem.path || panesItem.path === pathRef.current) return

    pathRef.current = newPath

    const index = panes.findIndex((item) => item.key === panesItem.key)
    setActiveKey(tabActiveKey)

    if (!panesItem.key || (index > -1 && newPath === panes[index].path)) {
      return
    }

    if (index > -1) {
      // avoid mutating existing panes array in place
      const newPanes = panes.map((p, i) => (i === index ? { ...p, path: newPath } : p))
      setPanes(newPanes)
      return
    }

    setPanes([...panes, panesItem])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, tabActiveKey])

  const onChange = (key) => {
    startTransition(() => {
      setActiveKey(key)
    })
  }

  // tab点击
  const onTabClick = (targetKey) => {
    const pane = panes.filter((item) => item.key === targetKey)[0]
    const path = (pane && (pane.path || pane.key)) || targetKey
    startTransition(() => {
      redirectTo(path)
    })
  }

  const onTabScroll = ({ direction }) => {
    // no-op: avoid logging on scroll (can cause jank)
  }

  const onEdit = (targetKey, action) => {
    if (action === 'remove') removeTab(targetKey)
  }

  // 刷新当前 tab
  const refreshTab = () => {
    setIsReload(true)
    setTimeout(() => {
      setIsReload(false)
    }, 1000)
  }

  const onTabContextMenu = (rightMenuKey) => {
    if (rightMenuKey === 'all') {
      const filterPanes = panes.filter((pane) => pane.key === '/')
      setPanes(filterPanes)
      redirectTo('/')
      setActiveKey('/')
    }
    if (rightMenuKey === 'other') {
      const filterPanes = panes.filter((pane) => pane.key === '/' || pane.key === activeKey)
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
  // Note: pre-rendering via KeepAlive.preRenderAll was removed when KeepAlive
  // was simplified to a portal-based implementation. If we reintroduce
  // background pre-rendering later, re-add appropriate APIs on KeepAlive.

  return (
    <Tabs
      hideAdd
      type="editable-card"
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
      activeKey={activeKey}
      destroyOnHidden={false}
      tabBarExtraContent={{
        left: (
          <Space align="center" size={30} style={{ margin: '0 10px' }}>
            <FireOutlined style={{ color: '#eb2f96', fontSize: 16 }} />
          </Space>
        ),
        right: (
          <>
            <Space style={{ padding: '0 5px' }}>
              <Fullscreen ele="#fullScreenContent" placement="left" tips="主内容全屏" />
            </Space>
            {panes.length > 2 ? (
              <Dropdown
                menu={{
                  items: tabRightMenu,
                  onClick: ({ key }) => {
                    onTabContextMenu(key)
                  },
                }}
                trigger={['hover']}
              >
                <Button type="link">
                  More <DownOutlined />
                </Button>
              </Dropdown>
            ) : null}
          </>
        ),
      }}
      items={panes.map((pane) => ({
        label: (
          <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {pane.key === fullPath && pane.key !== '/404' && (
              <SyncOutlined onClick={refreshTab} title="刷新" spin={isReload} />
            )}
            {pane.i18nKey ? t(pane.i18nKey) : pane.title}
          </span>
        ),
        key: pane.key,
        closable: pane.closable,
        forceRender: true,
        children: (
          <ErrorBoundary onReset={fixError} navigate={redirectTo}>
            <div className="layout-tabpanel">
              <KeepAlive id={pane.key} active={pane.key === fullPath} persistOnUnmount={pane.key === '/'}>
                <Suspense fallback={<Loading />}>
                  {isReload && pane.key === fullPath && pane.key !== '/404' ? (
                    <Loading tip="刷新中..." />
                  ) : (
                    <>{pane.content}</>
                  )}
                </Suspense>
              </KeepAlive>
            </div>
          </ErrorBoundary>
        ),
      }))}
    />
  )
}

export default ProTabs
