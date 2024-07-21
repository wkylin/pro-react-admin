import React, { useState, useEffect } from 'react'

const MyIFrame = () => {
  const parentOrigin = 'http://localhost:8080'
  const [message, setMessage] = useState() // string | undefined

  const onReceivedMessage = (event) => {
    // check the message source origin as a security measure
    if (event.origin !== parentOrigin) {
      return
    }

    // see notes on checking the data type
    setMessage(event.data)
  }

  useEffect(() => {
    window.addEventListener('message', onReceivedMessage)

    return () => {
      window.removeEventListener('message', onReceivedMessage)
    }
  })

  if (!message) {
    return <p>no message has been received</p>
  }

  return <p>message received: {message}</p>
}

export default MyIFrame
