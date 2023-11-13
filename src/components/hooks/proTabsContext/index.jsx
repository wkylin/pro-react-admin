import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '@src/pages/home'

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
    i18nKey: 'home',
    key: '/',
    content: <Home />,
    closable: false,
    path: '/',
  },
]

const ProTabContext = createContext(defaultValue)
const useProTabContext = () => {
  const context = useContext(ProTabContext)
  if (context === undefined) {
    throw new Error('useValue must be used within a ValueProvider')
  }
  return context
}

const ProTabProvider = ({ children }) => {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState(initialPanes)
  const navigate = useNavigate()

  const removeTab = useCallback(
    (targetKey, callbackFun = () => {}) => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeKey, panes]
  )

  const providerValue = useMemo(
    () => ({
      activeKey,
      setActiveKey,
      panes,
      setPanes,
      removeTab,
    }),
    [activeKey, setActiveKey, panes, setPanes, removeTab]
  )

  return <ProTabContext.Provider value={providerValue}>{children}</ProTabContext.Provider>
}

export { ProTabProvider, useProTabContext }
