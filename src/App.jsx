import React, { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Watermark from '@stateless/Watermark'
import rootRouter from './routers'
import AuthRouter from './routers/authRouter'

const App = () => {
  const [loading, setLoading] = useState(true)
  const asyncCall = () => new Promise((resolve) => setTimeout(() => resolve(), 1500))
  useEffect(() => {
    asyncCall()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
    Watermark({
      content: 'Pro React Admin',
      container: document.getElementById('root'),
    })
  }, [])

  const element = useRoutes(rootRouter)

  if (loading) {
    return <>Pro React Admin. Loading...</>
  }

  return <AuthRouter>{element}</AuthRouter>
}

export default App
