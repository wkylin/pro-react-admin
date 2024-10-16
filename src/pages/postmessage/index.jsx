import React, { useRef, useEffect } from 'react'

const PostMessage = () => {
  const origin = import.meta?.env?.VITE_IFRAME_ORIGIN
  const childOrigin = `${import.meta?.env?.VITE_IFRAME_ORIGIN}/pro-react-admin/#/my-iframe`
  const ref = useRef()

  const onReceivedMessage = (event) => {
    if (event.origin !== childOrigin) {
      // do something with the received messages
    }

    // do something with the received messages
  }

  const sendMessage = () => {
    if (!ref.current) {
      return
    }
    ref.current.contentWindow.postMessage(`Hello iframe!${Math.random()}`, origin)
  }

  useEffect(() => {
    window.addEventListener('message', onReceivedMessage)

    return () => {
      window.removeEventListener('message', onReceivedMessage)
    }
  })

  return (
    <>
      <button onClick={sendMessage}>send a message</button>

      <iframe
        style={{
          display: 'block',
          border: 'none',
          width: '100%',
        }}
        src={childOrigin}
        ref={ref}
        title="iframe"
        width="800px"
        height="600px"
        // sandbox=""
      />
    </>
  )
}

export default PostMessage
