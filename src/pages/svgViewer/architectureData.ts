export type ArchitectureCategory = 'workspace' | 'application' | 'platform' | 'service' | 'delivery'

export type ArchitectureNodeId =
  | 'workspace'
  | 'registry'
  | 'build'
  | 'entry'
  | 'root'
  | 'theme'
  | 'router'
  | 'modules'
  | 'layout'
  | 'state'
  | 'session'
  | 'permissions'
  | 'policy'
  | 'guards'
  | 'features'
  | 'provider'
  | 'demo'
  | 'cache'
  | 'transport'
  | 'enterpriseApi'
  | 'database'
  | 'default'
  | 'enterprise'
  | 'shell'
  | 'remotes'
  | 'mfeBridge'
  | 'library'
  | 'storybook'
  | 'quality'
  | 'artifacts'
  | 'staticHosting'
  | 'apiHosting'
  | 'observability'

export interface ArchitectureNode {
  title: string
  subtitle: string
  category: ArchitectureCategory
  description: string
  files: readonly string[]
  note: string
}

export interface PlacedNode {
  id: ArchitectureNodeId
  x: number
  y: number
}

export interface ArchitectureView {
  id: string
  title: string
  summary: string
  nodes: readonly PlacedNode[]
  edges: readonly (readonly [ArchitectureNodeId, ArchitectureNodeId])[]
}

