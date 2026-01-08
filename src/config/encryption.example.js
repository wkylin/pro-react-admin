/**
 * 接口加密配置示例
 *
 * 使用方法：
 * 1. 复制此文件并重命名为 encryption.js
 * 2. 配置你的密钥
 * 3. 在应用入口导入并调用 initEncryption()
 */

import request from '@src/service/request'

// ==================== 密钥配置 ====================

// AES 密钥（16/24/32 字符，实际项目请使用环境变量）
const AES_KEY = import.meta.env.VITE_AES_KEY || 'default-aes-key!'

// RSA 公钥（用于加密，可以公开）
const RSA_PUBLIC_KEY =
  import.meta.env.VITE_RSA_PUBLIC_KEY ||
  `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0BDRgoeZCRRvH/QLbGhe
M6ecmHUzm4ofqRgBPl1yThEryOQ8gGjmr16Xlj7cAedZz0vqvUsWnZh5KMZ5b5vQ
Y4HGhPfPL3CzlI+iL0JyfFN9DsIe7uSDsStBfbLQas+IYIu47RMW9YNAmS8QFmqn
4Gpw6S1t3H+1AfwQpAGxXHm3+2mTClkautPOAqmTkAzM5eLIisOI/RE4YZiHRl49
l+yUAmpAqRw0WnvqRlw76ES6naSBxHM7iQeAlo8R5YqheD2kNzJbEcJ7Owd4Rcfo
kKZxSh7Qy/Pre8QFvIKdsCu4hpIGkws86s1IHvFLCXsXUxPR5z3E69VuW6K6rkXT
lwIDAQAB
-----END PUBLIC KEY-----`

// RSA 私钥（用于解密，绝不能暴露！实际项目不应在前端使用）
const RSA_PRIVATE_KEY =
  import.meta.env.VITE_RSA_PRIVATE_KEY ||
  `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQENGCh5kJFG8f
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
v4U73TKOI+a1xxr6ZMQ4vzwt
-----END PRIVATE KEY-----`

// ==================== 加密模式配置 ====================

/**
 * 加密模式选择
 * - 'none': 不加密（开发环境推荐）
 * - 'aes': AES 对称加密（高性能）
 * - 'rsa': RSA 非对称加密（高安全性）
 * - 'hybrid': 混合加密（推荐生产环境）
 */
const ENCRYPTION_MODE = import.meta.env.VITE_ENCRYPTION_MODE || 'none'

// ==================== 初始化函数 ====================

/**
 * 初始化接口加密
 * 在应用启动时调用
 */
export const initEncryption = () => {
  switch (ENCRYPTION_MODE) {
    case 'aes':
      request.configureAES(AES_KEY)
      console.log('✅ AES 加密已启用')
      break

    case 'rsa':
      request.configureRSA(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY)
      console.log('✅ RSA 加密已启用')
      break

    case 'hybrid':
      request.configureHybrid(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY)
      console.log('✅ 混合加密已启用')
      break

    case 'none':
    default:
      console.log('ℹ️ 接口加密未启用')
      break
  }

  // 打印加密配置（仅开发环境）
  if (import.meta.env.DEV) {
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
        // 注意：实际项目中 AES 密钥应该通过安全方式交换
        request.configureAES(config.key)
        break

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
    enabled: true,
    mode: 'aes',
    key: 'test-aes-key-16',
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
  const env = import.meta.env.MODE || 'development'
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
