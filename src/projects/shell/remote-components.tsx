import React from 'react'

// Generated from src/projects/registry.json. Run pnpm run sync:project-contracts after registry changes.
export const remoteComponents = {
  projectA: React.lazy(() => import('projectA/App')),
  projectB: React.lazy(() => import('projectB/App')),
} as const

export type RemoteName = keyof typeof remoteComponents
