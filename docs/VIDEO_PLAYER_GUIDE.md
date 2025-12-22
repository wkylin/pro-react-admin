# SmartVideoPlayer 开发与使用指南

本文档面向项目内的 `SmartVideoPlayer`（视频页播放器组件），用于说明：

- 组件能力与整体架构
- HTML5 / YouTube / 通用 Embed 三种模式的差异
- 配置项（受控/非受控）与对接方式
- 常见问题与踩坑记录（本次迭代中实际遇到的问题）

> 适用范围：`src/components/stateless/SmartVideoPlayer/` 以及 `src/pages/video/`。

---

## 1. 组件目标与边界

### 1.1 目标

- 提供接近 YouTube 风格的播放器控制条（按钮 + tooltip + 统一布局）。
- HTML5 video 模式下支持：
  - 播放/暂停、快进/快退
  - 音量控制（滑杆 + 静音切换 + 音量记忆）
  - 进度条与时间显示
  - 全屏与画中画（PiP）
  - HLS（`.m3u8`）可选接入（通过 `hls.js`，浏览器支持时自动启用）
  - 字幕 UI（设置面板里可开关/选择字幕轨道）
  - 懒播放（IntersectionObserver）与滚出视口的 mini 小窗
  - 设置面板（Portal 渲染，避免被父容器裁切）
- YouTube / Embed 模式下：以 `iframe` 方式嵌入展示，并提供「新窗口打开」与设置入口。

### 1.2 边界（刻意不做/不承诺）

- **Embed / YouTube iframe 并不一定可控**：默认不提供播放/暂停/进度/音量等“看似可控但实际上不可控”的 UI。
- 对于第三方站点嵌入：可能被 CSP 或 `X-Frame-Options` 禁止 iframe。
- 不提供 DASH/DRM、广告、章节、缩略图等高级功能（可作为后续扩展）。

---

## 2. 代码位置与关键文件

- 组件：`src/components/stateless/SmartVideoPlayer/index.jsx`
- 样式：`src/components/stateless/SmartVideoPlayer/index.module.css`
- HTML5 video Hook：`src/components/hooks/useVideo/index.tsx`
- 示例页面：`src/pages/video/index.jsx`

---

## 3. Provider 模式说明

`provider` 用于选择渲染策略：

### 3.1 `provider="html5"`

- 渲染 `<video>` 元素。
- 启用 `useVideo(..., { enabled: true })`，负责订阅事件、维护状态（paused/muted/currentTime/volume 等）。
- 启用懒播放 / mini / PiP / 进度条 / 音量条等完整控制条。

### 3.2 `provider="youtube"`

- 渲染 `<iframe>`，src 为 `https://www.youtube.com/embed/${youtubeId}?...`。
- 设置项 `ytControls` 控制 YouTube 原生控制条是否显示。
- 控制条不展示 play/pause、进度、音量等（避免误导）。
- 提供「新窗口打开」：打开 `https://www.youtube.com/watch?v=${youtubeId}`。

### 3.3 `provider="embed"`

- 渲染 `<iframe>`，src 由 `embedUrl` 或 `getEmbedUrl(config)` 生成。
- 控制条不展示 play/pause、进度、音量等（避免误导）。
- 提供「新窗口打开」：优先打开 `externalUrl`，否则打开 `sourceUrl`，再否则 fallback 为 `embedUrl`。

---

## 4. Props（使用说明）

> 以实际实现为准；此处描述的是本次迭代后的关键对外接口。

### 4.1 基础 Props

- `provider?: 'html5' | 'youtube' | 'embed'`
- `title?: string`

### 4.2 HTML5 video 相关

- `src?: string`：支持 mp4；当为 `.m3u8` 时，会尝试走 HLS 播放（原生支持则直接播，否则使用 `hls.js`）。
- `trackSrc?: string`：字幕 vtt 地址（可选）。
- `trackLang?: string`：字幕语言（默认 `en`）。

### 4.3 YouTube 相关

- `youtubeId?: string`

### 4.4 Embed 相关

- `embedUrl?: string`：直接传 iframe src。
- `getEmbedUrl?: (config) => string`：用配置动态生成 iframe src（更通用）。
- `externalUrl?: string`：**最高优先级**，用于「新窗口打开」按钮。
- `sourceUrl?: string`：当没有 externalUrl 时使用（例如“源站播放页”）。

### 4.5 配置（受控/非受控）

- `initialConfig?: Partial<Config>`：非受控模式下的初始值。
- `config?: Config`：受控模式配置。
- `onConfigChange?: (nextConfig: Config) => void`：受控模式的变更回调。

配置项（当前）：

- `lazyPlay: boolean`：懒播放（滚出视口自动暂停）
- `miniPlayer: boolean`：滚出视口右下角 mini 小窗
- `autoPlay: boolean`：自动播放
- `autoMute: boolean`：自动静音（为自动播放策略服务）
- `playbackRate: number`：播放速度（仅 HTML5 生效）
- `ytControls: boolean`：YouTube 控制条开关（仅 YouTube 生效）

### 4.6 事件回调（埋点/排障）

- `onEvent?: (name: string, detail?: any) => void`
- `onError?: (payload: { message: string; provider: string; src?: string; youtubeId?: string; embedUrl?: string; ... }) => void`

`onEvent` 事件名（目前实现）：

