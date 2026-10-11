# FixTabPanel

通用 Tab 面板容器，使用 shared 入口 `@shared/ui/FixTabPanel`。继承 HTML div 属性并转发 ref，默认宽高 100%、纵向滚动、横向隐藏。

```tsx
import FixTabPanel from '@shared/ui/FixTabPanel'

;<FixTabPanel fill={false} showScrollProgress>
  <article>Long content</article>
</FixTabPanel>
```

fill 默认 true，控制内部内容是否填满高度；showScrollProgress 默认 true；scrollProgressProps 可覆盖进度条配置。容器节点传给 ScrollProgressBar 和 BackTop，父级必须提供可计算高度。业务权限、Tab 路由与缓存由上层布局负责。

属性类型见 [types.ts](types.ts)，相关组件见 [ScrollProgressBar](../ScrollProgressBar/README.md)。
