# Request 接口加密使用指南

本文档介绍如何在 `request.js` 中使用接口数据加密功能。

## 功能特性

- ✅ 支持 **AES 对称加密**（高性能）
- ✅ 支持 **RSA 非对称加密**（高安全性）
- ✅ 支持 **混合加密模式**（推荐：RSA 加密密钥 + AES 加密数据）
- ✅ 自动加密请求数据
- ✅ 自动解密响应数据
- ✅ 支持单个请求独立控制加密
- ✅ 分段加密支持（处理 RSA 长文本限制）

## 技术栈

- **crypto-js**: AES 对称加密（已安装在项目中）
- **jsencrypt**: RSA 非对称加密（已安装在项目中）

## 快速开始

### 1. AES 加密（推荐用于高性能场景）

```javascript
import request from '@src/service/request'

// 配置 AES 密钥（16/24/32 字符）
request.configureAES('1234567890123456')

// 之后所有请求会自动加密
const data = await request.post('/api/sensitive-data', {
  username: 'admin',
  password: '123456'
})
```

**优点**：
- 加密速度快
- 适合大数据量
- CPU 占用低

**缺点**：
- 需要安全地传输密钥
- 密钥泄露风险较高

---

### 2. RSA 加密（推荐用于高安全场景）

```javascript
import request from '@src/service/request'

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0BDRgoeZCRRvH/QLbGhe
...
-----END PUBLIC KEY-----`

const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQENGCh5kJFG8f
...
-----END PRIVATE KEY-----`

// 配置 RSA 密钥对
request.configureRSA(PUBLIC_KEY, PRIVATE_KEY)

// 之后所有请求会自动加密
const data = await request.post('/api/payment', {
  amount: 10000,
  cardNumber: '6222021234567890'
})
```

**优点**：
- 安全性极高
- 公钥可以公开传输
- 适合加密敏感信息

**缺点**：
- 加密速度慢
- 数据长度有限制（自动分段处理）

---

### 3. 混合加密（⭐ 最佳实践）

混合加密结合了 RSA 和 AES 的优点：
- 使用 RSA 加密 AES 密钥（安全传输）
- 使用 AES 加密实际数据（高性能）

```javascript
import request from '@src/service/request'

const PUBLIC_KEY = `...`
const PRIVATE_KEY = `...`

// 配置混合加密（会自动生成随机 AES 密钥）
request.configureHybrid(PUBLIC_KEY, PRIVATE_KEY)

// 之后所有请求会自动使用混合加密
const data = await request.post('/api/user/register', {
  username: 'newuser',
  password: 'SecurePass123!',
  email: 'user@example.com',
  idCard: '110101199001011234'
})
```

**数据传输格式**：
```json
{
  "encrypted": "U2FsdGVkX1+...", // AES 加密的数据
  "key": "aBcDeF123...",          // RSA 加密的 AES 密钥
  "mode": "HYBRID"
}
```

---

## 高级配置

### 单个请求禁用加密

```javascript
// 全局启用加密
request.configureAES('my-secret-key')

// 某个请求不需要加密
const data = await request.post('/api/public-data', payload, {
  encrypt: false  // 本次请求不加密
})
```

### 只加密请求，不解密响应

```javascript
request.configureAES('my-secret-key')
request.setEncryptResponse(false) // 禁用响应解密

// 请求数据加密，但响应不解密
const data = await request.post('/api/login', credentials)
```

### 只解密响应，不加密请求

```javascript
request.configureAES('my-secret-key')
request.setEncryptRequest(false) // 禁用请求加密

// 请求数据不加密，但响应会解密
const data = await request.get('/api/encrypted-data')
```

### 动态切换加密模式

```javascript
// 初始使用 AES
request.configureAES('initial-key')

// 切换到混合加密
request.configureHybrid(PUBLIC_KEY, PRIVATE_KEY)

// 临时禁用加密
request.disableEncryption()

// 重新启用
request.enableEncryption()
```

### 获取当前加密配置

```javascript
const config = request.getEncryptionConfig()
console.log(config)
// {
//   enabled: true,
//   mode: 'HYBRID',
//   encryptRequest: true,
//   encryptResponse: true
// }
```

---

## 后端对接

### 请求数据格式

#### AES 模式
```json
{
  "encrypted": "U2FsdGVkX1+XXXXXXXX==",
  "mode": "AES"
}
```

#### RSA 模式
```json
{
  "encrypted": "aBcDeFgHiJkLmNoPqRsTuVwXyZ123456==",
  "mode": "RSA"
}
```

#### 混合模式
```json
{
  "encrypted": "U2FsdGVkX1+XXXXXXXX==",
  "key": "aBcDeFgHiJkLmNoPqRsTuVwXyZ123456==",
  "mode": "HYBRID"
}
```

### 后端解密示例（Node.js）

