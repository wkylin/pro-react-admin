import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Button, message, Form, Input, Steps, Card, Tag, Space } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import styles from './index.module.less'
import mockApi from './mockApi'

// 子组件：配置侧边栏
const Sidebar = ({ config, setConfig, isDeploying, onStart, onReset, onCancel, errors = {}, isConfigValid }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(config)
  }, [config])

  return (
    <aside className={styles.sidebar}>
      <Form
        form={form}
        layout="vertical"
        initialValues={config}
        onValuesChange={(changed, all) => setConfig({ ...config, ...all })}
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
const Pipeline = ({ activeStep }) => {
  const steps = [{ title: '拉取代码' }, { title: '安装依赖' }, { title: '构建项目' }, { title: 'Nginx 部署' }]
  const getStatus = (i) => {
    if (activeStep == null || activeStep < 0) return 'wait'
    if (i < activeStep) return 'finish'
    if (i === activeStep) return 'process'
    return 'wait'
  }

  const items = steps.map((s, i) => ({
    key: String(i),
    title: s.title,
  }))

  return (
    <div className={styles.pipeline} style={{ marginBottom: 12 }}>
      <Steps items={items} current={activeStep >= 0 ? activeStep : undefined} size="small" />
    </div>
  )
}

// 子组件：终端日志
const Terminal = ({ logs }) => {
  const terminalEndRef = useRef(null)

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
          {logs.map((log, idx) => `[${log.time}] ${log.message}\n`)}
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
  const [statusType, setStatusType] = useState('idle')

  const [logs, setLogs] = useState(() => {
    const base = [
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

  const [config, setConfig] = useState(() => {
    const defaults = {
      repo: 'https://github.com/wkylin/pro-react-admin.git',
      buildCmd: 'npm run build',
      distDir: 'dist',
      nginxPath: '/var/www/html/pro-react-admin',
    }
    try {
      const saved = localStorage.getItem('autodeploy_config')
      if (saved) {
        const parsed = JSON.parse(saved) || {}
        delete parsed.sshKey
        delete parsed.envVars
        return { ...defaults, ...parsed }
      }
    } catch {}
    return defaults
  })
  const [currentJobId, setCurrentJobId] = useState(null)
  const jobUnsubRef = useRef(null)
  const runLogsRef = useRef([])
  const runStartRef = useRef(null)
  const [history, setHistory] = useState([])

  const addLog = (message, type = 'logInfo') => {
    setLogs((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        message,
        type,
      },
    ])
  }

  const validateConfig = (c) => {
    const errs = {}
    if (!c.repo || c.repo.trim() === '') errs.repo = '仓库地址不能为空'
    else if (!/^(git@|https?:\/\/)/.test(c.repo)) errs.repo = '仓库地址格式不正确'
    if (!c.buildCmd || c.buildCmd.trim() === '') errs.buildCmd = '构建命令不能为空'
    if (!c.distDir || c.distDir.trim() === '') errs.distDir = '输出目录不能为空'
    if (!c.nginxPath || c.nginxPath.trim() === '') errs.nginxPath = 'Nginx 部署路径不能为空'
    return errs
  }

  const errors = useMemo(() => validateConfig(config), [config])
  const isConfigValid = useMemo(() => Object.keys(errors).length === 0, [errors])

  useEffect(() => {
    try {
      const toSave = { ...(config || {}) }
      delete toSave.sshKey
      delete toSave.envVars
      localStorage.setItem('autodeploy_config', JSON.stringify(toSave))
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

      const res = await mockApi.createJob(config)
      const jobId = res.jobId
      setCurrentJobId(jobId)

      runStartRef.current = Date.now()
      runLogsRef.current = []

      if (jobUnsubRef.current) jobUnsubRef.current()

      jobUnsubRef.current = mockApi.subscribe(jobId, (evt) => {
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
    } catch (error) {
      console.error(error)
      setIsDeploying(false)
      addLog(`Error: ${error.message}`, 'logError')
      messageApi.error('启动失败')
    }
  }

  const cancelDeployment = async () => {
    if (!currentJobId) return
    await mockApi.cancelJob(currentJobId)
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

  const viewHistoryLogs = (jobId) => {
    const h = history.find((x) => x.jobId === jobId)
    if (!h) return
    setLogs(h.logs || [])
    setStatusText(`查看历史 ${jobId}`)
    setStatusType('idle')
    setShowResult(false)
    setActiveStep(-1)
  }

  const retryDeployment = async (oldJobId) => {
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

      const res = await mockApi.createJob(h.config || {})
      const jobId = res.jobId
      setCurrentJobId(jobId)
      runStartRef.current = Date.now()
      runLogsRef.current = []

      if (jobUnsubRef.current) jobUnsubRef.current()

      jobUnsubRef.current = mockApi.subscribe(jobId, (evt) => {
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
            config: { ...(h.config || {}) },
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

  const getStatusStyle = () => {
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
    <FixTabPanel fill={true}>
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
    </FixTabPanel>
  )
}
