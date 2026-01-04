# useAsyncTip Hook 使用说明

useAsyncTip 用于“包一层异步函数调用 + 统一提示”。它主要解决：

- 每次请求都要手写 loading/success/error 提示
- message 互相覆盖/误伤（只关闭当前请求的 loading）
- 错误结构不统一（复用 service/request.js 的错误映射能力）

该实现基于 antd v6：通过 App.useApp() 注入的 message 实例（见 src/utils/message.ts）。

## 主要功能

1. 调用开始：显示 loading（带 key，可被后续更新/关闭）

2. 调用成功：显示 success（successText 可配置）

3. 调用失败：

- 如果你提供 onError：仅关闭 loading，并把错误交给你处理（比如跳转/上报/自定义提示）
- 否则：根据错误对象提取文案并提示；同时尽量避免与 service 层重复弹错

## API

```ts
useAsyncTip(fn, options?, deps?)
```

- fn: (...args) => Promise<any> | any
- options?:
  - loadingText?: string // loading 文案，默认 "加载中..."
  - successText?: string // 成功文案，默认 "完成"
  - onError?: (err) => void // 自定义失败处理（提供后 hook 不再默认弹错）
- deps?: React.DependencyList // 可选；不传时默认依赖 [fn, options]

## 行为约定（结合 service/request.js）

- 成功判断：
  - 返回值是业务包裹对象且包含 code：code === 0 或 200 视为成功
  - 否则如果返回 { success: boolean }：success 为 true 视为成功
- 错误文案：优先使用 err.message / 后端返回的 message/msg；
  同时复用 RequestUtils.getHttpErrorMessage/getNetworkErrorMessage 做兜底。

## 基本用法

```tsx
import useAsyncTip from '@hooks/useAsyncTip'
import request from '@src/service/request'

const save = useAsyncTip(
	(payload) => request.post('/api/save', payload),
	{ loadingText: '保存中...', successText: '保存成功' }
)

<Button onClick={() => save({ a: 1 })}>保存</Button>
```

## 自定义失败处理（比如跳转错误页/上报）

```tsx
const loadDetail = useAsyncTip((id) => request.get('/api/detail', { id }), {
  loadingText: '加载中...',
  successText: '加载完成',
  onError: (err) => {
    // 这里可以做：上报、跳转、或者自己弹提示
    // showMessage.error('加载失败')
  },
})
```

## 重要提示

- 本 hook 使用的提示能力来自 src/utils/message.ts，要求在应用根部已正确 setMessageInstance。
- 如果 service 层（request.js/http.js）已经开启了 showError，hook 默认会尽量避免重复弹错。

## 根组件初始化 message（与 theme.tsx 对应）

项目使用 antd v6 的 App 上下文来获取 message 实例，并注入到 src/utils/message.ts：

```tsx
import { useEffect } from 'react'
import { App as AntdApp } from 'antd'
import { setMessageInstance } from '@utils/message'

const ThemeIndex = () => {
	const { message } = AntdApp.useApp()

	useEffect(() => {
		setMessageInstance(message)
	}, [message])

	return (...)
}
```

完整实现可参考：src/theme.tsx
