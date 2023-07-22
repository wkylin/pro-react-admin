import React, { useState, useEffect } from 'react'
// import UserAgent from 'user-agents'

const UserIP = () => {
  const [userIp, setUserIp] = useState('')
  // const userAgent = new UserAgent()
  useEffect(() => {
    getUserIp()
  }, [])

  const getUserIp = () => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        const ipAddress = data.ip
        setUserIp(ipAddress ?? '0.0.0.0')
      })
      .catch(() => {
        setUserIp('0.0.0.0')
      })
  }

  return (
    <>
      <h2>欢迎您，来自远方的朋友！</h2>
      <h3>您的IP: {userIp}</h3>
      {/* <h3> {userAgent.toString()}</h3> */}
    </>
  )
}

export default UserIP