export const architectureNodes: Record<ArchitectureNodeId, ArchitectureNode> = {
  workspace: {
    title: '工作区与版本基线',
    subtitle: 'Node 24 · pnpm workspace',
    category: 'workspace',
    description:
      '根应用、企业 API 与可发布 UI 包位于同一工作区。应用使用 React 19、Router 7、Ant Design 6、Zustand 5 和 TypeScript 6。',
    files: ['pnpm-workspace.yaml', 'package.json', 'docs/reference/PROJECT_REFERENCE.md'],
    note: '根应用尚未全仓开启 TypeScript strict；核心边界、API 与 UI 包有独立的严格类型检查。',
  },
  registry: {
    title: '项目注册表',
    subtitle: '5 个入口 · 统一解析',
    category: 'workspace',
    description:
      'default、enterprise、projectA、projectB、shell 的源码入口、路由目录和产物目录由同一注册表声明，构建脚本据此选取目标。',
    files: ['src/projects/registry.json', 'config/project-registry.mjs', 'scripts/project-command.mjs'],
    note: '注册表也约束输出路径与 Remote 契约，避免独立项目互相覆盖产物。',
  },
  build: {
    title: 'Webpack 5 构建',
    subtitle: '应用 · 联邦 · 组件库',
    category: 'delivery',
    description: '应用共用 common/dev/prod 规则；项目角色决定入口与输出。组件库和 Storybook 各走独立构建配置。',
    files: ['build/webpack/webpack.common.js', 'build/webpack/webpack.dev.js', 'build/webpack/webpack.prod.js'],
    note: '开发使用 HMR/React Refresh；生产使用内容哈希、分包、压缩、版本文件和 Serwist Service Worker。',
  },
  entry: {
    title: '项目入口',
    subtitle: '独立 root · projectId',
    category: 'application',
    description: '每个项目有自己的入口和路由选择。默认展示应用注册 PWA 与开发态埋点，其它项目入口按各自需要装配。',
    files: ['src/index.tsx', 'src/projects/enterprise/index.tsx', 'src/projects/shell/index.tsx'],
    note: '不要将默认展示入口的可选能力误认为所有项目入口都自动启用。',
  },
  root: {
    title: '应用装配',
    subtitle: 'renderApp · Providers',
    category: 'application',
    description: 'React root 由统一装配函数创建，安装项目 Store、会话生命周期、Ant Design、i18n、错误边界和 Suspense。',
    files: ['src/app/bootstrap/renderApp.tsx', 'src/app/bootstrap/Application.tsx'],
    note: 'renderApp 返回 root、store 与 unmount，支持独立根和 Remote 的明确销毁。',
  },
  theme: {
    title: '主题与国际化',
    subtitle: 'Ant Design 6 · zh/en',
    category: 'application',
    description:
      '主题 Provider、Ant Design ConfigProvider、语言资源和 dayjs locale 在应用根装配；主题偏好按 projectId 分开保存。',
    files: ['src/theme.tsx', 'src/theme/hooks.tsx', 'src/i18n/i18n.js'],
    note: '支持明暗、系统主题、紧凑模式和布局配置；不会把业务数据写入主题存储。',
  },
  router: {
    title: '路由与导航',
    subtitle: 'Hash Router · 路由归一化',
    category: 'application',
    description:
      'React Router 7 将项目路由、公开页、错误页和模块路由组合；菜单、全局搜索与面包屑从实际路由和策略推导。',
    files: [
      'src/app/routing/index.tsx',
      'src/platform/navigation/routes.tsx',
      'src/app/layouts/navigation/useNavigation.ts',
    ],
    note: '路由结构由模块声明；标题、菜单位置和权限策略集中在 route-policy.json。',
  },
  modules: {
    title: '业务模块契约',
    subtitle: 'routes · resources · Provider',
    category: 'platform',
    description:
      '静态模块契约 v2 声明路由、资源、Provider、依赖和 Header 插槽，注册时校验能力、宿主版本范围、迁移与卸载声明、重复路由及精确权限。',
    files: ['src/platform/modules/index.tsx', 'src/app/modules/default.ts', 'src/projects/enterprise/modules.ts'],
    note: 'default 装配组织管理和通知；enterprise 只装配组织管理。清单随宿主编译，不会自动执行数据迁移。',
  },
  layout: {
    title: '应用布局',
    subtitle: '导航 · Tabs · KeepAlive',
    category: 'application',
    description: 'Header、侧栏、次级导航、内容区和多标签容器构成后台工作台；KeepAlive 在当前应用根内缓存页面。',
    files: ['src/app/layouts/index.tsx', 'src/app/layouts/proTabs/index.tsx', 'src/platform/keep-alive/index.tsx'],
    note: '标签列表只保存在当前页面会话；KeepAlive 有容量限制，不是永久草稿存储。',
  },
  state: {
    title: '状态与生命周期',
    subtitle: 'Zustand · SessionScope',
    category: 'platform',
    description:
      '每个应用根创建独立 Zustand Store。SessionScope 在凭据或租户变化时重建页面树和业务 Provider，隔离旧身份状态。',
    files: ['src/app/model/index.tsx', 'src/app/bootstrap/SessionScope.tsx', 'src/platform/keep-alive/index.tsx'],
    note: '壳 Store 只持久化侧栏偏好；业务记录、身份、断点和标签页不写入该 Store。',
  },
  session: {
    title: '身份会话',
    subtitle: '演示 / GitHub / 企业登录',
    category: 'platform',
    description:
      '身份模型识别演示、GitHub OAuth 与企业会话；企业身份支持多组织成员关系和活动组织切换，并同步更新权限与数据作用域。',
    files: [
      'src/platform/auth/model/session.ts',
      'src/platform/auth/services/authService.ts',
      'api/enterprise/service.mts',
    ],
    note: '同源仍只支持一个活动身份，不提供多身份并行工作区。',
  },
  permissions: {
    title: '权限快照',
    subtitle: 'PermissionService',
    category: 'platform',
    description: 'PermissionService 维护与身份绑定的缓存和订阅快照；路由、菜单与按钮通过相同授权状态响应刷新和撤权。',
    files: ['src/platform/auth/services/permissionService.ts', 'src/platform/auth/hooks/usePermission.ts'],
    note: '前端权限控制负责用户体验；真实企业资源的最终授权在服务端执行。',
  },
  policy: {
    title: '路由策略',
    subtitle: '路径 · 菜单 · 权限',
    category: 'workspace',
    description: 'route-policy.json 统一维护路径权限、标题、翻译键、菜单层级与排序；应用只显示已注册且获授权的页面。',
    files: ['config/route-policy.json', 'src/platform/auth/model/policy.ts', 'src/app/routing/routeRegistry.ts'],
    note: '未知路径需要显式授权；宽泛的 routes grant 不覆盖精确路径策略。',
  },
  guards: {
    title: '守卫与组件权限',
    subtitle: '路由 · 菜单 · 按钮',
    category: 'application',
    description: '认证路由守卫读取权限快照；导航过滤与 PermissionGuard 等组件约束保持同步。',
    files: [
      'src/app/routing/shared/AuthRouterBase.tsx',
      'src/platform/auth/components/PermissionGuard.tsx',
      'src/platform/navigation/menu.ts',
    ],
    note: '守卫不替代后端校验；企业 API 每次按服务端会话重新确认账号和角色。',
  },
  features: {
    title: '领域功能',
    subtitle: 'pages · api · model · hooks',
    category: 'application',
    description: '组织管理与通知按领域组织。管理模块提供用户、角色和审计页面；展示应用还保留按需加载的演示页面。',
    files: ['src/features/administration', 'src/features/notifications', 'src/pages'],
    note: '通知目前使用应用实例内的内存 Store，并非独立通知后端。',
  },
  provider: {
    title: '资源访问契约',
    subtitle: '分页 · 查询 · CRUD',
    category: 'platform',
    description:
      'DataProvider 定义列表、单条、增删改、取消与资源解析；管理模块按配置选择演示 Provider 或 REST Provider。',
    files: ['src/platform/data/provider.ts', 'src/features/administration/model/AdministrationProvider.tsx'],
    note: '领域 parser 在接入层校验响应，页面不直接依赖接口形状。',
  },
  demo: {
    title: '演示数据',
    subtitle: 'REACT_APP_USE_MOCK=true',
    category: 'service',
    description: '演示授权开启时，管理功能使用应用实例内的 demo Provider，便于本地探索用户与角色流程。',
    files: ['src/features/administration/api/demoProvider.ts', 'src/platform/auth/mocks/permission.ts'],
    note: '演示数据不等于真实企业后端；真实部署应明确关闭 mock 模式。',
  },
  cache: {
    title: '会话内资源缓存',
    subtitle: '15s TTL · 失效通知',
    category: 'platform',
    description: '管理资源缓存按当前会话创建，支持同键请求共享、独立取消、写入失效及身份变化后的旧结果丢弃。',
    files: [
      'src/platform/data/cache.ts',
      'src/platform/data/resourceEvents.ts',
      'src/features/administration/model/AdministrationProvider.tsx',
    ],
    note: '最多保留 100 项；企业模式接收 WebSocket 资源失效通知，但无后台刷新、乐观更新或记录内容订阅，其他 feature 尚未统一接入。',
  },
  transport: {
    title: 'HTTP 请求层',
    subtitle: 'Axios / fetch · 会话头',
    category: 'platform',
    description: '共享客户端与请求工具处理基础 URL、凭据、取消、响应与错误；REST Provider 通过此层调用管理资源接口。',
    files: ['src/platform/api/client.ts', 'src/platform/api/request.js', 'src/platform/api/core/response.ts'],
    note: '浏览器 API 地址由 APP_BASE_URL 或同源路径决定，开发环境可通过 Webpack 代理接到本地服务。',
  },
  enterpriseApi: {
    title: '企业业务 API',
    subtitle: 'Express · 条件启用',
    category: 'service',
    description:
      'ENTERPRISE_ENABLED=true 时挂载登录、会话、权限、用户、角色、只读审计与资源失效 WebSocket；未启用时不把演示数据冒充真实服务。',
    files: ['api/server.js', 'api/enterprise/router.cjs', 'api/enterprise/events.cjs'],
    note: '服务端执行租户过滤、RBAC 和事务审计；WebSocket 事件日志保存在单实例进程内。',
  },
  database: {
    title: '持久化与审计',
    subtitle: 'Node 24 SQLite',
    category: 'service',
    description: '企业服务使用 node:sqlite 保存租户账号、用户、角色和会话，业务写入与追加式审计在事务中提交。',
    files: ['api/enterprise/store.mts', 'api/enterprise/runtime.cjs'],
    note: '生产要求持久化 ENTERPRISE_DB_PATH；SQLite 当前定位于单实例部署。',
  },
  default: {
    title: 'default 展示应用',
    subtitle: '完整演示路由',
    category: 'application',
    description: '默认入口保留管理模块、通知模块和可视化、编辑器、构建等演示页，产出 dist/。',
    files: ['src/index.tsx', 'src/app/routing/index.tsx', 'src/app/modules/default.ts'],
    note: '展示应用提供广泛样例，不等同于企业入口的精简生产路由树。',
  },
  enterprise: {
    title: 'enterprise 应用',
    subtitle: '精简管理入口',
    category: 'application',
    description:
      '企业入口只装配工作台、用户、角色、审计、认证和错误页面；使用独立路由、状态命名空间与 dist-enterprise/。',
    files: [
      'src/projects/enterprise/index.tsx',
      'src/projects/enterprise/routers/index.tsx',
      'src/projects/enterprise/modules.ts',
    ],
    note: '可在 demo Provider 和真实企业 API 间切换；后者需独立配置并部署。',
  },
  shell: {
    title: 'shell Host',
    subtitle: 'Module Federation Host',
    category: 'application',
    description: 'Shell 提供宿主入口，在 /projectA 与 /projectB 懒加载 Remote，保留自己的路由和错误边界。',
    files: ['src/projects/shell/routers/index.tsx', 'src/projects/shell/pages/RemoteApp.tsx'],
    note: 'Remote 复用宿主 Router，但拥有自己的 Store 和 KeepAlive 生命周期。',
  },
  remotes: {
    title: 'ProjectA / ProjectB',
    subtitle: '独立运行 · Remote 暴露',
    category: 'application',
    description: '两个项目既可单独构建，也可暴露 MFE App 供 Shell 加载；构建生成 remoteEntry.js 与 manifest。',
    files: ['src/projects/projectA/mfe/App.tsx', 'src/projects/projectB/mfe/App.tsx', 'build/webpack/mfe.config.js'],
    note: '这是可运行的联邦示例；不应理解为企业业务已经拆成远程微服务。',
  },
  mfeBridge: {
    title: '联邦契约与桥接',
    subtitle: 'manifest · shared deps',
    category: 'platform',
    description:
      'Loader 验证 Remote manifest 和共享依赖版本后注入入口；宿主与 Remote 的消息桥检查来源，示例共享消息经类型化解析。',
    files: ['config/mfe-contract.mjs', 'build/webpack/mfe.config.js', 'src/platform/mfe/bridge.ts'],
    note: '联邦不提供权限或样式沙箱，不可信子应用需要独立 origin 或 iframe。',
  },
  library: {
    title: '@w.ui/wui-react',
    subtitle: '独立发布 UI 包',
    category: 'platform',
    description:
      '独立组件包公开子路径与 CSS，Webpack 输出 ESM/CJS，TypeScript 生成声明；应用开发时通过 @wui 源码别名消费。',
    files: ['packages/wui-react/package.json', 'build/webpack/webpack.lib.js', 'config/library-contract.mjs'],
    note: '发布前另有包结构、消费者 smoke 与体积校验，不依赖应用 dist。',
  },
  storybook: {
    title: 'Storybook',
    subtitle: '应用 + UI 包预览',
    category: 'delivery',
    description:
      'Storybook 10 使用独立 Webpack 5 builder，直接编译 src 与 wui-react 邻近 stories/MDX，预览层装配主题与应用上下文。',
    files: ['.storybook/main.ts', '.storybook/preview.tsx', 'scripts/validate-stories.mjs'],
    note: 'Stories 索引检查只验证覆盖与构建，不代替浏览器视觉检查。',
  },
  quality: {
    title: '质量门禁',
    subtitle: '契约 · 类型 · 测试 · 预算',
    category: 'delivery',
    description:
      'GitHub Actions 分别覆盖默认应用、企业演示、真实企业 API、微前端、Storybook 和组件库；校验路由/导入/项目契约、类型、构建、预算与浏览器流程。',
    files: ['.github/workflows/build-ci.yml', 'config/bundle-budget.json', 'scripts/check-import-boundaries.mjs'],
    note: '根应用仍在逐步收紧类型边界；CI 与本地 pnpm run ci:quality 的命令集合并不完全相同。',
  },
  artifacts: {
    title: '构建产物',
    subtitle: 'dist* · storybook-static',
    category: 'delivery',
    description:
      '项目注册表决定独立 dist 目录；联邦构建还输出 Remote manifest，组件库产出 ESM/CJS/types，Storybook 产出静态站点。',
    files: ['src/projects/registry.json', 'build/webpack/paths.js', 'scripts/build-mfe.mjs'],
    note: '版本文件、内容哈希资源与 manifest 有不同缓存策略，避免发布后入口引用旧 chunk。',
  },
  staticHosting: {
    title: '静态交付',
    subtitle: 'Pages · Vercel · Nginx',
    category: 'delivery',
    description:
      '默认应用、企业前端、微前端与 Storybook 可按目标组合为静态产物；GitHub Pages、Vercel 与 Nginx 镜像提供多种托管方式。',
    files: ['.github/workflows/deploy-gh-pages.yml', 'scripts/build-pages.mjs', 'deploy/Dockerfile'],
    note: '静态托管不会自动提供企业 API 或 SQLite 持久化。',
  },
  apiHosting: {
    title: '企业 API 部署',
    subtitle: 'Caddy · Express · 持久卷',
    category: 'delivery',
    description: '真实企业 API 需单独部署，Compose 示例使用 Caddy 提供 HTTPS、Express 服务和 SQLite 持久卷。',
    files: ['compose.enterprise.yaml', 'deploy/enterprise/Dockerfile', 'docs/deployment/DEPLOY.md'],
    note: '这是单实例服务边界；Vercel 静态目标不承载该 SQLite API。',
  },
  observability: {
    title: '运行观测',
    subtitle: 'Tracking · Sentry · PWA',
    category: 'platform',
    description:
      '默认入口接入开发态埋点与 PWA；生产 Sentry 需 DSN 才动态加载，Vercel Insights 仅在检测到托管脚本后启用。',
    files: ['src/index.tsx', 'src/app/bootstrap/renderApp.tsx', 'src/platform/tracking', 'src/platform/pwa'],
    note: 'Tracking 服务与企业 API 是两个不同边界；生产埋点存储另需配置 MongoDB。',
  },
}

