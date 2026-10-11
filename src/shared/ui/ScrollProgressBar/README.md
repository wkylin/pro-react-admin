# ScrollProgressBar

使用 Motion useScroll/useSpring 显示滚动进度。传 container 绑定具体滚动区域，省略时跟踪文档。进度条自身不是滚动区域。

```tsx
import ScrollProgressBar, { ScrollArea } from '@shared/ui/ScrollProgressBar'

<ScrollProgressBar height={3} color="#1677ff" />
<ScrollArea style={{ height: 300 }}>
  <article>Long content</article>
</ScrollArea>
```

position 支持 fixed/relative/absolute/sticky，默认 fixed；height 默认 3，color 可为 CSS 颜色或渐变；show 默认 true。springConfig 支持 stiffness/damping/restDelta。ScrollArea 创建 overflow-auto 容器并将节点传给进度条，需要显式提供可滚动尺寸。

完整类型见 [types.ts](types.ts)。该组件属于应用 shared 层，不是当前 UI 包导出。
