/* 轻量日志封装：生产环境禁用 log/warn，保留 error */
const isDev = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development'

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) console.log(...args)
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info(...args)
  },
  warn: (...args: unknown[]) => {
    if (isDev) console.warn(...args)
  },
  error: (...args: unknown[]) => {
    console.error(...args)
  },
}

export default logger
