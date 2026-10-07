import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type ComponentType,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { Button, message, Form, Input, Steps, Card, Space } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import styles from './index.module.less'
import mockApi from './mockApi'

type DeploymentConfig = {
  repo: string
  buildCmd: string
  distDir: string
  nginxPath: string
}

type LogType = 'log' | 'logCmd' | 'logError' | 'logInfo' | 'logSuccess' | 'logWarning'
type DeploymentStatus = 'success' | 'cancelled' | 'failed'

type DeploymentLog = {
  time: string
  message: string
  type: LogType
}

type DeploymentHistory = {
  jobId: string
  config: DeploymentConfig
  status: DeploymentStatus
  startedAt: number
  finishedAt: number
  logs: DeploymentLog[]
}

type DeploymentEvent =
  | { type: 'log'; payload: { message: string; type: LogType } }
  | { type: 'step'; payload: { step: number } }
  | { type: 'status'; payload: { status: DeploymentStatus } }

type Unsubscribe = () => void

type DeploymentApi = {
  createJob: (config: DeploymentConfig) => Promise<{ jobId: string }>
  subscribe: (jobId: string, callback: (event: DeploymentEvent) => void) => Unsubscribe
  cancelJob: (jobId: string) => Promise<{ ok: boolean }>
}

type SidebarProps = {
  config: DeploymentConfig
  setConfig: Dispatch<SetStateAction<DeploymentConfig>>
  isDeploying: boolean
  onStart: () => void
  onReset: () => void
  onCancel: () => void
  errors?: Partial<Record<keyof DeploymentConfig, string>>
  isConfigValid: boolean
}

const deploymentApi: DeploymentApi = mockApi
const FixTabPanelWithFill = FixTabPanel as ComponentType<{ children?: ReactNode; fill?: boolean }>

// 子组件：配置侧边栏
const Sidebar = ({
  config,
  setConfig,
  isDeploying,
  onStart,
  onReset,
  onCancel,
  errors = {},
  isConfigValid,
}: SidebarProps) => {
  const [form] = Form.useForm<DeploymentConfig>()

  useEffect(() => {
    form.setFieldsValue(config)
  }, [config])

  return (
    <aside className={styles.sidebar}>
      <Form
        form={form}
        layout="vertical"
        initialValues={config}
        onValuesChange={(_changedValues, allValues) => setConfig({ ...config, ...allValues })}
        disabled={isDeploying}
      >
        <h2>项目配置</h2>

        <Form.Item label="Git 仓库地址" name="repo" validateStatus={errors.repo ? 'error' : ''} help={errors.repo}>
          <Input placeholder="https://github.com/user/repo.git" />
        </Form.Item>

        <Form.Item
          label="构建命令"
          name="buildCmd"
          validateStatus={errors.buildCmd ? 'error' : ''}
          help={errors.buildCmd}
        >
          <Input />
        </Form.Item>

        <Form.Item label="输出目录" name="distDir" validateStatus={errors.distDir ? 'error' : ''} help={errors.distDir}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Nginx 部署路径"
          name="nginxPath"
          validateStatus={errors.nginxPath ? 'error' : ''}
          help={errors.nginxPath}
        >
          <Input />
        </Form.Item>

        <div style={{ marginTop: 8 }}>
          <h2>操作</h2>
          <div className={styles.actionsRow}>
            <Button
              type="primary"
              size="middle"
              onClick={onStart}
              disabled={isDeploying || !isConfigValid}
              style={{ minWidth: 100 }}
            >
              {isDeploying ? '部署中...' : '开始部署'}
            </Button>
            <Button size="middle" onClick={onReset} disabled={isDeploying}>
              重置
            </Button>
            {isDeploying && (
              <Button size="middle" danger onClick={onCancel} disabled={!isDeploying}>
                取消部署
              </Button>
            )}
          </div>
        </div>
      </Form>
    </aside>
  )
}

// 子组件：进度条管道
const Pipeline = ({ activeStep }: { activeStep: number }) => {
  const steps = [{ title: '拉取代码' }, { title: '安装依赖' }, { title: '构建项目' }, { title: 'Nginx 部署' }]

  const items = steps.map((step, index) => ({
    key: String(index),
    title: step.title,
  }))

  return (
    <div className={styles.pipeline} style={{ marginBottom: 12 }}>
      <Steps items={items} current={activeStep >= 0 ? activeStep : undefined} size="small" />
    </div>
  )
}

