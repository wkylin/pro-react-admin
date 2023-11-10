/* eslint-disable react/no-children-prop */
import React, { useRef, useCallback, useState, useEffect } from 'react'
import MarkmapHooks from '@stateful/markmap'
import FixTabPanel from '@stateless/FixTabPanel'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toPng, toSvg } from 'html-to-image'
import { Button, Dropdown, Form, Input, Space, message } from 'antd'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import { copyTextToClipboard } from '@utils/aidFn'
import initSSE from './sse'

const ChatGpt = () => {
  const markmapRef = useRef(null)
  const [form] = Form.useForm()

  // 生成概述
  const apiResultRef = useRef('')
  const [apiResult, setApiResult] = useState('')
  const [readyState, setReadyState] = useState(-1)
  const [apiKey, setApiKey] = useState('')

  const bottomRef = useRef(null)

  // 生成页面结构
  const [structureResult, setStructureResult] = useState('')
  const [structureReadyState, setStructureReadyState] = useState(-1)
  const structureResultRef = useRef()
  useEffect(() => {
    structureResultRef.current = structureResult
  }, [structureResult])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [apiResult, structureResult])

  const onChange = (event) => {
    setApiKey(event.target.value)
  }
  const onFinish = (values) => {
    const { text } = values
    setApiResult('')
    apiResultRef.current = ''
    setStructureResult('')
    structureResultRef.current = ''
    const source = initSSE(apiKey, text)
    source.addEventListener('message', (e) => {
      if (e.data !== '[DONE]') {
        const payload = JSON.parse(e.data)
        const {
          delta: { content },
        } = payload.choices[0]
        if (content) {
          apiResultRef.current += content
          setApiResult(apiResultRef.current)
        }
      } else {
        source.close()
      }
    })

    source.addEventListener('readystatechange', (e) => {
      setReadyState(e.readyState)
      // if (e.readyState === 2) {
      // }
    })

    source.stream()
  }

  const onButtonClick = useCallback(
    (key) => {
      if (markmapRef.current === null) {
        return
      }
      if (key === '1') {
        toPng(markmapRef.current, { cacheBust: true })
          .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'prd-view.png'
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            message.error(err.message)
          })
      } else {
        toSvg(markmapRef.current, { cacheBust: true })
          .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'prd-view.svg'
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            message.error(err.message)
          })
      }
    },
    [markmapRef]
  )

  const removeMd = require('remove-markdown')

  const copyToClipboard = (key) => {
    if (key === '1') {
      copyTextToClipboard(removeMd(apiResult))
    } else {
      copyTextToClipboard(apiResult)
    }
    message.success('复制成功！')
  }

  const buildStructure = () => {
    structureResultRef.current = ''
    setStructureResult('')
    setStructureReadyState(-1)

    const source = initSSE(
      apiKey,
      `${apiResult} 根据以上PRD的相关页面，帮我用markdown语法生成思维导图，子节点包含页面，页面元素（包含默认值和限制长度）。只要生成的markdown内容，不要出现其他任何信息。`
    )

    source.addEventListener('message', (e) => {
      if (e.data !== '[DONE]') {
        const payload = JSON.parse(e.data)
        const {
          delta: { content },
        } = payload.choices[0]
        if (content) {
          structureResultRef.current += content
          setStructureResult(structureResultRef.current)
        }
      } else {
        source.close()
      }
    })

    source.addEventListener('readystatechange', (e) => {
      setStructureReadyState(e.readyState)
      // if (e.readyState === 2) {
      // }
    })

    source.stream()
  }

  return (
    <FixTabPanel>
      <section style={{ width: 600 }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            apiKey: '',
            text: '作为产品经理，帮我生成一份PRD文档，功能是公园入园人数大屏展示功能，采用 markdown 格式区分标题和正文，标题加上序号',
          }}
          onFinish={onFinish}
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item name="apiKey" label="OPEN AI KEY" rules={[{ required: true, message: '请输入open ai key' }]}>
            <Input.TextArea
              onChange={onChange}
              rows={1}
              style={{ resize: 'none', padding: 2 }}
              placeholder="open ai key"
            />
          </Form.Item>
          <Form.Item name="text" label="您的输入" rules={[{ required: true, message: '请输您的需求' }]}>
            <Input.TextArea
              rows={4}
              showCount
              maxLength={1000}
              style={{ resize: 'none', padding: 2 }}
              placeholder=""
              onPressEnter={onFinish}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button block type="primary" htmlType="submit" disabled={[0, 1].includes(readyState)}>
              {apiResult && readyState === 2 ? '再来一次' : 'ChatGPT'}
            </Button>
          </Form.Item>
        </Form>
      </section>

      <h3 style={{ marginBottom: 15 }}>
        <span>ChatGPT的回答：</span>
        {apiResult && readyState === 2 && (
          <Dropdown
            menu={{
              onClick: ({ key }) => {
                copyToClipboard(key)
              },
              items: [
                {
                  key: '1',
                  label: '复制文本',
                },
                {
                  key: '2',
                  label: '复制Markdown',
                },
              ],
            }}
            placement="bottom"
            arrow
          >
            <Button>
              <Space>
                <CopyOutlined /> 复制
              </Space>
            </Button>
          </Dropdown>
        )}
      </h3>

      <section style={{ marginBottom: 15, minHeight: 150, border: '1px solid #eee', borderRadius: 4, padding: 15 }}>
        {/* {readyState === 0 && <h3>Loading...</h3>} */}
        {readyState === 0 && <h3>AI正在理解您的需求...</h3>}
        {/* {apiResult && <section> {apiResult}</section>} */}
        {apiResult && <ReactMarkdown children={apiResult} remarkPlugins={[remarkGfm]} />}
      </section>

      <section>
        {apiResult && readyState === 2 && (
          <Space>
            <Button type="primary" disabled={[0, 1].includes(structureReadyState)} onClick={buildStructure}>
              {structureResult && structureReadyState === 2 ? '重新生成' : '生成页面结构'}
            </Button>

            {structureResult && structureReadyState === 2 && (
              <Dropdown
                menu={{
                  onClick: ({ key }) => {
                    onButtonClick(key)
                  },
                  items: [
                    {
                      key: '1',
                      label: '导出png格式',
                    },
                    {
                      key: '2',
                      label: '导出svg格式',
                    },
                  ],
                }}
                placement="bottom"
                arrow
              >
                <Button type="primary">
                  <DownloadOutlined />
                  导出
                </Button>
              </Dropdown>
            )}
          </Space>
        )}
      </section>
      {/* {JSON.stringify(structureReadyState, null, 2)} */}
      {structureReadyState === 0 && <h3>Ai 正在理解的需求...</h3>}
      {structureReadyState === 1 && <h3>生成中...</h3>}
      {structureResult && (
        <section ref={markmapRef}>
          <MarkmapHooks markmap={structureResult} />
        </section>
      )}

      <div ref={bottomRef} style={{ height: 20, marginBottom: 20 }} />
    </FixTabPanel>
  )
}

export default ChatGpt
