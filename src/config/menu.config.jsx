import React from 'react'
import {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
  FireOutlined,
  GlobalOutlined,
  QrcodeOutlined,
  RocketOutlined,
  BankOutlined,
  FundProjectionScreenOutlined,
  BarChartOutlined,
  HighlightOutlined,
  ExperimentOutlined,
  SoundOutlined,
  LockOutlined,
  VideoCameraOutlined,
  PieChartOutlined,
  RobotOutlined,
  SendOutlined,
  EnvironmentOutlined,
  DotChartOutlined,
  PrinterOutlined,
  UserOutlined,
  ContactsOutlined,
  Html5Outlined,
  CloudServerOutlined,
  AppstoreOutlined,
  CodeOutlined,
  ProjectOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  ToolOutlined
} from '@ant-design/icons'

// 静态菜单配置
// 这里的 key 对应路由 path
const rawMainLayoutMenu = [
  { label: 'home', i18nKey: 'home', key: '/', icon: <HomeOutlined /> },
  { label: 'demo', i18nKey: 'demo', key: '/demo', icon: <GlobalOutlined /> },
  { label: 'Motion', i18nKey: 'menu.motion', key: '/motion', icon: <RocketOutlined /> },
  { label: 'Mermaid', i18nKey: 'menu.mermaid', key: '/mermaid', icon: <ProjectOutlined /> },
  { label: 'Topology', i18nKey: 'menu.topology', key: '/topology', icon: <DeploymentUnitOutlined /> },
  { label: '权限示例', i18nKey: 'menu.permissionExample', key: '/permission', icon: <LockOutlined /> },
  { label: 'PH Bar', i18nKey: 'menu.phBar', key: '/ph-bar', icon: <BarChartOutlined /> },
  { label: 'ChatGPT', i18nKey: 'menu.chatgpt', key: '/markmap', icon: <RobotOutlined /> },
  { label: 'React Tilt', i18nKey: 'menu.reactTilt', key: '/tilt', icon: <ExperimentOutlined /> },
  { label: 'Music', i18nKey: 'menu.music', key: '/music', icon: <SoundOutlined /> },
  { label: 'Crypto', i18nKey: 'menu.crypto', key: '/crypto', icon: <LockOutlined /> },
  { label: 'Video', i18nKey: 'menu.video', key: '/video', icon: <VideoCameraOutlined /> },
  { label: 'Big Screen', i18nKey: 'menu.bigScreen', key: '/big-screen', icon: <FundProjectionScreenOutlined /> },
  { label: 'Echarts', i18nKey: 'menu.echarts', key: '/echarts', icon: <PieChartOutlined /> },
  { label: 'Qr Generate', i18nKey: 'menu.qrGenerate', key: '/qrcode', icon: <QrcodeOutlined /> },
  { label: 'Business', i18nKey: 'menu.business', key: '/business', icon: <BankOutlined /> },
  { label: 'Prism Render', i18nKey: 'menu.prismRender', key: '/prism', icon: <HighlightOutlined /> },
  { label: 'Post Message', i18nKey: 'menu.postMessage', key: '/postmessage', icon: <SendOutlined /> },
  { label: 'Geo Chart', i18nKey: 'menu.geoChart', key: '/geo', icon: <EnvironmentOutlined /> },
  { label: 'D3 Chart', i18nKey: 'menu.d3Chart', key: '/d3-chart', icon: <DotChartOutlined /> },
  { label: 'Print', i18nKey: 'menu.print', key: '/print', icon: <PrinterOutlined /> },
  { label: 'Profile', i18nKey: 'menu.profile', key: '/profile', icon: <UserOutlined /> },
  { label: 'Contact', i18nKey: 'menu.contact', key: '/contact', icon: <ContactsOutlined /> },
  {
    label: '前端技术栈',
    i18nKey: 'menu.frontendTechStack',
    key: '/tech/frontend',
    icon: <DeploymentUnitOutlined />,
    children: [
      { label: 'React', i18nKey: 'menu.react', key: '/tech/frontend/react', icon: <CodeOutlined /> },
      {
        label: 'Vue',
        i18nKey: 'menu.vue',
        key: '/tech/frontend/vue',
        icon: <CodeOutlined />,
        children: [
          {
            label: 'Vue 插件',
            i18nKey: 'menu.vuePlugins',
            key: '/tech/frontend/plugins',
            icon: <AppstoreOutlined />,
            children: [
              {
                label: 'Vue3 API',
                i18nKey: 'menu.vue3Api',
                key: '/tech/frontend/plugins/vue3',
                icon: <FileTextOutlined />
              },
              {
                label: '性能优化',
                i18nKey: 'menu.performanceOptimization',
                key: '/tech/frontend/plugins/perf',
                icon: <ThunderboltOutlined />
              }
            ]
          }
        ]
      },
      { label: 'Angular', i18nKey: 'menu.angular', key: '/tech/frontend/angular', icon: <Html5Outlined /> },
      { label: 'Node', i18nKey: 'menu.node', key: '/tech/frontend/node', icon: <CloudServerOutlined /> }
    ]
  },
  {
    label: '后端技术栈',
    i18nKey: 'menu.backendTechStack',
    key: '/tech/backend',
    icon: <CloudServerOutlined />,
    children: [
      { label: 'Node', i18nKey: 'menu.node', key: '/tech/backend/node', icon: <CodeOutlined /> },
      { label: 'Java', i18nKey: 'menu.java', key: '/tech/backend/java', icon: <CodeOutlined /> },
      { label: 'Go', i18nKey: 'menu.go', key: '/tech/backend/go', icon: <CodeOutlined /> }
    ]
  },
  {
    label: '构建工具',
    i18nKey: 'menu.buildTools',
    key: '/build',
    icon: <ApartmentOutlined />,
    children: [
      { label: 'Webpack', i18nKey: 'menu.webpack', key: '/build/webpack', icon: <ToolOutlined /> },
      { label: 'Vite', i18nKey: 'menu.vite', key: '/build/vite', icon: <ThunderboltOutlined /> }
    ]
  },

  {
    label: 'Error',
    i18nKey: 'menu.error',
    key: '/sub-error',
    icon: <QuestionCircleOutlined />,
    children: [{ label: 'ErrorBoundary', i18nKey: 'menu.errorBoundary', key: '/error' }]
  }
]

// 规范化菜单：为每个项保证存在 `path` 字段（优先使用已有 path，否则复制 key）。
function normalizeMenu (items) {
  return items.map((it) => {
    const { children, ...rest } = it
    const normalized = { ...rest, path: (it && it.path) || it.key }
    if (children && Array.isArray(children)) {
      normalized.children = normalizeMenu(children)
    }
    return normalized
  })
}

export const mainLayoutMenu = normalizeMenu(rawMainLayoutMenu)
