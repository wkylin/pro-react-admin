const activeTimers = new Map()
let nextId = 1

function createJob(_config = {}) {
  const jobId = `job_${Date.now()}_${nextId++}`
  return Promise.resolve({ jobId })
}

function subscribe(jobId, callback) {
  const stages = [
    {
      step: 0,
      lines: [
        { t: 'logCmd', m: `git clone https://example.com/${jobId}.git` },
        { t: 'logInfo', m: 'Cloning into "repo"...' },
        { t: 'log', m: 'Receiving objects:  12% (120/1000)' },
        { t: 'log', m: 'Receiving objects:  67% (670/1000)' },
        { t: 'log', m: 'Resolving deltas: 100% (300/300)' },
      ],
    },
    {
      step: 1,
      lines: [
        { t: 'logCmd', m: 'npm install' },
        { t: 'log', m: 'added 532 packages from 200 contributors' },
        { t: 'log', m: 'audited 540 packages in 3.2s' },
        { t: 'logInfo', m: 'Dependencies installed' },
      ],
    },
    {
      step: 2,
      lines: [
        { t: 'logCmd', m: 'npm run build' },
        { t: 'log', m: 'Starting production build...' },
        { t: 'log', m: 'Compiled with 2 warnings' },
        { t: 'logInfo', m: 'Build completed (with warnings)' },
      ],
    },
    {
      step: 3,
      lines: [
        { t: 'logCmd', m: 'rsync -avz dist/ user@server:/var/www/app' },
        { t: 'log', m: 'sent 2.34M bytes  received 32 bytes' },
        { t: 'log', m: 'restarting nginx...' },
        { t: 'logInfo', m: 'Deployed to Nginx' },
      ],
    },
  ]

  const timers = []

  let stageIdx = 0

  const runStage = (sIdx) => {
    const s = stages[sIdx]
    let delay = 0
    s.lines.forEach((ln) => {
      const t = setTimeout(() => callback({ type: 'log', payload: { message: ln.m, type: ln.t } }), delay)
      timers.push(t)
      delay += 300 + Math.floor(Math.random() * 200)
    })

    const stepTimer = setTimeout(() => callback({ type: 'step', payload: { step: s.step } }), delay + 80)
    timers.push(stepTimer)

    const nextTimer = setTimeout(() => {
      stageIdx += 1
      if (stageIdx < stages.length) runStage(stageIdx)
      else {
        const doneT = setTimeout(
          () => callback({ type: 'log', payload: { message: 'Deployment Success', type: 'logSuccess' } }),
          300
        )
        timers.push(doneT)
        const statusT = setTimeout(() => callback({ type: 'status', payload: { status: 'success' } }), 650)
        timers.push(statusT)
      }
    }, delay + 300)
    timers.push(nextTimer)
  }

  runStage(stageIdx)

  activeTimers.set(jobId, timers)

  return () => {
    const tlist = activeTimers.get(jobId) || []
    tlist.forEach((t) => clearTimeout(t))
    activeTimers.delete(jobId)
  }
}

function cancelJob(jobId) {
  const tlist = activeTimers.get(jobId) || []
  tlist.forEach((t) => clearTimeout(t))
  activeTimers.delete(jobId)
  return Promise.resolve({ ok: true })
}

async function retryJob(_oldJobId) {
  return await createJob({})
}

export default {
  createJob,
  subscribe,
  cancelJob,
  retryJob,
}
