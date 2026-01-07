import React from 'react'
import {
  HomeOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  ApartmentOutlined,
  QuestionCircleOutlined,
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
  ToolOutlined,
} from '@ant-design/icons'

// 静态菜单配置
// 这里的 path 对应路由 path
const rawMainLayoutMenu = [
  { label: 'home', i18nKey: 'home', path: '/', icon: <HomeOutlined /> },
  { label: 'demo', i18nKey: 'demo', path: '/demo', icon: <GlobalOutlined /> },
  {
    label: 'SVG Viewer',
    i18nKey: 'menu.svgViewer',
    path: '/svg-viewer',
    icon: <HeatMapOutlined />,
  },
  {
    label: 'Zustand演示',
    i18nKey: 'menu.zustand',
    path: '/zustand',
    icon: <ThunderboltOutlined />,
  },
  {
    label: 'Motion',
    i18nKey: 'menu.motion',
    path: '/motion',
    icon: <RocketOutlined />,
  },
  {
    label: 'Mermaid',
    i18nKey: 'menu.mermaid',
    path: '/mermaid',
    icon: <ProjectOutlined />,
  },
  {
    label: 'Topology',
    i18nKey: 'menu.topology',
    path: '/topology',
    icon: <DeploymentUnitOutlined />,
  },
  {
    label: '权限示例',
    i18nKey: 'menu.permissionExample',
    path: '/permission',
    icon: <LockOutlined />,
  },
  {
    label: 'PH Bar',
    i18nKey: 'menu.phBar',
    path: '/ph-bar',
    icon: <BarChartOutlined />,
  },
  {
    label: 'ChatGPT',
    i18nKey: 'menu.chatgpt',
    path: '/chatgpt',
    icon: <RobotOutlined />,
  },
  {
    label: 'React Tilt',
    i18nKey: 'menu.reactTilt',
    path: '/tilt',
    icon: <ExperimentOutlined />,
  },
  {
    label: 'Music',
    i18nKey: 'menu.music',
    path: '/music',
    icon: <SoundOutlined />,
  },
  {
    label: 'Crypto',
    i18nKey: 'menu.crypto',
    path: '/crypto',
    icon: <LockOutlined />,
  },
  {
    label: 'Video',
    i18nKey: 'menu.video',
    path: '/video',
    icon: <VideoCameraOutlined />,
  },
  {
    label: 'Big Screen',
    i18nKey: 'menu.bigScreen',
    path: '/big-screen',
    icon: <FundProjectionScreenOutlined />,
  },
  {
    label: 'Echarts',
    i18nKey: 'menu.echarts',
    path: '/echarts',
    icon: <PieChartOutlined />,
  },
  {
    label: 'Qr Generate',
    i18nKey: 'menu.qrGenerate',
    path: '/qrcode',
    icon: <QrcodeOutlined />,
  },
  {
    label: 'Business',
    i18nKey: 'menu.business',
    path: '/business',
    icon: <BankOutlined />,
  },
  {
    label: 'Prism Render',
    i18nKey: 'menu.prismRender',
    path: '/prism',
    icon: <HighlightOutlined />,
  },
  {
    label: 'Post Message',
    i18nKey: 'menu.postMessage',
    path: '/postmessage',
    icon: <SendOutlined />,
  },
  {
    label: 'Geo Chart',
    i18nKey: 'menu.geoChart',
    path: '/geo',
    icon: <EnvironmentOutlined />,
  },
  {
    label: 'Print',
    i18nKey: 'menu.print',
    path: '/print',
    icon: <PrinterOutlined />,
  },
  {
    label: 'Profile',
    i18nKey: 'menu.profile',
    path: '/profile',
    icon: <UserOutlined />,
  },
  {
    label: 'Contact',
    i18nKey: 'menu.contact',
    path: '/contact',
    icon: <ContactsOutlined />,
  },
  {
    label: '前端技术栈',
    i18nKey: 'menu.frontendTechStack',
    path: '/tech/frontend',
    icon: <DeploymentUnitOutlined />,
    children: [
      {
        label: 'React',
        i18nKey: 'menu.react',
        path: '/tech/frontend/react',
        icon: <CodeOutlined />,
      },
      {
        label: 'Vue',
        i18nKey: 'menu.vue',
        path: '/tech/frontend/vue',
        icon: <CodeOutlined />,
        children: [
          {
            label: 'Vue 插件',
            i18nKey: 'menu.vuePlugins',
            path: '/tech/frontend/plugins',
            icon: <AppstoreOutlined />,
            children: [
              {
                label: 'Vue3 API',
                i18nKey: 'menu.vue3Api',
                path: '/tech/frontend/plugins/vue3',
                icon: <FileTextOutlined />,
              },
              {
                label: '性能优化',
                i18nKey: 'menu.performanceOptimization',
                path: '/tech/frontend/plugins/perf',
                icon: <ThunderboltOutlined />,
              },
            ],
          },
        ],
      },
      {
        label: 'Angular',
        i18nKey: 'menu.angular',
        path: '/tech/frontend/angular',
        icon: <Html5Outlined />,
      },
      {
        label: 'Node',
        i18nKey: 'menu.node',
        path: '/tech/frontend/node',
        icon: <CloudServerOutlined />,
      },
    ],
  },
  {
    label: '后端技术栈',
    i18nKey: 'menu.backendTechStack',
    path: '/tech/backend',
    icon: <CloudServerOutlined />,
    children: [
      {
        label: 'Node',
        i18nKey: 'menu.node',
        path: '/tech/backend/node',
        icon: <CodeOutlined />,
      },
      {
        label: 'Java',
        i18nKey: 'menu.java',
        path: '/tech/backend/java',
        icon: <CodeOutlined />,
      },
      {
        label: 'Go',
        i18nKey: 'menu.go',
        path: '/tech/backend/go',
        icon: <CodeOutlined />,
      },
    ],
  },
  {
    label: '构建工具',
    i18nKey: 'menu.buildTools',
    path: '/build',
    icon: <ApartmentOutlined />,
    children: [
      {
        label: 'Webpack',
        i18nKey: 'menu.webpack',
        path: '/build/webpack',
        icon: <ToolOutlined />,
      },
      {
        label: 'Vite',
        i18nKey: 'menu.vite',
        path: '/build/vite',
        icon: <ThunderboltOutlined />,
      },
    ],
  },

  {
    label: 'Error',
    i18nKey: 'menu.error',
    path: '/sub-error',
    icon: <QuestionCircleOutlined />,
    children: [{ label: 'ErrorBoundary', i18nKey: 'menu.errorBoundary', path: '/error' }],
  },
]

// 规范化菜单：确保同时存在 path 和 key（两者值一致）
function normalizeMenu(items) {
  return items.map((it) => {
    const { children, ...rest } = it
    const path = it.path || it.key
    // Ant Design Menu 需要 key 属性
    const normalized = { ...rest, path, key: it.key || path }
    if (children && Array.isArray(children)) {
      normalized.children = normalizeMenu(children)
    }
    return normalized
  })
}

export const mainLayoutMenu = normalizeMenu(rawMainLayoutMenu)
