import React from 'react'
import { lazyComponents } from '../config/lazyLoad.config'

/**
 * 图表相关路由
 * 包含各种数据可视化页面
 */
export const chartRoutes = [
  {
    path: 'geo',
    name: 'Geo Chart',
    key: '/geo',
    element: <lazyComponents.GeoChart />,
  },
  {
    path: 'echarts',
    name: 'React Echarts',
    key: '/echarts',
    element: <lazyComponents.Echarts />,
  },
  {
    path: 'big-screen',
    name: 'Big Screen',
    key: '/big-screen',
    element: <lazyComponents.BigScreen />,
  },
  {
    path: 'svg-viewer',
    name: 'SVG Viewer',
    key: '/svg-viewer',
    element: <lazyComponents.SvgViewer />,
  },
  {
    path: 'topology',
    name: 'Topology',
    key: '/topology',
    element: <lazyComponents.Topology />,
  },
  {
    path: 'mermaid',
    name: 'Mermaid',
    key: '/mermaid',
    element: <lazyComponents.Mermaid />,
  },
]
