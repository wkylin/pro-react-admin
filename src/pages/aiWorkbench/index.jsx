import React, { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  List,
  Progress,
  Row,
  Segmented,
  Slider,
  Space,
  Statistic,
  Switch,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from 'antd'
import {
  Activity,
  Bot,
  BrainCircuit,
  DatabaseZap,
  Gauge,
  Layers3,
  Rocket,
  Sparkles,
  WandSparkles,
  Workflow,
} from 'lucide-react'
import FixTabPanel from '@stateless/FixTabPanel'
import PromptOptimizer from '@stateless/PromptOptimizer'
import SmartChat from '@stateless/SmartChat'

import styles from './index.module.less'

const { Paragraph, Text, Title } = Typography

const STORAGE_KEY = 'ai-workbench:workspace:v2'

const PROMPT_TEMPLATE = {
  role: '资深 AI 产品顾问',
  objective: '帮我把一个新组件需求整理为清晰的研发执行方案，并给出验收建议。',
  audience: '前端工程师与产品经理',
  context: '当前项目是一个 React Admin 控制台，需要新增 SmartChat 与 PromptOptimizer 两个组件，并提供可演示的页面。',
  constraints: '输出必须是中文；优先给出分步建议；需要指出潜在风险；不要省略可验证项。',
  outputFormat: '使用 Markdown。先给摘要，再给执行步骤，最后补一个验收清单。',
  examples: '如果涉及 SSE，请说明请求方式、返回格式和中断处理方式。',
  evaluation: '答案要可直接落地，且让开发同学看完就知道下一步怎么做。',
}

const PROMPT_PRESETS = [
  {
    id: 'release-copilot',
    name: 'Release Copilot',
    summary: '用于整理发布流程、灰度策略和回滚预案。',
    tags: ['交付', '可观测', '工程化'],
    value: {
      role: '平台发布架构师',
      objective: '为一个前端控制台设计发布方案，兼顾灰度、回滚、监控和值班交接。',
      audience: '前端负责人、SRE、测试经理',
      context: '项目同时支持 webpack 和 vite 构建，需要兼容旧链路与新链路的发布节奏。',
      constraints: '必须包含风险矩阵、回滚触发条件、观测指标和灰度计划。',
      outputFormat: '先给一句总结，再输出发布步骤表格，最后给值班 Runbook。',
      examples: '请解释如何在 SSE 或实时流能力上线时做灰度和埋点。',
      evaluation: '回答要能直接放进发布文档模板中使用。',
    },
  },
  {
    id: 'incident-analyst',
    name: 'Incident Analyst',
    summary: '用于分析异常时间线、根因和恢复步骤。',
    tags: ['故障', '状态管理', '可恢复'],
    value: {
      role: '前端稳定性负责人',
      objective: '分析一次 AI 工作台流式输出失败的事故，给出排查路径和恢复策略。',
      audience: '值班工程师与 Tech Lead',
      context: '页面包含 SSE、Markdown 渲染、权限控制和本地持久化能力。',
      constraints: '必须区分用户可见症状、技术根因、监控补洞和预防措施。',
      outputFormat: '使用 Markdown 二级标题，附带事件时间线。',
      examples: '例如：method 默认值缺失导致 toUpperCase 报错。',
      evaluation: '结论必须可执行，且包含短期止血和长期治理建议。',
    },
  },
  {
    id: 'product-spec',
    name: 'Product Spec',
    summary: '用于整理需求说明、方案拆解和验收标准。',
    tags: ['产品', 'Prompt Engineering', '复用'],
    value: {
      role: 'AI 产品架构师',
      objective: '把一个 AI 组件工作台需求整理成 PRD、技术方案和验收清单。',
      audience: '产品经理、前端工程师、设计师',
      context: '页面需要展示 SmartChat、PromptOptimizer、运行时配置、流式事件日志和持久化策略。',
      constraints: '请把需求拆成用户价值、技术亮点、接口设计、验收标准四部分。',
      outputFormat: '使用 Markdown，附一个能力矩阵。',
      examples: '能力矩阵列出 Prompt 模板库、SSE 模拟器、事件时间线、Session 恢复等。',
      evaluation: '输出需要适合直接作为需求评审材料。',
    },
  },
]

const PROFILE_OPTIONS = [
  { label: 'Fast Stream', value: 'fast' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Deep Reasoning', value: 'deep' },
]

const ARCHITECTURE_HIGHLIGHTS = [
  {
    title: '协议适配层',
    detail: '通过可注入 fetcher 和 stream 事件回调，把会话组件与具体模型服务解耦。',
    icon: <Workflow size={16} />,
  },
  {
    title: '提示词管理',
    detail: '模板库、结构化字段和本地持久化便于统一维护常用提示词。',
    icon: <Layers3 size={16} />,
  },
  {
    title: '可观测会话',
    detail: '记录 start/chunk/done/error 生命周期，便于排查流式会话过程。',
    icon: <Activity size={16} />,
  },
  {
    title: '运行参数',
    detail: '支持调节流式速度、chunk 粒度和 reasoning 开关，方便联调与验证。',
    icon: <Gauge size={16} />,
  },
]

function safeReadWorkspace() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function chunkText(text, size = 18) {
  const chunks = []
  for (let index = 0; index < text.length; index += size) {
    chunks.push(text.slice(index, index + size))
  }
  return chunks
}

function buildMockReport({ promptText, profile, presetName, includeReasoning }) {
  const architectureSection = `### 处理概览

1. **输入层**：提示词编辑器负责整理角色、目标、约束和上下文。
2. **会话层**：聊天区域负责流式接收、增量渲染和交互反馈。
3. **运行层**：配置面板统一管理 chunk 粒度、响应节奏、reasoning 开关和本地缓存。

\`\`\`ts
type StreamEvent = {
  type: 'start' | 'chunk' | 'done' | 'error' | 'abort'
  requestId: string
  timestamp: string
}
\`\`\`
`

  const productSection = `### 当前配置

- 使用 **${profile.label}** 流式配置模拟不同吞吐与交互策略。
- 当前模板为 **${presetName}**，可快速切换不同业务场景。
- 事件记录与本地缓存用于保留最近一次调试上下文。
- 返回内容支持 Markdown、代码块复制和 Thought Process 折叠。`

  const deliverySection = `### 建议操作

- 为 SmartChat 增加 Provider Adapter，后续可接 OpenAI / Azure / 自建网关。
- 将 Prompt 模板迁移到服务端或 CMS，统一管理版本和权限。
- 引入埋点记录首 token 时间、完成时间、复制行为与模板使用率。
- 将当前事件日志接入 tracing 或 replay 系统，方便问题定位。`

  const acceptanceSection = `### 检查项

- 支持 Prompt 模板切换、表单持久化和结构化评分
- 支持流式生命周期日志、平均耗时和 chunk 统计
- 支持 reasoning 开关与不同流式性能档位
- 支持复制 Prompt、复制代码、复制消息和恢复上次会话

> 输入摘要：${promptText || '当前使用默认模板内容进行演示。'}`

  const reasoning = includeReasoning
    ? [
        '先根据当前模板整理输入要求，再决定回复结构。',
        '会话过程中同时保留主回答和 reasoning，便于在页面上分开展示。',
        '最后补充建议操作和检查项，方便继续联调或验收。',
      ].join('\n')
    : ''

  return {
    reasoning,
    content: `## 执行摘要

当前工作台用于统一处理提示词编辑、会话联调、运行参数调整和事件记录。

${architectureSection}

${productSection}

${deliverySection}

${acceptanceSection}`,
  }
}

function createMockSseResponse({ promptText, signal, runtimeConfig, presetName }) {
  const profile = PROFILE_OPTIONS.find((item) => item.value === runtimeConfig.profile) || PROFILE_OPTIONS[1]
  const report = buildMockReport({
    promptText,
    profile,
    presetName,
    includeReasoning: runtimeConfig.includeReasoning,
  })

  const events = [
    ...(report.reasoning ? [{ reasoning: `${report.reasoning}\n\n`, content: '' }] : []),
    ...chunkText(report.content, runtimeConfig.chunkSize).map((item) => ({ content: item })),
  ]

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      let timer = 0
      let index = 0

      const push = () => {
        if (signal?.aborted) {
          controller.close()
          return
        }

        if (index >= events.length) {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          return
        }

        const event = events[index]
        const payload = {
          choices: [
            {
              delta: {
                content: event.content || '',
                reasoning_content: event.reasoning || '',
              },
            },
          ],
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
        index += 1
        timer = window.setTimeout(push, runtimeConfig.cadence)
      }

      push()

      signal?.addEventListener(
        'abort',
        () => {
          window.clearTimeout(timer)
          controller.close()
        },
        { once: true }
      )
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
    status: 200,
  })
}

const AiWorkbench = () => {
  const persisted = useMemo(() => safeReadWorkspace(), [])
  const [promptText, setPromptText] = useState(persisted?.promptText || '')
  const [optimizerValue, setOptimizerValue] = useState(persisted?.optimizerValue || PROMPT_TEMPLATE)
  const [activePresetId, setActivePresetId] = useState(persisted?.activePresetId || PROMPT_PRESETS[0].id)
  const [runtimeConfig, setRuntimeConfig] = useState(
    persisted?.runtimeConfig || {
      profile: 'balanced',
      cadence: 120,
      chunkSize: 18,
      includeReasoning: true,
      persistWorkspace: true,
    }
  )
  const [streamEvents, setStreamEvents] = useState(persisted?.streamEvents || [])
  const [sessionStats, setSessionStats] = useState(
    persisted?.sessionStats || {
      requests: 0,
      chunks: 0,
      lastDurationMs: 0,
      avgDurationMs: 0,
      copiedPrompts: 0,
    }
  )

  const deferredPromptText = useDeferredValue(promptText)
  const activePreset = useMemo(
    () => PROMPT_PRESETS.find((item) => item.id === activePresetId) || PROMPT_PRESETS[0],
    [activePresetId]
  )

  useEffect(() => {
    if (!runtimeConfig.persistWorkspace) return
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          promptText,
          optimizerValue,
          activePresetId,
          runtimeConfig,
          streamEvents,
          sessionStats,
        })
      )
    } catch {
      // ignore persistence failures
    }
  }, [activePresetId, optimizerValue, promptText, runtimeConfig, sessionStats, streamEvents])

  const chatOpeningMessages = useMemo(
    () => [
      {
        role: 'assistant',
        content: '欢迎使用 AI 工作台。你可以先选择模板或编辑提示词，再在右侧发起会话并查看流式事件记录。',
      },
    ],
    []
  )

  const promptCompleteness = useMemo(() => {
    const total = Object.keys(PROMPT_TEMPLATE).length
    const filled = Object.values(optimizerValue || {}).filter((value) => String(value || '').trim()).length
    return {
      percent: Math.round((filled / total) * 100),
      filled,
      total,
    }
  }, [optimizerValue])

  const streamHealth = useMemo(() => {
    const doneCount = streamEvents.filter((event) => event.type === 'done').length
    const errorCount = streamEvents.filter((event) => event.type === 'error').length
    return doneCount + errorCount === 0 ? 100 : Math.max(0, Math.round((doneCount / (doneCount + errorCount)) * 100))
  }, [streamEvents])

  const applyPreset = (preset) => {
    startTransition(() => {
      setActivePresetId(preset.id)
      setOptimizerValue(preset.value)
      setPromptText('')
    })
  }

  const clearObservability = () => {
    setStreamEvents([])
    setSessionStats((prev) => ({
      ...prev,
      chunks: 0,
      lastDurationMs: 0,
    }))
  }

  const resetWorkspace = () => {
    startTransition(() => {
      setOptimizerValue(PROMPT_TEMPLATE)
      setPromptText('')
      setActivePresetId(PROMPT_PRESETS[0].id)
      clearObservability()
    })
  }

  const runtimeProfileLabel = useMemo(
    () => PROFILE_OPTIONS.find((item) => item.value === runtimeConfig.profile)?.label || 'Balanced',
    [runtimeConfig.profile]
  )

  const handleStreamEvent = (event) => {
    setStreamEvents((prev) => [event, ...prev].slice(0, 30))

    setSessionStats((prev) => {
      if (event.type === 'start') {
        return {
          ...prev,
          requests: prev.requests + 1,
        }
      }

      if (event.type === 'chunk') {
        return {
          ...prev,
          chunks: prev.chunks + 1,
        }
      }

      if (event.type === 'done') {
        const finishedCount = Math.max(prev.requests, 1)
        const totalDuration = prev.avgDurationMs * Math.max(finishedCount - 1, 0) + (event.durationMs || 0)
        return {
          ...prev,
          lastDurationMs: event.durationMs || 0,
          avgDurationMs: Math.round(totalDuration / finishedCount),
        }
      }

      return prev
    })
  }

  const metrics = [
    {
      title: 'Prompt 完整度',
      value: `${promptCompleteness.percent}%`,
      suffix: `${promptCompleteness.filled}/${promptCompleteness.total}`,
      icon: <WandSparkles size={16} />,
    },
    {
      title: 'Streaming 健康度',
      value: `${streamHealth}%`,
      suffix: 'success ratio',
      icon: <Gauge size={16} />,
    },
    {
      title: '事件总数',
      value: streamEvents.length,
      suffix: 'timeline',
      icon: <Activity size={16} />,
    },
    {
      title: '平均耗时',
      value: sessionStats.avgDurationMs || 0,
      suffix: 'ms',
      icon: <Rocket size={16} />,
    },
  ]

  return (
    <FixTabPanel>
      <section className={styles.page}>
        <div className={styles.hero}>
          <div className={styles.heroMain}>
            <Space size="small" wrap>
              <Tag color="blue">AI Workbench</Tag>
              <Tag color="gold">Admin Only</Tag>
              <Tag color="processing">Streaming</Tag>
              <Tag color="purple">Prompt</Tag>
            </Space>
            <Title level={2} className={styles.title}>
              AI 组件工作台
            </Title>
            <Paragraph className={styles.subtitle}>
              统一处理 <Text strong>提示词编辑</Text>、<Text strong>流式会话</Text>、<Text strong>运行参数</Text> 和
              <Text strong>事件记录</Text>。
            </Paragraph>
          </div>

          <div className={styles.heroIcons}>
            <div className={styles.iconBubble}>
              <WandSparkles size={18} />
            </div>
            <div className={styles.iconBubble}>
              <Bot size={18} />
            </div>
            <div className={styles.iconBubble}>
              <DatabaseZap size={18} />
            </div>
            <div className={styles.iconBubble}>
              <BrainCircuit size={18} />
            </div>
          </div>
        </div>

        <Row gutter={[16, 16]}>
          {metrics.map((metric) => (
            <Col xs={24} sm={12} xl={6} key={metric.title}>
              <Card className={styles.metricCard}>
                <div className={styles.metricLabel}>
                  <span className={styles.metricIcon}>{metric.icon}</span>
                  {metric.title}
                </div>
                <Statistic value={metric.value} suffix={metric.suffix} />
              </Card>
            </Col>
          ))}
        </Row>

        <Alert
          type="info"
          showIcon
          message={<Text strong>当前环境</Text>}
          description={<Text>当前页面使用本地模拟流式响应，便于联调模板、对话、配置和事件记录等功能。</Text>}
        />

        <Row gutter={[20, 20]} className={styles.layout}>
          <Col xs={24} xxl={10}>
            <div className={styles.columnStack}>
              <Card className={styles.panelCard} bordered={false}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h3>提示词模板</h3>
                    <Text type="secondary">选择常用模板后，可直接带入左侧编辑器继续调整。</Text>
                  </div>
                </div>
                <List
                  className={styles.presetList}
                  dataSource={PROMPT_PRESETS}
                  renderItem={(preset) => (
                    <List.Item className={styles.presetItem}>
                      <div className={styles.presetContent}>
                        <div className={styles.presetTitleRow}>
                          <strong>{preset.name}</strong>
                          {preset.id === activePresetId ? <Tag color="processing">Active</Tag> : null}
                        </div>
                        <Paragraph className={styles.presetSummary}>{preset.summary}</Paragraph>
                        <Space wrap size={[6, 6]}>
                          {preset.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </Space>
                      </div>
                      <Button
                        type={preset.id === activePresetId ? 'primary' : 'default'}
                        onClick={() => applyPreset(preset)}
                      >
                        应用模板
                      </Button>
                    </List.Item>
                  )}
                />
              </Card>

              <PromptOptimizer
                value={optimizerValue}
                onChange={setOptimizerValue}
                onPromptChange={(nextPrompt) => setPromptText(nextPrompt)}
                resetLabel="重置表单"
                copyLabel="复制提示词"
              />
            </div>
          </Col>

          <Col xs={24} xxl={14}>
            <div className={styles.columnStack}>
              <Card className={styles.panelCard} bordered={false}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h3>运行配置</h3>
                    <Text type="secondary">调整流式响应参数、reasoning 返回策略和本地缓存设置。</Text>
                  </div>
                  <Space>
                    <Button onClick={clearObservability}>清空事件</Button>
                    <Button onClick={resetWorkspace}>恢复默认</Button>
                  </Space>
                </div>

                <div className={styles.controlsGrid}>
                  <div className={styles.controlBlock}>
                    <Text strong>流式档位</Text>
                    <Segmented
                      block
                      options={PROFILE_OPTIONS}
                      value={runtimeConfig.profile}
                      onChange={(value) => setRuntimeConfig((prev) => ({ ...prev, profile: value }))}
                    />
                  </div>

                  <div className={styles.controlBlock}>
                    <div className={styles.controlLabelRow}>
                      <Text strong>Chunk 粒度</Text>
                      <Text type="secondary">{runtimeConfig.chunkSize} chars</Text>
                    </div>
                    <Slider
                      min={10}
                      max={32}
                      step={2}
                      value={runtimeConfig.chunkSize}
                      onChange={(value) => setRuntimeConfig((prev) => ({ ...prev, chunkSize: value }))}
                    />
                  </div>

                  <div className={styles.controlBlock}>
                    <div className={styles.controlLabelRow}>
                      <Text strong>流式节奏</Text>
                      <Text type="secondary">{runtimeConfig.cadence} ms</Text>
                    </div>
                    <Slider
                      min={60}
                      max={280}
                      step={20}
                      value={runtimeConfig.cadence}
                      onChange={(value) => setRuntimeConfig((prev) => ({ ...prev, cadence: value }))}
                    />
                  </div>

                  <div className={styles.switchBlock}>
                    <div>
                      <Text strong>Thought Process</Text>
                      <Paragraph className={styles.switchDesc}>
                        开启后会返回 reasoning 内容，并在消息中以折叠面板显示。
                      </Paragraph>
                    </div>
                    <Switch
                      checked={runtimeConfig.includeReasoning}
                      onChange={(checked) => setRuntimeConfig((prev) => ({ ...prev, includeReasoning: checked }))}
                    />
                  </div>

                  <div className={styles.switchBlock}>
                    <div>
                      <Text strong>会话持久化</Text>
                      <Paragraph className={styles.switchDesc}>
                        把提示词、配置和事件日志缓存到本地，方便刷新后继续查看。
                      </Paragraph>
                    </div>
                    <Switch
                      checked={runtimeConfig.persistWorkspace}
                      onChange={(checked) => setRuntimeConfig((prev) => ({ ...prev, persistWorkspace: checked }))}
                    />
                  </div>
                </div>
              </Card>

              <Card className={styles.chatCard} bordered={false}>
                <div className={styles.chatHeader}>
                  <div>
                    <h3>会话窗口</h3>
                    <Text type="secondary">
                      当前模板：{activePreset.name} · 档位：{runtimeProfileLabel} · 输入摘要：
                      {deferredPromptText ? '已同步' : '待生成'}
                    </Text>
                  </div>
                  <Button onClick={() => setPromptText('')} disabled={!promptText}>
                    清空预设 Prompt
                  </Button>
                </div>
                <Divider className={styles.divider} />
                <SmartChat
                  apiUrl="/api/mock/ai-workbench"
                  initialMessages={chatOpeningMessages}
                  placeholder={promptText || '可以直接输入问题，或先在左侧生成结构化 Prompt 后粘贴过来。'}
                  buildRequestBody={({ input, messages }) => ({
                    input,
                    messages,
                    promptText,
                    runtimeConfig,
                    preset: activePreset.name,
                  })}
                  fetcher={(_url, requestInit, body) =>
                    createMockSseResponse({
                      promptText: body?.promptText || body?.input || requestInit?.body || '',
                      signal: requestInit?.signal,
                      runtimeConfig,
                      presetName: activePreset.name,
                    })
                  }
                  onStreamEvent={handleStreamEvent}
                  welcomeTitle="智能会话"
                  welcomeDescription="支持流式返回、Markdown 渲染、代码复制和 Thought Process 折叠查看。"
                  submitLabel="发送消息"
                  stopLabel="停止生成"
                />
              </Card>
            </div>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col xs={24} xl={14}>
            <Card className={styles.panelCard} bordered={false}>
              <Tabs
                className={styles.detailTabs}
                items={[
                  {
                    key: 'timeline',
                    label: '事件记录',
                    children: (
                      <Timeline
                        items={streamEvents.map((event) => ({
                          color:
                            event.type === 'error'
                              ? 'red'
                              : event.type === 'done'
                                ? 'green'
                                : event.type === 'abort'
                                  ? 'orange'
                                  : 'blue',
                          children: (
                            <div className={styles.timelineItem}>
                              <div className={styles.timelineHeader}>
                                <strong>{event.type}</strong>
                                <Text type="secondary">{new Date(event.timestamp).toLocaleTimeString()}</Text>
                              </div>
                              <Text type="secondary">
                                {event.message ||
                                  `request=${event.requestId || '-'} chunk=${event.contentSize || 0}/${event.reasoningSize || 0} duration=${
                                    event.durationMs || 0
                                  }ms`}
                              </Text>
                            </div>
                          ),
                        }))}
                      />
                    ),
                  },
                  {
                    key: 'state',
                    label: '会话状态',
                    children: (
                      <div className={styles.stateGrid}>
                        <Card size="small">
                          <Statistic title="请求次数" value={sessionStats.requests} />
                        </Card>
                        <Card size="small">
                          <Statistic title="Chunk 数量" value={sessionStats.chunks} />
                        </Card>
                        <Card size="small">
                          <Statistic title="最近耗时" value={sessionStats.lastDurationMs} suffix="ms" />
                        </Card>
                        <Card size="small">
                          <Statistic title="当前模板" value={activePreset.name} />
                        </Card>
                      </div>
                    ),
                  },
                  {
                    key: 'architecture',
                    label: '处理说明',
                    children: (
                      <List
                        className={styles.archList}
                        dataSource={ARCHITECTURE_HIGHLIGHTS}
                        renderItem={(item) => (
                          <List.Item className={styles.archItem}>
                            <div className={styles.archIcon}>{item.icon}</div>
                            <div>
                              <strong>{item.title}</strong>
                              <Paragraph className={styles.archDetail}>{item.detail}</Paragraph>
                            </div>
                          </List.Item>
                        )}
                      />
                    ),
                  },
                ]}
              />
            </Card>
          </Col>

          <Col xs={24} xl={10}>
            <Card className={styles.panelCard} bordered={false}>
              <div className={styles.sectionHeader}>
                <div>
                  <h3>运行概览</h3>
                  <Text type="secondary">汇总当前提示词、会话和流式状态，便于快速判断页面运行情况。</Text>
                </div>
              </div>

              <div className={styles.highlightPanel}>
                <div className={styles.highlightRow}>
                  <div>
                    <Text strong>提示词完成度</Text>
                    <Paragraph className={styles.highlightText}>
                      根据已填写字段估算当前提示词信息完整度，便于继续补充缺失内容。
                    </Paragraph>
                  </div>
                  <Progress percent={promptCompleteness.percent} size="small" />
                </div>

                <div className={styles.highlightRow}>
                  <div>
                    <Text strong>流式模式</Text>
                    <Paragraph className={styles.highlightText}>当前会话使用可切换的流式档位和增量返回策略。</Paragraph>
                  </div>
                  <Tag color="processing">{runtimeProfileLabel}</Tag>
                </div>

                <div className={styles.highlightRow}>
                  <div>
                    <Text strong>会话状态</Text>
                    <Paragraph className={styles.highlightText}>
                      根据最近事件统计当前流式会话的完成情况和稳定性。
                    </Paragraph>
                  </div>
                  <Tag color={streamHealth > 90 ? 'success' : 'warning'}>{streamHealth}%</Tag>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
    </FixTabPanel>
  )
}

export default AiWorkbench
