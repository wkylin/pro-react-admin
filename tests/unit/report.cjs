const fs = require('node:fs')
const path = require('node:path')
const { stripVTControlCharacters } = require('node:util')

const stripAnsi = (value) => stripVTControlCharacters(String(value || ''))
const escapeHtml = (value) =>
  stripAnsi(value).replace(/[&<>"']/g, (character) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]
  })
const formatDate = (value) => new Date(value).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })

function renderSuite(suite) {
  const tests = suite.tests
    .map((test) => {
      const errors = test.failureMessages.map((message) => `<pre>${escapeHtml(message)}</pre>`).join('')
      return `<li class="test ${escapeHtml(test.status)}"><span class="name">${escapeHtml(test.name)}</span><span class="status">${escapeHtml(test.status)}</span>${errors}</li>`
    })
    .join('')
  const errors = suite.errors.map((message) => `<pre>${escapeHtml(message)}</pre>`).join('')
  return `<details class="suite" ${suite.status === 'failed' ? 'open' : ''}>
    <summary><span class="name">${escapeHtml(suite.file)}</span><span class="status ${escapeHtml(suite.status)}">${escapeHtml(suite.status)}</span></summary>
    ${errors}<ol>${tests}</ol>
  </details>`
}

function renderReport(summary) {
  const { stats } = summary
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Jest 单元测试结果</title>
<style>
  :root { color-scheme: light; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #18212c; background: #f7f9fa; }
  * { box-sizing: border-box; } body { margin: 0; } main { max-width: 1100px; margin: auto; padding: 32px 20px 64px; }
  header { display: flex; flex-wrap: wrap; align-items: start; justify-content: space-between; gap: 16px; border-bottom: 1px solid #d7dfe3; padding-bottom: 22px; }
  h1 { margin: 0 0 8px; font-size: 26px; } h2 { margin: 30px 0 12px; font-size: 18px; } p { margin: 0; color: #55636b; }
  a { color: #086e82; text-decoration: none; } a:hover { text-decoration: underline; }
  .actions { display: flex; flex-wrap: wrap; gap: 14px; padding-top: 7px; }
  .metrics { display: flex; flex-wrap: wrap; gap: 24px; padding: 24px 0; border-bottom: 1px solid #d7dfe3; }
  .metric { min-width: 100px; } .metric strong { display: block; font-size: 28px; line-height: 1.2; } .metric span { color: #55636b; font-size: 13px; }
  .suite { border-bottom: 1px solid #d7dfe3; background: #fff; } .suite:first-of-type { border-top: 1px solid #d7dfe3; }
  summary { cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 50px; padding: 12px 16px; }
  .name { overflow-wrap: anywhere; } .status { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #53616a; }
  .passed { color: #177245; } .failed { color: #ae3735; } .pending, .todo, .skipped { color: #8a5b0e; }
  ol { margin: 0; padding: 0 16px 10px; list-style: none; } .test { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 16px; padding: 9px 0; border-top: 1px solid #edf0f1; font-size: 14px; }
  pre { width: 100%; margin: 8px 0 12px; padding: 12px; overflow: auto; background: #f4f6f7; color: #992f2d; white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; }
</style></head><body><main>
  <header><div><h1>Jest 单元测试</h1><p>运行时间 ${escapeHtml(formatDate(summary.generatedAt))}</p></div>
    <nav class="actions"><a href="../index.html">全部报告</a>${summary.coverageEnabled ? '<a href="coverage/lcov-report/index.html">代码覆盖率</a>' : ''}</nav></header>
  <section class="metrics" aria-label="测试统计"><div class="metric"><strong>${stats.suites}</strong><span>测试文件</span></div><div class="metric"><strong>${stats.passed}</strong><span>通过</span></div><div class="metric"><strong>${stats.failed}</strong><span>失败</span></div><div class="metric"><strong>${stats.skipped}</strong><span>跳过 / 待办</span></div></section>
  <h2>测试文件</h2>${summary.suites.map(renderSuite).join('') || '<p>本次没有运行测试。</p>'}
</main></body></html>`
}

class UnitReport {
  constructor(globalConfig) {
    this.rootDir = globalConfig.rootDir
    this.reportDir = path.join(this.rootDir, 'tests/reports/unit')
    this.coverageEnabled = globalConfig.collectCoverage
  }

  onRunComplete(_contexts, results) {
    const suites = results.testResults.map((suite) => ({
      file: path.relative(this.rootDir, suite.testFilePath).split(path.sep).join('/'),
      status: suite.testExecError || suite.numFailingTests ? 'failed' : suite.numPassingTests ? 'passed' : 'skipped',
      errors: suite.testExecError ? [suite.testExecError.message || String(suite.testExecError)] : [],
      tests: suite.testResults.map((test) => ({
        name: test.fullName,
        status: test.status,
        duration: test.duration || 0,
        failureMessages: test.failureMessages || [],
      })),
    }))
    const summary = {
      generatedAt: new Date().toISOString(),
      coverageEnabled: this.coverageEnabled,
      success:
        results.numFailedTests === 0 &&
        results.numRuntimeErrorTestSuites === 0 &&
        !results.snapshot.failure &&
        !results.wasInterrupted &&
        !results.runExecError,
      stats: {
        suites: results.numTotalTestSuites,
        passed: results.numPassedTests,
        failed: results.numFailedTests,
        skipped: results.numPendingTests + results.numTodoTests,
      },
      suites,
    }
    fs.mkdirSync(this.reportDir, { recursive: true })
    fs.writeFileSync(path.join(this.reportDir, 'summary.json'), JSON.stringify(summary, null, 2))
    fs.writeFileSync(path.join(this.reportDir, 'index.html'), renderReport(summary))
  }
}

module.exports = UnitReport
