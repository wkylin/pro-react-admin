import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useState } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import CryptoJS, { AES, enc } from 'crypto-js'
import JSEncrypt from 'jsencrypt'
import { Card, Tabs, Input, Button, Space, Typography, Row, Col, Divider, Alert, theme, Select, App } from 'antd'
import {
  LockOutlined,
  UnlockOutlined,
  KeyOutlined,
  ReloadOutlined,
  ApiOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import request from '@src/service/request'

const { TextArea } = Input
const { Title, Text, Paragraph } = Typography
const { Option } = Select

// 预置的 RSA 密钥对 (仅作演示使用，实际生产环境请勿在前端硬编码私钥)
const DEFAULT_PUBLIC_KEY = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0BDRgoeZCRRvH/QLbGhe
M6ecmHUzm4ofqRgBPl1yThEryOQ8gGjmr16Xlj7cAedZz0vqvUsWnZh5KMZ5b5vQ
Y4HGhPfPL3CzlI+iL0JyfFN9DsIe7uSDsStBfbLQas+IYIu47RMW9YNAmS8QFmqn
4Gpw6S1t3H+1AfwQpAGxXHm3+2mTClkautPOAqmTkAzM5eLIisOI/RE4YZiHRl49
l+yUAmpAqRw0WnvqRlw76ES6naSBxHM7iQeAlo8R5YqheD2kNzJbEcJ7Owd4Rcfo
kKZxSh7Qy/Pre8QFvIKdsCu4hpIGkws86s1IHvFLCXsXUxPR5z3E69VuW6K6rkXT
lwIDAQAB`

const DEFAULT_PRIVATE_KEY = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQENGCh5kJFG8f
9AtsaF4zp5yYdTObih+pGAE+XXJOESvI5DyAaOavXpeWPtwB51nPS+q9SxadmHko
xnlvm9BjgcaE988vcLOUj6IvQnJ8U30Owh7u5IOxK0F9stBqz4hgi7jtExb1g0CZ
LxAWaqfganDpLW3cf7UB/BCkAbFcebf7aZMKWRq6084CqZOQDMzl4siKw4j9EThh
mIdGXj2X7JQCakCpHDRae+pGXDvoRLqdpIHEczuJB4CWjxHliqF4PaQ3MlsRwns7
B3hFx+iQpnFKHtDL8+t7xAW8gp2wK7iGkgaTCzzqzUge8UsJexdTE9HnPcTr1W5b
orquRdOXAgMBAAECggEANFGeVSvCrBlSzh6gRrzBv0xs4JtMBFcJmgv6uBNoXEAO
GgBmREXciAmJpZKd4O6rUyh8WOgKQkumX730qD9uea8W27Wyh/PXfEpX1nlnb2LR
BgaDH8Afa0v8tl5h8RHJcbmAoUCVG9xKwJooefKMzy4EwWWWhAUq31piVtNEJYPT
zEXXMrbDJJ9bCRJXgvJ+oeedcIMz1OktU/DKjPdHLdU71MR0NUCPPMmD9RmSCjk2
TkswP3Mm6EpY85kG9xT5tNvr6p5Rsw828TAtYuybzVeJxnSvPY4IXr5Zqx+D5/B3
GoZYfDBV+nA1RYddwwnl58W5BpbFbVvLhFJIsnr4lQKBgQDrNwONQMmLG38pq+TY
0/JKcO0N1iFCIolOj7wyB8vOGOzAIqATEp1Tra5tRa0eVAlVl19rFrils0YNokgP
ITv+K9Y79JzlSOH2bpMBCy5kB0IoYTDwNs0Kc2IMoV2NekAvFMVAS8Ldh2S39O4v
a2JMGjHVoQCCcNDnq9QMAiMmzQKBgQDic6P5dbzMsKrHLRNu9gQRn7rrFe6FtErv
2mMiIdAI/4BtUs9n4q4gNprZlhIXVGGpzZ2mXMXJsJvcE6JOSS6Z8wRHE/AfOoVI
7i2qk5LFslvLHKrV1jqtyb6PTSG9Di9YF3u/JckSrMhUbDXG2PhN7Sp08O9cp3FY
zc62jVH78wKBgFwdxXRSRRwHfruRKCSKjL7+jrf2fjvqTp/HxspJJ1XliQKODOar
SZX11PPSb8QK4UT17VaBJXsvRGYegd37BAW8oUAFwlRBQM1D7Kph+J8QAKbTuVi5
/X70RRfxMjQwBmbp2X4erYgYeCda8tT7Vxm6wH2LeimbiRTRxE+XnrCZAoGBAKyf
6OUWyqjjGByjkQfqRKnGsO/alSyZhvKW8TEow3TIiPdNxEv2MjTeS2cJDpt4OMb/
tmkGmcQpfHblBLpW8U5sQduJKGg17TruTiOVQbKxR2ZrYROHrs2iWEDXVJvQ/2hQ
5oWNYV16F3C72LbP2WFWJSJmNKHWBwLiSO1Ch7ffAoGBAOEGk+98m4l1jtDkIr/w
EYOns+p9wj3be5YfARMRHxFjJCyXyaZstuk4RsmHhOlnO999nVX7eCAU36HfEahQ
l5BNkobjNZF/xd9XTWywJFTGJNg6ejF991ucWnfSwnlRbJN8sGYRrr/IYyd6a/YL
v4U73TKOI+a1xxr6ZMQ4vzwt`

const AESPanel = () => {
  const { token } = theme.useToken()
  const { message } = App.useApp()
  const [plainText, setPlainText] = useState('大型语言模型（LLM）是基于大量数据进行预训练的超大型深度学习模型。')
  const [secretKey, setSecretKey] = useState('')
  const [cipherText, setCipherText] = useState('')
  const [decryptedText, setDecryptedText] = useState('')

  const generateKey = () => {
    const key = CryptoJS.lib.WordArray.random(16).toString()
    setSecretKey(key)
    message.success('已生成随机 AES 密钥')
  }

  const handleEncrypt = () => {
    if (!plainText) return message.warning('请输入需要加密的内容')
    if (!secretKey) return message.warning('请输入或生成密钥')
    try {
      const encrypted = AES.encrypt(plainText, secretKey).toString()
      setCipherText(encrypted)
      setDecryptedText('') // 清空之前的解密结果
      message.success('加密成功')
    } catch (error) {
      console.warn('Encryption failed:', error)
      message.error('加密失败')
    }
  }

  const handleDecrypt = () => {
    if (!cipherText) return message.warning('没有可解密的密文')
    if (!secretKey) return message.warning('请输入密钥')
    try {
      const decrypted = AES.decrypt(cipherText, secretKey).toString(enc.Utf8)
      if (!decrypted) throw new Error('解密失败，可能是密钥错误')
      setDecryptedText(decrypted)
      message.success('解密成功')
    } catch (error) {
      console.warn('Decryption failed:', error)
      setDecryptedText('')
      message.error('解密失败，请检查密钥是否正确')
    }
  }

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Alert
        title="AES (Advanced Encryption Standard)"
        description="对称加密算法，加密和解密使用相同的密钥。速度快，适合大量数据加密。"
        type="info"
        showIcon
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="加密区 (Encryption)" variant="borderless" className="shadow-sm">
            <Space orientation="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>1. 输入明文</Text>
                <TextArea
                  rows={4}
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  placeholder="请输入要加密的文本..."
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <Text strong>2. 设置密钥</Text>
                <div style={{ display: 'flex', marginTop: 8, gap: 8 }}>
                  <Input.Password
                    prefix={
                      <AnimatedIcon variant="spin" mode="hover">
                        <KeyOutlined />
                      </AnimatedIcon>
                    }
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="输入密钥"
                  />
                  <Button
                    icon={
                      <AnimatedIcon variant="spin" mode="hover">
                        <ReloadOutlined />
                      </AnimatedIcon>
                    }
                    onClick={generateKey}
                  >
                    随机生成
                  </Button>
                </div>
              </div>

              <Button
                type="primary"
                icon={
                  <AnimatedIcon variant="spin" mode="hover">
                    <LockOutlined />
                  </AnimatedIcon>
                }
                onClick={handleEncrypt}
                block
              >
                执行加密
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="结果区 (Result)" variant="borderless" className="shadow-sm">
            <Space orientation="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>3. 密文输出</Text>
                <TextArea
                  rows={4}
                  value={cipherText}
                  onChange={(e) => setCipherText(e.target.value)}
                  placeholder="加密后的内容将显示在这里..."
                  style={{
                    marginTop: 8,
                    backgroundColor: token.colorFillAlter,
                    color: token.colorText,
                  }}
                />
              </div>

              <Button
                icon={
                  <AnimatedIcon variant="spin" mode="hover">
                    <UnlockOutlined />
                  </AnimatedIcon>
                }
                onClick={handleDecrypt}
                block
                disabled={!cipherText}
              >
                尝试解密 (使用左侧密钥)
              </Button>

              <div>
                <Text strong>4. 解密验证</Text>
                <div
                  style={{
                    marginTop: 8,
                    padding: '8px 12px',
                    background: decryptedText ? token.colorSuccessBg : token.colorFillAlter,
                    border: decryptedText ? `1px solid ${token.colorSuccessBorder}` : `1px solid ${token.colorBorder}`,
                    borderRadius: 6,
                    minHeight: 100,
                  }}
                >
                  {decryptedText || <Text type="secondary">解密后的明文将显示在这里...</Text>}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

const RSAPanel = () => {
  const { token } = theme.useToken()
  const { message } = App.useApp()
  const [plainText, setPlainText] = useState('基于转换器的大型神经网络可以有数十亿个参数。')
  const [cipherText, setCipherText] = useState('')
  const [decryptedText, setDecryptedText] = useState('')

  const handleEncrypt = () => {
    if (!plainText) return message.warning('请输入需要加密的内容')
    try {
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(DEFAULT_PUBLIC_KEY)
      const encrypted = encrypt.encrypt(plainText)
      if (!encrypted) throw new Error('加密失败')
      setCipherText(encrypted)
      setDecryptedText('')
      message.success('使用公钥加密成功')
    } catch (error) {
      console.warn('RSA encryption failed:', error)
      message.error('加密失败，可能是文本过长')
    }
  }

  const handleDecrypt = () => {
    if (!cipherText) return message.warning('没有可解密的密文')
    try {
      const decrypt = new JSEncrypt()
      decrypt.setPrivateKey(DEFAULT_PRIVATE_KEY)
      const decrypted = decrypt.decrypt(cipherText)
      if (!decrypted) throw new Error('解密失败')
      setDecryptedText(decrypted)
      message.success('使用私钥解密成功')
    } catch (error) {
      console.warn('RSA decryption failed:', error)
      message.error('解密失败')
    }
  }

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Alert
        title="RSA (Rivest-Shamir-Adleman)"
        description="非对称加密算法，使用公钥加密，私钥解密。安全性高，但速度较慢，适合加密少量数据（如密钥交换）。"
        type="warning"
        showIcon
      />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="密钥对配置 (Key Pair)" size="small" variant="borderless">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Text type="secondary">公钥 (Public Key) - 用于加密</Text>
                <Paragraph
                  ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}
                  copyable
                  style={{ fontFamily: 'monospace', marginTop: 4 }}
                >
                  {DEFAULT_PUBLIC_KEY}
                </Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <Text type="secondary">私钥 (Private Key) - 用于解密</Text>
                <Paragraph
                  ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}
                  copyable={{ text: DEFAULT_PRIVATE_KEY }}
                  style={{ fontFamily: 'monospace', marginTop: 4 }}
                >
                  {DEFAULT_PRIVATE_KEY.substring(0, 100)}... (安全起见仅显示部分)
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="公钥加密 (Public Key Encryption)" variant="borderless" className="shadow-sm">
            <Space orientation="vertical" style={{ width: '100%' }}>
              <Text strong>输入明文</Text>
              <TextArea
                rows={6}
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="请输入要加密的文本..."
              />
              <Button
                type="primary"
                icon={
                  <AnimatedIcon variant="spin" mode="hover">
                    <LockOutlined />
                  </AnimatedIcon>
                }
                onClick={handleEncrypt}
                block
              >
                使用公钥加密
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="私钥解密 (Private Key Decryption)" variant="borderless" className="shadow-sm">
            <Space orientation="vertical" style={{ width: '100%' }}>
              <Text strong>密文结果</Text>
              <TextArea
                rows={4}
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
                placeholder="加密后的密文..."
                style={{
                  backgroundColor: token.colorFillAlter,
                  color: token.colorText,
                }}
              />{' '}
              <Button
                icon={
                  <AnimatedIcon variant="spin" mode="hover">
                    <UnlockOutlined />
                  </AnimatedIcon>
                }
                onClick={handleDecrypt}
                block
                disabled={!cipherText}
              >
                使用私钥解密
              </Button>
              <div
                style={{
                  marginTop: 8,
                  padding: '8px 12px',
                  background: decryptedText ? token.colorWarningBg : token.colorFillAlter,
                  border: decryptedText ? `1px solid ${token.colorWarningBorder}` : `1px solid ${token.colorBorder}`,
                  borderRadius: 6,
                  minHeight: 60,
                }}
              >
                {decryptedText ? <Text>{decryptedText}</Text> : <Text type="secondary">解密结果...</Text>}
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

// 接口加密测试面板
const APIEncryptionPanel = () => {
  const { token } = theme.useToken()
  const { message } = App.useApp()
  const [encryptMode, setEncryptMode] = useState('AES')
  const [aesKey, setAesKey] = useState('test-key-1234567')
  const [rsaPublicKey, setRsaPublicKey] = useState(DEFAULT_PUBLIC_KEY)
  const [rsaPrivateKey, setRsaPrivateKey] = useState(DEFAULT_PRIVATE_KEY)
  const [testData, setTestData] = useState(JSON.stringify({ username: 'admin', password: '123456' }, null, 2))
  const [encryptionStatus, setEncryptionStatus] = useState(null)
  const [testResult, setTestResult] = useState('')

  const handleConfigureEncryption = () => {
    try {
      switch (encryptMode) {
        case 'AES':
          if (!aesKey || (aesKey.length !== 16 && aesKey.length !== 24 && aesKey.length !== 32)) {
            return message.error('AES 密钥长度必须是 16、24 或 32 字符')
          }
          request.configureAES(aesKey)
          break

        case 'RSA':
          if (!rsaPublicKey) {
            return message.error('请输入 RSA 公钥')
          }
          request.configureRSA(rsaPublicKey, rsaPrivateKey)
          break

        case 'HYBRID':
          if (!rsaPublicKey) {
            return message.error('请输入 RSA 公钥')
          }
          request.configureHybrid(rsaPublicKey, rsaPrivateKey)
          break

        default:
          return message.error('未知的加密模式')
      }

      const status = request.getEncryptionConfig()
      setEncryptionStatus(status)
      message.success(`${encryptMode} 加密已配置`)
    } catch (error) {
      message.error('配置失败: ' + error.message)
    }
  }

  const handleDisableEncryption = () => {
    request.disableEncryption()
    setEncryptionStatus(request.getEncryptionConfig())
    message.info('加密已禁用')
  }

  const handleTestEncryption = async () => {
    if (!encryptionStatus?.enabled) {
      return message.warning('请先配置加密')
    }

    try {
      // 模拟加密请求（这里仅做本地测试，实际需要后端配合）
      const data = JSON.parse(testData)

      // 手动加密数据（模拟请求拦截器的行为）
      let encryptedData
      switch (encryptionStatus.mode) {
        case 'AES':
          encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), aesKey).toString()
          break
        case 'RSA': {
          const encrypt = new JSEncrypt()
          encrypt.setPublicKey(rsaPublicKey)
          encryptedData = encrypt.encrypt(JSON.stringify(data))
          break
        }
        case 'HYBRID': {
          const randomKey = CryptoJS.lib.WordArray.random(16).toString()
          const aesEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), randomKey).toString()
          const rsaEncrypt = new JSEncrypt()
          rsaEncrypt.setPublicKey(rsaPublicKey)
          const encryptedKey = rsaEncrypt.encrypt(randomKey)
          encryptedData = { data: aesEncrypted, key: encryptedKey }
          break
        }
      }

      setTestResult(
        JSON.stringify(
          {
            mode: encryptionStatus.mode,
            encrypted: typeof encryptedData === 'string' ? encryptedData.substring(0, 100) + '...' : encryptedData,
            status: 'success',
          },
          null,
          2
        )
      )
      message.success('加密测试成功')
    } catch (error) {
      setTestResult(`错误: ${error.message}`)
      message.error('测试失败: ' + error.message)
    }
  }

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Alert
        title="Request.js 接口加密测试"
        description="配置并测试 request.js 的自动加密功能。实际使用时，请在应用初始化时配置，之后所有请求会自动加密。"
        type="success"
        showIcon
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="🔧 加密配置" variant="borderless" className="shadow-sm">
            <Space orientation="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <Text strong>1. 选择加密模式</Text>
                <Select value={encryptMode} onChange={setEncryptMode} style={{ width: '100%', marginTop: 8 }}>
                  <Option value="AES">AES 对称加密（高性能）</Option>
                  <Option value="RSA">RSA 非对称加密（高安全）</Option>
                  <Option value="HYBRID">混合加密（推荐）</Option>
                </Select>
              </div>

              {(encryptMode === 'AES' || encryptMode === 'HYBRID') && (
                <div>
                  <Text strong>2. AES 密钥 (16/24/32字符)</Text>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <Input value={aesKey} onChange={(e) => setAesKey(e.target.value)} placeholder="16/24/32字符密钥" />
                    <Button
                      icon={
                        <AnimatedIcon variant="spin" mode="hover">
                          <ReloadOutlined />
                        </AnimatedIcon>
                      }
                      onClick={() => setAesKey(CryptoJS.lib.WordArray.random(16).toString())}
                    >
                      随机
                    </Button>
                  </div>
                </div>
              )}

              {(encryptMode === 'RSA' || encryptMode === 'HYBRID') && (
                <>
                  <div>
                    <Text strong>3. RSA 公钥</Text>
                    <TextArea
                      value={rsaPublicKey}
                      onChange={(e) => setRsaPublicKey(e.target.value)}
                      rows={3}
                      placeholder="RSA 公钥"
                      style={{ marginTop: 8, fontFamily: 'monospace', fontSize: 12 }}
                    />
                  </div>
                  <div>
                    <Text strong>4. RSA 私钥（可选，用于解密响应）</Text>
                    <TextArea
                      value={rsaPrivateKey}
                      onChange={(e) => setRsaPrivateKey(e.target.value)}
                      rows={3}
                      placeholder="RSA 私钥"
                      style={{ marginTop: 8, fontFamily: 'monospace', fontSize: 12 }}
                    />
                  </div>
                </>
              )}

              <Space style={{ width: '100%' }}>
                <Button
                  type="primary"
                  icon={
                    <AnimatedIcon variant="spin" mode="hover">
                      <KeyOutlined />
                    </AnimatedIcon>
                  }
                  onClick={handleConfigureEncryption}
                >
                  应用配置
                </Button>
                <Button onClick={handleDisableEncryption}>禁用加密</Button>
              </Space>

              {encryptionStatus && (
                <Alert
                  title="当前状态"
                  description={
                    <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
                      <div>启用: {encryptionStatus.enabled ? '✅ 是' : '❌ 否'}</div>
                      <div>模式: {encryptionStatus.mode}</div>
                      <div>加密请求: {encryptionStatus.encryptRequest ? '✅' : '❌'}</div>
                      <div>解密响应: {encryptionStatus.encryptResponse ? '✅' : '❌'}</div>
                    </div>
                  }
                  type={encryptionStatus.enabled ? 'success' : 'warning'}
                  showIcon
                  icon={
                    <AnimatedIcon variant="spin" mode="hover">
                      <CheckCircleOutlined />
                    </AnimatedIcon>
                  }
                />
              )}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="🧪 加密测试" variant="borderless" className="shadow-sm">
            <Space orientation="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <Text strong>测试数据 (JSON)</Text>
                <TextArea
                  value={testData}
                  onChange={(e) => setTestData(e.target.value)}
                  rows={6}
                  placeholder="输入要加密的 JSON 数据"
                  style={{ marginTop: 8, fontFamily: 'monospace' }}
                />
              </div>

              <Button
                type="primary"
                icon={
                  <AnimatedIcon variant="spin" mode="hover">
                    <ApiOutlined />
                  </AnimatedIcon>
                }
                onClick={handleTestEncryption}
                block
                disabled={!encryptionStatus?.enabled}
              >
                测试加密
              </Button>

              {testResult && (
                <div>
                  <Text strong>加密结果</Text>
                  <div
                    style={{
                      marginTop: 8,
                      padding: 12,
                      background: token.colorFillAlter,
                      border: `1px solid ${token.colorBorder}`,
                      borderRadius: 6,
                      maxHeight: 300,
                      overflow: 'auto',
                      fontFamily: 'monospace',
                      fontSize: 12,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                    }}
                  >
                    {testResult}
                  </div>
                </div>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
      <Card title="📖 使用说明" size="small" variant="borderless">
        <Space orientation="vertical" style={{ width: '100%' }} size="small">
          <Text>
            <Text strong>1. 配置加密:</Text> 选择加密模式并填写密钥，点击"应用配置"
          </Text>
          <Text>
            <Text strong>2. 全局生效:</Text> 配置后，所有通过 request 发起的请求都会自动加密
          </Text>
          <Text>
            <Text strong>3. 单独控制:</Text> 可在请求配置中添加 <Text code>encrypt: false</Text> 禁用单个请求的加密
          </Text>
          <Text>
            <Text strong>4. 代码示例:</Text>
            <Text code style={{ display: 'block', marginTop: 4, padding: 8, background: token.colorFillAlter }}>
              {`// 在应用入口配置\nimport request from '@src/service/request'\nrequest.configureHybrid(PUBLIC_KEY, PRIVATE_KEY)\n\n// 之后所有请求自动加密\nconst data = await request.post('/api/login', credentials)`}
            </Text>
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            💡 提示: 完整文档请查看 <Text code>docs/REQUEST_ENCRYPTION.md</Text>
          </Text>
        </Space>
      </Card>
    </Space>
  )
}

