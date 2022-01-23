import React from 'react'
import { Menu } from 'antd'
// import { useNavigate, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, DeploymentUnitOutlined, HeatMapOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const ProSecNav = () => {
  const navigate = useNavigate()
  // const { pathname } = useLocation()
  const redirectTo = (path) => {
    navigate(path)
  }

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['home']}
      defaultOpenKeys={['act']}
      // theme="dark"
      className={styles.menu}
    >
      <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => redirectTo('/')}>
        Home
      </Menu.Item>
      <Menu.SubMenu key="demo" icon={<HeatMapOutlined />} title="Demo">
        <Menu.Item key="sub-demo" icon={<DeploymentUnitOutlined />} onClick={() => redirectTo('demo')}>
          Demo
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="act" icon={<HeatMapOutlined />} title="活动单">
        <Menu.SubMenu key="act-coupons" icon={<DeploymentUnitOutlined />} title="送券活动单">
          <Menu.Item key="coupons-new" onClick={() => redirectTo('coupons/add')}>
            新建
          </Menu.Item>
          <Menu.Item key="coupons-edit" onClick={() => redirectTo('coupons/edit?id=1')}>
            编辑
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="act-product" icon={<DeploymentUnitOutlined />} onClick={() => redirectTo('product')}>
          商品调价单
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default ProSecNav
