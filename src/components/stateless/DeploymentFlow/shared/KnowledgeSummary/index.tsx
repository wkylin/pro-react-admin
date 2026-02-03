import React from 'react'

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3
    style={{
      fontSize: '18px',
      fontWeight: 700,
      color: '#263238',
      marginBottom: '20px',
      borderBottom: '2px solid #e0e0e0',
      paddingBottom: '10px',
    }}
  >
    {children}
  </h3>
)

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#546e7a', marginTop: '20px', marginBottom: '10px' }}>
    {children}
  </h4>
)

const TextBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ fontSize: '14px', color: '#455a64', lineHeight: '1.8', marginBottom: '12px' }}>{children}</p>
)

const ListPoint: React.FC<{ highlight?: boolean; children: React.ReactNode }> = ({ highlight, children }) => (
  <li
    style={{
      fontSize: '14px',
      color: '#455a64',
      lineHeight: '1.8',
      marginBottom: '8px',
      marginLeft: '20px',
      background: highlight ? '#fff3e0' : 'transparent',
      padding: highlight ? '4px 8px' : '0',
      borderRadius: '4px',
      borderLeft: highlight ? '3px solid #ff9800' : 'none',
    }}
  >
    {children}
  </li>
)

// const GridCard: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
//   <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
//     <strong style={{ display: 'block', color: '#263238', marginBottom: '10px', fontSize: '15px' }}>{title}</strong>
//     <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
//       {items.map((item, idx) => <ListPoint key={idx}>{item}</ListPoint>)}
//     </ul>
//   </div>
// );

const KnowledgeSummary: React.FC = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
      <SectionTitle>💡 核心实施规则与原理解析</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* 左侧：Phase 04 发布策略详解 */}
        <div>
          <SubTitle>📦 Phase 04: 发布策略实现原理</SubTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <strong style={{ color: '#2e7d32' }}>🔄 蓝绿部署</strong>
              <TextBlock>
                基于负载均衡器或 Service Mesh 的路由配置。准备两套环境，验证无误后修改路由指向新版本，实现瞬间切换。
              </TextBlock>
              <ul>
                <ListPoint>
                  <strong>实现：</strong>Kubernetes Service Mesh (Istio) 或 Nginx upstream 切换。
                </ListPoint>
                <ListPoint>
                  <strong>特点：</strong>秒级回滚，全量测试，但资源消耗大（需双倍机器）。
                </ListPoint>
              </ul>
            </div>

            <div>
              <strong style={{ color: '#2e7d32' }}>🐤 金丝雀发布</strong>
              <TextBlock>
                在生产环境中，让小部分用户流量（如 5%）访问新版本，监控错误率和性能，逐步扩大流量占比。
              </TextBlock>
              <ul>
                <ListPoint>
                  <strong>实现：</strong>Istio VirtualService 的 <code>weight</code> 权重控制。
                </ListPoint>
                <ListPoint>
                  <strong>特点：</strong>渐进式引入流量，注重监控验证，风险低于蓝绿部署。
                </ListPoint>
              </ul>
            </div>

            <div>
              <strong style={{ color: '#2e7d32' }}>⚡ 滚动发布</strong>
              <TextBlock>系统自动分批次替换旧实例。每次启动新 Pod，停止旧 Pod，保持服务始终可用。</TextBlock>
              <ul>
                <ListPoint>
                  <strong>实现：</strong>Kubernetes Deployment 默认策略，设置 <code>maxSurge</code> 和{' '}
                  <code>maxUnavailable</code>。
                </ListPoint>
                <ListPoint>
                  <strong>特点：</strong>无资源浪费，适合日常迭代，但回滚相对较慢。
                </ListPoint>
              </ul>
            </div>

            <div>
              <strong style={{ color: '#2e7d32' }}>🧪 A/B Testing</strong>
              <TextBlock>为了验证业务假设（如 UI 改版能否提高转化率），将用户分流到不同版本。</TextBlock>
              <ul>
                <ListPoint>
                  <strong>实现：</strong>前端 SDK 或网关注入 Header (X-Experiment-Group)，需要保持用户流量粘性。
                </ListPoint>
                <ListPoint>
                  <strong>特点：</strong>关注业务指标（转化率），而非单纯的技术稳定性。
                </ListPoint>
              </ul>
            </div>

            <div>
              <strong style={{ color: '#2e7d32' }}>🎛️ Feature Flag</strong>
              <TextBlock>代码部署与功能发布解耦。代码已上线但功能开关关闭，通过配置中心动态开启。</TextBlock>
              <ul>
                <ListPoint>
                  <strong>实现：</strong>配置中心 + 前端 SDK。
                </ListPoint>
                <ListPoint>
                  <strong>特点：</strong>极致的安全感（秒关），支持白名单/灰度，但需定期清理废弃开关。
                </ListPoint>
              </ul>
            </div>
          </div>
        </div>

        {/* 右侧：Phase 05 监控运维详解 */}
        <div>
          <SubTitle>🛡️ Phase 05: 监控与运维铁律</SubTitle>

          <div style={{ marginBottom: '20px' }}>
            <strong>🛠 基础设施规则</strong>
            <ul>
              <ListPoint highlight>
                <strong>K8s：</strong>声明式部署，必须配置健康检查，实现秒级自愈。
              </ListPoint>
              <ListPoint highlight>
                <strong>Docker/Istio：</strong>环境一致性；利用 Mesh 实现无侵入熔断和流量治理。
              </ListPoint>
              <ListPoint highlight>
                <strong>Apollo：</strong>配置中心实现业务逻辑热更新（Feature Flag）。
              </ListPoint>
              <ListPoint highlight>
                <strong>Harbor：</strong>镜像仓库必须配置漏洞扫描，阻断高危镜像。
              </ListPoint>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong>📊 监控体系规则</strong>
            <ul>
              <ListPoint highlight>
                <strong>Sentry：</strong>必须上传 <strong>Source Maps</strong>，否则无法定位源码错误。关联 User ID 和
                Release 版本。
              </ListPoint>
              <ListPoint highlight>
                <strong>APM / RUM：</strong>关注 LCP/FID/CLS 等 Web Vitals 指标，量化真实用户体验。
              </ListPoint>
              <ListPoint highlight>
                <strong>ELK：</strong>日志必须 <strong>JSON 结构化</strong> 并注入 <strong>TraceID</strong>
                ，实现端到端排查。
              </ListPoint>
              <ListPoint highlight>
                <strong>Jaeger：</strong>可视化全链路（前端-&gt;网关-&gt;后端-&gt;DB），定位单点耗时瓶颈。
              </ListPoint>
              <ListPoint highlight>
                <strong>Grafana：</strong>统一大盘，设置 SLO 告警（如错误率 &lt; 1%）。
              </ListPoint>
            </ul>
          </div>

          <div>
            <strong>⚙️ 核心铁律 (Iron Rules)</strong>
            <ul>
              <ListPoint>
                <strong>不可变原则：</strong>严禁 SSH 进容器修改文件，变更必须重新构建镜像。
              </ListPoint>
              <ListPoint>
                <strong>数据驱动：</strong>扩容、回滚必须基于监控数据，而非直觉。
              </ListPoint>
              <ListPoint>
                <strong>快速止损：</strong>故障优先级：Config 关停 &gt; K8s Rollback &gt; 代码回滚。
              </ListPoint>
              <ListPoint>
                <strong>全链路贯通：</strong>通过 TraceID 将 前端报错、日志、后端 Trace 串联。
              </ListPoint>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeSummary
