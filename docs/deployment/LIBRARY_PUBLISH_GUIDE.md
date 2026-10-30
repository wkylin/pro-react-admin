# UI 组件库构建与 npmjs 发布

本指南从本地构建、登录、打包到 npmjs 发布逐条列出命令。所有操作在**仓库根目录**执行，发布对象是 `packages/wui-react` 中的 `@w.ui/wui-react`；根应用为 private。应用版本和组件包版本独立，以组件包 `package.json` 为准。

## 五分钟路径

组件开发时先用 Storybook 查看源码中的组件；需要验证将交给其它项目安装的包时，再构建 `dist` 并检查实际 npm 打包清单。这些本地命令都不会发布到 npm：

```bash
pnpm install --frozen-lockfile
pnpm run storybook:webpack      # http://localhost:6006；Vite 可改用 storybook:vite（6008）
# 停止 Storybook 后执行以下发布前检查
pnpm run check:lib-release
pnpm run prepare:lib:release    # 默认用 Webpack 构建并验证组件包
npm pack ./packages/wui-react --dry-run --ignore-scripts
```

要用 Vite 验证**同一份包源码**，将 `prepare:lib:release` 换成 `pnpm exec cross-env BUILD_TOOL=vite pnpm run prepare:lib:release`。该命令依次构建 ESM/CJS/CSS/类型、补齐包文件，并做包契约、独立消费和体积检查。两种构建器共用 `packages/wui-react/dist`，切换时会覆盖上一次产物，发布前只保留并验证最终选用的一种。组件故事的开发与静态预览步骤见 [Storybook 指南](../development/STORYBOOK.md)。

| 操作                                        | 结果与去向                                           | 是否发布到 npm |
| ------------------------------------------- | ---------------------------------------------------- | -------------- |
| `storybook:webpack` / `storybook:vite`      | 本地组件开发服务，直接读取源码                       | 否             |
| `prepare:lib:release`                       | `packages/wui-react/dist`，供本地检查和 npm 打包     | 否             |
| `npm pack --dry-run`                        | 只列出将进入 npm 包的文件，不生成 tarball            | 否             |
| `npm pack --pack-destination artifacts/npm` | 生成本地 `.tgz`；`v*` 应用 Release 可附带同类文件    | 否             |
| `wui-react-v*` 发布工作流或 `npm publish`   | 上传 `@w.ui/wui-react` 到 npm registry               | 是             |
| GitHub Pages                                | 承载应用和 Storybook 静态预览，不作为 npm 包安装地址 | 否             |
| 默认 Vercel 站点                            | 承载默认应用与 GitHub 演示登录，不作为组件包发布渠道 | 否             |

GitHub Actions 中 `v*` 标签创建应用 GitHub Release 并附带已验证的 `.tgz`；只有独立的 `wui-react-v*` 工作流会发布到 npm。不要用“Pages 上能看到组件”判断组件包已发布，发布结果以 `npm view @w.ui/wui-react` 为准。

## 环境与包边界

