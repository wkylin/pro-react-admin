---
title: 修复 Storybook MDX 中 “does not provide an export named 'ArgsTable'” 的实战
description: '在 Storybook 的 blocks 打包入口显式重导出 ArgsTable，从而修复 Vite 预打包导致的 MDX 运行时导出缺失问题。'
tags: [Storybook, Vite, MDX, debugging, frontend]
juejin_tags: [前端, Storybook, Vite, MDX, Debug]
date: 2026-01-29
author: 'wkylin'
cover: /docs/static/images/storybook-argstable-cover.png
og_image: /docs/static/images/storybook-argstable-cover.png
canonical: 'https://your-domain.example/blog/fix-storybook-argstable-cn'
---

# 修复 Storybook MDX 中 “does not provide an export named 'ArgsTable'” 的实战 🐛➜✅

TL;DR: 在 Storybook 的 `blocks` 打包入口里显式重导出 `ArgsTable`（`export { ArgsTable } from './.../ArgsTable'`），并追加单元测试与兼容性说明，快速恢复 MDX 文档在 Vite 下的运行时兼容性；补丁已提交为 PR：https://github.com/storybookjs/storybook/pull/33702。

---

## 背景

在一个使用 Vite 与 Storybook 的组件库中（MDX 文档广泛使用 `ArgsTable`），运行 Storybook 时出现了如下运行时错误：

> The requested module '.../blocks.js' does not provide an export named 'ArgsTable'

这导致载入 MDX 的文档页面失败，Args 表格无法渲染。

## 问题定位（快速说明）

- 现象：MDX 导入 `ArgsTable` 报错，且只在开启 Vite 优化（optimizeDeps）或预打包后的环境中出现。
- 检查 `.vite-cache` 下预打包产物后，发现 `blocks` 模块导出里存在 `PureArgsTable`，但缺少命名导出 `ArgsTable`。
- 推断原因：构建/预打包步骤（或导出重命名）将内部实现以 `PureArgsTable` 暴露，导致依赖 `ArgsTable` 的代码在运行时找不到对应命名导出。

> 小结：Vite pre-bundling 可能改变导出符号，导致 MDX 代码期待的命名导出不存在。

## 解决方案（我做了什么）

思路是做一个小而不侵入的兼容性修复：在 `blocks` 的入口处显式导出 `ArgsTable`，并添加一条针对性单元测试。

关键变更如下：

```diff
*** Update File: code/addons/docs/src/blocks.ts
@@
-export { ArgsTable as PureArgsTable } from './blocks/components/ArgsTable/ArgsTable';
+export { ArgsTable as PureArgsTable } from './blocks/components/ArgsTable/ArgsTable';
+// Compatibility re-export so external imports of `ArgsTable` keep working.
+export { ArgsTable } from './blocks/components/ArgsTable/ArgsTable';
```

并新增测试：

```ts
// code/addons/docs/src/__tests__/blocks.test.ts
import * as blocks from '../blocks'

describe('blocks module compatibility exports', () => {
  test('exports ArgsTable', () => {
    expect(blocks.ArgsTable).toBeDefined()
  })

  test('ArgsTable equals PureArgsTable', () => {
    expect(blocks.ArgsTable).toBe(blocks.PureArgsTable)
  })
})
```

这是一种最小改动（non-breaking）的补丁，便于快速 review 和回滚。

## 本地验证步骤（可复现）

1. 运行针对性测试：

   ```bash
   npm run test:jest -- code/addons/docs/src/__tests__/blocks.test.ts
   ```

2. 启动 Storybook 并检查 MDX 页面：

   ```bash
   npm run storybook
   # 打开 http://localhost:6006/ 并打开含 ArgsTable 的 MDX 页面
   ```

3. 备用临时方案（不改 upstream）：
   - 在项目内添加一个 `ArgsTableFallback` shim，然后在 MDX 中使用显式的表格数据；
   - 在 `.storybook/main.ts` 中把 `@storybook/addon-docs` 加入 `optimizeDeps.exclude`，并删除 .vite-cache 以避开预打包改名问题。

## PR 与 Issue

- Issue: https://github.com/storybookjs/storybook/issues/33691
- PR: https://github.com/storybookjs/storybook/pull/33702

我已在 PR 中包含补丁、测试与 Changelog 说明，等待 upstream maintainer 审核。

## 后记与建议 ✅

- 这类问题表明：当你的开发环境（如 Vite）会进行依赖预打包或导出变换时，库的公共导出契约（named exports）很重要。保持显式导出可以减少消费端因编译器/打包器变化导致的问题。
- 我建议：库方接纳这个最小兼容补丁以快速恢复用户体验；若维护者更倾向于调整 package exports 或 build pipeline，也可以用该方向做进一步改进。

---

## 截图 & GIF（建议与占位） 🖼️🎞️

我建议准备以下素材并放在仓库：

- 封面图（掘金建议尺寸：900×500px；Medium 建议 1200×630px），放置在 `docs/static/images/storybook-argstable-cover.png`。
- 页面截图：`docs/static/images/storybook-argstable-screenshot.png`（完整页面或关键区域）。
- 录屏 GIF（短片，3-5 秒）: `docs/static/images/storybook-argstable.gif`。

我在仓库中添加了占位说明文件（`docs/static/images/README.md`）以及一个小脚本用于自动截图与录制（使用 Playwright），详情见下文。

## 更详细的复现步骤（逐步） 🧭

1. 清理 Storybook 的预打包缓存（确保复现预打包问题）：
   ```bash
   rm -rf .vite-cache/storybook
   ```
2. 添加一个简单的 MDX 文档（示例）：

   ```md
   ---
   name: ArgsTable demo
   ---

   import { ArgsTable } from '@storybook/addon-docs/blocks'

   # Demo

   <ArgsTable of={SomeComponent} />
   ```

3. 启动 Storybook 并观察控制台错误：

   ```bash
   npm run storybook
   ```

   你应当在浏览器控制台或终端中看到类似错误：

   > The requested module '.../blocks.js' does not provide an export named 'ArgsTable'

4. 检查预打包产物以确认导出情况：

   ```bash
   # Unix like
   grep -n "PureArgsTable\|ArgsTable" .vite-cache/storybook/deps/* || true
   ```

5. 运行新增的单元测试验证修复：
   ```bash
   npm run test:jest -- code/addons/docs/src/__tests__/blocks.test.ts
   ```

## 如何自动截屏 / 生成 GIF（脚本说明） 🛠️

仓库已包含一个辅助脚本：`scripts/capture-storybook.js`（基于 Playwright），会：

- 启动浏览器并访问 Storybook 页面的指定 path；
- 保存截图到 `docs/static/images/storybook-argstable-screenshot.png`；
- 录制短视频（webm）到 `docs/static/images/video/`（可使用 ffmpeg 转换为 GIF）。

快速使用：

```bash
# 启动 storybook
npm run storybook
# 在另一个终端运行脚本（设置要捕获的 story 路径）
STORYBOOK_URL=http://localhost:6006 STORY_PATH='/?path=/story/your--story' node scripts/capture-storybook.js
# 若想转换 webm 到 gif（需要 ffmpeg）
./scripts/convert-webm-to-gif.sh docs/static/images/video/latest.webm docs/static/images/storybook-argstable.gif
```

脚本详情请参见：`scripts/capture-storybook.js` 与 `scripts/convert-webm-to-gif.sh`。

---

**需要我把封面、截图与 GIF 帮你生成并放到仓库吗？** 我可以替你运行脚本并提交生成的图片（需要你授权我启动 Storybook 并在你的环境运行脚本）。
