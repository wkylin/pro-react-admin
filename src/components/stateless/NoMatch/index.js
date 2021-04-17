import React from 'react'

import { useLocation, useHistory } from 'react-router-dom'

import { Button } from 'antd'

const NoMatch = () => {
  const location = useLocation()
  const history = useHistory()

  return (
    <div style={{ margin: 30, textAlign: 'center' }}>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>

      <Button size="small" type="primary" ghost onClick={() => history.goBack()}>
        返回
      </Button>
    </div>
  )
}

export default NoMatch
