# 请求数据加密

`src/service/request.js` 支持 AES、RSA 和混合加密，并允许单次请求通过 `encrypt: false` 跳过加密。默认情况下，加密未启用。

## 安全边界

浏览器中的代码和构建变量都可以被用户查看。不要把 AES 共享密钥、RSA 私钥、密码或服务端访问令牌放入源码、`VITE_*` 变量或前端构建产物。RSA 公钥可以公开；私钥应留在服务端。

HTTPS 是传输安全的基础。前端加密不能代替 HTTPS、服务端鉴权、权限检查或密钥轮换。启用加密前，客户端和服务端需要共同定义数据格式、密钥交换、响应处理、错误和轮换策略。

## 配置方式

```ts
import request from '@src/service/request'

// 只有后端协议明确支持时才启用。
// 公钥可从安全的公开配置接口读取或作为公开配置发布。
request.configureHybrid(publicKey)
request.setEncryptResponse(false)
```

服务端返回的数据是否需要解密，取决于服务端协议。浏览器不能安全地持有用于解密的服务端私钥。项目的 `src/pages/crypto` 是交互演示页面，不代表可直接上线的密钥管理方案。

单次请求跳过加密：

```ts
await request.post('/api/public-data', payload, { encrypt: false })
```

加密 API 实现位于 `src/service/request.js`；页面和领域 API 不应重复实现加密算法。

安全示例见 `src/config/encryption.example.js`，该示例只从公开配置读取 RSA 公钥，不包含客户端私钥或共享密钥。

