import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '@pages/home'

const defaultValue = {
  activeKey: '',
  setActiveKey: () => {},
  panes: [],
  setPanes: () => {},
  removeTab: () => {},
}

const initialPanes = [
  {
    title: '首页',
    key: '/',
    content: <Home />,
    closable: false,
    path: '/',
  },
]

const ProTabContext = createContext(defaultValue)
const useProTabContext = () => useContext(ProTabContext)

const ProTabProvider = ({ children }) => {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState(initialPanes)
  const navigate = useNavigate()

  const removeTab = (targetKey, callbackFun = () => {}) => {
    const delIndex = panes.findIndex((item) => item.key === targetKey)
    const filterPanes = panes.filter((pane) => pane.key !== targetKey)
    // 删除非当前/当前tab
    if (targetKey !== activeKey) {
      setPanes(filterPanes)
    } else {
      const nextPath = filterPanes[delIndex - 1].key
      navigate(nextPath)
      setActiveKey(nextPath)
      setPanes(filterPanes)
    }
    callbackFun()
  }

  return (
    <>
      <ProTabContext.Provider
        value={{
          activeKey,
          setActiveKey,
          panes,
          setPanes,
          removeTab,
        }}
      >
        {children}
      </ProTabContext.Provider>
    </>
  )
}

export { ProTabProvider, useProTabContext }
