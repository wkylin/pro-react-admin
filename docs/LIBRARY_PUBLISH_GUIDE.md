# `@w.ui/wui-react` 组件库开发与发布

`packages/wui-react` 是仓库中的公共 React 组件 package。它与 `src` 应用代码具有不同职责：`src` 负责 Pro React Admin 的页面、业务、布局和平台能力；`packages/wui-react` 只保存 API 稳定、可被其他项目直接安装的通用组件。

v5 使用 clean package 边界。组件库的运行时源码、类型和样式都来自 `packages/wui-react/src`，构建不再读取 `src/lib`，也不再发布 `/core`、`/stateful`、`/stateless` 或 `/tracking` 兼容入口。

## 目录与 Git 管理

```text
packages/wui-react/
├── package.json             # npm 名称、版本、exports、依赖和发布设置
├── src/
│   ├── index.ts             # 主入口的公共导出
│   └── <Component>/         # 实现、类型、样式、Story 和测试
└── dist/                    # 构建生成，不提交 Git
```

Git 中需要保存：

- `packages/wui-react/package.json`；
- `packages/wui-react/src/**` 的组件源码、类型、样式、Story 和测试；
- 根目录 `NPM_README.md`、`LICENSE`、构建脚本和发布契约；
- npm Trusted Publishing 使用的 GitHub Actions workflow。

以下内容由安装或发布流程生成，不进入 Git：

- `packages/wui-react/node_modules/`；
- `packages/wui-react/dist/`；
- `packages/wui-react/README.md` 和 `packages/wui-react/LICENSE`，它们在准备发布时从根目录复制。

Git 只跟踪文件，不单独跟踪空目录。判断源码是否已纳入版本管理，可执行：

```bash
git status --short -- packages/wui-react
git ls-files packages/wui-react
```

新迁移源码显示为 `??` 时，需要在提交中加入 package manifest 和源码：

```bash
git add packages/wui-react/package.json packages/wui-react/src
```

不要执行 `git add -f` 把 `node_modules`、`dist` 或发布时生成的 README/LICENSE 加入仓库。

## v5 公共 API

主入口 `@w.ui/wui-react` 导出全部 12 个组件；每个组件同时提供独立子路径。`import` 使用 ESM，`require` 使用 CJS，TypeScript 声明由同一个 export map 定位。

| 源码目录              | 组件                 | 子路径                                |
| --------------------- | -------------------- | ------------------------------------- |
| `AnimatedIcon/`       | `AnimatedIcon`       | `@w.ui/wui-react/animated-icon`       |
| `IconFrame/`          | `IconFrame`          | `@w.ui/wui-react/icon-frame`          |
| `MoveChecker/`        | `MoveChecker`        | `@w.ui/wui-react/move-checker`        |
| `OneTimePasscode/`    | `OneTimePasscode`    | `@w.ui/wui-react/one-time-passcode`   |
| `OverflowText/`       | `OverflowText`       | `@w.ui/wui-react/overflow-text`       |
| `PortalTooltip/`      | `PortalTooltip`      | `@w.ui/wui-react/portal-tooltip`      |
| `ResponsiveTable/`    | `ResponsiveTable`    | `@w.ui/wui-react/responsive-table`    |
| `SafeHtml/`           | `SafeHtml`           | `@w.ui/wui-react/safe-html`           |
| `ScrollLayout/`       | `ScrollLayout`       | `@w.ui/wui-react/scroll-layout`       |
| `ScrollableSections/` | `ScrollableSections` | `@w.ui/wui-react/scrollable-sections` |
| `SliderCaptcha/`      | `SliderCaptcha`      | `@w.ui/wui-react/slider-captcha`      |
| `WatermarkProvider/`  | `WatermarkProvider`  | `@w.ui/wui-react/watermark-provider`  |

样式入口固定为 `@w.ui/wui-react/style.css`，包元数据可通过 `@w.ui/wui-react/package.json` 读取。`package.json#exports` 是消费端可见 API；没有在 exports 中声明的内部文件都属于私有实现。

### 从 v4 升级到 v5

v5 是有意收紧边界的主版本，不提供旧 API 转发层：

- 删除所有 `@w.ui/wui-react/core`、`@w.ui/wui-react/stateful`、`@w.ui/wui-react/stateless` 和 `@w.ui/wui-react/tracking` 导入；
- 根入口只保留上表 12 个组件，其他应用组件应从业务项目自己的 feature、shared、layout 或 platform 边界引用；
- 可复用组件优先改为表中的按组件子路径，样式统一改为 `@w.ui/wui-react/style.css`；
- `react-router-dom` 不再是组件库 peer dependency；若消费项目自身使用路由，继续由该项目声明；
- 升级前用代码搜索列出旧导入，逐项替换后再提升到 `5.x`，不要同时保留两套入口。

