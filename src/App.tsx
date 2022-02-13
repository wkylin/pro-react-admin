/*
 * @Author: your name
 * @Date: 2021-12-26 14:01:57
 * @LastEditTime: 2022-02-11 18:42:17
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \promotion-web\src\App.tsx
 */
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
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
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
