import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'

function getProject() {
  const raw = (process.env.PROJECT || 'default').toString().trim()
  return raw || 'default'
}

function getDistDir() {
  const project = getProject()
  return project === 'default' ? 'dist' : `dist-${project}`
}

function getDistAbs() {
  return path.resolve(process.cwd(), getDistDir())
}

function parseArgs(argv) {
  const args = argv.slice(2)
  const cmd = args[0]
  const rest = args.slice(1)

  const ddIndex = rest.indexOf('--')
  const passThrough = ddIndex >= 0 ? rest.slice(ddIndex + 1) : []
  const opts = ddIndex >= 0 ? rest.slice(0, ddIndex) : rest

  return { cmd, opts, passThrough }
}

function run(bin, args) {
  const result = spawnSync(bin, args, {
    stdio: 'inherit',
    // On Windows, CLIs like "http-server" / "serve" are often .cmd shims.
    // spawnSync with shell:false can fail with EINVAL in some environments (e.g. Git Bash).
    shell: process.platform === 'win32',
    env: process.env,
  })

  if (result.error) {
    if (result.error.code === 'ENOENT') return { ok: false, code: 127 }
    throw result.error
  }

  return { ok: result.status === 0, code: result.status ?? 1 }
}

function tryRun(bins, argsBuilder) {
  for (const bin of bins) {
    const args = argsBuilder(bin)
    const r = run(bin, args)
    if (r.ok) return r
  }
  return { ok: false, code: 1 }
}

async function main() {
  const { cmd, opts, passThrough } = parseArgs(process.argv)
  const project = getProject()
  const distDir = getDistDir()
  const distAbs = getDistAbs()

  if (!cmd || ['help', '-h', '--help'].includes(cmd)) {
    // eslint-disable-next-line no-console
    console.log(
      [
        'Usage: node scripts/dist-tools.mjs <clean|serve|http> [options] [-- pass-through-args]',
        '',
        `PROJECT=${project}`,
        `distDir=${distDir}`,
        '',
        'Examples:',
        '  PROJECT=projectA node scripts/dist-tools.mjs clean',
        '  PROJECT=projectA node scripts/dist-tools.mjs serve --port 5000',
        '  PROJECT=projectA node scripts/dist-tools.mjs http -- -p 9090 --cors',
      ].join('\n')
    )
    process.exit(0)
  }

  if (cmd === 'clean') {
    if (fs.existsSync(distAbs)) {
      await fs.promises.rm(distAbs, { recursive: true, force: true })
      // eslint-disable-next-line no-console
      console.log(`[dist-tools] removed ${distDir}`)
    } else {
      // eslint-disable-next-line no-console
      console.log(`[dist-tools] skip (not exists): ${distDir}`)
    }
    return
  }

  if (cmd === 'serve') {
    const portFlagIndex = opts.indexOf('--port')
    const port = portFlagIndex >= 0 ? opts[portFlagIndex + 1] : '5000'

    const bins = process.platform === 'win32' ? ['serve.cmd', 'serve', 'npx.cmd', 'npx'] : ['serve', 'npx']

    const r = tryRun(bins, (bin) => {
      if (bin.startsWith('npx')) {
        return ['--yes', 'serve', '-s', distDir, '-l', port]
      }
      return ['-s', distDir, '-l', port]
    })

    process.exit(r.code)
  }

  if (cmd === 'http') {
    const bins =
      process.platform === 'win32' ? ['http-server.cmd', 'http-server', 'npx.cmd', 'npx'] : ['http-server', 'npx']

    const r = tryRun(bins, (bin) => {
      if (bin.startsWith('npx')) {
        return ['--yes', 'http-server', distDir, ...passThrough]
      }
      return [distDir, ...passThrough]
    })

    process.exit(r.code)
  }

  throw new Error(`Unknown command: ${cmd}`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[dist-tools] failed:', err)
  process.exit(1)
})
