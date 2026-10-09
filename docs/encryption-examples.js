/**
 * ========================================
 * 接口加密配置示例 (支持 Request.js 和 Http.js)
 * ========================================
 *
 * 本文件包含常见的使用示例，可以直接复制到项目中使用
 * 安全提示：浏览器里的固定 AES key 可被用户读取；本文件中的固定 key 只用于 API 演示，不提供密钥保密能力。
 */

import request from '@src/service/request'
import http, { encryptionConfig as httpEncryption } from '@src/service/http'
import { getEnv } from '@utils/env'

// ========================================
// 示例 1: 基础配置（应用入口）
// ========================================

/**
 * 在 src/index.tsx 或 src/main.tsx 中配置
 */
export const setupEncryptionBasic = () => {
  // AES 密钥 (16/24/32位)
  const AES_KEY = '1234567890123456'

  // 1. 配置 axios 客户端 (Request.js)
  request.configureAES(AES_KEY)

  // 2. 配置 fetch 客户端 (Http.js)
  // 注意：Http.js 不提供实例方法，需直接操作配置对象
  httpEncryption.configureAES(AES_KEY)

  console.log('✅ AES 加密已启用 (Axios & Fetch)')
}

// ========================================
// 示例 2: 混合加密配置（推荐）
// ========================================

