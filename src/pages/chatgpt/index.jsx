import React, { useRef, useCallback, useState, useEffect } from 'react'
import MarkmapHooks from '@stateful/markmap'
import FixTabPanel from '@stateless/FixTabPanel'
import MDEditor from '@uiw/react-md-editor'
import { toPng, toSvg } from 'html-to-image'
import {
  Button,
  Dropdown,
  Form,
  Input,
  Space,
  message,
  Card,
  Typography,
  Progress,
  Alert,
  Tooltip,
  Badge,
  Switch,
  Tag,
  Spin,
  theme
} from 'antd'
import {
  DownloadOutlined,
  CopyOutlined,
  RobotOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  FullscreenOutlined,
  EyeOutlined,
  CodeOutlined,
  TableOutlined,
  PartitionOutlined,
  NodeIndexOutlined
} from '@ant-design/icons'
import { copyTextToClipboard } from '@utils/aidFn'
import initSSE from './fixSse'
import removeMd from 'remove-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import PropTypes from 'prop-types'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import 'katex/dist/katex.min.css'
import styles from './index.module.less'

let mermaidPromise
const loadMermaid = () => {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => m?.default ?? m)
  }
  return mermaidPromise
}

const toErrorText = (err) => String(err?.message || err)

const createOffscreenMermaidHost = () => {
  const host = document.createElement('div')
  host.setAttribute('aria-hidden', 'true')
  host.style.cssText =
    'position:fixed;left:-10000px;top:0;width:2000px;height:2000px;overflow:hidden;opacity:0;pointer-events:none;'
  document.body.appendChild(host)
  return host
}

const renderMermaidIntoCharts = async ({ mermaid, blocks, i, charts, setCharts, signal }) => {
  const code = blocks[i]
  const id = `mermaid-${Date.now()}-${i}`
  const title = `图表 ${i + 1}`
  let host
  try {
    if (signal.aborted) return
    // Mermaid v11 渲染依赖“挂到 DOM 上的容器”进行测量，否则可能全量失败
    // 这里使用 offscreen host：不会出现在页面内容里，且渲染完成/失败都会移除
    host = createOffscreenMermaidHost()
    const { svg } = await mermaid.render(id, code, host)
    if (signal.aborted) return
    charts[i] = { title, svg }
    setCharts(charts.slice())
  } catch (err) {
    if (signal.aborted) return
    charts[i] = { title, error: toErrorText(err), code }
    setCharts(charts.slice())
  } finally {
    try {
      if (host) host.remove()
    } catch {
      // ignore
    }
  }
}

const runMermaidBlocks = async ({ blocks, setCharts, setProgress, signal }) => {
  const total = Array.isArray(blocks) ? blocks.length : 0
  if (signal.aborted) return

  const charts = Array.from({ length: total }, (_, i) => ({
    title: `图表 ${i + 1}`,
    pending: true
  }))
  setProgress({ total, finished: 0 })
  setCharts(charts)
  if (total === 0) return

  let mermaid
  try {
    mermaid = await loadMermaid()
  } catch (err) {
    if (!signal.aborted) {
      setCharts([{ title: 'Mermaid', error: toErrorText(err) }])
      setProgress({ total: 1, finished: 1 })
    }
    return
  }
  if (signal.aborted) return

  const concurrency = 3
  let active = 0
  let idx = 0
  let finished = 0

  function onSettled () {
    active -= 1
    finished += 1
    if (!signal.aborted) setProgress({ total, finished })
    pump()
  }

  function pump () {
    if (signal.aborted) return
    while (!signal.aborted && active < concurrency && idx < total) {
      const i = idx
      idx += 1
      active += 1
      renderMermaidIntoCharts({
        mermaid,
        blocks,
        i,
        charts,
        setCharts,
        signal
      }).finally(onSettled)
    }
  }

  pump()
}

const { Text } = Typography
const { TextArea } = Input

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

const hexToRgb = (hex) => {
  if (typeof hex !== 'string') return null
  const s = hex.trim()

  // rgb()/rgba()
  const rgbMatch = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i.exec(s)
  if (rgbMatch) {
    return {
      r: clamp(Number(rgbMatch[1]), 0, 255),
      g: clamp(Number(rgbMatch[2]), 0, 255),
      b: clamp(Number(rgbMatch[3]), 0, 255)
    }
  }

  // #rgb/#rrggbb
  const h = s.replace('#', '')
  if (![3, 6].includes(h.length)) return null
  const full =
    h.length === 3
      ? h
        .split('')
        .map((c) => c + c)
        .join('')
      : h
  const n = Number.parseInt(full, 16)
  if (Number.isNaN(n)) return null
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

const isDarkColor = (hex) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return false
  // perceived luminance
  const l = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255
  return l < 0.45
}

const normalizeMermaidCode = (code) => {
  if (!code) return code
  const raw = String(code).replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  let lines = raw.split('\n')

  const nonEmpty = lines.filter((l) => l.trim()).length
  if (nonEmpty === 0) return ''

  const countPrefix = (re) => lines.filter((l) => l.trim() && re.test(l)).length
  const maybeStrip = (re) => {
    const hit = countPrefix(re)
    if (hit / nonEmpty >= 0.6) {
      lines = lines.map((l) => (re.test(l) ? l.replace(re, '') : l))
    }
  }

  // 常见：LLM 把 Mermaid 代码块放在列表/引用里，导致每行带 `- ` 或 `> `
  maybeStrip(/^\s*>\s?/) // blockquote
  maybeStrip(/^\s*[-*+]\s+/) // unordered list
  maybeStrip(/^\s*\d+\.\s+/) // ordered list

  return lines.join('\n').trim()
}

const CustomComponents = {
  table: ({ children, ...props }) => (
    <div style={{ overflowX: 'auto', margin: '16px 0', width: '100%' }}>
      <table
        {...props}
        style={{
          width: 'max-content',
          minWidth: '100%',
          tableLayout: 'auto',
          borderCollapse: 'collapse',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          overflow: 'hidden'
        }}
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead
      {...props}
      style={{
        backgroundColor: '#fafafa',
        borderBottom: '2px solid #d9d9d9'
      }}
    >
      {children}
    </thead>
  ),

  th: ({ children, ...props }) => (
    <th
      {...props}
      style={{
        padding: '12px 16px',
        textAlign: 'left',
        fontWeight: 600,
        color: '#262626',
        borderRight: '1px solid #d9d9d9',
        whiteSpace: 'normal'
      }}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      {...props}
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        borderRight: '1px solid #f0f0f0',
        verticalAlign: 'top',
        whiteSpace: 'normal',
        wordBreak: 'break-word'
      }}
    >
      {children}
    </td>
  )
}

