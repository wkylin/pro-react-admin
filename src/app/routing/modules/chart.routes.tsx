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
    element: <lazyComponents.GeoChart />,
  },
  {
    path: 'echarts',
    name: 'React Echarts',
    element: <lazyComponents.Echarts />,
  },
  {
    path: 'big-screen',
    name: 'Big Screen',
    element: <lazyComponents.BigScreen />,
  },
  {
    path: 'svg-viewer',
    name: 'SVG Viewer',
    element: <lazyComponents.SvgViewer />,
  },
  {
    path: 'topology',
    name: 'Topology',
    element: <lazyComponents.Topology />,
  },
  {
    path: 'mermaid',
    name: 'Mermaid',
    element: <lazyComponents.Mermaid />,
  },
]
