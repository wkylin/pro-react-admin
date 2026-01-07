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
    element: <lazyComponents.QrCode />,
  },
  {
    path: 'tilt',
    name: 'React Tilt',
    element: <lazyComponents.ReactTilt />,
  },
  {
    path: 'music',
    name: 'React Music',
    element: <lazyComponents.ReactMusic />,
  },
  {
    path: 'video',
    name: 'React Video',
    element: <lazyComponents.MyVideo />,
  },
  {
    path: 'crypto',
    name: 'React Crypto',
    element: <lazyComponents.MyCrypto />,
  },
  {
    path: 'chatgpt',
    name: 'ChatGPT Markmap',
    element: <lazyComponents.ChatGpt />,
  },
  {
    path: 'prism',
    name: 'Prism Render',
    element: <lazyComponents.PrismRender />,
  },
  {
    path: 'postmessage',
    name: 'Post Message',
    element: <lazyComponents.PostMessage />,
  },
  {
    path: 'my-iframe',
    name: 'My Iframe',
    element: <lazyComponents.MyIframe />,
  },
  {
    path: 'print',
    name: 'Print',
    element: <lazyComponents.Print />,
  },
  {
    path: 'profile',
    name: 'Profile',
    element: <lazyComponents.Profile />,
  },
  {
    path: 'contact',
    name: 'Contact',
    element: <lazyComponents.Contact />,
  },
  {
    path: 'ph-bar',
    name: 'PH Bar',
    element: <lazyComponents.PHBar />,
  },
  {
    path: 'permission',
    name: '权限示例',
    element: <lazyComponents.PermissionExample />,
  },
]
