import React, { version, useState, useRef } from 'react'
import { Input, Flex, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { Atom, Merge, GitMerge, GitPullRequestArrow } from 'lucide-react'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'
import ReMarkdown from '@stateless/ReMarkdown'
import LinearWrap from '@stateless/LinearWrap'
import AlternatingText from '@stateless/AlternatingText'
import AutoLink from '@stateless/AutoLink'
import LazyLoadImage from '@stateless/LazyLoadImage'
import StarRating from '@stateless/StarRating'
import IsometricCard from '@stateless/IsometricCard'
import AvatarCard from '@stateless/AvatarCard'
import LineBordered from '@stateless/LineBordered'
import GradientTracking from '@stateless/GradientTracking'
import ShiftingCard from '@stateless/ShiftingCard'
import BreatheText from '@stateless/BreatheText'

import { oneApiChat, prettyObject } from '@utils/aidFn'

import styles from './index.module.less'

const Home = () => {
  const [aiText, setAiText] = useState('')
  const aiTextRef = useRef(null)
  // const [loading, setLoading] = useState(false)
  const [isStream, setIsStream] = useState(false)
  const [dateTime, setDateTime] = useState('')
  const curController = useRef(null)

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
    curController.current = controller
    fetchAi(chatText, apiKey, controller)
  }

  const onStop = () => {
    curController.current.abort()
    // setLoading(false)
    setIsStream(false)
  }

  const fetchAi = (text, key, controller) => {
    aiTextRef.current = ''
    setAiText(aiTextRef.current)
    const { signal } = controller
    setIsStream(true)
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
        const contentType = response.headers.get('content-type')
        if (!response.ok || !contentType?.startsWith('text/event-stream') || response.status !== 200) {
          if (contentType?.startsWith('text/html') || contentType?.startsWith('text/plain')) {
            const textPlain = response.clone().text()
            textPlain.then((plainText) => {
              setAiText(plainText)
            })
          } else if (contentType?.startsWith('application/json')) {
            const resJson = response.clone().json()
            resJson.then((res) => {
              setAiText(prettyObject(res))
            })
          } else {
            setAiText(response.statusText)
          }
          setIsStream(false)
        } else {
          const reader = response?.body?.getReader()
          const delimiter = '\n\n'
          let buffer = ''
          let lastText = ''
          const readStream = () => {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  setIsStream(false)
                  return
                }
                buffer += new TextDecoder().decode(value)
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
                        setDateTime(new Date().toLocaleString())
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
        setIsStream(false)
        setAiText(error.message)
      })
  }

  return (
    <FixTabPanel>
      <h2 style={{ marginBottom: 15 }}>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </h2>

      <h2 className={styles.avatar}>React version: {version}</h2>

      <section>
        I love coding in <AlternatingText alternateText={['javascript', 'typescript', 'rect', 'vue']} />.
      </section>
      <section>
        <AutoLink text="foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin" />
      </section>
      <section>
        <LazyLoadImage src="https://picsum.photos/seed/picsum/300/160" alt="Strawberries" />
      </section>
      <section>
        <AvatarCard avatar="https://picsum.photos/seed/picsum/300/160" text="Hi, I'm a developer." />
      </section>
      <section>
        <IsometricCard text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?" />
      </section>
      <StarRating value={2} />
      <LineBordered text="A line bordered text." />
      <section style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <Atom /> <Merge /> <GitMerge /> <GitPullRequestArrow />
      </section>
      <section>
        <GradientTracking />
      </section>

      <section style={{ margin: 40 }}>
        <BreatheText />
      </section>
      <section>
        <ShiftingCard />
      </section>

      <section style={{ width: 600, margin: '30px 0' }}>
        <Input defaultValue={apiKey} placeholder="api key" onChange={changeApiKey} style={{ marginBottom: 20 }} />
        <Flex align="center">
          <LinearWrap>
            <Input.TextArea
              ref={textareaRef}
              defaultValue={chatText}
              placeholder="来，说点什么呗...Meta + Enter发送"
              onChange={changeChatText}
              onKeyDown={onInputKeyDown}
              autoSize
              style={{ width: 300, height: 30 }}
            />
          </LinearWrap>
          <Button
            style={{ margin: '0 10px' }}
            icon={<SendOutlined rotate={-60} />}
            type="primary"
            disabled={isStream}
            onClick={onSubmit}
          >
            发送
          </Button>
          <Button icon={<SendOutlined rotate={-60} />} type="primary" disabled={!isStream} onClick={onStop}>
            停止
          </Button>
        </Flex>
      </section>

      <section>
        {isStream && <div>正在输入...</div>}
        <section style={{ textAlign: 'right', color: '#666' }}>{dateTime}</section>
        <ReMarkdown markdownText={aiText} isLoading={isStream} />
      </section>
    </FixTabPanel>
  )
}

export default Home
