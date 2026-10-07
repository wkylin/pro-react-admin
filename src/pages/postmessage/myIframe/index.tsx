import React, { useState, useEffect } from 'react'

const MyIFrame = () => {
  const parentOrigin = process.env.IFRAME_ORIGIN
  const [message, setMessage] = useState() // string | undefined

  const onReceivedMessage = (event) => {
    // check the message source origin as a security measure
    console.log('event.origin', event.origin)
    console.log('parentOrigin', parentOrigin)
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