const syncMermaidThemeFromToken = async (token, mode) => {
  if (!token) return
  const bg = token.colorBgContainer || '#ffffff'
  const isDark = mode ? mode === 'dark' : isDarkColor(bg)
  try {
    const mermaid = await loadMermaid()
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      themeVariables: {
        primaryColor: token.colorPrimary,
        primaryTextColor: isDark ? 'rgba(255, 255, 255, 0.88)' : token.colorText,
        primaryBorderColor: isDark ? 'rgba(255, 255, 255, 0.16)' : token.colorBorder,
        lineColor: token.colorPrimary,
        secondaryColor: isDark ? '#141414' : token.colorBgLayout,
        tertiaryColor: isDark ? '#0f0f0f' : token.colorFillQuaternary || token.colorBgLayout,
        fontFamily: token.fontFamily
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      securityLevel: 'loose'
    })
  } catch (e) {
    console.warn('Mermaid 初始化失败:', e)
  }
}

const formatMindmapContent = (content) => {
  if (!content) return content
  let formatted = String(content).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\t/g, '  ')

  formatted = formatted.replace(/\n\s*\n\s*\n/g, '\n\n')

  const lines = formatted.split('\n').filter((line) => line.trim())
  if (lines.length > 0 && !lines[0].startsWith('- ')) {
    lines[0] = '- ' + lines[0].replace(/^ -\s*|^-\s*/, '')
  }

  return lines.join('\n').trim()
}

const escapeHtml = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const getExportPayload = (format, apiResult) => {
  const safeText = removeMd(apiResult)
  if (format === 'markdown') {
    return {
      ext: 'md',
      mime: 'text/markdown;charset=utf-8',
      content: apiResult
    }
  }
  if (format === 'mdx') {
    return { ext: 'mdx', mime: 'text/plain;charset=utf-8', content: apiResult }
  }
  if (format === 'doc') {
    const html = `<!doctype html><html><head><meta charset="utf-8" /></head><body><pre style="white-space:pre-wrap;font-family:${escapeHtml(
      'Calibri,Arial,Microsoft YaHei'
    )};font-size:12pt;line-height:1.6;">${escapeHtml(safeText)}</pre></body></html>`
    return { ext: 'doc', mime: 'application/msword', content: html }
  }
  return { ext: 'txt', mime: 'text/plain;charset=utf-8', content: safeText }
}

