import React, { useEffect, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import CytoscapeComponent from 'react-cytoscapejs'
import cytoscape from 'cytoscape'
import coseBilkent from 'cytoscape-cose-bilkent'

// 注册布局扩展（关键！）
cytoscape.use(coseBilkent)

const CytoscapeTopology = () => {
  // 10台服务器，18个项目，参考真实微服务/集群案例
  const serverList = [
    { id: 'server-1', label: 'API 网关', color: '#4CAF50' },
    { id: 'server-2', label: '认证中心', color: '#2196F3' },
    { id: 'server-3', label: '用户服务', color: '#FF9800' },
    { id: 'server-4', label: '订单服务', color: '#F44336' },
    { id: 'server-5', label: '支付服务', color: '#9C27B0' },
    { id: 'server-6', label: '商品服务', color: '#00BCD4' },
    { id: 'server-7', label: '库存服务', color: '#8BC34A' },
    { id: 'server-8', label: '消息队列', color: '#FFC107' },
    { id: 'server-9', label: '日志中心', color: '#607D8B' },
    { id: 'server-10', label: '监控中心', color: '#E91E63' },
  ]

  // 18个项目，分布在不同服务器
  const projectList = [
    { id: 'proj-1', label: '前端 Web', parent: 'server-1' },
    { id: 'proj-2', label: '移动端 App', parent: 'server-1' },
    { id: 'proj-3', label: 'SSO 登录', parent: 'server-2' },
    { id: 'proj-4', label: 'OAuth2 Provider', parent: 'server-2' },
    { id: 'proj-5', label: '用户中心', parent: 'server-3' },
    { id: 'proj-6', label: '用户画像', parent: 'server-3' },
    { id: 'proj-7', label: '订单管理', parent: 'server-4' },
    { id: 'proj-8', label: '订单结算', parent: 'server-4' },
    { id: 'proj-9', label: '支付网关', parent: 'server-5' },
    { id: 'proj-10', label: '第三方支付', parent: 'server-5' },
    { id: 'proj-11', label: '商品检索', parent: 'server-6' },
    { id: 'proj-12', label: '商品详情', parent: 'server-6' },
    { id: 'proj-13', label: '库存查询', parent: 'server-7' },
    { id: 'proj-14', label: '库存预警', parent: 'server-7' },
    { id: 'proj-15', label: '消息生产', parent: 'server-8' },
    { id: 'proj-16', label: '消息消费', parent: 'server-8' },
    { id: 'proj-17', label: '日志采集', parent: 'server-9' },
    { id: 'proj-18', label: '监控采集', parent: 'server-10' },
  ]

  // 服务器节点
  const serverNodes = serverList.map((s) => ({ data: { id: s.id, label: s.label }, classes: s.id }))
  // 项目节点
  const projectNodes = projectList.map((p) => ({ data: { id: p.id, label: p.label, parent: p.parent } }))

  // 服务器间美观连线（如主干链路/分组）
  const serverEdges = [
    { data: { source: 'server-1', target: 'server-2', label: '认证' } },
    { data: { source: 'server-1', target: 'server-3', label: '用户' } },
    { data: { source: 'server-1', target: 'server-4', label: '订单' } },
    { data: { source: 'server-1', target: 'server-5', label: '支付' } },
    { data: { source: 'server-1', target: 'server-6', label: '商品' } },
    { data: { source: 'server-1', target: 'server-7', label: '库存' } },
    { data: { source: 'server-1', target: 'server-8', label: '消息' } },
    { data: { source: 'server-1', target: 'server-9', label: '日志' } },
    { data: { source: 'server-1', target: 'server-10', label: '监控' } },
  ]

  // 项目间依赖（部分示例，真实可扩展）
  const projectEdges = [
    { data: { source: 'proj-1', target: 'proj-3', label: '登录' } },
    { data: { source: 'proj-2', target: 'proj-4', label: 'OAuth2' } },
    { data: { source: 'proj-5', target: 'proj-7', label: '下单' } },
    { data: { source: 'proj-7', target: 'proj-9', label: '支付' } },
    { data: { source: 'proj-9', target: 'proj-10', label: '第三方' } },
    { data: { source: 'proj-11', target: 'proj-13', label: '库存校验' } },
    { data: { source: 'proj-13', target: 'proj-14', label: '预警' } },
    { data: { source: 'proj-15', target: 'proj-16', label: '消息流转' } },
    { data: { source: 'proj-17', target: 'proj-18', label: '监控' } },
    // 交叉依赖
    { data: { source: 'proj-8', target: 'proj-12', label: '商品详情' } },
    { data: { source: 'proj-6', target: 'proj-11', label: '商品推荐' } },
    { data: { source: 'proj-4', target: 'proj-5', label: '用户授权' } },
  ]

  const elements = [...serverNodes, ...projectNodes, ...serverEdges, ...projectEdges]

  // 服务器分组色彩
  const stylesheet = [
    {
      selector: 'node',
      style: {
        content: 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': '#bbb',
        shape: 'roundrectangle',
        'font-size': 12,
        width: 60,
        height: 30,
      },
    },
    // 服务器父节点分组色
    ...serverList.map((s) => ({
      selector: `.${s.id}`,
      style: {
        'background-opacity': 0.25,
        'background-color': s.color,
        'font-weight': 'bold',
        'font-size': 16,
        padding: 24,
        'border-width': 2,
        'border-color': s.color,
      },
    })),
    {
      selector: ':parent',
      style: {
        'text-valign': 'top',
        'text-halign': 'center',
        'font-size': 16,
        'font-weight': 'bold',
      },
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': '#aaa',
        'target-arrow-color': '#aaa',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        label: 'data(label)',
        'font-size': 10,
        'text-background-color': '#fff',
        'text-background-opacity': 0.7,
        'text-background-shape': 'roundrectangle',
        'text-border-color': '#888',
        'text-border-width': 1,
        'text-border-opacity': 0.5,
      },
    },
    // 服务器间主干线美化
    {
      selector: 'edge[source^="server-"][target^="server-"]',
      style: {
        'line-color': '#1976D2',
        'target-arrow-color': '#1976D2',
        width: 5,
        'line-style': 'dashed',
        opacity: 0.7,
      },
    },
  ]

  const layout = { name: 'cose-bilkent', animate: true, idealEdgeLength: 100, nodeRepulsion: 4500 }

  return (
    <FixTabPanel fill={true}>
      <CytoscapeComponent
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={layout}
        cy={(cy) => {
          console.log('Cytoscape实例就绪', cy)
        }}
      />
    </FixTabPanel>
  )
}

export default CytoscapeTopology
