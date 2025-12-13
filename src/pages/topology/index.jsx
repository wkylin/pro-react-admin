import React, { useCallback } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from '@xyflow/react'

import '@xyflow/react/dist/style.css'

// 定义节点样式，方便区分不同类型的组件
const nodeStyles = {
  frontend: { background: '#e6f7ff', border: '1px solid #91d5ff', color: '#1890ff' },
  gateway: { background: '#fff7e6', border: '1px solid #ffd591', color: '#d46b08' },
  service: { background: '#f6ffed', border: '1px solid #b7eb8f', color: '#52c41a' },
  data: { background: '#f9f0ff', border: '1px solid #d3adf7', color: '#722ed1' },
  // 修复：移除了 CSS 属性值中不必要的内部引号
  infra: { background: '#fff1f0', border: '1px solid #ffccc7', color: '#f5222d' }
}

const initialNodes = [
  // --- 前端层 ---
  {
    id: '1',
    type: 'input', // 使用 input 类型作为起点
    position: { x: 400, y: 0 },
    data: { label: '用户', type: 'frontend' },
    style: nodeStyles.frontend
  },
  {
    id: '2',
    position: { x: 400, y: 80 },
    data: { label: 'Web App (React)', type: 'frontend' },
    style: nodeStyles.frontend
  },

  // --- 网关层 ---
  {
    id: '3',
    position: { x: 400, y: 180 },
    data: { label: 'API Gateway', type: 'gateway' },
    style: nodeStyles.gateway
  },

  // --- 核心服务层 ---
  {
    id: '4',
    position: { x: 50, y: 300 },
    data: { label: '用户服务', type: 'service' },
    style: nodeStyles.service
  },
  {
    id: '5',
    position: { x: 250, y: 300 },
    data: { label: '商品服务', type: 'service' },
    style: nodeStyles.service
  },
  {
    id: '6',
    position: { x: 450, y: 300 },
    data: { label: '订单服务', type: 'service' },
    style: nodeStyles.service
  },
  {
    id: '7',
    position: { x: 650, y: 300 },
    data: { label: '支付服务', type: 'service' },
    style: nodeStyles.service
  },
  {
    id: '8',
    position: { x: 850, y: 300 },
    data: { label: '通知服务', type: 'service' },
    style: nodeStyles.service
  },
  {
    id: '9',
    position: { x: 150, y: 420 },
    data: { label: '搜索服务', type: 'service' },
    style: nodeStyles.service
  },

  // --- 基础设施层 ---
  {
    id: '10',
    position: { x: 550, y: 420 },
    data: { label: '消息队列', type: 'infra' },
    style: nodeStyles.infra
  },
  {
    id: '11',
    position: { x: 900, y: 180 },
    data: { label: '监控系统', type: 'infra' },
    style: nodeStyles.infra
  },

  // --- 数据层 ---
  {
    id: '12',
    position: { x: 50, y: 520 },
    data: { label: '用户数据库', type: 'data' },
    style: nodeStyles.data
  },
  {
    id: '13',
    position: { x: 250, y: 520 },
    data: { label: '商品数据库', type: 'data' },
    style: nodeStyles.data
  },
  {
    id: '14',
    position: { x: 450, y: 520 },
    data: { label: '订单数据库', type: 'data' },
    style: nodeStyles.data
  },
  {
    id: '15',
    position: { x: 650, y: 420 },
    data: { label: '缓存', type: 'data' },
    style: nodeStyles.data
  }
]

const initialEdges = [
  // 用户与前端
  { id: 'e1-2', source: '1', target: '2', animated: true, label: '访问' },
  // 前端到网关
  { id: 'e2-3', source: '2', target: '3', animated: true, label: 'HTTPS/REST' },

  // 网关到各服务
  { id: 'e3-4', source: '3', target: '4', label: '登录/注册' },
  { id: 'e3-5', source: '3', target: '5', label: '获取商品' },
  { id: 'e3-6', source: '3', target: '6', label: '创建订单' },
  { id: 'e3-7', source: '3', target: '7', label: '发起支付' },
  { id: 'e3-9', source: '3', target: '9', label: '搜索商品' },

  // 服务间调用
  { id: 'e6-5', source: '6', target: '5', label: '检查库存' },
  { id: 'e6-7', source: '6', target: '7', label: '请求支付' },
  { id: 'e5-9', source: '5', target: '9', label: '同步数据' },
  { id: 'e4-15', source: '4', target: '15', type: 'smoothstep', label: 'Session' },

  // 异步通信
  { id: 'e6-10', source: '6', target: '10', animated: true, label: '订单事件' },
  { id: 'e7-10', source: '7', target: '10', animated: true, label: '支付结果' },
  { id: 'e10-8', source: '10', target: '8', animated: true, label: '发送通知' },

  // 服务到数据库
  { id: 'e4-12', source: '4', target: '12', type: 'smoothstep' },
  { id: 'e5-13', source: '5', target: '13', type: 'smoothstep' },
  { id: 'e6-14', source: '6', target: '14', type: 'smoothstep' },
  { id: 'e7-14', source: '7', target: '14', type: 'smoothstep' }, // 支付服务可能也需要读写订单状态

  // 监控系统连接到所有核心服务（虚线表示）
  { id: 'e4-11', source: '4', target: '11', type: 'smoothstep', style: { strokeDasharray: '5 5' } },
  { id: 'e5-11', source: '5', target: '11', type: 'smoothstep', style: { strokeDasharray: '5 5' } },
  { id: 'e6-11', source: '6', target: '11', type: 'smoothstep', style: { strokeDasharray: '5 5' } },
  { id: 'e7-11', source: '7', target: '11', type: 'smoothstep', style: { strokeDasharray: '5 5' } },
  { id: 'e8-11', source: '8', target: '11', type: 'smoothstep', style: { strokeDasharray: '5 5' } },
  { id: 'e3-11', source: '3', target: '11', type: 'smoothstep', style: { strokeDasharray: '5 5' } }
]

function Flow () {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  return (
    <FixTabPanel fill>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </FixTabPanel>
  )
}

export default Flow
