import React, { useState } from 'react'
import { Card, Button, Space, Tag, Table, App, Select, Divider, Typography, Alert } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { usePermission } from '../../hooks/usePermission'
import PermissionGuard from '../../components/auth/PermissionGuard'
import AuthButton from '../../components/auth/AuthButton'
import { permissionService } from '../../service/permissionService'
import { mockRoles, mockUserPermissions } from '../../mock/permission'

const { Title, Paragraph, Text } = Typography

const PermissionDemo = () => {
  const { message } = App.useApp()
  const { permissions, roles, routes, refreshPermissions } = usePermission()
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('user_role') || 'user')

  const handleRoleChange = async (roleCode) => {
    setSelectedRole(roleCode)
    localStorage.setItem('user_role', roleCode)
    await permissionService.syncPermissions()
    await refreshPermissions()
    message.success(`已切换角色为: ${mockUserPermissions[roleCode]?.username || roleCode}`)
  }

  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Tag color="blue">{text}</Tag>
          {record.code === selectedRole && <Tag color="green">当前</Tag>}
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '可访问路由数',
      key: 'routes',
      render: (_, record) => <Tag color="orange">{mockUserPermissions[record.code]?.routes.length || 0} 个</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type={selectedRole === record.code ? 'primary' : 'default'}
          size="small"
          onClick={() => handleRoleChange(record.code)}
          disabled={selectedRole === record.code}
        >
          {selectedRole === record.code ? '当前角色' : '切换'}
        </Button>
      ),
    },
  ]

  return (
    <FixTabPanel title="权限系统示例">
      <Title level={2}>权限系统示例</Title>
      <Paragraph>系统为四个角色随机分配了路由权限，您可以切换不同角色查看权限差异。</Paragraph>

      <Alert
        message="权限说明"
        description={
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>超级管理员：拥有所有路由访问权限（100%）</li>
            <li>管理员：随机分配约 75% 的路由</li>
            <li>业务员：随机分配约 50% 的路由</li>
            <li>普通用户：随机分配约 25% 的路由</li>
          </ul>
        }
        type="info"
        showIcon
        style={{ marginBottom: '16px' }}
      />

      {/* 当前权限信息 */}
      <Card title="当前权限信息" style={{ marginBottom: '16px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>当前角色: </Text>
            <Select
              value={selectedRole}
              style={{ width: 200 }}
              onChange={handleRoleChange}
              options={Object.keys(mockUserPermissions).map((key) => ({
                label: mockUserPermissions[key].username,
                value: key,
              }))}
            />
          </div>
          <Divider />
          <div>
            <Text strong>角色列表: </Text>
            <Space wrap>
              {roles.map((role) => (
                <Tag key={role} color="blue">
                  {role}
                </Tag>
              ))}
            </Space>
          </div>
          <Divider />
          <div>
            <Text strong>可访问路由 ({routes.length} 个): </Text>
            <div style={{ marginTop: '8px' }}>
              {routes.length > 0 ? (
                <Space wrap>
                  {routes.map((route) => (
                    <Tag key={route} color="green">
                      {route}
                    </Tag>
                  ))}
                </Space>
              ) : (
                <Text type="secondary">无可用路由</Text>
              )}
            </div>
          </div>
        </Space>
      </Card>

      {/* 角色列表 */}
      <Card title="角色列表" style={{ marginBottom: '16px' }}>
        <Table columns={columns} dataSource={mockRoles} rowKey="code" pagination={false} />
      </Card>

      {/* 权限组件示例 */}
      <Card title="权限组件示例">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4}>PermissionGuard 组件</Title>
          <PermissionGuard
            permission="admin:read"
            fallback={<Alert message="您没有管理员权限" type="warning" showIcon />}
          >
            <Alert message="✅ 您有管理员权限" type="success" showIcon />
          </PermissionGuard>

          <Divider />

          <Title level={4}>AuthButton 组件</Title>
          <Space>
            <AuthButton permission="user:create" type="primary">
              创建用户（需要 user:create 权限）
            </AuthButton>
            <AuthButton permission="user:delete" danger>
              删除用户（需要 user:delete 权限）
            </AuthButton>
          </Space>
        </Space>
      </Card>
    </FixTabPanel>
  )
}

export default PermissionDemo
