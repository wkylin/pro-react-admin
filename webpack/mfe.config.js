/**
 * Module Federation Remote Projects Configuration
 *
 * 在这里配置所有的远程项目，支持动态扩展
 */

/**
 * @typedef {Object} RemoteProject
 * @property {string} name - 项目名称，必须唯一
 * @property {string} devUrl - 开发环境的远程入口地址
 * @property {string} prodPath - 生产环境的相对路径（基于 PUBLIC_URL）
 * @property {string} [envKey] - 可选的环境变量键名，用于覆盖 devUrl
 */

/**
 * @type {RemoteProject[]}
 */
export const remoteProjects = [
  {
    name: 'projectA',
    devUrl: 'http://localhost:8081/remoteEntry.js',
    prodPath: '/projectA/remoteEntry.js',
    envKey: 'MFE_PROJECTA_URL', // 允许通过 process.env.MFE_PROJECTA_URL 覆盖
  },
  {
    name: 'projectB',
    devUrl: 'http://localhost:8082/remoteEntry.js',
    prodPath: '/projectB/remoteEntry.js',
    envKey: 'MFE_PROJECTB_URL',
  },
  // 添加更多远程项目:
  // {
  //   name: 'projectC',
  //   devUrl: 'http://localhost:8083/remoteEntry.js',
  //   prodPath: '/projectC/remoteEntry.js',
  //   envKey: 'MFE_PROJECTC_URL',
  // },
]

/**
 * 根据配置和当前环境生成 Module Federation 的 remotes 配置
 * @param {boolean} isDev - 是否为开发环境
 * @returns {Record<string, string>} remotes 配置对象
 *
 * 生产环境支持两种模式：
 * 1. 相对路径（同域部署）：prodPath = '/projectA/remoteEntry.js'
 * 2. 完整 URL（独立部署）：通过 MFE_PROJECTA_URL 环境变量指定
 *
 * 推荐方案：独立 Vercel 项目 + 完整 URL，避免子路径 routing 问题
 */
export function generateRemotesConfig(isDev = false) {
  const remotes = {}

  // 支持通过环境变量覆盖并添加/替换远程项目
  const projects = parseRemotesFromEnv()

  // helper: 与 webpack.common.js 中 toMfeName 行为保持一致
  const toSafeName = (name) => {
    const raw = (name || '').toString().trim() || 'app'
    const safe = raw.replace(/[^a-zA-Z0-9_]/g, '_')
    return /^[0-9]/.test(safe) ? `app_${safe}` : safe
  }

  projects.forEach((project) => {
    let url

    if (project.envKey && process.env[project.envKey]) {
      url = process.env[project.envKey].toString().trim()
    } else {
      url = isDev ? project.devUrl : project.prodPath
    }

    const rawName = project.name
    const safeName = toSafeName(rawName)

    // 尝试多种 window 全局名（rawName / safeName），以兼容不同构建时的 container 名称
    const promiseCode = `promise new Promise((resolve, reject) => {
      try {
        if (typeof window['${rawName}'] !== 'undefined') return resolve(window['${rawName}'])
        if (typeof window['${safeName}'] !== 'undefined') return resolve(window['${safeName}'])
        const script = document.createElement('script')
        script.src = '${url}'
        script.async = true
        script.onload = () => {
          if (typeof window['${rawName}'] !== 'undefined') return resolve(window['${rawName}'])
          if (typeof window['${safeName}'] !== 'undefined') return resolve(window['${safeName}'])
          reject(new Error('Container ${rawName} not found on window after loading script'))
        }
        script.onerror = () => reject(new Error('Failed to load remote entry: ${url}'))
        document.head.appendChild(script)
      } catch (err) {
        reject(err)
      }
    })`

    remotes[rawName] = promiseCode
  })

  return remotes
}

/**
 * 从环境变量中动态解析远程项目配置
 * 支持格式: MFE_REMOTES=projectA@http://localhost:8081,projectB@http://localhost:8082
 * @returns {RemoteProject[]} 解析后的项目配置
 */
export function parseRemotesFromEnv() {
  const remotesEnv = process.env.MFE_REMOTES
  if (!remotesEnv) return remoteProjects

  try {
    const parsed = remotesEnv
      .split(',')
      .map((item) => {
        const [name, url] = item.trim().split('@')
        if (!name || !url) return null

        return {
          name: name.trim(),
          devUrl: url.trim(),
          prodPath: url.trim(),
        }
      })
      .filter(Boolean)

    // 合并配置：环境变量优先
    const envNames = new Set(parsed.map((p) => p.name))
    const result = [...parsed, ...remoteProjects.filter((p) => !envNames.has(p.name))]

    return result
  } catch (error) {
    console.warn('[mfe.config] Failed to parse MFE_REMOTES:', error)
    return remoteProjects
  }
}
