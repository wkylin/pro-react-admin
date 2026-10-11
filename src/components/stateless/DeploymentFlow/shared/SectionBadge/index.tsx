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
        color: isLeft ? 'var(--wui-text-info)' : 'var(--wui-text-warning)',
        background: isLeft ? 'var(--wui-bg-info-subtle)' : 'var(--wui-bg-warning-subtle)',
      }}
    >
      {phaseNumber}: {label}
    </span>
  )
}