const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0BDRgoeZCRRvH/QLbGhe
M6ecmHUzm4ofqRgBPl1yThEryOQ8gGjmr16Xlj7cAedZz0vqvUsWnZh5KMZ5b5vQ
Y4HGhPfPL3CzlI+iL0JyfFN9DsIe7uSDsStBfbLQas+IYIu47RMW9YNAmS8QFmqn
4Gpw6S1t3H+1AfwQpAGxXHm3+2mTClkautPOAqmTkAzM5eLIisOI/RE4YZiHRl49
l+yUAmpAqRw0WnvqRlw76ES6naSBxHM7iQeAlo8R5YqheD2kNzJbEcJ7Owd4Rcfo
kKZxSh7Qy/Pre8QFvIKdsCu4hpIGkws86s1IHvFLCXsXUxPR5z3E69VuW6K6rkXT
lwIDAQAB
-----END PUBLIC KEY-----`


export const setupEncryptionHybrid = () => {
  // 混合加密（RSA + AES，推荐生产环境使用）

  // Request.js 配置
  request.configureHybrid(RSA_PUBLIC_KEY)

  // Http.js 配置
  httpEncryption.configureHybrid(RSA_PUBLIC_KEY)

  console.log('✅ 混合加密已启用')
}

// ========================================
// 示例 3: 从环境变量配置
// ========================================

export const setupEncryptionFromEnv = () => {
  const mode = getEnv('REACT_APP_ENCRYPTION_MODE', 'none')

  switch (mode) {
    case 'aes':
      throw new Error('不要从浏览器环境变量读取固定 AES key；请使用服务器公钥或 TLS')

    case 'rsa':
      const publicKey = getEnv('REACT_APP_RSA_PUBLIC_KEY')
      if (publicKey) {
        request.configureRSA(publicKey)
        httpEncryption.configureRSA(publicKey)
        console.log('✅ RSA 加密已启用（环境变量）')
      }
      break

    case 'hybrid':
      const hybridPublic = getEnv('REACT_APP_RSA_PUBLIC_KEY')
      if (hybridPublic) {
        request.configureHybrid(hybridPublic)
        httpEncryption.configureHybrid(hybridPublic)
        console.log('✅ 混合加密已启用（环境变量）')
      }
      break

    default:
      console.log('ℹ️ 加密未启用')
  }
}

// ========================================
// 示例 4: 从服务器获取配置
// ========================================

export const setupEncryptionFromServer = async () => {
  try {
    // 获取服务器的加密配置
    const config = await request.get('/api/crypto/config', {}, {
      encrypt: false,  // 获取配置时不能加密
      showError: false
    })

    if (!config || !config.enabled) {
      console.log('ℹ️ 服务器未启用加密')
      return
    }

    // 根据服务器配置初始化
    switch (config.mode) {
      case 'AES':
        throw new Error('不要把服务端 AES key 返回给浏览器')

      case 'RSA':
        request.configureRSA(config.publicKey)
        httpEncryption.configureRSA(config.publicKey)
        break

      case 'HYBRID':
        request.configureHybrid(config.publicKey)
        httpEncryption.configureHybrid(config.publicKey)
        break
    }

    console.log('✅ 加密配置已从服务器同步')
  } catch (error) {
    console.error('❌ 获取加密配置失败:', error)
  }
}

// ========================================
// 示例 5: 业务接口（自动加密）
// ========================================

/**
 * 登录接口 - 用户名和密码会自动加密
 */
export const loginAPI = async (username, password) => {
  // 使用 request (axios)
  return request.post('/api/auth/login', {
    username,
    password
  })

  // 或者使用 http (fetch)
  // return http.post('/api/auth/login', {
  //   username,
  //   password
  // })
}

/**
 * 用户注册 - 敏感信息自动加密
 */
export const registerAPI = async (userData) => {
  return request.post('/api/auth/register', {
    username: userData.username,
    password: userData.password,
    email: userData.email,
    phone: userData.phone
  })
}

/**
 * 更新个人信息 - 身份证等信息自动加密
 */
export const updateProfileAPI = async (profile) => {
  return request.put('/api/user/profile', {
    name: profile.name,
    idCard: profile.idCard,
    phone: profile.phone,
    address: profile.address
  })
}

/**
 * 支付接口 - 卡号等敏感信息自动加密 (特定字段加密)
 */
export const createPaymentAPI = async (paymentData) => {
  return request.post('/api/payment/create', {
    amount: paymentData.amount,
    cardNumber: paymentData.cardNumber,
    cvv: paymentData.cvv,
    expiryDate: paymentData.expiryDate
  }, {
    // 仅加密敏感字段，amount 保持明文
    encryptFields: ['cardNumber', 'cvv', 'expiryDate']
  })
}

// ========================================
// 示例 6: 单个请求控制加密与 GET 请求加密
// ========================================

/**
 * GET 请求参数加密
 * 如果启用了加密，params 参数会自动被加密传输
 * URL 示例: /api/search?encrypted=...
 */
export const searchUserAPI = async (keyword) => {
  return request.get('/api/users/search', {
    q: keyword,
    type: 'admin'
  })
}

/**
 * GET 请求部分字段加密
 * URL 示例: /api/users/search?q=...&idCard=encrypted_string...
 */
export const searchSensitiveUserAPI = async (name, idCard) => {
  return request.get('/api/users/search', {
    q: name,
    idCard: idCard
  }, {
    encryptFields: ['idCard'] // 仅加密身份证号
  })
}

/**
 * 获取公开数据 - 不需要加密
 */
export const getPublicDataAPI = async () => {
  // Request.js
  request.get('/api/public/data', {}, {
    encrypt: false  // 禁用加密
  })

  // Http.js
  http.get('/api/public/data', {}, {
    encrypt: false
  })
}

/**
 * 获取加密密钥 - 不能加密
 */
export const getPublicKeyAPI = async () => {
  return request.get('/api/crypto/public-key', {}, {
    encrypt: false  // 获取密钥时不能加密
  })
}

/**
 * 混合使用 - 部分接口加密，部分不加密
 */
export const mixedAPI = async () => {
  // 获取公钥（不加密）
  const { publicKey } = await request.get('/api/crypto/public-key', {}, {
    encrypt: false
  })

  // 配置加密
  request.configureRSA(publicKey)
  httpEncryption.configureRSA(publicKey)

  // 之后的请求自动加密
  const userData = await request.post('/api/user/data', {
    sensitive: 'data'
  })

  return userData
}

// ========================================
// 示例 7: 动态切换加密模式
// ========================================

export const dynamicEncryption = async () => {
  // 初始使用 AES
  request.configureAES('initial-key-16!')
  httpEncryption.configureAES('initial-key-16!')

  // 发送一些请求...
  await request.post('/api/data1', { test: 1 })

  // 切换到混合加密
  request.configureHybrid(RSA_PUBLIC_KEY)
  httpEncryption.configureHybrid(RSA_PUBLIC_KEY)

  // 发送更多请求...
  await request.post('/api/data2', { test: 2 })

  // 临时禁用加密
  request.disableEncryption()
  httpEncryption.disable()

  // 发送不加密的请求...
  await request.get('/api/public')

  // 重新启用
  request.enableEncryption()
  httpEncryption.enabled = true
}

// ========================================
// 示例 8: 错误处理
// ========================================

export const encryptionWithErrorHandling = async () => {
  try {
    // 配置加密
    request.configureAES('1234567890123456')
    httpEncryption.configureAES('1234567890123456')

    // 发送请求
    const data = await request.post('/api/sensitive', {
      secret: 'data'
    })

    return data
  } catch (error) {
    if (error.message.includes('加密失败')) {
      console.error('加密错误:', error)
      // 降级到不加密
      request.disableEncryption()
      httpEncryption.disable()
    } else if (error.message.includes('解密失败')) {
      console.error('解密错误:', error)
      // 可能是密钥错误
    } else {
      console.error('请求错误:', error)
    }
    throw error
  }
}

// ========================================
// 示例 9: 开发环境 vs 生产环境
// ========================================

export const setupEncryptionByEnvironment = () => {
  const isDev = getEnv('NODE_ENV') === 'development'
  const isProd = getEnv('NODE_ENV') === 'production'

  if (isDev) {
    // 开发环境：不加密或使用简单密钥
    console.log('🔧 开发环境：加密已禁用')
    request.disableEncryption()
    httpEncryption.disable()
  } else if (isProd) {
    // 生产环境：使用强加密
    const publicKey = getEnv('REACT_APP_RSA_PUBLIC_KEY')
    if (publicKey) {
      request.configureHybrid(publicKey)
      httpEncryption.configureHybrid(publicKey)
      console.log('🔒 生产环境：混合加密已启用')
    }
  }
}

// ========================================
// 示例 10: 调试和监控
// ========================================

export const debugEncryption = () => {
  // 获取当前加密配置
  console.log('Request Config:', request.getEncryptionConfig())
  console.log('Http Config:', httpEncryption)

  // 临时禁用加密进行调试
  console.log('🔓 禁用加密...')
  request.disableEncryption()
  httpEncryption.disable()

  // 执行一些测试请求...
  // ...

  // 重新启用
  console.log('🔒 重新启用加密...')
  request.enableEncryption()
  httpEncryption.enabled = true
}

// ========================================
// 导出所有示例
// ========================================

export default {
  // 配置方法
  setupEncryptionBasic,
  setupEncryptionHybrid,
  setupEncryptionFromEnv,
  setupEncryptionFromServer,
  setupEncryptionByEnvironment,

  // 业务接口示例
  loginAPI,
  registerAPI,
  updateProfileAPI,
  createPaymentAPI,
  getPublicDataAPI,
  getPublicKeyAPI,
  mixedAPI,

  // 高级用法
  dynamicEncryption,
  encryptionWithErrorHandling,
  debugEncryption,
}

/**
 * ========================================
 * 在应用入口使用（推荐）
 * ========================================
 *
 * // src/index.tsx 或 src/main.tsx
 *
 * import { setupEncryptionHybrid } from './utils/encryption-examples' // 假设你复制到了 src/utils 目录
 *
 * // 应用启动时初始化
 * setupEncryptionHybrid()
 *
 * // 然后正常渲染应用
 * ReactDOM.createRoot(document.getElementById('root')).render(<App />)
 */