const MyCrypto = () => {
  const items = [
    {
      key: 'aes',
      label: (
        <span>
          <AnimatedIcon variant="spin" mode="hover">
            <LockOutlined />
          </AnimatedIcon>
          AES 加密
        </span>
      ),
      children: <AESPanel />,
    },
    {
      key: 'rsa',
      label: (
        <span>
          <AnimatedIcon variant="spin" mode="hover">
            <KeyOutlined />
          </AnimatedIcon>
          RSA 加密
        </span>
      ),
      children: <RSAPanel />,
    },
    {
      key: 'api',
      label: (
        <span>
          <AnimatedIcon variant="spin" mode="hover">
            <ApiOutlined />
          </AnimatedIcon>
          接口加密测试
        </span>
      ),
      children: <APIEncryptionPanel />,
    },
  ]

  return (
    <FixTabPanel>
      <App>
        <Card variant="borderless" style={{ minHeight: '100%' }}>
          <Title level={3}>加密算法实验室</Title>
          <Paragraph type="secondary">
            提供常用的对称加密 (AES)、非对称加密 (RSA) 在线测试工具，以及 Request.js 接口加密功能测试。
          </Paragraph>
          <Divider />
          <Tabs defaultActiveKey="aes" items={items} type="card" animated={{ inkBar: true, tabPane: false }} />
        </Card>
      </App>
    </FixTabPanel>
  )
}

export default MyCrypto
