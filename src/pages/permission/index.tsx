import React from 'react'
import { Card, Button, Space, Tag, message, Divider, Row, Col } from 'antd'
import { usePermission } from '@app-hooks/usePermission'
import PermissionGuard from '@/components/auth/PermissionGuard'
import AuthButton from '@/components/auth/AuthButton'
import { permissionService } from '@src/service/permissionService'
import FixTabPanel from '@stateless/FixTabPanel'
const PermissionExample = () => {
  const {
    permissions,
    roles,
    routes,
    loading,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    hasRole,
    canAccessRoute,
    refreshPermissions,
  } = usePermission()

  // 角色切换（开发测试用）
  const switchRole = async (roleCode: string) => {
    localStorage.setItem('user_role', roleCode)
    await permissionService.syncPermissions()
    await refreshPermissions()
    message.success(`已切换到 ${roleCode} 角色`)
  }

  if (loading) {
    return <div>加载权限中...</div>
  }

  return (
    <FixTabPanel>
      <div style={{ padding: 24 }}>
        <h1>权限系统示例</h1>
        <p>系统为四个角色随机分配了路由权限，您可以切换不同角色查看权限差异。</p>

        <Divider />

        {/* 权限说明 */}
        <Card title="权限说明" style={{ marginBottom: 16 }}>
          <ul>
            <li>
              <strong>超级管理员</strong>：拥有所有路由访问权限（100%）
            </li>
            <li>
              <strong>管理员</strong>：随机分配约 75% 的路由
            </li>
            <li>
              <strong>业务员</strong>：随机分配约 50% 的路由
            </li>
            <li>
              <strong>普通用户</strong>：随机分配约 25% 的路由
            </li>
          </ul>
        </Card>

        {/* 当前权限信息 */}
        <Card title="当前权限信息" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <p>
                <strong>当前角色:</strong> {roles.join(', ') || '无'}
              </p>
              <p>
                <strong>权限列表:</strong>
              </p>
              <Space wrap>
                {permissions.map((perm) => (
                  <Tag key={perm} color="blue">
                    {perm}
                  </Tag>
                ))}
              </Space>
            </Col>
            <Col span={12}>
              <p>
                <strong>可访问路由 ({routes.length} 个):</strong>
              </p>
              <Space wrap>
                {routes.slice(0, 10).map((route) => (
                  <Tag key={route} color="green">
                    {route}
                  </Tag>
                ))}
                {routes.length > 10 && <Tag>...等</Tag>}
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 角色切换 */}
        <Card title="角色列表" style={{ marginBottom: 16 }}>
          <Space style={{ width: '100%' }}>
            {[
              { code: 'super_admin', name: '超级管理员', desc: '拥有所有权限', routes: 29 },
              { code: 'admin', name: '管理员', desc: '拥有大部分权限', routes: 16 },
              { code: 'business_user', name: '业务员', desc: '拥有业务相关权限', routes: 10 },
              { code: 'user', name: '普通用户', desc: '仅拥有基本权限', routes: 7 },
            ].map((role) => (
              <div key={role.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{role.name}</strong> - {role.desc} - {role.routes} 个路由
                  {roles.includes(role.code) && (
                    <Tag color="red" style={{ marginLeft: 8 }}>
                      当前
                    </Tag>
                  )}
                </div>
                <Button type={roles.includes(role.code) ? 'primary' : 'default'} onClick={() => switchRole(role.code)}>
                  切换
                </Button>
              </div>
            ))}
          </Space>
        </Card>

        {/* 权限组件示例 */}
        <Card title="PermissionGuard 组件" style={{ marginBottom: 16 }}>
          <Space style={{ width: '100%' }}>
            <div>
              <strong>单个权限检查：</strong>
              <PermissionGuard permission="user:read" fallback={<span style={{ color: 'red' }}>无权限查看</span>}>
                <span style={{ color: 'green' }}>您有 user:read 权限，可以看到这个内容</span>
              </PermissionGuard>
            </div>
            <div>
              <strong>多个权限检查（任一即可）：</strong>
              <PermissionGuard
                permissions={['user:create', 'role:create']}
                fallback={<span style={{ color: 'red' }}>无权限查看</span>}
              >
                <span style={{ color: 'green' }}>您有 user:create 或 role:create 权限之一</span>
              </PermissionGuard>
            </div>
            <div>
              <strong>角色检查：</strong>
              <PermissionGuard role="admin" fallback={<span style={{ color: 'red' }}>非管理员</span>}>
                <span style={{ color: 'green' }}>您是管理员</span>
              </PermissionGuard>
            </div>
          </Space>
        </Card>

        {/* 按钮权限示例 */}
        <Card title="AuthButton 组件" style={{ marginBottom: 16 }}>
          <Space>
            <AuthButton permission="user:create" onClick={() => message.success('创建用户')}>
              创建用户
            </AuthButton>
            <AuthButton
              permission="user:delete"
              hideWhenNoPermission={false}
              onClick={() => message.success('删除用户')}
            >
              删除用户（禁用状态）
            </AuthButton>
            <AuthButton permissions={['user:update', 'role:update']} onClick={() => message.success('更新操作')}>
              更新操作（需任一权限）
            </AuthButton>
          </Space>
        </Card>

        {/* Hook 检查示例 */}
        <Card title="usePermission Hook 检查" style={{ marginBottom: 16 }}>
          <Space>
            <Button
              onClick={async () => {
                const canEdit = await hasPermission('user:update')
                message.info(canEdit ? '有 user:update 权限' : '无 user:update 权限')
              }}
            >
              检查单个权限 (user:update)
            </Button>
            <Button
              onClick={async () => {
                const canAccess = await canAccessRoute('/business')
                message.info(canAccess ? '可访问 /business' : '不可访问 /business')
              }}
            >
              检查路由权限 (/business)
            </Button>
            <Button
              onClick={async () => {
                const hasAll = await hasAllPermissions(['user:read', 'user:create'])
                message.info(hasAll ? '同时拥有 user:read 和 user:create' : '缺少至少一个权限')
              }}
            >
              检查多个权限（全部需要）
            </Button>
            <Button
              onClick={async () => {
                const hasAny = await hasAnyPermission(['user:read', 'role:read'])
                message.info(hasAny ? '有 user:read 或 role:read 权限之一' : '都没有这些权限')
              }}
            >
              检查多个权限（任一即可）
            </Button>
            <Button
              onClick={async () => {
                const hasRoleAdmin = await hasRole('admin')
                message.info(hasRoleAdmin ? '是 admin 角色' : '不是 admin 角色')
              }}
            >
              检查角色 (admin)
            </Button>
          </Space>
        </Card>

        {/* 刷新权限 */}
        <Card title="权限操作">
          <Button onClick={refreshPermissions}>刷新权限</Button>
        </Card>
      </div>
    </FixTabPanel>
  )
}

export default PermissionExample
