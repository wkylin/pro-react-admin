import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import DeploymentFlow from '@stateless/DeploymentFlow'

const RichTextEditor = () => {
  const panelRef = useRef(null)

  return (
    <FixTabPanel ref={panelRef}>
      <header
        style={{
          background: '#fff',
          padding: '50px 20px',
          textAlign: 'center',
          borderBottom: '1px solid #eceff1',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <h1
          style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: '#263238', letterSpacing: '-0.5px' }}
        >
          Frontend Engineering Deployment
        </h1>
        <p style={{ fontSize: '14px', color: '#546e7a', fontWeight: 400 }}>
          标准工程化全链路流程{' '}
          <span
            style={{
              color: '#ef6c00',
              background: '#fff3e0',
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
      <footer style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '50px' }}>
        Enterprise Frontend Architecture Visualization
      </footer>
    </FixTabPanel>
  )
}

export default RichTextEditor
