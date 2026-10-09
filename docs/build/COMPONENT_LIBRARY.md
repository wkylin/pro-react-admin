# 组件库构建与发布

仓库同时包含管理应用和可发布组件库 `@w.ui/wui-react`。组件库源码位于 `src/components`，公开入口由 `src/lib` 明确维护，构建配置使用 Vite。

## 包导出路径

| 消费方导入 | 源入口 | 构建命令 | 发布路径 |
| --- | --- | --- | --- |
| `@w.ui/wui-react` | `src/lib/index.ts` | `pnpm run build:lib` | ESM/UMD 根入口 |
| `@w.ui/wui-react/core` | `src/lib/core.ts` | `pnpm run build:lib:entries` | `./core` |
| `@w.ui/wui-react/stateful` | `src/lib/stateful.ts` | `pnpm run build:lib:entries` | `./stateful` |
| `@w.ui/wui-react/stateless` | `src/lib/stateless.ts` | `pnpm run build:lib:entries` | `./stateless` |
| `@w.ui/wui-react/tracking` | `src/lib/tracking/index.ts` | `pnpm run build:lib:entries` | `./tracking` |
| `@w.ui/wui-react/style.css` | 构建时汇总 | `pnpm run build:lib` | 样式文件 |

根入口和分类入口由同一套 Vite 工具链生成，分别满足聚合导入和按类别导入。包名、版本、`exports` 以根目录 `package.json` 为准；发布脚本从该配置生成发布目录的 package 元数据。

## 组件开发与公开导出

1. 实现组件并确认其依赖适合发布。
2. 更新 `src/lib/index.ts`；需要子路径导入时，同时更新对应分类入口。
3. 检查 `package.json#exports` 与 `vite.config.lib*.ts` 指向的产物一致。
4. 运行 `pnpm run check:components-index` 检查内部组件索引；它与 npm 的 `src/lib` 公开 API 是两套不同的导出清单。

应用内部导入可使用 `src/components` 的 barrel；外部消费者只能使用 `src/lib` 暴露的 API。

## 构建和本地检查

```bash
pnpm run build:lib
pnpm run build:lib:entries
pnpm run prepare:lib:publish
```

构建产物写入 `dist-lib/`。发布前检查生成的 `dist-lib/package.json` 和产物，再执行：

```bash
pnpm publish ./dist-lib --access public --dry-run
```

确认包内容、版本和导出路径后，使用仓库的 `pnpm run pub` 脚本正式发布。该步骤需要 npm 发布权限；发布前应按项目发布流程更新根 `package.json` 的版本号。

