import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Home from '@pages/home'
import Demo from '@pages/demo'
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
    path: '/',
  },
]

const ProTabs = (props) => {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState(initialPanes)
  // const [isReload, setIsReload] = useState(false)
  // const [selectedPanel, setSelectedPanel] = useState({})
  // const pathRef = useRef('')

  const { defaultActiveKey, panesItem, tabActiveKey } = props
  const { pathname, search } = useLocation()
  // const fullPath = pathname + search

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
  }

  // const onEdit = (targetKey, action) => {
  //   action === 'remove' && remove(targetKey)
  // }

  // const add = () => {
  //   newTabIndex.current++
  //   const activeKey = `${newTabIndex.current++}`
  //   panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey })
  //   setPanes(panes)
  //   setActiveKey(activeKey)
  // }

  // const remove = (targetKey) => {
  //   let lastIndex
  //   panes.forEach((pane, i) => {
  //     if (pane.key === targetKey) {
  //       lastIndex = i - 1
  //     }
  //   })
  //   const filterPanes = panes.filter((pane) => pane.key !== targetKey)
  //   if (filterPanes.length && activeKey === targetKey) {
  //     if (lastIndex >= 0) {
  //       activeKey = filterPanes[lastIndex].key
  //     } else {
  //       activeKey = filterPanes[0].key
  //     }
  //   }
  //   setActiveKey(activeKey)
  //   setPanes(filterPanes)
  // }

  return (
    <>
      {/* <Button onClick={add}>ADD</Button> */}
      {`activeKey: ${activeKey}`}
      <br />
      <Tabs hideAdd type="editable-card" activeKey={activeKey} defaultActiveKey={defaultActiveKey} onChange={onChange}>
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
