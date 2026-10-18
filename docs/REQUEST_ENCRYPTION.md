# 可选请求加密协议

## 范围

这是已有应用协议的兼容实现，默认关闭，不是独立安全通道。TLS 和服务端授权仍然必需。核心在 platform/api/core/encryption.ts，Axios 与 Fetch 共用实现，但各持有自己的 EncryptionConfig，互不隐式同步。

```ts
import { encryptionConfig } from '@platform/api/request'

// key 由业务协议在运行时提供；不要放进浏览器环境变量。
encryptionConfig.configureAES(key)
// 单次请求可设 encrypt:false 或 decrypt:false。
```

Fetch 配置从 platform/api/http 导入。configureAES 接受 16/24/32 字符；configureRSA 接收公钥及可选私钥；configureHybrid 使用 RSA 公钥包装临时 AES key；disable 关闭，reset 清空配置。

## 现有 wire format

| 模式   | 全量请求                             |
| ------ | ------------------------------------ |
| AES    | `{ encrypted, mode: 'AES' }`         |
| RSA    | `{ encrypted, mode: 'RSA' }`         |
| HYBRID | `{ encrypted, key, mode: 'HYBRID' }` |

AES 使用 CryptoJS 的 passphrase API，不能把它等同于 raw-key AES-GCM。RSA 继续使用 JSEncrypt 和原来的 117 字符分段格式；超过一段时 encrypted 是 JSON 字符串数组。该分段按字符而非 UTF-8 字节计算，多字节文本和密钥长度需要与后端另行验证。

encryptFields 对对象的指定顶层字段加密；HYBRID 字段值为 `{ encrypted, key }`。FormData/Blob 不加密。全量加密使用 X-Encryption-Mode header；query/body 的具体处理见两个适配器。

响应解密要求 encrypted 字段，并依据 mode 或本地模式。RSA/HYBRID 缺少私钥时保留原 envelope，这是兼容行为，调用方不能当作已解密数据使用。加解密失败默认抛出；旧适配器保留 throwOnEncryptError:false / throwOnDecryptError:false 的兼容选项，显式关闭失败抛错可能允许原始数据继续处理。

## 配置边界

浏览器环境白名单只包含模式与 RSA 公钥，不允许 AES key、私钥或服务端 token。EncryptionConfig 中 keyExchangeUrl 当前只是配置字段，没有自动协商实现。服务端 api/ 不实现该协议；接入前必须验证协议、key 生命周期、错误响应和重放策略。

core/encryption.test.ts 验证 AES 往返与实例配置隔离，adapters.test.ts 验证 Fetch 加密失败时默认不发送请求；这些测试不代表 RSA 与外部服务的兼容认证。