仓库构建要求 Node.js **>=24.15.0 且 <25**、pnpm **11.5.2**：

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
```

源码位于 `packages/wui-react/src`。`config/library-contract.mjs` 定义原有 12 个公开组件与七个分组（layout、animation、data-display、forms、media、visualization、editor）、子路径、类型、peer、externals 与体积预算。根应用通过 `@wui` 消费源码，启动后台不能代替对 npm 包产物的验证。

| 产物                      | 路径                                       |
| ------------------------- | ------------------------------------------ |
| ESM 入口及组件子路径      | `packages/wui-react/dist/esm`              |
| CommonJS 入口及组件子路径 | `packages/wui-react/dist/cjs`              |
| strict TypeScript 声明    | `packages/wui-react/dist/types`            |
| 统一样式                  | `packages/wui-react/dist/style.css`        |
| npm 包说明与许可          | `packages/wui-react/README.md` / `LICENSE` |

包 README 从根 `NPM_README.md` 复制，LICENSE 从根许可复制。只维护这些源文件，生成文件由准备命令更新。包只包含 `dist`、README、LICENSE 和 manifest；默认后台、认证、请求基础设施和 Tracking SDK 不属于发布包。

消费端的 peer 范围为 React/React DOM >=19 <20、Ant Design >=6 <7、Framer Motion >=12 <15。包的 Node 范围与仓库工具范围不同，具体见[安装说明](../../NPM_README.md)。

## 本地构建与验证

只构建 JS、CSS 和类型声明时，**选择一条**命令：

```bash
pnpm run build:lib        # Webpack
# 或 pnpm run build:lib:vite
```

两条命令写入同一个 `packages/wui-react/dist`，只保留最后一次构建结果。

完整发布准备，推荐直接执行：

```bash
pnpm run check:lib-release
pnpm run prepare:lib:release
```

`prepare:lib:release` 默认选 Webpack；设置 `BUILD_TOOL=vite` 会改用 Vite，并依次复制 README/LICENSE、检查包契约、验证 ESM/CJS 消费和体积。`packages/wui-react` 的 `prepublishOnly` 调用同一准备命令，因此发布时使用相同的 `BUILD_TOOL`。需要分步排查时：

```bash
pnpm run build:lib
pnpm run prepare:lib:publish
pnpm run check:lib-package
pnpm run check:lib-smoke
pnpm run check:lib-size
```

Vite 分步构建将第一行换成 `pnpm run build:lib:vite`。Windows 可通过 `pnpm exec cross-env BUILD_TOOL=vite pnpm run prepare:lib:release` 选择构建器。

`build:lib` 会清理旧 dist。组件和根入口分别导出；`check:lib-smoke` 在临时消费目录验证根导出、12 个组件子路径、七个分组命名导出、样式和 manifest 解析。`check:lib-size` 使用实际 npm 打包清单检查文件、体积及禁止发布的路径。上述步骤均不向 npmjs 发布。

查看组件示例：

```bash
pnpm run storybook
```

访问 http://localhost:6006。新增组件先解除应用 imports、定义 props 类型和 Story，再更新 library-contract、包 manifest 和类型入口，运行组件目录生成与发布检查。

### pnpm 启动器异常时

如果本机 pnpm 连 `--version` 都卡住，而工作区依赖已经完整安装，可以直接调用已安装工具完成相同构建和检查，无需重新下载依赖：

```bash
node --input-type=module -e "import fs from 'node:fs'; fs.rmSync('packages/wui-react/dist', {recursive:true, force:true})"
NODE_ENV=production node node_modules/webpack-cli/bin/cli.js --config ./build/webpack/webpack.lib.js
node node_modules/typescript/bin/tsc6 --project tsconfig.lib.json
node scripts/finalize-lib-build.mjs
node scripts/prepare-lib-publish.mjs
node scripts/validate-lib-release.mjs
node scripts/validate-lib-package.mjs
node scripts/smoke-lib-package.mjs
node scripts/check-lib-package-size.mjs
```

上面的环境前缀适用于 macOS/Linux；Windows 可将 Webpack 那一条改为 `node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=production node node_modules/webpack-cli/bin/cli.js --config ./build/webpack/webpack.lib.js`。此路径仍执行完整验证。pnpm 安装或启动器问题应单独处理，不影响已验证 tarball 的 npm CLI 发布。

## 版本与发布通道

先查看本地版本、线上版本和 dist-tag：

```bash
node -p "require('./packages/wui-react/package.json').version"
npm view @w.ui/wui-react versions dist-tags --json --registry=https://registry.npmjs.org/
```

npm 已发布的同名同版本不能覆盖。发布新版本前选择合适的增量，例如：

```bash
# 补丁版本，例如 6.0.0 -> 6.0.1；不自动创建 Git tag
pnpm run release:lib:patch
# 增加兼容功能时，改用 pnpm run release:lib:minor
pnpm run check:lib-release
```

当前门禁只接受 `6.x`。稳定版本发布到 `latest`；含 `-beta.` 的预发布版本使用 `beta`，其它预发布使用 `next`。`WUI_DIST_TAG` / `npm_config_tag` 与版本通道不符会被拒绝。进入新的主版本前需要同步修改发布契约和迁移说明。

版本修改后必须重新构建、验证和打包，不能上传旧版本产物。v6 的公开入口、12 个基础组件及 peer 范围见[包用法](../../NPM_README.md)；MdxEditor、SmartVideoPlayer 和 InteractiveBook 从 editor/media 分组导入，使用前需安装对应的可选 peer。

## 登录 npmjs

```bash
npm login --registry=https://registry.npmjs.org/ --auth-type=web
npm whoami --registry=https://registry.npmjs.org/
```

第一条按终端提示打开浏览器完成登录，第二条应返回 npm 用户名。该账号需要具有 `@w.ui/wui-react` 的发布权限；登录成功不等于具有这个 scope 的写权限。npm 账号或组织启用两步验证时，发布过程还可能要求浏览器确认或 OTP。

如返回 401，重新执行登录命令；不要把认证 token 写入包源码、环境示例或文档。

### npmjs 要求发布两步验证

如果 `npm whoami` 成功，发布仍返回 `Two-factor authentication or granular access token with bypass 2fa enabled is required`，这是发布认证要求。普通网页登录不能代替发布的 2FA。

在自己的终端启用两步验证并按提示完成设置；已经启用时跳过：

```bash
npm profile enable-2fa auth-and-writes
```

然后重新发布固定 tarball，按 CLI 提示完成认证。若需要 OTP，在自己终端执行，并把占位值替换为当前验证码：

```bash
npm publish ./artifacts/npm/w.ui-wui-react-6.0.0.tgz --access public --tag latest --registry=https://registry.npmjs.org/ --ignore-scripts --otp="你的当前验证码"
```

另一种认证方式是 npmjs 中具有该包写权限、允许 bypass 2FA 的 granular access token；GitHub Actions 优先使用下面的 Trusted Publishing。无论使用哪种方式，都要在发布后通过 registry 核验，不能把登录成功或 tarball 生成当成发布成功。

## 打包并发布同一份产物

先完成上面的构建和所有检查。下面以稳定版 **6.0.0** 为例，后续发布时用本地 manifest 对应的真实版本替换文件名。

仅查看打包清单：

```bash
npm pack ./packages/wui-react --dry-run --ignore-scripts
```

生成本地 tarball：

```bash
node --input-type=module -e "import fs from 'node:fs'; fs.mkdirSync('artifacts/npm', {recursive:true})"
npm pack ./packages/wui-react --pack-destination artifacts/npm --ignore-scripts
```

生成 `artifacts/npm/w.ui-wui-react-6.0.0.tgz`；具体文件名以 npm 输出为准。`artifacts/` 被 Git 忽略，不会污染源码提交。

上传刚才生成的 tarball：

```bash
npm publish ./artifacts/npm/w.ui-wui-react-6.0.0.tgz --access public --tag latest --registry=https://registry.npmjs.org/ --ignore-scripts
```

这里的 `--ignore-scripts` 用于发布**已经完成构建和完整验证**的固定 tarball，避免上传时再次运行生命周期脚本、重建另一份包。它不代替发布前检查。使用 tarball 也不依赖全局 pnpm 启动器。

发布预发布包时，先将 manifest 改成对应版本，再完整准备和打包，例如 `6.1.0-beta.0` 应使用该文件名和 `--tag beta`。不能将稳定版本随意发布到 beta，也不能将 beta 版本放到 latest。

### 从工作区直接发布

正常 pnpm 环境也支持：

```bash
pnpm run pub
# beta 版本使用：pnpm run pub:beta
```

工作区 `prepublishOnly` 会先校验版本通道，再重新执行完整构建和包检查。该路径与 tarball 发布二选一。pnpm 可能检查 Git 工作区状态；构建完成并不意味着代码已提交，也不意味着已经发布成功。根目录 `npm publish` 不用于发布 UI 包。

## 发布后核验与使用

以 6.0.0 为例：

```bash
npm view @w.ui/wui-react@6.0.0 version dist.integrity dist.tarball --json --registry=https://registry.npmjs.org/
npm dist-tag ls @w.ui/wui-react --registry=https://registry.npmjs.org/
```

确认指定版本存在、tarball 指向 npm registry，且 `latest` 指向稳定版本。使用 npmjs 页面 `https://www.npmjs.com/package/@w.ui/wui-react` 查看公开包；CDN 页面更新可能稍慢，以 registry 响应为准。

