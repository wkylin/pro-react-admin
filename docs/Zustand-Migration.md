# 状态管理约定

状态按影响范围选择存放位置。不要把所有状态塞进一个全局 store，也不要把服务端数据与临时界面状态混在一起。

| 状态范围          | 位置                          | 当前示例                                  | 持久化                           |
| ----------------- | ----------------------------- | ----------------------------------------- | -------------------------------- |
| 应用壳全局状态    | `src/store`                   | 侧栏展开状态、响应式断点                  | 仅持久化侧栏状态                 |
| 业务域共享状态    | `src/features/<domain>/model` | 通知列表、已读状态                        | 按业务需求决定；通知示例不持久化 |
| 页面/组件临时状态 | 页面或组件内 `useState`       | Modal 开关、表单展开、当前筛选视图        | 不持久化                         |
| 服务端数据        | Feature API/hooks 或查询缓存  | 埋点数据通过 `src/features/tracking` 加载 | 遵从服务端缓存策略               |

## 应用全局 store

`src/store/index.ts` 只导出 `useAppStore`。全局状态目前由 `src/store/modules/appSlice.ts` 创建，`src/store/selectors.ts` 提供派生选择器。

```tsx
import { selectIsMobile, useAppStore } from '@/store'

const isMobile = useAppStore(selectIsMobile)
const toggleSidebar = useAppStore((state) => state.toggleSidebar)
```

断点对象是移动端状态的唯一来源；`selectIsMobile` 从 `screens.md` 派生结果，避免维护两个可能冲突的字段。`persist` 只保存 `isSidebarOpen`，断点不写入本地存储。使用 Zustand selector 只订阅当前组件需要的数据。

## 业务域 store

跨多个通知组件共享的数据放在 `src/features/notifications/model/notificationsStore.ts`。通知抽屉、通知列表和详情页共用同一份列表状态；通知领域状态不进入全局 `useAppStore`。

新业务域默认在自己的 `model/` 内管理领域状态，并通过 feature 的 `index.ts` 暴露必要入口。只有确实被多个业务域共享、生命周期跨路由的状态才上提到应用 store。

## 页面与组件局部状态

页面局部状态优先使用 React `useState`/`useReducer`。例如，通知列表的当前弹窗和筛选视图只影响当前页面，不需要进入 Zustand。`src/pages/zustand/model/store.ts` 是 Zustand 教学页的独立示例 store，它不与应用全局状态合并，也不持久化。

适用判断：

1. 只被一个组件使用且随组件卸载而失效：使用 React 局部状态。
2. 同一 feature 内多个页面或组件共享：使用 feature store。
3. 跨 feature、跨路由且属于应用壳的状态：评估后进入 `src/store`。
4. 由服务端拥有、需要缓存/失效/重试的数据：放在 feature API/query 层，不以全局 Zustand 代替服务端缓存。

## 新增状态的步骤

1. 先确认状态所有者和生命周期，选择局部状态、feature store 或应用 store。
2. 为 feature store 定义领域类型和动作，避免暴露可被任意修改的内部结构。
3. 只在确有需求时使用 `persist`；明确存储 key、版本迁移和隐私数据范围。
4. 组件通过 selector 订阅最小状态片段；派生值写成 selector，不重复存储。
5. 更新对应 feature 文档，并通过 TypeScript 与 import-boundary 检查。
