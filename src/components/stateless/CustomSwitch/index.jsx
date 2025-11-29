import React, { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import useSafeNavigate from '@hooks/useSafeNavigate'

function NoFundPage() {
  const { redirectTo } = useSafeNavigate()
  const { url, path } = useMatch()
  useEffect(() => {
    redirectTo(`${url}/404`)
  }, [path, url])
  return null
}
const CustomSwitch = (props) => {
  const { children } = props

  return (
    <Routes>
      {children}
      <Route path="*" element={<NoFundPage />} />
    </Routes>
  )
}

export default CustomSwitch
