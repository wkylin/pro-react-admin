import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Home from '@pages/home'
import Demo from '@pages/demo'
import CouponsAdd from '@pages/coupons/add'
import CouponsEdit from '@pages/coupons/edit'
import Product from '@pages/product'
import Exception403 from '@stateless/Exception/exception403'

import { getKeyName } from '@utils/publicFn'
// import { Tabs, Button } from 'antd'
import { Tabs } from 'antd'

// import styles from './index.module.less'

const initialPanes = [
  {
    title: '首页',
    key: '/',
    content: Home,
    closable: false,
    path: '/'
  },
  {
    title: 'Demo',
    key: '/demo',
    content: Demo,
    closable: true,
    path: 'demo'
  },
  {
    title: '新建',
    key: '/coupons/add',
    content: CouponsAdd,
    closable: true,
    path: 'add'
  },
  {
    title: '编辑',
    key: '/coupons/edit',
    content: CouponsEdit,
    closable: true,
    path: 'edit'
  },
  {
    title: '商品调价单',
    key: '/product',
    content: Product,
    closable: true,
    path: 'product'
  },
  {
    title: 'No Match',
    key: '/403',
    content: Exception403,
    closable: true,
    path: '403'
  }
]

const ProTabs = (props) => {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState(initialPanes)
  // const [isReload, setIsReload] = useState(false)
  // const [selectedPanel, setSelectedPanel] = useState({})
  // const pathRef = useRef('')

  const navigate = useNavigate()

  const { defaultActiveKey } = props
  const { pathname } = useLocation()

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

  return (
    <>
      <Tabs
        hideAdd
        type='editable-card'
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
        onTabClick={onTabClick}
        onTabScroll={onTabScroll}
        onEdit={onEdit}
      >
        {panes.map((pane) => (
          <Tabs.TabPane forceRender tab={pane.title} key={pane.key} closable={pane.closable}>
            <pane.content path={pane.path} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  )
}

export default ProTabs
