import React from 'react'
import useSafeNavigate from '@app-hooks/useSafeNavigate'
import { useMatch } from 'react-router-dom'
import { Button } from 'antd'

const Index = () => {
  const { redirectTo } = useSafeNavigate()
  const { url } = useMatch()
  return (
    <>
      <Button type='primary' style={{ margin: 10 }} onClick={() => redirectTo(`${url}layout`)}>
        Layout Home
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo(`${url}basis`)}>
        Basis Home
      </Button>
    </>
  )
}

export default Index
