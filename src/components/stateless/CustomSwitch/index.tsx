import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const CustomSwitch = ({ children }: { children: ReactNode }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default CustomSwitch
