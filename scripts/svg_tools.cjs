#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function resolveTargetFile(provided) {
  if (provided) return path.resolve(provided)
  return path.join(__dirname, '..', 'src', 'pages', 'svgViewer', 'index.jsx')
}

function readFile(fp) {
  try {
    return fs.readFileSync(fp, 'utf8')
  } catch (e) {
    console.error('Cannot read file:', fp)
    process.exit(2)
  }
}

function writeFile(fp, content) {
  fs.writeFileSync(fp, content, 'utf8')
}

function findSvgSource(content) {
  const m = content.match(/const\s+SVG_SOURCE\s*=\s*`([\s\S]*?)`;/m)
  return m ? { fullMatch: m[0], svg: m[1], index: m.index } : null
}

function showContext(svg, idx, label) {
  if (idx < 0) {
    console.log(`${label}: not found`)
    return
  }
  const start = Math.max(0, idx - 200)
  const end = Math.min(svg.length, idx + 200)
  console.log(`\n${label} context (around index ${idx}):\n---START---\n${svg.slice(start, end)}\n---END---`)
}

function cmd_check(fp) {
  const content = readFile(fp)
  const found = findSvgSource(content)
  if (!found) {
    console.error('Cannot find SVG_SOURCE in file')
    process.exit(2)
  }
  const svg = found.svg
  function countTag(tag) {
    const openRe = new RegExp('<' + tag + '[\\s>]', 'gi')
    const closeRe = new RegExp('</' + tag + '>', 'gi')
    const opens = (svg.match(openRe) || []).length
    const closes = (svg.match(closeRe) || []).length
    return { opens, closes }
  }
  const tags = ['svg', 'g', 'foreignObject', 'div', 'span', 'p', 'br']
  const counts = {}
  for (const t of tags) counts[t] = countTag(t)
  console.log('Tag counts:')
  for (const t of tags) console.log(`  ${t}: open=${counts[t].opens} close=${counts[t].closes}`)

  const lastG = svg.lastIndexOf('<g')
  const lastCloseG = svg.lastIndexOf('</g>')
  const lastCloseSvg = svg.lastIndexOf('</svg>')
  console.log('\nPositions (char index):')
  console.log('  last <g at', lastG)
  console.log('  last </g> at', lastCloseG)
  console.log('  last </svg> at', lastCloseSvg)

  showContext(svg, lastG, '<g (last)')
  showContext(svg, lastCloseG, '</g> (last)')
  showContext(svg, lastCloseSvg, '</svg> (last)')

  // stack-based scan for unclosed <g>
  const tagRegex = /<\/?g[\s>]/gi
  let stack = []
  let m
  while ((m = tagRegex.exec(svg)) !== null) {
    if (m[0].startsWith('</')) {
      if (stack.length === 0) {
        console.log('\nStray </g> at', m.index)
        showContext(svg, m.index, 'stray </g>')
        break
      } else {
        stack.pop()
      }
    } else {
      stack.push(m.index)
    }
  }
  if (stack.length > 0) {
    const lastUnclosed = stack[stack.length - 1]
    console.log('\nFound unclosed <g> (last open at index', lastUnclosed + ')')
    showContext(svg, lastUnclosed, 'unclosed <g>')
  } else {
    console.log('\nAll <g> tags appear closed (no unclosed <g> found)')
  }
}

function cmd_replace_br(fp) {
  const content = readFile(fp)
  const found = findSvgSource(content)
  if (!found) {
    console.error('Cannot find SVG_SOURCE')
    process.exit(2)
  }
  const svg = found.svg
  const replaced = svg.replace(/<br>/g, '<br/>')
  if (replaced === svg) {
    console.log('No <br> occurrences found to replace')
    process.exit(0)
  }
  const newContent = content.replace(found.fullMatch, `const SVG_SOURCE = ` + '`' + replaced + '`;')
  writeFile(fp, newContent)
  console.log('Replaced <br> with <br/> in SVG_SOURCE')
}

function cmd_fix_unclosed_g(fp) {
  const content = readFile(fp)
  const found = findSvgSource(content)
  if (!found) {
    console.error('Cannot find SVG_SOURCE')
    process.exit(2)
  }
  let svg = found.svg
  const openCount = (svg.match(/<g[\s>]/gi) || []).length
  const closeCount = (svg.match(/<\/g>/gi) || []).length
  const missing = openCount - closeCount
  if (missing <= 0) {
    console.log('No missing </g> tags detected (open:', openCount, 'close:', closeCount, ')')
    process.exit(0)
  }
  // insert missing number of </g> before the last </svg>
  const lastCloseSvgIdx = svg.lastIndexOf('</svg>')
  if (lastCloseSvgIdx === -1) {
    console.error('No </svg> found, aborting')
    process.exit(2)
  }
  const inserts = '</g>'.repeat(missing)
  const newSvg = svg.slice(0, lastCloseSvgIdx) + inserts + svg.slice(lastCloseSvgIdx)
  const newContent = content.replace(found.fullMatch, `const SVG_SOURCE = ` + '`' + newSvg + '`;')
  writeFile(fp, newContent)
  console.log(`Inserted ${missing} </g> before closing </svg>`)
}

function usage() {
  console.log('Usage: node scripts/svg_tools.cjs <command> [--file=path]')
  console.log('Commands:')
  console.log('  check           : analyze tag counts and find unclosed <g>')
  console.log('  replace-br      : replace <br> with <br/> inside SVG_SOURCE')
  console.log('  fix-unclosed-g  : insert missing </g> before </svg> to balance <g> tags')
  console.log('\nOptions:')
  console.log('  --file=PATH     : specify target file (defaults to src/pages/svgViewer/index.jsx)')
}

function main() {
  const rawArgs = process.argv.slice(2)
  if (rawArgs.length === 0) return usage()
  let cmd = rawArgs[0]
  let fileArg = null
  for (let i = 1; i < rawArgs.length; i++) {
    const a = rawArgs[i]
    if (a.startsWith('--file=')) fileArg = a.split('=')[1]
    else if (a === '--file' && rawArgs[i + 1]) {
      fileArg = rawArgs[i + 1]
      i++
    }
  }
  const fp = resolveTargetFile(fileArg)
  if (!fs.existsSync(fp)) {
    console.error('Target file does not exist:', fp)
    process.exit(2)
  }
  if (cmd === 'check') return cmd_check(fp)
  if (cmd === 'replace-br') return cmd_replace_br(fp)
  if (cmd === 'fix-unclosed-g') return cmd_fix_unclosed_g(fp)
  usage()
}

main()
