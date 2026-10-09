/**
 * 接口加密配置示例
 *
 * 使用方法：
 * 1. 复制此文件并重命名为 encryption.js
 * 2. 配置你的密钥
 * 3. 在应用入口导入并调用 initEncryption()
 */

import request from '@src/service/request'
import { getEnv } from '@utils/env'

// RSA 公钥（用于加密，可以公开）
const RSA_PUBLIC_KEY =
  getEnv('REACT_APP_RSA_PUBLIC_KEY') ||
  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0BDRgoeZCRRvH/QLbGhe
M6ecmHUzm4ofqRgBPl1yThEryOQ8gGjmr16Xlj7cAedZz0vqvUsWnZh5KMZ5b5vQ
Y4HGhPfPL3CzlI+iL0JyfFN9DsIe7uSDsStBfbLQas+IYIu47RMW9YNAmS8QFmqn
4Gpw6S1t3H+1AfwQpAGxXHm3+2mTClkautPOAqmTkAzM5eLIisOI/RE4YZiHRl49
l+yUAmpAqRw0WnvqRlw76ES6naSBxHM7iQeAlo8R5YqheD2kNzJbEcJ7Owd4Rcfo
kKZxSh7Qy/Pre8QFvIKdsCu4hpIGkws86s1IHvFLCXsXUxPR5z3E69VuW6K6rkXT
lwIDAQAB
-----END PUBLIC KEY-----`

// RSA 私钥必须保存在服务端，不要放入前端 bundle.

// ==================== 加密模式配置 ====================

/**
 * 加密模式选择
 * - 'none': 不加密（开发环境推荐）
 * - 'rsa': RSA 非对称加密（高安全性）
 * - 'hybrid': 混合加密（推荐生产环境）
 */
const ENCRYPTION_MODE = getEnv('REACT_APP_ENCRYPTION_MODE', 'none')

// ==================== 初始化函数 ====================

/**
 * 初始化接口加密
 * 在应用启动时调用
 */
export const initEncryption = () => {
  switch (ENCRYPTION_MODE) {
    case 'aes':
      throw new Error('固定 AES 密钥不能作为浏览器端秘密；请改用服务端密钥方案或 RSA/hybrid 示例')

    case 'rsa':
      request.configureRSA(RSA_PUBLIC_KEY)
      console.log('✅ RSA 加密已启用')
      break

    case 'hybrid':
      request.configureHybrid(RSA_PUBLIC_KEY)
      console.log('✅ 混合加密已启用')
      break

    case 'none':
    default:
      console.log('ℹ️ 接口加密未启用')
      break
  }

  // 打印加密配置（仅开发环境）
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 加密配置:', request.getEncryptionConfig())
  }
}

/**
 * 从服务器动态获取加密配置
 * 推荐在生产环境使用
 */
export const initEncryptionFromServer = async () => {
  try {
    // 从后端获取加密配置
    const config = await request.get(
      '/api/crypto/config',
      {},
      {
        encrypt: false, // 获取配置时不能加密
        showError: false,
      }
    )

    if (!config || !config.enabled) {
      console.log('ℹ️ 服务器未启用加密')
      return
    }

    switch (config.mode) {
      case 'AES':
        throw new Error('不要把服务端 AES 密钥返回给浏览器；请改用 RSA/hybrid 或 TLS')

      case 'RSA':
        request.configureRSA(config.publicKey)
        break

      case 'HYBRID':
        request.configureHybrid(config.publicKey)
        break
    }

    console.log('✅ 加密配置已从服务器同步')
    console.log('📊 加密模式:', config.mode)
  } catch (error) {
    console.error('❌ 获取加密配置失败:', error)
    // 降级到本地配置
    initEncryption()
  }
}

/**
 * 环境相关配置
 */
export const encryptionConfig = {
  // 开发环境配置
  development: {
    enabled: false,
    mode: 'none',
  },

  // 测试环境配置
  staging: {
    enabled: false,
    mode: 'none',
  },

  // 生产环境配置
  production: {
    enabled: true,
    mode: 'hybrid',
    // 密钥从环境变量或服务器获取
    dynamicKey: true,
  },
}

/**
 * 根据环境自动配置
 */
export const initEncryptionByEnv = async () => {
  const env = process.env.NODE_ENV || 'development'
  const config = encryptionConfig[env]

  if (!config || !config.enabled) {
    console.log(`ℹ️ ${env} 环境：加密未启用`)
    return
  }

  if (config.dynamicKey) {
    // 从服务器获取
    await initEncryptionFromServer()
  } else {
    // 使用本地配置
    initEncryption()
  }
}

// ==================== 工具函数 ====================

/**
 * 临时禁用加密（调试用）
 */
export const disableEncryption = () => {
  request.disableEncryption()
  console.log('⚠️ 加密已临时禁用')
}

/**
 * 重新启用加密
 */
export const enableEncryption = () => {
  request.enableEncryption()
  console.log('✅ 加密已重新启用')
}

/**
 * 获取当前加密状态
 */
export const getEncryptionStatus = () => {
  return request.getEncryptionConfig()
}

// ==================== 导出 ====================
export default {
  initEncryption,
  initEncryptionFromServer,
  initEncryptionByEnv,
  disableEncryption,
  enableEncryption,
  getEncryptionStatus,
}
