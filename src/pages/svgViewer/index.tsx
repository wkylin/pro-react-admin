import { useMemo, useState, type CSSProperties } from 'react'
import { theme } from 'antd'
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import { BookOpen, Boxes, ExternalLink, GitBranch, Layers3, Route, ShieldCheck } from 'lucide-react'
import FixTabPanel from '@shared/ui/FixTabPanel'
import {
  architectureNodes,
  architectureViews,
  type ArchitectureCategory,
  type ArchitectureNodeId,
} from './architectureData'
import styles from './index.module.less'
import '@xyflow/react/dist/style.css'

interface DiagramNodeData extends Record<string, unknown> {
  title: string
  subtitle: string
  category: ArchitectureCategory
}

type DiagramNode = Node<DiagramNodeData, 'architecture'>

const categoryLabels: Record<ArchitectureCategory, string> = {
  workspace: '工程约束',
  application: '应用层',
  platform: '平台层',
  service: '服务层',
  delivery: '交付层',
}

const viewIcons = [Layers3, Route, ShieldCheck, Boxes, GitBranch]

const sections = [
  { id: 'architecture-boundaries', label: '代码边界' },
  { id: 'architecture-projects', label: '项目矩阵' },
  { id: 'architecture-access', label: '权限与数据' },
  { id: 'architecture-delivery', label: '构建交付' },
  { id: 'architecture-start', label: '上手路径' },
  { id: 'architecture-next', label: '能力边界' },
]

const layerRows = [
  {
    name: '应用装配',
    path: 'src/app',
    responsibility: '入口 Provider、项目路由、后台布局和每根独立的壳 Store。',
    boundary: '选择业务模块；不承载通用请求与授权算法。',
  },
  {
    name: '领域功能',
    path: 'src/features',
    responsibility: '按领域放置 pages、api、model、hooks 与模块声明。',
    boundary: '通过领域 Provider / API 访问数据；模块在编译期装配。',
  },
  {
    name: '平台能力',
    path: 'src/platform',
    responsibility: '认证、授权、导航、HTTP、缓存、MFE、PWA 与埋点。',
    boundary: '不反向导入 app、features、pages 或 projects。',
  },
  {
    name: '项目差异',
    path: 'src/projects',
    responsibility: 'default 之外的入口、路由选择、Host 与 Remote。',
    boundary: '复用应用装配和平台；不复制基础路由算法。',
  },
  {
    name: '共享组件',
    path: 'src/shared · packages/wui-react',
    responsibility: '应用内通用 UI 与可独立发布的组件包。',
    boundary: 'wui-react 自包含，不依赖应用 src。',
  },
  {
    name: '企业后端',
    path: 'api/enterprise',
    responsibility: 'HTTP 路由、业务授权、租户隔离、SQLite 和审计。',
    boundary: '显式启用并独立部署；静态前端不包含此服务。',
  },
]

const projectRows = [
  {
    name: 'default',
    role: '组件与能力展示应用',
    module: '组织管理 + 通知 + 演示路由',
    output: 'dist/',
    command: 'pnpm start:web',
  },
  {
    name: 'enterprise',
    role: '精简企业管理入口',
    module: '组织管理；用户 / 角色 / 审计',
    output: 'dist-enterprise/',
    command: 'pnpm start:enterprise',
  },
  {
    name: 'shell',
    role: 'Module Federation Host',
    module: '在 /projectA、/projectB 加载 Remote',
    output: 'dist-shell/',
    command: 'pnpm start:mf:shell',
  },
  {
    name: 'projectA',
    role: '独立应用 + Remote',
    module: '独立路由与 MFE App 暴露',
    output: 'dist-projectA/',
    command: 'pnpm start:mf:projectA',
  },
  {
    name: 'projectB',
    role: '独立应用 + Remote',
    module: '独立路由与 MFE App 暴露',
    output: 'dist-projectB/',
    command: 'pnpm start:mf:projectB',
  },
]

const accessRows = [
  {
    step: '01 身份建立',
    browser: 'AuthService 读取演示、GitHub 或企业会话；SessionScope 在身份/租户变更时重建根内页面。',
    server: '企业模式由 /api/auth/session 验证 token、账号与租户。',
  },
  {
    step: '02 页面授权',
    browser: 'PermissionService 向路由守卫、菜单、搜索与按钮提供同一实时权限快照。',
    server: '前端隐藏入口不是安全边界；服务端依实际会话重新授权。',
  },
  {
    step: '03 资源读取',
    browser: '管理页面经 DataProvider 访问 users / roles / audit；demo 或 REST 由环境与注入选择。',
    server: 'REST 模式通过 /api/admin/* 读取租户范围内的记录。',
  },
  {
    step: '04 写入与失效',
    browser: '会话内缓存共享同键请求，写入后失效关联资源并阻止旧请求回填。',
    server: '业务写入、会话撤销与追加审计在 SQLite 事务中完成。',
  },
]

