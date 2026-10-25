import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const reportDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'reports')
const targets = [
  ['webpack', '默认应用 / Webpack'],
  ['vite', '默认应用 / Vite'],
  ['enterprise-demo', '企业演示'],
  ['enterprise-api', '企业 API'],
  ['mfe', '微前端'],
]

function readJson(file) {
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]
  })
}

function percent(metric) {
  return metric && Number.isFinite(metric.pct) ? `${metric.pct.toFixed(1)}%` : '—'
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }) : '—'
}

const unit = readJson(path.join(reportDir, 'unit/summary.json'))
const coverage = unit?.coverageEnabled
  ? readJson(path.join(reportDir, 'unit/coverage/coverage-summary.json'))?.total
  : null
const coverageHtml = fs.existsSync(path.join(reportDir, 'unit/coverage/lcov-report/index.html'))
const browsers = targets.map(([id, title]) => {
  const result = readJson(path.join(reportDir, 'e2e', id, 'results.json'))
  const htmlExists = fs.existsSync(path.join(reportDir, 'e2e', id, 'html/index.html'))
  return { id, title, stats: result?.stats || null, htmlExists }
})

const e2eRows = browsers
  .map(({ id, title, stats, htmlExists }) => {
    const onlySkipped = stats && !stats.expected && !stats.unexpected && !stats.flaky && stats.skipped > 0
    const counts = onlySkipped
      ? `未执行 · ${stats.skipped} 跳过`
      : stats
        ? `<span class="passed">${stats.expected ?? 0} 通过</span> · <span class="failed">${stats.unexpected ?? 0} 失败</span> · ${stats.flaky ?? 0} 不稳定 · ${stats.skipped ?? 0} 跳过`
        : '尚无结果'
    const link = stats && htmlExists ? `<a href="e2e/${id}/html/index.html">查看结果与 trace</a>` : '—'
    return `<tr><th scope="row">${escapeHtml(title)}</th><td data-label="结果">${counts}</td><td data-label="时间">${escapeHtml(formatDate(stats?.startTime))}</td><td data-label="报告">${link}</td></tr>`
  })
  .join('')

const unitStatus = unit
  ? `<span class="${unit.success ? 'passed' : 'failed'}">${unit.success ? '通过' : '失败'}</span> · ${unit.stats.passed} 通过 · ${unit.stats.failed} 失败 · ${unit.stats.skipped} 跳过`
  : '尚无结果'
const coverageRows = coverage
  ? `
    <div><strong>${percent(coverage.lines)}</strong><span>行</span></div>
    <div><strong>${percent(coverage.statements)}</strong><span>语句</span></div>
    <div><strong>${percent(coverage.branches)}</strong><span>分支</span></div>
    <div><strong>${percent(coverage.functions)}</strong><span>函数</span></div>`
  : '<p>运行 <code>pnpm run test:coverage</code> 后显示本次单测的代码覆盖率。</p>'

const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>项目测试报告</title>
<style>
  :root { color-scheme: light; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #18212c; background: #f7f9fa; }
  * { box-sizing: border-box; } body { margin: 0; } main { max-width: 1100px; margin: auto; padding: 32px 20px 64px; }
  header { border-bottom: 1px solid #d7dfe3; padding-bottom: 22px; } h1 { font-size: 28px; margin: 0 0 8px; } h2 { font-size: 20px; margin: 0 0 14px; }
  p { color: #56646c; margin: 0; } a { color: #086e82; text-decoration: none; font-weight: 600; } a:hover { text-decoration: underline; }
  section { padding: 28px 0; border-bottom: 1px solid #d7dfe3; } .section-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 10px 20px; margin-bottom: 16px; }
  .section-head h2 { margin: 0; } .section-head span { color: #56646c; font-size: 13px; }
  .result-line { display: flex; flex-wrap: wrap; gap: 10px 24px; align-items: center; }
  .coverage { display: flex; flex-wrap: wrap; gap: 16px 32px; margin-top: 20px; } .coverage div { min-width: 120px; }
  .coverage strong { display: block; font-size: 26px; line-height: 1.25; } .coverage span { color: #56646c; font-size: 13px; }
  .coverage p { font-size: 14px; } .passed { color: #177245; font-weight: 700; } .failed { color: #ae3735; font-weight: 700; }
  .table-wrap { overflow-x: auto; } table { width: 100%; min-width: 670px; border-collapse: collapse; font-size: 14px; }
  th, td { border-bottom: 1px solid #d7dfe3; padding: 14px 10px; text-align: left; vertical-align: top; }
  thead th { color: #55636b; font-size: 12px; font-weight: 600; } tbody th { font-weight: 600; }
  td:last-child { white-space: nowrap; } code { font-size: 13px; } .note { margin-top: 16px; font-size: 13px; }
  @media (max-width: 700px) {
    table { min-width: 0; } thead { display: none; } tbody, tr { display: block; }
    tr { padding: 10px 0; border-bottom: 1px solid #d7dfe3; } th, td { display: block; border: 0; padding: 5px 0; }
    tbody th { font-size: 15px; } td:last-child { white-space: normal; }
    td::before { content: attr(data-label); display: inline-block; min-width: 52px; margin-right: 8px; color: #55636b; font-size: 12px; }
  }
</style></head><body><main>
  <header><h1>测试报告</h1></header>
  <section aria-labelledby="unit-title"><div class="section-head"><h2 id="unit-title">单元测试</h2><span>${unit ? escapeHtml(formatDate(unit.generatedAt)) : ''}</span></div>
    <div class="result-line"><span>${unitStatus}</span>${unit ? '<a href="unit/index.html">查看逐项结果</a>' : ''}</div>
    <div class="coverage">${coverageRows}</div>
    ${coverage && coverageHtml ? '<p class="note"><a href="unit/coverage/lcov-report/index.html">查看逐文件覆盖率</a></p>' : ''}
  </section>
  <section aria-labelledby="e2e-title"><div class="section-head"><h2 id="e2e-title">浏览器 E2E</h2></div>
    <div class="table-wrap"><table><thead><tr><th scope="col">场景</th><th scope="col">结果</th><th scope="col">运行时间</th><th scope="col">报告</th></tr></thead><tbody>${e2eRows}</tbody></table></div>
    <p class="note">覆盖率来自 Jest 单元测试。E2E 结果包含浏览器流程与失败时的截图、trace，不计入上面的代码覆盖率。</p>
  </section>
</main></body></html>`

fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(path.join(reportDir, 'index.html'), html)
process.stdout.write(`[test-report] ${path.join(reportDir, 'index.html')}\n`)
