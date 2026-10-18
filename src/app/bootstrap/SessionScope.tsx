import type { ReactNode } from 'react'
import { KeepAliveProvider } from '@platform/keep-alive'
import { useSessionIdentity } from '@platform/auth/hooks/useSessionIdentity'

/** Changing a credential/tenant destroys tabs, feature state and cached page trees. */
export default function SessionScope({ children }: { children: ReactNode }) {
  const identity = useSessionIdentity()
  return <KeepAliveProvider key={identity}>{children}</KeepAliveProvider>
}
