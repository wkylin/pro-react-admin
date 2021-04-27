import React from 'react'
import { Menu } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const PrimaryNav = () => {
  const history = useHistory()
  const redirectTo = (path) => {
    history.push(path)
  }
  return (
    <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
      <Menu.Item key="mail" icon={<CodeOutlined />} onClick={() => redirectTo('/basis')}>
        活动组件库
      </Menu.Item>
      {/* <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Sub Menu">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1" onClick={() => redirectTo('/signin')}>
            Option 1
          </Menu.Item>
          <Menu.Item key="setting:2" onClick={() => redirectTo('/signup')}>
            Option 2
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu> */}
    </Menu>
  )
}

export default PrimaryNav
