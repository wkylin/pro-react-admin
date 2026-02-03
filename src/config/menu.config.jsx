import AnimatedIcon from '@stateless/AnimatedIcon'
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
  CloudUploadOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  NodeIndexOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'

// 静态菜单配置
// 这里的 path 对应路由 path
const rawMainLayoutMenu = [
  {
    label: 'home',
    i18nKey: 'home',
    path: '/',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <HomeOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'demo',
    i18nKey: 'demo',
    path: '/demo',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <GlobalOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'SVG Viewer',
    i18nKey: 'menu.svgViewer',
    path: '/svg-viewer',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <HeatMapOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: '自动部署',
    i18nKey: 'menu.autoDeploy',
    path: '/auto-deploy',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <CloudUploadOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Text Editor',
    i18nKey: 'menu.textEditor',
    path: '/text-editor',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <FileTextOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Zustand演示',
    i18nKey: 'menu.zustand',
    path: '/zustand',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <DatabaseOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Deploy Flow',
    i18nKey: 'menu.deployFlow',
    path: '/deploy-flow',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <RocketOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Motion',
    i18nKey: 'menu.motion',
    path: '/motion',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <PlayCircleOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Mermaid',
    i18nKey: 'menu.mermaid',
    path: '/mermaid',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <ProjectOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Topology',
    i18nKey: 'menu.topology',
    path: '/topology',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <DeploymentUnitOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: '权限示例',
    i18nKey: 'menu.permissionExample',
    path: '/permission',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <LockOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'PH Bar',
    i18nKey: 'menu.phBar',
    path: '/ph-bar',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <BarChartOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'ChatGPT',
    i18nKey: 'menu.chatgpt',
    path: '/chatgpt',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <RobotOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'React Tilt',
    i18nKey: 'menu.reactTilt',
    path: '/tilt',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <ExperimentOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Music',
    i18nKey: 'menu.music',
    path: '/music',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <SoundOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Crypto',
    i18nKey: 'menu.crypto',
    path: '/crypto',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <SafetyCertificateOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Video',
    i18nKey: 'menu.video',
    path: '/video',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <VideoCameraOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Big Screen',
    i18nKey: 'menu.bigScreen',
    path: '/big-screen',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <FundProjectionScreenOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Echarts',
    i18nKey: 'menu.echarts',
    path: '/echarts',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <PieChartOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Qr Generate',
    i18nKey: 'menu.qrGenerate',
    path: '/qrcode',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <QrcodeOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Business',
    i18nKey: 'menu.business',
    path: '/business',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <BankOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Prism Render',
    i18nKey: 'menu.prismRender',
    path: '/prism',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <HighlightOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Post Message',
    i18nKey: 'menu.postMessage',
    path: '/postmessage',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <SendOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Geo Chart',
    i18nKey: 'menu.geoChart',
    path: '/geo',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <EnvironmentOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Print',
    i18nKey: 'menu.print',
    path: '/print',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <PrinterOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Profile',
    i18nKey: 'menu.profile',
    path: '/profile',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <UserOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: 'Contact',
    i18nKey: 'menu.contact',
    path: '/contact',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <ContactsOutlined />
      </AnimatedIcon>
    ),
  },
  {
    label: '前端技术栈',
    i18nKey: 'menu.frontendTechStack',
    path: '/tech/frontend',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <NodeIndexOutlined />
      </AnimatedIcon>
    ),
    children: [
      {
        label: 'React',
        i18nKey: 'menu.react',
        path: '/tech/frontend/react',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <CodeOutlined />
          </AnimatedIcon>
        ),
      },
      {
        label: 'Vue',
        i18nKey: 'menu.vue',
        path: '/tech/frontend/vue',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <CodeOutlined />
          </AnimatedIcon>
        ),
        children: [
          {
            label: 'Vue 插件',
            i18nKey: 'menu.vuePlugins',
            path: '/tech/frontend/plugins',
            icon: (
              <AnimatedIcon variant="spin" mode="hover">
                <AppstoreOutlined />
              </AnimatedIcon>
            ),
            children: [
              {
                label: 'Vue3 API',
                i18nKey: 'menu.vue3Api',
                path: '/tech/frontend/plugins/vue3',
                icon: (
                  <AnimatedIcon variant="spin" mode="hover">
                    <FileTextOutlined />
                  </AnimatedIcon>
                ),
              },
              {
                label: '性能优化',
                i18nKey: 'menu.performanceOptimization',
                path: '/tech/frontend/plugins/perf',
                icon: (
                  <AnimatedIcon variant="spin" mode="hover">
                    <ThunderboltOutlined />
                  </AnimatedIcon>
                ),
              },
            ],
          },
        ],
      },
      {
        label: 'Angular',
        i18nKey: 'menu.angular',
        path: '/tech/frontend/angular',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <Html5Outlined />
          </AnimatedIcon>
        ),
      },
      {
        label: 'Node',
        i18nKey: 'menu.node',
        path: '/tech/frontend/node',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <CloudServerOutlined />
          </AnimatedIcon>
        ),
      },
    ],
  },
  {
    label: '后端技术栈',
    i18nKey: 'menu.backendTechStack',
    path: '/tech/backend',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <CloudServerOutlined />
      </AnimatedIcon>
    ),
    children: [
      {
        label: 'Node',
        i18nKey: 'menu.node',
        path: '/tech/backend/node',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <CodeOutlined />
          </AnimatedIcon>
        ),
      },
      {
        label: 'Java',
        i18nKey: 'menu.java',
        path: '/tech/backend/java',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <CodeOutlined />
          </AnimatedIcon>
        ),
      },
      {
        label: 'Go',
        i18nKey: 'menu.go',
        path: '/tech/backend/go',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <CodeOutlined />
          </AnimatedIcon>
        ),
      },
    ],
  },
  {
    label: '构建工具',
    i18nKey: 'menu.buildTools',
    path: '/build',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <ApartmentOutlined />
      </AnimatedIcon>
    ),
    children: [
      {
        label: 'Webpack',
        i18nKey: 'menu.webpack',
        path: '/build/webpack',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <ToolOutlined />
          </AnimatedIcon>
        ),
      },
      {
        label: 'Vite',
        i18nKey: 'menu.vite',
        path: '/build/vite',
        icon: (
          <AnimatedIcon variant="spin" mode="hover">
            <ThunderboltOutlined />
          </AnimatedIcon>
        ),
      },
    ],
  },

  {
    label: 'Error',
    i18nKey: 'menu.error',
    path: '/sub-error',
    icon: (
      <AnimatedIcon variant="spin" mode="hover">
        <QuestionCircleOutlined />
      </AnimatedIcon>
    ),
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
