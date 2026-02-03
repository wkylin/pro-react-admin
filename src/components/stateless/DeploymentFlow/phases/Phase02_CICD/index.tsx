import React from 'react'
import AnimationInView from '@stateless/AnimInView'
import { CardContainer } from '../../shared/CardContainer'

const Step: React.FC<{ title: string; desc: string; type: 'ci' | 'cd' }> = ({ title, desc, type }) => (
  <div
    style={{
      flex: 1,
      position: 'relative',
      border: '1px solid #eee',
      borderRadius: '6px',
      padding: '8px',
      fontSize: '11px',
      textAlign: 'center',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      borderLeft: type === 'ci' ? '3px solid #ef6c00' : '3px solid #2e7d32',
      background: type === 'cd' ? '#f1f8e9' : 'white',
    }}
  >
    <h5
      style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: '600', color: type === 'ci' ? '#ef6c00' : '#2e7d32' }}
    >
      {title}
    </h5>
    <p style={{ margin: 0, color: '#999', fontSize: '10px' }}>{desc}</p>
  </div>
)

const Phase02: React.FC<{ isLeft: boolean; scrollContainerRef?: React.RefObject<HTMLElement> }> = ({
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
        phaseNumber="PHASE 02"
        label="CI/CD PIPELINE"
        title="自动化构建与交付"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
          </svg>
        }
        summary="<strong>构建物交付 (CI)</strong> 生成静态资源与 Docker 镜像，确保质量门禁通过；<strong>运行时交付 (CD)</strong> 将不可变镜像部署至 K8s 集群，实现容器化运行。"
        color="#ef6c00"
      >
        <div
          style={{
            marginTop: '15px',
            border: '1px solid #eee',
            borderRadius: '8px',
            overflow: 'hidden',
            background: 'white',
          }}
        >
          <div style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#90a4ae',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef6c00' }}></div>
              持续集成 - 生成构建物
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
              <Step title="Checkout" desc="代码检出" type="ci" />
              <Step title="Lint" desc="规范检查" type="ci" />
              <Step title="Test" desc="单元测试" type="ci" />
              <Step title="Scan" desc="安全扫描" type="ci" />
              <Step title="Build" desc="构建产物" type="ci" />
            </div>
          </div>
          <div
            style={{
              background: '#37474f',
              color: 'white',
              padding: '10px',
              textAlign: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              fontSize: '11px',
              borderTop: '2px dashed #78909c',
              borderBottom: '2px dashed #78909c',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              📦 dist.tar.gz
            </div>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '6px solid rgba(255,255,255,0.7)',
              }}
            ></div>
            <span style={{ opacity: 0.8, fontSize: '10px' }}>Artifact Delivery</span>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '6px solid rgba(255,255,255,0.7)',
              }}
            ></div>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              🐳 Docker Image
            </div>
          </div>
          <div style={{ padding: '15px', background: '#fcfcfc' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#90a4ae',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2e7d32' }}></div>
              持续部署 - 运行时实例
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
              <Step title="Push Image" desc="推送仓库" type="cd" />
              <Step title="Quality Gate" desc="质量门禁" type="cd" />
              <Step title="Approval" desc="人工审批" type="cd" />
              <Step title="Deploy" desc="K8s 部署" type="cd" />
              <Step title="Notify" desc="通知告警" type="cd" />
            </div>
          </div>
        </div>
      </CardContainer>
    </AnimationInView>
  )
}

export default Phase02
