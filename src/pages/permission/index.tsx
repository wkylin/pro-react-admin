import React, { useState, useEffect } from 'react'
import { Card, Button, Space, Tag, message, Divider, Row, Col, Grid, Switch, Select, Alert } from 'antd'
import { usePermission } from '@app-hooks/usePermission'
import PermissionGuard from '@/components/auth/PermissionGuard'
import AuthButton from '@/components/auth/AuthButton'
import { permissionService } from '@src/service/permissionService'
import FixTabPanel from '@stateless/FixTabPanel'
import { useProThemeContext } from '@/theme/hooks'
const PermissionExample = () => {
  const screens = Grid.useBreakpoint()
  const { themeSettings, updateSettings } = useProThemeContext()
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
    // 如果已登录且未强制启用示例切换，则阻止切换，以免与真实登录权限冲突
    const token =
      localStorage.getItem('token') || localStorage.getItem('github_token') || localStorage.getItem('github_user')
    const force = localStorage.getItem('force_demo_switch') === '1'
    if (token && !force) {
      message.warning('当前为已登录状态，示例内角色切换已被禁用。如需测试切换，请先登出或在本页面启用开发强制开关。')
      return
    }

    localStorage.setItem('user_role', roleCode)
    await permissionService.syncPermissions()
    await refreshPermissions()
    message.success(`已切换到 ${roleCode} 角色`)
  }

  // 本地控制：开发时可强制启用示例切换（仅页面级别）
  const [forceDemoSwitch, setForceDemoSwitch] = useState<boolean>(false)
  useEffect(() => {
    setForceDemoSwitch(localStorage.getItem('force_demo_switch') === '1')
  }, [])

  const toggleForceDemoSwitch = (checked: boolean) => {
    setForceDemoSwitch(checked)
    if (checked) localStorage.setItem('force_demo_switch', '1')
    else localStorage.removeItem('force_demo_switch')
    message.info(`开发强制切换已${checked ? '启用' : '禁用'}`)
  }

  // 主题设置切换
  const handleThemeModeChange = (checked: boolean) => {
    updateSettings({ themeMode: checked ? 'dark' : 'light' })
    message.success(`已切换到${checked ? '暗色' : '亮色'}主题`)
  }

  const handleCompactModeChange = (checked: boolean) => {
    updateSettings({ compactAlgorithm: checked })
    message.success(`${checked ? '开启' : '关闭'}紧凑模式`)
  }

  const handlePrimaryColorChange = (color: string) => {
    updateSettings({ colorPrimary: color })
    message.success('主题色已更新')
  }

  if (loading) {
    return <div>加载权限中...</div>
  }

  return (
    <FixTabPanel>
      <div style={{ padding: screens.xs ? 16 : 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={18}>
            <h1
              style={{
                fontSize: screens.xs ? '20px' : '24px',
                marginBottom: '8px',
              }}
            >
              权限系统示例
            </h1>
            <p style={{ color: 'rgba(0, 0, 0, 0.65)', marginBottom: '16px' }}>
              系统为四个角色随机分配了路由权限，您可以切换不同角色查看权限差异。
            </p>
          </Col>
          <Col xs={24} lg={6}>
            <Card title="主题设置" size="small">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>暗色主题</span>
                  <Switch checked={themeSettings.themeMode === 'dark'} onChange={handleThemeModeChange} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>紧凑模式</span>
                  <Switch checked={themeSettings.compactAlgorithm} onChange={handleCompactModeChange} />
                </div>
                <div>
                  <span style={{ marginRight: '8px' }}>主题色</span>
                  <Select
                    value={themeSettings.colorPrimary}
                    onChange={handlePrimaryColorChange}
                    style={{ width: '120px' }}
                    size="small"
                  >
                    <Select.Option value="#1677ff">蓝色</Select.Option>
                    <Select.Option value="#52c41a">绿色</Select.Option>
                    <Select.Option value="#faad14">橙色</Select.Option>
                    <Select.Option value="#f5222d">红色</Select.Option>
                    <Select.Option value="#722ed1">紫色</Select.Option>
                  </Select>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* 登录时提示：已使用登录账户权限，示例切换已禁用 */}
        {(localStorage.getItem('token') ||
          localStorage.getItem('github_token') ||
          localStorage.getItem('github_user')) &&
          !forceDemoSwitch && (
            <Alert
              title="已使用登录账户权限，示例切换已禁用"
              description={
                <div>
                  如需临时启用示例切换（仅用于开发），可在下方启用“开发强制开关”。启用后示例切换会覆盖当前页面权限视图，但不会修改后端用户数据。
                </div>
              }
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

        {/* 开发强制开关，仅在非生产或 localhost 显示 */}
        {(process.env.NODE_ENV !== 'production' || window.location.hostname.includes('localhost')) && (
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Switch checked={forceDemoSwitch} onChange={toggleForceDemoSwitch} />
            <span style={{ color: 'rgba(0,0,0,0.65)' }}>开发：强制启用示例切换（仅页面级别）</span>
          </div>
        )}

        {/* 权限说明 */}
        <Card title="权限说明" style={{ marginBottom: 16 }} size={screens.xs ? 'small' : 'default'}>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  padding: '8px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                <strong>超级管理员</strong>
                <br />
                <small>拥有所有路由访问权限（100%）</small>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  padding: '8px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                <strong>管理员</strong>
                <br />
                <small>随机分配约 75% 的路由</small>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  padding: '8px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                <strong>业务员</strong>
                <br />
                <small>随机分配约 50% 的路由</small>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <div
                style={{
                  padding: '8px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                <strong>普通用户</strong>
                <br />
                <small>随机分配约 25% 的路由</small>
              </div>
            </Col>
          </Row>
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
        <Card title="角色列表" style={{ marginBottom: 16 }} size={screens.xs ? 'small' : 'default'}>
          <Row gutter={[16, 16]}>
            {[
              {
                code: 'super_admin',
                name: '超级管理员',
                desc: '拥有所有权限',
                routes: 29,
              },
              {
                code: 'admin',
                name: '管理员',
                desc: '拥有大部分权限',
                routes: 16,
              },
              {
                code: 'business_user',
                name: '业务员',
                desc: '拥有业务相关权限',
                routes: 10,
              },
              {
                code: 'user',
                name: '普通用户',
                desc: '仅拥有基本权限',
                routes: 7,
              },
            ].map((role) => (
              <Col xs={24} sm={12} key={role.code}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <strong>{role.name}</strong>
                    <br />
                    <small>
                      {role.desc} - {role.routes} 个路由
                    </small>
                    {roles.includes(role.code) && (
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        当前
                      </Tag>
                    )}
                  </div>
                  {/* 如果当前为已登录状态，禁用示例内切换按钮以避免覆盖真实用户权限 */}
                  <Button
                    type={roles.includes(role.code) ? 'primary' : 'default'}
                    onClick={() => switchRole(role.code)}
                    size={screens.xs ? 'small' : 'middle'}
                    disabled={
                      !!(
                        localStorage.getItem('token') ||
                        localStorage.getItem('github_token') ||
                        localStorage.getItem('github_user')
                      )
                    }
                  >
                    切换
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 权限组件示例 */}
        <Card title="PermissionGuard 组件" style={{ marginBottom: 16 }} size={screens.xs ? 'small' : 'default'}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8}>
              <div
                style={{
                  padding: '8px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                <strong>单个权限检查：</strong>
                <br />
                <PermissionGuard permission="user:read" fallback={<span style={{ color: 'red' }}>无权限查看</span>}>
                  <span style={{ color: 'green' }}>您有 user:read 权限，可以看到这个内容</span>
                </PermissionGuard>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <div
                style={{
                  padding: '8px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                <strong>多个权限检查（任一即可）：</strong>
                <br />
                <PermissionGuard
                  permissions={['user:create', 'role:create']}
                  fallback={<span style={{ color: 'red' }}>无权限查看</span>}
                >
                  <span style={{ color: 'green' }}>您有 user:create 或 role:create 权限之一</span>
                </PermissionGuard>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <div
                style={{
                  padding: '8px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                }}
              >
                <strong>角色检查：</strong>
                <br />
                <PermissionGuard
                  roles={['admin', 'super_admin']}
                  fallback={<span style={{ color: 'red' }}>非管理员</span>}
                >
                  <span style={{ color: 'green' }}>您是管理员（含超级管理员）</span>
                </PermissionGuard>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 按钮权限示例 */}
        <Card title="AuthButton 组件" style={{ marginBottom: 16 }} size={screens.xs ? 'small' : 'default'}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={8}>
              <AuthButton permission="user:create" onClick={() => message.success('创建用户')} block>
                创建用户
              </AuthButton>
            </Col>
            <Col xs={24} sm={8}>
              <AuthButton
                permission="user:delete"
                hideWhenNoPermission={false}
                onClick={() => message.success('删除用户')}
                block
              >
                删除用户（禁用状态）
              </AuthButton>
            </Col>
            <Col xs={24} sm={8}>
              <AuthButton
                permissions={['user:update', 'role:update']}
                onClick={() => message.success('更新操作')}
                block
              >
                更新操作（需任一权限）
              </AuthButton>
            </Col>
          </Row>
        </Card>

        {/* Hook 检查示例 */}
        <Card title="usePermission Hook 检查" style={{ marginBottom: 16 }} size={screens.xs ? 'small' : 'default'}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12} md={6}>
              <Button
                onClick={async () => {
                  const canEdit = await hasPermission('user:update')
                  message.info(canEdit ? '有 user:update 权限' : '无 user:update 权限')
                }}
                block
              >
                检查单个权限 (user:update)
              </Button>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Button
                onClick={async () => {
                  const canAccess = await canAccessRoute('/business')
                  message.info(canAccess ? '可访问 /business' : '不可访问 /business')
                }}
                block
              >
                检查路由权限 (/business)
              </Button>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Button
                onClick={async () => {
                  const hasAll = await hasAllPermissions(['user:read', 'user:create'])
                  message.info(hasAll ? '同时拥有 user:read 和 user:create' : '缺少至少一个权限')
                }}
                block
              >
                检查多个权限（全部需要）
              </Button>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Button
                onClick={async () => {
                  const hasAny = await hasAnyPermission(['user:read', 'role:read'])
                  message.info(hasAny ? '有 user:read 或 role:read 权限之一' : '都没有这些权限')
                }}
                block
              >
                检查多个权限（任一即可）
              </Button>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Button
                onClick={async () => {
                  const isAdmin = (await hasRole('admin')) || (await hasRole('super_admin'))
                  message.info(isAdmin ? '是管理员（admin / super_admin）' : '不是管理员')
                }}
                block
              >
                检查角色 (admin/super_admin)
              </Button>
            </Col>
          </Row>
        </Card>

        {/* 刷新权限 */}
        <Card title="权限操作" size={screens.xs ? 'small' : 'default'}>
          <Button onClick={refreshPermissions} block={!!screens.xs}>
            刷新权限
          </Button>
        </Card>
      </div>
    </FixTabPanel>
  )
}

export default PermissionExample
