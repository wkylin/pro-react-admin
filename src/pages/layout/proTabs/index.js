import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Tabs, Menu, Dropdown, Alert, Button } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import { SyncOutlined } from '@ant-design/icons'
import Home from '@pages/home'
import Demo from '@pages/demo'
import CouponsAdd from '@pages/coupons/add'
import CouponsEdit from '@pages/coupons/edit'
import Product from '@pages/product'
import Exception403 from '@stateless/Exception/exception403'

import { getKeyName } from '@utils/publicFn'

import styles from './index.module.less'

const initialPanes = [
  {
    title: '首页',
    key: '/',
    content: Home,
    closable: false,
    path: '/',
  },
  {
    title: 'Demo',
    key: '/demo',
    content: Demo,
    closable: true,
    path: 'demo',
  },
  {
    title: '新建',
    key: '/coupons/add',
    content: CouponsAdd,
    closable: true,
    path: 'add',
  },
  {
    title: '编辑',
    key: '/coupons/edit',
    content: CouponsEdit,
    closable: true,
    path: 'edit',
  },
  {
    title: '商品调价单',
    key: '/product',
    content: Product,
    closable: true,
    path: 'product',
  },
  {
    title: 'No Match',
    key: '/403',
    content: Exception403,
    closable: true,
    path: '403',
  },
]

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky topOffset={40} relative={true}>
    {({ style }) => <DefaultTabBar {...props} style={{ ...style }} />}
  </Sticky>
)

const ProTabs = (props) => {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState(initialPanes)
  const [isReload, setIsReload] = useState(false)
  const [selectedPanel, setSelectedPanel] = useState({})
  // const pathRef = useRef('')

  const navigate = useNavigate()

  const { defaultActiveKey } = props
  const { pathname, search } = useLocation()
  const fullPath = pathname + search

  // 从本地存储中恢复已打开的tab列表
  const resetTabs = useCallback(() => {
    const { tabKey } = getKeyName(pathname)
    setPanes(initialPanes)
    setActiveKey(tabKey)
  }, [pathname])

  // 初始化页面
  useEffect(() => {
    resetTabs()
  }, [resetTabs])

  const onChange = (activeKey) => {
    setActiveKey(activeKey)
    navigate(activeKey)
  }

  const onTabClick = (key) => {
    console.log('key', key)
  }

  const onTabScroll = ({ direction }) => {
    console.log('direction', direction)
  }

  const onEdit = (targetKey, action) => {
    action === 'remove' && remove(targetKey)
  }

  const remove = (targetKey) => {
    const delIndex = panes.findIndex((item) => item.key === targetKey)
    const filterPanes = panes.filter((pane) => pane.key !== targetKey)
    // 删除非当前/当前tab
    if (targetKey !== activeKey) {
      setPanes(filterPanes)
      // storeTabs(panes) // 改变redux中数据
    } else {
      const nextPath = filterPanes[delIndex - 1].key
      navigate(nextPath)
      setActiveKey(nextPath)
      setPanes(filterPanes)
    }
  }

  const isDisabled = () => selectedPanel.key === '/'
  // 阻止右键默认事件
  const preventDefault = (event, panel) => {
    event.preventDefault()
    setSelectedPanel(panel)
  }

  // 刷新当前 tab
  const refreshTab = () => {
    setIsReload(true)
    setTimeout(() => {
      setIsReload(false)
    }, 1000)

    // setStoreData('SET_RELOADPATH', pathname + search)
    // setTimeout(() => {
    //   setStoreData('SET_RELOADPATH', 'null')
    // }, 500)
  }

  // 关闭其他或关闭所有
  const removeAll = async (isRemoveAll) => {
    const { key } = selectedPanel
    navigate(isRemoveAll ? '/' : key)

    const homePanel = [
      {
        title: '首页',
        key: '/',
        content: Home,
        closable: false,
        path: '/',
      },
    ]

    const nowPanes = key !== '/' && !isRemoveAll ? [...homePanel, selectedPanel] : homePanel
    console.log('nowPanes', nowPanes)
    setPanes(nowPanes)
    navigate(nowPanes[0].key)
    setActiveKey(isRemoveAll ? '/' : key)
    // storeTabs(nowPanes)
  }

  // tab 右键菜单
  const tabRightMenu = (
    <Menu>
      <Menu.Item key="1" onClick={refreshTab} disabled={selectedPanel.key !== fullPath || selectedPanel.key === '/403'}>
        刷新
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          remove(selectedPanel.key)
        }}
        disabled={isDisabled()}
      >
        关闭
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          removeAll()
        }}
      >
        关闭其他
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={(e) => {
          e.domEvent.stopPropagation()
          removeAll(true)
        }}
        disabled={isDisabled()}
      >
        全部关闭
      </Menu.Item>
    </Menu>
  )

  return (
    <StickyContainer className={styles.container} id="container">
      {`selectedPanel: ${JSON.stringify(selectedPanel, null, 2)}`}
      <Tabs
        hideAdd
        type="editable-card"
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
        onTabClick={onTabClick}
        onTabScroll={onTabScroll}
        onEdit={onEdit}
        renderTabBar={renderTabBar}
        tabBarGutter={0}
        tabBarStyle={{
          zIndex: 2,
        }}
        className={styles.proTabs}
        tabBarExtraContent={{
          left: <Button type="link">Pro React</Button>,
        }}
      >
        {panes.map((pane) => (
          <Tabs.TabPane
            forceRender
            key={pane.key}
            closable={pane.closable}
            tab={
              <Dropdown
                overlay={tabRightMenu}
                placement="bottomLeft"
                trigger={['contextMenu']}
                getPopupContainer={(node) => node.parentNode}
              >
                <span onContextMenu={(e) => preventDefault(e, pane)}>
                  {isReload && pane.key === fullPath && pane.key !== '/403' && (
                    <SyncOutlined title="刷新" spin={isReload} />
                  )}
                  {pane.title}
                </span>
              </Dropdown>
            }
          >
            {isReload && pane.key === fullPath && pane.key !== '/403' ? (
              <Alert message="刷新中..." type="info" />
            ) : (
              <pane.content path={pane.path} />
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </StickyContainer>
  )
}

export default ProTabs
