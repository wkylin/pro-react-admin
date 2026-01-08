# Request 加密 API 参考

快速查找 API 文档。

## 目录

- [配置方法](#配置方法)
- [控制方法](#控制方法)
- [查询方法](#查询方法)
- [请求配置](#请求配置)
- [数据格式](#数据格式)

---

## 配置方法

### `request.configureAES(key)`

配置 AES 对称加密。

**参数:**
- `key` (string): AES 密钥，必须是 16/24/32 字符

**示例:**
```javascript
request.configureAES('1234567890123456')
```

**返回:** `request` (链式调用)

---

### `request.configureRSA(publicKey, privateKey)`

配置 RSA 非对称加密。

**参数:**
- `publicKey` (string): RSA 公钥（必需）
- `privateKey` (string): RSA 私钥（可选，用于解密响应）

**示例:**
```javascript
request.configureRSA(PUBLIC_KEY, PRIVATE_KEY)
```

**返回:** `request` (链式调用)

---

### `request.configureHybrid(rsaPublicKey, rsaPrivateKey)`

配置混合加密（推荐）。

**参数:**
- `rsaPublicKey` (string): RSA 公钥（必需）
- `rsaPrivateKey` (string): RSA 私钥（可选）

**特性:**
- 自动生成随机 AES 密钥
- 使用 RSA 加密 AES 密钥
- 使用 AES 加密实际数据

**示例:**
```javascript
request.configureHybrid(PUBLIC_KEY, PRIVATE_KEY)
```

**返回:** `request` (链式调用)

---

## 控制方法

### `request.enableEncryption()`

启用加密功能。

**示例:**
```javascript
request.enableEncryption()
```

**返回:** `request` (链式调用)

---

### `request.disableEncryption()`

禁用加密功能。

**示例:**
```javascript
request.disableEncryption()
```

**返回:** `request` (链式调用)

---

### `request.setEncryptRequest(enabled)`

设置是否加密请求。

**参数:**
- `enabled` (boolean): true = 加密，false = 不加密

**示例:**
```javascript
request.setEncryptRequest(true)
```

**返回:** `request` (链式调用)

---

### `request.setEncryptResponse(enabled)`

设置是否解密响应。

**参数:**
- `enabled` (boolean): true = 解密，false = 不解密

**示例:**
```javascript
request.setEncryptResponse(false)
```

**返回:** `request` (链式调用)

---

## 查询方法

### `request.getEncryptionConfig()`

获取当前加密配置。

**返回:**
```typescript
{
  enabled: boolean,        // 是否启用
  mode: 'AES'|'RSA'|'HYBRID',  // 加密模式
  encryptRequest: boolean, // 是否加密请求
  encryptResponse: boolean // 是否解密响应
}
```

**示例:**
```javascript
const config = request.getEncryptionConfig()
console.log(config)
// { enabled: true, mode: 'HYBRID', encryptRequest: true, encryptResponse: true }
```

---

## 请求配置

可在任何请求方法中使用以下配置选项：

### `encrypt`

单个请求是否加密。

**类型:** `boolean`  
**默认:** `true`

**示例:**
```javascript
// 禁用本次请求的加密
request.post('/api/public', data, {
  encrypt: false
})
```

---

### `throwOnEncryptError`

加密失败时是否抛出错误。

**类型:** `boolean`  
**默认:** `true`

**示例:**
```javascript
request.post('/api/data', data, {
  throwOnEncryptError: false  // 加密失败时不抛出错误
})
```

---

### `throwOnDecryptError`

解密失败时是否抛出错误。

**类型:** `boolean`  
**默认:** `true`

**示例:**
```javascript
request.get('/api/data', {}, {
  throwOnDecryptError: false  // 解密失败时不抛出错误
})
```

---

## 数据格式

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
  "encrypted": "aBcDeFgHiJkLmNoPqRs==",
  "mode": "RSA"
}
```

#### 混合模式
```json
{
  "encrypted": "U2FsdGVkX1+XXXXXXXX==",
  "key": "aBcDeFgHiJkLmNoPqRs==",
  "mode": "HYBRID"
}
```

### 请求头

加密请求会自动添加以下请求头：

```
X-Encryption-Mode: AES|RSA|HYBRID
```

### 响应数据格式

响应数据格式与请求相同。如果响应包含 `encrypted` 和 `mode` 字段，会自动解密。

---

## 完整示例

```javascript
import request from '@src/service/request'

// 1. 配置加密
request.configureHybrid(PUBLIC_KEY, PRIVATE_KEY)

// 2. 查看配置
console.log(request.getEncryptionConfig())

// 3. 发送加密请求（自动）
const data = await request.post('/api/sensitive', {
  username: 'admin',
  password: '123456'
})

// 4. 单个请求禁用加密
const publicData = await request.get('/api/public', {}, {
  encrypt: false
})

// 5. 临时禁用所有加密
request.disableEncryption()

// 6. 重新启用
request.enableEncryption()

// 7. 链式调用
request
  .configureHybrid(PUBLIC_KEY, PRIVATE_KEY)
  .setEncryptRequest(true)
  .setEncryptResponse(true)
```

---

## 导出类（高级用法）

如果需要直接使用加密工具类：

```javascript
import { EncryptionHandler } from '@src/service/request'

// AES 加密
const encrypted = EncryptionHandler.encryptAES(data, key)

// AES 解密
const decrypted = EncryptionHandler.decryptAES(cipherText, key)

// RSA 加密
const encrypted = EncryptionHandler.encryptRSA(data, publicKey)

// RSA 解密
const decrypted = EncryptionHandler.decryptRSA(cipherText, privateKey)

// 混合加密
const { encryptedKey, encryptedData } = EncryptionHandler.encryptHybrid(
  data, aesKey, rsaPublicKey
)

// 混合解密
const decrypted = EncryptionHandler.decryptHybrid(
  encryptedData, encryptedKey, rsaPrivateKey
)
```

---

## 快速参考表

| 方法 | 用途 | 链式 |
|------|------|------|
| `configureAES(key)` | 配置 AES 加密 | ✅ |
| `configureRSA(pub, pri)` | 配置 RSA 加密 | ✅ |
| `configureHybrid(pub, pri)` | 配置混合加密 | ✅ |
| `enableEncryption()` | 启用加密 | ✅ |
| `disableEncryption()` | 禁用加密 | ✅ |
| `setEncryptRequest(bool)` | 设置加密请求 | ✅ |
| `setEncryptResponse(bool)` | 设置解密响应 | ✅ |
| `getEncryptionConfig()` | 获取配置 | ❌ |

---

## 更多资源

- [快速开始指南](./ENCRYPTION_QUICK_START.md)
- [完整文档](./REQUEST_ENCRYPTION.md)
- [使用示例](./encryption-examples.js)
- [配置示例](../src/config/encryption.example.js)

---

**提示:** 所有配置方法都支持链式调用！

```javascript
request
  .configureHybrid(PUBLIC_KEY, PRIVATE_KEY)
  .setEncryptRequest(true)
  .setEncryptResponse(true)
  .enableEncryption()
```
