import pageStyles from '@shared/styles/pageContent.module.less'
import QRCode from 'qrcode'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'antd'
import FixTabPanel from '@shared/ui/FixTabPanel'
import PDFExport from '@wui/data-display/PDFExport'
import styles from './index.module.less'

const QrCode = () => {
  const { t } = useTranslation()
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
    <FixTabPanel fill={false}>
      <div className={pageStyles.content}>
        <h1 className={styles.title}>QR Generator</h1>
        <div className={styles.form}>
          <Input
            aria-label={t('qrCode.urlLabel')}
            placeholder="e.g. https://google.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="primary" onClick={GenerateQRCode}>
            Generate
          </Button>
        </div>
        <section className={styles.preview}>
          {qr && (
            <div className={styles.result}>
              <img src={qr} width="300" alt="QRcode" />
              <Button type="link" href={qr} download="qrcode.png">
                Download
              </Button>
            </div>
          )}
        </section>
        <PDFExport fileName="qrcode.pdf">{qr && <img src={qr} width="300" alt="QR code" />}</PDFExport>
      </div>
    </FixTabPanel>
  )
}
export default QrCode
