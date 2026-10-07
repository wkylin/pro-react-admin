import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import PropTypes from 'prop-types'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import Home from '@src/pages/home'

type Pane = {
  title: ReactNode
  i18nKey?: string
  key: string
  content: ReactNode
  closable: boolean
  path?: string
}

type ProTabContextValue = {
  activeKey: string
  setActiveKey: Dispatch<SetStateAction<string>>
  panes: Pane[]
  setPanes: Dispatch<SetStateAction<Pane[]>>
  removeTab: (targetKey: string, callbackFun?: () => void) => void
}

type ProTabProviderProps = {
  children?: ReactNode
}

const ProTabContext = createContext<ProTabContextValue | undefined>(undefined)

const initialPanes: Pane[] = [
  {
    title: '首页',
    i18nKey: 'home',
    key: '/',
    content: <Home />,
    closable: false,
    path: '/',
  },
]

const useProTabContext = (): ProTabContextValue => {
  const context = useContext(ProTabContext)
  if (context === undefined) {
    throw new Error('useValue must be used within a ValueProvider')
  }
  return context
}

const ProTabProvider = ({ children }: ProTabProviderProps) => {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState(initialPanes)
  const { redirectTo } = useSafeNavigate()

  const removeTab = useCallback(
    (targetKey: string, callbackFun: () => void = () => {}) => {
      const delIndex = panes.findIndex((item) => item.key === targetKey)
      const filterPanes = panes.filter((pane) => pane.key !== targetKey)
      // 删除非当前/当前tab
      if (targetKey !== activeKey) {
        setPanes(filterPanes)
      } else {
        const nextPath = filterPanes[delIndex - 1].key
        redirectTo(nextPath)
        setActiveKey(nextPath)
        setPanes(filterPanes)
      }
      callbackFun()
    },

    [activeKey, panes, redirectTo]
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

ProTabProvider.propTypes = {
  children: PropTypes.node,
}

export { ProTabProvider, useProTabContext }