## 本地安装与使用

```bash
pnpm add @w.ui/wui-react react react-dom antd framer-motion
```

```tsx
import { AnimatedIcon, OverflowText } from '@w.ui/wui-react'
import ResponsiveTable from '@w.ui/wui-react/responsive-table'
import '@w.ui/wui-react/style.css'
```

当前 peer 支持矩阵如下：

| 组件库版本 | React      | React DOM  | Ant Design | Framer Motion | Node.js      |
| ---------- | ---------- | ---------- | ---------- | ------------- | ------------ |
| v5.x       | `>=19 <20` | `>=19 <20` | `>=6 <7`   | `>=12 <15`    | 见 `engines` |

图标、HTML 清理和 class 工具由组件包作为 runtime dependencies 管理：`@ant-design/icons`、`clsx`、`dompurify`、`isomorphic-dompurify` 和 `lucide-react`。消费项目不应依赖这些传递依赖；若业务代码直接使用其中某个库，应在消费项目中显式声明自己的版本。

消费端和 SSR 的 Node.js 范围为 `^22.22.2 || ^24.15.0 || >=26.0.0`，来自发布 package 的 `engines` 和 runtime dependency 约束。下面的 Node.js 24.15.0 或更高的 24.x 是仓库构建和自动发布要求。

## 本地构建和打包检查

仓库构建环境为 Node.js 24.15.0 或更高的 24.x 和 pnpm 11.5.2。在仓库根目录先安装依赖：

```bash
pnpm install
```

开发时只需要快速生成库产物：

```bash
pnpm run build:lib
```

准备一个完整的发布候选，包括 ESM、CJS、按组件入口、类型声明、样式、npm README/LICENSE、包契约、临时消费项目导入检查和 tarball 体积预算检查：

```bash
pnpm run prepare:lib:release
```

查看最终会进入 npm tarball 的文件：

```bash
pnpm run pack:lib:dry-run
```

这些是高层入口命令。`pack:lib:dry-run`、`pub` 和 `pub:beta` 会调用各自所需的准备流程，日常发布不要手工串联 `build:lib`、`prepare:lib:release`、`pack:lib:dry-run` 和 `pub`，否则会重复构建。

构建结果位于 `packages/wui-react/dist/`：

```text
dist/
├── esm/
│   ├── index.js
│   └── <component-subpath>.js
├── cjs/
│   ├── index.cjs
│   └── <component-subpath>.cjs
├── types/
│   ├── index.d.ts
│   └── <SourceDir>/index.d.ts
└── style.css
```

主入口与 12 个组件入口都有 ESM、CJS 和 TypeScript 声明；必要静态资源也会包含在发布包内。

准确文件名以 `packages/wui-react/package.json#exports` 为准。发布前检查会确认每个 export target 实际存在，并分别通过 ESM `import` 与 CJS `require` 加载主入口和 12 个组件子路径。

## 组件准入规则

组件进入 `packages/wui-react` 前必须同时满足以下条件：

1. 至少两个应用场景可复用，API 使用通用 UI 术语，不暴露 Pro React Admin 的业务模型。
2. 不导入根应用的 `src`、路径 alias、路由、store、feature、service、环境变量或项目 registry。
3. 网络请求通过 Props 或 adapter 注入，不固定接口地址、鉴权方式或响应结构。
4. Props 和导出类型明确；受控状态、默认值、错误状态和回调语义稳定。
5. 使用 Ant Design 语义 token 或公开 CSS 变量，覆盖亮色、暗色和品牌主题。
6. 可在服务端安全导入；`window`、`document`、Portal、尺寸测量和观察器只在客户端生命周期使用。
7. 有用途和 Props Story；交互组件有测试，并检查键盘操作、窄屏和无障碍状态。
8. 第三方依赖已经确定归属：宿主框架使用 peer dependency，组件内部工具使用 dependency，构建工具使用 dev dependency。
9. 已评估 bundle 体积和 tree shaking；不会因为单个子路径导入整套应用代码。

只服务单个业务域的组件进入 `src/features/<domain>/components`；跨业务复用但 API 尚未稳定的组件进入 `src/shared/ui`；应用布局与平台能力保留在 `src/layouts` 和 `src/platform`。

## 迁移一个组件

1. 把实现、类型、样式、Story 和测试移动到 `packages/wui-react/src/<Component>`。
2. 删除对应用私有模块和根 alias 的依赖，必要能力改为 Props、Context 或 adapter。
3. 从 `packages/wui-react/src/index.ts` 导出组件和公共类型。
4. 在组件库构建入口和 `package.json#exports` 中注册 kebab-case 子路径。
5. 明确样式是否进入统一 `style.css`，并验证亮色、暗色和 SSR 导入。
6. 执行 `pnpm run pack:lib:dry-run`，从生成的 tarball 视角核对 JS、类型、CSS 和静态资源。
7. 对已有 npm API 的破坏性变更提升主版本；应用内部旧路径直接迁移，不保留兼容转发。

