import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const projectRoot = process.cwd()

const SRC_AUDIO_DIR = path.join(projectRoot, 'src', 'assets', 'audio')
const SRC_VIDEO_DIR = path.join(projectRoot, 'src', 'assets', 'video')
const SRC_PUBLIC_AUDIO_DIR = path.join(projectRoot, 'public', 'audio')

const OUT_AUDIO_DIR = path.join(projectRoot, 'src', 'assets-optimized', 'audio')
const OUT_VIDEO_DIR = path.join(projectRoot, 'src', 'assets-optimized', 'video')
const OUT_PUBLIC_AUDIO_DIR = path.join(projectRoot, 'public-optimized', 'audio')

const MP3_BITRATE = process.env.MP3_BITRATE || '128k'
const MP4_CRF = process.env.MP4_CRF || '28'
const MP4_PRESET = process.env.MP4_PRESET || 'medium'
const MP4_AUDIO_BITRATE = process.env.MP4_AUDIO_BITRATE || '128k'

const MIN_SAVINGS_PCT = Number(process.env.MEDIA_MIN_SAVINGS_PCT || '5')
const SKIP_SMALL_KB = Number(process.env.MEDIA_SKIP_SMALL_KB || '256')

function bytesToMiB (bytes) {
  return (bytes / 1024 / 1024).toFixed(2)
}

function runFfmpeg (args) {
  const result = spawnSync('ffmpeg', args, {
    stdio: 'inherit',
    windowsHide: true
  })
  if (result.error) {
    throw result.error
  }
  if (result.status !== 0) {
    throw new Error(`ffmpeg exited with code ${result.status}`)
  }
}

function isFileExists (filePath) {
  try {
    fsSync.accessSync(filePath)
    return true
  } catch {
    return false
  }
}

async function ensureDir (dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function cleanDir (dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true })
  await ensureDir(dirPath)
}

async function * walkFiles (dirPath) {
  if (!isFileExists(dirPath)) return
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      yield * walkFiles(fullPath)
    } else if (entry.isFile()) {
      yield fullPath
    }
  }
}

async function optimizeOne ({ inputPath, inputBaseDir, outputBaseDir }) {
  const relPath = path.relative(inputBaseDir, inputPath)
  const outputPath = path.join(outputBaseDir, relPath)

  const ext = path.extname(inputPath).toLowerCase()
  if (ext !== '.mp3' && ext !== '.mp4') return { changed: false, reason: 'skip-ext' }

  const stat = await fs.stat(inputPath)
  const skipSmallBytes = SKIP_SMALL_KB * 1024
  if (stat.size < skipSmallBytes) {
    await ensureDir(path.dirname(outputPath))
    await fs.copyFile(inputPath, outputPath)
    return { changed: false, reason: 'skip-small-copied', before: stat.size, after: stat.size, outputPath }
  }

  await ensureDir(path.dirname(outputPath))

  const dir = path.dirname(outputPath)
  const base = path.basename(outputPath)
  const stem = path.basename(outputPath, ext)
  const tmpPath = path.join(dir, `${stem}.tmp${ext}`)

  // Clean up stale temp files from previous runs
  try {
    await fs.unlink(tmpPath)
  } catch {}

  const commonArgs = ['-y', '-hide_banner', '-loglevel', 'error', '-i', inputPath, '-map_metadata', '0']

  if (ext === '.mp3') {
    // Re-encode MP3 with target bitrate (libmp3lame)
    runFfmpeg([
      ...commonArgs,
      '-f',
      'mp3',
      '-vn',
      '-c:a',
      'libmp3lame',
      '-b:a',
      MP3_BITRATE,
      '-id3v2_version',
      '3',
      tmpPath
    ])
  } else {
    // Re-encode MP4 (H.264 + AAC) and enable faststart
    runFfmpeg([
      ...commonArgs,
      '-f',
      'mp4',
      '-c:v',
      'libx264',
      '-preset',
      MP4_PRESET,
      '-crf',
      String(MP4_CRF),
      '-pix_fmt',
      'yuv420p',
      '-c:a',
      'aac',
      '-b:a',
      MP4_AUDIO_BITRATE,
      '-movflags',
      '+faststart',
      tmpPath
    ])
  }

  const outStat = await fs.stat(tmpPath)

  // Only replace if we actually saved enough bytes
  const minKeepSize = Math.floor(stat.size * (1 - MIN_SAVINGS_PCT / 100))
  if (outStat.size >= minKeepSize) {
    await fs.unlink(tmpPath)
    await fs.copyFile(inputPath, outputPath)
    return { changed: false, reason: 'no-savings-copied', before: stat.size, after: outStat.size, outputPath }
  }

  await fs.rename(tmpPath, outputPath)
  return { changed: true, reason: 'optimized', before: stat.size, after: outStat.size, outputPath }
}

function checkFfmpegAvailable () {
  const result = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore', windowsHide: true })
  return result.status === 0
}

async function main () {
  if (!checkFfmpegAvailable()) {
    console.error('[optimize:media] ffmpeg not found in PATH.')
    console.error('Install ffmpeg and ensure `ffmpeg` is available in your terminal, then re-run.')
    console.error('Windows quick path: https://www.gyan.dev/ffmpeg/builds/ (add bin to PATH)')
    process.exit(1)
  }

  const targets = [
    { inputDir: SRC_AUDIO_DIR, outputDir: OUT_AUDIO_DIR },
    { inputDir: SRC_VIDEO_DIR, outputDir: OUT_VIDEO_DIR },
    { inputDir: SRC_PUBLIC_AUDIO_DIR, outputDir: OUT_PUBLIC_AUDIO_DIR }
  ]

  let changedCount = 0
  let scannedCount = 0
  let savedBytes = 0

  console.log('[optimize:media] scanning:', targets.map((t) => path.relative(projectRoot, t.inputDir)).join(', '))
  console.log('[optimize:media] output:', targets.map((t) => path.relative(projectRoot, t.outputDir)).join(', '))
  console.log(
    `[optimize:media] settings: MP3_BITRATE=${MP3_BITRATE}, MP4_CRF=${MP4_CRF}, MP4_PRESET=${MP4_PRESET}, MIN_SAVINGS_PCT=${MIN_SAVINGS_PCT}%, SKIP_SMALL_KB=${SKIP_SMALL_KB}KB`
  )

  for (const target of targets) {
    await cleanDir(target.outputDir)
    for await (const inputPath of walkFiles(target.inputDir)) {
      scannedCount += 1
      try {
        const result = await optimizeOne({
          inputPath,
          inputBaseDir: target.inputDir,
          outputBaseDir: target.outputDir
        })
        if (result.changed) {
          changedCount += 1
          savedBytes += result.before - result.after
          console.log(
            `[optimize:media] optimized ${path.relative(projectRoot, inputPath)} -> ${path.relative(projectRoot, result.outputPath)}: ${bytesToMiB(result.before)}MiB -> ${bytesToMiB(result.after)}MiB`
          )
        }
      } catch (err) {
        console.error(`[optimize:media] failed: ${path.relative(projectRoot, inputPath)}`)
        console.error(err)
        process.exit(1)
      }
    }
  }

  console.log(
    `[optimize:media] done. scanned=${scannedCount}, optimized=${changedCount}, saved=${bytesToMiB(savedBytes)}MiB`
  )
}

main()
