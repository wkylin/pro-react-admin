# 接口加密快速开始

## 🚀 5 分钟快速集成

### 步骤 1: 安装依赖（已完成）

项目已包含必需的依赖：
- ✅ `crypto-js` - AES 加密
- ✅ `jsencrypt` - RSA 加密

### 步骤 2: 配置环境变量

在 `.env.development` 或 `.env.production` 中添加：

```bash
# 加密模式: none | rsa | hybrid
REACT_APP_ENCRYPTION_MODE=hybrid

# RSA 公钥（从后端获取或自己生成）
REACT_APP_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
-----END PUBLIC KEY-----"

# 不要将 RSA 私钥或其他服务器凭据放入前端环境变量
```

Webpack 只会将 webpack/client-env.js 白名单注入浏览器。RSA 公钥可以公开；固定 AES 密钥不能作为浏览器端秘密，Webpack 会拒绝注入 AES key、密码和其他凭据。前端加密不能代替 TLS、身份认证和服务端授权。

### 步骤 3: 初始化加密（在应用入口）

**方式 A: 使用配置文件（推荐）**

```javascript
// src/index.tsx 或 src/main.tsx
import { initEncryptionByEnv } from '@src/config/encryption.example'

// 应用启动时初始化
initEncryptionByEnv().then(() => {
  console.log('✅ 加密配置完成')
})

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

**方式 B: 直接配置**

```javascript
// src/index.tsx
import request from '@src/service/request'
import { getEnv } from '@utils/env'

// 混合加密（推荐）
request.configureHybrid(
  getEnv('REACT_APP_RSA_PUBLIC_KEY')
)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

### 步骤 4: 使用（无需修改代码）

配置完成后，所有请求**自动加密**：

```javascript
// ✅ 自动加密 - 无需任何改动
const login = async (credentials) => {
  const data = await request.post('/api/login', credentials)
  return data
}

// ✅ 自动加密 - 无需任何改动
const updateProfile = async (profile) => {
  const data = await request.put('/api/user/profile', profile)
  return data
}
```

### 步骤 5: 单个请求控制（可选）

```javascript
// 某个公开接口不需要加密
const publicData = await request.get('/api/public/data', {}, {
  encrypt: false  // 禁用加密
})

// 获取加密密钥的请求不能加密
const { publicKey } = await request.get('/api/crypto/public-key', {}, {
  encrypt: false
})
```

---

## 🎯 常见场景

### 场景 1: 登录接口

```javascript
// 自动加密用户名和密码
export const loginAPI = (username, password) => {
  return request.post('/api/auth/login', {
    username,
    password
  })
}
```

**请求体（加密前）:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**请求体（加密后 - 混合模式）:**
```json
{
  "encrypted": "U2FsdGVkX1+XXXXXXXX==",
  "key": "aBcDeFgHiJkLmNoPqRs==",
  "mode": "HYBRID"
}
```

### 场景 2: 支付接口

```javascript
// 自动加密敏感支付信息
export const createPayment = (paymentData) => {
  return request.post('/api/payment/create', {
    amount: paymentData.amount,
    cardNumber: paymentData.cardNumber,
    cvv: paymentData.cvv
  })
}
```

### 场景 3: 个人信息更新

```javascript
// 自动加密身份证号等敏感信息
export const updateUserInfo = (userInfo) => {
  return request.put('/api/user/info', {
    name: userInfo.name,
    idCard: userInfo.idCard,
    phone: userInfo.phone
  })
}
```

---

## 🧪 测试加密功能

### 方式 1: 使用内置测试页面

访问项目中的加密测试页面：
1. 启动项目
2. 访问 `/crypto` 路由
3. 切换到"接口加密测试"标签
4. 配置加密方式并测试

### 方式 2: 控制台测试

```javascript
// 打开浏览器控制台

// 1. 配置加密
request.configureAES('1234567890123456')

// 2. 查看配置
console.log(request.getEncryptionConfig())

// 3. 测试请求（会自动加密）
request.post('/api/test', { test: 'data' })
  .then(res => console.log('成功:', res))
  .catch(err => console.error('失败:', err))

// 4. 禁用加密
request.disableEncryption()
```

---

## 📋 后端对接清单

### 1. 后端需要实现的功能

- [ ] 解析加密请求体
- [ ] 识别加密模式（从 `mode` 字段或请求头 `X-Encryption-Mode`）
- [ ] 根据模式解密数据
- [ ] （可选）加密响应数据

### 2. 解密中间件示例（Express）

