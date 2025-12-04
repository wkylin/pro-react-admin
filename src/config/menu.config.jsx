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
import { t } from 'i18next' // 注意：这里可能需要处理 i18n

// 静态菜单配置
// 这里的 key 对应路由 path
const rawMainLayoutMenu = [
  { label: 'home', i18nKey: 'home', key: '/', icon: <HomeOutlined /> },
  { label: 'demo', i18nKey: 'demo', key: '/demo', icon: <GlobalOutlined /> },
  { label: 'Motion', key: '/motion', icon: <RocketOutlined /> },
  { label: 'Business', key: '/business', icon: <BankOutlined /> },
  { label: 'Big Screen', key: '/big-screen', icon: <FundProjectionScreenOutlined /> },
  { label: 'PH Bar', key: '/ph-bar', icon: <BarChartOutlined /> },
  { label: 'Qr Generate', key: '/qrcode', icon: <QrcodeOutlined /> },
  { label: 'Prism Render', key: '/prism', icon: <HighlightOutlined /> },
  { label: 'React Tilt', key: '/tilt', icon: <ExperimentOutlined /> },
  { label: 'Music', key: '/music', icon: <SoundOutlined /> },
  { label: 'Crypto', key: '/crypto', icon: <LockOutlined /> },
  { label: 'Video', key: '/video', icon: <VideoCameraOutlined /> },
  { label: 'Echarts', key: '/echarts', icon: <PieChartOutlined /> },
  { label: 'ChatGPT', key: '/markmap', icon: <RobotOutlined /> },
  { label: 'Mermaid', key: '/mermaid', icon: <ProjectOutlined /> },
  { label: 'Post Message', key: '/postmessage', icon: <SendOutlined /> },
  { label: 'Geo Chart', key: '/geo', icon: <EnvironmentOutlined /> },
  { label: 'D3 Chart', key: '/d3-chart', icon: <DotChartOutlined /> },
  { label: 'Print', key: '/print', icon: <PrinterOutlined /> },
  { label: 'Profile', key: '/profile', icon: <UserOutlined /> },
  { label: 'Contact', key: '/contact', icon: <ContactsOutlined /> },
  {
    label: '前端技术栈',
    key: '/tech/frontend',
    icon: <DeploymentUnitOutlined />,
    children: [
      { label: 'React', key: '/tech/frontend/react', icon: <CodeOutlined /> },
      {
        label: 'Vue',
        key: '/tech/frontend/vue',
        icon: <CodeOutlined />,
        children: [
          {
            label: 'Vue 插件',
            key: '/tech/frontend/plugins',
            icon: <AppstoreOutlined />,
            children: [
              { label: 'Vue3 API', key: '/tech/frontend/plugins/vue3', icon: <FileTextOutlined /> },
              { label: '性能优化', key: '/tech/frontend/plugins/perf', icon: <ThunderboltOutlined /> }
            ]
          }
        ]
      },
      { label: 'Angular', key: '/tech/frontend/angular', icon: <Html5Outlined /> },
      { label: 'Node', key: '/tech/frontend/node', icon: <CloudServerOutlined /> }
    ]
  },
  {
    label: '后端技术栈',
    key: '/tech/backend',
    icon: <CloudServerOutlined />,
    children: [
      { label: 'Node', key: '/tech/backend/node', icon: <CodeOutlined /> },
      { label: 'Java', key: '/tech/backend/java', icon: <CodeOutlined /> },
      { label: 'Go', key: '/tech/backend/go', icon: <CodeOutlined /> }
    ]
  },
  {
    label: '构建工具',
    key: '/build',
    icon: <ApartmentOutlined />,
    children: [
      { label: 'Webpack', key: '/build/webpack', icon: <ToolOutlined /> },
      { label: 'Vite', key: '/build/vite', icon: <ThunderboltOutlined /> }
    ]
  },
  {
    label: 'Error',
    key: '/sub-error',
    icon: <QuestionCircleOutlined />,
    children: [{ label: 'ErrorBoundary', key: '/error' }]
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
