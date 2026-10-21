# InteractiveBook 翻页引擎研究与实现

本文记录 `InteractiveBook` 从 `page-flip` 迁移到仓库内翻页引擎所依据的源码研究，以及当前实现的接口和验证范围。外部源码链接指向研究时的 GitHub `master`；可复核的依赖版本是原项目锁定的 `page-flip@2.0.7`。GitHub 的 `master` 不是不可变版本标记，后续研究应先核对链接内容与该版本是否仍一致。

## 来源与许可

原引擎是 [Nodlik/StPageFlip](https://github.com/Nodlik/StPageFlip)。其 [package.json](https://github.com/Nodlik/StPageFlip/blob/master/package.json) 将 npm 包命名为 `page-flip`，版本为 `2.0.7`；原项目的 `pnpm-lock.yaml` 也锁定这一版本。[许可证](https://github.com/Nodlik/StPageFlip/blob/master/LICENSE)为 MIT，版权归属为 `Copyright (c) 2020 Nodlik`。若将上游代码或其大量衍生内容带入其他源码，需要按许可证保留版权与许可文本。本仓库的新几何模块采用独立的折线与平面反射模型，本文只概述上游算法和行为，不复制其源码。

迁移前，`InteractiveBook` 经 `page-flip/src/PageFlip` 导入 TypeScript 源码，并在 `patches/page-flip@2.0.7.patch` 中给上游 `Render` 加入 RAF 停止能力。该补丁反映出原版 `start()` 的渲染循环在 `destroy()` 后仍持续调度的问题；新引擎必须在销毁时取消动画帧。

## 上游架构与行为

| 模块       | 源码                                                                                                                                                                                                                                                                 | 与替换有关的职责                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 入口与事件 | [PageFlip.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/PageFlip.ts)、[EventObject.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Event/EventObject.ts)                                                                                         | 组装 UI、页面集合、Flip 和 Render；提供动画/无动画翻页 API；发出页码、状态和方向事件。                        |
| 翻页状态   | [Flip.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Flip/Flip.ts)                                                                                                                                                                                         | 管理 `read`、`fold_corner`、`user_fold`、`flipping`；选择前后方向和上下角；拖动结束后完成或回弹。             |
| 几何       | [FlipCalculation.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Flip/FlipCalculation.ts)、[Helper.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Helper.ts)                                                                                      | 约束角点，求纸页旋转角、边界交点、两张页面的裁剪多边形、阴影折线及进度。                                      |
| 页面集合   | [PageCollection.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Collection/PageCollection.ts)、[HTMLPageCollection.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Collection/HTMLPageCollection.ts)                                               | 建立单页或双页 spread，确定当前页、翻动页、底页及硬封面。                                                     |
| 页面与绘制 | [HTMLPage.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Page/HTMLPage.ts)、[HTMLRender.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Render/HTMLRender.ts)、[Render.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Render/Render.ts) | 软页使用二维旋转和 `clip-path: polygon()`，硬页使用 `rotateY()`；分别绘制静态页、翻动页、底页和多层渐变阴影。 |
| DOM 输入   | [UI.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/UI/UI.ts)、[HTMLUI.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/UI/HTMLUI.ts)                                                                                                               | 建立 DOM 容器，处理鼠标、触屏、滑动、滚动及 resize。                                                          |
| 配置与样式 | [Settings.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Settings.ts)、[stPageFlip.css](https://github.com/Nodlik/StPageFlip/blob/master/src/Style/stPageFlip.css)                                                                                         | 页尺寸、封面、阴影、角预览、手势阈值、透视与定位样式。                                                        |

### 几何与动画

上游将工作页表示为书脊 `x = 0`、外缘 `x = pageWidth` 的局部坐标。后翻在坐标换算时镜像。角点受书脊附近的圆形边界约束，四角旋转后与书页上、侧、下边相交；这些交点决定翻动页与底页的裁剪区域和阴影方向。[FlipCalculation.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Flip/FlipCalculation.ts) 还给出 0–100 的翻页进度，旧 `PageFlipRenderer` 用它驱动封面、书脊和装帧的位置。

[Flip.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Flip/Flip.ts) 在松手时根据工作角点是否越过书脊决定完成或回弹。角区悬停会预折约 50px；硬页随进度绕 Y 轴翻动。自动翻页沿起点到终点取样，由 [Render.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Render/Render.ts) 的 RAF 循环推进。调用 `flip(targetPage)` 时，上游会先跳到目标相邻的 spread，再展示最后一张纸的翻动；它不会逐页播放全部中间页。

### 页序、输入与 DOM

双页模式中，首页单独成为封面，其后的页面两两配对，末页可能单独成页；单页模式中每张页面都是一个 spread。[PageCollection.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Collection/PageCollection.ts) 会将首封面及末尾单页设为硬页。单页模式前翻软页时，[HTMLPage.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Page/HTMLPage.ts) 会临时克隆当前 DOM 页面，用于表现纸张背面。

上游鼠标移动超过 5px 后进入拖动；触屏在 250ms 内、横移超过配置距离且纵移受限时识别滑动。[UI.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/UI/UI.ts) 尝试让纵向触屏滚动继续工作，但其点击放行只直接检查链接和按钮。旧 `PageFlipRenderer` 额外保护了交互控件的祖先节点和可滚动正文，替换时需要继续保护这些内容。

## 仓库内实现

[bookCurlGeometry.ts](../src/components/stateless/InteractiveBook/bookCurlGeometry.ts) 是独立计算模块。它把原外角和拖动角点的垂直平分线作为折线，按折线两侧裁剪矩形页面，并对折出的部分施加平面反射矩阵。输入是页宽、高、上下角及局部指针；输出包含约束后的角点、0–1 进度、页面裁剪路径、反射变换和阴影线段。无有效折角时，阴影允许为 `null`。这套几何与上游的旋转及交点实现不同，便于用纯函数验证边界和对称性。

[BookFlipEngine.ts](../src/components/stateless/InteractiveBook/BookFlipEngine.ts) 负责 DOM 页壳、spread、软硬页绘制、角预览、PointerEvent、RAF 动画和生命周期。它接收 React 创建的页面节点，在舞台内定位页面；公开 `next()`、`previous()`、`goTo()`、`getPage()`、`setInteraction()` 与 `destroy()`。`onPage` 汇报完成后的当前页，`onTurning` 汇报正式翻动状态，`onFrame` 汇报方向、进度及是否为预览。`destroy()` 取消 RAF、移除监听器和舞台，并释放指针捕获。

[PageFlipRenderer.tsx](../src/components/stateless/InteractiveBook/PageFlipRenderer.tsx) 继续用 React portal 持有页面内容，将原有 `PageFlipHandle` 映射到新引擎。它利用 `onFrame` 更新 `--book-openness`、`--book-side`、`data-cover-turning` 和 `data-book-animating`，让封面装帧跟随翻页。页壳使用 `data.density` 区分软页与硬页；目录朝硬封面、末尾内封朝硬封底的页角均不启动悬停预览。具体的书本尺寸和透视样式位于 [index.module.less](../src/components/stateless/InteractiveBook/index.module.less)。

### 与上游对照后的交互优化

- 上游的 [Flip.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Flip/Flip.ts) 将预卷角从边缘渐入约 50px，并在鼠标移动时继续更新折角。本地现在用 RAF 渐入，顶部和底部同时向页内收进，角区内横纵移动可改变折深；移出后回弹，回弹途中重入可从当前姿态继续。
- 上游的 [HTMLRender.ts](https://github.com/Nodlik/StPageFlip/blob/master/src/Render/HTMLRender.ts) 按折线和页边裁剪阴影。本地软页阴影现在取几何模块计算出的实际折线长度，避免小卷角出现贯穿整页的长影。
- 触屏从书角纵向移动时保留页面滚动，不会在松手时误翻；从页中部横向移动达到原集成配置的 35px 后才开始翻页。多个 `InteractiveBook` 同屏时，键盘命令只交给最近交互或获得焦点的书；单本书和弹窗内仍可直接使用键盘。
- 上游支持点击页面任意位置翻页，但旧版 `InteractiveBook` 已设置 `disableFlipByClick: true`。本地延续书角点击、拖动、触屏滑动与导航按钮的交互范围。

## 迁移兼容点

- `InteractiveBook` 的页序包含硬封面、软目录和扉页、软正文、软末尾内封及硬封底；双页配对还可能插入空白页。只有开合真正封面的翻页使用硬页旋转，目录在普通内页翻页和书角预览时使用纸页卷曲；朝硬封面回翻时不显示预卷角。末尾内封在正文侧保持软页效果，朝硬封底翻动时也不显示预卷角。单页模式的封面从左侧盖住静止的首张目录，封底从右侧盖住静止的末尾内页，返回时沿各自的书脊旋出。双页模式的首张目录与封面在硬页过渡时作为同一块板的内外两面同步旋转。页码回调应返回 spread 的首页索引，按钮、目录跳转、PDF 预加载及页脚均依赖它。
- 书角、书脊、封面厚度和居中位置依赖每帧进度；悬停预览、完成翻页和回弹应分别驱动并最终清除对应的 DOM 状态。
- 正文滚动、按钮、链接、表单和可编辑元素不得触发翻页。触屏横向翻页与纵向原生滚动应同时可用；从非书角区域起步的横划须超过 35px 才呈现翻页。
- `reducedMotion` 关闭角预览，使按钮导航直接切页。切换单/双页或页面尺寸时，React 会销毁旧引擎并建立新引擎；旧监听器、指针捕获和 RAF 不得留存。
- `goTo(page, true)` 对远距离跳转仍展示目标前的最后一张翻页动画，保持原有用户可见语义；`goTo(page, false)` 直接显示目标 spread。

## 验证清单

1. 运行 `pnpm exec jest src/components/stateless/InteractiveBook/bookCurlGeometry.test.ts src/components/stateless/InteractiveBook/BookFlipEngine.test.ts --runInBand --coverage=false`，覆盖几何边界、单页与双页 spread、卷角渐入和阴影、触屏手势、硬封底开合及引擎销毁。
2. 运行 `pnpm run typecheck`，确认页壳、几何和组件接口一致。文档变更运行 `pnpm run check:docs`。
3. 在 Storybook 中检查单页/双页、封面开合、封底、硬页和软页的按钮翻页、书角拖动、未越书脊回弹、悬停预览及远距离目录跳转。
4. 在触屏设备或移动视口检查水平滑动、正文纵向滚动和交互控件；检查系统减少动态效果设置下的直接切页。
5. 反复挂载、卸载并改变尺寸与模式，确认没有残留 RAF、监听器、指针捕获、隐藏页可聚焦内容或装帧 CSS 状态。

## 已知边界

- 新软页是折线两侧的平面裁剪与反射，和上游的旋转及裁剪模型不同；阴影也只有单层渐变，没有上游分开的内外两层阴影。高曲率时的形变和光照仍有差异，后续可优先研究多层阴影和更平滑的折面。
- 当前只把活动页角约束在书脊附近的圆内；上游还限制对侧页角越过边界。极端斜向拖动值得补几何边界样本和浏览器视觉检查后再调整。
- 当前引擎只接收 HTML 页面节点，没有上游的 Canvas 图片渲染通道。`InteractiveBook` 的图片和 PDF 内容仍可作为 React 页面内容显示。
- `goTo` 的远距离动画只翻目标前的最后一个 spread，中间 spread 不逐一播放；这是保留的原有行为。
- 页节点列表在引擎构造时确定。页面结构改变时，应由 `PageFlipRenderer` 重新创建引擎；内容可以继续由 React portal 更新。

## 本次验证

几何与引擎行为测试共 22 项通过；应用和 Storybook 的 TypeScript 检查、文档检查及 Vite 生产构建通过。Vite Storybook 浏览器预览验证了桌面封面打开、目录到正文的下一页翻动与窄屏单页布局，未出现运行时错误。main 分支此前还验证了单页卷角与回弹、封底翻回封面、目录远跳及多本书的键盘导航作用域。
