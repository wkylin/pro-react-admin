import React from 'react'
import { useNavigate, useMatch } from 'react-router-dom'
import { Button } from 'antd'

const Index = () => {
  const navigate = useNavigate()
  const { url } = useMatch()
  const redirectTo = (path) => {
    navigate(path)
  }
  return (
    <>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo(`${url}layout`)}>
        Layout Home
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo(`${url}basis`)}>
        Basis Home
      </Button>
    </>
  )
}

export default Index
