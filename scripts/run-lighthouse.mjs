import { spawnSync } from 'node:child_process'

const toInt = (v) => {
  const n = Number.parseInt(String(v), 10)
  return Number.isFinite(n) ? n : null
}

const buildPortList = () => {
  const raw = process.env.LH_PORTS
  if (raw && raw.trim()) {
    // supports: "8080,8081,8090" or "8080-8090"
    const parts = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const ports = []
    for (const part of parts) {
      const range = part.split('-').map((s) => s.trim())
      if (range.length === 2) {
        const start = toInt(range[0])
        const end = toInt(range[1])
        if (start != null && end != null && start > 0 && end >= start) {
          for (let p = start; p <= end; p += 1) ports.push(p)
          continue
        }
      }
      const single = toInt(part)
      if (single != null && single > 0) ports.push(single)
    }
    if (ports.length > 0) return [...new Set(ports)]
  }

  // Check the Vite dev port first, followed by the optional MFE dev-server ports.
  const ports = []
  for (let p = 5173; p <= 5183; p += 1) ports.push(p)
  for (let p = 8080; p <= 8090; p += 1) ports.push(p)
  return ports
}

const timeoutMs = (() => {
  const v = toInt(process.env.LH_TIMEOUT)
  return v != null && v > 0 ? v : 1500
})()

const fetchOk = async (url) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        // Some dev servers behave differently for default fetch UA.
        'User-Agent': 'wui-react-lighthouse-probe',
      },
    })
    if (!res.ok) return false
    const text = await res.text()
    // heuristic: index.html should look like an HTML doc
    return /<html[\s>]/i.test(text) && /<head[\s>]/i.test(text)
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}

const main = async () => {
  const explicitUrl = process.env.LH_URL || process.argv[2]
  if (explicitUrl) {
    const ok = await fetchOk(explicitUrl)
    if (!ok) {
      console.error(`[lighthouse] URL 不可用: ${explicitUrl}`)
      console.error('[lighthouse] 请先启动服务，或改用正确端口：')
      console.error('  cross-env LH_URL=http://localhost:8080 npm run lighthouse')
      process.exit(1)
    }
    runLighthouse(explicitUrl)
    return
  }

  const ports = buildPortList()
  for (const port of ports) {
    const url = `http://localhost:${port}`
    // eslint-disable-next-line no-await-in-loop
    const ok = await fetchOk(url)
    if (ok) {
      runLighthouse(url)
      return
    }
  }

  console.error('[lighthouse] 未发现可用的本地服务。')
  console.error('[lighthouse] 你可能还没启动 dev server，或端口不在扫描范围内。')
  console.error('  1) 先运行: pnpm run dev  (Vite dev server，默认端口 5173)')
  console.error('  2) 再运行: npm run lighthouse')
  console.error('  或者显式指定 URL:')
  console.error('     cross-env LH_URL=http://localhost:8081 npm run lighthouse')
  console.error('  或者指定端口范围:')
  console.error('     cross-env LH_PORTS=8080-8100 npm run lighthouse')
  process.exit(1)
}

const runLighthouse = (url) => {
  console.log(`[lighthouse] Running against: ${url}`)

  const args = ['--view', url, '--preset=desktop']
  const result = spawnSync('lighthouse', args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  process.exit(result.status ?? 1)
}

await main()
