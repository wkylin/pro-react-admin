# SmartVideoPlayer 改进建议与对标分析

本文档用于：

- 评估当前 `SmartVideoPlayer` 组件组的成熟度
- 对标常见开源播放器方案的能力差距
- 给出可落地的改进路线（按投入/收益分级）

> 结论先行：当前实现更像“业务内可控的轻量播放器 + 统一 embed 容器”，优势是贴合业务与交互灵活；但与成熟开源播放器相比，在媒体格式/流媒体/字幕体系/可访问性/测试体系/插件生态方面还有明显差距。

---

## 1. 当前实现的优势

- **业务适配强**：
  - 懒播放 + mini 小窗 + PiP 的组合更偏“信息流/内容页”的体验。
  - 设置面板 portal 定位、用户手势播放等细节处理贴近真实业务场景。

- **模式清晰**：
  - html5 可控；embed/youtube 明确“不做假控制”，降低误导。

- **工程可维护**：
  - 通过 `provider` 将页面逻辑下沉到组件内，页面只做数据驱动。
  - `config/onConfigChange` 支持外部受控，便于“全局设置/记忆偏好”。

---

## 2. 与开源方案对比：不足与影响

下面以常见开源方案为参照（不强绑定某一个库）：

- 轻量 UI 封装类：Plyr
- HTML5 能力增强类：video.js
- 流媒体/自适应码率：hls.js（HLS）、Shaka Player（DASH/HLS/DRM）

### 2.1 媒体格式与流媒体

**不足**

- 当前主要面向 `mp4`（或浏览器原生支持的格式）。
- 不支持 HLS (`.m3u8`) / DASH (`.mpd`) 自适应码率。

**影响**

- 长视频/弱网体验差（无法自动切码率）。
- 直播/点播标准流无法直接接入。

**方案**

- 增加可选能力（不强依赖）：
  - `provider="html5"` 下如果 `src` 以 `.m3u8` 结尾：可按需集成 `hls.js`。
  - 若要 DASH/DRM：评估 Shaka Player。
- 设计建议：做成“可插拔 adapter”，避免把复杂逻辑塞进 SmartVideoPlayer。

### 2.2 字幕/多语言/可访问性（A11y）

**不足**

- 当前仅支持 `<track>` 的基础挂载，但缺少字幕 UI（开关、样式、语言选择）。
- 键盘快捷键、ARIA 细节、焦点管理、屏幕阅读器体验还不完整。

**影响**

- 无法满足可访问性要求或国际化产品要求。

**方案**

- 增加字幕设置：
  - 在设置面板中加入字幕开关/语言选择（读取 `textTracks`）。
- 增加键盘支持：
  - space 播放/暂停、左右方向键快进快退、上下音量、f 全屏、m 静音。
- 使用更严格的可访问性检查：
  - Playwright + axe-core（或 jest-axe）做基础 A11y 测试。

### 2.3 进度条体验（拖拽、预览、缓冲）

**不足**

- 仅基础 range slider，缺少：
  - 缓冲区展示（buffered ranges）
  - 拖拽预览时间/缩略图
  - 拖拽时暂停/松开继续

**影响**

- 体验与主流播放器有差距，尤其长视频。

**方案**

- buffered 可视化：读取 `video.buffered`，用一条底层条展示。
- 拖拽预览：pointermove 时显示浮层时间（可先不做缩略图）。
- 节流：用 `requestAnimationFrame` 或节流 timeupdate，避免频繁 setState。

### 2.4 错误处理与可观测性

**不足**

- 目前有 playError 文案，但缺少统一的错误类型/错误码与上报。
- embed 失败原因（CSP/XFO）只能依赖控制台。

**方案**

- 统一错误结构：
  - `onError?: (err) => void` 供页面/埋点系统接入。
- embed 失败兜底：
  - 监听 iframe `onLoad` + 超时检测（无法精确判断 CSP，但可提示“可能被禁止嵌入，建议新窗口打开”）。

### 2.5 “可控的 iframe 播放器”能力

**不足**

- youtube/vimeo 等 iframe 可通过官方 API 控制（播放/暂停/获取时间），但当前未接入。

**影响**

- embed 模式只能展示，无法实现统一体验（比如统一的播放控制、统一的懒播放）。

**方案（分层实现，避免一次性膨胀）**

- Phase 1：保持现状（不做假控制）+ 提供新窗口打开。
- Phase 2：对 YouTube/Vimeo 增加可选 adapter：
  - YouTube IFrame Player API
  - Vimeo Player SDK
  - 通过 postMessage 与事件回调统一成：`play/pause/getCurrentTime/setVolume/isMuted` 等接口
- Phase 3：embed provider 允许声明 `embedController`：
  - `controller: 'none' | 'youtube' | 'vimeo' | ...`

### 2.6 测试与回归保障

**不足**

- UI/交互复杂，容易出现回归（比如设置面板定位、TDZ、CSS 污染）。

**方案**

- Playwright 加回归用例（建议至少覆盖）：
  - html5 模式：播放/暂停、静音/调音量、进度条拖拽、全屏、PiP（可选）
  - mini：滚出视口进入 mini、关闭/恢复
  - settings：打开/关闭、定位不裁切
  - embed：不遮挡 iframe、能“新窗口打开”

---

## 3. 可落地的改进路线（建议优先级）

### P0（高收益/低风险）

- 键盘快捷键与焦点管理
- buffered 条展示 + 拖拽预览时间
- 统一 `onError` / `onEvent` 回调用于埋点与问题定位
- embed 失败兜底提示 + 一键新窗口打开（已具备基础）

### P1（中收益/中成本）

- HLS（hls.js）可选接入
- 字幕 UI（开关/样式/语言）
- 更细的状态机（避免 flags 互相打架：userPaused/autoPaused/inView/isPiP/mini）

### P2（高收益/高成本）

- YouTube/Vimeo 官方 API 接入，做可控 iframe adapter
- DASH/DRM（Shaka）
- 缩略图预览、章节、播放列表更完整体验

---

## 4. 结语

当前版本已经覆盖了“内容页播放器”的关键体验（懒播放/mini/PiP/设置/多 provider）。
下一步建议优先补齐：A11y、键盘、buffered/拖拽体验、测试回归；再按业务需要选择是否引入 HLS 或 iframe 官方 API。
