/**
 * 权限管理示例页面
 * 展示如何使用权限系统
 */

import React, { useState, useEffect } from 'react'
import { Card, Button, Space, Tag, Table, App, Select, Divider, Typography } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { usePermission } from '../../hooks/usePermission'
import PermissionGuard from '../../components/auth/PermissionGuard'
import AuthButton from '../../components/auth/AuthButton'
import { permissionService } from '../../service/permissionService'
import { mockRoles, mockUserPermissions } from '../../mock/permission'

const { Title, Paragraph, Text } = Typography

const PermissionDemo = () => {
  const { message } = App.useApp()
  const { permissions, roles, routes, loading, refreshPermissions } = usePermission()
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('user_role') || 'user')

  // 切换角色（用于测试）
  const handleRoleChange = async (roleCode) => {
    setSelectedRole(roleCode)
    localStorage.setItem('user_role', roleCode)
    await permissionService.syncPermissions()
    await refreshPermissions()
    message.success(`已切换角色为: ${mockUserPermissions[roleCode]?.username || roleCode}`)
  }

  // 表格列定义
  const columns = [
    {
      title: '角色代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type={selectedRole === record.code ? 'primary' : 'default'}
          onClick={() => handleRoleChange(record.code)}
        >
          {selectedRole === record.code ? '当前角色' : '切换'}
        </Button>
      ),
    },
  ]

  return (
    <FixTabPanel title="权限系统示例">
      <Title level={2}>权限系统示例</Title>
      <Paragraph>这是一个权限系统的使用示例页面。你可以在这里查看当前用户的权限、角色和可访问的路由。</Paragraph>

      {/* 当前权限信息 */}
      <Card title="当前权限信息" style={{ marginBottom: '16px' }}>
        <Space orientation="vertical" style={{ width: '100%' }}>
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
            <Text strong>权限列表: </Text>
            <div style={{ marginTop: '8px' }}>
              {permissions.length > 0 ? (
                <Space wrap>
                  {permissions.map((permission) => (
                    <Tag key={permission} color="green">
                      {permission}
                    </Tag>
                  ))}
                </Space>
              ) : (
                <Text type="secondary">暂无权限</Text>
              )}
            </div>
          </div>
          <Divider />
          <div>
            <Text strong>可访问路由: </Text>
            <div style={{ marginTop: '8px' }}>
              {routes.length > 0 ? (
                <Space wrap>
                  {routes.map((route) => (
                    <Tag key={route} color="orange">
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
        <Table columns={columns} dataSource={mockRoles} rowKey="id" pagination={false} />
      </Card>

      {/* 权限组件示例 */}
      <Card title="权限组件示例" style={{ marginBottom: '16px' }}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <Title level={4}>1. PermissionGuard 组件</Title>
          <Paragraph>
            根据权限控制内容的显示/隐藏。当前用户需要拥有 <Text code>user:read</Text> 权限才能看到下面的内容：
          </Paragraph>

          <PermissionGuard permission="user:read" fallback={<Text type="danger">您没有 user:read 权限</Text>}>
            <Card size="small" style={{ background: '#f0f9ff' }}>
              <Text>✅ 您有 user:read 权限，所以可以看到这个内容</Text>
            </Card>
          </PermissionGuard>

          <PermissionGuard permission="user:create" fallback={<Text type="danger">您没有 user:create 权限</Text>}>
            <Card size="small" style={{ background: '#f0f9ff' }}>
              <Text>✅ 您有 user:create 权限，所以可以看到这个内容</Text>
            </Card>
          </PermissionGuard>

          <Divider />

          <Title level={4}>2. AuthButton 组件</Title>
          <Paragraph>根据权限控制按钮的显示/隐藏或禁用状态：</Paragraph>

          <Space wrap>
            <AuthButton type="primary" permission="user:create" onClick={() => message.success('创建用户')}>
              创建用户（需 user:create 权限）
            </AuthButton>

            <AuthButton permission="user:update" onClick={() => message.success('更新用户')}>
              更新用户（需 user:update 权限）
            </AuthButton>

            <AuthButton permission="user:delete" onClick={() => message.success('删除用户')}>
              删除用户（需 user:delete 权限）
            </AuthButton>

            <AuthButton permission="role:*" onClick={() => message.success('管理角色')}>
              管理角色（需 role:* 权限）
            </AuthButton>
          </Space>

          <Divider />

          <Title level={4}>3. 多个权限检查</Title>
          <Paragraph>检查多个权限（全部需要或任一即可）：</Paragraph>

          <PermissionGuard
            permissions={['user:read', 'user:update']}
            requireAll={true}
            fallback={<Text type="danger">您需要同时拥有 user:read 和 user:update 权限</Text>}
          >
            <Card size="small" style={{ background: '#f0f9ff' }}>
              <Text>✅ 您同时拥有 user:read 和 user:update 权限</Text>
            </Card>
          </PermissionGuard>

          <PermissionGuard
            permissions={['user:read', 'role:read']}
            requireAll={false}
            fallback={<Text type="danger">您需要拥有 user:read 或 role:read 权限之一</Text>}
          >
            <Card size="small" style={{ background: '#f0f9ff' }}>
              <Text>✅ 您拥有 user:read 或 role:read 权限之一</Text>
            </Card>
          </PermissionGuard>

          <Divider />

          <Title level={4}>4. 角色检查</Title>
          <Paragraph>根据角色控制内容的显示：</Paragraph>

          <PermissionGuard role="admin" fallback={<Text type="danger">您不是管理员</Text>}>
            <Card size="small" style={{ background: '#f0f9ff' }}>
              <Text>✅ 您是管理员，可以看到这个内容</Text>
            </Card>
          </PermissionGuard>

          <PermissionGuard
            roles={['admin', 'super_admin']}
            requireAllRoles={false}
            fallback={<Text type="danger">您不是管理员或超级管理员</Text>}
          >
            <Card size="small" style={{ background: '#f0f9ff' }}>
              <Text>✅ 您是管理员或超级管理员</Text>
            </Card>
          </PermissionGuard>
        </Space>
      </Card>

      {/* 刷新权限按钮 */}
      <Card>
        <Button type="primary" onClick={refreshPermissions} loading={loading}>
          刷新权限
        </Button>
        <Paragraph style={{ marginTop: '16px' }}>
          <Text type="secondary">提示：切换角色后，权限信息会自动更新。你也可以手动刷新权限信息。</Text>
        </Paragraph>
      </Card>
    </FixTabPanel>
  )
}

export default PermissionDemo
