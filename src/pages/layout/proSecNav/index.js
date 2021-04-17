import React from 'react'
import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import {
  SettingOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons'

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
      <Menu.SubMenu key="sub2" icon={<UnorderedListOutlined />} title="活动列表">
        <Menu.Item key="5">所有活动</Menu.Item>
        <Menu.Item key="6">送券活动</Menu.Item>
        <Menu.Item key="7">商品调价活动</Menu.Item>
        <Menu.Item key="8">订单立减活动</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub3" icon={<FieldTimeOutlined />} title="促销日历">
        <Menu.Item key="9">当前生效活动</Menu.Item>
        <Menu.Item key="10">所有促销活动</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub4" icon={<SettingOutlined />} title="限购管理">
        <Menu.Item key="11">商品限购管理</Menu.Item>
        <Menu.Item key="12">活动限购管理</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default ProSecNav
