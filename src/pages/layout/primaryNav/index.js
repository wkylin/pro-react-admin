import React from 'react'
import { Menu } from 'antd'
import { CodeOutlined, SettingOutlined } from '@ant-design/icons'
import { useHistory, useRouteMatch } from 'react-router-dom'

const PrimaryNav = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const redirectTo = (path) => {
    history.push(path)
  }
  return (
    <Menu mode="horizontal" defaultSelectedKeys={url === '/basis' ? ['mail'] : ['SubMenu']}>
      <Menu.Item key="mail" icon={<CodeOutlined />} onClick={() => redirectTo('/basis')}>
        基础组件库
      </Menu.Item>
      <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Layout组件库">
        <Menu.ItemGroup title="Layout Component">
          <Menu.Item key="setting:1" onClick={() => redirectTo('/layout')}>
            Layout首页
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  )
}

export default PrimaryNav
