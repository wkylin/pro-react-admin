## 构建瘦身与体积分布基线

### 目标
- 通过 Vite 构建产出组件库，并按需生成体积分布报告，作为后续瘦身的基线。
- 保持默认构建轻量，只有显式开启分析时才生成报告文件。

### 使用方式
- 常规库构建：
```bash
npm run build:lib
```
- 生成 bundle 体积分布报告（treemap，含 gzip/brotli）：
```bash
npm run build:lib:analyze
# 等价命令：npm run analyze:lib
```
输出：`dist-lib/bundle-report.html`。

### 实现要点
- `vite.config.lib.ts` 中集成 `rollup-plugin-visualizer`，用 `USE_ANALYZE=1` 控制是否启用，避免常规构建额外开销。
- 报告文件随构建生成，可用于 PR 附件或本地对比。

### 后续可选
- 在 CI 中为 release 或特定分支自动生成报告并上传为构建工件。
- 配置 size budget（如限制单 bundle 体积）并在超限时失败。
