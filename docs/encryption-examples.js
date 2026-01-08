/**
 * ========================================
 * 接口加密配置示例 (支持 Request.js 和 Http.js)
 * ========================================
 *
 * 本文件包含常见的使用示例，可以直接复制到项目中使用
 */

import request from '@src/service/request'
import http, { encryptionConfig as httpEncryption } from '@src/service/http'

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

const RSA_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
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

export const setupEncryptionHybrid = () => {
  // 混合加密（RSA + AES，推荐生产环境使用）

  // Request.js 配置
  request.configureHybrid(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY)

  // Http.js 配置
  httpEncryption.configureHybrid(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY)

  console.log('✅ 混合加密已启用')
}

// ========================================
// 示例 3: 从环境变量配置
// ========================================

export const setupEncryptionFromEnv = () => {
  const mode = import.meta.env.VITE_ENCRYPTION_MODE || 'none'

  switch (mode) {
    case 'aes':
      const aesKey = import.meta.env.VITE_AES_KEY
      if (aesKey) {
        request.configureAES(aesKey)
        httpEncryption.configureAES(aesKey)
        console.log('✅ AES 加密已启用（环境变量）')
      }
      break

    case 'rsa':
      const publicKey = import.meta.env.VITE_RSA_PUBLIC_KEY
      const privateKey = import.meta.env.VITE_RSA_PRIVATE_KEY
      if (publicKey) {
        request.configureRSA(publicKey, privateKey)
        httpEncryption.configureRSA(publicKey, privateKey)
        console.log('✅ RSA 加密已启用（环境变量）')
      }
      break

    case 'hybrid':
      const hybridPublic = import.meta.env.VITE_RSA_PUBLIC_KEY
      const hybridPrivate = import.meta.env.VITE_RSA_PRIVATE_KEY
      if (hybridPublic) {
        request.configureHybrid(hybridPublic, hybridPrivate)
        httpEncryption.configureHybrid(hybridPublic, hybridPrivate)
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

    // 根据服务器配置初始化
    switch (config.mode) {
      case 'AES':
        // 注意：生产环境 AES 密钥应通过安全方式交换
        request.configureAES(config.key)
        httpEncryption.configureAES(config.key)
        break

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
    password,
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
    phone: userData.phone,
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
    address: profile.address,
  })
}

/**
 * 支付接口 - 卡号等敏感信息自动加密 (特定字段加密)
 */
export const createPaymentAPI = async (paymentData) => {
  return request.post(
    '/api/payment/create',
    {
      amount: paymentData.amount,
      cardNumber: paymentData.cardNumber,
      cvv: paymentData.cvv,
      expiryDate: paymentData.expiryDate,
    },
    {
      // 仅加密敏感字段，amount 保持明文
      encryptFields: ['cardNumber', 'cvv', 'expiryDate'],
    }
  )
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
    type: 'admin',
  })
}

/**
 * GET 请求部分字段加密
 * URL 示例: /api/users/search?q=...&idCard=encrypted_string...
 */
export const searchSensitiveUserAPI = async (name, idCard) => {
  return request.get(
    '/api/users/search',
    {
      q: name,
      idCard: idCard,
    },
    {
      encryptFields: ['idCard'], // 仅加密身份证号
    }
  )
}

/**
 * 获取公开数据 - 不需要加密
 */
export const getPublicDataAPI = async () => {
  // Request.js
  request.get(
    '/api/public/data',
    {},
    {
      encrypt: false, // 禁用加密
    }
  )

  // Http.js
  http.get(
    '/api/public/data',
    {},
    {
      encrypt: false,
    }
  )
}

/**
 * 获取加密密钥 - 不能加密
 */
export const getPublicKeyAPI = async () => {
  return request.get(
    '/api/crypto/public-key',
    {},
    {
      encrypt: false, // 获取密钥时不能加密
    }
  )
}

/**
 * 混合使用 - 部分接口加密，部分不加密
 */
export const mixedAPI = async () => {
  // 获取公钥（不加密）
  const { publicKey } = await request.get(
    '/api/crypto/public-key',
    {},
    {
      encrypt: false,
    }
  )

  // 配置加密
  request.configureRSA(publicKey)
  httpEncryption.configureRSA(publicKey)

  // 之后的请求自动加密
  const userData = await request.post('/api/user/data', {
    sensitive: 'data',
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
  request.configureHybrid(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY)
  httpEncryption.configureHybrid(RSA_PUBLIC_KEY, RSA_PRIVATE_KEY)

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
      secret: 'data',
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
  const isDev = import.meta.env.DEV
  const isProd = import.meta.env.PROD

  if (isDev) {
    // 开发环境：不加密或使用简单密钥
    console.log('🔧 开发环境：加密已禁用')
    request.disableEncryption()
    httpEncryption.disable()
  } else if (isProd) {
    // 生产环境：使用强加密
    const publicKey = import.meta.env.VITE_RSA_PUBLIC_KEY
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