const deliveryRows = [
  {
    target: '后台与独立项目',
    pipeline: 'webpack.common.js + dev/prod + 项目注册表',
    artifact: 'dist/ · dist-enterprise/ · dist-projectA/B/',
    delivery: 'Pages / Vercel / Nginx 静态托管',
  },
  {
    target: '联邦应用',
    pipeline: 'ModuleFederationPlugin + manifest 契约校验',
    artifact: 'dist-shell/ + Remote entry / manifest',
    delivery: 'Host 与 Remote 按路径组合部署',
  },
  {
    target: 'UI 组件库',
    pipeline: 'webpack.lib.js + tsconfig.lib.json',
    artifact: 'ESM / CJS / CSS / 声明文件',
    delivery: '独立 npm 发布流程',
  },
  {
    target: '组件文档',
    pipeline: '.storybook/main.ts + Webpack 5 builder',
    artifact: 'storybook-static/',
    delivery: '静态预览站点',
  },
  {
    target: '真实企业 API',
    pipeline: 'Node 24 + Express + node:sqlite',
    artifact: '服务进程 + 持久 SQLite 文件',
    delivery: 'Caddy / Compose 单实例部署',
  },
]

const startPaths = [
  {
    title: '理解项目装配',
    command: 'pnpm start:web',
    files: 'src/projects/registry.json → src/index.tsx → src/app/bootstrap/renderApp.tsx',
    description: '先沿默认入口看项目解析、Provider 装配、路由和布局。',
  },
  {
    title: '接入业务模块',
    command: 'pnpm start:enterprise',
    files: 'src/features/administration/module.ts → src/platform/modules/index.tsx → config/route-policy.json',
    description: '从企业入口看模块路由、精确授权与资源 Provider 的边界。',
  },
  {
    title: '运行真实企业 API',
    command: 'pnpm run api:bootstrap && pnpm run start:enterprise:full',
    files: 'docs/ENTERPRISE.md → api/enterprise/router.cjs → api/enterprise/service.mts',
    description: '先按企业文档配置开发环境变量，再初始化租户并启动前后端。',
  },
  {
    title: '查看多项目联邦',
    command: 'pnpm start:mf:shell',
    files: 'src/projects/shell/routers/index.tsx → webpack/mfe.config.js → src/platform/mfe/bridge.ts',
    description: '再启动 ProjectA / ProjectB 的 Remote 入口，观察 Host 加载链路。',
  },
  {
    title: '维护组件体系',
    command: 'pnpm storybook',
    files: 'packages/wui-react/src → .storybook/main.ts → webpack/webpack.lib.js',
    description: 'Storybook 直接消费源码；发布包另走库构建与消费校验。',
  },
]

const capabilityRows = [
  {
    area: '模块',
    shipped: '编译期模块契约、依赖验证、资源与 Header 插槽。',
    boundary: '运行期插件下载、版本协商和不可信代码沙箱尚未提供。',
  },
  {
    area: '认证',
    shipped: '演示、GitHub 与企业会话；企业端强制 RBAC 和租户过滤。',
    boundary: 'OIDC / SSO、多组织成员关系属于后续演进。',
  },
  {
    area: '数据',
    shipped: '类型化 DataProvider、管理资源会话缓存、可选 SQLite 企业服务和通用 WebSocket hook。',
    boundary: 'WebSocket 尚无企业 API 调用方；缓存没有后台刷新或实时订阅，SQLite 面向单实例。',
  },
  {
    area: '状态',
    shipped: '根实例 Store、会话切换清理、有限 KeepAlive 页面缓存。',
    boundary: 'Tabs 不跨刷新恢复；草稿没有永久持久化。',
  },
]

function ArchitectureFlowNode({ data, selected }: NodeProps<DiagramNode>) {
  return (
    <div className={`${styles.flowNode} ${styles[data.category]} ${selected ? styles.selectedNode : ''}`}>
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <span className={styles.nodeCategory}>{categoryLabels[data.category]}</span>
      <strong>{data.title}</strong>
      <span className={styles.nodeSubtitle}>{data.subtitle}</span>
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  )
}

