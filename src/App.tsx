import React, { useEffect } from 'react'

import { useRoutes } from 'react-router-dom'
import rootRouter from './routers'
import { sentryInit } from './utils'

const App = () => {
  useEffect(() => {
    sentryInit()
  }, [])

  const element = useRoutes(rootRouter)

  return <>{element}</>
}

export default App
