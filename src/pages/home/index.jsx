import React, { version, useState, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'
import ReMarkdown from '@stateless/ReMarkdown'
import { Input, Flex, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'

import { oneApiChat } from '@utils/aidFn'

const Home = () => {
  const [aiText, setAiText] = useState('')
  const aiTextRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [apiKey, setApiKey] = useState(() => '')
  const [chatText, setChatText] = useState('')
  const textareaRef = useRef(null)

  const changeApiKey = (event) => {
    setApiKey(event.target.value)
  }

  const changeChatText = (event) => {
    setChatText(event.target.value)
  }

  const onInputKeyDown = (event) => {
    if (event.metaKey && event.key === 'Enter') {
      onSubmit()
      event.preventDefault()
    }
  }

  const onSubmit = () => {
    if (chatText.trim() === '') {
      return
    }
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
          role: 'user'
        }
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
            resJson.then((res) => {
              setAiText(res.error.message)
            })
          } catch (error) {
            setAiText(error.message)
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
        <Input defaultValue={apiKey} placeholder='api key' onChange={changeApiKey} style={{ marginBottom: 20 }} />
        <Flex align='center'>
          <Input.TextArea
            ref={textareaRef}
            defaultValue={chatText}
            placeholder='来，说点什么呗...Meta + Enter发送'
            onChange={changeChatText}
            onKeyDown={onInputKeyDown}
            autoSize
          />
          <Button icon={<SendOutlined rotate={-60} />} type='link' onClick={onSubmit}>
            发送
          </Button>
        </Flex>
      </section>
      {aiText
        ? (
          <section style={{ background: '#282c34', color: '#fff', borderRadius: 4, padding: 10 }}>
            {loading ? 'AI思考中...' : <ReMarkdown markdownText={aiText} />}
          </section>
          )
        : null}
    </FixTabPanel>
  )
}

export default Home
