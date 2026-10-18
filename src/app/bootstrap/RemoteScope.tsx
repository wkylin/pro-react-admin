import type { ReactNode } from 'react'
import { AppStoreProvider } from '@app/model'
import SessionScope from './SessionScope'
import GlobalBreakpointListener from './providers/GlobalBreakpointListener'

/** Remotes reuse the host router while owning their local state and cache. */
export default function RemoteScope({ projectId, children }: { projectId: string; children: ReactNode }) {
  return (
    <AppStoreProvider projectId={projectId}>
      <SessionScope>
        <GlobalBreakpointListener manageDocument={false} />
        {children}
      </SessionScope>
    </AppStoreProvider>
  )
}
