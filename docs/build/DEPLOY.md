# GitHub Pages 部署

GitHub Pages 的 CI 部署由 `.github/workflows/deploy-gh-pages.yml` 管理。该工作流在推送到 `main` 或手动触发时运行。

## CI 流程

工作流使用 Node.js 24 和 pnpm 11.5.2，依次执行：

1. 使用 `pnpm run build:production` 构建主应用，并设置 Pages 子路径 `/pro-react-admin/`。
2. 使用 `pnpm run build-storybook` 构建 Storybook，并设置 base 路径 `/pro-react-admin/storybook/`。
3. 合并两个产物并上传给 GitHub Pages 部署 Action。

当前在线路径：

- 主应用：<https://wkylin.github.io/pro-react-admin/>
- Storybook：<https://wkylin.github.io/pro-react-admin/storybook/>

## 本地检查

检查主应用 Pages base：

```bash
pnpm run build:pages
pnpm run preview:pages
```

完整的构建目录、环境变量和预览验证命令见 [Vite 构建](./VITE_BUILD.md)。

## 手动部署脚本

`pnpm run deploy` 会运行 `scripts/deploy-gh.js`，在本地构建应用和 Storybook 后，直接将产物推送到 `gh-pages` 分支。它需要本机具备 GitHub 推送权限。自动部署工作流不调用这个脚本。

