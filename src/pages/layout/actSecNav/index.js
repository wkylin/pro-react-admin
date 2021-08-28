import React from 'react'
import { Menu } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

import styles from './index.module.less'
const selectedPath = {
  '/basis/deduct': '21',
  '/basis/info': '31',
  '/basis/commodity': '41',
}

const ActSecNav = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const redirectTo = (path) => {
    history.push(path)
  }

  const selectedPathKey = selectedPath[Object.keys(selectedPath).find((item) => pathname.indexOf(item) > -1)]

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[selectedPathKey]}
      defaultOpenKeys={['sub1']}
      theme="dark"
      className={styles.menu}
    >
      <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="基础组件库">
        <Menu.Item key="21" onClick={() => redirectTo('/basis/deduct')}>
          促销扣款
        </Menu.Item>
        <Menu.Item key="31" onClick={() => redirectTo('/basis/info')}>
          基本信息
        </Menu.Item>
        <Menu.Item key="41" onClick={() => redirectTo('/basis/commodity')}>
          商品范围
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default ActSecNav
