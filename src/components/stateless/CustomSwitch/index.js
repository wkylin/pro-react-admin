import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'

function NoFundPage() {
  const navigate = useNavigate()
  const { url, path } = useMatch()
  useEffect(() => {
    navigate(`${url}/404`)
  }, [path, url, navigate])
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
