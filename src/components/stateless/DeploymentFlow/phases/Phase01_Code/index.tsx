import React from 'react'
import AnimationInView from '@stateless/AnimInView'
import { CardContainer } from '../../shared/CardContainer'

const Phase01: React.FC<{ isLeft: boolean; scrollContainerRef?: React.RefObject<HTMLElement> }> = ({
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
        phaseNumber="PHASE 01"
        label="CODE MANAGEMENT"
        title="Git Flow 协同开发"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        }
        summary="采用严格的 Git Flow 分支策略与原子提交规范，强制执行 Commitlint 检查。通过 PR 机制确保代码评审质量，保持主干分支 的线性历史与可回溯性。"
        color="#0277bd"
      >
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginTop: '10px',
            justifyContent: isLeft ? 'flex-end' : 'flex-start',
          }}
        >
          <div
            style={{
              flex: 1,
              background: 'white',
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxWidth: '250px',
            }}
          >
            {['main/master (生产)', 'develop (开发)', 'feature/xxx (功能)', 'hotfix/xxx (热修)'].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  borderLeft: '3px solid #ccc',
                  background: '#fafafa',
                  ...(idx === 0 && {
                    borderLeftColor: '#0277bd',
                    fontWeight: 700,
                    color: '#0277bd',
                    background: '#e1f5fe',
                  }),
                  ...(idx === 3 && { borderLeftColor: '#c62828', color: '#c62828', background: '#ffebee' }),
                }}
              >
                {item.split(' (')[0]} <span>{item.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginTop: '5px' }}
        >
          {['关联 Jira ID', 'Squash Merge', 'CI Check Pass', 'Code Review > 1'].map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '10px',
                padding: '4px 8px',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                color: '#555',
                fontWeight: 500,
                ...(idx > 1 && { borderColor: '#2e7d32', color: '#2e7d32', background: '#e8f5e9' }),
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContainer>
    </AnimationInView>
  )
}

export default Phase01
