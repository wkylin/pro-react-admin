import React from 'react'

export const ErrorBoundaryContext = React.createContext(() => {})

export const useErrorHandling = () => {
  return React.useContext(ErrorBoundaryContext)
}
