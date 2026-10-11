import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import AuthRouter from '@routers/authRouter'

const RootLayout: FC = () => {
  return (
    <AuthRouter>
      <Outlet />
    </AuthRouter>
  )
}

export default RootLayout
