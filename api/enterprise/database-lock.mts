import {
  closeSync,
  existsSync,
  fsyncSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  unlinkSync,
  writeSync,
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'

interface LockRecord {
  pid: number
  token: string
  startedAt: string
}

export function databaseLockPath(databasePath: string) {
  const canonicalPath = existsSync(databasePath) ? realpathSync(databasePath) : resolve(databasePath)
  return `${canonicalPath}.runtime.lock`
}

function processIsAlive(pid: number) {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ESRCH') return false
    return true
  }
}

/** A host-local lease prevents offline migration/restore from racing a running API process. */
export function acquireDatabaseLease(databasePath: string): () => void {
  if (databasePath === ':memory:') return () => {}

  const lockPath = databaseLockPath(databasePath)
  mkdirSync(dirname(lockPath), { recursive: true, mode: 0o700 })
  const token = randomUUID()
  const record: LockRecord = { pid: process.pid, token, startedAt: new Date().toISOString() }
  let descriptor: number

  try {
    descriptor = openSync(lockPath, 'wx', 0o600)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error

    let existing: LockRecord
    try {
      existing = JSON.parse(readFileSync(lockPath, 'utf8')) as LockRecord
    } catch {
      throw new Error(
        `Enterprise database lock is unreadable; inspect and remove ${lockPath} only after confirming no API is running`
      )
    }
    if (!Number.isSafeInteger(existing.pid) || existing.pid < 1 || typeof existing.token !== 'string') {
      throw new Error(
        `Enterprise database lock is invalid; inspect and remove ${lockPath} only after confirming no API is running`
      )
    }
    if (processIsAlive(existing.pid)) {
      throw new Error(`Enterprise database is already in use by process ${existing.pid}`)
    }
    throw new Error(
      `Enterprise database lock belongs to stopped process ${existing.pid}; confirm no API or maintenance process is running, then remove ${lockPath}`
    )
  }

  try {
    writeSync(descriptor, JSON.stringify(record))
    fsyncSync(descriptor)
  } catch (error) {
    closeSync(descriptor)
    unlinkSync(lockPath)
    throw error
  }

  let released = false
  const release = () => {
    if (released) return
    released = true
    try {
      closeSync(descriptor)
    } catch {
      // The descriptor may already have been closed by a failed shutdown path.
    }
    try {
      const current = JSON.parse(readFileSync(lockPath, 'utf8')) as Partial<LockRecord>
      if (current.pid === record.pid && current.token === record.token) unlinkSync(lockPath)
    } catch {
      // Preserve an unreadable/replaced lock for operator inspection.
    }
  }

  process.once('exit', release)
  return () => {
    release()
    process.removeListener('exit', release)
  }
}
