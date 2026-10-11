import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import DeploymentFlow from '@stateless/DeploymentFlow'

const RichTextEditor = () => {
  const panelRef = useRef(null)

  return (
    <FixTabPanel ref={panelRef}>
      <header
        style={{
          background: 'var(--wui-bg-surface)',
          padding: '50px 20px',
          textAlign: 'center',
          borderBottom: '1px solid var(--wui-border)',
          boxShadow: 'var(--wui-shadow)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            marginBottom: '8px',
            color: 'var(--wui-text-primary)',
            letterSpacing: '-0.5px',
          }}
        >
          Frontend Engineering Deployment
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--wui-text-secondary)', fontWeight: 400 }}>
          标准工程化全链路流程{' '}
          <span
            style={{
              color: 'var(--wui-text-warning)',
              background: 'var(--wui-bg-warning-subtle)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '12px',
              marginLeft: '5px',
              fontWeight: 600,
            }}
          >
            React v19 Version
          </span>
        </p>
      </header>
      <DeploymentFlow scrollContainerRef={panelRef} />
      <footer style={{ textAlign: 'center', color: 'var(--wui-text-muted)', fontSize: '12px', marginTop: '50px' }}>
        Enterprise Frontend Architecture Visualization
      </footer>
    </FixTabPanel>
  )
}

export default RichTextEditor
