import React from 'react'

interface Props {
  phaseNumber: string
  label: string
  isLeft: boolean
}

export const SectionBadge: React.FC<Props> = ({ phaseNumber, label, isLeft }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        borderRadius: '50px',
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: isLeft ? '#0277bd' : '#ef6c00',
        background: isLeft ? '#e1f5fe' : '#fff3e0',
      }}
    >
      {phaseNumber}: {label}
    </span>
  )
}
