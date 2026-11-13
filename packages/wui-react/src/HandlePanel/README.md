# HandlePanel 与 MinimizeHandle

从 panel-handle-demo 等价迁移的 React 组件，仅依赖 React。面板内容通过 `children` 传入，调用方通过 `onMinimize` 控制显隐。

```tsx
import { useState } from 'react'
import { HandlePanel } from '@wui'

export default function Example() {
  const [visible, setVisible] = useState(true)

  return (
    <div style={{ paddingTop: 32 }}>
      <HandlePanel hidden={!visible} variant="border" label="收起面板" onMinimize={() => setVisible(false)}>
        <div style={{ padding: 16 }}>面板内容</div>
      </HandlePanel>
      {!visible && <button onClick={() => setVisible(true)}>显示面板</button>}
    </div>
  )
}
```

项目内从 `@wui` 导入；发布包使用 `@w.ui/wui-react` 或 `@w.ui/wui-react/handle-panel`（默认导出），并引入 `@w.ui/wui-react/style.css`。

`variant="border"` 保留 1px 外边框和 22px 圆角；`variant="inset"` 使用 1px 内描边、16px 圆角和提手的 1px 对齐补偿。`flashing` 同时驱动面板和提手红框；沿用源组件策略，系统开启减少动态效果时，两者都不显示红色光效。组件不自动收起，也不为显隐添加动画。

两个组件均支持原生 DOM 属性及 React 19 `ref`。`MinimizeHandle` 的 `label` 必填，通过 `onClick` 接收点击；按钮固定为 `type="button"`，避免提交外层表单。

仅使用提手时，父面板需 `position: relative`、允许溢出，并在顶部预留空间。提手曲线为 64 × 22px，SVG 为 72 × 26px，点击区域为 72 × 44px。靠近圆角移动提手可能造成重叠。

```tsx
import { MinimizeHandle } from '@wui'

;<div style={{ position: 'relative', overflow: 'visible' }}>
  <MinimizeHandle label="收起" onClick={() => setVisible(false)} />
</div>
```

## 外观变量

通过父级或组件的 `style` 设置，导出的 `HandlePanelStyle` / `MinimizeHandleStyle` 支持 CSS 自定义属性，无需类型断言。

| 变量                      | 用途                             |
| ------------------------- | -------------------------------- |
| `--panel-background`      | 面板背景及提手底部默认颜色       |
| `--panel-border`          | 面板及提手默认边线颜色           |
| `--panel-ink`             | 面板内容颜色                     |
| `--panel-shadow`          | 标准面板普通状态阴影             |
| `--panel-focus`           | 提手键盘焦点描边                 |
| `--minimize-tab-tint`     | 提手顶部渐变色                   |
| `--minimize-tab-base`     | 提手底部颜色，应与面板连接处一致 |
| `--minimize-tab-border`   | 提手边线颜色                     |
| `--minimize-tab-ink`      | 箭头颜色                         |
| `--minimize-tab-offset-y` | 垂直补偿，inset 模式默认为 1px   |
| `--minimize-tab-right`    | 右侧距离，默认为 21px            |

要覆盖 inset 的垂直补偿，请直接设置面板 `style={{ '--minimize-tab-offset-y': '2px' }}`。SVG 渐变变量必须是颜色；面板背景使用 CSS 渐变时，必须同时给 `--minimize-tab-base` 指定连接处的实色。

Storybook：`WUI/Components/HandlePanel` 与 `WUI/Components/MinimizeHandle`。