const exportDocument = (format, apiResult) => {
  if (!apiResult) {
    message.warning('没有可导出的内容')
    return
  }

  const safeName = 'PRD文档'
  const { ext, mime, content } = getExportPayload(format, apiResult)
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${safeName}.${ext}`
  link.click()
  URL.revokeObjectURL(url)
  message.success(`成功导出 ${ext.toUpperCase()} 格式`)
}

const PROJECT_TEMPLATES = {
  supplyChain: {
    title: '智能供应链管理系统',
    prompt: `作为资深产品经理和架构师，请为我设计一个企业级智能供应链管理系统的完整PRD文档。该系统需要覆盖从需求分析到运维扩展的全生命周期。
请严格按照以下结构生成PRD文档，必须包含所有要求的内容：
## 1. 项目概述
- 项目背景与商业价值
- 项目目标与成功指标
- 技术愿景与创新点
## 2. 需求分析
### 2.1 业务需求
- 核心业务流程图（使用 Mermaid flowchart TD）
- 用户故事与用例图（使用 Mermaid graph TD）
- 业务规则矩阵（使用标准表格）
### 2.2 功能需求
- 功能模块清单（使用表格）
- 详细功能规格说明
- 优先级与迭代计划（使用 Mermaid gantt）
### 2.3 非功能需求
- 性能指标：响应时间 T_response < 200ms，吞吐量 TPS > 1000
- 可用性目标：A = 99.9%，MTBF > 8760 小时
- 安全要求：数据加密 AES-256，访问控制 RBAC
- 扩展性：支持水平扩展
## 3. 系统架构设计
### 3.1 总体架构
- 系统架构图（使用 Mermaid graph TB）
- 技术栈选型对比（使用表格）
### 3.2 微服务架构
- 服务拆分图（使用 Mermaid graph LR）
- 服务依赖关系（使用 Mermaid sequenceDiagram）
- API 网关设计（使用代码块展示配置）
### 3.3 数据架构
- 数据模型设计（使用 Mermaid erDiagram）
- 数据流向图（使用 Mermaid flowchart LR）
- 缓存策略（使用表格说明）
## 4. 技术实现方案
### 4.1 前端技术栈
- 技术选型（使用表格对比）
- 组件架构（使用 Mermaid graph TD）
- 状态管理方案（使用代码块展示）
### 4.2 后端技术栈
- 技术选型理由（使用表格）
- 核心算法实现（使用代码块展示）
- 性能优化策略（使用列表）
### 4.3 数据库设计
- 数据库选型（使用表格对比）
- 表结构设计（使用代码块展示SQL）
- 索引优化策略
## 5. 开发计划
### 5.1 项目里程碑
- 里程碑规划（使用 Mermaid gantt）
- 关键路径分析（使用 Mermaid graph TD）
### 5.2 团队组织
- 团队结构图（使用 Mermaid graph TB）
- 角色职责矩阵（使用表格）
### 5.3 开发流程
- CI/CD 流程图（使用 Mermaid flowchart TD）
- 代码审查流程（使用 Mermaid sequenceDiagram）
## 6. 测试策略
### 6.1 测试计划
- 测试金字塔（使用 Mermaid graph TD）
- 测试覆盖率目标：C_unit > 80%，C_integration > 60%
### 6.2 自动化测试
- 自动化测试架构（使用 Mermaid graph LR）
- 测试数据管理（使用表格）
## 7. 部署与运维
### 7.1 部署架构
- 部署拓扑图（使用 Mermaid graph TB）
- 容器化方案（使用 Docker 配置代码块）
### 7.2 监控体系
- 监控架构图（使用 Mermaid graph TD）
- 告警规则配置（使用表格）
### 7.3 运维流程
- 故障处理流程（使用 Mermaid flowchart TD）
- 变更管理流程（使用 Mermaid sequenceDiagram）
## 8. 安全与合规
### 8.1 安全架构
- 安全防护体系（使用 Mermaid graph TD）
- 数据分类分级（使用表格）
### 8.2 合规要求
- 合规检查清单（使用表格）
- 审计追踪方案（使用代码块）
## 9. 扩展规划
### 9.1 技术演进
- 技术路线图（使用 Mermaid timeline）
- 架构演进策略（使用 Mermaid graph LR）
### 9.2 功能扩展
- 功能扩展路线图（使用 Mermaid timeline）
- 插件化架构设计（使用 Mermaid graph TD）
## 10. 成本分析
### 10.1 开发成本
- 成本估算模型：C_total = C_dev + C_ops + C_maint
- 成本构成分析（使用表格）
### 10.2 ROI 分析
- 投资回报率计算：ROI = (V_gain - C_total) / C_total × 100%
- 效益分析（使用表格）
请确保生成的文档：
1. 包含至少 8 种不同类型的 Mermaid 图表，规则要符合 Mermaid 语法标准
2. 包含至少 5 个标准表格
3. 包含至少 6 个代码块示例
4. 包含至少 5 个数学公式
5. 内容详实，符合大型企业级项目标准
6. 所有图表都要有实际意义，不是占位符`
  },
  fintech: {
    title: '金融风控平台',
    prompt: `作为金融科技产品专家和系统架构师，请设计一个企业级智能金融风控平台的完整PRD文档。该平台需要处理高并发交易，实时风险评估，支持多种金融场景，并满足严格的监管要求。
请严格按照以下结构生成PRD文档，必须包含所有要求的内容：
## 1. 项目概述
- 金融科技背景与市场机遇
- 平台战略定位与竞争优势
- 监管环境与合规要求
## 2. 业务需求分析
### 2.1 业务场景
- 交易风控流程图（使用 Mermaid flowchart TD）
- 反欺诈业务流程（使用 Mermaid flowchart LR）
- 信用评估业务模型（使用 Mermaid graph TD）
### 2.2 用户角色与权限
- 用户角色图（使用 Mermaid graph TB）
- 权限矩阵（使用标准表格）
- 操作审计流程（使用 Mermaid sequenceDiagram）
### 2.3 业务规则
- 风控规则引擎设计（使用 Mermaid graph LR）
- 规则优先级矩阵（使用表格）
- 决策树模型（使用 Mermaid graph TD）
## 3. 系统架构设计
### 3.1 总体架构
- 微服务架构图（使用 Mermaid graph TB）
- 数据流向图（使用 Mermaid flowchart LR）
- 系统边界定义（使用 Mermaid graph TD）
### 3.2 核心组件
- 风控引擎架构（使用 Mermaid graph LR）
- 实时计算框架（使用 Mermaid graph TD）
- 机器学习平台（使用 Mermaid graph TB）
### 3.3 数据架构
- 数据湖架构（使用 Mermaid graph TD）
- 实时数据流（使用 Mermaid flowchart LR）
- 数据治理体系（使用 Mermaid graph TB）
## 4. 技术实现方案
### 4.1 实时风控引擎
- 规则引擎设计（使用代码块展示 Drools 配置）
- 模型评分算法（使用代码块展示 Python）
- 性能优化策略：延迟 L < 10ms，吞吐量 TPS > 5000
### 4.2 反欺诈系统
- 设备指纹技术（使用 Mermaid graph TD）
- 行为分析模型（使用 Mermaid graph LR）
- 关联图谱算法（使用代码块展示）
### 4.3 信用评估模块
- 特征工程流程（使用 Mermaid flowchart TD）
- 模型训练流程（使用 Mermaid graph LR）
- 评分卡模型：Score = Σ(w_i × x_i) + b
## 5. 数据模型设计
### 5.1 核心数据模型
- 实体关系图（使用 Mermaid erDiagram）
- 数据字典（使用表格）
- 数据血缘关系（使用 Mermaid graph TD）
### 5.2 实时数据处理
- 流处理架构（使用 Mermaid graph LR）
- 窗口计算策略（使用表格）
- 状态管理机制（使用代码块展示）
## 6. 安全与合规
### 6.1 数据安全
- 数据加密方案（使用 Mermaid graph TD）
- 密钥管理流程（使用 Mermaid sequenceDiagram）
- 隐私保护策略（使用表格）
### 6.2 监管合规
- 合规框架（使用 Mermaid graph TB）
- 报送机制（使用 Mermaid flowchart TD）
- 审计追踪（使用代码块展示）
## 7. 开发与测试
### 7.1 开发计划
- 迭代开发路线图（使用 Mermaid gantt）
- 技术债务管理（使用 Mermaid graph LR）
- 代码质量标准：覆盖率 C > 85%
### 7.2 测试策略
- 测试金字塔（使用 Mermaid graph TD）
- 压力测试方案（使用表格）
- 回归测试自动化（使用代码块）
## 8. 部署与运维
### 8.1 部署架构
- 多环境部署图（使用 Mermaid graph TB）
- 容器编排策略（使用 Mermaid graph LR）
- 蓝绿部署流程（使用 Mermaid flowchart TD）
### 8.2 监控告警
- 监控体系架构（使用 Mermaid graph TD）
- 告警规则配置（使用表格）
- 故障恢复流程（使用 Mermaid sequenceDiagram）
## 9. 性能优化
### 9.1 性能指标
- 关键性能指标 KPI（使用表格）
- 性能基准测试（使用 Mermaid graph LR）
- 优化效果对比（使用表格）
### 9.2 优化策略
- 缓存策略设计（使用 Mermaid graph TD）
- 数据库优化（使用代码块展示 SQL）
- 并发处理优化（使用代码块展示）
## 10. 扩展与演进
### 10.1 技术演进
- 技术栈演进路线图（使用 Mermaid timeline）
- 架构升级策略（使用 Mermaid graph LR）
- 新技术引入评估（使用表格）
### 10.2 业务扩展
- 新业务接入流程（使用 Mermaid flowchart TD）
- 插件化架构设计（使用 Mermaid graph TB）
- API 生态建设（使用 Mermaid graph LR）
请确保生成的文档：
1. 包含至少 10 种不同类型的 Mermaid 图表，规则要符合 Mermaid 语法标准
2. 包含至少 6 个标准表格
3. 包含至少 8 个代码块示例
4. 包含至少 6 个数学公式
5. 符合金融行业标准和监管要求
6. 所有图表都要有实际业务意义`
  },
  smartCity: {
    title: '智慧城市运营中心',
    prompt: `作为智慧城市解决方案架构师，请设计一个城市级智慧运营中心的完整PRD文档。该系统需要整合交通、安防、环境、市政等多个子系统，提供统一的城市大脑和决策支持平台。
请严格按照以下结构生成PRD文档，必须包含所有要求的内容：
## 1. 项目概述
- 智慧城市建设背景
- 项目愿景与战略目标
- 技术创新点与社会价值
## 2. 需求分析
### 2.1 城市痛点分析
- 城市问题诊断（使用 Mermaid mindmap）
- 业务需求优先级矩阵（使用表格）
- 市民需求调研（使用图表展示）
### 2.2 功能需求
- 核心功能架构（使用 Mermaid graph TD）
- 子系统功能清单（使用表格）
- 功能依赖关系（使用 Mermaid graph LR）
### 2.3 性能需求
- 系统响应时间：T_response < 3s
- 并发用户数：N_concurrent > 10000
- 数据处理能力：V_data > 1TB/day
- 可用性指标：A = 99.99%
## 3. 总体架构设计
### 3.1 城市大脑架构
- 分层架构图（使用 Mermaid graph TB）
- 数据中台设计（使用 Mermaid graph TD）
- AI 中台架构（使用 Mermaid graph LR）
### 3.2 子系统集成
- 子系统拓扑图（使用 Mermaid graph TD）
- 数据交换架构（使用 Mermaid flowchart LR）
- 服务治理体系（使用 Mermaid graph TB）
### 3.3 技术架构
- 云原生架构（使用 Mermaid graph TD）
- 微服务拆分（使用 Mermaid graph LR）
- 容器化部署（使用 Mermaid graph TB）
## 4. 核心子系统设计
### 4.1 智能交通系统
- 交通管理流程（使用 Mermaid flowchart TD）
- 信号优化算法（使用代码块展示）
- 交通流量预测模型：F(t) = α × H(t-1) + β × W(t)
### 4.2 公共安全系统
- 视频监控架构（使用 Mermaid graph TD）
- 应急指挥流程（使用 Mermaid flowchart LR）
- 事件预警机制（使用 Mermaid sequenceDiagram）
### 4.3 环境监测系统
- 监测网络拓扑（使用 Mermaid graph TD）
- 数据采集流程（使用 Mermaid flowchart LR）
- 环境质量模型：AQI = Σ(w_i × C_i)
### 4.4 市政管理系统
- 市政设施管理（使用 Mermaid graph TD）
- 智能照明控制（使用 Mermaid graph LR）
- 垃圾管理优化（使用 Mermaid flowchart TD）
## 5. 数据架构设计
### 5.1 数据湖架构
- 数据分层模型（使用 Mermaid graph TD）
- 数据血缘关系（使用 Mermaid graph LR）
- 数据治理体系（使用 Mermaid graph TB）
### 5.2 实时数据处理
- 流处理架构（使用 Mermaid graph LR）
- 实时计算引擎（使用 Mermaid graph TD）
- 时序数据库设计（使用代码块）
### 5.3 数据可视化
- 可视化架构（使用 Mermaid graph TD）
- 大屏设计方案（使用 Mermaid graph LR）
- 移动端适配（使用表格对比）
## 6. AI 能力建设
### 6.1 机器学习平台
- ML 平台架构（使用 Mermaid graph TD）
- 模型训练流程（使用 Mermaid flowchart LR）
- 模型部署策略（使用 Mermaid graph TB）
### 6.2 计算机视觉
- CV 应用架构（使用 Mermaid graph TD）
- 算法模型选型（使用表格）
- 模型优化策略（使用代码块）
### 6.3 自然语言处理
- NLP 应用场景（使用 Mermaid mindmap）
- 文本分析流程（使用 Mermaid flowchart TD）
- 语义理解模型（使用代码块）
## 7. 安全与隐私保护
### 7.1 网络安全
- 安全防护体系（使用 Mermaid graph TD）
- 等保合规方案（使用表格）
- 安全事件响应（使用 Mermaid sequenceDiagram）
### 7.2 数据隐私
- 隐私保护技术（使用 Mermaid graph TD）
- 数据脱敏策略（使用表格）
- 访问控制机制（使用代码块）
## 8. 开发与实施
### 8.1 项目实施计划
- 项目里程碑（使用 Mermaid gantt）
- 资源配置计划（使用表格）
- 风险管理矩阵（使用表格）
### 8.2 开发流程
- DevOps 流程（使用 Mermaid flowchart TD）
- 代码质量管理（使用 Mermaid graph LR）
- 测试策略（使用 Mermaid graph TD）
## 9. 运营与维护
### 9.1 运营体系
- 运营组织架构（使用 Mermaid graph TB）
- 运营流程设计（使用 Mermaid flowchart TD）
- SLA 服务水平（使用表格）
### 9.2 维护策略
- 预防性维护（使用 Mermaid graph TD）
- 故障处理流程（使用 Mermaid sequenceDiagram）
- 系统升级策略（使用 Mermaid graph LR）
## 10. 扩展规划
### 10.1 技术演进
- 技术路线图（使用 Mermaid timeline）
- 架构演进策略（使用 Mermaid graph LR）
- 新技术评估（使用表格）
### 10.2 业务扩展
- 新业务接入（使用 Mermaid flowchart TD）
- 生态合作模式（使用 Mermaid graph TB）
- 商业模式创新（使用 Mermaid mindmap）
请确保生成的文档：
1. 包含至少 12 种不同类型的 Mermaid 图表，规则要符合 Mermaid 语法标准
2. 包含至少 8 个标准表格
3. 包含至少 10 个代码块示例
4. 包含至少 6 个数学公式
5. 符合智慧城市建设标准和规范
6. 所有图表都要有实际应用场景`
  }
}

// 修复后的 MermaidRenderer - 只在文档完成时渲染一次
// NOSONAR
const MermaidChartViewer = ({ svg, title, themeMode }) => {
  const { token } = theme.useToken()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  const isDarkMode = themeMode === 'dark'

  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0
  })

  const clampScale = (v) => clamp(v, 0.2, 3.5)

  const fit = useCallback(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const svgEl = canvas.querySelector('svg')
    if (!svgEl) return

    // 清理 width/height，避免影响缩放计算
    try {
      svgEl.removeAttribute('width')
      svgEl.removeAttribute('height')
      svgEl.style.maxWidth = 'none'
      svgEl.style.height = 'auto'
    } catch {
      // ignore
    }

    let wrapRect
    let svgRect
    try {
      wrapRect = wrap.getBoundingClientRect()
      svgRect = svgEl.getBoundingClientRect()
    } catch {
      return
    }

    const padding = 24
    const availableW = Math.max(1, wrapRect.width - padding)
    const availableH = Math.max(1, wrapRect.height - padding)
    // 允许放大：图表较小时默认也能适配到可读尺寸
    const s = clampScale(Math.min(availableW / Math.max(1, svgRect.width), availableH / Math.max(1, svgRect.height)))
    setScale(s)
    setTranslate({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    // 默认视图使用“重置后大小”（scale=1），不自动进入“适配”模式
    let active = true
    Promise.resolve().then(() => {
      if (!active) return
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    })

    // 同时清理 svg 的 width/height，避免固定尺寸影响缩放/清晰度
    const raf = requestAnimationFrame(() => {
      const svgEl = canvasRef.current?.querySelector?.('svg')
      if (!svgEl) return
      try {
        svgEl.removeAttribute('width')
        svgEl.removeAttribute('height')
        svgEl.style.maxWidth = 'none'
        svgEl.style.height = 'auto'
      } catch {
        // ignore
      }
    })

    return () => {
      active = false
      cancelAnimationFrame(raf)
    }
  }, [svg])

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: translate.x,
      baseY: translate.y
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setTranslate({
      x: dragRef.current.baseX + dx,
      y: dragRef.current.baseY + dy
    })
  }

  const onPointerUp = (e) => {
    dragRef.current.active = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const zoomBy = (delta) => {
    setScale((s) => clampScale(s + delta))
  }

  const reset = () => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const exportPng = async () => {
    if (!wrapRef.current) return
    try {
      const dataUrl = await toPng(wrapRef.current, {
        cacheBust: true,
        backgroundColor: isDarkMode ? '#1e1e1e' : token.colorBgContainer,
        pixelRatio: Math.min(3, Math.max(2, window.devicePixelRatio || 2))
      })
      const link = document.createElement('a')
      link.download = `${title || 'mermaid'}.png`
      link.href = dataUrl
      link.click()
      message.success('已导出 PNG')
    } catch (err) {
      message.error(`导出失败: ${err.message || err}`)
    }
  }

  return (
    <div
      className={styles.mermaidCard}
      style={{
        '--mm-border': isDarkMode ? 'rgba(255, 255, 255, 0.14)' : token.colorBorderSecondary,
        '--mm-bg': isDarkMode ? '#141414' : token.colorBgContainer,
        '--mm-bg2': isDarkMode ? '#0f0f0f' : token.colorBgLayout,
        '--mm-text': isDarkMode ? 'rgba(255, 255, 255, 0.88)' : token.colorText,
        '--mm-text2': isDarkMode ? 'rgba(255, 255, 255, 0.65)' : token.colorTextSecondary,
        '--mm-shadow': isDarkMode ? 'none' : token.boxShadowSecondary,
        '--mm-primary': token.colorPrimary
      }}
    >
      <div className={styles.mermaidHeader}>
        <div className={styles.mermaidTitle}>{title}</div>
        <div className={styles.mermaidTools}>
          <Tooltip title='缩小'>
            <Button size='small' onClick={() => zoomBy(-0.15)}>
              -
            </Button>
          </Tooltip>
          <Tooltip title='放大'>
            <Button size='small' onClick={() => zoomBy(0.15)}>
              +
            </Button>
          </Tooltip>
          <Tooltip title='适配画布'>
            <Button size='small' onClick={fit}>
              适配
            </Button>
          </Tooltip>
          <Tooltip title='重置'>
            <Button size='small' onClick={reset}>
              重置
            </Button>
          </Tooltip>
          <Tooltip title='导出 PNG'>
            <Button size='small' icon={<DownloadOutlined />} onClick={exportPng} />
          </Tooltip>
        </div>
      </div>

      <div
        ref={wrapRef}
        className={styles.mermaidWrap}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className={styles.mermaidCanvas}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
          }}
        >
          <div ref={canvasRef} dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      </div>
    </div>
  )
}

MermaidChartViewer.propTypes = {
  svg: PropTypes.string,
  title: PropTypes.string,
  themeMode: PropTypes.string
}

// NOSONAR
const MermaidRenderer = ({ content, readyState, themeMode }) => {
  const { token } = theme.useToken()
  const [progress, setProgress] = useState({ total: 0, finished: 0 })
  const [charts, setCharts] = useState([])
  const isDarkMode = themeMode === 'dark'

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    if (readyState !== 2 || !content) {
      Promise.resolve().then(() => {
        setCharts([])
        setProgress({ total: 0, finished: 0 })
      })
      return () => {
        abortController.abort()
      }
    }

    // Fire-and-forget: theme sync should never block rendering.
    syncMermaidThemeFromToken(token, themeMode)

    const regex = /```\s*mermaid\s*\n?([\s\S]*?)```/gi
    const blocks = []
    let match
    while ((match = regex.exec(content)) !== null) {
      const code = normalizeMermaidCode(match[1])
      if (code) blocks.push(code)
    }

    void runMermaidBlocks({ blocks, setCharts, setProgress, signal })
    return () => {
      abortController.abort()
    }
  }, [content, readyState, token, themeMode])

  if (readyState !== 2) return null

  const { total, finished } = progress

  return (
    <div
      style={{
        '--mm-text': isDarkMode ? 'rgba(255, 255, 255, 0.88)' : token.colorText,
        '--mm-text2': isDarkMode ? 'rgba(255, 255, 255, 0.65)' : token.colorTextSecondary,
        '--mm-border': isDarkMode ? 'rgba(255, 255, 255, 0.14)' : token.colorBorderSecondary,
        '--mm-bg': isDarkMode ? '#141414' : token.colorBgContainer,
        '--mm-bg2': isDarkMode ? '#0f0f0f' : token.colorBgLayout,
        '--mm-shadow': isDarkMode ? 'none' : token.boxShadowSecondary,
        '--mm-primary': token.colorPrimary
      }}
    >
      {total > 0
        ? (
          <div className={styles.mermaidProgress}>
            <Text strong>
              正在渲染 {total} 个图表，已完成 {finished}/{total}
            </Text>
            {finished < total && <Spin size='large' style={{ marginLeft: 16 }} />}
          </div>
          )
        : (
          <div className={styles.mermaidEmpty}>
            <Text type='secondary' style={{ color: 'var(--mm-text2)' }}>
              未检测到 Mermaid 代码块
            </Text>
          </div>
          )}

      {charts.map((c) => {
        if (c?.pending) return null
        return (
          <div key={c.title}>
            {c.svg
              ? (
                <MermaidChartViewer title={c.title} svg={c.svg} themeMode={themeMode} />
                )
              : (
                <div className={styles.mermaidError}>
                  <Alert
                    type='error'
                    showIcon
                    title={`${c.title} 渲染失败`}
                    description={
                      <details>
                        <summary style={{ cursor: 'pointer' }}>查看错误与原始代码</summary>
                        <div style={{ marginTop: 8 }}>
                          <Text type='secondary'>{c.error}</Text>
                        </div>
                        <pre className={styles.mermaidCode}>{c.code}</pre>
                      </details>
                  }
                  />
                </div>
                )}
          </div>
        )
      })}
    </div>
  )
}

MermaidRenderer.propTypes = {
  content: PropTypes.string,
  readyState: PropTypes.number,
  themeMode: PropTypes.string
}

const ChatGpt = () => {
  const [form] = Form.useForm()

  const previewScrollRef = useRef(null)
  const previewStickToBottomRef = useRef(true)
  const previewFullscreenRef = useRef(null)

  const apiResultRef = useRef('')
  const [apiResult, setApiResult] = useState('')
  const [readyState, setReadyState] = useState(-1)
  const [apiKey, setApiKey] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('supplyChain')

  const apiResultFlushRafRef = useRef(0)
  const apiResultDirtyRef = useRef(false)

  const [structureResult, setStructureResult] = useState('')
  const [structureReadyState, setStructureReadyState] = useState(-1)
  const structureResultRef = useRef('')

  const structureResultFlushRafRef = useRef(0)
  const structureResultDirtyRef = useRef(false)

  const [progress, setProgress] = useState(0)

  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)
  const [previewTheme, setPreviewTheme] = useState('light')

  const { token } = theme.useToken()
  const previewStyle = {
    backgroundColor: previewTheme === 'light' ? token.colorBgContainer : token.colorBgLayout,
    padding: 16
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsPreviewFullscreen(document.fullscreenElement === previewFullscreenRef.current)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  useEffect(() => {
    return () => {
      if (apiResultFlushRafRef.current) {
        cancelAnimationFrame(apiResultFlushRafRef.current)
        apiResultFlushRafRef.current = 0
      }
      if (structureResultFlushRafRef.current) {
        cancelAnimationFrame(structureResultFlushRafRef.current)
        structureResultFlushRafRef.current = 0
      }
    }
  }, [])

  const scheduleApiResultFlush = useCallback(() => {
    apiResultDirtyRef.current = true
    if (apiResultFlushRafRef.current) return
    apiResultFlushRafRef.current = requestAnimationFrame(() => {
      apiResultFlushRafRef.current = 0
      if (!apiResultDirtyRef.current) return
      apiResultDirtyRef.current = false
      setApiResult(apiResultRef.current)
    })
  }, [])

  const scheduleStructureResultFlush = useCallback(() => {
    structureResultDirtyRef.current = true
    if (structureResultFlushRafRef.current) return
    structureResultFlushRafRef.current = requestAnimationFrame(() => {
      structureResultFlushRafRef.current = 0
      if (!structureResultDirtyRef.current) return
      structureResultDirtyRef.current = false
      setStructureResult(structureResultRef.current)
    })
  }, [])

  const openPreviewFullscreen = useCallback(async () => {
    const el = previewFullscreenRef.current
    if (!el) return

    if (typeof el.requestFullscreen !== 'function') {
      message.warning('当前浏览器不支持全屏预览')
      return
    }

    try {
      await el.requestFullscreen()
    } catch (e) {
      console.warn('进入全屏失败:', e)
      message.error('进入全屏失败，请重试')
    }
  }, [])

  const exitPreviewFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) return
    try {
      await document.exitFullscreen()
    } catch (e) {
      console.warn('退出全屏失败:', e)
      message.error('退出全屏失败，请重试')
    }
  }, [])

  useEffect(() => {
    structureResultRef.current = structureResult
  }, [structureResult])

  // 外层页面滚动：仅在生成完成时滚动到底（避免流式输出时抖动）
  useEffect(() => {
    if (readyState !== 2 && structureReadyState !== 2) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [readyState, structureReadyState])

  // 预览区滚动：流式输出时自动滚动到底部（除非用户手动上滑离开底部）
  const onPreviewScroll = useCallback(() => {
    const el = previewScrollRef.current
    if (!el) return
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    previewStickToBottomRef.current = distanceToBottom < 120
  }, [])

  useEffect(() => {
    if (readyState !== 1) return
    const el = previewScrollRef.current
    if (!el || !previewStickToBottomRef.current) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [apiResult, readyState])

  useEffect(() => {
    let interval
    if (readyState === 1 || structureReadyState === 1) {
      Promise.resolve().then(() => setProgress(0))
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 500)
    } else if (readyState === 2 || structureReadyState === 2) {
      Promise.resolve().then(() => setProgress(100))
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [readyState, structureReadyState])

  const onChange = (event) => {
    setApiKey(event.target.value)
  }

  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey)
    form.setFieldsValue({
      text: PROJECT_TEMPLATES[templateKey].prompt
    })
  }

  const onFinish = (values) => {
    const { text } = values
    setApiResult('')
    apiResultRef.current = ''
    setStructureResult('')
    structureResultRef.current = ''
    setStructureReadyState(-1)
    setReadyState(0)

    const source = initSSE(apiKey, text)

    source.addEventListener('message', (e) => {
      if (e.data !== '[DONE]') {
        const payload = JSON.parse(e.data)
        const {
          delta: { content }
        } = payload?.choices[0] || { delta: { content: '' } }
        if (content) {
          apiResultRef.current += content
          scheduleApiResultFlush()
          setReadyState((prev) => (prev === 1 ? prev : 1))
        }
      } else {
        setReadyState(2)
        console.log('setApiResult', apiResultRef.current)
        source.close()
      }
    })

    source.addEventListener('readystatechange', (e) => {
      if (e.readyState === 2) {
        source.close()
      }
    })

    source.addEventListener('error', (e) => {
      console.error('SSE error:', e)
      message.error('生成失败，请检查API Key或稍后重试')
      setReadyState(-1)
      source.close()
    })

    source.stream()
  }

  const onButtonClick = useCallback((key) => {
    if (markmapRef.current === null) {
      message.warning('请先生成页面结构')
      return
    }
    const format = key === '1' ? 'png' : 'svg'
    const exportFn = key === '1' ? toPng : toSvg

    exportFn(markmapRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `mindmap.${format}`
        link.href = dataUrl
        link.click()
        message.success(`成功导出${format.toUpperCase()}格式`)
      })
      .catch((err) => {
        message.error(`导出失败: ${err.message}`)
      })
  }, [])

  const copyToClipboard = (key) => {
    try {
      const content = key === '1' ? removeMd(apiResult) : apiResult
      copyTextToClipboard(content)
      message.success('复制成功！')
    } catch (err) {
      console.warn('复制失败:', err)
      message.error('复制失败，请重试')
    }
  }

  const buildStructure = () => {
    structureResultRef.current = ''
    setStructureResult('')
    setStructureReadyState(0)

    const enhancedPrompt = `请基于以下PRD文档内容，生成一个严格符合Markdown列表格式的思维导图。

PRD文档内容：
  ${apiResult}

请按照以下要求生成思维导图：

1. **严格使用Markdown无序列表格式**：
    - 使用 - 或 * 作为列表标记
    - 每个层级使用2个空格缩进
    - 不要使用有序列表（1. 2. 3.）
    - 不要使用Tab字符，只使用空格

2. **必须包含系统标题**：
    - 第一行必须是系统名称（从PRD中提取）
    - 例如：- 智能供应链管理系统

3. **结构示例**：
    - 系统名称
      - 核心模块
        - 供应商管理
          - 资质审核
          - 绩效评估
        - 采购管理
          - 订单管理
          - 招投标
      - 技术架构
        - 前端技术
          - React
          - TypeScript
        - 后端技术
          - Spring Boot
          - MySQL

4. **内容要求**：
    - 从PRD中提取系统名称作为根节点
    - 提取核心模块和功能
    - 包含技术架构信息
    - 层级不超过4级
    - 每行只包含一个节点内容

5. **格式要求**：
    - 不要包含任何标题（# ## ###）
    - 不要包含任何解释文字
    - 不要包含代码块
    - 不要包含表格
    - 纯粹的Markdown列表格式
    - 必须以系统名称开头

请直接输出符合上述要求的Markdown列表内容，确保第一行是系统名称：`

    const source = initSSE(apiKey, enhancedPrompt)

    source.addEventListener('message', (e) => {
      if (e.data !== '[DONE]') {
        const payload = JSON.parse(e.data)
        const {
          delta: { content }
        } = payload?.choices[0] || { delta: { content: '' } }
        if (content) {
          structureResultRef.current += content
          scheduleStructureResultFlush()
          setStructureReadyState((prev) => (prev === 1 ? prev : 1))
        }
      } else {
        setStructureReadyState(2)
        source.close()
      }
    })

    source.addEventListener('error', (e) => {
      console.error('SSE error:', e)
      message.error('生成思维导图失败')
      setStructureReadyState(-1)
      source.close()
    })

    source.stream()
  }

  const getStatusIcon = (state) => {
    switch (state) {
      case -1:
        return <RobotOutlined />
      case 0:
        return <LoadingOutlined spin />
      case 1:
        return <LoadingOutlined spin />
      case 2:
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />
      default:
        return null
    }
  }

  const getStatusText = (state, type) => {
    if (type === 'prd') {
      switch (state) {
        case -1:
          return '准备生成PRD文档'
        case 0:
          return '正在连接AI服务...'
        case 1:
          return 'AI正在生成PRD文档...'
        case 2:
          return 'PRD文档生成完成'
        default:
          return ''
      }
    } else {
      switch (state) {
        case -1:
          return '准备生成思维导图'
        case 0:
          return '正在分析文档结构...'
        case 1:
          return 'AI正在生成思维导图...'
        case 2:
          return '思维导图生成完成'
        default:
          return ''
      }
    }
  }

  const bottomRef = useRef(null)
  const markmapRef = useRef(null)

  return (
    <FixTabPanel>
      <div>
        <Card
          title={
            <Space>
              <RobotOutlined />
              <span>智能配置</span>
            </Space>
          }
          style={{ marginBottom: 20 }}
        >
          <Form
            form={form}
            layout='vertical'
            initialValues={{
              apiKey: '',
              text: PROJECT_TEMPLATES.supplyChain.prompt
            }}
            onFinish={onFinish}
            requiredMark={false}
            autoComplete='off'
          >
            <Form.Item
              name='apiKey'
              label='OpenAI API Key'
              rules={[{ required: true, message: '请输入OpenAI API Key' }]}
              extra='您的API Key将被安全处理，不会存储在服务器上'
            >
              <TextArea onChange={onChange} rows={2} style={{ resize: 'none' }} placeholder='sk-...' />
            </Form.Item>

            <Form.Item label='项目模板'>
              <Space wrap>
                {Object.entries(PROJECT_TEMPLATES).map(([key, template]) => (
                  <Button
                    key={key}
                    type={selectedTemplate === key ? 'primary' : 'default'}
                    onClick={() => handleTemplateChange(key)}
                  >
                    {template.title}
                  </Button>
                ))}
              </Space>
            </Form.Item>

            <Form.Item name='text' label='需求描述' rules={[{ required: true, message: '请输入您的需求描述' }]}>
              <TextArea
                rows={8}
                showCount
                maxLength={4000}
                style={{ resize: 'none' }}
                placeholder='详细描述您的产品需求...'
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                block
                disabled={[0, 1].includes(readyState)}
                icon={<ThunderboltOutlined />}
              >
                {apiResult && readyState === 2 ? '重新生成PRD' : '生成PRD文档'}
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {readyState > -1 && (
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>PRD文档生成</span>
                <Badge status={readyState === 2 ? 'success' : 'processing'} />
              </Space>
            }
            style={{ marginBottom: 20 }}
          >
            <Alert
              title={getStatusText(readyState, 'prd')}
              type={readyState === 2 ? 'success' : 'info'}
              icon={getStatusIcon(readyState)}
              showIcon
              style={{ marginBottom: 15 }}
            />

            {readyState === 1 && (
              <Progress
                percent={Math.round(progress)}
                status='active'
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068'
                }}
              />
            )}

            {apiResult && (
              <div style={{ marginTop: 15 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10
                  }}
                >
                  <Space>
                    <Text strong>文档内容预览</Text>
                    <Tag color='blue' icon={<TableOutlined />}>
                      支持表格
                    </Tag>
                    <Tag color='green' icon={<CodeOutlined />}>
                      代码高亮
                    </Tag>
                    <Tag color='purple' icon={<PartitionOutlined />}>
                      数学公式
                    </Tag>
                    <Tag color='orange' icon={<NodeIndexOutlined />}>
                      Mermaid图表
                    </Tag>
                  </Space>
                  <Space>
                    {readyState === 2 && (
                      <>
                        <Tooltip title='全屏预览'>
                          <Button icon={<FullscreenOutlined />} onClick={openPreviewFullscreen} />
                        </Tooltip>
                        <Dropdown
                          menu={{
                            onClick: ({ key }) => {
                              if (key === '1') {
                                copyToClipboard('1')
                              } else if (key === '2') {
                                copyToClipboard('2')
                              } else if (key === '3') {
                                exportDocument('markdown', apiResult)
                              } else if (key === '4') {
                                exportDocument('text', apiResult)
                              } else if (key === '5') {
                                exportDocument('mdx', apiResult)
                              } else if (key === '6') {
                                exportDocument('doc', apiResult)
                              }
                            },
                            items: [
                              {
                                key: '1',
                                label: '复制纯文本',
                                icon: <CopyOutlined />
                              },
                              {
                                key: '2',
                                label: '复制Markdown',
                                icon: <CopyOutlined />
                              },
                              {
                                type: 'divider'
                              },
                              {
                                key: '3',
                                label: '导出Markdown',
                                icon: <DownloadOutlined />
                              },
                              {
                                key: '4',
                                label: '导出纯文本',
                                icon: <DownloadOutlined />
                              },
                              {
                                key: '5',
                                label: '导出MDX',
                                icon: <DownloadOutlined />
                              },
                              {
                                key: '6',
                                label: '导出DOC(Word)',
                                icon: <DownloadOutlined />
                              }
                            ]
                          }}
                        >
                          <Button icon={<DownloadOutlined />}>导出</Button>
                        </Dropdown>
                      </>
                    )}
                  </Space>
                </div>
                <div
                  style={{
                    borderRadius: 6
                  }}
                >
                  <div ref={previewScrollRef} className={styles.previewScroll} onScroll={onPreviewScroll}>
                    <MDEditor.Markdown
                      source={apiResult}
                      style={{
                        backgroundColor: previewStyle.backgroundColor,
                        minHeight: 400,
                        padding: previewStyle.padding
                      }}
                      data-color-mode={previewTheme}
                      skipHtml={false}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[[rehypeKatex, { strict: 'ignore' }]]}
                      components={CustomComponents}
                    />
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: 20
                  }}
                >
                  <Text strong>Mermaid 图表展示</Text>
                  <MermaidRenderer content={apiResult} readyState={readyState} themeMode={previewTheme} />
                </div>
              </div>
            )}
          </Card>
        )}

        {apiResult && readyState === 2 && (
          <Card
            title={
              <Space>
                <ApartmentOutlined />
                <span>架构思维导图</span>
                {structureReadyState > -1 && <Badge status={structureReadyState === 2 ? 'success' : 'processing'} />}
              </Space>
            }
            style={{ marginBottom: 20 }}
          >
            <Space style={{ marginBottom: 15 }}>
              <Button
                type='primary'
                disabled={[0, 1].includes(structureReadyState)}
                onClick={buildStructure}
                icon={<ThunderboltOutlined />}
              >
                {structureResult && structureReadyState === 2 ? '重新生成' : '生成思维导图'}
              </Button>

              {structureResult && structureReadyState === 2 && (
                <Dropdown
                  menu={{
                    onClick: ({ key }) => onButtonClick(key),
                    items: [
                      {
                        key: '1',
                        label: '导出为PNG',
                        icon: <DownloadOutlined />
                      },
                      {
                        key: '2',
                        label: '导出为SVG',
                        icon: <DownloadOutlined />
                      }
                    ]
                  }}
                >
                  <Button icon={<DownloadOutlined />}>导出</Button>
                </Dropdown>
              )}
            </Space>

            {structureReadyState > -1 && (
              <Alert
                title={getStatusText(structureReadyState, 'mindmap')}
                type={structureReadyState === 2 ? 'success' : 'info'}
                icon={getStatusIcon(structureReadyState)}
                showIcon
                style={{ marginBottom: 15 }}
              />
            )}

            {structureReadyState === 1 && (
              <Progress
                percent={Math.round(progress)}
                status='active'
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068'
                }}
              />
            )}

            {structureResult && (
              <div
                ref={markmapRef}
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: 6,
                  padding: 20,
                  backgroundColor: '#fafafa',
                  minHeight: 400
                }}
              >
                <MarkmapHooks markmap={formatMindmapContent(structureResult)} />
              </div>
            )}
          </Card>
        )}

        <div
          ref={previewFullscreenRef}
          className={`${styles.previewFullscreenHost} ${isPreviewFullscreen ? styles.previewFullscreenHostActive : ''}`}
        >
          {apiResult && (
            <div
              className={`${styles.previewFullscreenContent} ${
                previewTheme === 'light' ? styles.previewFullscreenLight : styles.previewFullscreenDark
              }`}
              style={{
                backgroundColor: previewTheme === 'light' ? '#ffffff' : '#1e1e1e',
                color: previewTheme === 'light' ? '#24292e' : '#c9d1d9'
              }}
            >
              <div className={styles.previewFullscreenHeader}>
                <Space>
                  <EyeOutlined />
                  <span>文档全屏预览</span>
                </Space>
                <Space>
                  <Switch
                    checkedChildren='亮色'
                    unCheckedChildren='暗色'
                    checked={previewTheme === 'light'}
                    onChange={(checked) => setPreviewTheme(checked ? 'light' : 'dark')}
                  />
                  <Button onClick={exitPreviewFullscreen}>退出全屏</Button>
                </Space>
              </div>

              <div className={styles.previewFullscreenBody}>
                <MDEditor.Markdown
                  source={apiResult}
                  style={{
                    backgroundColor: 'transparent',
                    minHeight: '100%'
                  }}
                  data-color-mode={previewTheme}
                  skipHtml={false}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[[rehypeKatex, { strict: 'ignore' }]]}
                  components={CustomComponents}
                />

                <div
                  style={{
                    marginTop: 20,
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: 20
                  }}
                >
                  <Text strong>Mermaid 图表展示</Text>
                  <MermaidRenderer content={apiResult} readyState={readyState} themeMode={previewTheme} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div ref={bottomRef} style={{ height: 20 }} />
      </div>
    </FixTabPanel>
  )
}

export default ChatGpt