组件目录推荐结构：

```text
ComponentName/
├── index.ts
├── ComponentName.tsx
├── types.ts
├── ComponentName.module.less
├── ComponentName.stories.tsx
└── ComponentName.test.tsx
```

## 样式、主题和 SSR

- 消费项目只需在入口引入一次 `@w.ui/wui-react/style.css`。
- 包内 CSS Modules 防止局部类名冲突；跨组件设计值使用语义 token 或公开 CSS 变量。
- 不通过 Ant Design 内部 DOM 类名实现主题覆盖。
- SSR 阶段不得读取浏览器尺寸或创建 Portal；客户端挂载后再启用这些行为。
- React Server Components 项目应在使用交互组件的调用文件中声明 `'use client'`。
- 服务端和客户端必须使用同一版本的组件包与样式，避免 hydration 差异。

## 版本策略

组件库版本只维护在 `packages/wui-react/package.json`：

```bash
pnpm run release:lib:patch
pnpm run release:lib:minor
pnpm run release:lib:major
```

- patch：修复行为、样式或类型错误，不改变既有 API。
- minor：新增向后兼容组件、Props 或子路径。
- major：删除/重命名导出、改变默认行为或提高 peer dependency 主版本。

npm 不允许覆盖已经发布的同版本。发布前必须更新版本，并在变更记录中说明迁移影响。

## 手动发布到 npm

首次发布前确认 npm 账号拥有 `@w.ui/wui-react` 权限并已完成 2FA：

```bash
npm login
npm whoami
```

正式版和预发布版分别使用：

```bash
pnpm run pub
pnpm run pub:beta
```

两个命令都负责完整准备、校验和发布，不需要先执行其他构建命令。正式版使用 `latest` tag；beta 使用 `beta` tag。发布后检查：

```bash
npm view @w.ui/wui-react version
npm view @w.ui/wui-react dist-tags
```

## npm Trusted Publishing 与 GitHub OIDC

自动发布应使用 npm Trusted Publishing，不在 GitHub Secrets 中长期保存 `NPM_TOKEN`。

1. 使用包 owner 登录 npmjs.com，打开 `@w.ui/wui-react` 的 **Settings → Trusted Publisher**。
2. 选择 GitHub Actions，填写组织或用户 `wkylin`、仓库 `pro-react-admin`、workflow 文件名 `publish-wui-react.yml` 和 environment `npm`。
3. 在 GitHub 仓库创建受保护的 `npm` Environment，可配置审批人，并只允许受保护分支或 `wui-react-v*` 版本 tag 发布。
4. 发布 workflow 必须来自默认分支，并声明最小权限：

```yaml
permissions:
  contents: read
  id-token: write
```

5. workflow 使用满足 package engines 的 Node.js 24（最低 24.15.0），并将 npm CLI 升级到 11.5.1 或更高版本。安装锁定依赖后，在 `packages/wui-react` 目录执行：

```bash
npm install --global npm@^11.5.1
npm publish --access public --tag "$WUI_DIST_TAG"
```

package 自身的 `prepublishOnly` 会调用根级 `prepare:lib:release`，因此 workflow 不要在 `npm publish` 前再次执行 release preparation。这样一次发布只完整构建一次。

6. Trusted Publishing 会自动为包生成 provenance attestation，不需要额外传入 `--provenance`。workflow 不设置 `NODE_AUTH_TOKEN` 或 npm automation token。OIDC 身份中的 owner、repository、workflow filename 和 environment 必须与 npm 设置完全一致。

workflow 支持 `wui-react-v*` tag 和手动触发，并在发布前校验版本、dist-tag 与 npm 已有版本。类型检查、组件测试、Storybook 和 dry-run 留在常规 CI；发布 job 通过 package lifecycle 完成一次 release preparation。CI 校验 job 不应自动发布，只有 release workflow 获得 `id-token: write`。

## 发布故障定位

- `EOTP` 或登录失败：检查账号 2FA 和当前登录用户；Trusted Publishing workflow 不使用本地登录态。
- `ENEEDAUTH`：手动发布先执行 `npm login`；CI 检查 npm Trusted Publisher 与 workflow 身份是否匹配。
- `403 version already exists`：提升 `packages/wui-react/package.json` 版本，不能覆盖已有版本。
- export target missing：执行 `pnpm run prepare:lib:release`，检查 export map 与构建入口是否同步。
- 消费端缺少样式：确认应用入口已经导入 `@w.ui/wui-react/style.css`。
- ESM/CJS 或类型解析失败：使用受支持的 Node/TypeScript，并以 package export map 为准，不深层导入 `dist`。