export const viteArchitectureNodes: Record<ArchitectureNodeId, ArchitectureNode> = {
  ...architectureNodes,
  build: {
    title: 'Vite 8 构建',
    subtitle: '应用 · 联邦 · 组件库',
    category: 'delivery',
    description: '应用使用 build/vite/app.config.ts 和项目注册表选择入口；组件库、Storybook 分别使用独立的 Vite 配置。',
    files: ['build/vite/app.config.ts', 'build/vite/index.html', 'build/vite/lib.config.ts'],
    note: '开发使用 Vite HMR 与 React Fast Refresh；生产输出哈希资源、压缩文件、版本文件和 Serwist Service Worker。',
  },
  transport: {
    ...architectureNodes.transport,
    note: '浏览器 API 地址由 APP_BASE_URL 或同源路径决定，开发环境可通过 Vite 代理接到本地服务。',
  },
  remotes: {
    ...architectureNodes.remotes,
    files: ['src/projects/projectA/mfe/App.tsx', 'src/projects/projectB/mfe/App.tsx', 'build/module-federation.ts'],
  },
  mfeBridge: {
    ...architectureNodes.mfeBridge,
    files: ['config/mfe-contract.mjs', 'build/module-federation.ts', 'src/platform/mfe/bridge.ts'],
  },
  library: {
    ...architectureNodes.library,
    description:
      '独立组件包公开子路径与 CSS，Vite 输出 ESM/CJS，TypeScript 生成声明；应用开发时通过 @wui 源码别名消费。',
    files: ['packages/wui-react/package.json', 'build/vite/lib.config.ts', 'config/library-contract.mjs'],
  },
  storybook: {
    ...architectureNodes.storybook,
    description:
      'Storybook 10 使用独立 Vite builder，直接编译 src 与 wui-react 邻近 stories/MDX，预览层装配主题与应用上下文。',
    files: ['.storybook/vite/main.ts', '.storybook/vite.config.ts', 'scripts/validate-stories.mjs'],
  },
  artifacts: {
    ...architectureNodes.artifacts,
    subtitle: 'dist-vite* · storybook-static-vite',
    files: ['src/projects/registry.json', 'build/vite/app.config.ts', 'scripts/build-mfe.mjs'],
  },
}

