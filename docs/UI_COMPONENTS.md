# 应用组件与资源

可发布 UI 见[组件清单](COMPONENT_CATALOG.md)。下面组件仍属于应用源码，不在 npm 包公开导出中。

## Markdown 编辑器

src/components/stateless/MdxEditor 用 Tiptap、lowlight 与 Markdown/HTML 转换实现编辑、源码及分栏视图。props 为 initialMarkdown、onChange(markdown)、readOnly。名称保留 MdxEditor，但不提供运行任意 JSX 的 MDX 执行环境。转换会受扩展节点支持范围限制，不能假设任意 Markdown/HTML 都能无损往返。

## 视频

SmartVideoPlayer 支持 html5、youtube、embed provider。HTML5 使用 src，可设置字幕 trackSrc/trackLang；YouTube 使用 youtubeId，embed 使用 embedUrl 或 getEmbedUrl。initialConfig 设置初始播放器状态，config/onConfigChange 为受控配置，onError/onEvent 提供反馈。浏览器自动播放、画中画、跨域媒体和 iframe 权限由平台限制，不能保证所有 provider 具有相同能力。

## 电子书

InteractiveBook 接受 coverImage、pages 和可选 pdfUrl/pageImages，优先级 PDF > 图片 > JSX。每两面组成一个书页；mode 支持 single/double/auto（窄屏或容器不足以显示完整双页时自动单页），open 为受控开合，defaultOpen 为初始状态。PDF worker 使用 Vite asset URL，加载异常会退回 CDN；部署需验证 worker、CORS 与 CSP。

封面、书脊、封底与纸张侧面构成立体书本，合起时保持侧向透视，悬停时轻转并上移，翻页时纸叠厚度和光影同步变化。封面将书名、插图和作者分区，coverTitle 可自定义标题排版，书脊与无障碍名称仍使用 bookTitle。thickness 控制厚度（默认 28px，范围 6–64px），coverColor 控制封面、书脊及封底颜色，textured 启用封面纸纹（默认 false）。首页书架复用封面排版、纸张结构、书脊压痕和包边高光；系统启用减少动态效果时使用静态透视。

展开与翻页采用 react-pageflip 使用的 StPageFlip 引擎，平展双页配合书槽、纸叠和纸纹；封面按硬板翻开，内页支持书角拖拽、软纸折叠、实时阴影与回弹。内封显示作者与章节目录，图片书使用插图扉页。正文统一页眉、字号、段距和外侧页码，长内容支持独立滚动；溢出区域保留原生触摸滚动，页角及导航按钮仍可翻页。底部导航显示实际页面范围与阅读进度。引擎使用源码入口，由 Vite 编译；`patches/page-flip@2.0.7.patch` 在销毁时停止动画循环，避免开合或尺寸变化后继续渲染。

## 布局与图表

shared/ui/FixTabPanel 管理 Tab 面板尺寸和滚动，可显示 ScrollProgressBar；进度条可绑定容器或页面。它们不依赖业务授权。

ECharts、大屏、Three.js 与动画演示按页面加载。容器隐藏再显示或尺寸变化时应确认已有组件的 resize/清理逻辑；不能通过重复创建实例掩盖尺寸问题。SVG 相关页面使用现有浏览器组件，工具与展示属于应用能力，不是独立 CLI 服务。

样例内容位于组件 examples，不作为架构文档维护；组件 MDX 与 Story 一起构建验证，见[Storybook](STORYBOOK.md)。
