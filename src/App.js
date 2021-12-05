import React, { useEffect } from 'react'

import { useRoutes } from 'react-router-dom'

// import CustomSwitch from '@stateless/CustomSwitch'
// import RouteWithSubRoutes from '@stateless/RouteWithSubRoutes'
// import ScrollToTop from '@stateless/ScrollToTop'
import rootRouter from '@src/routers'
import { sentryInit } from '@src/utils'

const App = () => {
  useEffect(() => {
    sentryInit()
  }, [])

  const element = useRoutes(rootRouter)

  return (
    <>
      {/* <h2>Home</h2> */}
      {element}
    </>
  )
}

export default App
