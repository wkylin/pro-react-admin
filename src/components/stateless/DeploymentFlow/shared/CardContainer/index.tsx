import React from 'react'
import { SectionBadge } from '../SectionBadge'

interface Props {
  title: string
  icon: React.ReactNode
  summary: string
  children: React.ReactNode
  isLeft: boolean
  color: string
  phaseNumber: string
  label: string
}

export const CardContainer: React.FC<Props> = ({
  title,
  icon,
  summary,
  children,
  isLeft,
  color,
  phaseNumber,
  label,
}) => {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #fff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 顶部颜色条 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: color,
        }}
      ></div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
        }}
      >
        <SectionBadge phaseNumber={phaseNumber} label={label} isLeft={isLeft} />

        <div
          style={{
            fontSize: '20px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: 0,
            color: '#263238',
            flexDirection: isLeft ? 'row-reverse' : 'row',
            justifyContent: isLeft ? 'flex-end' : 'flex-start',
          }}
        >
          {icon}
          <span>{title}</span>
        </div>

        <div
          style={{
            fontSize: '14px',
            color: '#546e7a',
            lineHeight: '1.7',
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #cfd8dc',
            position: 'relative',
          }}
        >
          {summary}
        </div>

        {children}
      </div>
    </div>
  )
}
