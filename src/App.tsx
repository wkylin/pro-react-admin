// import React, { useEffect, useRef } from 'react'
import React, { useEffect } from 'react'

import { useRoutes } from 'react-router-dom'
import rootRouter from './routers'
import { sentryInit } from './utils'
// import { Watermark } from '@pansy/watermark'

const App = () => {
  // const waterMark = useRef<Watermark>()
  useEffect(() => {
    // sentry init
    sentryInit()

    // water mark
    // waterMark.current = new Watermark({
    //   text: '测试测试',
    // })

    // return () => {
    //   waterMark.current && waterMark.current.destroy()
    // }
  }, [])

  const element = useRoutes(rootRouter)

  return <>{element}</>
}

export default App