- `play` / `pause`
- `seek`（绝对定位） / `seekRelative`（相对跳转）
- `volume` / `mute`
- `fullscreen`
- `captions`（字幕开关/切换）
- `pipEnter` / `pipLeave` / `pipToggle`
- `openExternal`
- `embedLoad` / `embedTimeout`
- `hlsNative` / `hlsAttach` / `hlsError`
- `error`（与 `onError` 同步触发）

### 4.7 键盘快捷键（需先让播放器获得焦点）

播放器外层容器已支持 `tabIndex=0`：可以用 Tab 聚焦，或鼠标点一下播放器区域再按键。

- Space / K：播放/暂停
- ← / →：后退/前进 5 秒
- ↑ / ↓：音量 +5% / -5%
- M：静音切换
- F：全屏
- P：画中画（PiP）
- S：打开/关闭设置
- Esc：关闭设置
- Embed/YouTube 模式：O 打开「新窗口」

---

## 5. 示例

### 5.1 HTML5 模式

```jsx
<SmartVideoPlayer provider="html5" src={trailerSource} title="预告片" />
```

### 5.2 YouTube 模式

```jsx
<SmartVideoPlayer
  provider="youtube"
  youtubeId="xJyWbjATtIE"
  title="科幻预告片"
  initialConfig={{ autoPlay: true, autoMute: true, ytControls: true }}
/>
```

### 5.3 通用 embed（直接传 embedUrl + 外部打开）

```jsx
<SmartVideoPlayer
  provider="embed"
  title="Embed 示例"
  embedUrl="https://player.vimeo.com/video/76979871?autoplay=1&muted=1"
  externalUrl="https://vimeo.com/76979871"
/>
```

### 5.4 通用 embed（用 getEmbedUrl 动态拼接）

```jsx
<SmartVideoPlayer
  provider="embed"
  title="动态 Embed"
  sourceUrl="https://example.com/watch/123"
  getEmbedUrl={(cfg) => {
    const base = 'https://example.com/embed/123'
    const params = new URLSearchParams({
      autoplay: cfg.autoPlay ? '1' : '0',
      muted: cfg.autoMute ? '1' : '0',
    })
    return `${base}?${params.toString()}`
  }}
/>
```

### 5.5 受控 config（推荐用于外部统一设置）

```jsx
const [playerConfig, setPlayerConfig] = useState({
  lazyPlay: true,
  miniPlayer: true,
  autoPlay: true,
  autoMute: true,
  playbackRate: 1,
  ytControls: true,
})

<SmartVideoPlayer
  provider={provider}
  src={src}
  config={playerConfig}
  onConfigChange={setPlayerConfig}
/>
```

---

## 6. 开发流程（本次迭代实践总结）

这部分是“从需求到稳定上线”的流程复盘，方便后续继续维护。

### 6.1 需求拆分

1. UI 风格：参考 YouTube（按钮图标、tooltip、布局、hover 行为）
2. 行为增强：IntersectionObserver 懒播放、mini、小窗恢复/关闭
3. 兼容性：autoplay 策略（muted 兜底）、play() Promise 错误处理
4. 设置面板：Portal 避免父容器裁切；定位与最大高度策略
5. provider 抽象：统一到 SmartVideoPlayer 内部，支持 youtube + 通用 embed

### 6.2 关键问题与处理方式

- 自动播放不触发：
  - 浏览器通常要求 muted 才允许 autoplay。
  - 方案：在 play 前同步确保 `video.muted = true`（当 autoMute 打开时），并在 `canplay/loadedmetadata` 时机触发。

- 切换播放列表点击后不播放：
  - `<source src>` 更新不等价于媒体已加载。
  - 方案：切源后执行 `video.load()`；并在用户点击手势内调用播放（避免被策略拦截）。

- 设置面板被裁切/高度不对：
  - 父容器 overflow/布局容易裁切绝对定位弹层。
  - 方案：Portal 到 `document.body`，再用按钮 `getBoundingClientRect()` 计算 fixed 定位。
  - 高度：不要固定高度，使用“靠近按钮可用空间”的 maxHeight，并让内部滚动区滚动。

- TDZ（Cannot access ... before initialization）：
  - 常见于 hook 解构出来的函数在声明前被引用。
  - 方案：确保依赖函数（例如 `unmute`）解构完成后再创建 callback。

- CSS Module 污染导致页面异常：
  - 典型问题：写了裸 `article { ... }` 这样的全局选择器。
  - 方案：所有选择器都挂在 module 根 class 下（例如 `.section-center article`）。

- Embed 模式控件遮挡原站点播放器控制区：
  - 方案：embed 模式不渲染底部覆盖式控制条，改为右上角小工具条，并用 pointer-events 让 iframe 交互不被拦截。

---

## 7. 已知限制与建议

- 站点是否可嵌入：被 CSP / `X-Frame-Options` 限制时 iframe 会失败。
  - 建议：提供 `externalUrl/sourceUrl` 的“新窗口打开”作为兜底路径。

- 若需要“可控的 YouTube/Vimeo”：
  - 建议：接入官方 Player API（iframe + postMessage），做成 provider adapter（见改进文档）。

---

## 8. 调试建议

- HTML5 模式：
  - 查看 `video.play()` 的 Promise 报错（策略/AbortError/网络错误）。
  - 切源后是否执行 `load()`。

- Embed 模式：
  - 如果 iframe 空白：先看浏览器控制台是否提示 `refused to display` / CSP。
  - 优先保证 “新窗口打开” 路径可用。
