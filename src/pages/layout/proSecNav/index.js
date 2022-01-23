import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { HomeOutlined, DeploymentUnitOutlined, HeatMapOutlined, OrderedListOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const pathSubmenu = {
  '/home': ['home'],
  '/coupons/add': ['/sub-act', '/sub-coupons'],
  '/coupons/edit': ['/sub-act', '/sub-coupons'],
  '/product': ['/sub-act', '/sub-coupons']
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

  // submenu keys of first level
  const [rootSubmenuKeys] = useState(['/sub-act', '/sub-list'])

  useEffect(() => {
    const selectedPathKey = pathname
    setSelectedKeys([selectedPathKey])
    setOpenKeys(isOpenChange ? openKeys : pathSubmenu[pathname] ? pathSubmenu[pathname] : openKeys)
    // setOpenKeys(openKeys)
  }, [pathname, openKeys, isOpenChange])

  const onItemClick = ({ item, key, keyPath }) => {
    setIsOpenChange(false)

    redirectTo(key)
  }
  const onOpenChange = (keys) => {
    // setOpenKeys(keys)
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    console.log('keys', keys)
    console.log('latestOpenKey', latestOpenKey)

    setIsOpenChange(true)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <>
      <Menu
        mode='inline'
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        // theme="dark"
        className={styles.menu}
        onOpenChange={onOpenChange}
        onClick={onItemClick}
      >
        <Menu.Item key='/' icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key='/demo' icon={<DeploymentUnitOutlined />}>
          Demo
        </Menu.Item>
        <Menu.SubMenu key='/sub-act' icon={<HeatMapOutlined />} title='活动单'>
          <Menu.SubMenu key='/sub-coupons' icon={<DeploymentUnitOutlined />} title='送券活动单'>
            <Menu.Item key='/coupons/add'>新建</Menu.Item>
            <Menu.Item key='/coupons/edit'>编辑</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='/product' icon={<DeploymentUnitOutlined />}>
            商品调价单
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key='/sub-list' icon={<OrderedListOutlined />} title='促销列表'>
          <Menu.Item key='/coupons/list'>券列表</Menu.Item>
          <Menu.Item key='/order/list'>订单列表</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  )
}

export default ProSecNav
