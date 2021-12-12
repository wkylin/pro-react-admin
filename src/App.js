import React, { useEffect } from 'react'

import { useRoutes } from 'react-router-dom'
// import CustomSwitch from '@stateless/CustomSwitch'
// import RouteWithSubRoutes from '@stateless/RouteWithSubRoutes'
// import ScrollToTop from '@stateless/ScrollToTop'
import rootRouter from '@src/routers'
import { sentryInit } from '@src/utils'
// import './styles/theme.light.less'
// import './styles/theme.dark.less'

const App = () => {
  useEffect(() => {
    sentryInit()
  }, [])

  const element = useRoutes(rootRouter)

  return <>{element}</>
}

export default App
