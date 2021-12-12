import React from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

import styles from './index.module.less'
const selectedPath = {
  '/layout/coupons': '21',
  '/layout/product': '31',
  '/layout/order': '41',
}

const ProSecNav = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const redirectTo = (path) => {
    navigate(path)
  }

  const selectedPathKey = selectedPath[Object.keys(selectedPath).find((item) => pathname.indexOf(item) > -1)]

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[selectedPathKey]}
      defaultOpenKeys={['sub1']}
      // theme="dark"
      className={styles.menu}
    >
      <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="新建活动单">
        <Menu.Item key="21" onClick={() => redirectTo('layout/coupons')}>
          送券活动单
        </Menu.Item>
        <Menu.Item key="31" onClick={() => redirectTo('layout/product')}>
          商品调价单
        </Menu.Item>
        <Menu.Item key="41" onClick={() => redirectTo('layout/order')}>
          订单立减单
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default ProSecNav
