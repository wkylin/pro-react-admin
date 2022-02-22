import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState, useRef } from 'react'

import { useRoutes } from 'react-router-dom'
import rootRouter from './routers'
import { sentryInit } from './utils'
// import { Watermark } from '@pansy/watermark'

const App = () => {
  // const waterMark = useRef<Watermark>()
  const [loading, setLoading] = useState(true)
  const asyncCall = () => {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
  }
  useEffect(() => {
    // sentry init
    sentryInit()

    // water mark
    // waterMark.current = new Watermark({
    //   text: '测试测试',
    // })

    asyncCall().then(
      () => setLoading(false),
      () => {}
    )

    // return () => {
    //   waterMark.current && waterMark.current.destroy()
    // }
  }, [])

  const element = useRoutes(rootRouter)

  if (loading) return null
  return <>{element}</>
}

export default App
