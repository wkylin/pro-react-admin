import { createContext, createElement, useContext, useState, type ReactNode } from 'react'
import { useStore } from 'zustand'
import { createCrmStore, type CrmState } from './crmStore'

const Context = createContext<ReturnType<typeof createCrmStore> | null>(null)

export function CrmProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createCrmStore)
  return createElement(Context.Provider, { value: store }, children)
}

export function useCrmStore<T>(selector: (state: CrmState) => T): T {
  const store = useContext(Context)
  if (!store) throw new Error('CrmProvider required')
  return useStore(store, selector)
}
