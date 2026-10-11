import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { Writable } from 'node:stream'
import { stripVTControlCharacters } from 'node:util'
import webpack from 'webpack'
import { createBuildProgress } from '../webpack/progress.js'

let fixtureId = 0
async function createFixture(t, { isTTY = true, env = { TERM: 'xterm-256color' }, level = 'info' } = {}) {
  const directory = await fs.mkdtemp(path.join(tmpdir(), 'pro-react-progress-'))
  const entry = path.join(directory, 'entry.js')
  await fs.writeFile(entry, 'export default 42\n')
  const writes = []
  const stream = new Writable({
    write(chunk, encoding, callback) {
      writes.push({ text: String(chunk), columns: this.columns })
      callback()
    },
  })
  Object.assign(stream, { isTTY, columns: 60 })
  const progress = createBuildProgress({ name: `fixture${++fixtureId}`, stream, env })
  const compiler = webpack({
    mode: 'development',
    entry,
    output: { path: path.join(directory, 'dist'), filename: 'bundle.js' },
    devtool: false,
    cache: false,
    plugins: [progress.plugin],
    infrastructureLogging: { ...progress.infrastructureLogging, level, colors: false },
  })
  t.after(async () => {
    await new Promise((resolve, reject) => compiler.close((error) => (error ? reject(error) : resolve())))
    await fs.rm(directory, { recursive: true, force: true })
  })
  return {
    compiler,
    entry,
    stream,
    writes,
    run: () =>
      new Promise((resolve, reject) => compiler.run((error, stats) => (error ? reject(error) : resolve(stats)))),
  }
}

const progressFrames = (writes) => writes.filter(({ text }) => /[█░]/.test(text))

test('TTY progress stays on one row and preserves an interleaved infrastructure warning once', async (t) => {
  const fixture = await createFixture(t)
  fixture.compiler.hooks.thisCompilation.tap('ProgressFixture', (compilation) => {
    compilation.hooks.buildModule.tap('ProgressFixture', () => {
      fixture.stream.columns = 32
      fixture.compiler.webpackbar.updateProgress(0.43, 'building\nmodules', [
        '3/5 entries 1317/1364 dependencies',
        '178/554 modules 227 active',
        'babel-loader!babel-loader!src/pages/zustand/index.tsx',
      ])
      fixture.compiler.webpackbar.updateProgress(0.42, 'building', [])
      fixture.compiler.getInfrastructureLogger('progress-fixture').warn('UNIQUE_WARNING')
    })
  })
  const stats = await fixture.run()
  assert.equal(stats.hasErrors(), false)
  const frames = progressFrames(fixture.writes)
  assert.ok(frames.length > 2)
  let lastProgress = 0
  for (const { text, columns } of frames) {
    assert.equal(text.includes('\n'), false, 'progress redraw must not append a new line')
    const visible = stripVTControlCharacters(text).replace(/\r/g, '')
    const progress = Number(visible.match(/^(\d+)%/)[1])
    assert.ok(progress >= lastProgress, 'estimated progress must not move backward within one compilation')
    lastProgress = progress
    assert.ok(visible.length < columns, `progress must fit within ${columns} terminal columns`)
    assert.doesNotMatch(visible, /babel-loader|src\/pages|dependencies|modules 227 active/)
  }
  const output = fixture.writes.map(({ text }) => text).join('')
  assert.equal(output.match(/UNIQUE_WARNING/g)?.length, 1, 'redraw must not replay earlier logs')
  assert.match(output, /43%/)
  assert.match(output, /Compiled successfully/)
})

test('each rebuild resets progress and a failed compilation keeps its error summary', async (t) => {
  const fixture = await createFixture(t)
  assert.equal((await fixture.run()).hasErrors(), false)
  const initialWrites = fixture.writes.length
  await fs.writeFile(fixture.entry, 'import "./missing-module.js"\n')
  assert.equal((await fixture.run()).hasErrors(), true)
  const rebuild = fixture.writes.slice(initialWrites)
  assert.match(progressFrames(rebuild)[0].text, /0%/)
  assert.match(rebuild.map(({ text }) => text).join(''), /Compiled with some errors/)
  const summaryIndex = rebuild.findIndex(({ text }) => text.includes('Compiled with some errors'))
  assert.equal(stripVTControlCharacters(rebuild[summaryIndex - 1].text).trim(), '')
})

for (const [name, options] of [
  ['piped output', { isTTY: false }],
  ['CI with a TTY', { env: { CI: 'true', TERM: 'xterm-256color' } }],
  ['a dumb terminal', { env: { TERM: 'dumb' } }],
]) {
  test(`${name} emits only start and completion without cursor controls`, async (t) => {
    const fixture = await createFixture(t, options)
    assert.equal((await fixture.run()).hasErrors(), false)
    const output = fixture.writes.map(({ text }) => text).join('')
    assert.match(output, /Compiling Fixture/)
    assert.match(output, /Compiled successfully/)
    assert.equal(output.split('\n').length - 1, 2)
    assert.equal(progressFrames(fixture.writes).length, 0)
    assert.equal(output.includes('\u001b'), false)
  })
}

test('production error logging still shows progress without allowing unrelated info logs', async (t) => {
  const fixture = await createFixture(t, { level: 'error', env: { CI: 'false', TERM: 'xterm-256color' } })
  fixture.compiler.getInfrastructureLogger('other-plugin').info('HIDDEN_INFO')
  assert.equal((await fixture.run()).hasErrors(), false)
  const output = fixture.writes.map(({ text }) => text).join('')
  assert.ok(progressFrames(fixture.writes).length > 0)
  assert.match(output, /Compiled successfully/)
  assert.doesNotMatch(output, /HIDDEN_INFO/)
})
