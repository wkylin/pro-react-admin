import AnimatedIcon from '@stateless/AnimatedIcon'
import {
  useState,
  useEffect,
  useRef,
  Suspense,
  useTransition,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { Tabs, Dropdown, Space, theme, Button, type TabsProps } from 'antd'
import StickyBox from 'react-sticky-box'
import { SyncOutlined, FireOutlined, DownOutlined } from '@ant-design/icons'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useTranslation } from 'react-i18next'
import { useProTabContext } from '@app-hooks/proTabsContext'
import Loading from '@src/components/stateless/Loading'
import Fullscreen from '../fullscreen'
import KeepAlive from '@src/components/KeepAlive'

type Pane = {
  title: ReactNode
  i18nKey?: string
  key: string
  content: ReactNode
  closable: boolean
  path?: string
}

type ProTabsProps = {
  panesItem: Pane
  tabActiveKey: string
}

type ProTabContextValue = {
  activeKey: string
  setActiveKey: Dispatch<SetStateAction<string>>
  panes: Pane[]
  setPanes: Dispatch<SetStateAction<Pane[]>>
  removeTab: (targetKey: string, callbackFun?: () => void) => void
}

const ProTabs = ({ panesItem, tabActiveKey }: ProTabsProps) => {
  const { activeKey, setActiveKey, panes, setPanes, removeTab } = useProTabContext() as ProTabContextValue
  const [isReload, setIsReload] = useState(false)
  const [, startTransition] = useTransition()
  const pathRef = useRef('')

  const { redirectTo } = useSafeNavigate()
  const { t } = useTranslation()
  const { pathname, search } = useLocation()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const renderTabBar: NonNullable<TabsProps['renderTabBar']> = (tabBarProps, DefaultTabBar) => (
    <StickyBox offsetTop={0} style={{ zIndex: 10 }}>
      <DefaultTabBar
        {...tabBarProps}
        className="pro-tabs"
        style={{ ...tabBarProps.style, backgroundColor: colorBgContainer }}
      />
    </StickyBox>
  )

  useEffect(() => {
    document.querySelector('#container')?.scrollTo({
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
  }, [pathname, tabActiveKey])

  const onChange: NonNullable<TabsProps['onChange']> = (key) => {
    startTransition(() => {
      setActiveKey(key)
    })
  }

  // tab点击
  const onTabClick: NonNullable<TabsProps['onTabClick']> = (targetKey) => {
    const pane = panes.filter((item) => item.key === targetKey)[0]
    const path = (pane && (pane.path || pane.key)) || targetKey
    startTransition(() => {
      redirectTo(path)
    })
  }

  const onTabScroll: NonNullable<TabsProps['onTabScroll']> = () => {}

  const onEdit: NonNullable<TabsProps['onEdit']> = (targetKey, action) => {
    if (action === 'remove' && typeof targetKey === 'string') removeTab(targetKey)
  }

  // 刷新当前 tab
  const refreshTab = () => {
    setIsReload(true)
    setTimeout(() => {
      setIsReload(false)
    }, 1000)
  }

  const onTabContextMenu = (rightMenuKey: 'all' | 'other') => {
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
  return (
    <Tabs
      hideAdd
      type="editable-card"
      animated={{ inkBar: true, tabPane: false }}
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
            <AnimatedIcon variant="spin" mode="hover">
              <FireOutlined style={{ color: '#eb2f96', fontSize: 16 }} />
            </AnimatedIcon>
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
                    if (key === 'all' || key === 'other') onTabContextMenu(key)
                  },
                }}
                trigger={['hover']}
              >
                <Button type="link">
                  More{' '}
                  <AnimatedIcon variant="spin" mode="hover">
                    <DownOutlined />
                  </AnimatedIcon>
                </Button>
              </Dropdown>
            ) : null}
          </>
        ),
      }}
      items={panes.map((pane) => ({
        label: (
          <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {pane.key === activeKey && pane.key !== '/404' && (
              <AnimatedIcon variant="spin" mode="hover">
                <SyncOutlined onClick={refreshTab} title="刷新" spin={isReload} />
              </AnimatedIcon>
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
              <KeepAlive id={pane.key} active={pane.key === activeKey} persistOnUnmount={pane.key === '/'}>
                <Suspense fallback={<Loading />}>
                  {isReload && pane.key === activeKey && pane.key !== '/404' ? <Loading /> : <>{pane.content}</>}
                </Suspense>
              </KeepAlive>
            </div>
          </ErrorBoundary>
        ),
      }))}
    />
  )
}

ProTabs.propTypes = {
  panesItem: PropTypes.object,
  tabActiveKey: PropTypes.string,
}

export default ProTabs
