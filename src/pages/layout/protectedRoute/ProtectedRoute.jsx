import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import SignIn from '@pages/signin/index'

const ProtectedRoute = (props) => {
  // const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token')
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false)
      // return navigate('/signin')
    }
    setIsLoggedIn(true)
    // return navigate('/')
  }
  useEffect(() => {
    checkUserToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return <React.Fragment>{isLoggedIn ? props.children : <SignIn />}</React.Fragment>
}
export default ProtectedRoute
