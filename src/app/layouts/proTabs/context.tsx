import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import PropTypes from 'prop-types'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import { usePermission } from '@platform/auth/hooks/usePermission'
import { canAccessPath } from '@platform/auth/model/policy'

export type Pane = {
  generation?: number
  title: ReactNode
  i18nKey?: string
  key: string
  routeId?: string
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
    // The router supplies content when this tab is first visited.
    content: null,
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
  const { current, loading } = usePermission()
  // Remove cached protected pages when grants change while another page remains open.
  useEffect(() => {
    if (loading && !current) return
    setPanes((existing) => {
      const permitted = existing.filter(
        (pane) => current && canAccessPath(current, (pane.path ?? pane.key).split('?')[0])
      )
      return permitted.length === existing.length ? existing : permitted
    })
  }, [current, loading])

  const removeTab = useCallback(
    (targetKey: string, callbackFun: () => void = () => {}) => {
      const delIndex = panes.findIndex((item) => item.key === targetKey)
      const filterPanes = panes.filter((pane) => pane.key !== targetKey)
      // 删除非当前/当前tab
      if (targetKey !== activeKey) {
        setPanes(filterPanes)
      } else {
        const nextPane = filterPanes[delIndex - 1] || filterPanes[0]
        if (nextPane) {
          const nextPath = nextPane.path || nextPane.key
          redirectTo(nextPath)
          setActiveKey(nextPane.key)
        }
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