在独立 React 项目安装，以下范围与包 peer 契约一致：

```bash
pnpm add @w.ui/wui-react@6.0.0 "react@^19" "react-dom@^19" "antd@^6" "framer-motion@^12"
```

```tsx
import OneTimePasscode from '@w.ui/wui-react/one-time-passcode'
import '@w.ui/wui-react/style.css'

export function CodeInput() {
  return <OneTimePasscode length={6} onChange={(value) => console.log(value)} />
}
```

也可使用根命名导出 `import { OneTimePasscode } from '@w.ui/wui-react'`，CommonJS 使用 `require('@w.ui/wui-react')`。样式在应用入口导入一次。

## GitHub Actions 发布

工作流为 `.github/workflows/publish-wui-react.yml`，支持 `wui-react-v*` Git tag 和手动触发。它安装 pnpm/Node/npm，校验版本与通道、拒绝重复版本，再运行包的发布生命周期。

使用 npm Trusted Publishing 时，在 npmjs 包设置中配置 GitHub publisher：仓库 `wkylin/pro-react-admin`、工作流文件 `publish-wui-react.yml`、environment `npm`，与工作流保持一致。GitHub 中也要建立对应 environment；其发布权限由仓库维护者设置。该方式使用 OIDC，与本机 `npm login` 是两种独立认证方式。

