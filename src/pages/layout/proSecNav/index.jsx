import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
  FireOutlined,
  GlobalOutlined,
  QrcodeOutlined,
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

  const { t } = useTranslation()
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
    setOpenKeys(isOpenChange ? openKeys : pathSubmenu[pathname] ?? openKeys)
  }, [pathname, openKeys, isOpenChange])

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

  const menuItems = [
    { label: t('home'), key: '/', icon: <HomeOutlined /> },
    { label: t('demo'), key: '/demo', icon: <GlobalOutlined /> },
    { label: 'Parallax', key: '/parallax', icon: <FireOutlined /> },
    { label: 'QrGenerate', key: '/qrcode', icon: <QrcodeOutlined /> },
    { label: 'PrismRender', key: '/prism', icon: <FireOutlined /> },
    { label: 'ReactTilt', key: '/tilt', icon: <QrcodeOutlined /> },
    { label: 'Music', key: '/music', icon: <FireOutlined /> },
    { label: 'Crypto', key: '/crypto', icon: <QrcodeOutlined /> },
    { label: 'Video', key: '/video', icon: <FireOutlined /> },
    { label: 'Three', key: '/three', icon: <QrcodeOutlined /> },
    { label: 'Echarts', key: '/echarts', icon: <FireOutlined /> },
    { label: 'ChatGPT', key: '/markmap', icon: <QrcodeOutlined /> },
    { label: 'Mermaid', key: '/mermaid', icon: <FireOutlined /> },
    {
      label: '技术栈',
      key: '/sub-act',
      icon: <HeatMapOutlined />,
      children: [
        {
          label: '前端技术栈',
          key: '/sub-coupons',
          icon: <FireOutlined />,
          children: [
            { label: 'Vue', key: '/coupons/add' },
            { label: 'Angular', key: '/coupons/edit' },
          ],
        },
        { label: '后端技术栈', key: '/product', icon: <DeploymentUnitOutlined /> },
      ],
    },
    {
      label: '构建工具',
      key: '/sub-list',
      icon: <ApartmentOutlined />,
      children: [
        { label: 'Webpack', key: '/coupons/list' },
        { label: 'Vite', key: '/order/list' },
      ],
    },
    {
      label: 'Error',
      key: '/sub-error',
      icon: <QuestionCircleOutlined />,
      children: [{ label: 'ErrorBoundary', key: '/error' }],
    },
  ]

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      theme="light"
      className={styles.menu}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      items={menuItems}
    />
  )
}

export default ProSecNav
