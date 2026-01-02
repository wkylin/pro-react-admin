# bigscreen-charts-reinit 事件说明与升级指南

## 这是什么？
`bigscreen-charts-reinit` 是一个 **BigScreen（大屏）页面专用** 的全局浏览器事件：

```js
window.dispatchEvent(new CustomEvent('bigscreen-charts-reinit'))
```

它的语义不是“重新 init ECharts 实例”，而是：

> **告诉所有大屏里的图表：页面缩放/布局已基本稳定，请做一次“安全的自适应”（优先 `chart.resize()`）。**

目前该事件不携带 payload（没有 detail），属于纯信号型事件。

---

## 为什么需要它？（BigScreen 场景的特殊性）
BigScreen 里存在这些会影响 ECharts 容器尺寸/可见性的因素：

1) **previewFitScale 缩放逻辑**
- BigScreen 会调用 `previewFitScale(...)`，内部会计算比例并对容器做 transform / 尺寸调整。
- transform/尺寸变化发生在时间线上是“先渲染 DOM，再计算/再缩放”。

2) **KeepAlive 激活/失活**
- 页面被 KeepAlive 缓存时，重新进入页面会触发 `useActivate`。
- 激活时容器可能刚从不可见/旧缩放状态切回可见状态。

3) **路由切换到 /big-screen**
- 路由进入时容器尺寸、字体、布局往往还在抖动/稳定中。

ECharts 的已知行为：
- **初始化时容器尺寸为 0 或尺寸不稳定**，容易出现空白、布局错位。
- **容器尺寸发生变化后**（尤其是缩放/激活带来的变化），需要显式 `chart.resize()` 才能正确重排。

你们目前的通用封装 `EChart` 已经做了两件关键事：
- 如果容器宽高为 0，会通过 `ResizeObserver` **延迟 init**，直到可测量。
- 支持 `ResizeObserver` **自动 resize**。

但在 BigScreen 里，仍然可能出现：
- 容器“看起来变了”（transform/激活），但 `ResizeObserver` 触发时机不够可靠/不够晚。
- 所以 BigScreen 需要一个“布局稳定点”的信号，让图表再做一次最终 `resize()`。

---

## 目前谁在触发它？（触发方）
触发方是 BigScreen 页面：[src/pages/bigScreen/index.jsx](../src/pages/bigScreen/index.jsx)

关键点：
- `scheduleChartsReinit(delayMs)` 会 **去重**：同一时间窗口内多次调用只触发最后一次。
- 触发前会先 `calcRate()`，尽量保证缩放计算完成。

触发时机（当前三类）：
1) 初次挂载：`calcRate()` + `windowResize()`（此处不 dispatch event）
2) KeepAlive 激活：将容器 transform 设为 `scale(1, 1)`，再延迟 dispatch
3) 路由进入 `/big-screen`：延迟 dispatch

---

## 目前谁在监听它？（消费方）
### 1) 通用兼容组件（推荐使用）
`EChartsCommon`：[src/components/stateless/EChartsCommon/index.tsx](../src/components/stateless/EChartsCommon/index.tsx)

当前策略（很关键）：
- **优先 `resize()`**（避免 dispose/remount 导致的闪烁）
- 只有在没有实例（极端情况）才会通过 `key` 变化触发 remount

### 2) 个别图表组件（已改为 resize-only）
- `PieNestCharts`：[src/components/stateless/PieNestCharts/index.jsx](../src/components/stateless/PieNestCharts/index.jsx)
- `DonutCharts`：[src/components/stateless/DonutCharts/index.jsx](../src/components/stateless/DonutCharts/index.jsx)

当前都是：监听事件 -> `chartHandleRef.current?.resize?.()`，不再 remount。

---

## 这几个“场景”的关系是什么？（时序视角）
可以把 BigScreen 里图表状态变化分成三个阶段：

1) **页面首次进入（mount）**
- React 渲染 DOM
- `previewFitScale` 初始化并计算缩放
- 图表可能会 init（或延迟 init）

2) **页面激活（KeepAlive activate）**
- DOM 已存在，但可能刚从隐藏/旧缩放状态恢复
- BigScreen 会触发一次 `bigscreen-charts-reinit`
- 图表收到信号后执行一次 `resize()`，让布局贴合当前缩放

3) **路由切回 /big-screen**
- 类似激活：容器尺寸/缩放在短时间内稳定
- BigScreen 会延迟触发一次 `bigscreen-charts-reinit`
- 图表执行 `resize()` 做最终对齐

一句话：
- `bigscreen-charts-reinit` 是 BigScreen 的“布局稳定点广播”。

---

## 以后所有 ECharts 图表都要基于它再次封装吗？
不建议把它当作“全局通用机制”。建议分层：

### A. 普通页面（非大屏）
- **只用 `EChart` 封装**即可：它已经负责 init/resize/option 应用。
- 不应依赖 `bigscreen-charts-reinit`，避免隐式耦合 BigScreen。

### B. BigScreen 页面内的图表
- 推荐两种方式之一：
  1) 用 `EChartsCommon`（它已经内置监听 + resize 优先策略）
  2) 直接用 `EChart`，并在组件内监听 `bigscreen-charts-reinit` -> 调 `resize()`

### C. “再封装”的正确方向
更好的再封装点通常是：
- 统一的 `EChart`（生命周期、ResizeObserver、setOption、事件绑定）
- BigScreen 专用的“激活/缩放同步策略”（监听该事件并调用 resize）

也就是说：
- `EChart` 是通用底座
- `bigscreen-charts-reinit` 是 BigScreen 的“外部环境信号”

---

## 升级/迁移规范（强约束）
1) **禁止**在 `bigscreen-charts-reinit` 上做 dispose/remount
- 目标是：只 `resize()`，不销毁实例。
- remount 会导致画布闪烁、tooltip 状态丢失、动画重复。

2) 新增图表组件优先：
- 普通页面：直接用 `EChart`
- BigScreen：用 `EChartsCommon` 或在组件内监听事件并 `resize()`

3) 事件只解决“布局稳定点”问题
- 不要把数据刷新、主题切换等逻辑塞进该事件。

---
