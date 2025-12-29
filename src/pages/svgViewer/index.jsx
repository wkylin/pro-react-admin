import FixTabPanel from '@stateless/FixTabPanel'
import SvgPreview from '@stateless/SvgPreview'
import DiagramSvgRbac from '@assets/svg/architecture-diagram-rbac.svg'
import DiagramSvg from '@assets/svg/architecture-diagram.svg'
import { Card, Space, Typography, Row, Col, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

const SvgViewer = () => {
  return (
    <FixTabPanel fill={true}>
      <div
        style={{
          padding: 24,
          minHeight: '100%',
          background: 'linear-gradient(180deg,#0f1724 0%, rgba(15,23,36,0.6) 60%)',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              marginBottom: 18,
            }}
          >
            <div>
              <Title level={2} style={{ color: '#fff', margin: 0 }}>
                Pro React Admin — 技术架构图
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.75)', margin: '6px 0 0' }}>
                双重架构、企业级特性与现代化构建流程的可视化展示
              </Paragraph>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card
                contentStyle={{ padding: 18, maxHeight: 760, overflow: 'auto' }}
                style={{
                  borderRadius: 12,
                  boxShadow: '0 8px 30px rgba(2,6,23,0.6)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff',
                }}
              >
                <Title level={4} style={{ color: '#fff' }}>
                  Pro React Admin 技术架构图:
                </Title>
                <h3 style={{ color: '#fff', marginTop: 6 }}>🏗️ 双重架构设计</h3>
                <ul style={{ color: 'rgba(255,255,255,0.78)', paddingLeft: 18 }}>
                  <li>
                    <strong>企业级应用</strong>：完整的中后台管理系统
                  </li>
                  <li>
                    <strong>组件库</strong>：可独立发布的{' '}
                    <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: 4 }}>
                      @w.ui/wui-react
                    </code>{' '}
                    NPM 包
                  </li>
                </ul>
                <h3 style={{ color: '#fff' }}>🚀 前沿技术栈</h3>
                <ul style={{ color: 'rgba(255,255,255,0.78)', paddingLeft: 18 }}>
                  <li>
                    <strong>React 19</strong>：利用最新的并发特性和性能优化
                  </li>
                  <li>
                    <strong>双构建模式</strong>：Webpack 5 用于生产构建，Vite 7 用于快速开发
                  </li>
                  <li>
                    <strong>TypeScript 5</strong>：提供强类型支持
                  </li>
                </ul>
                <h3 style={{ color: '#fff' }}>🛡️ 企业级特性</h3>
                <ul style={{ color: 'rgba(255,255,255,0.78)', paddingLeft: 18 }}>
                  <li>
                    <strong>RBAC 权限体系</strong>：路由、菜单、按钮级细粒度控制
                  </li>
                  <li>
                    <strong>多标签页系统</strong>：支持状态持久化和 KeepAlive 缓存
                  </li>
                  <li>
                    <strong>健壮请求层</strong>：并发控制、自动重试、全局错误处理
                  </li>
                </ul>
                <h3 style={{ color: '#fff' }}>🧩 丰富生态</h3>
                <ul style={{ color: 'rgba(255,255,255,0.78)', paddingLeft: 18 }}>
                  <li>
                    <strong>120+ 组件：</strong>：涵盖基础设施、业务组件和 UI 组件
                  </li>
                  <li>
                    <strong>AI 集成</strong>：内置 ChatGPT、Markmap、Mermaid 等智能组件
                  </li>
                  <li>
                    <strong>全链路测试</strong>：Playwright E2E 测试和质量保障体系
                  </li>
                </ul>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                  该架构图展示了 Pro React Admin 作为现代化企业级中后台解决方案的完整技术栈。核心优势在于 React 19
                  的性能优化、双重架构设计、完善的权限体系和丰富的组件生态。构建系统支持 Webpack 和 Vite
                  双模式，部署采用 GitHub Pages 自动化流程，监控集成 Sentry 错误追踪。
                </p>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Card
                  title="技术架构图"
                  extra={
                    <Space>
                      <Text type="secondary">提示：可以使用鼠标拖拽和方向键移动视图</Text>
                    </Space>
                  }
                  styles={{
                    body: { padding: 0, flex: 1, overflow: 'hidden', display: 'flex', position: 'relative' },
                  }}
                >
                  <div style={{ flex: 1, position: 'relative', height: '300px' }}>
                    <SvgPreview SvgComponent={DiagramSvg} downloadName="architecture-diagram.svg" />
                    {/* <SvgPreview svgSource={SVG_SOURCE} downloadName="architecture-diagram.svg" /> */}
                    {/* 如果需要直接作为组件渲染，可改为 <DiagramSvg/> */}
                  </div>
                </Card>

                <Card
                  title="路由/权限架构图"
                  extra={
                    <Space>
                      <Text type="secondary">提示：可以使用鼠标拖拽和方向键移动视图</Text>
                    </Space>
                  }
                  styles={{
                    body: { padding: 0, flex: 1, overflow: 'hidden', display: 'flex', position: 'relative' },
                  }}
                >
                  <div style={{ flex: 1, position: 'relative', height: '300px' }}>
                    <SvgPreview SvgComponent={DiagramSvgRbac} downloadName="architecture-diagram-rbac.svg" />
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </FixTabPanel>
  )
}

export default SvgViewer
