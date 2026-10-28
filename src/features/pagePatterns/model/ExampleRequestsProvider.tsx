import { createContext, createElement, useContext, useState, type ReactNode } from 'react'
import { createExampleRequestProvider, type ExampleRequestProvider } from './requests'

const Context = createContext<ExampleRequestProvider | null>(null)

export function ExampleRequestsProvider({ children }: { children: ReactNode }) {
  const [provider] = useState(createExampleRequestProvider)
  return createElement(Context.Provider, { value: provider }, children)
}

export function useExampleRequests() {
  const provider = useContext(Context)
  if (!provider) throw new Error('ExampleRequestsProvider required')
  return provider
}
