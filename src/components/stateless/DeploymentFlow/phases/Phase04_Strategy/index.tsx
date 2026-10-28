import React from 'react'
import AnimationInView from '@wui/animation/AnimInView'
import { CardContainer } from '../../shared/CardContainer'

const Phase04: React.FC<{ isLeft: boolean; scrollContainerRef?: React.RefObject<HTMLElement> }> = ({
  isLeft,
  scrollContainerRef,
}) => {
  const strategies = [
    { icon: '🔄', title: '蓝绿部署', desc: 'Blue-Green Deployment', note: '全量切换，秒级回滚' },
    { icon: '🐤', title: '金丝雀发布', desc: 'Canary Release', note: '渐进式流量引入' },
    { icon: '⚡', title: '滚动发布', desc: 'Rolling Update', note: '逐个替换，零停机' },
    { icon: '🧪', title: 'A/B Testing', desc: '流量分割测试', note: '验证业务假设' },
    { icon: '🎛️', title: 'Feature Flag', desc: '特性开关', note: '动态控制功能可见性，代码发布与功能解耦', full: true },
  ]

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
        phaseNumber="PHASE 04"
        label="DEPLOYMENT STRATEGY"
        title="高可用发布与流量治理"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        }
        summary="基于服务网格 实现精细化流量控制。结合特性开关 实现业务功能的按需灰度，在保障系统稳定性的同时，加速业务迭代闭环。"
        color="#6a1b9a"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '15px' }}>
          {strategies.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--wui-bg-elevated)',
                border: '1px solid var(--wui-border)',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center',
                transition: '0.2s',
                ...(item.full && { gridColumn: '1 / -1' }),
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6a1b9a')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--wui-border)')}
            >
              <span style={{ fontSize: '20px', marginBottom: '6px', display: 'block' }}>{item.icon}</span>
              <strong style={{ fontWeight: 700, fontSize: '13px', color: 'var(--wui-text-primary)', display: 'block' }}>
                {item.title}
              </strong>
              <span style={{ fontSize: '10px', color: 'var(--wui-text-muted)', marginTop: '4px', display: 'block' }}>
                {item.desc}
              </span>
              {item.note && (
                <span style={{ fontSize: '9px', color: 'var(--wui-text-muted)', display: 'block', marginTop: '4px' }}>
                  {item.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContainer>
    </AnimationInView>
  )
}

export default Phase04
