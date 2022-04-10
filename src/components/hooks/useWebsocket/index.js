import { useState, useRef, useEffect } from 'react'

// https://thenable.io/building-a-use-socket-hook-in-react
// https://aravindballa.com/writings/custom-hook-to-listen-websockets/
// https://github.com/robtaussig/react-use-websocket
// https://www.youtube.com/watch?v=sPVS2Z5dI8A

const useWebsocket = ({ url, verify }) => {
  const ws = useRef(null)
  const [wsData, setMessage] = useState('')
  const [readyState, setReadyState] = useState({ key: 0, value: '正在链接中' })

  const creatWebSocket = () => {
    const stateArr = [
      { key: 0, value: '正在链接中' },
      { key: 1, value: '已经链接并且可以通讯' },
      { key: 2, value: '连接正在关闭' },
      { key: 3, value: '连接已关闭或者没有链接成功' },
    ]
    try {
      ws.current = new WebSocket(url)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ws.current.onopen = () => setReadyState(stateArr[ws.current?.readyState ?? 0])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ws.current.onclose = () => {
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ws.current.onerror = () => {
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      }

      ws.current.onmessage = (e) => {
        setMessage(e.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const webSocketInit = () => {
    if (!ws.current || ws.current.readyState === 3) {
      creatWebSocket()
    }
  }

  //  关闭 WebSocket
  const closeWebSocket = () => {
    ws.current?.close()
  }

  const reconnect = () => {
    try {
      closeWebSocket()
      ws.current = null
      creatWebSocket()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (verify) webSocketInit()
    return () => {
      ws.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, verify])

  return {
    wsData,
    readyState,
    closeWebSocket,
    reconnect,
  }
}
export default useWebsocket
