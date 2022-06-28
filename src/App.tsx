import React, { useEffect, useState } from 'react'

import { useRoutes } from 'react-router-dom'
import Watermark from '@stateless/Watermark'
// import Tracker from '@openreplay/tracker'
import rootRouter from './routers'
import { sentryInit } from './utils'

const App = () => {
  const [loading, setLoading] = useState(true)
  const asyncCall = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
  // const tracker = new Tracker({
  //   projectKey: 'HYHVjM3lbPjVFcPxsfh8',
  // })
  useEffect(() => {
    // sentry init
    sentryInit()
    // tracker from openreplay.com
    // tracker.start()

    asyncCall()
      .then(() => setLoading(false))
      .catch(() => {})
    Watermark({
      content: '上海麒麟科技有限公司', // 水印文本
      container: document.getElementById('root'), // 水印容器区域
    })
  }, [])

  const element = useRoutes(rootRouter)

  if (loading) return null
  return <>{element}</>
}

export default App
