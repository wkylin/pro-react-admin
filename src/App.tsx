import React, { useEffect, useState } from 'react'

import { useRoutes } from 'react-router-dom'
import rootRouter from './routers'
import { sentryInit } from './utils'

const App = () => {
  const [loading, setLoading] = useState(true)
  const asyncCall = () => {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 10))
  }
  useEffect(() => {
    sentryInit()
    asyncCall().then(() => setLoading(false))
  }, [])

  const element = useRoutes(rootRouter)

  if (loading) return null
  return <>{element}</>
}

export default App
