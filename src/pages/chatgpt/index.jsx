/* eslint-disable react/no-children-prop */
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
  Drawer,
  Switch,
  Tag,
  Spin
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
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import mermaid from 'mermaid'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  themeVariables: {
    primaryColor: '#1890ff',
    primaryTextColor: '#262626',
    primaryBorderColor: '#d9d9d9',
    lineColor: '#52c41a',
    secondaryColor: '#f6ffed',
    tertiaryColor: '#f0f9ff'
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis'
  },
  securityLevel: 'loose'
})

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
- 功能扩展路线图（使用 Mermaid roadmap）
- 插件化架构设计（使用 Mermaid graph TD）
## 10. 成本分析
### 10.1 开发成本
- 成本估算模型：C_total = C_dev + C_ops + C_maint
- 成本构成分析（使用表格）
### 10.2 ROI 分析
- 投资回报率计算：ROI = (V_gain - C_total) / C_total × 100%
- 效益分析（使用表格）
请确保生成的文档：
1. 包含至少 8 种不同类型的 Mermaid 图表
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
1. 包含至少 10 种不同类型的 Mermaid 图表
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
1. 包含至少 12 种不同类型的 Mermaid 图表
2. 包含至少 8 个标准表格
3. 包含至少 10 个代码块示例
4. 包含至少 6 个数学公式
5. 符合智慧城市建设标准和规范
6. 所有图表都要有实际应用场景`
  }
}

// 修复后的 MermaidRenderer - 只在文档完成时渲染一次
const MermaidRenderer = ({ content, readyState }) => {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState({ total: 0, finished: 0 })

  useEffect(() => {
    // 关键修复：只有当文档完全生成完毕时才渲染
    if (readyState !== 2 || !content || !containerRef.current) return
    console.log('MermaidRenderer received content length:', content?.length)
    const render = async () => {
      containerRef.current.innerHTML = ''
      // 超级鲁棒正则，支持各种格式的代码块
      const regex = /```mermaid\s*\n?([\s\S]*?)```/gi
      const matches = []
      let match
      while ((match = regex.exec(content)) !== null) {
        const code = match[1].trim()
        if (code) matches.push(code)
      }

      const total = matches.length
      setProgress({ total, finished: 0 })

      if (total === 0) return

      const concurrency = 5
      let active = 0
      let idx = 0

      const process = async () => {
        while (idx < total) {
          if (active >= concurrency) await new Promise((r) => setTimeout(r, 100))
          active++

          const i = idx++
          const code = matches[i]
          const title = `图表 ${i + 1}`
          const id = `mermaid-${Date.now()}-${i}`
          console.log('Matched mermaid blocks:', matches.length)
          try {
            const { svg } = await mermaid.render(id, code)
            console.log('Rendering chart', i + 1)
            const card = document.createElement('div')
            card.style.cssText =
              'margin:40px 0;padding:32px;background:#ffffff;border-radius:12px;border:1px solid #e0e0e0;box-shadow:0 8px 24px rgba(0,0,0,0.08);'

            const titleEl = document.createElement('div')
            titleEl.textContent = title
            titleEl.style.cssText = 'font-size:20px;font-weight:600;margin-bottom:24px;text-align:center;color:#262626;'
            card.appendChild(titleEl)

            const wrapper = document.createElement('div')
            wrapper.style.cssText =
              'display:flex;justify-content:center;overflow:auto;background:#f8f9fa;border-radius:8px;padding:20px;'
            wrapper.innerHTML = svg

            const svgEl = wrapper.querySelector('svg')
            if (svgEl) {
              svgEl.style.maxWidth = '100%'
              svgEl.style.height = 'auto'
            }

            card.appendChild(wrapper)
            containerRef.current.appendChild(card)
          } catch (err) {
            console.log('Error:', err)
            const errorCard = document.createElement('div')
            errorCard.style.cssText =
              'margin:40px 0;padding:32px;background:#fff1f0;border-radius:12px;border:1px solid #ff4d4f;'
            errorCard.innerHTML = `
              <div style="font-size:18px;font-weight:600;color:#ff4d4f;margin-bottom:16px;text-align:center;">${title} 渲染失败</div>
              <div style="color:#a8071a;margin-bottom:16px;text-align:center;">${err.message}</div>
              <details style="margin-top:16px;">
                <summary style="cursor:pointer;color:#1890ff;">查看原始代码</summary>
                <pre style="margin-top:12px;padding:16px;background:#f5f5f5;border-radius:8px;overflow:auto;font-size:13px;">${code}</pre>
              </details>
            `
            containerRef.current.appendChild(errorCard)
          }

          setProgress((p) => ({ ...p, finished: p.finished + 1 }))
          active--
        }
      }

      // 启动并发渲染
      for (let i = 0; i < concurrency; i++) process()
    }

    render()
  }, [content, readyState]) // 依赖 readyState，确保只在完成时渲染一次

  const { total, finished } = progress
  if (total === 0 || readyState !== 2) return null

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '30px 0', color: '#666', fontSize: '16px' }}>
        <Text strong>
          正在渲染 {total} 个图表，已完成 {finished}/{total}
        </Text>
        {finished < total && <Spin size='large' style={{ marginLeft: 16 }} />}
      </div>
      <div ref={containerRef} />
    </div>
  )
}

const ChatGpt = () => {
  const [form] = Form.useForm()

  const apiResultRef = useRef('')
  const [apiResult, setApiResult] = useState('')
  const [readyState, setReadyState] = useState(-1)
  const [apiKey, setApiKey] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('supplyChain')

  const [structureResult, setStructureResult] = useState('')
  const [structureReadyState, setStructureReadyState] = useState(-1)
  const structureResultRef = useRef()

  const [progress, setProgress] = useState(0)

  const [previewVisible, setPreviewVisible] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    structureResultRef.current = structureResult
  }, [structureResult])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [apiResult, structureResult])

  useEffect(() => {
    let interval
    if (readyState === 1 || structureReadyState === 1) {
      setProgress(0)
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 500)
    } else if (readyState === 2 || structureReadyState === 2) {
      setProgress(100)
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
          setApiResult(apiResultRef.current)
          setReadyState(1)
        }
      } else {
        setReadyState(2)
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
          setStructureResult(structureResultRef.current)
          setStructureReadyState(1)
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

  const formatMindmapContent = (content) => {
    if (!content) return content

    let formatted = content.replace(/^#+\s*/gm, '')

    formatted = formatted.replace(/^\d+\.\s*/gm, '- ')
    formatted = formatted.replace(/^\*\s*/gm, '- ')

    formatted = formatted.replace(/\t/g, '  ')

    formatted = formatted.replace(/\n\s*\n\s*\n/g, '\n\n')

    const lines = formatted.split('\n').filter((line) => line.trim())
    if (lines.length > 0 && !lines[0].startsWith('- ')) {
      lines[0] = '- ' + lines[0].replace(/^-\s*/, '')
    }

    return lines.join('\n').trim()
  }

  const exportDocument = (format) => {
    if (!apiResult) {
      message.warning('没有可导出的内容')
      return
    }

    const content = format === 'markdown' ? apiResult : removeMd(apiResult)
    const blob = new Blob([content], {
      type: format === 'markdown' ? 'text/markdown' : 'text/plain'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `PRD文档.${format === 'markdown' ? 'md' : 'txt'}`
    link.click()
    URL.revokeObjectURL(url)
    message.success(`成功导出${format === 'markdown' ? 'Markdown' : '纯文本'}格式`)
  }

  const CustomComponents = {
    table: ({ children, ...props }) => (
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table
          {...props}
          style={{
            width: '100%',
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
          borderRight: '1px solid #d9d9d9'
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
          borderRight: '1px solid #f0f0f0'
        }}
      >
        {children}
      </td>
    ),

    code: ({ inline, children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''

      if (!inline && language === 'mermaid') {
        return (
          <div
            style={{
              margin: '16px 0',
              padding: '16px',
              backgroundColor: '#f6f8fa',
              borderRadius: '6px',
              border: '1px solid #d9d9d9'
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: 0,
                backgroundColor: 'transparent',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {children}
            </pre>
          </div>
        )
      }

      if (inline) {
        return (
          <code
            {...props}
            className={className}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.9em',
              color: '#d73a49'
            }}
          >
            {children}
          </code>
        )
      }
      return (
        <code
          {...props}
          className={className}
          style={{
            display: 'block',
            backgroundColor: '#f6f8fa',
            padding: '16px',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '0.9em',
            lineHeight: '1.5'
          }}
        >
          {children}
        </code>
      )
    },

    pre: ({ children, ...props }) => {
      const isMermaid = React.Children.toArray(children).some(
        (child) => React.isValidElement(child) && child.props.className?.includes('language-mermaid')
      )

      if (isMermaid) {
        return <div style={{ margin: '16px 0' }}>{children}</div>
      }

      return (
        <pre
          {...props}
          style={{
            backgroundColor: '#f6f8fa',
            padding: '16px',
            borderRadius: '6px',
            overflowX: 'auto',
            margin: '16px 0'
          }}
        >
          {children}
        </pre>
      )
    },

    h1: ({ children, ...props }) => (
      <h1
        {...props}
        style={{
          fontSize: '2em',
          fontWeight: 600,
          marginTop: '24px',
          marginBottom: '16px',
          borderBottom: '1px solid #eaecef',
          paddingBottom: '8px'
        }}
      >
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2
        {...props}
        style={{
          fontSize: '1.5em',
          fontWeight: 600,
          marginTop: '24px',
          marginBottom: '16px'
        }}
      >
        {children}
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3
        {...props}
        style={{
          fontSize: '1.25em',
          fontWeight: 600,
          marginTop: '20px',
          marginBottom: '12px'
        }}
      >
        {children}
      </h3>
    ),

    ul: ({ children, ...props }) => (
      <ul
        {...props}
        style={{
          paddingLeft: '24px',
          margin: '12px 0'
        }}
      >
        {children}
      </ul>
    ),

    ol: ({ children, ...props }) => (
      <ol
        {...props}
        style={{
          paddingLeft: '24px',
          margin: '12px 0'
        }}
      >
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => (
      <li
        {...props}
        style={{
          marginBottom: '8px',
          lineHeight: '1.6'
        }}
      >
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        style={{
          borderLeft: '4px solid #dfe2e5',
          paddingLeft: '16px',
          margin: '16px 0',
          color: '#6a737d',
          fontStyle: 'italic'
        }}
      >
        {children}
      </blockquote>
    )
  }

  const previewStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#24292e' : '#c9d1d9',
    padding: '20px'
  }

  return (
    <FixTabPanel>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Title level={2}>
            <ThunderboltOutlined style={{ color: '#1890ff', marginRight: 10 }} />
            AI驱动的PRD智能生成平台
          </Title>
          <Paragraph type='secondary'>基于大语言模型，一键生成专业产品需求文档和架构思维导图</Paragraph>
        </div>

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
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}
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
                          <Button icon={<FullscreenOutlined />} onClick={() => setPreviewVisible(true)} />
                        </Tooltip>
                        <Dropdown
                          menu={{
                            onClick: ({ key }) => {
                              if (key === '1') {
                                copyToClipboard('1')
                              } else if (key === '2') {
                                copyToClipboard('2')
                              } else if (key === '3') {
                                exportDocument('markdown')
                              } else if (key === '4') {
                                exportDocument('text')
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
                    border: '1px solid #d9d9d9',
                    borderRadius: 6,
                    overflow: 'hidden',
                    maxHeight: 600
                  }}
                >
                  <MDEditor.Markdown
                    source={apiResult}
                    style={{
                      backgroundColor: previewStyle.backgroundColor,
                      minHeight: 400,
                      maxHeight: 600,
                      overflow: 'auto',
                      padding: previewStyle.padding
                    }}
                    data-color-mode={theme}
                    skipHtml={false}
                    rehypePlugins={[]}
                    components={CustomComponents}
                  />
                </div>

                <div
                  style={{
                    marginTop: 20,
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: 20
                  }}
                >
                  <Text strong>Mermaid 图表展示</Text>
                  <MermaidRenderer content={apiResult} readyState={readyState} />
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

        <Drawer
          title={
            <Space>
              <EyeOutlined />
              <span>文档全屏预览</span>
            </Space>
          }
          placement='right'
          onClose={() => setPreviewVisible(false)}
          open={previewVisible}
          extra={
            <Space>
              <Switch
                checkedChildren='亮色'
                unCheckedChildren='暗色'
                checked={theme === 'light'}
                onChange={(checked) => setTheme(checked ? 'light' : 'dark')}
              />
            </Space>
          }
        >
          <div
            style={{
              padding: 20,
              backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
              color: theme === 'light' ? '#24292e' : '#c9d1d9',
              minHeight: '100%'
            }}
          >
            <MDEditor.Markdown
              source={apiResult}
              style={{
                backgroundColor: 'transparent',
                minHeight: '100%'
              }}
              data-color-mode={theme}
              skipHtml={false}
              rehypePlugins={[]}
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
              <MermaidRenderer content={apiResult} readyState={readyState} />
            </div>
          </div>
        </Drawer>

        <div ref={bottomRef} style={{ height: 20 }} />
      </div>
    </FixTabPanel>
  )
}

export default ChatGpt