```javascript
const crypto = require('crypto')
const NodeRSA = require('node-rsa')

// 解密中间件
app.use((req, res, next) => {
  // 检查是否为加密请求
  if (!req.body || !req.body.mode) {
    return next()
  }

  try {
    let decryptedData

    switch (req.body.mode) {
      case 'AES':
        // AES 解密
        const decipher = crypto.createDecipher('aes-256-cbc', AES_KEY)
        let aesDecrypted = decipher.update(req.body.encrypted, 'base64', 'utf8')
        aesDecrypted += decipher.final('utf8')
        decryptedData = JSON.parse(aesDecrypted)
        break

      case 'RSA':
        // RSA 解密
        const rsaKey = new NodeRSA(PRIVATE_KEY)
        const rsaDecrypted = rsaKey.decrypt(req.body.encrypted, 'utf8')
        decryptedData = JSON.parse(rsaDecrypted)
        break

      case 'HYBRID':
        // 混合解密：先解密密钥，再解密数据
        const hybridKey = new NodeRSA(PRIVATE_KEY)
        const aesKeyDecrypted = hybridKey.decrypt(req.body.key, 'utf8')
        
        const hybridDecipher = crypto.createDecipher('aes-256-cbc', aesKeyDecrypted)
        let hybridDecrypted = hybridDecipher.update(req.body.encrypted, 'base64', 'utf8')
        hybridDecrypted += hybridDecipher.final('utf8')
        decryptedData = JSON.parse(hybridDecrypted)
        break

      default:
        return res.status(400).json({ error: '不支持的加密模式' })
    }

    // 替换请求体为解密后的数据
    req.body = decryptedData
    console.log('✅ 请求解密成功')
    next()

  } catch (error) {
    console.error('❌ 解密失败:', error)
    res.status(400).json({ error: '解密失败' })
  }
})
```

### 3. 提供密钥交换接口

```javascript
// 获取公钥接口（不需要加密）
app.get('/api/crypto/public-key', (req, res) => {
  res.json({
    publicKey: RSA_PUBLIC_KEY,
    mode: 'RSA'
  })
})

// 获取加密配置接口
app.get('/api/crypto/config', (req, res) => {
  res.json({
    enabled: true,
    mode: 'HYBRID',
    publicKey: RSA_PUBLIC_KEY
    // 不要返回私钥或 AES 密钥！
  })
})
```

---

## ⚠️ 安全注意事项

### ✅ 推荐做法

1. **不要在浏览器配置固定 AES 密钥**
   ```bash
   REACT_APP_RSA_PUBLIC_KEY=...
   ```
   浏览器 bundle 对使用者可见。RSA 公钥可以公开，私钥和固定 AES 密钥只能保存在服务端。

2. **从后端获取公钥**
   ```javascript
   const { publicKey } = await request.get('/api/crypto/public-key', {}, {
     encrypt: false
   })
   request.configureRSA(publicKey)
   ```

3. **使用混合加密**
   ```javascript
   // 结合 RSA 和 AES 的优点
   request.configureHybrid(publicKey)
   ```

4. **私钥不要暴露给前端**
   ```javascript
   // ❌ 不要这样做
   request.configureRSA(publicKey)  // 前端不需要私钥！
   
   // ✅ 只配置公钥
   request.configureRSA(publicKey)
   ```

5. **生产环境禁用日志**
   ```javascript
   if (process.env.NODE_ENV === 'production') {
     // 禁用加密相关日志
   }
   ```

### ❌ 避免的做法

- ❌ 在代码中硬编码密钥
- ❌ 将私钥发送到前端
- ❌ 在生产环境暴露加密配置
- ❌ 使用弱密钥（如 "123456"）
- ❌ 所有接口都不加密

---

## 🔍 故障排查

### 问题 1: 配置后请求失败

**检查清单:**
- [ ] 后端是否实现了解密逻辑？
- [ ] 密钥是否正确？
- [ ] 查看控制台日志
- [ ] 临时禁用加密测试

```javascript
// 临时禁用加密测试
request.disableEncryption()
```

### 问题 2: 某些请求不应该加密

```javascript
// 为特定请求禁用加密
const publicData = await request.get('/api/public', {}, {
  encrypt: false
})
```

### 问题 3: 查看加密状态

```javascript
// 查看当前配置
console.log(request.getEncryptionConfig())

// 查看活跃请求数
console.log(request.getActiveRequestCount())
```

---

## 📚 更多资源

- 📖 [完整文档](./REQUEST_ENCRYPTION.md)
- 🔧 [配置示例](../src/config/encryption.example.js)
- 🧪 [测试页面](../src/pages/crypto/index.tsx)
- 📝 [API 文档](../src/service/request.js)

---

## ✨ 特性总结

| 特性 | 说明 | 状态 |
|-----|------|------|
| AES 加密 | 对称加密，高性能 | ✅ |
| RSA 加密 | 非对称加密，高安全 | ✅ |
| 混合加密 | RSA+AES，推荐 | ✅ |
| 自动加密 | 请求自动加密 | ✅ |
| 自动解密 | 响应自动解密 | ✅ |
| 单独控制 | 单个请求控制 | ✅ |
| 分段加密 | RSA 长文本支持 | ✅ |
| 错误处理 | 完整错误处理 | ✅ |
| 日志记录 | 详细日志 | ✅ |
| TypeScript | 类型支持 | 🔄 |

---

需要帮助？查看 [完整文档](./REQUEST_ENCRYPTION.md) 或在项目中访问 `/crypto` 页面进行测试！
