import React, { useEffect } from 'react'
import { useRoutes, type RouteObject } from 'react-router-dom'
import rootRouter from '@/routers'
import AuthRouter from './routers/authRouter'

const AppContent: React.FC = () => {
  const asyncCall = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))

  useEffect(() => {
    // 可在此处初始化非阻塞逻辑（如 Sentry）
    // sentryInit()

    asyncCall()
      .then(() => {})
      .catch(() => {})

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
  }, [])

  const element = useRoutes(rootRouter as RouteObject[])
  return element
}

export default function App() {
  return (
    <AuthRouter>
      <AppContent />
    </AuthRouter>
  )
}