const at = (id: ArchitectureNodeId, column: number, row: number): PlacedNode => ({
  id,
  x: 28 + column * 268,
  y: 24 + row * 164,
})

export const architectureViews: readonly ArchitectureView[] = [
  {
    id: 'overview',
    title: '系统总览',
    summary: '从项目选择到应用装配、领域能力、服务与交付的真实依赖关系。',
    nodes: [
      at('registry', 0, 0),
      at('build', 1, 0),
      at('artifacts', 2, 0),
      at('staticHosting', 3, 0),
      at('entry', 0, 1),
      at('root', 1, 1),
      at('router', 2, 1),
      at('modules', 3, 1),
      at('library', 0, 2),
      at('state', 1, 2),
      at('features', 2, 2),
      at('provider', 3, 2),
      at('quality', 0, 3),
      at('session', 1, 3),
      at('enterpriseApi', 2, 3),
      at('database', 3, 3),
    ],
    edges: [
      ['registry', 'build'],
      ['build', 'artifacts'],
      ['artifacts', 'staticHosting'],
      ['entry', 'root'],
      ['root', 'router'],
      ['root', 'state'],
      ['router', 'modules'],
      ['modules', 'features'],
      ['features', 'provider'],
      ['library', 'root'],
      ['session', 'state'],
      ['provider', 'enterpriseApi'],
      ['enterpriseApi', 'database'],
      ['quality', 'build'],
    ],
  },
  {
    id: 'runtime',
    title: '应用运行时',
    summary: '入口、根 Provider、路由、布局和业务模块在浏览器中的装配顺序。',
    nodes: [
      at('entry', 0, 0),
      at('root', 1, 0),
      at('theme', 2, 0),
      at('router', 3, 0),
      at('session', 0, 1),
      at('state', 1, 1),
      at('layout', 2, 1),
      at('modules', 3, 1),
      at('observability', 0, 2),
      at('library', 1, 2),
      at('features', 2, 2),
      at('provider', 3, 2),
    ],
    edges: [
      ['entry', 'root'],
      ['root', 'theme'],
      ['theme', 'router'],
      ['root', 'state'],
      ['session', 'state'],
      ['router', 'modules'],
      ['layout', 'features'],
      ['modules', 'features'],
      ['features', 'provider'],
      ['library', 'layout'],
      ['entry', 'observability'],
    ],
  },
  {
    id: 'access',
    title: '权限与数据',
    summary: '前端授权体验与服务端强制授权分层；演示数据和真实 API 明确分流。',
    nodes: [
      at('session', 0, 0),
      at('permissions', 1, 0),
      at('policy', 2, 0),
      at('guards', 3, 0),
      at('features', 0, 1),
      at('demo', 1, 1),
      at('provider', 2, 1),
      at('enterpriseApi', 3, 1),
      at('cache', 1, 2),
      at('transport', 2, 2),
      at('database', 3, 2),
    ],
    edges: [
      ['session', 'permissions'],
      ['permissions', 'policy'],
      ['policy', 'guards'],
      ['guards', 'features'],
      ['features', 'provider'],
      ['provider', 'demo'],
      ['provider', 'cache'],
      ['cache', 'transport'],
      ['transport', 'enterpriseApi'],
      ['enterpriseApi', 'database'],
    ],
  },
  {
    id: 'projects',
    title: '多项目与联邦',
    summary: '五个独立入口共享底座；Shell 通过经过校验的契约加载 ProjectA / ProjectB。',
    nodes: [
      at('registry', 0, 1),
      at('build', 1, 1),
      at('default', 2, 0),
      at('enterprise', 2, 1),
      at('shell', 2, 2),
      at('library', 3, 0),
      at('enterpriseApi', 3, 1),
      at('remotes', 3, 2),
      at('mfeBridge', 1, 2),
    ],
    edges: [
      ['registry', 'build'],
      ['build', 'default'],
      ['build', 'enterprise'],
      ['build', 'shell'],
      ['shell', 'remotes'],
      ['mfeBridge', 'remotes'],
      ['enterprise', 'enterpriseApi'],
      ['library', 'default'],
    ],
  },
  {
    id: 'delivery',
    title: '工程交付',
    summary: '同一工作区形成应用、联邦、组件库和文档产物，并经过分目标门禁。',
    nodes: [
      at('workspace', 0, 0),
      at('registry', 1, 0),
      at('build', 2, 0),
      at('artifacts', 3, 0),
      at('quality', 0, 1),
      at('library', 1, 1),
      at('storybook', 2, 1),
      at('staticHosting', 3, 1),
      at('provider', 0, 2),
      at('enterpriseApi', 1, 2),
      at('database', 2, 2),
      at('apiHosting', 3, 2),
    ],
    edges: [
      ['workspace', 'registry'],
      ['registry', 'build'],
      ['build', 'artifacts'],
      ['quality', 'build'],
      ['library', 'storybook'],
      ['storybook', 'artifacts'],
      ['artifacts', 'staticHosting'],
      ['provider', 'enterpriseApi'],
      ['enterpriseApi', 'database'],
      ['database', 'apiHosting'],
    ],
  },
]
