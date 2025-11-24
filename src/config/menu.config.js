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
  // Dashboard 和 Portfilo 已移除，因为它们属于独立布局
  { label: 'Permission', key: '/permission', icon: <QrcodeOutlined /> },
  { label: 'Profile', key: '/profile', icon: <FireOutlined /> },
  { label: 'Contact', key: '/contact', icon: <QrcodeOutlined /> },
  {
    label: '技术栈',
    key: '/sub-act',
    icon: <HeatMapOutlined />,
    children: [
      {
        label: '前端技术栈',
        key: '/sub-coupons',
        icon: <FireOutlined />,
        children: [
          {
            label: '框架生态',
            key: '/sub-fe-framework',
            icon: <FireOutlined />,
            children: [
              {
                label: 'Vue',
                key: '/coupons/add',
                icon: <FireOutlined />,
                children: [
                  {
                    label: 'Vue 插件',
                    key: '/coupons/add/plugins',
                    icon: <FireOutlined />,
                    children: [
                      { label: 'Vue3 API', key: '/coupons/add/plugins/vue3' },
                      { label: '性能优化', key: '/coupons/add/plugins/perf' },
                    ],
                  },
                ],
              },
              { label: 'Angular', key: '/coupons/edit' },
            ],
          },
        ],
      },
      {
        label: '后端技术栈',
        key: '/product',
        icon: <DeploymentUnitOutlined />,
      },
    ],
  },
  {
    label: '构建工具',
    key: '/sub-list',
    icon: <ApartmentOutlined />,
    children: [
      { label: 'Webpack', key: '/coupons/list' },
      { label: 'Vite', key: '/order/list' },
    ],
  },
  {
    label: 'Error',
    key: '/sub-error',
    icon: <QuestionCircleOutlined />,
    children: [{ label: 'ErrorBoundary', key: '/error' }],
  },
]
