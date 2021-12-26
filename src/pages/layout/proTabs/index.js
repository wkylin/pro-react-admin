import React, { useRef, useState } from 'react'
import { Tabs, Button } from 'antd'

const initialPanes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
]

const ProTabs = () => {
  const newTabIndex = useRef(4)
  const [panes, setPanes] = useState(() => initialPanes)
  let [activeKey, setActiveKey] = useState(initialPanes[0].key)

  const onChange = (activeKey) => {
    setActiveKey(activeKey)
  }

  const onEdit = (targetKey, action) => {
    action === 'remove' && remove(targetKey)
  }

  const add = () => {
    newTabIndex.current++
    const activeKey = `${newTabIndex.current++}`
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey })
    setPanes(panes)
    setActiveKey(activeKey)
  }

  const remove = (targetKey) => {
    let lastIndex
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const filterPanes = panes.filter((pane) => pane.key !== targetKey)
    if (filterPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = filterPanes[lastIndex].key
      } else {
        activeKey = filterPanes[0].key
      }
    }
    setActiveKey(activeKey)
    setPanes(filterPanes)
  }

  return (
    <>
      <Button onClick={add}>ADD</Button>
      <Tabs hideAdd type="editable-card" activeKey={activeKey} onChange={onChange} onEdit={onEdit}>
        {panes.map((pane) => (
          <Tabs.TabPane forceRender tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  )
}

export default ProTabs
