# useAsyncTip

应用 Hook，给异步函数添加加载和成功提示，保留原 Promise 的结果与拒绝状态。

```tsx
import useAsyncTip from '@hooks/useAsyncTip'

const saveWithTip = useAsyncTip(save, {
  loadingText: '保存中...',
  successText: '已保存',
  onError: (error) => reportError(error),
})
```

options 支持 loadingText、successText、onError，第三个参数为可选依赖数组。无自定义 deps 时依赖 fn/options，调用方应控制引用稳定性。

判定成功时兼容 success、code:0/200、2xx status；请求层错误带 status/code/response 时默认避免重复提示。onError 被调用后仍拒绝 Promise，需要调用方 catch。该 Hook 不处理重试、取消或授权，类型仍保留 any，属于迁移中的旧组件层。
