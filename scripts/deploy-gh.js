const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper to run commands
const run = (command, options = {}) => {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit', ...options });
};

const distDir = path.resolve(__dirname, '../dist');
const storybookStaticDir = path.resolve(__dirname, '../storybook-static');
const storybookTargetDir = path.join(distDir, 'storybook');

try {
  // 1. Build Main App
  console.log('-------------------------------------------------------');
  console.log('Step 1: Building Main App (Production)...');
  console.log('-------------------------------------------------------');
  run('npm run build:production');

  // 2. Build Storybook
  console.log('\n-------------------------------------------------------');
  console.log('Step 2: Building Storybook...');
  console.log('-------------------------------------------------------');
  // Set env var for base href.
  // Homepage is https://wkylin.github.io/pro-react-admin
  // So root is /pro-react-admin/
  // Storybook should be at /pro-react-admin/storybook/
  const env = { ...process.env, STORYBOOK_BASE_HREF: '/pro-react-admin/storybook/' };
  run('npm run build-storybook', { env });

  // 3. Move Storybook to dist/storybook
  console.log('\n-------------------------------------------------------');
  console.log('Step 3: Moving Storybook to dist/storybook...');
  console.log('-------------------------------------------------------');

  if (!fs.existsSync(distDir)) {
    throw new Error('dist directory does not exist! Main app build might have failed.');
  }

  // Clean previous storybook dir in dist if exists
  if (fs.existsSync(storybookTargetDir)) {
    console.log(`Removing existing ${storybookTargetDir}...`);
    fs.rmSync(storybookTargetDir, { recursive: true, force: true });
  }

  // Ensure parent dir exists (it should, as dist exists)
  if (!fs.existsSync(storybookStaticDir)) {
     throw new Error('storybook-static directory does not exist! Storybook build might have failed.');
  }

  console.log(`Moving ${storybookStaticDir} to ${storybookTargetDir}...`);

  // Try rename first (fastest)
  try {
    fs.renameSync(storybookStaticDir, storybookTargetDir);
  } catch (err) {
    if (err.code === 'EXDEV') {
      // Cross-device link, fall back to copy
      console.log('Cross-device link detected, copying files instead...');
      fs.cpSync(storybookStaticDir, storybookTargetDir, { recursive: true });
      fs.rmSync(storybookStaticDir, { recursive: true, force: true });
    } else {
      throw err;
    }
  }

  // 4. Deploy
  console.log('\n-------------------------------------------------------');
  console.log('Step 4: Deploying to GitHub Pages...');
  console.log('-------------------------------------------------------');
  // We use npx to ensure we use the local gh-pages binary
  run('npx gh-pages -d dist');

  console.log('\n=======================================================');
  console.log('Deployment Complete! 🚀');
  console.log('Main App: https://wkylin.github.io/pro-react-admin/');
  console.log('Storybook: https://wkylin.github.io/pro-react-admin/storybook/');
  console.log('=======================================================');

} catch (error) {
  console.error('\n❌ Deployment Failed:', error.message);
  process.exit(1);
}
