import React, { useState, useEffect, useRef, useMemo } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import styles from './index.module.less'
import mockApi from './mockApi'
import { Button } from 'antd'

// 子组件：配置侧边栏
const Sidebar = ({ config, setConfig, isDeploying, onStart, onReset, onCancel, errors = {}, isConfigValid }) => (
  <aside className={styles.sidebar}>
    <section>
      <h2>项目配置</h2>
      <div className={styles.formGroup}>
        <label>Git 仓库地址</label>
        <input
          type="text"
          value={config.repo}
          onChange={(e) => setConfig({ ...config, repo: e.target.value })}
          placeholder="https://github.com/user/repo.git"
        />
      </div>
      <div className={styles.formGroup}>
        <label>构建命令</label>
        <input
          type="text"
          value={config.buildCmd}
          onChange={(e) => setConfig({ ...config, buildCmd: e.target.value })}
        />
        {errors.buildCmd && <div className={styles.fieldError}>{errors.buildCmd}</div>}
      </div>
      <div className={styles.formGroup}>
        <label>输出目录</label>
        <input
          type="text"
          value={config.distDir}
          onChange={(e) => setConfig({ ...config, distDir: e.target.value })}
        />
        {errors.distDir && <div className={styles.fieldError}>{errors.distDir}</div>}
      </div>
      <div className={styles.formGroup}>
        <label>Nginx 部署路径</label>
        <input
          type="text"
          value={config.nginxPath}
          onChange={(e) => setConfig({ ...config, nginxPath: e.target.value })}
        />
        {errors.nginxPath && <div className={styles.fieldError}>{errors.nginxPath}</div>}
      </div>

      <div className={styles.formGroup}>
        <label>SSH 私钥（可选，部署到远程服务器）</label>
        <textarea
          rows={2}
          value={config.sshKey}
          onChange={(e) => setConfig({ ...config, sshKey: e.target.value })}
          placeholder="-----BEGIN OPENSSH PRIVATE KEY-----"
        />
      </div>

      <div className={styles.formGroup}>
        <label>环境变量（KEY=VALUE，每行一条）</label>
        <textarea
          rows={2}
          value={config.envVars}
          onChange={(e) => setConfig({ ...config, envVars: e.target.value })}
          placeholder="NODE_ENV=production\nAPI_URL=https://..."
        />
      </div>
    </section>

    <section>
      <h2>操作</h2>
      <div className={styles.actionsRow}>
        <Button
          type="primary"
          size="middle"
          onClick={() => { if (!isDeploying) onStart && onStart(); }}
          disabled={isDeploying}
        >
          🚀 {isDeploying ? '部署中...' : '开始部署'}
        </Button>
        <Button
          size="middle"
          onClick={() => { if (!isDeploying) onReset && onReset(); }}
          disabled={isDeploying}
        >
          重置
        </Button>
        {isDeploying && (
          <Button size="middle" danger onClick={onCancel}>
            取消部署
          </Button>
        )}
      </div>
    </section>

    {/* envInfo removed for cleaner UI (sensitive info omitted) */}
  </aside>
);

// 子组件：进度条管道
const Pipeline = ({ activeStep }) => {
  const steps = ['拉取代码', '安装依赖', '构建项目', 'Nginx 部署'];

  return (
    <div className={styles.pipeline}>
      {steps.map((label, index) => {
        let stepClass = styles.step;
        if (index < activeStep) stepClass += ` ${styles.completed}`;
        if (index === activeStep) stepClass += ` ${styles.active}`;

        return (
          <div key={index} className={stepClass}>
            <div className={styles.stepIcon}>{index + 1}</div>
            <div className={styles.stepLabel}>{label}</div>
          </div>
        );
      })}
    </div>
  );
};

// 子组件：终端日志
const Terminal = ({ logs }) => {
  const terminalEndRef = useRef(null);

  // 自动滚动到底部
  // useEffect(() => {
  //   terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [logs]);

  return (
    <div className={styles.terminal}>
      <div className={styles['terminal-header']}>
        <div className={`${styles.dot} ${styles.red}`}></div>
        <div className={`${styles.dot} ${styles.yellow}`}></div>
        <div className={`${styles.dot} ${styles.green}`}></div>
      </div>
      <div className={styles['terminal-body']}>
        {logs.map((log, idx) => (
          <div key={idx} className={styles.logLine}>
            <span className={styles.logTime}>[{log.time}]</span>
            <span className={styles[log.type]}>{log.message}</span>
          </div>
        ))}
        <div ref={terminalEndRef} className={styles.cursor} />
      </div>
    </div>
  );
};

