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
    auth: false,
    element: <lazyComponents.QrCode />,
  },
  {
    path: 'tilt',
    name: 'React Tilt',
    key: '/tilt',
    auth: true,
    element: <lazyComponents.ReactTilt />,
  },
  {
    path: 'music',
    name: 'React Music',
    key: '/music',
    auth: false,
    element: <lazyComponents.ReactMusic />,
  },
  {
    path: 'video',
    name: 'React Video',
    key: '/video',
    auth: false,
    element: <lazyComponents.MyVideo />,
  },
  {
    path: 'crypto',
    name: 'React Crypto',
    key: '/crypto',
    auth: false,
    element: <lazyComponents.MyCrypto />,
  },
  {
    path: 'markmap',
    name: 'ChatGPT Markmap',
    key: '/markmap',
    auth: false,
    element: <lazyComponents.ChatGpt />,
  },
  {
    path: 'prism',
    name: 'Prism Render',
    key: '/prism',
    auth: true,
    element: <lazyComponents.PrismRender />,
  },
  {
    path: 'postmessage',
    name: 'Post Message',
    key: '/postmessage',
    auth: false,
    element: <lazyComponents.PostMessage />,
  },
  {
    path: 'my-iframe',
    name: 'My Iframe',
    key: '/my-iframe',
    auth: false,
    element: <lazyComponents.MyIframe />,
  },
  {
    path: 'print',
    name: 'Print',
    key: '/print',
    auth: false,
    element: <lazyComponents.Print />,
  },
  {
    path: 'profile',
    name: 'Profile',
    key: '/profile',
    auth: false,
    element: <lazyComponents.Profile />,
  },
  {
    path: 'contact',
    name: 'Contact',
    key: '/contact',
    auth: false,
    element: <lazyComponents.Contact />,
  },
  {
    path: 'ph-bar',
    name: 'PH Bar',
    key: '/ph-bar',
    auth: false,
    element: <lazyComponents.PHBar />,
  },
]