```javascript
const crypto = require('crypto')
const NodeRSA = require('node-rsa')

// AES 解密
function decryptAES(encryptedData, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key)
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8')
  decrypted += decipher.final('utf8')
  return JSON.parse(decrypted)
}

// RSA 解密
function decryptRSA(encryptedData, privateKey) {
  const key = new NodeRSA(privateKey)
  const decrypted = key.decrypt(encryptedData, 'utf8')
  return JSON.parse(decrypted)
}

// 混合解密
function decryptHybrid(encryptedData, encryptedKey, privateKey) {
  // 1. 使用 RSA 解密 AES 密钥
  const key = new NodeRSA(privateKey)
  const aesKey = key.decrypt(encryptedKey, 'utf8')
  
  // 2. 使用 AES 密钥解密数据
  return decryptAES(encryptedData, aesKey)
}

// Express 中间件示例
app.use((req, res, next) => {
  if (req.body && req.body.mode) {
    try {
      switch (req.body.mode) {
        case 'AES':
          req.body = decryptAES(req.body.encrypted, AES_KEY)
          break
        case 'RSA':
          req.body = decryptRSA(req.body.encrypted, PRIVATE_KEY)
          break
        case 'HYBRID':
          req.body = decryptHybrid(req.body.encrypted, req.body.key, PRIVATE_KEY)
          break
      }
    } catch (error) {
      return res.status(400).json({ error: '解密失败' })
    }
  }
  next()
})
```

---

## 安全建议

### ⚠️ 密钥管理

1. **永远不要将密钥硬编码在代码中**
2. **使用环境变量或配置中心存储密钥**
3. **定期更换密钥**
4. **RSA 私钥绝不能暴露给前端**

### ✅ 推荐做法

```javascript
// ❌ 不推荐：硬编码密钥
request.configureAES('1234567890123456')

// ✅ 推荐：从环境变量或接口获取
const initEncryption = async () => {
  // 方式 1: 从后端获取公钥
  const { publicKey } = await request.get('/api/get-public-key', {}, {
    encrypt: false  // 获取密钥的请求不能加密
  })
  request.configureRSA(publicKey)
  
  // 方式 2: 从环境变量读取
  const key = import.meta.env.VITE_AES_KEY
  request.configureAES(key)
}

// 在应用启动时初始化
initEncryption()
```

### 🔐 混合加密优势

```javascript
// 混合加密会为每次请求生成新的 AES 密钥
// 即使一次通信被破解，也不影响其他请求的安全性
request.configureHybrid(PUBLIC_KEY, PRIVATE_KEY)
```

---

## 性能对比

| 加密方式 | 加密速度 | 安全性 | 数据量限制 | 推荐场景 |
|---------|---------|--------|-----------|---------|
| **AES** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 无限制 | 高频请求、大数据量 |
| **RSA** | ⭐⭐ | ⭐⭐⭐⭐⭐ | 117字节/段 | 敏感信息、低频请求 |
| **混合** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 无限制 | 综合场景（推荐） |

---

## 常见问题

### Q1: 为什么加密后请求失败？
- 检查后端是否支持解密
- 确认密钥配置正确
- 查看控制台错误日志

### Q2: FormData 可以加密吗？
- 不可以，FormData 和 Blob 类型会自动跳过加密
- 文件上传等场景建议使用其他安全措施

### Q3: 如何调试加密数据？
```javascript
// 临时禁用加密查看原始数据
request.disableEncryption()

// 查看加密配置
console.log(request.getEncryptionConfig())

// 加密后的数据会打印在控制台
```

### Q4: 加密影响性能吗？
- AES 加密性能开销 < 5%
- RSA 加密对长文本有明显延迟
- 混合加密综合性能最佳

---

## 完整示例

```javascript
// src/config/encryption.js
import request from '@src/service/request'

// RSA 密钥对（实际应从后端获取）
const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0BDRgoeZCRRvH/QLbGhe
M6ecmHUzm4ofqRgBPl1yThEryOQ8gGjmr16Xlj7cAedZz0vqvUsWnZh5KMZ5b5vQ
Y4HGhPfPL3CzlI+iL0JyfFN9DsIe7uSDsStBfbLQas+IYIu47RMW9YNAmS8QFmqn
4Gpw6S1t3H+1AfwQpAGxXHm3+2mTClkautPOAqmTkAzM5eLIisOI/RE4YZiHRl49
l+yUAmpAqRw0WnvqRlw76ES6naSBxHM7iQeAlo8R5YqheD2kNzJbEcJ7Owd4Rcfo
kKZxSh7Qy/Pre8QFvIKdsCu4hpIGkws86s1IHvFLCXsXUxPR5z3E69VuW6K6rkXT
lwIDAQAB
-----END PUBLIC KEY-----`

const RSA_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQENGCh5kJFG8f
...（完整私钥）
-----END PRIVATE KEY-----`

/**
 * 初始化加密配置
 */
export const initEncryption = () => {
  // 使用混合加密（推荐）
  request.configureHybrid(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY)
  
  console.log('✅ 接口加密已启用')
  console.log('📊 加密配置:', request.getEncryptionConfig())
}

/**
 * 动态获取密钥并初始化
 */
export const initEncryptionFromServer = async () => {
  try {
    // 从服务器获取公钥
    const { publicKey } = await request.get('/api/crypto/public-key', {}, {
      encrypt: false  // 获取密钥时不能加密
    })
    
    request.configureRSA(publicKey)
    console.log('✅ 接口加密已启用（服务器密钥）')
  } catch (error) {
    console.error('❌ 加密初始化失败:', error)
  }
}

// src/index.tsx
import { initEncryption } from './config/encryption'

// 应用启动时初始化加密
initEncryption()

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

---

## 更新日志

### v1.0.0 (2026-01-08)
- ✅ 支持 AES/RSA/混合加密
- ✅ 自动加密请求和响应
- ✅ 支持单个请求独立控制
- ✅ 完整的错误处理和日志

---

## 参考资料

- [crypto-js 文档](https://cryptojs.gitbook.io/docs/)
- [jsencrypt 文档](https://github.com/travist/jsencrypt)
- [AES 加密标准](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
- [RSA 加密标准](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
