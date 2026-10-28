import React from 'react'
import AnimationInView from '@wui/animation/AnimInView'
import { CardContainer } from '../../shared/CardContainer'

const Phase03: React.FC<{ isLeft: boolean; scrollContainerRef?: React.RefObject<HTMLElement> }> = ({
  isLeft,
  scrollContainerRef,
}) => {
  const envs = [
    { id: 'DEV', label: '开发环境' },
    { id: 'TEST', label: '测试环境' },
    { id: 'STAGING', label: '预发环境' },
    { id: 'GRAY', label: '灰度/金丝雀', special: true, color: '#6a1b9a', textColor: 'white' },
    { id: 'PROD', label: '生产环境', special: true, color: '#2e7d32', textColor: 'white' },
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
        phaseNumber="PHASE 03"
        label="ENVIRONMENT"
        title="环境隔离与渐进式交付"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        }
        summary="严格的环境隔离策略，开发自测、测试联调、预发仿真。通过 GitOps 同步配置，确保灰度环境与生产环境配置的一致性，降低发布风险。"
        color="#2e7d32"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
            background: 'var(--wui-bg-elevated)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid var(--wui-border)',
            position: 'relative',
          }}
        >
          {envs.map((env, index) => (
            <React.Fragment key={env.id}>
              {index !== envs.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    background: 'var(--wui-border-strong)',
                    margin: '0 5px',
                    position: 'relative',
                    top: '-18px',
                    zIndex: 1,
                  }}
                ></div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: env.color || 'var(--wui-bg-subtle)',
                    border: '2px solid var(--wui-border-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: env.textColor || 'var(--wui-text-muted)',
                    transition: 'all 0.3s',
                  }}
                >
                  {env.id}
                </div>
                <div style={{ marginTop: '6px', fontSize: '10px', color: 'var(--wui-text-muted)', fontWeight: 600 }}>
                  {env.label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContainer>
    </AnimationInView>
  )
}

export default Phase03