// 子组件：终端日志
const Terminal = ({ logs }: { logs: DeploymentLog[] }) => {
  const terminalEndRef = useRef<HTMLDivElement | null>(null)

  // useEffect(() => {
  //   terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [logs])

  return (
    <Card size="small" className={styles.terminal} styles={{ body: { padding: 12 } }}>
      <div className={styles['terminal-header']}>
        <div className={`${styles.dot} ${styles.red}`}></div>
        <div className={`${styles.dot} ${styles.yellow}`}></div>
        <div className={`${styles.dot} ${styles.green}`}></div>
      </div>
      <div className={styles['terminal-body']}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit' }}>
          {logs.map((log) => `[${log.time}] ${log.message}\n`)}
        </pre>
        <div ref={terminalEndRef} className={styles.cursor} />
      </div>
    </Card>
  )
}

// 主应用组件
export default function AutoDeploy() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [activeStep, setActiveStep] = useState(-1)
  const [showResult, setShowResult] = useState(false)
  const [statusText, setStatusText] = useState('系统就绪')
  const [statusType, setStatusType] = useState<'idle' | 'warning' | 'success'>('idle')

  const [logs, setLogs] = useState<DeploymentLog[]>(() => {
    const base: DeploymentLog[] = [
      { time: new Date().toLocaleTimeString(), message: 'AutoDeploy CLI v1.0.0 initialized...', type: 'logInfo' },
      { time: new Date().toLocaleTimeString(), message: 'Waiting for configuration...', type: 'logInfo' },
    ]
    try {
      if (!sessionStorage.getItem('autodeploy_config_loaded')) {
        base.push({
          time: new Date().toLocaleTimeString(),
          message: 'Loaded saved configuration from localStorage',
          type: 'logInfo',
        })
        try {
          sessionStorage.setItem('autodeploy_config_loaded', '1')
        } catch {}
      }
    } catch {}
    return base
  })

  const [config, setConfig] = useState<DeploymentConfig>(() => {
    const defaults: DeploymentConfig = {
      repo: 'https://github.com/wkylin/pro-react-admin.git',
      buildCmd: 'npm run build',
      distDir: 'dist',
      nginxPath: '/var/www/html/pro-react-admin',
    }
    try {
      const saved = localStorage.getItem('autodeploy_config')
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (parsed && typeof parsed === 'object') {
          const stored = parsed as Partial<DeploymentConfig>
          return {
            repo: typeof stored.repo === 'string' ? stored.repo : defaults.repo,
            buildCmd: typeof stored.buildCmd === 'string' ? stored.buildCmd : defaults.buildCmd,
            distDir: typeof stored.distDir === 'string' ? stored.distDir : defaults.distDir,
            nginxPath: typeof stored.nginxPath === 'string' ? stored.nginxPath : defaults.nginxPath,
          }
        }
      }
    } catch {}
    return defaults
  })
  const [currentJobId, setCurrentJobId] = useState<string | null>(null)
  const jobUnsubRef = useRef<Unsubscribe | null>(null)
  const runLogsRef = useRef<DeploymentLog[]>([])
  const runStartRef = useRef<number | null>(null)
  const [history, setHistory] = useState<DeploymentHistory[]>([])

  const addLog = (logMessage: string, type: LogType = 'logInfo') => {
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message: logMessage,
        type,
      },
    ])
  }

  const validateConfig = (deploymentConfig: DeploymentConfig): Partial<Record<keyof DeploymentConfig, string>> => {
    const errs: Partial<Record<keyof DeploymentConfig, string>> = {}
    if (!deploymentConfig.repo || deploymentConfig.repo.trim() === '') errs.repo = '仓库地址不能为空'
    else if (!/^(git@|https?:\/\/)/.test(deploymentConfig.repo)) errs.repo = '仓库地址格式不正确'
    if (!deploymentConfig.buildCmd || deploymentConfig.buildCmd.trim() === '') errs.buildCmd = '构建命令不能为空'
    if (!deploymentConfig.distDir || deploymentConfig.distDir.trim() === '') errs.distDir = '输出目录不能为空'
    if (!deploymentConfig.nginxPath || deploymentConfig.nginxPath.trim() === '')
      errs.nginxPath = 'Nginx 部署路径不能为空'
    return errs
  }

  const errors = useMemo(() => validateConfig(config), [config])
  const isConfigValid = useMemo(() => Object.keys(errors).length === 0, [errors])

  useEffect(() => {
    try {
      localStorage.setItem('autodeploy_config', JSON.stringify(config))
    } catch {}
  }, [config])

  useEffect(() => {
    try {
      localStorage.setItem('autodeploy_history', JSON.stringify(history))
    } catch {}
  }, [history])

  const startDeployment = async () => {
    if (isDeploying) return

    const validation = validateConfig(config)
    if (Object.keys(validation).length > 0) {
      Object.values(validation).forEach((msg) => addLog(msg, 'logError'))
      messageApi.error('请修正表单错误')
      return
    }

    try {
      setIsDeploying(true)
      setShowResult(false)
      setStatusText('正在部署...')
      setStatusType('warning')
      setLogs([])

      const res = await deploymentApi.createJob(config)
      const jobId = res.jobId
      setCurrentJobId(jobId)

      runStartRef.current = Date.now()
      runLogsRef.current = []

      if (jobUnsubRef.current) jobUnsubRef.current()

      jobUnsubRef.current = deploymentApi.subscribe(jobId, (evt) => {
        if (evt.type === 'log') {
          addLog(evt.payload.message, evt.payload.type)
          runLogsRef.current.push({
            time: new Date().toLocaleTimeString(),
            message: evt.payload.message,
            type: evt.payload.type,
          })
        }
        if (evt.type === 'step') {
          setActiveStep(evt.payload.step)
        }
        if (evt.type === 'status') {
          const st = evt.payload.status
          setIsDeploying(false)
          setCurrentJobId(null)
          setActiveStep(-1)

          if (st === 'success') {
            setStatusText('部署成功')
            setStatusType('success')
            setShowResult(true)
            messageApi.success('部署成功')
          } else {
            setStatusText(st === 'cancelled' ? '已取消' : '失败')
            setStatusType('idle')
          }

          const finishedAt = Date.now()
          const entry = {
            jobId,
            config: { ...config },
            status: st,
            startedAt: runStartRef.current || finishedAt,
            finishedAt,
            logs: runLogsRef.current.slice(),
          }
          setHistory((prev) => [entry, ...prev])

          runLogsRef.current = []
          runStartRef.current = null

          if (jobUnsubRef.current) {
            jobUnsubRef.current()
            jobUnsubRef.current = null
          }
        }
      })
    } catch (error: unknown) {
      console.error(error)
      setIsDeploying(false)
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`, 'logError')
      messageApi.error('启动失败')
    }
  }

  const cancelDeployment = async () => {
    if (!currentJobId) return
    await deploymentApi.cancelJob(currentJobId)
    addLog('User requested cancellation...', 'logWarning')
    if (jobUnsubRef.current) {
      jobUnsubRef.current()
      jobUnsubRef.current = null
    }
    setIsDeploying(false)
    setStatusText('已取消')
    setStatusType('idle')
    setHistory((prev) =>
      prev.map((h) => (h.jobId === currentJobId ? { ...h, status: 'cancelled', finishedAt: Date.now() } : h))
    )
    setCurrentJobId(null)
  }

  const viewHistoryLogs = (jobId: string) => {
    const h = history.find((x) => x.jobId === jobId)
    if (!h) return
    setLogs(h.logs || [])
    setStatusText(`查看历史 ${jobId}`)
    setStatusType('idle')
    setShowResult(false)
    setActiveStep(-1)
  }

  const retryDeployment = async (oldJobId: string) => {
    if (isDeploying) {
      messageApi.warning('已有部署在进行中，请稍候再试')
      return
    }
    const h = history.find((x) => x.jobId === oldJobId)
    if (!h) {
      messageApi.error('未找到历史记录')
      return
    }

    try {
      setIsDeploying(true)
      setShowResult(false)
      setStatusText('重新部署中...')
      setStatusType('warning')
      setLogs([])

      const res = await deploymentApi.createJob(h.config)
      const jobId = res.jobId
      setCurrentJobId(jobId)
      runStartRef.current = Date.now()
      runLogsRef.current = []

      if (jobUnsubRef.current) jobUnsubRef.current()

      jobUnsubRef.current = deploymentApi.subscribe(jobId, (evt) => {
        if (evt.type === 'log') {
          addLog(evt.payload.message, evt.payload.type)
          runLogsRef.current.push({
            time: new Date().toLocaleTimeString(),
            message: evt.payload.message,
            type: evt.payload.type,
          })
        }
        if (evt.type === 'step') setActiveStep(evt.payload.step)
        if (evt.type === 'status') {
          const st = evt.payload.status
          setIsDeploying(false)
          setCurrentJobId(null)
          setActiveStep(-1)
          if (st === 'success') {
            setStatusText('部署成功')
            setStatusType('success')
            setShowResult(true)
            messageApi.success('部署成功')
          } else {
            setStatusText(st === 'cancelled' ? '已取消' : '失败')
            setStatusType('idle')
          }

          const finishedAt = Date.now()
          const entry = {
            jobId,
            config: { ...h.config },
            status: st,
            startedAt: runStartRef.current || finishedAt,
            finishedAt,
            logs: runLogsRef.current.slice(),
          }
          setHistory((prev) => [entry, ...prev])

          runLogsRef.current = []
          runStartRef.current = null

          if (jobUnsubRef.current) {
            jobUnsubRef.current()
            jobUnsubRef.current = null
          }
        }
      })
    } catch {
      console.error(new Error('retry failed'))
      setIsDeploying(false)
      messageApi.error('重试失败')
    }
  }

  const resetDeployment = () => {
    if (isDeploying) return
    setActiveStep(-1)
    setShowResult(false)
    setLogs([{ time: new Date().toLocaleTimeString(), message: 'Ready to start new deployment.', type: 'logInfo' }])
    setStatusText('系统就绪')
    setStatusType('idle')
  }

  const openProject = () => {
    messageApi.info('正在打开应用...')
    setTimeout(() => {
      const win = window.open('', '_blank')
      if (win) {
        win.document.write(`
          <style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#f0f9ff;color:#0284c7;flex-direction:column}h1{font-size:2rem;margin-bottom:10px}.spinner{width:40px;height:40px;border:4px solid #bae6fd;border-top:4px solid #0284c7;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>
          <div class="spinner"></div><h1>App Loaded</h1><p>Served at ${config.nginxPath}</p>
        `)
        win.document.close()
      }
    }, 1000)
  }

  const getStatusStyle = (): CSSProperties => {
    switch (statusType) {
      case 'warning':
        return { color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.2)' }
      case 'success':
        return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }
      default:
        return { borderColor: 'rgba(255,255,255,0.1)' }
    }
  }

  return (
    <FixTabPanelWithFill fill={true}>
      <div className={styles.app}>
        {contextHolder}
        <header className={styles.header}>
          <div className={styles.brand}>
            <div className={styles['brand-icon']}>D</div>
            <span>AutoDeploy 控制台</span>
          </div>
          <div className={styles.statusBadge} style={getStatusStyle()}>
            {statusText}
          </div>
        </header>

        <main className={styles.main}>
          <Sidebar
            config={config}
            setConfig={setConfig}
            isDeploying={isDeploying}
            onStart={startDeployment}
            onReset={resetDeployment}
            onCancel={cancelDeployment}
            errors={errors}
            isConfigValid={isConfigValid}
          />

          <div className={styles.deploymentArea}>
            <Pipeline activeStep={activeStep} />

            {showResult && (
              <div className={`${styles.resultCard}`}>
                <div className={styles.resultIcon}>🎉</div>
                <h3>部署成功！</h3>
                <p>项目已成功部署到 Nginx 服务器。</p>
                <Button type="primary" onClick={openProject}>
                  🌐 打开项目
                </Button>
              </div>
            )}

            <div className={styles.splitArea}>
              <div className={styles.leftPane}>
                <Terminal logs={logs} />
              </div>
              <aside className={styles.historyPanel} aria-label="部署历史">
                <h3>部署历史</h3>
                {history.length === 0 ? (
                  <div className={styles.hint}>暂无历史记录</div>
                ) : (
                  <div>
                    {history.map((h) => (
                      <Card
                        size="small"
                        key={h.jobId}
                        className={styles.historyCard}
                        title={<div className={styles.historyTitle}>{h.jobId}</div>}
                        extra={
                          <Space>
                            <Button size="small" onClick={() => viewHistoryLogs(h.jobId)}>
                              查看日志
                            </Button>
                            <Button size="small" onClick={() => retryDeployment(h.jobId)}>
                              重试
                            </Button>
                          </Space>
                        }
                        style={{ marginBottom: 10 }}
                      >
                        <div className={styles.historyRow}>
                          <div className={styles.historyTime}>{new Date(h.startedAt).toLocaleString()}</div>
                          <div className={styles.historyNote}>状态: {h.status}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>
        </main>
      </div>
    </FixTabPanelWithFill>
  )
}