const nodeTypes = { architecture: ArchitectureFlowNode }
const sourceHref = (path: string) => {
  const kind = /\.[a-z\d]+$/i.test(path) ? 'blob' : 'tree'
  return `https://github.com/wkylin/pro-react-admin/${kind}/main/${path}`
}

const SvgViewer = () => {
  const { token } = theme.useToken()
  const [viewId, setViewId] = useState(architectureViews[0].id)
  const [selectedId, setSelectedId] = useState<ArchitectureNodeId>(architectureViews[0].nodes[0].id)
  const view = architectureViews.find((item) => item.id === viewId) ?? architectureViews[0]
  const selected = architectureNodes[selectedId]

  const colors = {
    '--arch-bg': token.colorBgContainer,
    '--arch-ink': token.colorText,
    '--arch-muted': token.colorTextSecondary,
    '--arch-border': token.colorBorderSecondary,
    '--arch-grid': token.colorFillSecondary,
    '--arch-soft': token.colorFillQuaternary,
    '--arch-primary': token.colorPrimary,
    '--arch-primary-soft': token.colorPrimaryBg,
    '--arch-blue': token.colorInfo,
    '--arch-blue-soft': token.colorInfoBg,
    '--arch-teal': token.colorSuccess,
    '--arch-teal-soft': token.colorSuccessBg,
    '--arch-amber': token.colorWarning,
    '--arch-amber-soft': token.colorWarningBg,
    '--arch-coral': token.colorError,
    '--arch-coral-soft': token.colorErrorBg,
  } as CSSProperties

  const nodes = useMemo<DiagramNode[]>(
    () =>
      view.nodes.map(({ id, x, y }) => ({
        id,
        type: 'architecture',
        position: { x, y },
        data: {
          title: architectureNodes[id].title,
          subtitle: architectureNodes[id].subtitle,
          category: architectureNodes[id].category,
        },
        selected: id === selectedId,
      })),
    [view, selectedId]
  )

  const edges = useMemo<Edge[]>(
    () =>
      view.edges.map(([source, target]) => ({
        id: `${source}-${target}`,
        source,
        target,
        type: 'smoothstep',
        style: { stroke: token.colorBorder, strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: token.colorBorder },
      })),
    [view, token.colorBorder]
  )

  const selectView = (id: string) => {
    const nextView = architectureViews.find((item) => item.id === id)
    if (!nextView) return
    setViewId(id)
    setSelectedId(nextView.nodes[0].id)
  }

  const jumpTo = (id: string) => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
  }

  return (
    <FixTabPanel fill={false}>
      <article className={styles.page} style={colors} aria-labelledby="architecture-title">
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.headerMain}>
              <div>
                <p className={styles.eyebrow}>SYSTEM MAP / IMPLEMENTATION REFERENCE</p>
                <h1 id="architecture-title">Pro React Admin 技术架构</h1>
                <p className={styles.intro}>
                  五个项目入口共享应用底座和平台能力；企业 API、联邦应用与组件库各有独立的运行和交付边界。
                  这里按实际源码呈现依赖关系、数据路径与扩展位置。
                </p>
              </div>
              <a
                className={styles.docLink}
                href="https://github.com/wkylin/pro-react-admin/blob/main/docs/ARCHITECTURE.md"
                target="_blank"
                rel="noreferrer"
              >
                <BookOpen size={16} aria-hidden="true" />
                架构文档
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
            <dl className={styles.baseline}>
              <div>
                <dt>应用基线</dt>
                <dd>React 19 · Router 7 · Ant Design 6</dd>
              </div>
              <div>
                <dt>工程基线</dt>
                <dd>TypeScript 6 · Webpack 5 · pnpm 11</dd>
              </div>
              <div>
                <dt>产品形态</dt>
                <dd>独立项目 · Module Federation · UI 包</dd>
              </div>
            </dl>
          </header>

          <section className={styles.mapSection} aria-labelledby="map-title">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionIndex}>架构视图</p>
                <h2 id="map-title">从入口到交付</h2>
              </div>
              <div className={styles.legend} aria-label="节点分类">
                {(Object.keys(categoryLabels) as ArchitectureCategory[]).map((category) => (
                  <span key={category} className={styles[category]}>
                    {categoryLabels[category]}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.viewTabs} role="tablist" aria-label="架构视图">
              {architectureViews.map((item, index) => {
                const Icon = viewIcons[index]
                return (
                  <button
                    key={item.id}
                    id={`architecture-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={viewId === item.id}
                    aria-controls="architecture-view-panel"
                    className={viewId === item.id ? styles.activeTab : ''}
                    onClick={() => selectView(item.id)}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {item.title}
                  </button>
                )
              })}
            </div>
            <div id="architecture-view-panel" role="tabpanel" aria-labelledby={`architecture-tab-${view.id}`}>
              <p className={styles.viewSummary}>{view.summary}</p>
              <div className={styles.diagram}>
                <div
                  className={`${styles.flowCanvas} ${view.id === 'overview' ? styles.overviewCanvas : ''}`}
                  aria-label={`${view.title}架构图`}
                >
                  <ReactFlow
                    key={view.id}
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodeClick={(_, node) => setSelectedId(node.id as ArchitectureNodeId)}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    edgesFocusable={false}
                    fitView
                    fitViewOptions={{ padding: 0.08, minZoom: 0.55, maxZoom: 1 }}
                    minZoom={0.35}
                    maxZoom={1.5}
                    zoomOnScroll={false}
                    zoomOnDoubleClick={false}
                    preventScrolling={false}
                  >
                    <Background variant={BackgroundVariant.Dots} color={token.colorFillSecondary} gap={24} size={1} />
                    <Controls showInteractive={false} />
                  </ReactFlow>
                </div>
                <div className={styles.mobileNodes} aria-label={`${view.title}节点列表`}>
                  {view.nodes.map(({ id }, index) => {
                    const node = architectureNodes[id]
                    return (
                      <button
                        key={id}
                        type="button"
                        className={selectedId === id ? styles.activeMobileNode : ''}
                        onClick={() => setSelectedId(id)}
                      >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{node.title}</strong>
                        <small>{node.subtitle}</small>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className={styles.nodeDetail} aria-live="polite">
                <div className={styles.nodeDescription}>
                  <span className={styles.detailCategory}>
                    {categoryLabels[selected.category]} / {selected.title}
                  </span>
                  <p>{selected.description}</p>
                  <span className={styles.detailNote}>{selected.note}</span>
                </div>
                <div className={styles.sourceList}>
                  <span>对应源码</span>
                  <ul>
                    {selected.files.map((file) => (
                      <li key={file}>
                        <a href={sourceHref(file)} target="_blank" rel="noreferrer">
                          <code>{file}</code>
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <nav className={styles.sectionNav} aria-label="架构章节">
            {sections.map((section) => (
              <button key={section.id} type="button" onClick={() => jumpTo(section.id)}>
                {section.label}
              </button>
            ))}
          </nav>

          <section id="architecture-boundaries" className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionIndex}>01 / OWNERSHIP</p>
                <h2>代码边界</h2>
              </div>
            </div>
            <p className={styles.sectionIntro}>
              应用选择能力，平台承载共性，领域模块拥有自己的页面和数据适配。导入方向由工程检查约束。
            </p>
            <div className={styles.tableScroll}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">层</th>
                    <th scope="col">目录</th>
                    <th scope="col">职责</th>
                    <th scope="col">边界</th>
                  </tr>
                </thead>
                <tbody>
                  {layerRows.map((row) => (
                    <tr key={row.name}>
                      <th scope="row">{row.name}</th>
                      <td>
                        <code>{row.path}</code>
                      </td>
                      <td>{row.responsibility}</td>
                      <td>{row.boundary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.annotation}>
              现有 <code>src/pages</code> 和 <code>src/components</code> 仍承载展示页与待迁移组件；新增业务优先进入{' '}
              <code>src/features</code>。
            </p>
          </section>

          <section id="architecture-projects" className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionIndex}>02 / PRODUCTS</p>
                <h2>项目矩阵</h2>
              </div>
              <code className={styles.headingPath}>src/projects/registry.json</code>
            </div>
            <p className={styles.sectionIntro}>
              五个构建目标有独立入口和产物。Shell 与 Remote 是联邦示例，企业管理入口保持单独的精简路由树。
            </p>
            <div className={styles.tableScroll}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">项目</th>
                    <th scope="col">定位</th>
                    <th scope="col">实际装配</th>
                    <th scope="col">产物</th>
                    <th scope="col">开发命令</th>
                  </tr>
                </thead>
                <tbody>
                  {projectRows.map((row) => (
                    <tr key={row.name}>
                      <th scope="row">
                        <code>{row.name}</code>
                      </th>
                      <td>{row.role}</td>
                      <td>{row.module}</td>
                      <td>
                        <code>{row.output}</code>
                      </td>
                      <td>
                        <code>{row.command}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="architecture-access" className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionIndex}>03 / TRUST & DATA</p>
                <h2>一次管理请求经过哪里</h2>
              </div>
            </div>
            <p className={styles.sectionIntro}>
              前端负责一致的可见性和会话生命周期；真实企业资源必须由服务端完成租户过滤与授权。
            </p>
            <div className={styles.tableScroll}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">阶段</th>
                    <th scope="col">浏览器应用</th>
                    <th scope="col">企业 API（启用后）</th>
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.step}>
                      <th scope="row">{row.step}</th>
                      <td>{row.browser}</td>
                      <td>{row.server}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.annotation}>
              演示模式由 <code>REACT_APP_USE_MOCK=true</code> 显式开启；真实 API 由 <code>ENTERPRISE_ENABLED=true</code>{' '}
              启用，生产还需持久化 <code>ENTERPRISE_DB_PATH</code>。
            </p>
          </section>

          <section id="architecture-delivery" className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionIndex}>04 / BUILD & DELIVERY</p>
                <h2>构建与交付</h2>
              </div>
            </div>
            <p className={styles.sectionIntro}>
              Webpack 5 负责应用及库的不同产物；Storybook 使用自己的 Webpack builder。CI
              按目标检查契约、类型、构建、预算与浏览器流程。
            </p>
            <div className={styles.tableScroll}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">目标</th>
                    <th scope="col">构建链</th>
                    <th scope="col">产物</th>
                    <th scope="col">交付边界</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryRows.map((row) => (
                    <tr key={row.target}>
                      <th scope="row">{row.target}</th>
                      <td>
                        <code>{row.pipeline}</code>
                      </td>
                      <td>
                        <code>{row.artifact}</code>
                      </td>
                      <td>{row.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.deliveryFacts}>
              <div>
                <strong>变更门禁</strong>
                <p>项目注册表、路径别名、路由策略、模块边界、类型检查、API 与浏览器流程。</p>
              </div>
              <div>
                <strong>产物约束</strong>
                <p>独立目标目录、联邦 manifest 协议、内容哈希、Service Worker 与应用体积预算。</p>
              </div>
              <div>
                <strong>观测路径</strong>
                <p>默认入口的 Tracking / PWA；生产 Sentry 和 Vercel Insights 按配置与托管环境启用。</p>
              </div>
            </div>
          </section>

          <section id="architecture-start" className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionIndex}>05 / FIRST PATHS</p>
                <h2>从哪里开始</h2>
              </div>
            </div>
            <div className={styles.startGrid}>
              {startPaths.map((path, index) => (
                <div key={path.title} className={styles.startItem}>
                  <span className={styles.startNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{path.title}</h3>
                    <p>{path.description}</p>
                    <code>{path.command}</code>
                    <span className={styles.startFiles}>{path.files}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="architecture-next" className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionIndex}>06 / CAPABILITY BOUNDARIES</p>
                <h2>已交付与下一阶段</h2>
              </div>
            </div>
            <p className={styles.sectionIntro}>
              扩展方向来自当前契约和项目文档；右列描述尚未落地的能力，避免把路线图当作现状。
            </p>
            <div className={styles.tableScroll}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">领域</th>
                    <th scope="col">当前已实现</th>
                    <th scope="col">边界与下一阶段</th>
                  </tr>
                </thead>
                <tbody>
                  {capabilityRows.map((row) => (
                    <tr key={row.area}>
                      <th scope="row">{row.area}</th>
                      <td>{row.shipped}</td>
                      <td>{row.boundary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.referenceLinks}>
              <a
                href="https://github.com/wkylin/pro-react-admin/blob/main/docs/MODULES.md"
                target="_blank"
                rel="noreferrer"
              >
                模块契约 <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/wkylin/pro-react-admin/blob/main/docs/ENTERPRISE.md"
                target="_blank"
                rel="noreferrer"
              >
                企业数据接入 <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/wkylin/pro-react-admin/blob/main/docs/DEPLOY.md"
                target="_blank"
                rel="noreferrer"
              >
                部署边界 <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/wkylin/pro-react-admin/blob/main/docs/PROJECT_REFERENCE.md"
                target="_blank"
                rel="noreferrer"
              >
                项目参考 <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </article>
    </FixTabPanel>
  )
}

export default SvgViewer
