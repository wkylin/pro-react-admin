import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Button } from 'antd'
const Index = ({ routes = [] }) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const redirectTo = (path) => {
    history.push(path)
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
