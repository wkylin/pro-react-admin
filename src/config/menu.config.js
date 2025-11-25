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
} from '@ant-design/icons'
import { t } from 'i18next' // 注意：这里可能需要处理 i18n

// 静态菜单配置
// 这里的 key 对应路由 path
export const mainLayoutMenu = [
  { label: 'home', i18nKey: 'home', key: '/', icon: <HomeOutlined /> },
  { label: 'demo', i18nKey: 'demo', key: '/demo', icon: <GlobalOutlined /> },
  { label: 'Motion', key: '/motion', icon: <QrcodeOutlined /> },
  { label: 'Business', key: '/business', icon: <FireOutlined /> },
  { label: 'Big Screen', key: '/big-screen', icon: <FireOutlined /> },
  { label: 'PH Bar', key: '/ph-bar', icon: <QrcodeOutlined /> },
  { label: 'Qr Generate', key: '/qrcode', icon: <QrcodeOutlined /> },
  { label: 'Prism Render', key: '/prism', icon: <FireOutlined /> },
  { label: 'React Tilt', key: '/tilt', icon: <QrcodeOutlined /> },
  { label: 'Music', key: '/music', icon: <FireOutlined /> },
  { label: 'Crypto', key: '/crypto', icon: <QrcodeOutlined /> },
  { label: 'Video', key: '/video', icon: <FireOutlined /> },
  { label: 'Echarts', key: '/echarts', icon: <FireOutlined /> },
  { label: 'ChatGPT', key: '/markmap', icon: <QrcodeOutlined /> },
  { label: 'Post Message', key: '/postmessage', icon: <FireOutlined /> },
  { label: 'Geo Chart', key: '/geo', icon: <QrcodeOutlined /> },
  { label: 'D3 Chart', key: '/d3-chart', icon: <QrcodeOutlined /> },
  { label: 'Print', key: '/print', icon: <QrcodeOutlined /> },
  { label: 'Profile', key: '/profile', icon: <FireOutlined /> },
  { label: 'Contact', key: '/contact', icon: <QrcodeOutlined /> },
  {
    label: '技术栈',
    key: '/tech',
    icon: <HeatMapOutlined />,
    children: [
      {
        label: '前端技术栈',
        key: '/tech/frontend',
        icon: <FireOutlined />,
        children: [
          {
            label: '框架生态',
            key: '/tech/frontend/framework',
            icon: <FireOutlined />,
            children: [
              {
                label: 'Vue',
                key: '/tech/frontend/vue',
                icon: <FireOutlined />,
                children: [
                  {
                    label: 'Vue 插件',
                    key: '/tech/frontend/vue/plugins',
                    icon: <FireOutlined />,
                    children: [
                      { label: 'Vue3 API', key: '/tech/frontend/vue/plugins/vue3' },
                      { label: '性能优化', key: '/tech/frontend/vue/plugins/perf' },
                    ],
                  },
                ],
              },
              { label: 'Angular', key: '/tech/frontend/angular' },
            ],
          },
        ],
      },
      {
        label: '后端技术栈',
        key: '/tech/backend',
        icon: <DeploymentUnitOutlined />,
      },
    ],
  },
  {
    label: '构建工具',
    key: '/build',
    icon: <ApartmentOutlined />,
    children: [
      { label: 'Webpack', key: '/build/webpack' },
      { label: 'Vite', key: '/build/vite' },
    ],
  },
  {
    label: 'Error',
    key: '/sub-error',
    icon: <QuestionCircleOutlined />,
    children: [{ label: 'ErrorBoundary', key: '/error' }],
  },
]
