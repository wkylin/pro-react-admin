import React, { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Watermark from '@stateless/Watermark'
import rootRouter from './routers'
import AuthRouter from './routers/authRouter'
// import { sentryInit } from './utils'

const App = () => {
  // const { i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const asyncCall = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 1500))
  useEffect(() => {
    // sentryInit()
    asyncCall()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
    Watermark({
      content: 'Pro React Admin', // 水印文本
      container: document.getElementById('root'), // 水印容器区域
    })
  }, [])

  useEffect(() => {
    // const fetchUserLanguage = async () => {
    //   // 从数据库中获取用户的语言选择
    //   const userLanguage = await fetchUserLanguageFromDatabase()
    //   if (userLanguage) {
    //     // 如果数据库中存在用户的语言选择，则使用该选择作为应用程序的语言
    //     i18n.changeLanguage(userLanguage)
    //   } else {
    //     // 如果数据库中不存在用户的语言选择，则检查本地存储
    //     const localStorageLanguage = localStorage.getItem('language')
    //     if (localStorageLanguage) {
    //       // 如果本地存储中存在用户的语言选择，则使用该选择作为应用程序的语言
    //       i18n.changeLanguage(localStorageLanguage)
    //     }
    //   }
    // }
    // fetchUserLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const element = useRoutes(rootRouter as any)

  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      <AuthRouter>{element}</AuthRouter>
    </>
  )
}

export default App
