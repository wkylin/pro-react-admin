import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
  FireOutlined,
  GlobalOutlined,
} from '@ant-design/icons'

import styles from './index.module.less'

const pathSubmenu = {
  '/home': ['home'],
  '/coupons/add': ['/sub-act', '/sub-coupons'],
  '/coupons/edit': ['/sub-act', '/sub-coupons'],
  '/product': ['/sub-act', '/sub-coupons'],
}

const ProSecNav = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const redirectTo = (path) => {
    navigate(path)
  }

  const [selectedKeys, setSelectedKeys] = useState(['home'])

  // 当前路由对应的 sub menu key
  const [openKeys, setOpenKeys] = useState(['home'])

  // 提取放在redux中, tab 切换时改成 false
  const [isOpenChange, setIsOpenChange] = useState(false)

  // NOT READY FOR PRIME TIME
  // submenu keys of first level
  const [rootSubmenuKeys] = useState(['/sub-act', '/sub-list', '/sub-error'])

  useEffect(() => {
    const selectedPathKey = pathname
    setSelectedKeys([selectedPathKey])
    setOpenKeys(isOpenChange ? openKeys : pathSubmenu[pathname] ? pathSubmenu[pathname] : openKeys)
    // setOpenKeys(openKeys)
  }, [pathname, openKeys, isOpenChange])

  // const onItemClick = ({ key }) => {
  //   redirectTo(key)
  // }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setIsOpenChange(true)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onSelect = ({ key }) => {
    redirectTo(key)
    setIsOpenChange(false)
  }

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        // theme="dark"
        className={styles.menu}
        onOpenChange={onOpenChange}
        // onClick={onItemClick}
        onSelect={onSelect}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="/demo" icon={<GlobalOutlined />}>
          Demo
        </Menu.Item>
        <Menu.SubMenu key="/sub-act" icon={<HeatMapOutlined />} title="技术栈">
          <Menu.SubMenu key="/sub-coupons" icon={<FireOutlined />} title="前端技术栈">
            <Menu.Item key="/coupons/add">Vue</Menu.Item>
            <Menu.Item key="/coupons/edit">Angular</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/product" icon={<DeploymentUnitOutlined />}>
            后端技术栈
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="/sub-list" icon={<ApartmentOutlined />} title="构建工具">
          <Menu.Item key="/coupons/list">Webpack</Menu.Item>
          <Menu.Item key="/order/list">Vite</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="/sub-error" icon={<QuestionCircleOutlined />} title="Error">
          <Menu.Item key="/error">ErrorBoundary</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  )
}

export default ProSecNav
