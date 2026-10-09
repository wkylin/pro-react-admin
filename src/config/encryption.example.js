import request from '@src/service/request'

/**
 * 示例：只使用可公开的 RSA 公钥加密客户端请求。
 * 启用前需确认服务端实现了相同的数据协议。
 * 不要在浏览器代码中配置 AES 共享密钥或 RSA 私钥。
 */
export function initRequestEncryption() {
  const publicKey = import.meta.env.VITE_RSA_PUBLIC_KEY

  if (!publicKey) {
    return false
  }

  request.configureHybrid(publicKey)
  request.setEncryptResponse(false)
  return true
}
