# ScrollProgressBar 组件使用说明

这是一个可复用的滚动进度条组件，用于显示页面或容器的垂直滚动进度。

## 重要提示：容器引用处理

当使用自定义容器时，需要正确处理容器的引用：

```jsx
// ❌ 错误：直接使用 ref.current（可能为 null）
<ScrollProgressBar container={scrollRef.current} />

// ✅ 正确：使用 state 跟踪容器引用
const [scrollContainer, setScrollContainer] = useState(null)
useEffect(() => {
	if (scrollRef.current) {
		setScrollContainer(scrollRef.current)
	}
}, [])
<ScrollProgressBar container={scrollContainer} />

// ✅ 或者使用 ScrollArea 包装器（推荐）
<ScrollArea>
	{/* 内容 */}
</ScrollArea>
```

## 两种使用方式：

### 1. 直接使用 ScrollProgressBar（需要父组件提供滚动容器）

```jsx
import { useScroll } from 'motion/react'
import ScrollProgressBar from '@stateless/ScrollProgressBar'

// 监听整个页面滚动
<ScrollProgressBar />

// 监听指定容器（推荐使用 state 方式）
const [scrollContainer, setScrollContainer] = useState(null)
useEffect(() => {
	if (scrollRef.current) setScrollContainer(scrollRef.current)
}, [])
<ScrollProgressBar container={scrollContainer} />
```

### 2. 使用 ScrollArea 包装器组件（推荐）

```jsx
import { ScrollArea } from '@stateless/ScrollProgressBar'

;<ScrollArea className="h-screen overflow-auto">
  <div className="content">{/* 你的内容 */}</div>
</ScrollArea>
```

## Props:

### ScrollProgressBar Props:

- `container?: HTMLElement | null` - 滚动容器元素，不指定则监听页面滚动
- `position?: 'fixed' | 'relative' | 'absolute' | 'sticky'` - 定位方式，默认 'fixed'
- `height?: number` - 进度条高度，默认 3px
- `color?: string` - 进度条颜色，支持CSS颜色或渐变，默认渐变色
- `className?: string` - 额外CSS类名
- `show?: boolean` - 是否显示进度条，默认 true
- `springConfig?: object` - 动画配置

### ScrollArea Props:

继承 ScrollProgressBar 的所有 props（除 container），加上：

- `children: React.ReactNode` - 子内容
- `className?: string` - 容器额外CSS类名
- `style?: React.CSSProperties` - 容器内联样式

## 适用场景：

- 主布局页面滚动进度
- 子系统布局滚动进度
- 任何需要滚动进度指示器的容器
- 模态框、侧边栏等可滚动区域
