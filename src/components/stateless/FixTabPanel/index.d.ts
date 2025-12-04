import * as React from 'react'

export type FixTabPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
}

declare const FixTabPanel: React.ForwardRefExoticComponent<FixTabPanelProps & React.RefAttributes<HTMLDivElement>>

export default FixTabPanel
