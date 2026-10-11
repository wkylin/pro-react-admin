import type { CSSProperties, ReactNode } from 'react'

export interface IconFrameProps {
  children: ReactNode
}

const iconFrameStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 16px',
  width: 16,
  height: 16,
  fontSize: 16,
  lineHeight: 0,
}

const IconFrame = ({ children }: IconFrameProps) => <span style={iconFrameStyle}>{children}</span>

export default IconFrame
