import QRCode from 'qrcode'
import React, { useState } from 'react'
import { Button, Input, Space } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

const QrCode = () => {
  const [url, setUrl] = useState('')
  const [qr, setQr] = useState('')
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          // dark: '#335383FF',
          // light: '#EEEEEEFF'
        },
      },
      (err, urls) => {
        if (err) return console.error(err)
        setQr(urls)
      }
    )
  }
  return (
    <FixTabPanel>
      <h1>QR Generator</h1>
      <Space>
        <Input
          style={{ width: 400 }}
          placeholder="e.g. https://google.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="primary" onClick={GenerateQRCode}>
          Generate
        </Button>
      </Space>
      <section style={{ margin: 20 }}>
        {qr && (
          <Space>
            <img src={qr} width="300" alt="QRcode" />
            <Button type="link" href={qr} download="qrcode.png">
              Download
            </Button>
          </Space>
        )}
      </section>
    </FixTabPanel>
  )
}
export default QrCode
