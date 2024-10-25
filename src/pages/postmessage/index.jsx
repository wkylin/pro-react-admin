import React, { useRef, useEffect } from 'react'

const PostMessage = () => {
  const origin = process.env.IFRAME_ORIGIN
  const childOrigin = `${process.env.IFRAME_ORIGIN}/pro-react-admin/#/my-iframe`
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
        frameborder="0"
        src={childOrigin}
        ref={ref}
        width="800px"
        height="600px"
        title="my-iframe"
        loading="lazy"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin"
      />
    </>
  )
}

export default PostMessage
