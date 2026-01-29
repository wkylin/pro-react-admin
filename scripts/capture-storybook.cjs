#!/usr/bin/env node
// cjs wrapper to run the capture-storybook.js ES module in a project with "type": "module"
const { spawn } = require('child_process');
const path = require('path');

const nodeArgs = ['--loader', 'node:loader'];
// Execute the ESM script with node directly
const script = path.join(__dirname, 'capture-storybook.js');
const child = spawn(process.execPath, [script], { stdio: 'inherit', env: process.env });
child.on('exit', code => process.exit(code));
