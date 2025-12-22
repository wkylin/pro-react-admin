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
          width: '100%'
        }}
        src={childOrigin}
        ref={ref}
        width='800px'
        height='600px'
        title='my-iframe'
        loading='lazy'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
        referrerPolicy='no-referrer-when-downgrade'
        sandbox='allow-scripts allow-same-origin'
      />

      {/* <iframe
        id="result"
        name="CodePen"
        title="CodePen Preview"
        src="https://codepen.io/oscar-jite/fullpage/RwzOrjv?anon=true&amp;view="
        sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *; fullscreen *"
        allowtransparency="true"
        allowPaymentRequest="true"
        class="result-iframe"
        loading="lazy"
      /> */}
    </>
  )
}

export default PostMessage
