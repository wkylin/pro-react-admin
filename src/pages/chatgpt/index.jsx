import React, { useRef, useCallback } from 'react'
import MarkmapHooks from '@stateful/markmap'
import FixTabPanel from '@stateless/FixTabPanel'
import { toPng, toSvg } from 'html-to-image'
import { Button, Dropdown } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

const ChatGpt = () => {
  const markmapRef = useRef(null)
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
  return (
    <>
      <FixTabPanel>
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
        <section ref={markmapRef}>
          <MarkmapHooks />
        </section>
      </FixTabPanel>
    </>
  )
}

export default ChatGpt
