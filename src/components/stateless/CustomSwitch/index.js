import React, { useEffect } from 'react'
import { Switch, useHistory, useRouteMatch } from 'react-router-dom'

function NoFundPage() {
  const history = useHistory()
  const { url, path } = useRouteMatch()
  console.log('useMatch', JSON.stringify(useRouteMatch(), null, 2))
  useEffect(() => {
    history.push(`${url}/404`)
  }, [path, url, history])
  return null
}
const CustomSwitch = (props) => {
  const { children } = props

  return (
    <Switch>
      {children}
      <NoFundPage />
    </Switch>
  )
}

export default CustomSwitch
