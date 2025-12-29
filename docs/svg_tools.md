# svg_tools 使用说明

合并后的脚本位于 `scripts/svg_tools.cjs`，用于检查和修复 `src/pages/svgViewer/index.jsx` 中内联 `SVG_SOURCE` 的常见问题（标签未闭合、`<br>` 标签缺斜杠等），以减少手动维护多个小脚本的开销。

前提

- 需要在项目根目录下运行，且系统上安装有 Node.js。

默认目标文件

- `src/pages/svgViewer/index.jsx`

用法

基本格式：

```bash
node scripts/svg_tools.cjs <command> [--file=PATH]
```

命令

- `check`：分析 `SVG_SOURCE` 中常见标签计数，定位最后的 `<g>`、`</g>`、`</svg>` 出现位置，并尝试检测未闭合的 `<g>`。仅输出信息，不修改文件。

- `replace-br`：将 `SVG_SOURCE` 内的所有 `<br>` 替换为自闭合的 `<br/>`，会直接修改文件。

- `fix-unclosed-g`：统计 `<g>` 的开闭差异，并在 `</svg>` 之前插入缺失数量的 `</g>` 来尝试补齐。此命令会修改文件，建议先备份或先运行 `check` 查看差异。

示例

检查（默认文件）：

```bash
node scripts/svg_tools.cjs check
```

对指定文件做替换 `<br>`：

```bash
node scripts/svg_tools.cjs replace-br --file=src/pages/svgViewer/index.jsx
```

自动插入缺失 `</g>`：

```bash
node scripts/svg_tools.cjs fix-unclosed-g
```

注意事项

- 修改类命令会直接写回文件，请在执行前确认 Git 工作区干净，或手动创建备份。
- `fix-unclosed-g` 是一个启发式修复：它通过统计差异并在 `</svg>` 前插入缺失的 `</g>`，适用于常见的“少一个闭合标签”场景，但不能保证修复所有结构性错误。建议先运行 `check` 并人工确认上下文后再执行自动插入。
- 如果你已将内联 SVG 移出源码并替换为静态资源（例如放到 `public/`），可以不再使用此脚本。

示例工作流建议

```bash
# 查看问题
node scripts/svg_tools.cjs check

# 如果只有 <br> 问题：
node scripts/svg_tools.cjs replace-br

# 如果缺少闭合 <g> 且你已确认：
node scripts/svg_tools.cjs fix-unclosed-g

# 查看修改并提交
git add -p
git commit
```

问题反馈

- 如果脚本没有覆盖到你遇到的问题，请把 `src/pages/svgViewer/index.jsx` 的小片段（敏感信息打码）贴出来，我可以帮你改进脚本或手动修复。
