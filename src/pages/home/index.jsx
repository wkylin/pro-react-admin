import React, { version, useState, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'
import ReMarkdown from '@stateless/ReMarkdown'
import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'

import { oneApiChat } from '@utils/aidFn'

const Home = () => {
  const [aiText, setAiText] = useState('')
  const aiTextRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [apiKey, setApiKey] = useState(() => '')
  const [chatText, setChatText] = useState('')
  const changeApiKey = (event) => {
    setApiKey(event.target.value)
  }

  const changeChatText = (event) => {
    setChatText(event.target.value)
  }

  const onEnter = () => {
    const controller = new AbortController()
    fetchAi(chatText, apiKey, controller)
  }

  const fetchAi = (text, key, controller) => {
    aiTextRef.current = null
    setAiText(aiTextRef)
    const { signal } = controller
    setLoading(true)
    oneApiChat(
      [
        {
          content: text,
          role: 'user',
        },
      ],
      key,
      signal
    )
      .then((response) => {
        setLoading(false)
        const contentType = response.headers.get('content-type')

        if (!response.ok || !contentType?.startsWith('text/event-stream') || response.status !== 200) {
          if (contentType?.startsWith('text/plain')) {
            setAiText(response.clone().text())
          }
          try {
            const resJson = response.clone().json()
            setAiText(JSON.stringify(resJson, null, 2))
          } catch (error) {
            console.log('error', error)
          }

          if (response.status === 401) {
            console.log(response.statusText)
          }
        } else {
          const reader = response?.body?.getReader()
          const delimiter = '\n\n'
          let buffer = ''
          let lastText = ''
          const readStream = () => {
            reader
              .read()
              .then(({ done, value }) => {
                console.log('done', done)
                if (done) {
                  return
                }
                buffer += new TextDecoder().decode(value)
                console.log('buffer', buffer)
                while (buffer.includes(delimiter)) {
                  const ind = buffer.indexOf(delimiter)
                  const message = buffer.slice(0, ind)

                  const dataList = message.split('data: ')

                  // eslint-disable-next-line no-restricted-syntax
                  for (const index in dataList) {
                    if (dataList[index] !== '' && dataList[index] !== '[DONE]') {
                      try {
                        const json = JSON.parse(dataList[index])
                        const delta = json.choices[0]?.delta?.content ?? ''
                        lastText += delta
                        aiTextRef.current = lastText
                        setAiText(aiTextRef.current)
                      } catch (error) {
                        console.log(error)
                      }
                    }
                  }
                  // 从缓冲区中移除已处理的消息和分隔符
                  buffer = buffer.slice(ind + delimiter.length)
                }
                readStream()
              })
              .catch((error) => {
                console.log('read stream error', error)
              })
          }
          readStream()
        }
      })
      .catch((error) => {
        setLoading(false)
        setAiText(error.message)
      })
  }

  return (
    <FixTabPanel>
      <h2>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </h2>
      <h2>React version: {version}</h2>

      <section style={{ width: 400, margin: '30px 0' }}>
        <Input defaultValue={apiKey} placeholder="api key" onChange={changeApiKey} style={{ marginBottom: 20 }} />
        <Input
          addonAfter={<SendOutlined />}
          defaultValue={chatText}
          placeholder="来，说点什么呗...Enter发送"
          onChange={changeChatText}
          onPressEnter={onEnter}
        />
      </section>
      {loading ? 'AI思考中...' : aiText ? <ReMarkdown markdownText={aiText} /> : ''}
    </FixTabPanel>
  )
}

export default Home
