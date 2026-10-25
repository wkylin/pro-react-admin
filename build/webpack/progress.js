import WebpackBar from 'webpackbar'

class CompactWebpackBar extends WebpackBar {
  constructor({ name, interactive }) {
    let logger
    let lastFrame = ''
    let highestProgress = 0
    const clear = () => {
      if (interactive) logger.status()
    }
    const render = (state) => {
      const progress = Math.max(highestProgress, Math.min(99, state.progress))
      highestProgress = progress
      const width = 20
      const complete = Math.floor((progress / 100) * width)
      const bar = `[${'█'.repeat(complete)}${'░'.repeat(width - complete)}]`
      const message = (state.message || 'starting').replace(/\s+/g, ' ')
      const frame = `${progress}% ${bar} ${state.name} ${message}`
      if (frame === lastFrame) return
      lastFrame = frame
      // Webpack owns cursor updates, width truncation and interleaved infrastructure logs.
      logger.status(`${progress}%`, bar, state.name, message)
    }

    super({
      name,
      reporters: [
        {
          start({ state }) {
            lastFrame = ''
            highestProgress = 0
            if (interactive) render({ ...state, progress: 0 })
            else logger.info(`Compiling ${state.name}`)
          },
          progress({ state }) {
            if (interactive && state.start && state.progress >= 0 && state.progress < 100) render(state)
          },
          done({ state }) {
            clear()
            const message = `${state.name}: ${state.message}`
            if (state.hasErrors) logger.error(message)
            else logger.info(message)
          },
          allDone: clear,
        },
      ],
    })

    this.attachLogger = (compiler) => {
      // This name lets Webpack display status text without a redundant logger prefix.
      logger = compiler.getInfrastructureLogger('webpack.Progress')
      for (const hook of ['failed', 'watchClose', 'shutdown']) {
        compiler.hooks[hook].tap('CompactWebpackBar', clear)
      }
    }
  }

  apply(compiler) {
    this.attachLogger(compiler)
    super.apply(compiler)
  }
}

export function createBuildProgress({ name = 'build', stream = process.stderr, env = process.env } = {}) {
  const isCI = Boolean(env.CI && !['false', '0'].includes(String(env.CI).toLowerCase()))
  const interactive = Boolean(stream.isTTY && env.TERM !== 'dumb' && !isCI)
  return {
    plugin: new CompactWebpackBar({ name, interactive }),
    infrastructureLogging: {
      stream,
      appendOnly: !interactive,
      // Keep progress visible when production logging is limited to errors.
      debug: /^webpack\.Progress$/,
    },
  }
}
