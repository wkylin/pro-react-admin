#!/usr/bin/env node
// Simple Playwright-based script to capture a screenshot and record a short video of a Storybook page.
// Usage: STORYBOOK_URL=http://localhost:6006 STORY_PATH='/?path=/story/your--story' OUT_DIR=docs/static/images node scripts/capture-storybook.js

const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const url = process.env.STORYBOOK_URL || 'http://localhost:6006';
  const path = process.env.STORY_PATH || '/';
  const out = process.env.OUT_DIR || 'docs/static/images';
  fs.mkdirSync(out, { recursive: true });
  const videoDir = `${out}/video`;
  fs.mkdirSync(videoDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } } });
  const page = await context.newPage();

  console.log('Going to', url + path);
  await page.goto(url + path, { waitUntil: 'load', timeout: 60000 });
  // allow animations / lazy-loaded content
  await page.waitForTimeout(1500);

  const screenshotPath = `${out}/storybook-argstable-screenshot.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved screenshot:', screenshotPath);

  // keep the video recording for a short time
  await page.waitForTimeout(2500);
  await context.close(); // this finalizes the video file
  await browser.close();

  // find the newest file in the video directory
  const files = fs.readdirSync(videoDir).map(f => ({ f, t: fs.statSync(`${videoDir}/${f}`).mtimeMs })).sort((a,b)=>b.t-a.t);
  if (files.length) {
    const latest = `${videoDir}/${files[0].f}`;
    console.log('Saved video (webm):', latest);
  } else {
    console.log('No video file found in', videoDir);
  }

  console.log('Done. Convert the webm to gif using ffmpeg if you need GIFs.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
