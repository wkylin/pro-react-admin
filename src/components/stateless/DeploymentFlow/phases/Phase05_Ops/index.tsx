import React from 'react'
import AnimationInView from '@stateless/AnimInView'
import { CardContainer } from '../../shared/CardContainer'

const Section: React.FC<{ title: string; tags: string[]; highlight?: boolean; extraContent?: React.ReactNode }> = ({
  title,
  tags,
  highlight,
  extraContent,
}) => (
  <div
    style={{
      background: 'white',
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '15px',
      marginTop: '10px',
      ...(highlight && { background: '#fff3e0', borderColor: '#ffe0b2' }),
    }}
  >
    <div
      style={{
        fontSize: '12px',
        fontWeight: 700,
        color: '#666',
        marginBottom: '10px',
        borderBottom: '1px solid #eee',
        paddingBottom: '8px',
        ...(highlight && { color: '#ef6c00', borderBottomColor: '#ffe0b2' }),
      }}
    >
      {title}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {tags.map((tag, idx) => (
        <span
          key={idx}
          style={{
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '4px',
            background: '#f5f5f5',
            color: '#555',
            border: '1px solid #eee',
            ...(highlight &&
              tag.includes('回滚') && {
                color: '#ef6c00',
                background: 'white',
                border: '1px solid #ef6c00',
                fontWeight: 'bold',
                fontSize: '13px',
                padding: '6px 12px',
              }),
          }}
        >
          {tag}
        </span>
      ))}
    </div>
    {extraContent}
  </div>
)

const Phase05: React.FC<{ isLeft: boolean; scrollContainerRef?: React.RefObject<HTMLElement> }> = ({
  isLeft,
  scrollContainerRef,
}) => {
  return (
    <AnimationInView
      as="div"
      scrollContainerRef={scrollContainerRef}
      amount={0.15}
      once={true}
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    >
      <CardContainer
        isLeft={isLeft}
        phaseNumber="PHASE 05"
        label="OBSERVABILITY & OPS"
        title="可观测性与稳定性保障"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
          </svg>
        }
        summary="建立包含性能、错误、日志及业务指标的立体监控体系。结合容器化基础设施，具备秒级故障发现与一键回滚能力，确保服务 SLA。"
        color="#c62828"
      >
        <Section
          title="🛠 基础设施"
          tags={['Kubernetes (K8s)', 'Docker', 'Service Mesh (Istio)', 'Config Center (Apollo)', 'Registry (Harbor)']}
        />
        <Section
          title="📊 监控体系"
          tags={['Sentry (错误)', 'APM / RUM (性能)', 'ELK / Loki (日志)', 'Jaeger (链路追踪)', 'Grafana (大盘)']}
        />
        <div style={{ marginTop: '10px' }}>
          <Section
            title="🛡 容灾回滚机制"
            highlight={true}
            tags={['🔄 一键回滚']}
            extraContent={
              <div style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>
                支持秒级回退至上一稳定版本，基于 K8s ReplicaSet 历史记录。
              </div>
            }
          />
        </div>
      </CardContainer>
    </AnimationInView>
  )
}

export default Phase05
