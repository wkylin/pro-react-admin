import { useState, useEffect } from 'react'
import { authService, AuthState } from '../services/authService'

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>(authService.getState())

  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState)
    return unsubscribe
  }, [])

  return authState
}
