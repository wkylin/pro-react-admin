import React from 'react'

export const ErrorBoundaryContext = React.createContext(() => {})

export const useErrorHandling = () => React.useContext(ErrorBoundaryContext)