在版本和源码已提交后，用与 manifest 一致的标签触发，例如：

```bash
git tag wui-react-v6.0.0
git push origin wui-react-v6.0.0
```

不要为已通过本机发布的同一版本再次触发发布；工作流会拒绝重复版本。发布来源和标签必须对应最终包源码。

## 常见问题

| 问题                        | 处理                                                            |
| --------------------------- | --------------------------------------------------------------- |
| 401 / E401                  | 执行 npm login，再用同一 registry 的 npm whoami 核验            |
| 403 / E403                  | 检查 scope/包发布权限、2FA，以及版本是否已存在                  |
| 重复版本 / EPUBLISHCONFLICT | 升级组件包版本，重新完整构建并打包；不能覆盖已发布版本          |
| 稳定/预发布通道不匹配       | 对齐 manifest 版本与 latest/beta/next，再运行 check:lib-release |
| 找不到 dist 或类型          | 使用仓库根 prepare:lib:release，而非只执行应用 build            |
| 发布时 pnpm 卡住            | 先完成 Node 工具构建和验证，再通过固定 tarball 用 npm 发布      |
| 安装后缺少 peer / 样式      | 安装兼容的 React、Ant Design、Framer Motion，并导入 style.css   |

完整组件列表见[实现参考](../reference/PROJECT_REFERENCE.md)，源码边界见[组件目录](../components/COMPONENT_CATALOG.md)，快速预览见[快速上手](../development/GETTING_STARTED.md#本地构建-lib)。

## 6.1.0 迁移核对与固定产物

143 个目录的冻结审核保留在 `config/wui-migration-roster.json`；合并播放器后，当前有 132 个独立迁移实现进入七个分组，10 个保留在应用。`node scripts/check-wui-migration-implementation.mjs` 核对目标源码、分组契约与已构建的 ESM/CJS 导出。各组可选 peers 的精确安装范围见 [NPM_README](../../NPM_README.md)，根入口无需安装重依赖组。先在独立干净 checkout 执行 `pnpm install --frozen-lockfile`，避免共享 node_modules 掩盖 lockfile 漂移。

Webpack 与 Vite 验证后固定最终构建器的产物，再执行：

```sh
mkdir -p artifacts/npm
npm pack ./packages/wui-react --ignore-scripts --dry-run
npm pack ./packages/wui-react --ignore-scripts --pack-destination artifacts/npm
shasum -a 256 artifacts/npm/w.ui-wui-react-6.1.0.tgz
tar -tzf artifacts/npm/w.ui-wui-react-6.1.0.tgz
```

将这个固定 tarball 安装到独立消费者，验证新增分组和样式。文件数不得超过 250、压缩体积不得超过 5 MiB、解包体积不得超过 15 MiB。源码提交与 `wui-react-v6.1.0` 标签必须可追溯；本地构建或打包成功不代表已发布，必须继续核验工作流和 npm 的 version/latest。
