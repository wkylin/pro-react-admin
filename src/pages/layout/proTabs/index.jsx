import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Tabs, Dropdown, Space, theme, Button } from 'antd'
import StickyBox from 'react-sticky-box'
import { SyncOutlined, FireOutlined, DownOutlined } from '@ant-design/icons'
import MyErrorBoundary from '@stateful'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { useProTabContext } from '@src/components/hooks/proTabsContext'
import Loading from '@src/components/stateless/Loading'
import Fullscreen from '../fullscreen'

const ProTabs = (props) => {
  const { activeKey, setActiveKey, panes, setPanes, removeTab } = useProTabContext()
  const [isReload, setIsReload] = useState(false)
  const pathRef = useRef('')

  const navigate = useNavigate()
  const { t } = useTranslation()
  const { panesItem, tabActiveKey } = props
  const { pathname, search } = useLocation()
  const fullPath = pathname + search

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const renderTabBar = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} style={{ zIndex: 10 }}>
      <DefaultTabBar key={nanoid()} {...props} className="pro-tabs" style={{ background: colorBgContainer }} />
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
      panes[index].path = newPath
      setPanes(panes)
      return
    }
    setPanes([...panes, panesItem])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, tabActiveKey])

  const onChange = (key) => {
    setActiveKey(key)
  }

  // tab点击
  const onTabClick = (targetKey) => {
    const { path } = panes.filter((item) => item.key === targetKey)[0]
    navigate(path)
  }

  const onTabScroll = ({ direction }) => {
    console.log('direction', direction)
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
      navigate('/')
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
      }}
      activeKey={activeKey}
      destroyInactiveTabPane={false}
      tabBarExtraContent={{
        left: (
          <Space align="center" size={30} style={{ margin: '0 25px' }}>
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
          <>
            {pane.key === fullPath && pane.key !== '/404' && (
              <SyncOutlined style={{ padding: '0 5px' }} onClick={refreshTab} title="刷新" spin={isReload} />
            )}
            {pane.i18nKey ? t(pane.i18nKey) : pane.title}
          </>
        ),
        key: pane.key,
        closable: pane.closable,
        forceRender: true,
        children: (
          <MyErrorBoundary fixError={fixError}>
            <div className="layout-tabpanel">
              {isReload && pane.key === fullPath && pane.key !== '/404' ? (
                <Loading tip="刷新中..." />
              ) : (
                <>{pane.content}</>
              )}
            </div>
          </MyErrorBoundary>
        ),
      }))}
    />
  )
}

export default ProTabs
