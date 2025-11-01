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
    auth: false,
    element: <lazyComponents.GeoChart />,
  },
  {
    path: 'echarts',
    name: 'React Echarts',
    key: '/echarts',
    auth: true,
    element: <lazyComponents.Echarts />,
  },
  {
    path: 'big-screen',
    name: 'Big Screen',
    key: '/big-screen',
    auth: false,
    element: <lazyComponents.BigScreen />,
  },
  {
    path: 'd3-chart',
    name: 'D3 Chart',
    key: '/d3-chart',
    auth: false,
    element: <lazyComponents.D3Chart />,
  },
]
