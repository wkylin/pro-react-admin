import type { ReactNode } from 'react'
import { AppStoreProvider } from '@app/model'
import { KeepAliveProvider } from '@platform/keep-alive'
import GlobalBreakpointListener from './providers/GlobalBreakpointListener'

/** Remotes reuse the host router while owning their local state and cache. */
export default function RemoteScope({ projectId, children }: { projectId: string; children: ReactNode }) {
  return (
    <AppStoreProvider projectId={projectId}>
      <KeepAliveProvider>
        <GlobalBreakpointListener manageDocument={false} />
        {children}
      </KeepAliveProvider>
    </AppStoreProvider>
  )
}
