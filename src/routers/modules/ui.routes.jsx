import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * UI 组件相关路由
 * 包含各种 UI 展示页面
 */
export const uiRoutes = [
  {
    path: 'qrcode',
    name: 'QrGenerate',
    key: '/qrcode',
    element: <lazyComponents.QrCode />,
  },
  {
    path: 'tilt',
    name: 'React Tilt',
    key: '/tilt',
    element: <lazyComponents.ReactTilt />,
  },
  {
    path: 'music',
    name: 'React Music',
    key: '/music',
    element: <lazyComponents.ReactMusic />,
  },
  {
    path: 'video',
    name: 'React Video',
    key: '/video',
    element: <lazyComponents.MyVideo />,
  },
  {
    path: 'crypto',
    name: 'React Crypto',
    key: '/crypto',
    element: <lazyComponents.MyCrypto />,
  },
  {
    path: 'markmap',
    name: 'ChatGPT Markmap',
    key: '/markmap',
    element: <lazyComponents.ChatGpt />,
  },
  {
    path: 'prism',
    name: 'Prism Render',
    key: '/prism',
    element: <lazyComponents.PrismRender />,
  },
  {
    path: 'postmessage',
    name: 'Post Message',
    key: '/postmessage',
    element: <lazyComponents.PostMessage />,
  },
  {
    path: 'my-iframe',
    name: 'My Iframe',
    key: '/my-iframe',
    element: <lazyComponents.MyIframe />,
  },
  {
    path: 'print',
    name: 'Print',
    key: '/print',
    element: <lazyComponents.Print />,
  },
  {
    path: 'profile',
    name: 'Profile',
    key: '/profile',
    element: <lazyComponents.Profile />,
  },
  {
    path: 'contact',
    name: 'Contact',
    key: '/contact',
    element: <lazyComponents.Contact />,
  },
  {
    path: 'ph-bar',
    name: 'PH Bar',
    key: '/ph-bar',
    element: <lazyComponents.PHBar />,
  },
  {
    path: 'permission',
    name: '权限示例',
    key: '/permission',
    element: <lazyComponents.PermissionExample />,
  },
]
