import React from 'react'
import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const ProSecNav = () => {
  const history = useHistory()
  const redirectTo = (path) => {
    history.push(path)
  }
  return (
    // <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} theme="dark" className={styles.menu}>
    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} theme="dark" className={styles.menu}>
      <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="新建活动单">
        <Menu.Item key="1" onClick={() => redirectTo('/layout/coupons/home')}>
          送券活动单
        </Menu.Item>
        <Menu.Item key="2" onClick={() => redirectTo('/layout/coupons/detail')}>
          商品调价单
        </Menu.Item>
        <Menu.Item key="3" onClick={() => redirectTo('/layout/coupons/add')}>
          订单立减单
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default ProSecNav
