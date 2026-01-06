# ESLint 命令与排查指南

本文档记录在项目中修复 ESLint 问题时常用的命令、统计方法、常见规则错误的排查和修复思路，方便日后自查与排错。

---

## 环境说明

- 项目为 ESM（package.json 中 `type":"module"`），ESLint 使用 flat config（注意插件/extends 的加载）。
- Node / npx 可用；以下命令在 Windows (Git Bash / WSL) 或类 Unix 环境下均可运行。

---

## 常用命令（快速参考）

- 单文件检查（显示所有问题）：

```
npx eslint "src/pages/chatgpt/index.jsx" || true
```

- 单文件只显示 errors（quiet 模式，隐藏 warnings）：

```
npx eslint --cache --quiet "src/pages/chatgpt/index.jsx" || true
```

- 尝试对单文件自动修复：

```
npx eslint --cache --fix "src/pages/chatgpt/index.jsx" || true
```

- 全量扫描并将文本输出保存到文件：

```
npx eslint "src/**/*.{js,jsx,ts,tsx}" 2>&1 | tee eslint-report-full.txt
```

- 全量输出为 JSON（便于后续统计）：

```
npx eslint --format json "src/**/*.{js,jsx,ts,tsx}" -o eslint-report.json
```

- 在 debug 模式下运行（用于排查 flat-config / 插件加载问题）：

```
npm run eslint -- --debug "src/**/*.{js,jsx,ts,tsx}"
```

- 如果 package.json 中有自定义脚本（例如 `lint:errors`），可以直接运行：

```
npm run lint:errors
```

---

## 生成按文件排序的问题统计（推荐 JSON 方法）

以下步骤产生一个按问题数降序的文本文件 `eslint-by-file.txt`：

1. 生成 JSON 报告：

```
npx eslint --format json "src/**/*.{js,jsx,ts,tsx}" -o eslint-report.json
```

2. 用 Node 脚本统计并输出为可读列表（在项目根运行）：

```
node -e "const r=require('./eslint-report.json'); const m={}; r.forEach(f=>{const p=f.messages.length; if(p) m[f.filePath]=(m[f.filePath]||0)+p}); const out=Object.entries(m).sort((a,b)=>b[1]-a[1]).map(([f,c])=>c+'\t'+f).join('\n'); require('fs').writeFileSync('eslint-by-file.txt',out); console.log('wrote eslint-by-file.txt')"
```

结果文件 `eslint-by-file.txt` 格式为：

```
11	C:/.../src/components/KeepAlive/index.jsx
5	C:/.../src/components/stateless/ReMarkdown/index.jsx
...
```

此法最精确（区分 errors/warnings 可在脚本中改进），也方便后续自动化处理。

---

## 快速文本解析方法（替代）

如果不想生成 JSON，可以将完整文本输出并用 grep/awk/sed 统计（适合临时检查）：

```
npx eslint "src/**/*.{js,jsx,ts,tsx}" 2>&1 | tee eslint-report.txt
# 示例（在 Git Bash / WSL）
grep -E "^\s+\d+:\d+\s+" eslint-report.txt | sed -E 's/^[ \t]*([0-9]+):([0-9]+)[ \t]+(error|warning).+\s+(.+)$/\4/' | sort | uniq -c | sort -rn
```

注意：该方法对输出格式敏感，仅作快速估算。

---

## 常见错误类型与修复思路

下面列出会反复出现的问题类型与对应的快速修复策略。

1. react-hooks/purity（impure 在 render 中调用，例如 `Date.now()`）

- 原因：组件或变量在渲染期调用了非纯函数（Date.now、Math.random、DOM 读取等）。
- 修复：将不稳定的值移到模块顶层或使用 `useMemo` / `useRef` / `useState` 初始化一次。
  - 例如：不要在组件顶层的渲染直接 `return String(Date.now()).slice(-6)`，改为 `const idRef = useRef(Date.now())` 或把 helper 提升到模块顶层。

2. react-hooks/set-state-in-effect（在 effect 中同步调用 setState）

- 原因：在 effect 的主体直接同步调用 setState，可能导致级联渲染。
- 修复：将 setState 推迟到微任务或回调中，例如：

```
// 避免：
useEffect(() => {
  setState(someValue)
}, [deps])

// 建议：
useEffect(() => {
  let active = true
  Promise.resolve().then(() => {
    if (!active) return
    setState(someValue)
  })
  return () => { active = false }
}, [deps])
```

或把逻辑重写为条件渲染以避免不必要的 setState。

3. refs 在 render 中读写（impure / 不安全）

- 原因：在渲染期访问 DOM（例如 `ref.current.innerText`）或创建 DOM 节点。
- 修复：把 DOM 访问/初始化放到 `useEffect` 中，用 state 将结果暴露给渲染。

4. hooks 条件调用（rules-of-hooks）

- 原因：基于条件或 try/catch 在不同分支调用 Hook。
- 修复：始终在组件顶层调用 Hook。若需要可选上下文，提供 `useOptionalXxx` 返回 null/默认值，而不要在条件内调用 Hook。

5. no-undef / 未声明变量

- 原因：变量拼写错误或重命名后未同步更新。
- 修复：按 ESLint 报错定位（文件+行），补充 `import` 或把变量名修正；不要滥用 /_ global _/，除非确实需要。

---

## 捕获和保存诊断输出

- 建议把全量输出保存为文本：

```
npx eslint "src/**/*.{js,jsx,ts,tsx}" 2>&1 | tee eslint-report-full.txt
```

- 若要将 JSON 报告上传/分析，使用 `--format json -o file`：

```
npx eslint --format json "src/**/*.{js,jsx,ts,tsx}" -o eslint-report.json
```

---

## auto-fix 与限制

- 自动修复：`npx eslint --fix <file>` 能修复样式和部分简单问题（如 semi、quotes、no-unused-vars 的部分情况）。
- 注意：逻辑错误、Hook 使用错误、refs/purity 等通常需要手动修改代码。

---

## 建议加入的 package.json 脚本

在 `package.json` 中加入以下脚本便于复用：

```json
"scripts": {
  "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
  "lint:fix": "eslint 'src/**/*.{js,jsx,ts,tsx}' --fix",
  "lint:errors": "eslint 'src/**/*.{js,jsx,ts,tsx}' --quiet"
}
```

- `lint:errors` 会只输出 errors（不显示 warnings），适合 CI 或快速定位必须修复的问题。

---

## 调试 flat config / 插件加载问题

- 如果 ESLint 报错提示 plugin 配置无法加载或 `extends` 无效，先使用 debug 模式查看加载过程：

```
npm run eslint -- --debug "src/**/*.{js,jsx,ts,tsx}"
```

- 确认 `eslint` 版本与插件版本兼容（flat config 与 legacy `extends` 行为不同，需要显式注册插件）。

---

## 故障排查小贴士

- 当 ESLint 报错但你确认代码已改：先清掉缓存重新运行：

```
npx eslint --no-cache "<files>"
```

- 对单文件调试更快：

```
npx eslint --cache "path/to/file.jsx" || true
```

- 如果需要把所有文件问题导出并在本地用编辑器跳转，优先使用 JSON 输出并在 VS Code 中安装 ESLint 扩展加载 `eslint-report.json`。

---