// 主应用组件
export default function AutoDeploy() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [statusText, setStatusText] = useState('系统就绪');
  const [statusType, setStatusType] = useState('idle'); // idle, warning, success
  const [toast, setToast] = useState({ show: false, msg: '' });

  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), message: 'AutoDeploy CLI v1.0.0 initialized...', type: 'logInfo' },
    { time: new Date().toLocaleTimeString(), message: 'Waiting for configuration...', type: 'logInfo' }
  ]);

  const [config, setConfig] = useState({
    repo: 'https://github.com/wkylin/pro-react-admin.git',
    buildCmd: 'npm run build',
    distDir: 'dist',
    nginxPath: '/var/www/html/pro-react-admin',
    sshKey: '',
    envVars: ''
  });

  const [errors, setErrors] = useState({});
  const [currentJobId, setCurrentJobId] = useState(null);
  const jobUnsubRef = useRef(null);

  const [history, setHistory] = useState([]);

  // 工具函数：添加日志
  const addLog = (message, type = 'logInfo') => {
    setLogs(prev => [...prev, {
      time: new Date().toLocaleTimeString(),
      message,
      type
    }]);
  };

  // 工具函数：延迟
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    try {
      const saved = localStorage.getItem('autodeploy_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig(prev => ({ ...prev, ...parsed }));
        addLog('Loaded saved configuration from localStorage', 'logInfo');
      }
    } catch (e) {
      // ignore
    }
    try {
      const h = localStorage.getItem('autodeploy_history');
      if (h) setHistory(JSON.parse(h));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('autodeploy_config', JSON.stringify({
        repo: config.repo,
        buildCmd: config.buildCmd,
        distDir: config.distDir,
        nginxPath: config.nginxPath,
        sshKey: config.sshKey,
        envVars: config.envVars
      }));
    } catch (e) {
      // ignore
    }
  }, [config]);

  // persist history
  useEffect(() => {
    try { localStorage.setItem('autodeploy_history', JSON.stringify(history)); } catch (e) {}
  }, [history]);

  // 配置校验
  const validateConfig = (c) => {
    const errs = {};
    if (!c.repo || c.repo.trim() === '') errs.repo = '仓库地址不能为空';
    else if (!/^((git|https?):)|git@/.test(c.repo)) errs.repo = '仓库地址看起来不正确';
    if (!c.buildCmd || c.buildCmd.trim() === '') errs.buildCmd = '构建命令不能为空';
    if (!c.distDir || c.distDir.trim() === '') errs.distDir = '输出目录不能为空';
    if (!c.nginxPath || c.nginxPath.trim() === '') errs.nginxPath = 'Nginx 部署路径不能为空';
    return errs;
  };

  const isConfigValid = useMemo(() => {
    const errs = validateConfig(config);
    setErrors(errs);
    return Object.keys(errs).length === 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.repo, config.buildCmd, config.distDir, config.nginxPath]);

  // 显示 Toast
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  // 部署逻辑（通过 mockApi）
  const startDeployment = async () => {
    if (isDeploying) return;

    const validation = validateConfig(config);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      Object.values(validation).forEach(msg => addLog(msg, 'logError'));
      showToast('请修正表单错误后再开始部署');
      return;
    }

    setIsDeploying(true);
    setShowResult(false);
    setStatusText('正在部署...');
    setStatusType('warning');
    setLogs([]);

    const res = await mockApi.createJob(config);
    const jobId = res.jobId;
    setCurrentJobId(jobId);

    // add history entry
    const entry = { jobId, config: { ...config }, status: 'running', startedAt: Date.now(), logs: [] };
    setHistory(prev => [entry, ...prev]);

    // subscribe
    if (jobUnsubRef.current) jobUnsubRef.current();
    jobUnsubRef.current = mockApi.subscribe(jobId, (evt) => {
      if (evt.type === 'log') {
        addLog(evt.payload.message, evt.payload.type);
        // push to history latest
        setHistory(prev => {
          const copy = prev.slice();
          const idx = copy.findIndex(h => h.jobId === jobId);
          if (idx >= 0) copy[idx] = { ...copy[idx], logs: [...copy[idx].logs, evt.payload] };
          return copy;
        });
      }
      if (evt.type === 'step') {
        setActiveStep(evt.payload.step);
      }
      if (evt.type === 'status') {
        const st = evt.payload.status;
        setStatusText(st === 'success' ? '部署成功' : st === 'cancelled' ? '已取消' : '失败');
        setStatusType(st === 'success' ? 'success' : st === 'cancelled' ? 'idle' : 'warning');
        setIsDeploying(false);
        setCurrentJobId(null);
        setActiveStep(-1);
        if (st === 'success') setShowResult(true);
        // update history
        setHistory(prev => {
          const copy = prev.slice();
          const idx = copy.findIndex(h => h.jobId === jobId);
          if (idx >= 0) copy[idx] = { ...copy[idx], status: st, finishedAt: Date.now() };
          return copy;
        });
        if (jobUnsubRef.current) { jobUnsubRef.current(); jobUnsubRef.current = null; }
      }
    });
  };

  const cancelDeployment = async () => {
    if (!currentJobId) return;
    await mockApi.cancelJob(currentJobId);
    showToast('已发送取消请求');
  };

  const retryDeployment = async (jobId) => {
    const res = await mockApi.retryJob(jobId);
    // reuse start flow by subscribing to new job
    const newJobId = res.jobId;
    setCurrentJobId(newJobId);
    const entry = { jobId: newJobId, config: { ...config }, status: 'running', startedAt: Date.now(), logs: [] };
    setHistory(prev => [entry, ...prev]);
    if (jobUnsubRef.current) jobUnsubRef.current();
    jobUnsubRef.current = mockApi.subscribe(newJobId, (evt) => {
      if (evt.type === 'log') addLog(evt.payload.message, evt.payload.type);
      if (evt.type === 'step') setActiveStep(evt.payload.step);
      if (evt.type === 'status') {
        setIsDeploying(false);
        setCurrentJobId(null);
        setActiveStep(-1);
        setHistory(prev => {
          const copy = prev.slice();
          const idx = copy.findIndex(h => h.jobId === newJobId);
          if (idx >= 0) copy[idx] = { ...copy[idx], status: evt.payload.status, finishedAt: Date.now() };
          return copy;
        });
      }
    });
    setIsDeploying(true);
    setStatusText('正在部署...');
    setStatusType('warning');
  };

  const viewHistoryLogs = (jobId) => {
    const h = history.find(h => h.jobId === jobId);
    if (!h) return;
    setLogs(h.logs || []);
    setStatusText(`查看历史 ${jobId}`);
  };

  const resetDeployment = () => {
    if (isDeploying) return;
    setActiveStep(-1);
    setShowResult(false);
    setLogs([
      { time: new Date().toLocaleTimeString(), message: 'Ready to start new deployment.', type: 'logInfo' }
    ]);
    setStatusText('系统就绪');
    setStatusType('idle');
  };

  const openProject = () => {
    showToast("正在在新标签页打开应用...");
    setTimeout(() => {
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(`
          <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f9ff; color: #0284c7; flex-direction: column; }
            h1 { font-size: 2rem; margin-bottom: 10px; }
            .spinner { width: 40px; height: 40px; border: 4px solid #bae6fd; border-top: 4px solid #0284c7; border-radius: 50%; animation: spin 1s linear infinite; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          </style>
          <div class="spinner"></div>
          <h1>Pro React Admin App Loaded</h1>
          <p>Served by Nginx at ${config.nginxPath}</p>
        `);
        win.document.close();
      }
    }, 1000);
  };

  // 根据状态动态设置Badge样式
  const getStatusStyle = () => {
    switch (statusType) {
      case 'warning': return { color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' };
      case 'success': return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' };
      default: return {};
    }
  };

  return (
    <FixTabPanel fill={true}>
      <div className={styles.app}>
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
            errors={errors}
            isConfigValid={isConfigValid}
          />

          <div className={styles.deploymentArea}>
            <Pipeline activeStep={activeStep} />

            {showResult && (
              <div className={`${styles.resultCard} ${styles.show}`}>
                <div className={styles.resultIcon}>🎉</div>
                <h3>部署成功！</h3>
                <p>项目已成功部署到 Nginx 服务器。</p>
                <Button type="primary" onClick={openProject}>🌐 打开项目</Button>
              </div>
            )}

            <div className={styles.splitArea}>
              <div className={styles.leftPane}>
                <Terminal logs={logs} />
              </div>
              <aside className={styles.historyPanel} aria-label="部署历史">
                <h3>部署历史</h3>
                {history.length === 0 && <div className={styles.hint}>暂无历史记录</div>}
                <ul>
                  {history.map(h => (
                    <li key={h.jobId} className={styles.historyItem}>
                      <div className={styles.historyMeta}>
                        <div>{h.jobId}</div>
                        <div className={styles.small}>{new Date(h.startedAt).toLocaleString()}</div>
                      </div>
                      <div className={styles.historyActions}>
                        <Button size="small" onClick={() => viewHistoryLogs(h.jobId)} disabled={isDeploying}>查看日志</Button>
                        <Button size="small" onClick={() => retryDeployment(h.jobId)} disabled={isDeploying}>重试</Button>
                        {h.status === 'running' && <Button size="small" danger onClick={() => cancelDeployment(h.jobId)} disabled={!isDeploying}>取消</Button>}
                      </div>
                      <div className={styles.small}>状态: {h.status}</div>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </main>

        {toast.show && (
          <div className={`${styles.toast} ${styles.show}`}>
            {toast.msg}
          </div>
        )}
      </div>
    </FixTabPanel>
  );
}