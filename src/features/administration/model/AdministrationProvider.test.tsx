import { StrictMode, useEffect, useState } from 'react'
import { render, screen } from '@testing-library/react'
import { serialize, deserialize } from 'node:v8'
import { createDemoAdministrationProvider } from '../api/demoProvider'
import type { DataProvider } from '@platform/data/provider'
import type { AdministrationSchema } from './resources'

jest.doMock('@platform/auth/hooks/usePermission', () => ({ usePermission: () => ({ current: null }) }))
const { AdministrationProvider, useAdministration } = require('./AdministrationProvider')

test('development StrictMode replay preserves the cache; final unmount disposes it', async () => {
  const originalClone = globalThis.structuredClone
  globalThis.structuredClone = (value) => deserialize(serialize(value))
  let activeProvider!: DataProvider<AdministrationSchema>
  function Reader() {
    const { provider } = useAdministration()
    activeProvider = provider
    const [label, setLabel] = useState('Loading')
    useEffect(() => {
      const controller = new AbortController()
      void provider.list('users', { page: 1, pageSize: 10 }, { signal: controller.signal }).then(
        (result: { total: number }) => {
          if (!controller.signal.aborted) setLabel(`${result.total} members`)
        },
        () => {
          if (!controller.signal.aborted) setLabel('Failed')
        }
      )
      return () => controller.abort()
    }, [provider])
    return <div>{label}</div>
  }
  try {
    const view = render(
      <StrictMode>
        <AdministrationProvider provider={createDemoAdministrationProvider()}>
          <Reader />
        </AdministrationProvider>
      </StrictMode>
    )
    await screen.findByText('2 members')
    view.unmount()
    await Promise.resolve()
    await expect(activeProvider.list('users', { page: 1, pageSize: 10 })).rejects.toThrow('会话已变更')
  } finally {
    globalThis.structuredClone = originalClone
  }
})
