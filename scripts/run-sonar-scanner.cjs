/* eslint-disable no-console */

const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

function main() {
  const token = process.env.SONAR_TOKEN;

  if (!token) {
    console.error('[sonar] ERROR: SONAR_TOKEN is not set.');
    console.error('[sonar] Set it, then re-run: npm run scanner');
    console.error('[sonar] PowerShell: $env:SONAR_TOKEN="<token>"; npm run scanner');
    console.error('[sonar] Bash: SONAR_TOKEN="<token>" npm run scanner');
    process.exit(1);
  }

  const passthroughArgs = process.argv.slice(2);
  const args = [`-Dsonar.token=${token}`, ...passthroughArgs];

  const root = process.cwd();
  const localBins = process.platform === 'win32'
    ? [path.join(root, 'node_modules', '.bin', 'sonar-scanner.cmd')]
    : [path.join(root, 'node_modules', '.bin', 'sonar-scanner')];

  const localScanner = localBins.find((p) => {
    try {
      return fs.existsSync(p);
    } catch {
      return false;
    }
  });

  if (!localScanner) {
    console.error('[sonar] ERROR: local sonar-scanner not found.');
    console.error('[sonar] Run: npm install');
    process.exit(1);
  }

  const result = spawnSync(localScanner, args, {
    stdio: 'inherit',
    shell: false,
    windowsHide: true,
  });

  process.exit(result.status ?? 1);
}

main();
